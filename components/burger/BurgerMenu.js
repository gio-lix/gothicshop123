import {useContext, useState} from "react";
import Link from "next/link";
import {useRouter} from "next/router";
import PersonsOutPut from "@/components/burger/PersonsOutPut";
import ShoesItems from "@/components/burger/ShoesItems";
import {StoreContext} from "@/context/createStore";
import MobSortCategory from "@/components/subcategory/mobSortCategory";
import useTranslation from "next-translate/useTranslation";

export default function BurgerMenu() {
    let {t} = useTranslation()
    const [burgerClick , setBurgerClick] = useState(false)
    const [clothes, setClothes] = useState(false)
    const [shoes, setShoes] = useState(false)
    const [sort, setSort] = useState(false)
    const router = useRouter()
    const loginPageStyles = router.pathname === '/account/login'

    const {user, logout} = useContext(StoreContext)

    const handleOpenClothes = () => {
        setClothes(!clothes)
        setShoes(false)
        setSort(false)
    }
    const handleOpenShoes = () => {
        setShoes(!shoes)
        setClothes(false)
        setSort(false)
    }
    const handlerOpenSort = () => {
        setSort(!sort)
        setClothes(false)
        setShoes(false)
    }
    const handleLogout = () => {
        logout()
        router.push('/')
    }
    return (
        <>
            <div
                onClick={() => setBurgerClick(!burgerClick)}
                 className={`w-1/29  h-ss z-175 
                 ${burgerClick ? 'flex justify-center items-center ' : 'flex flex-col justify-between cursor-pointer'}`}
            >
                <div className={`w-1/29  h-sm bg-white rounded-bl-2xl rounded-tr-2xl ${burgerClick && '-rotate-45 absolute z-50  '}`}> </div>
                <div className={`w-1/29 h-sm bg-white rounded-bl-2xl rounded-tr-2xl ${burgerClick ? 'hidden' : 'inline-block'}`}> </div>
                <div className={`w-1/29 h-sm bg-white rounded-bl-2xl rounded-tr-2xl ${burgerClick && 'rotate-45 absolute z-50'}`}> </div>
            </div>
            {burgerClick && (
                <div className=' fixed z-175 h-screen  top-16 w-full overflow-y-scroll    left-0' style={{backgroundImage: "url('/bg.png')"}}>
                    <div className='p-4'>
                        <div>
                            <nav>
                                <ul>
                                    {/*clothes event*/}
                                    <li onClick={handleOpenClothes} className='border-b p-2 flex justify-between cursor-pointer'>
                                        <p>{t('header:clothes')}</p>
                                        <p className='font-semibold'>+</p>
                                    </li>
                                    {clothes && (
                                        <PersonsOutPut setBurgerClick={setBurgerClick} />
                                    )}


                                    {/*shoes event*/}
                                    <li onClick={handleOpenShoes}  className='border-b p-2 flex justify-between cursor-pointer'>
                                        <p>{t('header:shoes')}</p>
                                        <p className='font-semibold'>+</p>
                                    </li>
                                    {shoes && (
                                        <ShoesItems  setBurgerClick={setBurgerClick} />
                                    )}



                                    <li className='border-b p-2 flex justify-between'>
                                        <Link href='/clothes'>
                                            <a>{t('header:accessories')}</a>
                                        </Link>
                                        <p className='font-semibold'>+</p>
                                    </li>
                                    <li className='border-b p-2 flex justify-between'>
                                        <Link href='/'>
                                            <a>{t('header:sale')}</a>
                                        </Link>
                                        <p className='font-semibold'>+</p>
                                    </li>
                                    <li className='border-b p-2'>
                                        <Link href='/'>
                                            <a>{t('header:blog')}</a>
                                        </Link>
                                    </li>
                                    <li className='border-b p-2 cursor-pointer' onClick={handlerOpenSort} >
                                        <a>{t('header:sort')}</a>
                                    </li>
                                    {sort && (
                                        <div className='fixed overflow-y-scroll w-full h-full  z-50 top-14 left-0' style={{backgroundImage: "url('/bg.png')"}}>
                                            <MobSortCategory setBurgerClick={setBurgerClick} setSort={setSort}/>
                                        </div>
                                    )}
                                    <li className='border-b p-2'>
                                        <Link href='/'>
                                            <a>{t('header:about')}</a>
                                        </Link>
                                    </li>
                                    {!user ? (
                                        <li className=' p-2'>
                                            <Link href='/account/login'>
                                                <a>{t('header:join')}</a>
                                            </Link>
                                        </li>
                                    ) : (
                                        <button
                                            onClick={handleLogout}
                                            className=' p-2'>
                                            {t('header:logout')}
                                            {/*<Link href='/account/logout'>*/}
                                            {/*    <a>Log out</a>*/}
                                            {/*</Link>*/}
                                        </button>
                                    )}
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}