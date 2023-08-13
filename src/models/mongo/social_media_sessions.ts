import { Schema, model } from "./mongoose";

const collectionName = "social_media_sessions";

const collectionSchema = new Schema({
  name: String,
  description: String
});

const modelEntity = model(collectionName, collectionSchema);

module.exports = modelEntity;