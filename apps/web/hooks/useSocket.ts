import { useEffect, useState } from "react";
import { WS_URl } from "../config";


export function useSocket(){
    const [loading, setloading] = useState(true)
    const [socket, setsocket] = useState<WebSocket>();

    useEffect(()=>{
        const ws = new WebSocket(`${WS_URl}?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIyYzM5NjVmOC1kZmIxLTRiNmEtODQ0MS05M2ZiZTI2NGI2ZjMiLCJpYXQiOjE3NTA0MTMwODR9.qKDbsd9mLuCMS2pwFSuAGZSCTjP5XgJXO7PjNyCvq0g`)

        ws.onopen=()=>{
            setloading(false);
            setsocket(ws);
        }
    },[]);

    return {
        socket,loading
    }
    

}