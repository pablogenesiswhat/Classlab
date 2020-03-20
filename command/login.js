const OAuth = require("../modules/auth");
const { TOKEN_PATH } = require("../modules/config");

const oauth = new OAuth();

oauth.login();
