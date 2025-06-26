import { ReactNode } from "react";



export function IconButton({icon, onClick , activated} : {
    icon: ReactNode,
    onClick : () => void,
    activated : boolean

}){

    return <div className={` pointer rounded border p-2  bg-black hover:bg-gray ${activated ? "text-cyan-500" : "text-white" } `}
      onClick={onClick}
    >
        {icon}
    </div>
}