// Post 모델 처리 용 라우터

const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const {
    createPost,
    getAllPosts,
    getPostById,
    updatePost,
    deletePost,
} = require('../controllers/postController');

router.post('/', authMiddleware, createPost);
router.get('/', authMiddleware, getAllPosts);
router.get('/:id', authMiddleware, getPostById);
router.patch('/:id', authMiddleware, updatePost);
router.delete('/:id', authMiddleware, deletePost);

module.exports = router;
