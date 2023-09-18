"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const riseact_node_sdk_1 = __importDefault(require("@riseact/riseact-node-sdk"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
// var buildClientSchema  = require('graphql/utilities').buildClientSchema;
// var introspectionQuery = require('graphql/utilities').introspectionQuery;
const PORT = 3000;
dotenv_1.default.config();
async function createServer() {
    const app = (0, express_1.default)();
    const server = http_1.default.createServer(app);
    // Create the Riseact SDK instance with the client ID and client secret generated from Riseact
    const riseact = await (0, riseact_node_sdk_1.default)({
        auth: {
            clientId: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
        },
    });
    // Enable the GraphQL Playground
    app.use((0, cors_1.default)({ origin: true, credentials: true }));
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
