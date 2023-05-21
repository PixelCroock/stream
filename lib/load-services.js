const fs = require("fs");
const path = require("path");
const { glob } = require("glob");
const express = require("express");

const utils = require("utils");

/**
 * Fetches all services under "services" folder and registers them to given Express app.
 * @param {*} app Express app
 * @param {*} dirName Server root with ".env" and "config/"
 */
module.exports = (app, dirName = ((global.root) || (".." + __dirname))) => {
    
    const isDev = utils.isDev();
    const srvPath = path.resolve(dirName, "services");
    if (!fs.existsSync(srvPath)) throw new Error(`Can't load services, there is no services folder.`);

    // Find all ".js" files in the services folder
    const content = glob.sync(srvPath + "/*.js");

    // Loop through all services in the folder
    for (let i = 0; i < content.length; i++) {
        const dir = content[i];
        const base = path.basename(dir);

        // Splits filename "service.version.ext" with regex
        const [ service, version, ext ] = base.split(".");
        
        // Verify version starts with "v" and ends with a number
        const versionRegex = /^v\d+$/;
        const isVersionValid = versionRegex.test(version);
        if (!isVersionValid) throw new Error(`Service "${service}" has an invalid version "${version}"`);

        const route = `/${service}/${version}`; // Service route, exp: /songdb/v1/

        const public = express.Router({ strict: true, caseSensitive: true });
        const private = express.Router({ strict: true, caseSensitive: true });

        // TODO: logger per service
        const logger = global.logger;
        
        // Public routes will be public all the time
        // Meanwhile private routes will be available only if the server is in dev mode.
        app.use(route, public);
        if (isDev) app.use(route, private);

        // Call the service's init function
        require(dir).init(app, public, private, global.config, logger);
    };

};