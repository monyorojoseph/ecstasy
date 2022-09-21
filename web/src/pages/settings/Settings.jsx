import {Link, Outlet } from 'react-router-dom';

const Settings = ()=> {
    return (
        <div className="container mx-auto">
            <div className="mx-4 md:px-0 space-y-5">
                {/* sub menu */}
                <div className="flex justify-start text-sm font-bold space-x-3 py-2 overflow-x-auto">
                    <Link to='/settings'
                    className='border py-1 px-3 rounded-full shadow-sm'
                    >Profile</Link>

                    <Link to='orders'
                    className='border py-1 px-3 rounded-full shadow-sm'
                    >Orders</Link>

                    <Link to='subscriptions'
                    className='border py-1 px-3 rounded-full shadow-sm'
                    >Subscriptions</Link>
                </div>
                
                {/* outlets */}
                <div>
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default Settings;