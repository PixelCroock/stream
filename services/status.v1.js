module.exports = {
    id: "status",
    version: 1,
    init: (app, public, private, config, logger) => {

        public.get("/ping", (req, res) => {
            return res.sendStatus(200);
        });

        public.get("/health", require("express-healthcheck")());

        private.get("/test-private", (req, res, next) => {
            res.send("this is a private route!")
        });
        
    }
};