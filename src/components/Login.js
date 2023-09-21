import React, { useState } from 'react'
import { TailSpin } from 'react-loader-spinner'
import { Link } from 'react-router-dom'
import {query, where, getDocs} from 'firebase/firestore'
import { userCollectionRef,  } from '../firebase/firebase';
import bcrypt from 'bcryptjs'

const Login = () => {
    const [form, setForm] = useState({
        mobile: '',
        password: ""
    })
    const [loading, setLoading] = useState(false)

    // Login logic function
    const login = async () => {
        setLoading(true)
        try {
            const  quer = query(userCollectionRef, where("mobile", "==", form.mobile))
            const querySnapshot = getDocs(quer)
            querySnapshot.forEach((doc) => {
                const _data = doc.data()
            });

        } catch (error) {
            console.log(error);

        }
        setLoading(false)
    }

    return (
        <form>
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
                    <p>Do not have account? <Link to={"/signup"}><span className=' text-blue-500'>Sign Up</span></Link></p>
                </div>
            </div>
        </form>
    )
}

export default Login