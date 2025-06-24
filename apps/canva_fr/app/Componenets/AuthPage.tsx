
"use client"



const AuthPage = ({isSignin}: {
    isSignin : boolean
}) => {

    
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className=" pt-5 pb-4 p-3 m-2 flex flex-col gap-2 bg-white p-6 rounded">
        <input type="text" className="border  p-1.5" placeholder="Username" />
        <input type="password" className="border  p-1.5" placeholder="Password" />


         <button className="bg-gray-500 p-2 mt-2 rounded" onClick={(

         )=>{}}>{isSignin? "Sign in" : "Sign up"}</button>

      </div>
    </div>
  )
}

export default AuthPage
