import { Document } from "mongoose";

interface IMessage extends Document {
  from: string;
  to: string;
  text: string;
  status: "unsent" | "in-flight" | "delivered" | "opened";
  sentDate: Date | null;
  arrivalDate: Date | null;
}

export { IMessage };
