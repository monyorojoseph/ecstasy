import axios from "axios";

const Welcome = ()=> {

    return (
        <>
        <h3 className="text-2xl font-bold text-center my-3">Welcome</h3>
        <button className="bg-sky-500 hover:bg-sky-600 rounded-sm shadow-md text-base font-bold text-slate-200 px-3 py-1">
            Save changes
        </button>
        </>
    )
}

export default Welcome;