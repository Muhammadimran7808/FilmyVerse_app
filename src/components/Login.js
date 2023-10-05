import React, { useContext, useState } from 'react'
import { TailSpin } from 'react-loader-spinner'
import { Link, useNavigate } from 'react-router-dom'
import { query, where, getDocs } from 'firebase/firestore'
import { userCollectionRef, } from '../firebase/firebase';
import bcrypt from 'bcryptjs'
import { appstate } from '../App';
import swal from 'sweetalert';

const Login = () => {
    const useAppstate = useContext(appstate)
    const navigate = useNavigate();
    const [form, setForm] = useState({
        mobile: '',
        password: ""
    })
    const [loading, setLoading] = useState(false)


    // This function is invoked when Ph. No. or pasword are incorrect 
    const invalidCredential = () => {
        swal({
            text: "Invalid Number or Password! Try again",
            icon: "error",
            buttons: false,
            timer: 3000
        });
    }

    // Login logic function
    const login = async () => {
        setLoading(true)
        try {

            const quer = query(userCollectionRef, where("mobile", "==", form.mobile))

            const querySnapshot = await getDocs(quer)

            // checking input number exists in database
            const docs = querySnapshot.docs;
            const size = docs.length;
            if (size === 0) {
                invalidCredential()
            }
            querySnapshot.forEach((doc) => {

                const _data = doc.data();

                const isUser = bcrypt.compareSync(form.password, _data.password); // true or false
                if (isUser) {
                    useAppstate.setLogin(true)
                    useAppstate.setUserName(_data.name)
                    swal({
                        title: `Wellcome Back ${_data.name}`,
                        timer: 4000,
                        buttons: 'close',
                        className: 'model-box'
                    })
                    navigate('/')

                    // set user login state in cookie
                    setCookie("login", true, 2)
                    setCookie("userName", _data.name, 2)

                } else {
                    invalidCredential();
                }
            });

        } catch (error) {
            console.log(error);

        }
        setLoading(false)
    }

    // function that store user login state in cookie
    function setCookie(cname, cvalue, exdays) {
        const d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        let expires = "expires=" + d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    }

    return (
        <div className='w-full flex flex-col items-center mt-20'>
            <h1 className='text-3xl font-bold'>Login</h1>

            <div className="p-5 w-full md:w-1/3">
                <div className="relative">
                    <label htmlFor="phoneNo" className="leading-7 text-sm text-white">
                        Phone No.
                    </label>

                    <input
                        type={'tel'}
                        id="phoneNo"
                        name="phoneNo"
                        required
                        value={form.mobile}
                        onChange={(e) => setForm({ ...form, mobile: e.target.value })}
                        placeholder="Enter your phone number"
                        className="w-full bg-gray-100 rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    />
                </div>
            </div>

            <div className="px-5 w-full md:w-1/3">
                <div className="relative">
                    <label htmlFor="password" className="leading-7 text-sm text-white">
                        Password
                    </label>

                    <input
                        type={'password'}
                        id="password"
                        name="password"
                        required
                        value={form.password}
                        onChange={(e) => setForm({ ...form, password: e.target.value })}
                        placeholder="Enter your password"
                        className="w-full bg-gray-100 rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    />
                </div>
            </div>

            <div className="p-2 w-1/2 my-4 ">
                <button onClick={login} className="flex mx-auto text-white bg-green-500 border-0 py-2 px-10 focus:outline-none hover:bg-green-600 rounded text-lg">
                    {loading ? <TailSpin height={28} color="#fff" /> : 'Login'}
                </button>
            </div>

            <div>
                <p>Don't have an account? <Link to={"/signup"}><span className=' text-blue-500'> Sign Up</span></Link></p>
            </div>
        </div>
    )
}

export default Login