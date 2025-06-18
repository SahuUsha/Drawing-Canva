import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken"
import { JWT_SECRETE } from "@repo/backend-common/config";


export const authMiddleawre =async(req : Request,res: Response, next : NextFunction)=>{
  const token  = req.headers["authorization"] ?? ""

  const decoded = jwt.verify(token , JWT_SECRETE);

  if((decoded as JwtPayload).userId){


      // @ts-ignore
    req.userId = decoded.userId

  }else{

    res.status(403).json({
        message : "Unauthorized"
    })
    
  }


  

}