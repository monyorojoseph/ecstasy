import { Link } from "react-router-dom";

const Signup = ()=> {


  return (
    <div className='container mx-auto'>
      <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">

          <div>
            <h2 className="mt-3 text-center text-2xl tracking-tight font-bold text-gray-900">
              Create an account
            </h2>
          </div>

          <form className="mt-8 space-y-3">

            <div className="space-y-2">
            <label>
                Username
            </label>
            <input
                name="username"
                type="text"
                autoComplete="username"
                required
                className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
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
                required
                className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
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
                required
                className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
            />
            </div>

            <div>
              <button
                type="submit"
                className="relative w-full flex justify-center py-2 border border-transparent text-sm font-bold rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-indigo-500"
              >
                Sign up
              </button>
            </div>

            <div className="flex items-start justify-between">
              <div className="text-sm">
                <Link to="/sign-in" className="font-medium text-indigo-600 hover:text-indigo-500">
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

export default Signup;