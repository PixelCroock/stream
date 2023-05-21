module.exports = {
    id: "wdf",
    version: 1,
    init: (app, public, private, config, logger) => {

        public.post("/server-time", (req, res) => {
            res.send({
                time: parseInt(Date.now() / 1000)
            });
        });

        public.post("/assign-room", (req, res) => {
            res.send({
                room: "PlaceholderRoom"
            });
        });

        public.post("/rooms/:room/screens", (req, res) => {
            return res.send({
                __class: "ScreenList",
                screens: []
            });
        });

        public.post("/rooms/:room/ccu", (req, res) => {
            return res.send("0");
        });

        public.post("/rooms/:room/next-happyhours", (req, res) => {
            return res.send({
                __class: "HappyHoursInfo",
                start: 1649785600,
                end: 1649787400,
                running: false
            });
        });

    }
};