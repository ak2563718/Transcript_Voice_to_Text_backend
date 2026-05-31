import { decoderefreshToken } from "../utils/tokenCreation.js";

export const authmiddleware = async(req, res, err, next)=>{
    try {
        const token = req.cookies?.refresh;
        if(!token){
            return res.status(401).json({
                message:"no token found"
            })
        }
        const user = decoderefreshToken(token)
        if(!user){
            return res.status(401).json({
                message:'invalid token'
            })
        }
        req.user = user;
        next()
    } catch (error) {
        res.status(500).json({message:"internal server error"}) 
    }
}