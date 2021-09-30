import Link from 'next/link'
import {useContext, useEffect, useRef, useState} from "react";
import {StoreContext} from "@/context/createStore";
import NavbarList from "@/components/navbarMenuList/NavbarList";
import {useRouter} from "next/router";
import useTranslation from "next-translate/useTranslation";
import LoginPopUp from "@/components/loginPopUp/LoginPopUp";
import BurgerMenu from "@/components/burger/BurgerMenu";
import useWindowWidth from "@/customHook/useWindowWidth";


export default function Header() {

    let {t} = useTranslation()
    const {user, logout ,error, setError} = useContext(StoreContext)
    const router = useRouter()

    const [loginPopUp, setLoginPopUp] = useState(false)
    const [searchResult, setSearchResult] = useState('')
    const [searchToggle, setSearchToggle] = useState(false)
    const [language, setLanguage] = useState(false)

    const loginPageStyles = router.pathname === '/account/login'
    const registerPageStyles = router.pathname === '/account/register'
    const paymentPageStyles = router.pathname === '/paymentInfo/payment'
    const orderPath = router.pathname === '/orders'
    const homeStyle = router.pathname === '/'

    const clearRef = useRef()
    const loginRef = useRef()
    const searchRef = useRef('')
    const useLanguageRef = useRef()


    const {width, height} = useWindowWidth()

    useEffect(() => {
        if (searchRef.current) searchRef.current.focus()
        document.body.addEventListener('click', searchBody)
        return () => document.body.removeEventListener('click', searchBody)
    }, [searchToggle])
    const searchBody = (e) => {
        if (!e.path.includes(clearRef.current)) setSearchToggle(false)
    }

    useEffect(() => {
        document.body.addEventListener('click', handleShowLogin)
        return () => document.body.removeEventListener('click', handleShowLogin)
    }, [loginPopUp])
    const handleShowLogin = (e) => {
        if (!e.path.includes(loginRef.current)) setLoginPopUp(false)
    }

    useEffect(() => {
        document.body.addEventListener('click', handleLanguage)
        return () => document.body.removeEventListener('click', handleLanguage)
    },[])
    const handleLanguage = (e) => {
        if (!e.path.includes(useLanguageRef.current)) {
            setLanguage(false)
        }
    }
    const handleSearch = (e) => {
        e.preventDefault()
        router.push(`/search/search?term=${searchResult}`)
        setSearchToggle(false)
    }


    const handleOpen = () => setSearchToggle(!searchToggle)
    const loginPopUpInput = () => setLoginPopUp(!loginPopUp)
    const handleChangeLanguage = () => setLanguage(!language)




    return (
        <div className={` h-20 sm:h-44  
          ${((loginPageStyles || registerPageStyles) || registerPageStyles || paymentPageStyles) ? '  via-black to-black flex flex-col justify-between ' : 'flex flex-col justify-around  px-2 sm:px-20  lg:px-36 bg-gradient-to-t from-header via-black to-black  px-2 sm:px-20  lg:px-36'}
         `}

        >

            <div className={`flex flex-row  justify-between ${((loginPageStyles || registerPageStyles) || registerPageStyles || paymentPageStyles) && 'px-2 sm:px-20  lg:px-36 pt-tp' } `}>
                {/*burger menu*/}
                {width < 640 && (
                    <div className=' flex items-center'>
                        {width < 640 && <BurgerMenu/>}
                    </div>
                )}

                <img onClick={() => router.push('/')} src="/Gloomy-store.svg" alt="gloomy" className='h-8 sm:h-9 lg:h-12 cursor-pointer'/>
                <nav className='flex justify-end  items-end   '>
                    <ul className=' w-full flex items-center   '>
                        <li>
                            <Link href='/'>
                                <a className='mr-4 sm:mr-8'>{t('header:join')}</a>
                            </Link>
                        </li>
                        <li>
                            <div className=' relative   hidden  sm:block  '>
                                <div onClick={handleOpen} className='cursor-pointer flex mr-4 sm:mr-8'>
                                    <img ref={clearRef} src="/loupe.svg" alt="loupe"/>
                                </div>
                                {searchToggle && (
                                    <div className=' sm:w-44 lg:w-52 h-8 absolute z-40 top-0 right-7 bg-indigo-700'>
                                        <form onSubmit={handleSearch} className='h-full'>
                                            <input ref={searchRef} type="text "
                                                   onChange={(e) => setSearchResult(e.target.value)}
                                                   className='w-full h-full text-black px-2 outline-none'/>
                                        </form>
                                    </div>
                                )}
                            </div>
                        </li>
                        {/*change language*/}
                        <div
                            ref={useLanguageRef}
                            className='mr-4 sm:mr-8 sm:text-xs relative  '
                        >
                            <button onClick={handleChangeLanguage}
                                    className='p-0.5 sm:p-1.5 bg-black border border-gray-500'
                            >
                                {/*<img src="/Ellipse 13.svg" alt="ellipse " className='h-6 sm:h-7'/>*/}
                                LN
                            </button>
                            <div
                                className='absolute mt-2 z-50'>
                                {language && (
                                    <div className='flex flex-col' >
                                        {router.locales.map(locale => (
                                            <Link href={router.asPath} locale={locale} key={locale} >
                                                <a  onClick={() => setLanguage(false) }
                                                    className='bg-black p-0.5 sm:p-1.5 border border-gray-500'
                                                >
                                                    {locale}
                                                </a>
                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                        {/*login*/}
                        <div ref={loginRef}>
                            <div
                                onClick={loginPopUpInput}
                                className='hidden sm:block mr-4 sm:mr-8 cursor-pointer'>
                                {user ? (
                                    <img src="/user.svg" alt="user"/>
                                ) : (
                                    <img src="/ghost.svg" alt="ghost"/>
                                )}

                            </div>
                            <div>
                                {!(loginPageStyles || registerPageStyles ) && (
                                    <>
                                        {loginPopUp && (
                                            <div
                                                className=' w-64 h-lh pt-7 right-10 absolute z-50 p-2 '
                                                style={{backgroundImage: "url('/bg.png')"}}>
                                                <LoginPopUp setLoginPopUp={setLoginPopUp}/>
                                            </div>

                                        )}
                                    </>
                                )}
                            </div>
                        </div>
                        {/*{!user ? (*/}
                        {/*    <>*/}
                        {/*        <li>*/}
                        {/*            <Link href='/account/login'>*/}
                        {/*                <a>*/}
                        {/*                    <img src="ghost.svg" alt="ghost"/>*/}
                        {/*                </a>*/}
                        {/*            </Link>*/}
                        {/*        </li>*/}

                        {/*    </>*/}

                        {/*) : (*/}
                        {/*    <>*/}

                        {/*        <li>*/}
                        {/*            <button onClick={() => logout()} className='mr-4 sm:mr-8'>logout</button>*/}
                        {/*        </li>*/}
                        {/*        <li>*/}
                        {/*            <Link href=''>*/}
                        {/*                <a>*/}
                        {/*                    <img src="/Path.svg" alt="Path"/>*/}
                        {/*                </a>*/}
                        {/*            </Link>*/}
                        {/*        </li>*/}
                        {/*    </>*/}

                        {/*)}*/}
                    </ul>
                </nav>
            </div>
            {/*    nav bar list*/}

            <NavbarList />
        </div>
    )
}