import express from 'express'
import { createBlog, getBlogs, testBlog } from '../controllers/blogController.js'
import auth from '../middleware/auth.js'

const router= express.Router()

router.get("/",getBlogs)

router.post("/createblog",auth, createBlog)
router.get("/",testBlog)
export default router