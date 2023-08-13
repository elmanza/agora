import { Schema, model } from "./mongoose";

const collectionName = "rol";

const collectionSchema = new Schema({
  name: {
    type: String,
    enum: ['OPERATIONS', 'MANAGER_HOST', 'HOST', 'CUSTOMER'],
    default: 'CUSTOMER',
    unique: true
  },
  description: String
});

const modelEntity = model(collectionName, collectionSchema);

module.exports = modelEntity;