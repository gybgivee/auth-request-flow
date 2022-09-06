const jwt = require('jsonwebtoken');


//alica =>eyJhbGciOiJIUzI1NiJ9.YWxpY2E.aWyFHQX6oVipp-qSO_85DXrBpbVj5skg7o59T2HGQP0

const createToken = (payload, secret) => {

    return jwt.sign(payload, secret);
}
const verifyToken = (token, secret) => {
    try {
        return jwt.verify(token, secret);
    } catch (err) {
        return false;
    }

}
module.exports = {
    createToken,
    verifyToken
}