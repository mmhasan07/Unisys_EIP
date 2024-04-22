module.exports.generateAuthKey = () => {
    const digits = '0123456789';
    let authKey = '';
    for (let i = 0; i < 6; i++) {
      authKey += digits[Math.floor(Math.random() * digits.length)];
    }
    return authKey;
}