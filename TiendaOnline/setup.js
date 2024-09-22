/**
* IMPORTS 
*/
require("module-alias/register");
require("dotenv").config({ path: './keys.env' });
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
    //let url = 'https://sushopfrontend.vercel.app';
    let url = 'http://localhost:4200';
    app.use(cors({
        origin: url,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization']
    }));

    app.options('*', cors());
    
    const serviceAccount = require("./firebase/tiendaonline-79f41-firebase-adminsdk-xxzcc-6d26161a2c.json");
    
    serviceAccount.private_key_id = process.env.PRIVATE_KEY_ID;
    serviceAccount.private_key = process.env.PRIVATE_KEY;
    serviceAccount.client_email = process.env.CLIENT_EMAIL;
    serviceAccount.client_id = process.env.CLIENT_ID;

    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseUrl: 'https://tiendaonline-79f41.firebaseio.com'
    })

    // Setup the logger
    LogService.init(config.get("logs"));

    // Setup the middlewares
    setupMiddlewares(app);

    // Critical database initialization
    //const critical = config.get("databases").filter(db => db.description === "critical")[0];
    
    const critical = {
        description: 'critical',
        uri: '',  // Inicialmente vacío
        dialect: 'mongo',
        database_name: 'BaseDatosLocal',
        pool: {
            max: 100,
            min: 10,
            acquire: 10000,
            idle: 30000
        }
    };

    //console.log(critical);

    let mongoUri = process.env.MONGO_URI;
    //console.log('Mongo URI:', mongoUri);  // Agrega esta línea para verificar la URI
    critical.uri = mongoUri;

    //console.log(critical);

    await DbService.init(critical);

    // Make some configuration and utils globally available
    const Models = kainda.getModels();
    ModelsService.init(Models);

    // Seed database if needed
    if ((process.env.NODE_ENV !== "production" && process.argv.includes("--seed"))) 
    {
        DbService.seed(Models);
    }

    app.get('/health', (req, res) => {
        res.status(200).send('OK');
    });

    // Require the routes
    ModelsService.setupRoutes(app);

    /**
    * Server creation
    */
    const port = config.get("server.port") || 3000; // Usa 3000 por defecto si no se obtiene de la configuración
    const host = config.get("server.host") || '0.0.0.0'; // Usa '0.0.0.0' por defecto si no se obtiene de la configuración

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