import express from 'express'
import { signin, signup, testUser } from '../controllers/userController.js'

const router= express.Router()

router.get("/",testUser)
router.post('/signup', signup)
router.post("/signin",signin)

export default router