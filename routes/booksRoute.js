import express from "express";
import { BookModel } from "../models/bookModel.js";

const router = express.Router()
//Route to save a book

router.post('/', async(request, response) => {
    try{
        if(
            !request.body.title||
            !request.body.author||
            !request.body.publishYear
        ){
            return response.status(400).send({
                message: "Send all required fields"
            })
        }
        const newBook = {
            title: request.body.title,
            author: request.body.author,
            publishYear: request.body.publishYear
        };
        const book = await BookModel.create(newBook);

        return response.status(201).send(book);
        }catch(error){
        console.log(error.message);
        response.status(500).send({message:error.message})
        }
})

//Get all books from database
router.get('/', async(request, response) => {
    try{
        const allBooks = await BookModel.find({});
        return response.status(200).json(   {count: allBooks.length,
            data: allBooks})
       }catch(error){
        console.log(error.message);
        response.status(500).send({message:error.message})
    }
})
 
//Get a book from ID
router.get('/:id', async(request, response) => {
    try{
            const {id} = request.params
            const book = await BookModel.findById(id)

            return response.status(201).json(book)

       }catch(error){
        console.log(error.message);
        response.status(500).send({message:error.message})
    }
})

//Update a book

router.put('/:id' , async(req, res)=>{
    try{
        if(
            !req.body.title||
            !req.body.author||
            !req.body.publishYear
        ){
            return res.status(400).send({
                message: "Send all required fields"
            })
        }
    const {id} = req.params

    const result = await BookModel.findByIdAndUpdate(id, req.body)
    if(!result){
        res.status(404).send({message: "Book not found!"})
    }
    return res.status(200).send({message: "Book updated succesfully!"})
    }catch(error){
        console.log(error.message);
        res.status(500).send({message: error.message})
    }
})

//Delete a book 

router.delete("/:id", async(req, res)=>{
    try{
        const { id } = req.params;

        const result = await BookModel.findByIdAndDelete(id);

        if(!result){
           return  res.status(404).json({message: "Book not found! ;("})
        }

        return res.status(200).send({ message: "Book deleted succesfully!" })
    } catch(error){
        console.log(error.message);
        res.status(500).send({message: error.message})
    }}
);



export default router;