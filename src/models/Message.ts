import { IMessage } from "./../types";
import { model, Schema } from "mongoose";

const messageSchema = new Schema({
  from: {
    type: String,
    unique: true,
  },
  to: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  sentDate: Date,
  arrivalDate: Date,
});

export default model<IMessage>("User", messageSchema);
