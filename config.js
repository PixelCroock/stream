
// Server configuration
module.exports.ENV = process.env.NODE_ENV || global.ENV || "local";
module.exports.PORT = process.env.PORT || 3000;

// Game configuration
module.exports.MAX_SCORE = 13333;
module.exports.MAX_STARS = (version = Number) => {
    switch(version) {
        default:
        case 2016:
            return 5;
        case 2017:
            return 6;
        case 2018: case 2019: case 2020: case 2021: case 2022:
            return 7;
    };
};

// Custom configuration
module.exports.MAX_RECOMMENDED_SONGS = 10;