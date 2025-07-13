import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken"
// import { JWT_SECRET } from "@repo/backend-common/config";
import { JWT_SECRET } from "./config";


export const authMiddleawre =async(req : Request,res: Response, next : NextFunction)=>{
  const token  = req.headers["authorization"] ?? ""

  const decoded = jwt.verify(token , JWT_SECRET as string);

  if((decoded as JwtPayload).userId){


      // @ts-ignore
    req.userId = decoded.userId
    next()

  }else{

    res.status(403).json({
        message : "Unauthorized"
    })
    
  }


  

}