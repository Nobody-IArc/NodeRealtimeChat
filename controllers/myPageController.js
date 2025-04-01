// 사용자 마이페이지 관련 컨트롤러

/** @type {import('mongoose').Model<import('../models/ChatRoom')>} */
const ChatRoom = require('../models/ChatRoom');
const analyzeTags = require('../utils/analyzeTags');

const getTagStats = async (req, res) => {
    const userId = req.user.userId;

    try {
        const joinedRooms = await ChatRoom.find({ participants: userId }).populate('tags');

        const { tagCounts, topTag, comment } = analyzeTags(joinedRooms);

        res.status(200).json({
            message: '태그 분석 성공',
            tagCounts: tagCounts,
            topTag: topTag,
            comment: comment,
        });
    } catch (err) {
        res.status(500).json({ message: '태그 분석 실패', error: err.message });
    }
};

module.exports = { getTagStats };
