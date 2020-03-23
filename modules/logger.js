const morgan = require("morgan");
const winston = require("winston");

const { combine } = winston.format;

const options = level => ({
  console: {
    colorize: true,
    format: combine(
      winston.format.colorize({ all: true }),
      winston.format.timestamp({ format: "HH:MM:SS" }),
      winston.format.printf(
        info => `${info.timestamp} -> ${info.message}`
      )
    ),
    handleExceptions: true,
    level
  }
});

const opts = options(process.env.LOG_LEVEL || "info");

const { error, warn, info, verbose, debug } = winston.createLogger({
  exitOnError: false,
  transports: [new winston.transports.Console(opts.console)]
});

const stream = {
  write: message => {
    info(message.substring(0, message.lastIndexOf("\n")));
  }
};

module.exports = { error, warn, info, verbose, debug };
