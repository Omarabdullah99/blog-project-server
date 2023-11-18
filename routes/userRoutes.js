import express from 'express'
import { signup, testUser } from '../controllers/userController.js'

const router= express.Router()

router.get("/",testUser)
router.post('/signup', signup)

export default router