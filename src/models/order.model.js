const { Schema, Types, model, Error } = require('mongoose');
const { OrderError } = require('../utils/errors');

const Product = require('./product.model');
const User = require('./user.model');

const orderItemSchema = new Schema(
  {
    product: {
      name: {
        type: String,
        required: true,
      },
      slug: {
        type: String,
        required: true,
      },
      price: {
        type: Types.Decimal128,
        required: true,
        get: (value) => {
          if (typeof value !== 'undefined') return parseFloat(value.toString());
          return value;
        },
      },
      categories: {
        type: [String],
        required: true,
      },
      images: {
        type: [String],
        required: true,
      },
    },
    quantity: {
      type: Number,
      required: true,
    },
  },
  {
    _id: false,
    toJSON: {
      getters: true,
      versionKey: false,
    },
    virtuals: {
      price: {
        get() {
          return this.product.price * this.quantity;
        },
      },
    },
  }
);

const orderSchema = new Schema(
  {
    date: {
      type: Date,
      default: Date.now(),
    },
    products: [{ type: orderItemSchema, required: true }],
    user: {
      type: Types.ObjectId,
      required: true,
    },
  },
  {
    toJSON: {
      getters: true,
      versionKey: false,
      transform(doc, { _id: _, ...ret }) {
        return ret;
      },
    },
    virtuals: {
      total: {
        get() {
          return this.products.reduce((prev, curr) => curr.price + prev, 0);
        },
      },
    },
  }
);

orderSchema.pre('save', async function (next) {
  try {
    await Promise.all([
      User.exists({ _id: this.user }).then(
        (userExists) =>
          !userExists && Promise.reject(new OrderError('User not found'))
      ),

      ...this.products.map(async (item) => {
        const product = await Product.findOne({ slug: item.product.slug });
        if (!product) throw new OrderError('Product not found');
        product.quantityInStock -= item.quantity;
        await product.save();
      }),
    ]);

    return next();
  } catch (error) {
    return next(error);
  }
});

const orderModel = model('Order', orderSchema);

module.exports = orderModel;
