const fs = require("fs");
const path = require("path");
const dotenv = require("dotenv");
const Joi = require("joi");

const utils = require("utils");

const schema = Joi.object({
    ENV: Joi.string().required(),
    PORT: Joi.number().min(80).max(65535)
}).unknown(true);

/**
 * Reads ".env" file and local config and combines them into one configuration.
 * Anything in local config can be overwritten by ".env"
 * @param {*} dirName Server root with ".env" and "config/"
 */
module.exports = (dirName = ((global.root) || (".." + __dirname))) => {
    let envFile = path.resolve(dirName, ".env");
    let envConf = dotenv.config({ path: envFile, override: false }).parsed;

    let confFile = path.resolve(dirName, "config/base-config.js");
    let conf = require(confFile);

    let finalConf = {
        ...conf,
        ...envConf
    };

    const { value: validatedConf, error } = schema.validate(finalConf); 
    if (error) throw new Error(`Can't validate configuration: ${error}`)

    global.ENV = finalConf.ENV || "test";
    global.PORT = finalConf.PORT || utils.randomPort();
    global.config = validatedConf;
    global.logger.success("Loaded configuration!");
};