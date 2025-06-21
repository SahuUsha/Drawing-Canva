import express, { Request, Response } from "express"
import jwt, { JwtPayload } from "jsonwebtoken"
// import {JWT_SECRET} from "@repo/backend-common/config";
import { JWT_SECRET } from "./config";
import { authMiddleawre } from "./middleware";
// import {CreateUserSchema , SigninUserSchema ,RoomSchema} from "@repo/common/types"
import { prismaClient } from "@repo/db";
import {z} from "zod"

const app = express();
app.use(express.json());

const CreateUserSchema = z.object({
    username: z.string().min(3).max(20),
    password: z.string(),
    name: z.string()
})

const SigninUserSchema = z.object({
    username: z.string().min(3).max(20),
    password: z.string(),
})

const RoomSchema = z.object({
    name: z.string().min(3).max(20),
})
app.post("/signup" , async(req : Request,res : Response) => {

    const data = CreateUserSchema.safeParse(req.body);

    if(!data.success){
        res.json({
            message : "Incorrect inputs"
        });
        return 
    }
// hash password
    

    try {
     const existedUser = await prismaClient.user.findFirst({
        where:{

            username : data.data?.username,
        }
     })

     if(existedUser){
        res.status(411).json({
            message : "User already existed with same username"
        })
        return
     }

        const user = await prismaClient.user.create({
            data:{
                username : data.data?.username,
                password  : data.data?.password,
                name  : data.data?.name
            }   
        })

        res.json({
            userId : user.id,
            message : "User created successfully"

        })
        
    } catch (error) {
        res.status(411).json({
            message : "error on creating user name "
        })
        
    }

}
)


app.post("/signin" ,async (req,res)=>{

    const data = SigninUserSchema.safeParse(req.body)

    if(!data.success){
        res.json({
            message : "Incorrect inputs"
        });
        return 
    }

   try {
     const user = await prismaClient.user.findFirst({
         where : {
             username : data.data?.username,
             password : data.data?.password
 
         }
     })
 
     if(!user){
         res.status(404).json({
             message: "user not found"
         })
         return
     }
 
     const userId = user?.id;
     const token = jwt.sign({userId:userId },JWT_SECRET as string)
 
     if(!token){
          res.status(401).json({
             message: "error on creating token"
         })
     }

     res.status(200).json({
        token : token
     })
        
   } catch (error) {
    res.status(500).json({
        message : "error on signing"
    })
    
   }

})
app.post("/room" ,authMiddleawre ,async(req,res)=>{

     const data = RoomSchema.safeParse(req.body)

    if(!data.success){
        res.json({
            message : "Incorrect inputs"
        });
        return 
    }
 
  try {
      // @ts-ignore
      const userId = req.userId;


      const existedRoom = await prismaClient.room.findFirst({
        where:{
            slug : data.data?.name
        }
      })

      if(existedRoom){
  res.status(400).json({
        message : "Room already exists with this name "
        
    })
    return
      }
  
      const room= await prismaClient.room.create({
          data : {
              slug : data.data?.name,
              adminId : userId
          }
      })
  
      res.status(200).json({
          roomId : room.id
      })
  
  } catch (error) {
      res.status(500).json({
        message : "error on creating room"
      })
    
  }
})

app.get("/chats/:roomId",async(req , res)=>{
    try {
        const roomId = Number(req.params.roomId);
        console.log("room id : ", roomId)
        console.log(req.params.roomId);
        const messages = await prismaClient.chat.findMany({
         where: {
            roomId: roomId
         },
         orderBy :{
            id:"desc"
         },
          take : 50
    
        })
    
        res.json({
            messages
        })
    } catch (error) {
        console.log(error)
        res.json({
            messages:[]
        })
        
    }

})

app.get("/room/:slug",async(req,res)=>{

    const slug = req.params.slug
    console.log(slug)

    const room = await prismaClient.room.findFirst({
        where : {
            slug
        }
    })

    res.json({
        room
    })
})


app.listen(5000)