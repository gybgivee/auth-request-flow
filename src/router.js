const express = require('express');
const router = express.Router();
const {
    checkRequest,
    mockProfile,
    mockUser
} = require('./utils');
const {
    createToken,
    verifyToken
} = require('./auth');
const getUserByUsername = require('./model');

const mySecretKey = 'HelloJS';

router.post('/login', (req, res) => {
   
    const { profile, ...user } = req.body;
    console.log({profile,user});
    
    if (checkRequest(user,mockUser) && checkRequest(profile,mockProfile)) {
        const token = createToken(user.username, mySecretKey);
        res.status(200).json({ token });
    }
    return res.status(400).json({ error: 'Missing fields in request' });

});

router.get('/profile', async (req, res) => {

    const fullToken = req.get('authentication');
    const token = fullToken.split(' ')[1];
    const auth = verifyToken(token, mySecretKey);
    console.log({ auth });
    if (auth) {
        const user = await getUserByUsername(auth);
        console.log({ user });
        return res.status(200).json({ user })
    }
    return res.status(404).json({ login: 'unsuccessful' })



});


module.exports = router;
