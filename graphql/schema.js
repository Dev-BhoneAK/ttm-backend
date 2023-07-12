import { categories } from "../data/db.js";
import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLList,
  GraphQLInt,
} from "graphql";

const CategoryType = new GraphQLObjectType({
  name: "Category",
  description: "This represents a category of a book",
  fields: () => ({
    id: { type: GraphQLInt },
    name: { type: GraphQLString },
    icon: { type: GraphQLString },
    parentCategory: { type: GraphQLString },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  description: "Description",
  fields: {
    categories: {
      type: new GraphQLList(CategoryType),
      description: "List of all categories",
      resolve: () => categories,
    },
  },
});

export default new GraphQLSchema({
  query: RootQuery,
});

// module.exports = new GraphQLSchema({
//   query: RootQuery,
// });
