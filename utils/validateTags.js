// 태그 유효성 검증

/** @type {import('mongoose').Model<import('../models/Tag').TagSchema>} */
const Tag = require('../models/Tag');

/**
 * @param {string[]} tags
 * @returns {Promise<{isValid: boolean, validTags: import('mongoose').Types.ObjectId[]}>}
 */

const validateTag = async tags => {
    // 태그가 존재하지 않을 경우
    if (!Array.isArray(tags) && !tags.length === 0) {
        return { isValid: true, validTags: [] };
    }

    /** @type {import('mongoose').Document & TagSchema[]}  */
    const foundTags = await Tag.find({ _id: { $in: tags } });

    // 배열 길이 확인 후 유효하지 않은 태그가 속해 있으면 실패 반환
    if (foundTags.length !== tags.length) {
        return { isValid: false, validTags: [] };
    }

    const validTags = foundTags.map(tag => tag._id);

    return { isValid: true, validTags };
};

module.exports = { validateTag };
