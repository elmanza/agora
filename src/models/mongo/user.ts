import { Schema, model } from "./mongoose";

const collectionName = "user";

const collectionSchema = new Schema({
  name: String,
  lastname: String,
  email: {
    unique: true,
    type: String,
    required: true,
    index: true
  },
  password: {
    type: String
  },
  phone: {
    type: String
  },
  birthday: {
    type: Date
  },
  photo: String,
  address: String,
  city: String,
  zipcode: String,
  country: String,
  token: String,
  isActive: {
    type: Boolean,
    default: true
  },
  rol_id: {
    type: Schema.Types.ObjectId,
    ref: 'rol'
  },
  createdAt: {
    type: Date,
    Default: Date.now()
  },
  updatedAt: {
    type: Date,
    Default: Date.now()
  }
});

const modelEntity = model(collectionName, collectionSchema);

module.exports = modelEntity;