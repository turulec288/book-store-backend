import express from "express"
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { BookModel } from "./models/bookModel.js";
import router from "./routes/booksRoute.js";
import cors from "cors";
const app = express();

//Middleware for parsing request body
app.use(express.json());

//Middleware for handling CORS policy
//Option1: Allow All Origins with Default of cors (*)
   // app.use(cors())

//Option 2: Allow custom origins
app.use(
    cors({
        origin: ['http://localhost:5173', 'https://book-store.onrender.com'],
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type'],
    })
);

//Home Route
app.get("/", (request, response)=>
{
    console.log(request)
    return response.status(234).send("Welcome 2 my page");
} );

// Routes refactor
app.use("/books", router)

mongoose.connect(mongoDBURL).then(()=>{
    console.log('App connectected to database');
    app.listen(PORT, ()=>{
        console.log(`App is listening to port: ${PORT}`)
    })
}).catch((error)=>{
    console.log(error);
})