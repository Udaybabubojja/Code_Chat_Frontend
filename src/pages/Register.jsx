import React from 'react'
import { LuImagePlus } from "react-icons/lu";
const Register = () => {
  return (
    <div className='formContainer'>
    <div className='formWrapper'>
        <span className='logo'>Chat Karoo..</span>
        <span></span>
        <form>
            <input type="text" placeholder='Display Name'/>
            <input type="email"  placeholder='email'/>
            <input type="password" placeholder='Enter your password' />
            <input style={{display:"none"}} type="file" id='file'/>
            <label htmlFor="file">
            <LuImagePlus size={"19px"} style={{marginTop:"15px"}}/> Add an avatar
            </label>
            <button>SIGN UP</button>
        </form>
        <p>Already have an account? LOGIN</p>
    </div>
    </div>
  )
}

export default Register
