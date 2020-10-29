import express, { Express } from "express";
import mongoose from "mongoose";
import cors from "cors";
import todoRoutes from "./routes";
import bodyParser from "body-parser";

import { router as authRoutes } from "./routes/authRoutes";

const app: Express = express();

const PORT: string | number = process.env.PORT || 4000;

app.use(cors());
app.use(bodyParser.json());
app.use(authRoutes);
app.use(todoRoutes);

// const uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@owlpostdev.vel0i.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority?authMechanism=MONGODB-CR`;
const uri = `mongodb+srv://admin:sqnCF9jq29dP7vkH@owlpostdev.vel0i.mongodb.net/<dbname>?retryWrites=true&w=majority`;
const options = { useNewUrlParser: true, useUnifiedTopology: true };
mongoose.set("useFindAndModify", false);

app.get("/ping", (req, res) => {
  res.send("yoyoyo");
});

mongoose
  .connect(uri, options)
  .then(() =>
    app.listen(PORT, () =>
      console.log(`Server running on http://localhost:${PORT}`)
    )
  )
  .catch((error) => {
    console.log("we couldn't connect!");
    console.log(error);
  });
