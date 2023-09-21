import React, { useState } from 'react'
import { TailSpin } from 'react-loader-spinner'
import swal from 'sweetalert';
import { Link } from 'react-router-dom'
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import app, { userCollectionRef } from '../firebase/firebase';
import { addDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import bcrypt from 'bcryptjs'

const Signup = () => {

    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: "",
        mobile: '',
        password: ""
    })
    const [loading, setLoading] = useState(false)
    const [otpWindow, setOptwindow] = useState(false)
    const [OTP, setOTP] = useState("")



    const auth = getAuth(app);
    const generateRecatha = () => {
        window.recaptchaVerifier = new RecaptchaVerifier(auth, 'sign-in-button', {
            'size': 'invisible',
            'callback': (response) => {
                // reCAPTCHA solved, allow signInWithPhoneNumber.
            }
        });
    }


    const requestOtp = () => {
        if (!form.name == "" && !form.mobile == '' && !form.password == "") {
            setLoading(true);
            generateRecatha();
            const appVerifier = window.recaptchaVerifier;
            signInWithPhoneNumber(auth, `+92${form.mobile}`, appVerifier)
                .then((confirmationResult) => {
                    window.confirmationResult = confirmationResult;
                    swal({
                        text: "OTP Sent",
                        icon: "success",
                        buttons: false,
                        timer: 3000
                    });
                    setLoading(false)
                    setOptwindow(true)
                })
                // .catch((error) => {
                //     swal({
                //         text: error,
                //         icon: "error",
                //         buttons: false,
                //         timer: 3000
                //     });
                // });
        }
        else{
            swal({
                text: "Please fill all feild",
                icon: "error",
                buttons: false,
                timer: 2000
            });
        }
    }

    const verifyOTP = async () => {
        try {
            uploadData()

            setLoading(true)
            window.confirmationResult.confirm(OTP).then((result) => {
                swal({
                    text: "Sucessfully Registered",
                    icon: "success",
                    buttons: false,
                    timer: 3000
                })
                setLoading(false);
                navigate('/login')
            })
        } catch (error) {
            setLoading(false)
            swal({
                text: error.message,
                icon: "error",
                buttons: false,
                timer: 3000
            })
        }
    }

    const uploadData = async () => {
        let salt = bcrypt.genSaltSync(10);
        let hash = bcrypt.hashSync(form.password, salt);
        await addDoc(userCollectionRef, {
            name: form.name,
            password: hash,
            mobile: form.mobile
        })
    }



    return (
        <div className='w-full flex flex-col items-center mt-20'>
            <h1 className='text-3xl font-bold'>Sign Up</h1>

            {otpWindow ?
                <>
                    <div className="p-5 w-full md:w-1/3">
                        <div className="relative">
                            <label htmlFor="OTP" className="leading-7 text-sm text-white">
                                OTP
                            </label>

                            <input
                                id="OTP"
                                name="OTP"
                                value={OTP}
                                onChange={(e) => setOTP(e.target.value)}
                                placeholder="Enter OTP"
                                required
                                className="w-full bg-gray-100 rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                            />
                        </div>
                        <div className="p-2 w-full mt-4 ">
                            <button onClick={verifyOTP} className="flex mx-auto text-white bg-green-500 border-0 py-2 px-10 focus:outline-none hover:bg-green-600 rounded text-lg">
                                {loading ? <TailSpin height={28} color="#fff" /> : 'Confirm OTP'}
                            </button>
                        </div>
                    </div>
                </>

                :
                <>
                    <div className="p-5 w-full md:w-1/3">
                        <div className="relative">
                            <label htmlFor="name" className="leading-7 text-sm text-white">
                                Name
                            </label>

                            <input
                                type={'text'}
                                id="name"
                                name="name"
                                value={form.name}
                                onChange={(e) => setForm({ ...form, name: e.target.value })}
                                placeholder="Enter your name"
                                required
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
                                type={'tel'}
                                id="phoneNo"
                                name="phoneNo"
                                autoComplete='username'
                                value={form.mobile}
                                onChange={(e) => setForm({ ...form, mobile: e.target.value })}
                                placeholder="Enter your phone number"
                                required
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
                                autoComplete='current-password'
                                value={form.password}
                                onChange={(e) => setForm({ ...form, password: e.target.value })}
                                placeholder="Enter your password"
                                required
                                className="w-full bg-gray-100 rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                            />
                        </div>
                    </div>

                    <div className="p-2 w-1/2 my-4 ">
                        <button onClick={requestOtp} className="flex mx-auto text-white bg-green-500 border-0 py-2 px-10 focus:outline-none hover:bg-green-600 rounded text-lg">
                            {loading ? <TailSpin height={28} color="#fff" /> : 'Request OTP'}
                        </button>
                    </div>
                </>
            }
            <div>
                <p>Alraedy have an account? <Link to={"/login"}><span className=' text-blue-500'>Login</span></Link></p>
            </div>

            <div id='sign-in-button'></div>
        </div>
    )
}

export default Signup