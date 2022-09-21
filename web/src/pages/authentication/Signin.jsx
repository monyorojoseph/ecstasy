import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { signIn } from "../../redux/actions/auntentication";

const Signin = ({signIn, authentication})=> {
  const { loading, token } = authentication
  const [ data, setData ] = useState({
    email: '',
    password: ''
  })

  const changeHandler = (e)=> {
    e.persist()
    setData({
      ...data,
      [e.target.name]: e.target.value
    })
  }

  const submitHandler = (e)=> {
    e.preventDefault()
    signIn(data)
  }
  let location = useLocation()
  let navigate = useNavigate()

  let from = location.state?.from?.pathname || "/";

  useEffect(()=>{
    if(token){
      navigate(from, { replace: true });
    }
  }, [token])

  return (
    <div className='container mx-auto'>
      <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">

          <div>
            <h2 className="mt-3 text-center text-2xl tracking-tight font-bold text-gray-900">
              Sign in to your account
            </h2>
          </div>

          <form className="mt-8 space-y-3" onSubmit={submitHandler}>
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  onChange={changeHandler}
                  value={data.email}
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm"
                  placeholder="Email address"
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  onChange={changeHandler}
                  value={data.password}
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="relative w-full flex justify-center py-2 border border-transparent text-lg md:text-sm font-bold rounded-md text-white 
                bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-orange-500"
              >
                Sign in
              </button>
            </div>

            <div className="flex items-start justify-between">
              <div className="text-sm">
                <Link to="/reset-password" className="font-medium text-orange-600 hover:text-orange-500">
                  Forgot your password?
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
  signIn
}

export default connect(mapStateToProps, mapDispatchToProps)(Signin);