import express from 'express'
import mongoose from 'mongoose'
import BlogModel from '../models/blogModel.js'

export const createBlog= async(req,res)=>{ //*create Tour like post
    const blog= req.body
    console.log("blog",blog)
    const newBlog= new BlogModel({
        ...blog,
        creator: req.userId, //!don't understand this code
        createdAt: new Date().toISOString()
    })

    try {
        await newBlog.save()
        res.status(201).json(newBlog)
        
    } catch (error) {
        res.status(404).json({message:"Something went wrong"})
    }
}

export const getBlogs= async (req,res)=>{
    try {
        const blogs= await BlogModel.find()
        res.status(200).send(blogs);
        
    } catch (error) {
        console.log(error)
    }
}

export const testBlog=async(req,res)=>{
    res.status(200).send("okk test")

}