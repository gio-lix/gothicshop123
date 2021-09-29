import Link from "next/link";
import useTranslation from "next-translate/useTranslation";

export default function NavbarList() {
    let {t} = useTranslation()
    return (
        <nav className='flex hidden sm:inline-flex overscroll-y-auto '>
            <ul className='flex justify-between sm:w-4/5 lg:w-3/4 '>
                <li>
                    <Link href='/clothes'>
                        <a className='text-sm font-semibold tracking-wider mr-2'>{t('header:clothes')}</a>
                    </Link>
                </li>
                <li>
                    <Link href='/shoes'>
                        <a className='text-sm font-semibold tracking-wider mr-2'>{t('header:shoes')}</a>
                    </Link>
                </li>
                <li>
                    <Link href='/accessories'>
                        <a className='text-sm font-semibold tracking-wider mr-2'>{t('header:accessories')}</a>
                    </Link>
                </li>
                <li>
                    <Link href='/'>
                        <a className='text-sm font-semibold tracking-wider mr-2'>{t('header:sale')}</a>
                    </Link>
                </li>
                <li>
                    <Link href='/'>
                        <a className='text-sm font-semibold tracking-wider'>{t('header:blog')}</a>
                    </Link>
                </li>
                <li>
                    <Link href='/about'>
                        <a className='text-sm font-semibold tracking-wider'>{t('header:about')}</a>
                    </Link>
                </li>

            </ul>
        </nav>
    )
}