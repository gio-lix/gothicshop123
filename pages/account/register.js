import {useRouter} from "next/router";
import {useContext, useState} from "react";
import {StoreContext} from "@/context/createStore";
import Layout from "@/components/Layout";
import {useErrorHook} from "@/customHook/useErrorHook";


export default function RegisterPage() {
    const router = useRouter()
    const [error,setError] = useErrorHook()
    const registerPageStyles = router.pathname === '/account/register'
    const {register, user} = useContext(StoreContext)

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')


    const handleSubmit = (e) => {
        e.preventDefault()
        if (password !== confirmPassword) {
            setError('password not match please try again')
            return
        }
        register({username, email, password})

    }

    return (
        <Layout title='register'>
            <div className='w-full h-screen bg-white flex justify-center'>
                <div className={`${!registerPageStyles && ' border h-full group'}`}>
                    <div
                        className={`flex flex-col    ${!registerPageStyles ? 'mt-2 w-full h-full sm:px-10 ' : 'w-full  mt-10 w-72'}`}
                    >
                        {!user ? (
                            <>
                                <p className={`${!registerPageStyles ? 'text-white mx-auto ' : 'text-black' }`}>
                                    {error ? <p className={`${!registerPageStyles && 'text-xs  h-6 '}`}>{error}</p> : <p>Register</p>}
                                </p>
                                <form onSubmit={handleSubmit}>

                                    <div className={`${!registerPageStyles ? 'mt-1' : 'mt-4'}`}>
                                        <p className={`${!registerPageStyles ? 'text-white text-sm' : 'text-black'}`}>username</p>
                                        <input
                                            type="text"
                                            onChange={(e) => setUsername(e.target.value)}
                                            className=' px-2 border border-gray-400 w-full text-black outline-none'/>
                                    </div>
                                    <div>
                                        <p className={`${!registerPageStyles ? 'text-white text-sm' : 'text-black'}`}>email</p>
                                        <input
                                            type="text"
                                            onChange={(e) => setEmail(e.target.value)}
                                            className=' px-2 w-full border border-gray-400 text-black outline-none'/>
                                    </div>
                                    <div>
                                        <p className={` ${!registerPageStyles ? 'text-white text-sm' : 'text-black'}`}>password</p>
                                        <input
                                            type="password"
                                            onChange={(e) => setPassword(e.target.value)}
                                            className=' px-2 border border-gray-400 w-full text-black outline-none'/>
                                    </div>
                                    <div>
                                        <p className={` ${!registerPageStyles ? 'text-white text-sm' : 'text-black'}`}>confirm password</p>
                                        <input
                                            type="password"
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            className=' px-2 border border-gray-400 w-full text-black outline-none'/>
                                    </div>

                                    <p className={`mx-auto ${!registerPageStyles ? 'text-white mt-2' : 'text-black mt-9 '}`}>forget
                                        password</p>
                                    <button
                                        className={`${!registerPageStyles ? 'p-1 text-white font-bold mt-2 border w-3/5  mx-auto rounded-2xl bg-input text-sm' : 'w-full text-white mt-9 bg-black p-2'}`}>
                                        Sign up
                                    </button>
                                    <button onClick={() => router.push('/account/login')} type='submit'
                                            className={`${!registerPageStyles ? 'p-1 text-white font-bold mt-2 border w-3/5  mx-auto rounded-2xl bg-input text-sm' : 'w-full text-white mt-9 bg-black p-2'}`}>
                                        Sign in
                                    </button>
                                </form>
                            </>
                        ) : (
                            <>
                                <button
                                    className={`${!registerPageStyles ? 'p-1 text-white font-bold mt-2 border w-3/5  mx-auto rounded-2xl bg-input text-sm' : 'w-full text-white mt-9 bg-black p-2'}`}>
                                    log out
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </Layout>
    )
}