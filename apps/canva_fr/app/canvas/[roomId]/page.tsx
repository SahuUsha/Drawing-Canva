"use client"

import { useEffect, useRef } from "react"



const Canvas = () => {

    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(()=>{

      if(canvasRef.current){
        const canva = canvasRef.current
        const ctx = canva.getContext("2d");

        if(ctx){
            return 
        }
        let clicked = false

        canva.addEventListener("mousedown" ,(e)=>{
            clicked = true
            console.log(e.clientX)
            console.log(e.clientY)
        })

        canva.addEventListener("mouseup", (e)=>{
            clicked = false
            console.log("u:",e.clientX);
            console.log("u",e.clientY);

        })

        canva.addEventListener("mousemove",(e)=>{
            if(clicked){
                console.log(e.clientX)
                console.log(e.clientY)
            }
        })


      }

    },[canvasRef]) 



  return (
    <div>
        <canvas ref={canvasRef} className='bg-white' width={500} height={500}></canvas>
        hello
      
    </div>
  )
}

export default Canvas
