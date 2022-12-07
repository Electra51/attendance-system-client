import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import headerImg from '../../Assets/images/img1.png'
import { AuthContext } from '../../contexts/AuthProvider/AuthProvider';


const Login = () => {

    const { register, handleSubmit, formState: { errors } } = useForm();
    const { login } = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();
    const [loginError, setLoginError] = useState('')

    const from = location.state?.from?.pathname || '/attendance';

    const handleLogIn = (data) => {
        console.log(data);
        setLoginError('')
        login(data.email, data.password)
            .then(result => {
                const user = result.user;
                console.log(user);

                const currentUser = {
                    email: user.email
                }
                console.log(currentUser);

                fetch('https://attendance-system-server.vercel.app/jwt', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(currentUser)
                })
                    .then(res => res.json())
                    .then(data => {
                        // console.log(data);
                        localStorage.setItem('token', data.token);
                        navigate(from, { replace: true });
                        toast('login Successfully.')
                    })
            })
            .catch(error => {
                console.log(error.message)
                setLoginError(error.message)

            });
    }


    return (
        <div className="grid grid-cols-1 gap-24 lg:grid-cols-2">
            <img src={headerImg} alt="headerImg" height={437} width={612} />
            <div>
                <div className="flex-shrink-0 w-full max-w-lg shadow-2xl bg-base-100 py-10">
                    <h1 className="text-xl text-center text-[#000000] font-Inter font-semibold mb-16">Log in Form</h1>
                    <form onSubmit={handleSubmit((handleLogIn))} className="card-body">
                        <div className="form-control mt-12">
                            <input type="email" {...register("email", { required: "Email Address is required" })} className="appearance-none bg-transparent border-b w-full text-[#B4B4B4] mr-3 py-1 px-2 leading-tight focus:outline-none font-Inter font-normal text-base" placeholder="Write Email Address" />
                            {errors.email && <p className='text-red-600 text-left' role="alert">{errors.email?.message}</p>}
                        </div>
                        <div className="form-control mt-12">
                            <input type="password" {...register(
                                "password",
                                {
                                    required: "Password is required",
                                    minLength: { value: 8, message: 'Your password must be 8 character' },

                                },
                            )} className="appearance-none bg-transparent border-b w-full text-[#B4B4B4] mr-3 py-1 px-2 leading-tight focus:outline-none font-Inter font-normal text-base" placeholder="Write Password" />
                            {errors.password && <p className='text-red-600 text-left' role="alert">{errors.password?.message}</p>}
                        </div>
                        {loginError && <p className='text-red-600'>{loginError} please sign up first</p>}
                        <div className="mt-16 text-center">

                            <button type='submit' className='btn btn-primary btn-sm font-Inter font-normal shadow-md'>Log In </button>
                        </div>
                        <p className='text-center font-Inter mt-12'>Don't have an account? <Link className='text-[#1678CB] underline' to="/signup">SIGNUP HERE!</Link> </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;