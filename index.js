import express from 'express'
import cors from "cors"
import morgan from 'morgan';
import mongoose from 'mongoose';
import blogs from './api/blogsData.json' assert { type: 'json' };
import UserRouter from './routes/userRoutes.js'
import BlogeRouter from './routes/blogRoutes.js'

const app = express()

//middleware
app.use(morgan("dev"))
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors())

//*Router Middleware
app.use("/users",UserRouter)
app.use("/blog",BlogeRouter)

//*mongodb connection
const MONGODB_URL="mongodb+srv://omar:JhB4IyKLdAzUna1u@blog-server.01rgith.mongodb.net/?retryWrites=true&w=majority"
const port = 5000;

main().catch(err => console.log(err))
async function main(){
    await mongoose.connect(MONGODB_URL);
    console.log('database connected')
  }

app.get('/', (req, res) => {
    res.send("Blog server is running!")
});

app.get('/blogs', (req, res) => {
  res.send(blogs)
})
app.get('/blogs/:id', (req, res) => {
  const id = parseInt(req.params.id);
  // console.log(id)
  const blog = blogs.filter(b => b.id === id);
  // console.log(blog)
  res.send(blog)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

