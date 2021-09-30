import Link from "next/link";
import SlugLogo from "@/components/shoes/slug/SlugLogo";
import useTranslation from "next-translate/useTranslation";


export default function TextInSlug() {
    let {t} = useTranslation()
    return (
        <>
            <div className=' p-2 sm:px-32'>
                <p className='mt-9 h-10 text-2xl  sm:text-3xl sm:col-span-full opacity-50'>{t('content:description')}</p>
                <div className='grid sm:grid-cols-2'>
                    <div className=' sm:mr-8'>
                        <p className='font-serif text-sm sm:text-lg opacity-50'>
                            {t('content:text')}
                        </p>
                    </div>
                    <div  className=' text-sm sm:text-lg  sm:mr-8 font-serif'>
                        <p  className='font-serif text-sm sm:text-lg opacity-50'>
                            {t('content:text')}
                        </p>
                    </div>
                </div>
                {/*second grid*/}
                <div className='flex '>
                    <p className='text-3xl mr-20 opacity-50'>reviews</p>
                    <Link href='/login'>
                        <a className='underline opacity-50 hover:text-red-300'>Sign in to make review</a>
                    </Link>
                </div>
                {/*start*/}
                <div className='grid sm:grid-cols-2'>
                    <div>
                        <div>
                            <SlugLogo img='bat.svg'/>
                            <SlugLogo img='star.svg'/>
                            <SlugLogo img='star.svg'/>
                            <SlugLogo img='star.svg'/>
                        </div>
                        <p className='text-2xl opacity-50'>name</p>
                        <p  className='font-serif text-sm sm:text-lg opacity-50'>
                            {t('content:text2')}
                        </p>
                    </div>
                    <div>
                        <div  className='mr-auto'>
                            <SlugLogo img='bat.svg'/>
                            <SlugLogo img='star.svg'/>
                            <SlugLogo img='star.svg'/>
                            <SlugLogo img='star.svg'/>
                        </div>
                        <p className='mr-auto text-2xl opacity-50'>name</p>
                        <p  className='font-serif text-sm sm:text-lg opacity-50'>
                            {t('content:text2')}
                        </p>
                    </div>
                </div>
                <p className=' mt-4 text-2xl sm:text-3xl font-semibold text-gray-400'>{t('content:related')}</p>
            </div>
        </>
    )
}