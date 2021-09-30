import Layout from "@/components/Layout";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Image from "next/image";
import useTranslation from "next-translate/useTranslation";

export default function Home() {
    let {t} = useTranslation()
    const slider =  [
        // {
        //     title: 'first title of image',
        //     description: 'this is the first slider of image',
        //     url: '/typewriter.jpg'
        // },
        {
            title: 'first title of image',
            description: 'this is the first slider of image',
            url: '/shopping.webp'
        },
        {
            title: 'second title of image',
            description: 'this is the first slider of image',
            url:  '/fashion.jpg'
        },
    ]
    const settings = {
        fade: true,
        infinity: true,
        slidersToShow: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        speed: 500,
        arrows: false,
        slidersToScroll: 1
    }

    return (
        <Layout>

            {/*</div>*/}
            <div className='mt-2'>
                <Slider {...settings}>
                    {slider.map((slide,index) => {
                        return (
                            <div className='w-full h-96 sm:h-ic ' key={index}>
                                <Image src={slide.url}  layout='fill'  alt='some value' />
                            </div>
                        )
                    })}
                </Slider>
            </div>

            <div className='w-full mt-1  h-96 bg-auto bg-no-repeat bg-center group'
                 style={{backgroundImage: "url('/MaskGroup2.png')"}}>
                <div
                    className='w-full h-full bg-black bg-opacity-40 group-hover:bg-opacity-60 flex justify-center items-end'>
                    <div className=' w-full flex flex-col justify-center items-center  sm:items-start sm:ml-36 pb-16'>
                        <p className='mt-2 text-4xl text-gray-400 group-hover:text-white'> {t('content:sale')}</p>
                        <p className='mt-2 text-gray-400 group-hover:text-white'>{t('content:discount')}</p>
                        <button
                            className='w-48 mt-2  py-1 rounded-2xl bg-input text-gray-400 group-hover:text-white outline-none'>{t('content:views')}
                        </button>
                    </div>
                </div>
            </div>
            <div className='w-full mt-1  h-96 bg-auto bg-no-repeat bg-center group'
                 style={{backgroundImage: "url('/MaskGroup3.png')"}}>
                <div
                    className='w-full h-full bg-black bg-opacity-40 group-hover:bg-opacity-60 flex justify-center items-end'>
                    <div
                        className=' w-full flex flex-col justify-center items-center sm:items-end  sm:items-start sm:mr-36 pb-16'>
                        <p className='mt-2 text-4xl text-gray-400 group-hover:text-white'>{t('content:us')}</p>
                        <p className='mt-2 text-gray-400 group-hover:text-white'>{t('content:design')}</p>
                        <button
                            className='w-48 mt-2  py-1 rounded-2xl bg-input text-gray-400 group-hover:text-white outline-none'>{t('content:views')}
                        </button>
                    </div>
                </div>
            </div>
            <div className='w-full  mt-1 h-96 bg-auto bg-no-repeat bg-center group'
                 style={{backgroundImage: "url('/MaskGroup4.png')"}}>
                <div
                    className='w-full h-full bg-black bg-opacity-40 group-hover:bg-opacity-60 flex justify-center items-end'>
                    <div className=' w-full flex flex-col justify-center items-center  sm:items-start sm:ml-36 pb-16'>
                        <p className='mt-2 text-4xl text-gray-400 group-hover:text-white'>{t('content:joinUs')}</p>
                        <div className='w-72'>
                            <p className='mt-2 text-gray-400 group-hover:text-white'>{t('content:joinText')}</p>
                        </div>
                        <button
                            className='w-48 mt-2  py-1 rounded-2xl bg-input text-gray-400 group-hover:text-white outline-none'>{t('content:views')}
                        </button>
                    </div>
                </div>
            </div>
        </Layout>
    )
}


