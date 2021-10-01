import Link from 'next/link'
import {useContext, useEffect, useRef, useState} from "react";
import {StoreContext} from "@/context/createStore";
import NavbarList from "@/components/navbarMenuList/NavbarList";
import {useRouter} from "next/router";
import useTranslation from "next-translate/useTranslation";
import LoginPopUp from "@/components/loginPopUp/LoginPopUp";
import BurgerMenu from "@/components/burger/BurgerMenu";
import useWindowWidth from "@/customHook/useWindowWidth";
import axios from "axios";
import {API_URL} from "@/config/index";
import OrdersMenu from "@/components/OrdersMenu";
import Image from "next/image";

export default function Header() {

    let {t} = useTranslation()
    const {user,getToken, logout ,error, setError,filterOrderData, setFilterOrderData} = useContext(StoreContext)
    const router = useRouter()

    const [loginPopUp, setLoginPopUp] = useState(false)
    const [searchResult, setSearchResult] = useState('')
    const [searchToggle, setSearchToggle] = useState(false)
    const [language, setLanguage] = useState(false)
    const [openCart, setOpenCart] = useState(false)


    const loginPageStyles = router.pathname === '/account/login'
    const registerPageStyles = router.pathname === '/account/register'
    const paymentPageStyles = router.pathname === '/paymentInfo/payment'
    const orderPath = router.pathname === '/orders'
    const homeStyle = router.pathname === '/'

    const clearRef = useRef()
    const loginRef = useRef()
    const cartRef = useRef()
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


    useEffect(() => {
        document.body.addEventListener('click', handleCart)
        return () => document.body.removeEventListener('click', handleCart)
    },[])
    const handleCart = (e) => {
        if (!e.path.includes(cartRef.current)) {
            setOpenCart(false)
        }
    }

    const handleSearch = (e) => {
        e.preventDefault()
        router.push(`/search/search?term=${searchResult}`)
        setSearchToggle(false)
    }

    //delete all order by id
    const deleteAllOrdersId = async (el) => {
        const token = await getToken()
        try {
            const {data} = await axios.delete(`${API_URL}/orders/${el}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            setFilterOrderData('')
        } catch (err) {
            console.log(err)
        }
    }
    const deleteAllOrders = () => {
        const dataClotheMap = filterOrderData && filterOrderData.filter(element => element.clothe).map(item => item.id)
        const dataShoesMap = filterOrderData && filterOrderData.filter(element => element.shoe).map(item => item.id)
        const dataDeleteId = [...dataClotheMap,...dataShoesMap]
        dataDeleteId.map((item, i) => (
            deleteAllOrdersId(item)
        ))
    }

    const handleOpen = () => setSearchToggle(!searchToggle)
    const loginPopUpInput = () => setLoginPopUp(!loginPopUp)
    const handleChangeLanguage = () => setLanguage(!language)


    const handleOpenOrderCart = () => {
        if (width < 740 ) {
            router.push('/orders')
            return
        }
        if (!orderPath) {
            setOpenCart(!openCart)
        }

    }
    return (
        <div className={` h-20 sm:h-44 fixed z-50 w-full sm:sticky 
          ${((loginPageStyles || registerPageStyles) || registerPageStyles || paymentPageStyles) ? '  via-black to-black flex flex-col justify-between ' : 'flex flex-col justify-around  px-2 sm:px-20  lg:px-36 bg-gradient-to-t from-header via-black to-black  px-2 sm:px-20  lg:px-36'} `}

        >
            <div className={`flex flex-row  justify-between ${((loginPageStyles || registerPageStyles) || registerPageStyles || paymentPageStyles) && 'px-2 sm:px-20  lg:px-36 pt-tp' } `}>
                {/*burger menu*/}
                {width < 640 && (
                    <div className=' flex items-center'>
                        {width < 640 && <BurgerMenu/>}
                    </div>
                )}
                {/*logo image*/}
                <img onClick={() => router.push('/')} src="/Gloomy-store.svg" alt="gloomy"  className='h-8 sm:h-9 lg:h-12 cursor-pointer'/>

                {/*navigation*/}
                <nav className='flex justify-end  items-end   '>
                    <ul className=' w-full flex items-center   '>
                        <li>
                            <Link href='/'>
                                <a className='hidden sm:inline-flex mr-4 sm:mr-8'>{t('header:join')}</a>
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
                                                className=' w-64 mt-1 h-lh pt-7 right-10 absolute z-50 p-2 '
                                                style={{backgroundImage: "url('/bg.png')"}}>
                                                <LoginPopUp setLoginPopUp={setLoginPopUp}/>
                                            </div>

                                        )}
                                    </>
                                )}
                            </div>
                        </div>
                        {user && (
                            <div ref={cartRef}>
                                {openCart && (
                                    <div className='absolute mt-5' >
                                        <div className='w-64 h-72 absolute overflow-y-scroll scrollbar-hide z-175 bg-input mt-9 border border-gray-600 -ml-52'
                                             style={{backgroundImage: "url('/bg.png')"}}>
                                            <OrdersMenu  />

                                        </div>
                                        <div className='-ml-48 '>
                                            <button
                                                onClick={() => router.push('/orders')}
                                                className='absolute top-36 z-175 mt-36 w-28 h-7 bg-input rounded-xl items-center '>
                                                <p className='uppercase text-sm'> {t('header:openCart')}</p>
                                            </button>
                                            <button
                                                className='top-36  mt-36 ml-36 absolute z-175
                                                     whitespace-nowrap text-sm text-gray-400 hover:text-white'
                                                onClick={deleteAllOrders}> {t('header:deleteAll')}</button>
                                        </div>
                                    </div>

                                )}
                                {/*open cart bar*/}
                                <div className='relative cursor-pointer ' onClick={handleOpenOrderCart} >
                                    {filterOrderData.length > 0 && (
                                        <div className='absolute h-6 z-20 left-2 -top-2 sm:left-4 w-5 h-5 bg-input flex items-center justify-center rounded-2xl'>
                                            <p>{filterOrderData && filterOrderData.length}</p>
                                        </div>
                                    )}
                                    <img src="/Path.svg" alt="group" className='h-7 '/>
                                </div>
                            </div>
                        )}
                    </ul>
                </nav>


            </div>
            {/*    nav bar list*/}
            <NavbarList />
        </div>
    )
}