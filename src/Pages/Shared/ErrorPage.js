import { FiXCircle } from 'react-icons/fi';
import React from 'react'
import { Link, useRouteError } from 'react-router-dom'



const ErrorPage = () => {

  const error = useRouteError();

  return (
    <section className='flex items-center h-screen p-16 bg-gray-100 text-gray-900 my-10 rounded-md'>
      <div className='container flex flex-col items-center justify-center px-5 mx-auto my-8'>
        <div className='max-w-md text-center'>
          <h2 className='mb-8 font-extrabold text-9xl text-gray-500'>
            <span className='sr-only'>Error</span>
            <div className='flex justify-center items-center h-full'>
              4
              <div className='w-24 h-24  text-orange-400 mr-8'><FiXCircle /></div>
              4
            </div>
          </h2>
          <p className='text-2xl font-semibold md:text-3xl mb-8'>
            {error.statusText || error.message}
          </p>
          <Link to='/'>
            <h4 className="text-3xl"><button className='btn btn-warning'>Back Home</button></h4>
          </Link>
        </div>
      </div>
    </section>
  )
}

export default ErrorPage
