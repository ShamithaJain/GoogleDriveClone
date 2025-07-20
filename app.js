const express=require('express')
const app=express();
const userRouter=require("./routes/user.routes")

const indexRouter=require('./routes/index.routes.js')

const dotenv=require('dotenv');

const cookieParser=require('cookie-parser');
dotenv.config();
const connectToDB=require('./config/db')
connectToDB();


app.set('view engine','ejs');

app.use(express.json()); // Middleware to parse JSON requests
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())

app.use('/',indexRouter)
// all routes are in the other folder and to connect that
// this is used
app.use('/user',userRouter)

app.listen(3001,()=>{
    console.log("server running successfully")
})
