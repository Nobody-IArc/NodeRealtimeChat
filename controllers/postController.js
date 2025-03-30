// Post 모델을 다루는 컨트롤러

const Post = require('../models/Post');

// 게시글 작성
const createPost = async (req, res) => {
    const userId = req.user.userId;
    const { title, content, image } = req.body;

    // 필수 값 입력 여부 확인
    if (!title || !content) {
        return res
            .status(400)
            .send({ message: '제목과 글 내용은 반드시 입력해야 합니다.' });
    }

    try {
        const newPost = Post.create({
            writer: userId,
            title: title,
            content: content,
            image: image,
        });

        res.status(201).json({ message: '게시글 작성 성공', post: newPost });
    } catch (err) {
        res.status(500).json({
            message: '게시글 작성 실패',
            error: err.message,
        });
    }
};

// 게시글 전체 조회 - 필터링 기능
const getAllPosts = async (req, res) => {
    const { writer } = req.query;
    // 구조 분해 할당 방식으로 받아온 writer 을 이용해 검색 필터 설정
    const filter = writer ? { writer: writer } : {};

    try {
        const postList = await Post.find(filter)
            .sort({ createdAt: -1 })
            .populate('writer', 'username');

        res.status(200).json({
            message: '게시글 조회 성공',
            postList: postList,
        });
    } catch (err) {
        res.status(500).json({
            message: '게시글 조회 실패',
            error: err.message,
        });
    }
};

// postId 로 게시글 조회
const getPostById = async (req, res) => {
    const postId = req.params.id;

    try {
        const post = await Post.findById(postId);

        // 게시글 존재 여부 확인
        if (!post) {
            return res
                .status(404)
                .json({ message: '게시글을 찾을 수 없습니다.' });
        }

        res.status(200).json({ message: '게시글 조회 성공', post: post });
    } catch (err) {
        res.status(500).json({
            message: '게시글 조회 실패',
            error: err.message,
        });
    }
};

// 게시글 수정
const updatePost = async (req, res) => {
    const postId = req.params.id;
    const userId = req.user.userId;
    const { title, content, image } = req.body;

    // 필수 값 입력 여부 확인
    if (!title || !content) {
        return res
            .status(400)
            .json({ message: '제목과 글 내용은 반드시 입력해야 합니다.' });
    }

    try {
        const post = await Post.findById(postId);

        // 게시글 존재 여부 확인
        if (!post) {
            return res
                .status(404)
                .json({ message: '게시글을 찾을 수 없습니다.' });
        }

        // 게시글 수정 권한 확인
        if (post.writer.toString() !== userId) {
            return res
                .status(403)
                .json({ message: '게시글 수정 권한이 없습니다.' });
        }

        // 수정된 값이 있는 경우에 수정
        if (title) post.title = title;
        if (content) post.content = content;
        if (image !== undefined) post.image = image;

        await post.save();

        res.status(200).json({ message: '게시글 수정 완료', post: post });
    } catch (err) {
        res.status(500).json({
            message: '게시글 수정 실패',
            error: err.message,
        });
    }
};

// 게시글 삭제
const deletePost = async (req, res) => {
    const postId = req.params.id;
    const userId = req.user.userId;

    try {
        const post = await Post.findById(postId);

        // 게시글 존재 여부 확인
        if (!post) {
            return res
                .status(404)
                .json({ message: '게시글을 찾을 수 없습니다.' });
        }

        // 게시글 삭제 권한 확인
        if (post.writer.toString() !== userId) {
            return res
                .status(403)
                .json({ message: '게시글 삭제 권한이 없습니다.' });
        }

        await post.deleteOne();

        res.status(200).json({ message: '게시글 삭제 완료' });
    } catch (err) {
        res.status(500).json({
            message: '게시글 삭제 실패',
            error: err.message,
        });
    }
};

module.exports = {
    createPost,
    getAllPosts,
    getPostById,
    updatePost,
    deletePost,
};
