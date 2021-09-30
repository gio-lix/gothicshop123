import Link from "next/link";
import useTranslation from "next-translate/useTranslation";
import {useRouter} from "next/router";
import ClothesPopUp from "@/components/headerMenu/ClothesPopUp";
import ShoesPopUp from "@/components/headerMenu/ShoesPopUp";

export default function NavbarList() {
    const router = useRouter()
    const loginPageStyles = router.pathname === '/account/login'
    const registerPageStyles = router.pathname === '/account/register'
    const paymentPageStyles = router.pathname === '/paymentInfo/payment'

    let {t} = useTranslation()
    return (
        <nav  className={`hidden sm:block overflow-hidden overflow-x-scroll scrollbar-hide  
               ${(loginPageStyles || registerPageStyles || paymentPageStyles) && '  bg-gray-600  flex py-by  px-2 sm:px-20  lg:px-36'}`}>
            <ul className='flex flex-nowrap text-left'>
                <ClothesPopUp /> {/*clothes pop up*/}
                <ShoesPopUp/> {/*shoes pop up*/}
                {/*<li>*/}
                {/*    <Link href='/clothes'>*/}
                {/*        <a className='text-sm font-semibold tracking-wider mr-16'>{t('header:clothes')}</a>*/}
                {/*    </Link>*/}
                {/*</li>*/}
                {/*<li>*/}
                {/*    <Link href='/shoes'>*/}
                {/*        <a className='text-sm font-semibold tracking-wider mr-16'>{t('header:shoes')}</a>*/}
                {/*    </Link>*/}
                {/*</li>*/}
                <li>
                    <Link href='/accessories'>
                        <a className='text-sm font-semibold tracking-wider mr-16'>{t('header:accessories')}</a>
                    </Link>
                </li>
                <li>
                    <Link href='/'>
                        <a className='text-sm font-semibold tracking-wider mr-16'>{t('header:sale')}</a>
                    </Link>
                </li>
                <li>
                    <Link href='/'>
                        <a className='text-sm font-semibold tracking-wider  mr-16'>{t('header:blog')}</a>
                    </Link>
                </li>
                <li>
                    <Link href='/about'>
                        <a className='text-sm font-semibold tracking-wider whitespace-nowrap'>{t('header:about')}</a>
                    </Link>
                </li>

            </ul>
        </nav>
    )
}