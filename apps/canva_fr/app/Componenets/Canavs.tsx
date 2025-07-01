"use client"

type ToolType = "circle" | "rect" | "pencil" | "line" | "eclipse" | "text" ;


import { useEffect, useRef, useState } from "react"
import initDraw from "../draw"

import React from 'react'
import { IconButton } from "./icon"
import { ArrowLeft, Circle,  CircleDashed,  CircleOff,  Pencil, RectangleHorizontalIcon, Slash, TextCursorInput } from "lucide-react"
import Link from "next/link";

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

      useEffect(() => {
  const canvas = canvasRef.current;
  if (!canvas) return;

  const resizeCanvas = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  };

  resizeCanvas(); // initial set

  window.addEventListener("resize", resizeCanvas);
  return () => window.removeEventListener("resize", resizeCanvas);
}, []);

     useEffect(()=>{

      if(canvasRef.current){
        const canva = canvasRef.current
       initDraw(canva, roomId, socket) 

      }

    },[canvasRef]) 
    

  return (
    <div className="h-[100vh] bg-slate-700 overflow-hidden">
      <canvas ref={canvasRef}  className='bg-white' width={window.innerWidth} height={innerHeight} ></canvas>
      <Link href="/dashboard">
      <button className="fixed top-8 left-5  bg-gradient-to-r bg-gradient-to-r from-purple-600 to-blue-600  text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2.5 group/button shadow-lg hover:shadow-blue-500/25 hover:shadow-xl-3.5 ">
      <ArrowLeft/>
      Back</button>
      </Link>
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
         <IconButton icon={<Slash/> } onClick={()=>{setSelectedTool("line")}} activated={selectedTool==="line"}></IconButton>
         {/* <IconButton icon={<CircleOff/>} onClick={()=>{setSelectedTool}} activated={selectedTool==="none"}></IconButton> */}
         <IconButton icon={<CircleDashed/>} onClick={()=>setSelectedTool("eclipse")} activated={selectedTool==="eclipse"}></IconButton>
         <IconButton icon={<TextCursorInput/>} onClick={()=>setSelectedTool("text")} activated={selectedTool==="text"}></IconButton>
        
    </div>
    </div>
    
}

export default CanavsPage



