import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const navigate = useNavigate();
	
	const handleSubmit = (e) => {
		e.preventDefault()
		console.log({email, password})
		setEmail('')
		setPassword('')
	}
	
	const handleChange =(e) => {
		console.log(e.target.value)
		setPassword(e.target.value)
	}
	const gotoSignUpPage = () => navigate("/register");

	return(
		<div>
			<h2>Login</h2>
			<form onSubmit={handleSubmit}>

				 <label htmlFor='email'>Email</label>
				 <input
				 type='text'
				 id='email'
				 value={email}
				 required
				 onChange={(e) => setEmail(e.target.value)}
				 />

				  <label htmlFor='password'>Password</label>
				  <input 
				  type='password'
				  id='password'
				  minLength={6}
				  value={password}
				 onChange={handleChange}  
				/>
				<button>SIGN IN </button>
				<p> Don't have account? {" "}
				<span onClick={gotoSignUpPage} >Sign up </span>
				</p>
			</form>
		</div>


	)
}
export default Login;
