import { connect } from "react-redux";
import ChangePassword from "./ChangePassord";
import RemoveAccount from './RemoveAccount';
import {  userDetails } from '../../redux/actions/profile'
import { useEffect } from "react";


const Profile = ({userDetails, profile})=> {
    const { loading, user } = profile
    useEffect(()=> {
        userDetails()
    }, [])
    return (
        <div className="container mx-auto divide-y-2 space-y-4">
            {/* personal detail */}
            <div className="space-y-3">
                <div 
                className="bg-slate-50 shadow-md rounded-md w-fit divide-y-2">
                    <p className="font-bold px-5 space-x-3 py-1">
                        <span className="text-xl">Email:</span>
                        <span className="text-lg">{user.email}</span>
                    </p>

                    <p className="font-bold px-5 space-x-3 py-1">
                        <span className="text-xl">Username:</span>
                        <span className="text-lg">{user.username}</span>
                    </p>
                </div>

                <div>
                    <div className="space-y-2">
                        <button
                        className="border shadow-sm px-3 py-1 font-bold rounded-full text-slate-600 text-sm">
                            Edit profile
                        </button>
                    </div>
                </div>
            </div>
            {/* change password */}
            <div>
                <ChangePassword />
            </div>
            {/* remove acc */}
            <RemoveAccount />
        </div>
    )
}

const mapStateToProps = (state)=> ({
    profile: state.profile
})

const mapDispatchToProps = {
    userDetails
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);