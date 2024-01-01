var express = require('express');
var cors = require('cors');
var router = express.Router();

const post_controller = require("../controllers/postController");
const user_controller = require("../controllers/userController");
const comment_controller = require("../controllers/commentController");

const corsOptions = {
    origin: "*",
    optionsSuccessStatus: 200
}

/* GET users listing. */
router.get('/', cors(), post_controller.all_posts);

router.options('/', cors());
router.post('/', cors(), post_controller.post_post);

router.options('/:id', cors());
router.post('/post/:id', post_controller.post_get);

router.put('/post/:id', post_controller.post_put);

router.options('/posts/:id', cors());
router.delete('/posts/:id', cors(), post_controller.post_delete);

router.options('/login', cors());
router.post('/login', cors(), user_controller.login);

router.get('/landing', cors(), user_controller.login_authenticated);

router.get('/comments', cors(), comment_controller.comments_get);
router.post('/comments', cors(), comment_controller.comment_post);
router.delete('/comments', cors(), comment_controller.comment_delete);

module.exports = router;
