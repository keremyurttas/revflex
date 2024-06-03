import mongoose from 'mongoose';
const { Schema } = mongoose;

const avatarSchema = new Schema({
  data: Buffer,
  contentType: String,
});

export default avatarSchema;