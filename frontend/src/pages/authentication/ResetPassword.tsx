
const ResetPassword = ()=> {


  return (
    <div className='container mx-auto'>
      <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">

          <div>
            <h2 className="mt-3 text-center text-2xl tracking-tight font-bold text-gray-900">
              Reset Your Password
            </h2>
          </div>

          <form className="mt-8 space-y-3">

            <div className="rounded-md shadow-sm">
              <div className="space-y-2">
                <label>
                  Email address
                </label>
                <input
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm"
                  placeholder="type your email address"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 border border-transparent text-lg md:text-sm font-bold rounded-md text-white 
                bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
export default ResetPassword;
