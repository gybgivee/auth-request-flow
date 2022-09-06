const { Prisma } = require('@prisma/client');
const prisma = require('./utils/prisma');
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
module.exports = getUserByUsername;