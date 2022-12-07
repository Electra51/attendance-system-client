import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FiArrowRight } from "react-icons/fi";
import { Link, useLocation, useNavigate } from "react-router-dom";
import headerImg from '../../Assets/images/img1.png'
import { AuthContext } from "../../contexts/AuthProvider/AuthProvider";


const SignUp = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from?.pathname || '/attendance';

    const [signUpError, setSignUpError] = useState('');
    const { createUser, updateUser } = useContext(AuthContext);
   
    
    const { register, handleSubmit, formState: { errors } } = useForm();
    const formArray = [1, 2, 3];
    const [formNo, setFormNo] = useState(formArray[0]);

    const next = () => {
        setFormNo(formNo + 1)

    }
    const back = () => {
        setFormNo(formNo - 1)

    }


    const handleSignUp = (data) => {
        console.log(data);
        setSignUpError('');
        createUser(data.email, data.password)
        .then(result => {
            const user = result.user;
            console.log(user);
            toast('User Created Successfully.')
            navigate(from, { replace: true });
            const userInfo = {

                displayName: data.name,
                phoneNumber: data.phone 
            }
            updateUser(userInfo)
                .then(() => {})
                .catch(err => console.log(err));
            
            
        })
        .catch(error => {
            console.log(error);
            setSignUpError(error.message)
            
        });
      
        fetch('https://attendance-system-server.vercel.app/users', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(data => console.log(data))
            .catch(err => console.error(err))
            

           
            
    }

    return (
        <div className="grid grid-cols-1 gap-24 lg:grid-cols-2">

            <img src={headerImg} alt="headerImg" height={437} width={612} />


            <div>
                <div className="flex-shrink-0 w-full max-w-lg shadow-2xl bg-base-100 py-12">
                    <h1 className="text-xl text-center text-[#000000] font-Inter font-semibold mb-16">SignUp Form</h1>
                    <form onSubmit={handleSubmit((handleSignUp))} className="card-body">
                        {
                            formNo === 1 &&
                            <>
                                <div className="form-control">

                                    <input type="name" {...register("first_name", { required: "first name is required" })} className="appearance-none bg-transparent border-b w-full text-[#B4B4B4] mr-3 py-1 px-2 leading-tight focus:outline-none font-Inter font-normal text-base" placeholder="Write First Name" />
                                </div>
                                
                                <div className="form-control mt-12">
                                    <input type="name" {...register("last_name", { required: "Name is required" })} className="appearance-none bg-transparent border-b w-full text-[#B4B4B4] mr-3 py-1 px-2 leading-tight focus:outline-none font-Inter font-normal text-base" placeholder="Write Last Name" />
                                </div>
                                
                                <div className="mt-16 text-center ">
                                    <button onClick={next} className='btn btn-primary btn-sm font-Inter font-normal shadow-md'>Next Step <FiArrowRight /> </button>
                                </div>

                                <p className='text-center font-Inter mt-16'>Already have an account? <Link className='text-[#1678CB] underline' to="/login">LOGIN HERE!</Link> </p>
                            </>
                        }
                        {
                            formNo === 2 &&
                            <>
                                <div className="form-control">
                                    <input type="name" {...register("phone", { required: "Name is required" })} className="appearance-none bg-transparent border-b w-full text-[#B4B4B4] mr-3 py-1 px-2 leading-tight focus:outline-none font-Inter font-normal text-base" placeholder="+880  1xxxxxxxxxx" />
                                </div>
                                <div className="form-control mt-12">

                                    <input type="email" {...register("email", { required: "Email Address is required" })} className="appearance-none bg-transparent border-b w-full text-[#B4B4B4] mr-3 py-1 px-2 leading-tight focus:outline-none font-Inter font-normal text-base" placeholder="Write Email Address" />
                                </div>
                                <div className="mt-16 text-center flex justify-between ">
                                    <button onClick={back} className='font-Inter font-normal'>Back</button>
                                    <button onClick={next} className='btn btn-primary btn-sm font-Inter font-normal shadow-md'>Next Step <FiArrowRight /> </button>
                                </div>
                            </>
                        }
                        {
                            formNo === 3 &&
                            <>
                                <div className="form-control">
                                    <input type="password" {...register(
                                        "password",
                                        {
                                            required: "Password is required",
                                            minLength: { value: 8, message: 'Your password must be 8 character' },

                                        },
                                    )} className="appearance-none bg-transparent border-b w-full text-[#B4B4B4] mr-3 py-1 px-2 leading-tight focus:outline-none font-Inter font-normal text-base" placeholder="Write Password" />
                                    {errors.password && <p className='text-red-600 text-left' role="alert">{errors.password?.message}</p>}
                                </div>
                                

                                <div className="mt-16 text-center flex justify-between">
                                    <button onClick={back} className='font-Inter font-normal'>Back</button>
                                    <input type='submit' className='btn btn-primary btn-sm font-Inter font-normal shadow-md' value='Sign Up' />
                                </div>
                                {
                                    signUpError && <p>{signUpError}</p>
                                }
                            </>
                        }





                    </form>



                </div>
            </div>
        </div>
    );
};

export default SignUp;

