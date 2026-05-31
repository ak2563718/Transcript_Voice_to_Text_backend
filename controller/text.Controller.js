import { asyncHandler } from "../utils/asyncHandler.js";
import { AppError } from '../utils/AppError.js'
import { prisma } from '../src/db.js'


export const getallTranscript = asyncHandler(async(req, res, next)=>{
    const text = await prisma.text.findMany({
        orderBy:{
            createdAt:"desc"
        }
    });
    if(!text){
        return next(new AppError('No recording found',400))
    }
    res.status(200).json({
        message:'found',
        text,
    })
});


export const singletranscript = asyncHandler(async(req, res, next)=>{
    const id = req.params.id;
    const text = await prisma.text.findUnique({
        where:{
            id
        }
    });
    if(!text){
        return next(new AppError('No text found',400))
    }
    res.status(200).json({
        message:'found',
        text,
    })
});


export const deletetext = asyncHandler(async(req, res, next)=>{
    const id = req.params.id;
    const text = await prisma.text.delete({
        where:{
            id
        }
    });
    if(!text){
        return next(new AppError("No text found", 400))
    }
    res.json(200).json({
        message:'Transcript Deleted successfully',
        text
    })
})

export const deleteMany = asyncHandler(async(req, res, next)=>{
    const text = await prisma.text.deleteMany({})
    if(!text){
        return next(new AppError("Nothing to delete", 400))
    }
    res.status(200).json({
        message:"Deleted successfully",
        text
    })
})