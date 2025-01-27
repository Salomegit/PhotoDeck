import { useForm } from 'react-hook-form';
// import login_api from '../../../endpoints/api';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography, Link } from '@mui/material';
import { auth } from '../services/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';


const LoginForm = () => {
  const navigate = useNavigate();
  const handle_not_registered = () => {
    navigate('/register')

    }
  const[successMessage, setSuccessMessage] = useState('');
    const[errorMessage, setErrorMessage] = useState('');

  const { register, handleSubmit,  formState: { errors, isSubmitting } } = useForm();
  const onSubmit = async (data) => {
 try {
    await signInWithEmailAndPassword(auth,data.email, data.password)
    console.log("user is logged in successfully")
    setSuccessMessage('User is Logged in successfully')
    setTimeout(() =>navigate('/') ,1000)
 } catch (error) {
    console.log(error.message)
    setErrorMessage(error.message, 'root')
    setTimeout(() => {
         setErrorMessage('');
    }, 2000);
    
 }

  }
  
  return (
    <div className="flex justify-center items-center p-6  shadow-md rounded-md w-80 mx-auto mt-10">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
        {/* Username Field */}
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
            Email
          </label>
          <input
            {...register('email', { required: "Email is required" })}
            type="email"
            id="email"
            placeholder="Enter your email"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.username && <p className="text-red-500">{errors.email.message}</p>}

        </div>

        {/* Password Field */}
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
            Password
          </label>
          <input
            {...register('password', { required: 'password is required', minLength: { value: 5, message: 'password must be at least 6 characters' } })}
            type="password"
            id="password"

            placeholder="Enter your password"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.password && <div className="text-red-500">{errors.password.message}</div>}

        </div>

        {/* Submit Button */}
        {successMessage && <div className="text-green-500">{successMessage}</div>}
        {errorMessage && <div className="text-red-500">{errorMessage}</div>}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Loading...' : 'Submit'}
        </button>
        <Typography variant="body2" align="center">
      <Link 
        href="#" 
        onClick={handle_not_registered} 
        color="primary" 
        underline="hover"
      >
        Don&apos;t have an account? Register
      </Link>
    </Typography>
            {errors.root && <div className="text-red-500">{errors.root.message}</div>}

      </form>
    </div>
  );
};

export default LoginForm;
