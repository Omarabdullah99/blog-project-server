import express from 'express'
import mongoose from 'mongoose'
import BlogModel from '../models/blogModel.js'

export const createBlog= async(req,res)=>{ //*create Tour like post
    const blog= req.body
    // console.log("blog",blog)
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

//*getTourById
export const getBlog=async (req,res)=>{
    const {id}= req.params
    try {
        const blog= await BlogModel.findById(id)
        res.status(200).json(blog)
        
    } catch (error) {
        res.status(404).json({message:"something wrong"})
        
    }

}

export const getBlogByUserId=async(req,res)=>{
    const {id}=req.params
    // console.log("userTOur",id)
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({message:"user dosen't exist"})
    }
    const userBlogs= await BlogModel.find({creator:id})
    // console.log("backend",userBlogs)
    res.status(200).json(userBlogs)
}

export const updateBlog = async (req, res) => {
    const { id } = req.params;
    // console.log("update",id)
    const {title, description,imageFile, tags,category,  creator, } = req.body;
    console.log(req.body)
    try {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ message: `No tour exist with id: ${id}` });
      }
  
      const updatedTour = {
        creator,
        title,
        description,
        tags,
        category,
        imageFile,
        _id: id,
      };
      await BlogModel.findByIdAndUpdate(id, updatedTour, { new: true });
      res.json(updatedTour);
    } catch (error) {
      res.status(404).json({ message: "Something went wrong" });
    }
  };

  export const deleteBloge = async (req, res) => {
    const { id } = req.params;
    console.log("deleteBlog",id)
    try {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ message: `No tour exist with id: ${id}` });
      }

      const deletedBlog = await BlogModel.findByIdAndDelete(id);

      if (!deletedBlog) {
        return res.status(404).json({ message: `No blog found with id: ${id}` });
      }

    res.json({ message: "Blog deleted successfully" });
    } catch (error) {
      res.status(404).json({ message: "Something went wrong" });
    }
  };

  export const getBlogBySearch = async (req, res) => {
    const { searchQuery } = req.query;
    try {
      const title = new RegExp(searchQuery, "i");
      const blogs = await BlogModel.find({ title });
      res.json(blogs);
    } catch (error) {
      res.status(404).json({ message: "Something went wrong" });
    }
  };
  

export const testBlog=async(req,res)=>{
    res.status(200).send("okk test")

}