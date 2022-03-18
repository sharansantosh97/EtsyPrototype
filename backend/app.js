import express from 'express';
import cors from 'cors';
import cluster from 'cluster';
import { initRestApis } from './Rest/index.js'
import { initdb } from './init.db.js'
import os from 'os';
import { AuthTokenMiddleWare } from './Middlewares/AuthTokenMiddleWare.js'

import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(
    import.meta.url);
const __dirname = path.dirname(__filename);

var workers = 2|| process.env.WORKERS || os.cpus().length;

var whitelist = ['http://localhost:3001', 'https://8026-2600-1700-65aa-d910-74a0-45c6-f332-f7b8.ngrok.io', 'http://example2.com']
var corsOptions = {
  origin: function (origin, callback) {
    // if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    // } else {
    //   callback(new Error('Not allowed by CORS'))
    // }
  }
}

async function createServer() {
    process.on('unhandledRejection', (err) => {
        console.log("unhandledRejection : ", err);
    })
    process.on('uncaughtException', (err) => {
        console.log("uncaughtException : ", err);
    })
    var app = express({ mergeParams: true });
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(cors( {
        origin: 'http://localhost:3000'
    }))
    await initdb()
    await AuthTokenMiddleWare(app)
    await initRestApis(app)
    app.listen(3001, function() {
        console.log("Server listening on port 3001");
    });

}


if (cluster.isMaster) {

    console.log('start cluster with %s workers', workers);

    for (var i = 0; i < workers; ++i) {
        var worker = cluster.fork().process;
        console.log('worker %s started.', worker.pid);
    }

    cluster.on('exit', function(worker) {
        console.log('worker %s died. restart...', worker.process.pid);
        cluster.fork();
    });

} else {
    createServer()
}