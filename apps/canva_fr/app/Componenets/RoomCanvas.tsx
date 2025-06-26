"use client"

import { useEffect, useRef , useState} from "react"
import { WS_URl } from "../config"
import CanavsPage from "./Canavs"





const RoomCanvas = ({ roomId } : {roomId :string} ) => {

  const [socket, setsocket] = useState<WebSocket | null>(null)

   useEffect(()=>{
    const ws = new WebSocket(`${WS_URl}?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NzBjYjcyMi0xMGEwLTQ2YmUtOGMzYS0yODY1Y2JiOTE3YWYiLCJpYXQiOjE3NTA4NDcyNjB9.-0l1k03OHNkQ6TRZXi2sQj6GOHw8XT9PDkNGJKXsOLM`)

    ws.onopen=()=>{
        setsocket(ws)
        ws.send(JSON.stringify({
          type : "join_room",
          roomId
        }))
    }
   },[])

   if(!socket){
    return <div>
        Connecting to server...
    </div>
   }
  return (
    <div>
       <CanavsPage roomId={roomId} socket={socket}/>
       
      
    </div>
  )
}

export default RoomCanvas
