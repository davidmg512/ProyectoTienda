const LogService = require("@services/log.service");
const express = require("express");
const kainda = require("kainda");
const helmet = require("helmet");
const config = require("config");
const cors = require("cors");

function setupMiddlewares(app) 
{

    app.disable("x-powered-by");

    /**
     * We extract from the config file the cors options, where we specify which domains can cross request the api and which http methods can be used. 
     */
    let whitelist = config.get("cors.origin") ?? [];
    let corsOptions = {
        origin: whitelist,
        methods: config.get("cors.methods")
    };

    /**
     * Some middlewares added on initial configuration. These middlewares will execute once the petition reaches the server side.
     */
    app.use(helmet());
    app.use(cors(corsOptions));
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.use(function (req, res, next) 
    {
        const ip = req.headers["origin"];
        if (!kainda.blockByIP(ip, { whitelist: whitelist })) 
        {
            LogService.ServerLogger.info("[SECURITY] IP blocked: " + ip);
            return res.status(403).send({ message: "Forbidden" });
        }
        next();
    });

    /**
     * Additional built-in middleware added for the express app
     */
    app.use(function (req, res, next) 
    {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.use((req, res, next) => 
    {
        let oldSend = res.send;
        res.send = function (data) 
        {
            LogService.RequestLogger.info({
                req: {
                    method: req.method,
                    headers: req.headers,
                    originalUrl: req.originalUrl,
                    ip: req.ip,
                    params: req.params,
                    query: req.query,
                    body: req.body,
                },
                res: {
                    headers: res.getHeaders(),
                    statusCode: res.statusCode,
                    body: data,
                }
            });
            res.send = oldSend;
            return res.send(data);
        };
        next();
    });

}

module.exports = setupMiddlewares;