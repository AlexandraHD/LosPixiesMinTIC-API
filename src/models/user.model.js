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
      select: false,
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
      versionKey: false,
    },
  }
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
    const hashedPassword = await bcrypt.hash(password, 10);
    this.set({ password: hashedPassword });
    next();
  } catch (error) {
    next(error);
  }
});

const userModel = model('User', userSchema);

module.exports = userModel;
