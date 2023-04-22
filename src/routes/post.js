import express  from 'express'
import * as postController from '../controllers/post'
const router = express.Router()
router.get('/all',postController.getPosts)
router.get('/limit',postController.getPostsLimit)
router.get('/new-post',postController.getNewPostsLimit)
export default router