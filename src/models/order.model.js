const { Schema, Types, model, Error } = require('mongoose');

const Product = require('./product.model');

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
    await Promise.all(
      this.products.map(async (item) => {
        const p = await Product.findOne({ slug: item.product.slug });
        p.quantityInStock -= item.quantity;
        await p.save();
      })
    );
    return next();
  } catch (error) {
    if (error instanceof Error.ValidationError) {
      return next(new Error(error.errors.quantityInStock.message));
    }
    return next(error);
  }
});

const orderModel = model('Order', orderSchema);

module.exports = orderModel;
