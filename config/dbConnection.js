// MongoDB 연결을 위한 파일
// Local 에 설치한 MongoDB와 연동 MONGODB_URI 는 환경변수로 가져옴

const mongoose = require('mongoose');

const dbConnect = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB Connected Successfully!');
    } catch (err) {
        console.error(err);
    }
};

module.exports = dbConnect;
