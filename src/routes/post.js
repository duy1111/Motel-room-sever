import express  from 'express'
import * as postController from '../controllers/post'
import verifyToken from '../middlewares/verifyToken'
const router = express.Router()
router.get('/all',postController.getPosts)
router.get('/limit',postController.getPostsLimit)
router.get('/new-post',postController.getNewPostsLimit)

router.use(verifyToken)

router.post('/create-new-post',postController.createNewPost)
router.get('/limit-admin',postController.getPostsLimitAdmin)
router.put('/update-post',postController.updatePostsAdmin)
router.delete('/delete-post',postController.deletePost)

export default router