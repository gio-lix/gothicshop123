import Link from "next/link";
import ShoesPopUp from "@/components/headerMenu/ShoesPopUp";
import ClothesPopUp from "@/components/headerMenu/ClothesPopUp";
import useTranslation from "next-translate/useTranslation";

export default function NavbarList({loginPageStyles,registerPageStyles, paymentPageStyles}) {

    let {t} = useTranslation()
    return (
        <>
            <div
                className={`hidden sm:block overflow-hidden overflow-x-scroll scrollbar-hide 
               ${(loginPageStyles || registerPageStyles || paymentPageStyles) && 'bg-gray-700 h-16 w-full   px-36'}`}
            >
                <nav>
                    <ul className={`${(loginPageStyles || registerPageStyles || paymentPageStyles) ? 'flex text-white text-base font-semibold pt-st ' : 'flex text-white text-base font-semibold pt-6 '}`}>

                        <ClothesPopUp /> {/*clothes pop up*/}
                        <ShoesPopUp/> {/*shoes pop up*/}
                        <li>
                            <Link href='/accessories'>
                                <a className={`mr-20`}>{t('header:accessories')}</a>
                            </Link>
                        </li>
                        <li>
                            <Link href='/'>
                                <a className='mr-20'>{t('header:sale')}</a>
                            </Link>
                        </li>
                        <li>
                            <Link href='/'>
                                <a className='mr-20'>{t('header:blog')}</a>
                            </Link>
                        </li>
                        <li>
                            <Link href='/about'>
                                <a className='mr-20 flex'> <span className='whitespace-nowrap'>{t('header:about')}</span> </a>
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </>
    )
}