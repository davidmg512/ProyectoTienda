/**
* IMPORTS 
*/
require("module-alias/register");
const ModelsService = require("@services/models.service");
const LogService = require("@services/log.service");
const DbService = require("@services/db.service");
const setupMiddlewares = require("./middlewares");
const express = require("express");
const kainda = require("kainda");
const config = require("config");
const https = require("http");
const admin = require('firebase-admin');

const cors = require('cors');


async function main() 
{

    // We run express which will provide us an execution environment
    let app = express();
    app.use(cors({
        origin: 'http://localhost:4200'
    }));
    
    const serviceAccount = require("./firebase/tiendaonline-79f41-firebase-adminsdk-xxzcc-6d26161a2c.json");

    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseUrl: 'https://tiendaonline-79f41.firebaseio.com'
    })

    // Setup the logger
    LogService.init(config.get("logs"));

    // Setup the middlewares
    setupMiddlewares(app);

    // Critical database initialization
    const critical = config.get("databases").filter(db => db.description === "critical")[0];
    await DbService.init(critical);

    // Make some configuration and utils globally available
    const Models = kainda.getModels();
    ModelsService.init(Models);

    // Seed database if needed
    if ((process.env.NODE_ENV !== "production" && process.argv.includes("--seed"))) 
    {
        DbService.seed(Models);
    }

    // Require the routes
    ModelsService.setupRoutes(app);

    /**
    * Server creation
    */
    const port = config.get("server.port");
    const host = config.get("server.host");
    let poll = true;
    const server = https.createServer(app);
    server.listen(port, host, (err) => 
    {
        if (err) 
        {
            LogService.StartLogger.error(err);
            throw new Error("Error while starting the server: " + (err.message ?? "Possible EADDRINUSE"));
        }
        LogService.StartLogger.info(`backend is running on ${host}:${port}`);
        poll = false;
    });

    server.on("error", (err) => 
    {
        LogService.StartLogger.error(err);
        throw new Error("Error while starting the server: " + (err.message ?? "Possible EADDRINUSE"));
    });

    while (poll) 
    {
        await new Promise(resolve => setTimeout(resolve, 100));
    }

    return app;

}

module.exports = main;