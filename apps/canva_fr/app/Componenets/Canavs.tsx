"use client"

type ToolType = "circle" | "rect" | "pencil";


import { useEffect, useRef, useState } from "react"
import initDraw from "../draw"

import React from 'react'
import { IconButton } from "./icon"
import { Circle, Pencil, RectangleHorizontalIcon } from "lucide-react"

const CanavsPage = ({ roomId , socket } : {
    roomId :string,
    socket: WebSocket
} ) => {
      const canvasRef = useRef<HTMLCanvasElement>(null)
      const [selectedTool, setselectedTool] = useState<ToolType>("rect")

      useEffect(()=>{
 
        // @ts-ignore
        window.selectedTool = selectedTool
      }, [selectedTool])


     useEffect(()=>{

      if(canvasRef.current){
        const canva = canvasRef.current
       initDraw(canva, roomId, socket) 

      }

    },[canvasRef]) 
    

  return (
    <div className="h-[100vh] overflow-hidden">
      <canvas ref={canvasRef}  className='bg-white' width={window.innerWidth} height={innerHeight} ></canvas>
       <TopBar selectedTool={selectedTool} setSelectedTool={setselectedTool}/>
    </div>
  )
}

const TopBar=({selectedTool, setSelectedTool}:{
    selectedTool : ToolType,
    setSelectedTool : (s: ToolType) =>void
})=>{
    return <div className=" flex  justify-center">

    <div className="fixed top-8   border border-gray-500 p-2 px-3.5 rounded flex gap-3">
        <IconButton icon={<RectangleHorizontalIcon/>} onClick={()=>{setSelectedTool("rect")}} activated={selectedTool==="rect"}></IconButton>
        <IconButton icon={<Circle/>} onClick={()=>{setSelectedTool("circle")}} activated={selectedTool==="circle"}></IconButton>
        <IconButton icon={<Pencil/>} onClick={()=>{setSelectedTool("pencil")}} activated={selectedTool==="pencil"}></IconButton>
        
    </div>
    </div>
    
}

export default CanavsPage



