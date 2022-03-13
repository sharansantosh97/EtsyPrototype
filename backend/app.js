import express from "express";
import cors from "cors";
import bcrypt from "bcrypt";
const saltRounds = 10;
import jwt from "jsonwebtoken";
import multer from "multer";
import path from "path";
import uuid from "uuidv4";

import { initRestApis } from "./Rest/index.js";
import { initdb } from "./init.db.js";

async function createServer() {
  var app = express();
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cors());
  return initdb()
    .then(() => {
      return initRestApis(app);
    })
    .then(() => {
      app.listen(3030, function () {
        console.log("Server listening on port 3030");
      });
    });
}

createServer();
