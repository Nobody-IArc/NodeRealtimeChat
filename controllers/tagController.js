// Tag 관리 컨트롤러

/** @type {import('mongoose').Model<import('../models/Tag').TagSchema>} */
const Tag = require('../models/Tag');

const createTag = async (req, res) => {
    const { name, showName, description, commentForUser, icon } = req.body;

    try {
        const isExist = await Tag.findOne({ name: name });
        if (isExist) {
            return res
                .status(409)
                .json({ message: '이미 존재하는 태그 입니다.' });
        }

        if (!name || !showName) {
            return res
                .status(400)
                .json({ message: '태그 생성 시 필수 항목이 누락되었습니다.' });
        }

        /** @type {import('mongoose').Document & TagSchema} */
        const newTag = new Tag({
            name,
            showName,
            description,
            commentForUser,
            icon,
        });

        await newTag.save();

        res.status(201).json({ message: '태그 생성 성공', tag: newTag });
    } catch (err) {
        res.status(500).json({ message: '태그 생성 실패', error: err.message });
    }
};

module.exports = { createTag };
