import { Http_BackendUrl } from "../config";
import axios from "axios"

type Shape = {
    type : "rect";
    x: number;
    y: number;
    width: number;
    heigth:number;

} | {
    type: "circle";
    centerX : number;
    centerY : number;
    radius: number;
}



const initDraw = async(canva:HTMLCanvasElement, roomId:string, socket : WebSocket) => {

         const ctx = canva.getContext("2d");

         let existingShape: Shape[] = await getExistingShapes(roomId)

        if(!ctx){
            return 
        }

        socket.onmessage=(event)=>{
            const message = JSON.parse(event.data);

            if(message.type=="chat"){
                const parseData = JSON.parse(message.message)
                existingShape.push(parseData.shape)
                 clearCanva(existingShape,canva,ctx)
            }
        }

        clearCanva(existingShape,canva,ctx)


        let clicked = false
        let startX = 0;
        let startY =0;


        canva.addEventListener("mousedown" ,(e)=>{
            clicked = true
            startX = e.clientX;
            startY = e.clientY;
            console.log(e.clientX)
            console.log(e.clientY)
        })

        canva.addEventListener("mouseup", (e)=>{
            clicked = false
               const   width = e.clientX-startX;
           const   height = e.clientY-startY;

           const shape : Shape = {
             type: "rect",
            x:startX,
            y:startY,
            width:width,
            heigth:height
           }
           existingShape.push(shape)

           socket.send(JSON.stringify({
            type :"chat",
            message: JSON.stringify({shape}),
            roomId

           }))



           

            console.log("u:",e.clientX);
            console.log("u",e.clientY);

        })

        canva.addEventListener("mousemove",(e)=>{
            if(clicked){
           const   width = e.clientX-startX;
           const   height = e.clientY-startY;
           clearCanva(existingShape,canva,ctx)
        
            ctx.strokeStyle="rgba(255,255,255)"
             ctx.strokeRect(startX,startY,width,height);
             
            } 
        })

        function clearCanva(existingShape: Shape[], canva: HTMLCanvasElement, ctx : CanvasRenderingContext2D){
         
            ctx.clearRect(0,0,canva.width,canva.height);
            ctx.fillStyle="rgba(0,0,0)"
            ctx.fillRect(0,0,canva.width,canva.height);

            existingShape.map((shape)=>{
                if(shape.type=="rect"){
                    ctx.strokeStyle="rgba(255,255,255)"
                    ctx.strokeRect(shape.x,shape.y,shape.width,shape.heigth)
                }
            })


        }
    
}

export default initDraw

 async function getExistingShapes(roomId: string){
    const res = await axios.get(`${Http_BackendUrl}/chats/${roomId}`);
    const messages = res.data.messages;

   const shapes = messages.map((x:{message :string})=>{
    const messageData = JSON.parse(x.message)
    return messageData.shape
   })
   return shapes;
}