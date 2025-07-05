
import RoomCanvas from "@/app/Componenets/RoomCanvas"

const Canva =async( {params}:{
  params: {
    roomId : string
  }
}) => {

   
  const roomId = (await params).roomId
  console.log("roomId",roomId)

  return   <RoomCanvas roomId={roomId}/>


   
}

export default Canva
