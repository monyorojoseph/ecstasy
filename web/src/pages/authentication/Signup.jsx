import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { createUser } from '../../redux/actions/auntentication';


const Signup = ({createUser, authentication})=> {
  let navigate = useNavigate()
  const { creating, created } = authentication  
  const [ data, setData ] = useState({
    username: '',
    email: '',
    password: ''
  })

  const changeHandler = (e) => {
    e.persist()
    setData({
      ...data,
      [e.target.name]: e.target.value
    })
  }

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(data)
    createUser(data)
  } 

  useEffect(()=> {
    if (created){
      navigate('sign-in');
    }
  }, [created])

  return (
    <div className='container mx-auto'>
      <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">

          <div>
            <h2 className="mt-3 text-center text-2xl tracking-tight font-bold text-gray-900">
              Create an account
            </h2>
          </div>

          <form className="mt-8 space-y-3" onSubmit={submitHandler}>

            <div className="space-y-2">
            <label>
                Username
            </label>
            <input
                name="username"
                type="text"
                autoComplete="username"
                onChange={changeHandler}
                value={data.username}
                required
                className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm"
                placeholder="type your preffered username"
            />
            </div>

            <div className="space-y-2">
            <label>
                Email address
            </label>
            <input
                name="email"
                type="email"
                autoComplete="email"
                onChange={changeHandler}
                value={data.email}
                required
                className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm"
                placeholder="type your email address"
            />
            </div>

            <div className="space-y-2">
            <label>
                Password
            </label>
            <input
                name="password"
                type="password"
                onChange={changeHandler}
                value={data.password}
                required
                className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm"
                placeholder="Password"
            />
            </div>

            <div>
              <button
                type="submit"
                className="relative w-full flex justify-center py-2 border border-transparent text-lg md:text-sm font-bold rounded-md text-white 
                bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-orange-500"
              >
                Sign up
              </button>
            </div>

            <div className="flex items-start justify-between">
              <div className="text-sm">
                <Link to="/sign-in" className="font-medium text-orange-600 hover:text-orange-500">
                  Already have an account?
                </Link>
              </div>
            </div>

          </form>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state)=> ({
  authentication: state.authentication
})

const mapDispatchToProps = {
  createUser
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup);