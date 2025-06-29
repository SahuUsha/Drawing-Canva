
"use client"

import axios from 'axios'
import { useState } from 'react'
import { Http_BackendUrl } from '../config'

const AuthPage = ({isSignin}: {
    isSignin : boolean
}) => {

  const [username, setusername] = useState("")
  const [password, setpassword] = useState("")
  const [name, setfullName] = useState("")

  

  const handleSigin=async()=>{
    try {
      const response = await axios.post(`${Http_BackendUrl}/signin`, {username, password})
      if(response.data){
      console.log(response.data)
      localStorage.setItem("token", response.data.token)
      }
    } catch (error) {
      alert("Error signing in : "+ error)
      console.error("Error signing in: ", error)
    }
  }

  const handleSignUp=async()=>{
    try {
      const response =await axios.post(`${Http_BackendUrl}/signup`,{username,password,name})
      if(response.data){
        console.log(response.data)
        alert("User created successfully")
      }
      
    } catch (error) {
      alert("Error signing up : "+ error)
      console.error("Error signing up: ", error)
      
    }
  }
  return (
    <div className="w-screen bg-black h-screen flex justify-center items-center">
      <div className=" pt-5 pb-4 p-3 m-2 flex flex-col gap-2 bg-white p-6 rounded">

        {
          !isSignin && <input type="text" required value={name} onChange={(e)=>setfullName(e.target.value)} className="border  p-1.5" placeholder="Full Name" />
        }
        <input type="text" required value={username} onChange={(e)=>setusername(e.target.value)} className="border  p-1.5" placeholder="Username" />
        <input type="password" required value={password}  onChange={(e)=>setpassword(e.target.value)} className="border  p-1.5" placeholder="Password" />


         <button className="bg-gray-500 p-2 mt-2 rounded" onClick={()=>{isSignin ?handleSigin() : handleSignUp() }}>{isSignin? "Sign in" : "Sign up"}</button>

      </div>
    </div>
  )
}

export default AuthPage
