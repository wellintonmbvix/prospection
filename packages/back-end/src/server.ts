import express from "express";
import routes from "./routes";
import cors from "cors";
import compression from "compression";
import bodyParser from "body-parser";

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false}));
app.use(compression());
app.use(express.json());
app.use("/api", routes);

app.listen(3333, () => {
  console.log(`✨ Server started on 3333`);
});
