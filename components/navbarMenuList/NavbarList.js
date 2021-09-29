import Link from "next/link";

export default function NavbarList() {
    return (
        <nav className='flex hidden sm:inline-flex '>
            <ul className='flex justify-between w-3/4 '>
                <li>
                    <Link href='/clothes'>
                        <a className='text-sm font-semibold tracking-wider'>Clothes</a>
                    </Link>
                </li>
                <li>
                    <Link href='/shoes'>
                        <a className='text-sm font-semibold tracking-wider'>Shoes</a>
                    </Link>
                </li>
                <li>
                    <Link href='/accessories'>
                        <a className='text-sm font-semibold tracking-wider'>Accessories</a>
                    </Link>
                </li>
                <li>
                    <Link href='/'>
                        <a className='text-sm font-semibold tracking-wider'>Sale</a>
                    </Link>
                </li>
                <li>
                    <Link href='/'>
                        <a className='text-sm font-semibold tracking-wider'>Blog</a>
                    </Link>
                </li>
                <li>
                    <Link href='/about'>
                        <a className='text-sm font-semibold tracking-wider'>About us</a>
                    </Link>
                </li>

            </ul>
        </nav>
    )
}