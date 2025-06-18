import express, { Request, Response } from "express"
import jwt from "jsonwebtoken"
import { JWT_SECRETE } from "@repo/backend-common/config";
import { authMiddleawre } from "./middleware";
import {CreateUserSchema , SigninUserSchema ,RoomSchema} from "@repo/common/types"

const app = express();
app.use(express.json());


app.post("/signup" , (req : Request,res : Response) => {

    const data = CreateUserSchema.safeParse(req.body);

    if(!data.success){
        res.json({
            message : "Incorrect inputs"
        });
        return 
    }


res.json({
    userId :"34"
})
    
}
)


app.post("/signin" , (req,res)=>{

    const data = SigninUserSchema.safeParse(req.body)

    if(!data.success){
        res.json({
            message : "Incorrect inputs"
        });
        return 
    }




    const userId = 1;
    const token = jwt.sign({userId },JWT_SECRETE)
       

})
app.post("/room" ,authMiddleawre ,(req,res)=>{

     const data = RoomSchema.safeParse(req.body)

    if(!data.success){
        res.json({
            message : "Incorrect inputs"
        });
        return 
    }
 // db

res.json({
    roomId : 123
})


})

app.listen(5000)