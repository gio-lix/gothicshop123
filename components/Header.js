import Link from 'next/link'
import {useContext} from "react";
import {StoreContext} from "@/context/createStore";

export default function Header() {
    const {user, logout} = useContext(StoreContext)
    return (
        <>
            <nav className='flex h-20 bg-indigo-400'>
                <ul className='flex justify-between w-3/4'>
                    <li>
                        <Link href='/'>
                            <a>home</a>
                        </Link>
                    </li>
                    <li>
                        <Link href='/about'>
                            <a>about</a>
                        </Link>
                    </li>
                    {!user ? (
                        <li>
                            <Link href='/account/login'>
                                <a>login</a>
                            </Link>
                        </li>
                    ) : (
                        <>
                            <li>
                                <Link href='/clothes'>
                                    <a>clothes</a>
                                </Link>
                            </li>
                            <li>
                                <Link href='/shoes'>
                                    <a>shoes</a>
                                </Link>
                            </li>
                            <li>
                                <Link href='/orders'>
                                    <a>orders</a>
                                </Link>
                            </li>
                            <li>
                                <button onClick={() => logout()}>logout</button>
                            </li>
                        </>

                    )}


                </ul>
            </nav>
        </>
    )
}