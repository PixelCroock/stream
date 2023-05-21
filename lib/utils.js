class Utils {
    constructor() {};

    randomNumber(min, max) {
        return Math.floor(Math.random() * max) + min;
    };

    randomPort() {
        return this.randomNumber(65535, 1000);
    }

    isDev(env = global.ENV || process.env.NODE_ENV || "local") {
        return /(local|dev|uat|test|docker)/i.test(env.toLowerCase());
    };

    isStaging(env = global.ENV || process.env.NODE_ENV || "local") {
        return /(cert|staging|qa)/i.test(env.toLowerCase());
    };
};

module.exports = new Utils();