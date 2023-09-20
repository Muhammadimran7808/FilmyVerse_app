import React, { useState } from 'react'
import { TailSpin } from 'react-loader-spinner'
import { Link } from 'react-router-dom'

const Signup = () => {
    const [form, setForm] = useState({
        name: "",
        mobile: '',
        password: ""
    })
    const [loading, setLoading] = useState(false)
    return (
        <div className='w-full flex flex-col items-center mt-20'>
            <h1 className='text-3xl font-bold'>Sign Up</h1>

            <div className="p-5 w-full md:w-1/3">
                <div className="relative">
                    <label htmlFor="name" className="leading-7 text-sm text-white">
                        Name
                    </label>

                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="Enter your name"
                        className="w-full bg-gray-100 rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    />
                </div>
            </div>

            <div className="p-5 w-full md:w-1/3">
                <div className="relative">
                    <label htmlFor="phoneNo" className="leading-7 text-sm text-white">
                        Phone No.
                    </label>

                    <input
                        type="tel"
                        id="phoneNo"
                        name="phoneNo"
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
                        type="password"
                        id="password"
                        name="password"
                        value={form.password}
                        onChange={(e) => setForm({ ...form, password: e.target.value })}
                        placeholder="Enter your password"
                        className="w-full bg-gray-100 rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    />
                </div>
            </div>

            <div className="p-2 w-1/2 my-4 ">
                <button className="flex mx-auto text-white bg-green-500 border-0 py-2 px-10 focus:outline-none hover:bg-green-600 rounded text-lg">
                    {loading ? <TailSpin height={28} color="#fff" /> : 'Sign Up'}
                </button>
            </div>

            <div>
                <p>Alraedy have an account? <Link to={"/login"}><span className=' text-blue-500'>Login</span></Link></p>
            </div>
        </div>
    )
}

export default Signup