import express, { Router } from 'express'
import {Book} from './schema.js'



const router = express.Router()

router.post("/books",async(req, res , next)=>{
    try {
        const newBook = await Book.create(req.body)
        res.status(200).json({
            message : " new Book Created",
            data : newBook
        })
    } catch (error) {
        res.status(400).json({
            message : error.message
        })
    }
})

router.get("/books", async(req, res)=>{
    const { author , title , genre} = req.query
    let query = {}
    if(author){
        query.author = { $regex : author , $options : "i" }
    }
    if(title){
        query = { ...query  , title : { $regex : title , $options : "i"  }}
    }
    if(genre){
        query = { ...query  , genre : genre }
    }
    console.log(query);
    try{
        const data  = await Book.find(query)
        res.status(200).json(data)
    }catch(err){
        res.status(400).json({
            message : err.message
        })
    }
})

router.get("/books/:id", async(req, res)=>{
    try{
        const data  = await Book.findById(req.params.id)
        res.status(200).json(data)
    }catch(err){
        res.status(400).json({
            message : err.message
        })
    }
})

router.put("/books/:id",async (req, res)=>{
    try {
        const book = await Book.findByIdAndUpdate(req.params.id, req.body,{new : true})
        res.status(200).json({
            message : "Book updated",
            book : book
        })
    } catch (error) {
        res.status(400).json({
            message : err.message
        })
    }
})

router.delete("/books/:id",async (req, res)=>{
    try {
        const book  = await Book.findByIdAndDelete(req.params.id)
        res.status(200).json({

            message : "Book deleted ",
            book : book
        })
    } catch (error) {
        res.status(400).json({message: err.message})
    }
})




export default router