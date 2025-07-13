import { WebSocket, WebSocketServer } from 'ws'
import jwt, { JwtPayload } from "jsonwebtoken"
// import { JWT_SECRETE } from '@repo/backend-common/config';
import { JWT_SECRET } from "./config";
import {prismaClient} from "@repo/db"

const wss = new WebSocketServer({ port: 8080 });


// to managae state in backend -- we can user redux-tool and other
// but here we are using array method not good but okay easy to understand

interface User {
  ws : WebSocket,
  rooms: string[],
  userId : string
}

const users : User[] = [];

function checkUser(token:string) : string | null {
try {
    const decoded = jwt.verify(token,JWT_SECRET)
  
    if(typeof decoded == "string"){
      return null;
    }
  
  
    if(!decoded || !decoded.userId){
      return null
    }
  
  
    return decoded.userId
} catch (error) {
  console.log("error : ",error)
  return null
}

}

wss.on('connection', function connection(ws, request) {
  ws.on('error', console.error);

  const url = request.url 
  
  if(!url){
      return;
    }
    // ws://localhost:3000?token =123123
   // ["ws://localhost:3000", "token = 123123"]

  const queryParams = new URLSearchParams(url.split('?')[1])
  const token = queryParams.get('token') || "";
  const userId = checkUser(token)

  if(userId==null){
      ws.close()
      return null
  }

  users.push({
    userId,
    rooms: [],
    ws
  })





  ws.on('message',async function message(data){

    // const parseData = JSON.parse(data as unknown as string)

    let parseData ;

    if(typeof data !== "string"){
      parseData = JSON.parse(data.toString());

    }else{
      parseData = JSON.parse(data)
    }

    

    if(parseData.type ==="join_room"){
      const user = users.find(x=>x.ws==ws)
      user?.rooms.push(parseData.roomId)
    }
      

    if(parseData.type === "leave_room"){
       const user = users.find(x=>x.ws==ws)
    
       if(!user){
        return
       }

      user.rooms = user?.rooms.filter(x=>x===parseData.room)
    }
    
  
    if(parseData.type === "chat"){
      const roomId = parseData.roomId;
      const message = parseData.message;

       await  prismaClient.chat.create({
      data:{
        roomId : Number(roomId),
        message,
        userId

      }
    })


      users.forEach(user=>{
        if(user.rooms.includes(roomId)){
          user.ws.send(JSON.stringify({
            type:"chat",
            message:message,
            roomId
          }))
        }
      })
    }
    



  });
 
});