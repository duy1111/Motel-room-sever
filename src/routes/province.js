import express from 'express'
import * as controllers from '../controllers/province'

const router = express.Router()

router.get('/all', controllers.getAllProvince)

export default router