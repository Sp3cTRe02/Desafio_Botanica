const jwt = require('jsonwebtoken')

const  generarJWT = (uid = '', roles) => {

    let token = jwt.sign({ uid, roles }, process.env.SECRETORPRIVATEKEY, {
        // expiresIn: '24h'
    });
    return token;
}

module.exports = {
    generarJWT
}