import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ShoppingCartIcon, UserCircleIcon } from '@heroicons/react/solid'
import { NavLink } from 'react-router-dom';


function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ')
}

interface HeaderProps {
  setOpen: Function
}
const Header = ({setOpen}:HeaderProps)=> {

  return (
        <nav className='shadow-md mb-3 sticky top-0 bg-white'>
          <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
            <div className="relative flex items-center justify-between h-16">

              <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex-shrink-0 flex items-center">
                    <NavLink to='/items'>
                        <img
                            className="h-8 w-auto"
                            src="https://tailwindui.com/img/logos/workflow-mark.svg?color=indigo&shade=500"
                            alt="Workflow"
                        />
                    </NavLink>
                </div>
              </div>

              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <button
                  type="button"
                  className="bg-white p-1 rounded-full border-2 focus:outline-none"
                  onClick={()=>setOpen(true)}
                >
                <ShoppingCartIcon className="h-6 w-6 text-slate-500"/>
                </button>

                {/* Profile dropdown */}
                <Menu as="div" className="ml-3 relative">
                  <div>
                    <Menu.Button className="bg-white p-1 rounded-md border-2 focus:outline-none">
                        <UserCircleIcon className='h-6 w-6 text-slate-500' />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">

                      <Menu.Item>
                        {({ active }) => (
                          <NavLink
                            to="/settings"
                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                          >
                            Settings
                          </NavLink>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                          >
                            Sign out
                          </a>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
              
            </div>
          </div>

        </nav>
  )
}
export default Header;