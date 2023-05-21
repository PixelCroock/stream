module.exports = {
    id: "constant-provider",
    version: 1,
    init: (app, public, private, config, logger) => {

        const skuConstants = require("config/sku-constants");

        public.get("/sku-constants", (req, res) => {
            return res.send(skuConstants);
        });
        
    }
};