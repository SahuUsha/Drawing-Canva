import axios from "axios";
import { BACKEND_URL } from "../../../config";
import { ChatRoom } from "../../../components/ChatRoom";
// import { BACKEND_URL } from "../../../../config";
// import { ChatRoom } from "../../../../components/ChatRoom";

async function getRoomId(roomId: string) {
  const response = await axios.get(`${BACKEND_URL}/room/${roomId}`);
  return response.data.room?.id;
}

export default async function ChatRoomPage({
  params,
}: {
  params: { roomId: string };
}) {
  const resolvedRoomId = await getRoomId(params.roomId);
  return <ChatRoom id={resolvedRoomId} />;
}
