require("dotenv").config();
import cors from "cors";
import helmet from "helmet";
import { makeSchema } from "@nexus/schema";
import { applyMiddleware } from "graphql-middleware";
import { ApolloServer } from "apollo-server-express";
import http from "http";
import express from "express";
import { Query, Mutation, Subscription, Middleware } from "./resources";

import { knex } from "./db/knexConfig";
import { Model } from "objection";

import { UserController, UserFlaskAPI } from "./resources/user/UserDatasource";
import {
  ReviewController,
  ReviewFlaskAPI,
} from "./resources/review/ReviewDatasource";
import { MovieFlaskAPI } from "./resources/movie/MovieDatasource";

Model.knex(knex);
const app = express();

app.use(helmet());
app.use(cors());

const httpServer = http.createServer(app);

const schema = makeSchema({
  types: [Query, Mutation, Subscription],
  outputs: {
    schema: __dirname + "/generated/schema.graphql",
    typegen: __dirname + "/generated/typings.ts",
  },
  typegenAutoConfig: {
    contextType: "ctx.Context",
    sources: [
      {
        alias: "ctx",
        source: __dirname + "/resources/Context.ts",
      },
      // {
      //   alias: "t",
      //   source: __dirname + "/resources/types.ts",
      //   typeMatch: (type) => new RegExp(`(?:interface|type|class)\\s+(I${type})\\W`, "g"),
      // },
    ],
  },
});

const schemaWithMiddleware = applyMiddleware(schema, ...Middleware);

const apolloServer = new ApolloServer({
  schema: schemaWithMiddleware,
  context: async ({ req }) => {
    return {
      req,
      user: await UserController.authenticateUser(
        req.headers.authorization || ""
      ),
    };
  },
  subscriptions: {
    onConnect: async () => {
      console.log("Subscription client connected");
    },
    onDisconnect: async () => {
      console.log("Subscription client disconnected");
    },
    path: "/subscriptions",
  },
  dataSources: () => ({
    UserController: new UserController(),
    UserFlaskAPI: new UserFlaskAPI(),
    ReviewController: new ReviewController(),
    ReviewFlaskAPI: new ReviewFlaskAPI(),
    MovieFlaskAPI: new MovieFlaskAPI(),
  }),
});

apolloServer.applyMiddleware({ app });
apolloServer.installSubscriptionHandlers(httpServer);

export { apolloServer, httpServer };
