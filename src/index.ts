import RiseactSDK from "@riseact/riseact-node-sdk";
import cors from "cors";
import dotenv from "dotenv";
import express, { Express } from "express";
import http from "http";
// var buildClientSchema  = require('graphql/utilities').buildClientSchema;
// var introspectionQuery = require('graphql/utilities').introspectionQuery;

const PORT = 3000;
dotenv.config();

async function createServer() {
  const app: Express = express();
  const server = http.createServer(app);

  // Create the Riseact SDK instance with the client ID and client secret generated from Riseact
  const riseact = await RiseactSDK({
    auth: {
      clientId: process.env.CLIENT_ID!,
      clientSecret: process.env.CLIENT_SECRET!,
      redirectUri: process.env.REDIRECT_URI!,
    },
  });

  // Enable the GraphQL Playground
  app.use(cors({ origin: true, credentials: true }));

  // Create the OAuth endpoints for Riseact and check if the user is authenticated
  app.use(riseact.auth.authMiddleware);

  // Create an endpoint for the GraphQL API that will proxy the request to Riseact
  app.use("/", riseact.network.gqlRewriterHandler);

  // /* ----------------------------- Your code here ----------------------------- */


  // /* -------------------------------------------------------------------------- */

  // if (process.env.NODE_ENV === "production") {
  //   console.info("🚀 Production mode, using frontend build");
  //   app.use(serveStatic(`${process.cwd()}/static`));
  // } else {
  //   console.info("🔧 Development mode, using frontend dev server");
  //   app.use(riseact.devTools.devMiddleware);
  //   server.on("upgrade", riseact.devTools.hmrProxyHandler);
  // }

  server.listen(PORT, () => {
    console.log(`⚡️ Server is running at http://localhost:${PORT}`);
  });
}

createServer();
