const { Prisma } = require('@prisma/client');
const prisma = require('./utils/prisma');
const express = require('express');
const jwt = require('jsonwebtoken');

const router = express.Router();
const mySecretKey = 'HelloJS';
const mockUser = {
    username: 'authguy',
    password: 'mypassword',
};
const mockProfile = {
        firstName: 'Chris',
        lastName: 'Wolstenholme',
        age: 43
}
const checkRequest = (obj,pattern) => {
    const keysOfPattern = Object.keys(pattern);
    const keysOfObj = Object.keys(obj);

    if (keysOfPattern.length === keysOfObj.length) {
        const isNotMatch = keysOfPattern.some((key, index) => {
            if (key !== keysOfObj[index] || obj[index] === null || undefined) return true;
            return false;
        });

        if (isNotMatch) {
            return;
        }
        return true;

    }
    return;

}
const getUserByUsername = async (username) => {
    try {
        const user = await prisma.user.findUnique({
            where: {
                username,
            },
            include: {
                profile: true
            }
        });
        return user;

    } catch (err) {
        console.log({ err });
        return;
    }
}
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
