const { Schema, Types, model } = require('mongoose');
const slug = require('mongoose-slug-generator');

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      slug: 'name',
      unique: true,
    },
    price: {
      type: Types.Decimal128,
      required: true,
      get: (value) => {
        if (typeof value !== 'undefined') return parseFloat(value.toString());
        return value;
      },
    },
    quantityInStock: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
    categories: {
      type: [String],
      default: [],
    },
    images: {
      type: [String],
      required: false,
      default: [],
    },
  },
  {
    toJSON: {
      getters: true,
      versionKey: false,
    },
  }
);

productSchema.plugin(slug);

const productModel = model('Product', productSchema);

module.exports = productModel;

module.exports.productSchema = productSchema;
