import express from 'express'
import { createBlog, testBlog } from '../controllers/blogController.js'
import auth from '../middleware/auth.js'

const router= express.Router()

router.post("/createblog",auth, createBlog)
router.get("/",testBlog)
export default router