import Link from 'next/link'
import {useContext, useEffect, useRef, useState} from "react";
import {StoreContext} from "@/context/createStore";
import NavbarList from "@/components/navbarMenuList/NavbarList";
import {useRouter} from "next/router";

export default function Header() {
    const {user, logout} = useContext(StoreContext)
    const router = useRouter()

    const [loginPopUp, setLoginPopUp] = useState(false)
    const [searchResult, setSearchResult] = useState('')
    const [searchToggle, setSearchToggle] = useState(false)

    const loginPageStyles = router.pathname === '/account/login'
    const homeStyle = router.pathname === '/'
    const registerPageStyles = router.pathname === '/account/register'
    const orderPath = router.pathname === '/orders'

    const clearRef = useRef()
    const loginRef = useRef()
    const searchRef = useRef('')

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


    const handleOpen = () => setSearchToggle(!searchToggle)
    const loginPopUpInput = () => setLoginPopUp(!loginPopUp)


    const handleSearch = (e) => {
        e.preventDefault()
    }

    return (
        <div className=' h-20 sm:h-44 bg-gradient-to-t from-header via-black to-black px-2 sm:px-20  lg:px-36  flex flex-col justify-around'>
            <div className='flex flex-row  justify-between '>
                <img src="/Gloomy-store.svg" alt="gloomy" className='h-8 sm:h-12'/>
                <nav className='flex h-full items-end w-2/5  '>
                    <ul className=' w-full flex items-center justify-between   '>
                        <li>
                            <Link href='/'>
                                <a>Join us</a>
                            </Link>
                        </li>
                        <li>
                            <div className=' relative   hidden  sm:block  '>
                                <div onClick={handleOpen} className='cursor-pointer flex'>
                                    <img ref={clearRef} src="/loupe.svg" alt="loupe"/>
                                </div>
                                {searchToggle && (
                                    <div className=' sm:w-44 lg:w-52 h-8 absolute z-40 top-0 right-9  bg-indigo-700'>
                                        <form onSubmit={handleSearch} className='h-full'>
                                            <input ref={searchRef} type="text "
                                                   onChange={(e) => setSearchResult(e.target.value)}
                                                   className='w-full h-full text-black px-2 outline-none'/>
                                        </form>
                                    </div>
                                )}
                            </div>
                        </li>
                        {/*<div ref={loginRef}>*/}
                        {/*    <div*/}
                        {/*        onClick={loginPopUpInput}*/}
                        {/*        className='hidden sm:block mr-4 sm:mr-8 cursor-pointer'>*/}
                        {/*        {user ? (*/}
                        {/*            <img src="/user.svg" alt="user"/>*/}
                        {/*        ) : (*/}
                        {/*            <img src="/ghost.svg" alt="ghost"/>*/}
                        {/*        )}*/}

                        {/*    </div>*/}
                        {/*    <div>*/}
                        {/*        {!(loginPageStyles || registerPageStyles ) && (*/}
                        {/*            <>*/}
                        {/*                {loginPopUp && (*/}
                        {/*                    <div*/}
                        {/*                        className=' w-64 h-lh pt-7 right-10 absolute z-50 p-2 '*/}
                        {/*                        style={{backgroundImage: "url('/bg.png')"}}>*/}
                        {/*                        /!*<LoginPopUp setLoginPopUp={setLoginPopUp}/>*!/*/}
                        {/*                    </div>*/}

                        {/*                )}*/}
                        {/*            </>*/}
                        {/*        )}*/}
                        {/*    </div>*/}
                        {/*</div>*/}
                        {!user ? (
                            <>
                                <li>
                                    <Link href='/account/login'>
                                        <a>
                                            <img src="ghost.svg" alt="ghost"/>
                                        </a>
                                    </Link>
                                </li>

                            </>

                        ) : (
                            <>

                                <li>
                                    <button onClick={() => logout()}>logout</button>
                                </li>
                                <li>
                                    <Link href=''>
                                        <a>
                                            <img src="/Path.svg" alt="Path"/>
                                        </a>
                                    </Link>
                                </li>
                            </>

                        )}

                    </ul>
                </nav>
            </div>
            {/*    nav bar list*/}
            <NavbarList/>
        </div>
    )
}