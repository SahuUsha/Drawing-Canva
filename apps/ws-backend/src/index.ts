import { WebSocketServer } from 'ws'
import jwt, { JwtPayload } from "jsonwebtoken"
import { JWT_SECRETE } from '@repo/backend-common/config';

const wss = new WebSocketServer({ port: 8080 });

wss.on('connection', function connection(ws, request) {
  ws.on('error', console.error);

  const url = request.url 
  
  if(!url){
      return;
    }
    // ws://localhost:3000?token =123123
   // ["ws://localhost:3000", "token = 123123"]

  const queryParams = new URLSearchParams(url.split('?')[1])
  const token = queryParams.get('token') || ""

   const deocoded = jwt.verify(token,JWT_SECRETE)

   if(!deocoded  || !(deocoded as JwtPayload).userId){
    ws.close();
    return;
   }


  ws.on('message', function message(data) {
      ws.send('pong');
  });

});