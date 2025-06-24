import Link from "next/link";


export default function Home() {
  return (
    <div className=" flex flex-col justify-center h-screen w-screen items-center">
      
      <div className="text-2xl p-4 " >
    Excelidraw-frontend
      </div>
      <div className="flex gap-3"> 
        <Link href={'/signin'}>
    <button className="bg-gray-500 p-2 mt-2 rounded" >Sign in</button>

        </Link>
        <Link href={"/signup"}>

    <button className="bg-gray-500 p-2 mt-2 rounded" >Sign Up</button>
        </Link>


      </div>
    </div>
  );
}
