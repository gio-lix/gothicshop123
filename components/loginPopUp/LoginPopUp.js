import {useRouter} from "next/router";
import {useContext, useState} from "react";
import {StoreContext} from "@/context/createStore";
import useTranslation from "next-translate/useTranslation";


export default function LoginPopUp({setLoginPopUp}) {
    let {t} = useTranslation()
    const router = useRouter()
    const loginPageStyles = router.pathname === '/account/login'
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const {login,  user,error, setError, logout} = useContext(StoreContext)

    const handleSubmit = (e) => {
        e.preventDefault()
        login({email, password})
    }


    return (
        <>
            <div className={`${!loginPageStyles && ' border border-gray-500 h-full group'}`}>
                <div
                    className={`flex flex-col    ${!loginPageStyles ? 'mt-2 w-full h-full sm:px-10 ' : 'w-full  mt-6 w-72'}`}
                >
                    {!user ? (
                        <>
                            <p className={`${!loginPageStyles ? 'text-white mx-auto ' : 'text-black' }`}>
                                {error ? <p className={`${!loginPageStyles && 'text-xs  h-6 '}`}>{error}</p> : <p>{t('header:login')}</p>}
                            </p>
                            <form onSubmit={handleSubmit}>
                                <div className={`${!loginPageStyles ? 'mt-1' : 'mt-11'}`}>
                                    <p className={`${!loginPageStyles ? 'text-gray-300 text-sm' : 'text-black'}`}> {t('header:email')}</p>
                                    <input
                                        type="text"
                                        onChange={(e) => setEmail(e.target.value)}
                                        className=' px-2 border border-gray-400  w-full text-black outline-none'/>
                                </div>
                                <div>
                                    <p className={` ${!loginPageStyles ? 'text-gray-300 text-sm' : 'text-black'}`}>{t('header:password')}</p>
                                    <input
                                        type="password"
                                        onChange={(e) => setPassword(e.target.value)}
                                        className=' px-2 border border-gray-400 w-full text-black outline-none'/>
                                </div>

                                <p className={`mx-auto ${!loginPageStyles ? 'text-white text-xs mt-2' : 'text-black mt-9  '}`}>{t('header:forgetPassword')}</p>

                                <div className='text-center mt-2'>
                                    <button type='submit'
                                            className={`${!loginPageStyles ? 'hover:bg-buttonHover p-1 text-white font-bold mt-2 border border-gray-500 w-36  mx-auto rounded-2xl bg-input text-sm' : 'w-full text-white mt-9 bg-black p-2'}`}>
                                        {t('header:signIn')}
                                    </button>
                                    <button onClick={() => router.push('/account/register')}
                                            className={`${!loginPageStyles ? 'hover:bg-buttonHover p-1 text-white font-bold mt-2 border border-gray-500 w-36 mx-auto rounded-2xl bg-input text-sm' : 'w-full text-white mt-9 bg-black p-2'}`}>
                                        {t('header:signUp')}
                                    </button>
                                </div>
                            </form>
                            {loginPageStyles ? (
                                <>
                                    <p className='text-black text-xl mx-auto mt-6 font-semibold'>{t('header:guest')}</p>
                                    <div className='w-3/5 mx-auto mt-2'>
                                        <p className='text-black text-sm'>{t('header:note')}</p>
                                    </div>
                                </>
                            ) : (
                                <button onClick={() => router.push('/')}
                                        className='text-sm mx-auto mt-1 cursor-pointer group-hover:underline'>{t('header:guest')}</button>
                            )}
                        </>
                    ) : (
                        <>
                            <button onClick={() => logout()}
                                    className={`${!loginPageStyles ? 'p-1 text-white font-bold mt-6 border border-gray-500 w-3/5  mx-auto rounded-2xl bg-input text-sm' : 'w-full text-white mt-9 bg-black p-2'}`}>
                                {t('header:logout')}
                            </button>
                            <button
                                onClick={() => router.push('/orders')}
                                className={`${!loginPageStyles ? 'p-1 text-white font-bold mt-6 border border-gray-500 w-3/5  mx-auto rounded-2xl bg-input text-sm' : 'w-full text-white mt-9 bg-black p-2'}`}>
                                {t('header:openCart')}
                            </button>
                        </>
                    )}
                </div>
            </div>
        </>
    )
}