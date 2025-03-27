// hash 된 password 와 전송된 password 의 일치 확인

const bcrypt = require('bcrypt');

// 일치 여부를 반환
const comparePassword = async (password, hashedPassword) => {
    return await bcrypt.compare(password, hashedPassword);
};

module.exports = comparePassword;
