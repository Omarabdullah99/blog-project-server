import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken'
import UserModel from '../models/userModel.js'

//!jwt token
const secret= "test"

//*register controller
export const signup = async (req, res) => {
    const { email, password, firstName, lastName } = req.body;
    try {
      const oldUser = await UserModel.findOne({ email });
  
      if (oldUser) {
        return res.status(400).json({ message: "User already exists" });
      }
  
      const hashedPassword = await bcrypt.hash(password, 12);
  
      const result = await UserModel.create({
        email, 
        password: hashedPassword,
        name: `${firstName} ${lastName}`,
      });
  
      const token = jwt.sign({ email: result.email, id: result._id }, secret, { //id:result._id why?
        expiresIn: "72h",
      });
      res.status(201).json({ result, token });
    } catch (error) {
      res.status(500).json({ message: "Something went wrong" });
      console.log(error);
    }
  };

  export const testUser=async(req,res)=>{
    res.status(200).json({message:"ok router"})
  }