const differenceInYears = require('date-fns/differenceInYears');
const { Schema, Types, model } = require('mongoose');
const bcrypt = require('bcrypt');

const documentSchema = new Schema(
  {
    type: {
      type: String,
      enum: ['CC', 'CE', 'PPE'],
      default: 'CC',
    },
    id: {
      type: String,
      required: true,
    },
  },
  {
    _id: false,
  }
);

const userSchema = new Schema(
  {
    identification: { type: documentSchema, required: true },
    first_name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
    },
    address: {
      type: [String],
    },
    birthday: {
      type: Date,
      required: true,
      validate: {
        validator(value) {
          return differenceInYears(Date.now(), new Date(value)) >= 18;
        },
        message: 'You must be 18 or older',
      },
    },
  },
  {
    toJSON: {
      getters: true,
      versionKey: false,
      transform(_doc, { _id: _, password: __, ...ret }) {
        return ret;
      },
    },
  }
);

userSchema.index(
  { 'identification.type': 1, 'identification.id': 1 },
  { unique: true }
);

userSchema.pre('save', async function (next) {
  try {
    const hashedPassword = await bcrypt.hash(this.password, 10);
    this.password = hashedPassword;
    next();
  } catch (error) {
    next(error);
  }
});

userSchema.pre('findOneAndUpdate', async function (next) {
  try {
    const { password } = this.getUpdate();
    if (!password) next();

    const hashedPassword = await bcrypt.hash(password, 10);
    this.set({ password: hashedPassword });
    next();
  } catch (error) {
    next(error);
  }
});

userSchema.methods.validatePassword = async function (plainText) {
  try {
    const match = await bcrypt.compare(plainText, this.password);
    return match;
  } catch (error) {
    throw new Error('Invalid Credentials');
  }
};

const userModel = model('User', userSchema);

module.exports = userModel;
