// 피드 형식의 게시글 조회 관련 컨트롤러

const mongoose = require('mongoose');
/** @type {import('mongoose').Model<import('../models/Post')>} */
const Post = require('../models/Post');

/**
 * @typedef {Object} FeedQuery
 * @property {string} [tagId]
 * @property {string} [limit]
 */

const getRandomFeed = async (req, res) => {
    /** @type {FeedQuery} */
    const query = req.query;
    const limit = parseInt(query.limit) || 20;
    const tagId = query.tagId;

    try {
        const matchStage = tagId
            ? { tags: mongoose.Types.ObjectId(tagId) }
            : {};

        // 중복 코드를 PipeLine 형식으로 리팩터링
        const joinWriterPipeline = [
            {
                $lookup: {
                    // ^ join 기능 연산자
                    from: 'chatusers', // 소문자 복수형 - MongoDB 컬렉션 처리 방식
                    localField: 'writer',
                    foreignField: '_id',
                    as: 'writerInfo',
                },
            },
            { $unwind: '$writerInfo' }, // 배열 -> 객체 변환
            {
                $project: {
                    // ^ 원하는 필드만 필터링
                    content: 1,
                    createdAt: 1,
                    writer: '$writerInfo.username',
                    tags: 1,
                },
            },
        ];

        // tagId 가 있는 경우
        if (tagId) {
            /** @type {import('mongoose').Document & PostSchema[]} */
            const randomPosts = await Post.aggregate([
                { $match: matchStage },
                { $sample: { size: limit } }, // 랜덤으로 Document 가져오는 연산자
                ...joinWriterPipeline,
            ]);

            // .length 속성으로 limit 수와의 차이 점검
            const fetchedCount = randomPosts.length;

            // limit 수 보다 적은 게시글을 찾았다면 랜덤으로 다른 게시글 추가
            if (fetchedCount < limit) {
                const extraCount = limit - fetchedCount;

                const extraPosts = await Post.aggregate([
                    {
                        $match: {
                            tags: { $ne: mongoose.Types.ObjectId(tagId) },
                        },
                    },
                    { $sample: { size: extraCount } },
                    ...joinWriterPipeline,
                ]);

                const resultPosts = [...randomPosts, ...extraPosts];

                return res.status(200).json({
                    message: '랜덤 피드 조회 성공',
                    posts: resultPosts,
                });
            }

            return res.status(200).json({
                message: '랜덤 피드 조회 성공',
                posts: randomPosts,
            });
        } else if (!tagId) {
            // ^ tagId 가 없는 경우
            const randomPosts = await Post.aggregate([
                { $sample: { size: limit } },
                ...joinWriterPipeline,
            ]);

            return res.status(200).json({
                message: '랜덤 피드 조회 성공',
                posts: randomPosts,
            });
        }
    } catch (err) {
        return res.status(500).json({
            message: '랜덤 피드 조회 실패',
            error: err.message,
        });
    }
};

module.exports = { getRandomFeed };
