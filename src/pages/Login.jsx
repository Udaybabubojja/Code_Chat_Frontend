import React from 'react'
const Login = () => {
  return (
    <div className='formContainer'>
    <div className='formWrapper'>
        <span className='logo'>Chat Karoo..</span>
        <span>Login</span>
        <form>
            <input type="email"  placeholder='email'/>
            <input type="password" placeholder='Enter your password' />
            <button>LOG IN</button>
        </form>
        <p>you don't have an account? SIGN UP </p>
    </div>
    </div>
  )
}

export default Login
