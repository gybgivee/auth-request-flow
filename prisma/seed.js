const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function seed() {
    const user = await createUser();
    process.exit(0);

}
async function createUser() {
    const user = await prisma.user.create({
        data: {
            username: "alica",
            password: "123456",
            profile: {
                create: {
                    firstName: "alica",
                    lastName: "Uniawa",
                    age: 25
                }
            }
        }
    });
    console.log({ user });
    return user;
}
seed()
    .catch(async e => {
        console.error(e);
        await prisma.$disconnect();
    })
    .finally(() => process.exit(1));