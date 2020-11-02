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
  text: { type: String },
  status: {
    type: String,
    required: true,
    default: "unsent",
  },
  sentDate: Date,
  arrivalDate: Date,
});

export default model<IMessage>("Message", messageSchema);
