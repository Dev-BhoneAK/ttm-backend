var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var { graphqlHTTP } = require("express-graphql");
var { buildSchema } = require("graphql");
var schema = require("./graphql/schema");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

var app = express();

// Construct a schema, using GraphQL schema language
// var schema = buildSchema(`
//     type Query {
//         hello: String
//     }`);

var root = {
  hello: () => {
    return "Hello world!";
  },
};

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
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
// app.use('/users', usersRouter);

module.exports = app;
