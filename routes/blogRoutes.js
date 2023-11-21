import express from 'express'
import { createBlog, getBlog, getBlogByUserId, getBlogs, testBlog, updateBlog } from '../controllers/blogController.js'
import auth from '../middleware/auth.js'

const router= express.Router()

router.get("/allblogs",getBlogs)
router.get("/:id",getBlog)
router.get("/userblogs/:id",getBlogByUserId)

router.post("/createblog",auth, createBlog)
router.patch("/:id",auth,updateBlog)
router.get("/",testBlog)
export default router