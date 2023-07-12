import "dotenv/config";
import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import { graphqlHTTP } from "express-graphql";
import { buildSchema } from "graphql";

import schema from "./graphql/schema.js";
import connectDB from "./config/database.js";
import indexRouter from "./routes/index.js";
import usersRouter from "./routes/users.js";

var app = express();

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    graphiql: true,
  })
);
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, "public")));
const port = process.env.PORT || 5000;

connectDB();

app.use("/", indexRouter);
// app.use('/users', usersRouter);

app.listen(port, () =>
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${port}`)
);

// module.exports = app;
