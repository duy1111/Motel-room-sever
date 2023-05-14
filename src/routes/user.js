import express from 'express'
import * as controllers from '../controllers/user'
import verifyToken from '../middlewares/verifyToken'
const router = express.Router()
router.use(verifyToken)
router.get('/get-current', controllers.getUser)
router.put('/update-user',controllers.getUpdateUser)
export default router