import { model, Schema } from 'mongoose';
import { Refvalidator } from '../shared/existValidator';
import { IUser } from '../types';
import dialectModel from './Dialect';
import bcrypt from 'bcrypt';

const userSchema = new Schema<IUser>({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
    enum: ['male', 'female'],
  },
  age: {
    type: Number,
    required: true,
  },
  dialect: {
    type: Schema.Types.ObjectId,
    ref: 'dialect',
    required: true,
  },
  score: {
    type: Number,
    default: 0,
  },
  role: {
    type: String,
    default: 'user',
    enum: ['admin', 'user', 'guest'],
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.path('dialect').validate(Refvalidator(dialectModel), 'invalid references');

userSchema.pre('save', function (next) {
  if (!this.isModified('password')) {
    return next();
  }

  bcrypt.hash(this.password, 10, (err, passwordHash) => {
    if (err) {
      return next(err);
    }
    this.password = passwordHash;
    return next();
  });
});

const userModel = model<IUser>('user', userSchema);

export default userModel;
