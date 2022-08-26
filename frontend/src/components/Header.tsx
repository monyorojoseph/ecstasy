import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ShoppingCartIcon, UserCircleIcon } from '@heroicons/react/solid'
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { stateTypes } from '../interface_types/state';
import { authenticationReducerTypes } from '../redux/reducers/authentication';


function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ')
}

interface HeaderProps {
  setOpen: Function
  authentication: authenticationReducerTypes
}
const Header = ({setOpen, authentication}:HeaderProps)=> {
  const { token } = authentication

  return (
        <nav className='shadow-md mb-3 sticky top-0 bg-white'>
          <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
            <div className="relative flex items-center justify-between h-fit py-2">

              <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex-shrink-0 flex items-center">
                    <NavLink to='/items'>
                        <img
                            className="h-8 w-auto"
                            src="https://tailwindui.com/img/logos/workflow-mark.svg?color=indigo&shade=500"
                            alt="Ecstasy"
                        />
                    </NavLink>
                </div>
              </div>

              {
                token ?           
                (
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                  <div className="relative">
                    <button
                      type="button"
                      className="p-1 static"
                      onClick={()=>setOpen(true)}
                    >
                    <h6 className='absolute -top-2 -right-1 text-lg md:text-sm font-bold text-orange-600'>5</h6>
                    <ShoppingCartIcon className="h-7 w-7 inline-block text-slate-500"/>
                    </button>
                  </div>

                  {/* Profile dropdown */}
                  <Menu as="div" className="ml-3 relative">
                    <div>
                      <Menu.Button className="p-1">
                          <UserCircleIcon className='h-7 w-7 text-slate-500' />
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
                )
                : 
                (
                  <NavLink to='/sign-in'
                  className='text-slate-400 font-bold text-lg'>Sign In</NavLink>
                )
              }
              
            </div>
          </div>

        </nav>
  )
}

const mapStateToProps =(state:stateTypes)=> ({
  authentication: state.authentication
})

const mapDispatchToProps = {

}
export default connect(mapStateToProps, mapDispatchToProps)(Header);