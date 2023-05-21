/**
 * Stream
 */

// Register aliases
require("module-alias/register");

// Global variables
global.root = __dirname;
global.logger = require("logger");

const express = require("express");
const app = express();

const loadConfig = require("load-config");
const loadServices = require("load-services");

// Load configuration into global.config
loadConfig();
loadServices(app);

app.listen(global.PORT, () => {
    global.logger.success(`Stream is now listening on PORT ${global.PORT} on environment "${global.ENV}"`)
});