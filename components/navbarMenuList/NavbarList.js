import Link from "next/link";
import useTranslation from "next-translate/useTranslation";

export default function NavbarList() {
    let {t} = useTranslation()
    return (
        <nav className='hidden sm:block overflow-hidden overflow-x-auto scrollbar-hide  '>
            <ul className='flex flex-nowrap text-left'>
                <li>
                    <Link href='/clothes'>
                        <a className='text-sm font-semibold tracking-wider mr-16'>{t('header:clothes')}</a>
                    </Link>
                </li>
                <li>
                    <Link href='/shoes'>
                        <a className='text-sm font-semibold tracking-wider mr-16'>{t('header:shoes')}</a>
                    </Link>
                </li>
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