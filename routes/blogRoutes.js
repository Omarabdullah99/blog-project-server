import express from 'express'
import { createBlog,  deleteBloge,  getBlog, getBlogByUserId, getBlogs, testBlog, updateBlog } from '../controllers/blogController.js'
import auth from '../middleware/auth.js'

const router= express.Router()

router.get("/allblogs",getBlogs)
router.get("/:id",getBlog)
router.get("/userblogs/:id",getBlogByUserId)

router.delete("/deleteblog/:id",deleteBloge)
router.post("/createblog",auth, createBlog)
router.patch("/:id",auth,updateBlog)



router.get("/",testBlog)
export default router