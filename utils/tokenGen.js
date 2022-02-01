const jwt = require('jsonwebtoken');


exports.getToken = async (details) => {
    return jwt.sign(
        details, "dontguessit"
    );
}
