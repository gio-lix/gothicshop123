import Link from "next/link";
import {useRouter} from "next/router";
import useTranslation from "next-translate/useTranslation";
import Image from "next/image";

export default function Footer() {
    let {t} = useTranslation()
    const router = useRouter()
    const loginPageStyles = router.pathname === '/account/login'
    const registerPageStyles = router.pathname === '/account/register'
    const paymentPageStyles = router.pathname === '/paymentInfo/payment'

    return (
        <>
            <footer className={`w-full px-4 sm:px-28  md:px-36  h-40 ${((loginPageStyles || registerPageStyles) || registerPageStyles || paymentPageStyles) ? 'via-black to-black' : ' bg-gradient-to-t from-header via-black to-black' } grid sm:grid-cols-2  sm:h-fh`}>
                <div className=' flex flex-col justify-around sm:justify-between items-center  sm:py-20'>
                    <div className='sm:mr-auto pl-4'>
                        <img onClick={() => router.push('/')} src="/Gloomy-store.svg" alt="gloomy"  className='h-8 sm:h-9 lg:h-12 cursor-pointer text-center sm:text-left'/>
                        {/*<img src="/kisspng-bone.svg" alt="bone"*/}
                        {/*     className='h-6 sm:h-10 opacity-40 absolute mr-4 sm:mr-8'/>*/}
                        {/*<Image src="/Gloomy-store.svg" width={150} height={150} alt='some image' />*/}

                    </div>
                    <div className='flex'>
                        <Link href='https://www.instagram.com'>
                            <a className='mr-2'>
                                <Image src="/iconfinder.svg" width={20} height={20} alt='some image' />
                            </a>
                        </Link>
                        <Link href='https://www.facebook.com'>
                            <a className='mr-2'>
                                <Image src="/facebook.svg" width={20} height={20} alt='some image' />
                            </a>
                        </Link>
                        <Link href='https://www.twitter.com'>
                            <a className='mr-3'>
                                <Image src="/twitter.svg" width={20} height={20} alt='some image' />
                            </a>
                        </Link>
                        <Link href='https://www.youtube.com'>
                            <a >
                                <Image src="/Youtube.svg" width={20} height={20} alt='some image' />
                            </a>
                        </Link>
                    </div>
                    <div className='hidden sm:inline-flex flex  '>
                        <input
                            type="text"
                            placeholder='join our newsletter'
                            className={`bg-gray-800 border-b-2 outline-none  text-white ${((loginPageStyles || registerPageStyles) || registerPageStyles) ? 'text-white bg-black w-96 ' : 'opacity-40' }`}/>

                        <div className={`ml-2 p-1 bg-input w-14 grid place-items-center rounded-xl ${((loginPageStyles || registerPageStyles) || registerPageStyles) && 'hidden'}`}>
                            <p >Join</p>
                        </div>

                    </div>
                </div>
                <div
                    className=' flex flex-col sm:inline-flex items-center  justify-around sm:items-start justify-start sm:grid sm:grid-cols-3 sm:pt-20 '>
                    <div className='sm:flex sm:flex-col sm:items-center sm:justify-center  '>
                        <div>
                            <button className='font-bold  opacity-40 sm:opacity-100 text-sm sm:text-base '>{t('footer:company')}
                            </button>
                            <nav className={`hidden sm:block ${(loginPageStyles || registerPageStyles) ? 'text-white' : 'text-gray-500'} `}>
                                <ul>
                                    <li className='mt-3.5 sm:text-xs lg:text-base'>
                                        {t('header:about')}
                                    </li>
                                    <li className='mt-3.5 sm:text-xs lg:text-base'>
                                        {t('footer:contact')}
                                    </li>
                                    <li className='mt-3.5 sm:text-xs lg:text-base'>
                                        {t('footer:careers')}
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                    <div className='sm:flex sm:flex-col sm:items-center sm:justify-center  '>
                        <div className='sm:flex sm:flex-col'>
                            <button
                                className='font-bold sm:mr-auto sm:text-white opacity-40 sm:opacity-100 text-sm px-20 sm:px-0'>{t('footer:shop')}
                            </button>
                            <nav className={`hidden sm:inline-block ${(loginPageStyles || registerPageStyles) ? 'text-white' : 'text-gray-500'} `}>
                                <ul>
                                    <li className='mt-3.5 sm:text-xs lg:text-base'>
                                        Policy
                                    </li>
                                    <li className='mt-3.5 sm:text-xs lg:text-base'>
                                        {t('footer:term')}
                                    </li>
                                    <li className='mt-3.5 sm:text-xs lg:text-base'>
                                        FAQ
                                    </li>
                                    <li className='mt-3.5 sm:text-xs lg:text-base'>
                                        {t('footer:help')}
                                    </li>
                                    <li className='mt-3.5 sm:text-xs lg:text-base'>
                                        chat
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                    <div className='sm:flex sm:flex-col sm:items-center sm:justify-center '>
                        <div className='sm:flex sm:flex-col'>
                            <button
                                className='font-bold sm:text-white opacity-40 text-sm sm:mr-auto sm:opacity-100 '>{t('footer:payment')}
                            </button>
                            <nav className={`hidden sm:inline-block ${(loginPageStyles || registerPageStyles) ? 'text-white' : 'text-gray-500'}`}>
                                <ul>
                                    <li className='mt-3.5 text-sm sm:text-sm lg:text-base'>
                                        Visa
                                    </li>
                                    <li className='mt-3.5 text-sm sm:text-xs lg:text-base'>
                                        MasterCart
                                    </li>
                                    <li className='mt-3.5 text-sm sm:text-xs lg:text-base'>
                                        Paypal
                                    </li>
                                    <li className='mt-3.5 text-sm sm:text-xs lg:text-base'>
                                        Bank Transfer
                                    </li>
                                    <li className='mt-3.5 text-sm sm:text-xs lg:text-base'>
                                        American Express
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    )
}