"use client"

import { useEffect, useRef } from "react"
import initDraw from "../draw"

import React from 'react'

const CanavsPage = ({ roomId , socket } : {
    roomId :string,
    socket: WebSocket
} ) => {
      const canvasRef = useRef<HTMLCanvasElement>(null)

     useEffect(()=>{

      if(canvasRef.current){
        const canva = canvasRef.current
       initDraw(canva, roomId, socket)

      }

    },[canvasRef]) 
    

  return (
    <div>
      <canvas ref={canvasRef}  className='bg-white' width={2000} height={1000} ></canvas>
      hello
    </div>
  )
}

export default CanavsPage


// const Canavs = ({ roomId , socket } : {
//     roomId :string,
//     socket: WebSocket
// } ) => {
//       const canvasRef = useRef<HTMLCanvasElement>(null)

//     useEffect(()=>{

//       if(canvasRef.current){
//         const canva = canvasRef.current
//        initDraw(canva, roomId, socket)

//       }

//     },[canvasRef]) 

//     return
//     <div>
//     <canvas ref={canvasRef} className='bg-white' width={2000} height={1000}></canvas>
//         hello
      
//     </div>
// }

// export default Canavs
