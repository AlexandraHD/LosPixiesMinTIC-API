const { Schema, Types, model } = require('mongoose');
const { productSchema } = require('./product.model');

const orderItemSchema = new Schema(
  {
    product: {
      type: productSchema,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
  },
  {
    _id: false,
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

const orderModel = model('Order', orderSchema);

module.exports = orderModel;
