import express from 'express'
import * as controllers from '../controllers/user'
import verifyToken from '../middlewares/verifyToken'
const router = express.Router()
router.use(verifyToken)
router.get('/get-current', controllers.getUser)
router.put('/update-user',controllers.getUpdateUser)
router.get('/get-all-user',controllers.getAllUser)
router.delete('/delete-user',controllers.deleteUser)
router.put('/update-user-admin',controllers.getUpdateUserWithAdmin)
export default router