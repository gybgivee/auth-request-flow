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
module.exports = {
    checkRequest,
    mockUser,
    mockProfile
}