import express from 'express';
import { Book } from '../models/bookModels.js';
const router=express.Router();


router.post('/', async (req, res) => {
    try {
        const { title, author, publishYear } = req.body;

        if (!title || !author || !publishYear) {
            return res.status(400).send({
                message: 'Please provide title, author, and publishYear'
            });
        }

        const newBook = {
            title,
            author,
            publishYear,
        };

        const book = await Book.create(newBook);
        return res.status(201).json(book);
    } catch (error) {
        console.error(error);
        res.status(500).send({
            message: 'Internal Server Error'
        });
    }
});

router.get('/', async(req,res)=>{
    try {
        const books =await Book.find({});
        return res.status(201).json({
            count:books.length,
            data:books
    });
    } catch (error) {
        console.log(error.message);
        res.status(500).send({message:error.message});
    }
});

router.get('/:id', async(req,res)=>{
    try {
        const { id } =req.params;
        const book =await Book.findById(id);
        return res.status(201).json(book);
    } catch (error) {
        console.log(error.message);
        res.status(500).send({message:error.message});
    }
});

router.put('/:id', async(req,res)=>{
    try {
        const { title, author, publishYear } = req.body;

        if (!title || !author || !publishYear) {
            return res.status(400).send({
                message: 'Please provide title, author, and publishYear'
            });
        }
        const { id } =req.params;
        const result =await Book.findByIdAndUpdate(id,req.body);
        if (!result){
            return res.status(404).json({massage:'book not found'});
        }
        return res.status(200).send({message:'book updated'});
    } catch (error) {
        console.log(error.message);
        res.status(500).send({message:error.message});
    }
});

router.delete('/:id', async(req,res)=>{
    try {
        const { id } =req.params;
        const result =await Book.findByIdAndDelete(id);
        if (!result){
            return res.status(404).json({massage:'book not found'});
        }
        return res.status(200).send({message:'book updated'});
    } catch (error) {
        console.log(error.message);
        res.status(500).send({message:error.message});
    }
});

export default router;