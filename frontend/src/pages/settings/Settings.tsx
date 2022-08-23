import {Link, Outlet } from 'react-router-dom';

const Settings = ()=> {
    return (
        <div className="container mx-auto">
            {/* sub menu */}
            <div className="flex justify-start text-sm font-bold space-x-2">
                <Link to='/settings'
                className='border py-1 px-3 rounded-full shadow-sm'
                >Profile</Link>

                <Link to='orders'
                className='border py-1 px-3 rounded-full shadow-sm'
                >Orders</Link>

                <Link to='subscriptions'
                className='border py-1 px-3 rounded-full shadow-sm'
                >Subscriptions</Link>

                <Link to='payment'
                className='border py-1 px-3 rounded-full shadow-sm'
                >Payment</Link>
            </div>
            {/* outlets */}
            <div className='mt-4'>
                <Outlet />
            </div>
        </div>
    )
}

export default Settings;