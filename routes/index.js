const express = require('express');
const router = express.Router();
const multer = require('multer');
const { UserController, PostController, CommentController, LikeController, FollowController } = require('../controllers');
const authenticateToken = require('../middleware/auth');
const { followUser } = require('../controllers/follow-controller');

const uploadDestination = 'uploads';

// Shows where to store files
const storage = multer.diskStorage({
    destination: uploadDestination,
    filename: function(req, file, cb) {
        cb(null, file.originalname)
    }
})

const uploads = multer({ storage: storage })

// User routes
router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.get('/current', authenticateToken, UserController.current)
router.get('/users/:id', authenticateToken, UserController.getUserId)
router.put('/users/:id', authenticateToken, UserController.updateUser)

// Post routes
router.post('/posts', authenticateToken, PostController.createPost)
router.get('/posts', authenticateToken, PostController.getAllPosts)
router.get('/posts/:id', authenticateToken, PostController.getPostById)
router.delete('/posts/:id', authenticateToken, PostController.deletePost)

// Comment routes
router.post('/comments', authenticateToken, CommentController.createComment)
router.delete('/comments/:id', authenticateToken, CommentController.deleteComment)

// Like routes
router.post('/like', authenticateToken, LikeController.likePost)
router.delete('/like/:id', authenticateToken, LikeController.unLikePost)

// Follow routes
router.post('/follow', authenticateToken, FollowController.followUser)
router.delete('/unfollow/:id', authenticateToken, FollowController.unFollowUser)

module.exports = router;
