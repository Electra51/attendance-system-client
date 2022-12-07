import React, { useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import img from '../../Assets/logo/logo.png'
import { AuthContext } from '../../contexts/AuthProvider/AuthProvider';
import { FaUser } from "react-icons/fa";

const Navbar = () => {

    const { user, logOut } = useContext(AuthContext)

    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || '/';


    const handleLogOut = () => {
        logOut()
            .then(() => { })
            .catch(err => console.log(err))
        navigate(from, { replace: true })
    }

    return (
        <div className="navbar bg-base-100">
            <div className="flex-1">
                <Link to='/' className="normal-case text-xl">
                    <img src={img} alt="nav logo" height={60} width={164} />
                </Link>
            </div>
            <div className="flex-none">
                {
                    user?.uid ?
                        <>

                            <button className='btn btn-outline mr-2'>  <Link className='ml-2 pr-3' to="/profile">
                                {user?.photoURL ?
                                    <img title={user.displayName} style={{ height: '35px' }} alt=''
                                        roundedCircle
                                        src={user?.photoURL}>
                                    </img>
                                    : <FaUser></FaUser>
                                }
                            </Link>{user?.displayName}</button>
                            <button onClick={handleLogOut} className='btn btn-primary btn-outline'>LogOut</button>
                        </>
                        :
                        <Link to="/login" className='btn btn-primary'>Login</Link>
                }
            </div>
        </div>
    );
};

export default Navbar;