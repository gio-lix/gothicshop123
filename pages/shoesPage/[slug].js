import axios from "axios";
import Layout from "@/components/Layout";
import Image from "next/image";
import {useContext, useEffect, useState} from "react";
import TextInSlug from "@/components/shoes/slug/TextInSlug";
import {API_URL} from "@/config/index";
import {useRouter} from "next/router";
import useTranslation from "next-translate/useTranslation";
import {checkIndexSize, checkIndexType, currency} from "@/helper/index";
import {StoreContext} from "@/context/createStore";
import useWindowWidth from "../../customHook/useWindowWidth";
import BuyButton from "@/components/BuyButton";

export default function ShoesInfo({data, randomShoes}) {
    let {t} = useTranslation()
    const router = useRouter()
    const {infoText} = useContext(StoreContext)
    const activeSizes = data.size.map(el => checkIndexSize(el))
    const size = ['XS', 'L', 'S', 'XL', 'M', 'XXL']
    const [activeType, setActiveType] = useState(activeSizes[0])
    const {width, height} = useWindowWidth()

    const [singleImage, setSingleImage] = useState(``)
    const handleClickImage = (item) => setSingleImage(item.formats.medium.url)


    const [values, setValues] = useState({ status: "unpaid",
        totalPrice: data.price,
        quantity: data.quantity,
        checkout_session: data.slug,
        shoes: data,
        size: []
    })


    const handleChange = (e) => {
        setValues({...values, size: [e.target.value]})
    }



    let item = checkIndexType(activeType)
    const handleActive = (index) => {
        setValues({...values, size: [item]})
        setActiveType(index)
    }
    useEffect(() => {
        setValues({...values, size: [item]})
    }, [item])

    return (
        <Layout title={`${data.slug}`}>
            {infoText && (
                <div className='w-36  h-10 bg-input fixed top-16 z-50 right-0 flex items-center justify-center'>
                    <p>{infoText}</p>
                </div>
            )}
            <div
                style={{backgroundImage: "url('/bg.png')"}}
                className={`w-full sm:mt-2 flex flex-col lg:flex-row justify-around content-between sm:px-32 ${width < 640 && 'pt-14'}`}
            >
                <div className=' flex-col sm:flex-row px-2  '>
                    <div className='h-96 sm:flex'>
                        <div className='flex flex-row  sm:flex-col sm:absolute sm:z-30'>
                            {data.image.map((item, i) => (
                                <div key={i} className='mr-1'>
                                    <button onClick={() => handleClickImage(item)}>
                                        <Image src={item.formats.small.url} width={60} height={70}/>
                                    </button>
                                </div>
                            ))}
                        </div>
                        <div className='sm:mx-2 sm:ml-16'>
                            {singleImage ? (
                                <div className=' lg:w-96'>
                                    <Image src={singleImage} width={400} height={400} />
                                </div>

                            ) : (
                                <div className='lg:w-96'>
                                    <Image src={data.image[0].formats.small.url} width={400} height={400}  objectFit='fill'/>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className=' w-full sm:w-full  sm:mt-0 p-2  sm:pr-20 mt-24 '>
                    <p className='pt-2 font-semibold opacity-40 text-2xl'>{data.brand}</p>
                    <p className='pt-2'>{data.type}</p>
                    <p className='lg:inline-block text-2xl'>{currency(data.price)} <span className='text-sm'>{t('content:price')}</span>
                    </p>
                    <div className='pt-2 flex justify-between items-center'>
                        <div className='flex lg:flex-col'>
                            <p>{t('content:size')} </p>
                            <select name='size' className=' ml-4 bg-gray-800 text-white lg:hidden'
                                    onChange={handleChange}>
                                {data.size.map((item, i) => (
                                    <option className='text-white' key={i} value={item}>{item}</option>
                                ))}
                            </select>
                            <div className='w-96 flex flex-wrap  hidden lg:inline-flex'>
                                {size.map((item, index) => {
                                    return (
                                        <button
                                            disabled={!activeSizes.includes(index)}
                                            key={index}
                                            className={` w-14 h-14 mr-1 flex items-center justify-center  
                                            ${!activeSizes.includes(index) && 'bg-buttonDisable' }
                                            ${activeType === index ? 'bg-buttonHover' : 'bg-buttonColor '}   `}
                                            onClick={() => handleActive(index)}
                                        >
                                            <p className={` ${!activeSizes.includes(index) && 'opacity-40'}`}>
                                                {item}
                                            </p>

                                            {/*</button>*/}

                                        </button>
                                    )
                                })}
                            </div>
                        </div>
                        <p className='text-2xl font-bold lg:hidden'> {currency(data.price)} <span
                            className='text-sm'>{t('content:price')}</span></p>
                    </div>
                    <div className='flex justify-between pt-8'>
                        {/*add to product to chart*/}
                        <BuyButton product={values}/>
                        <button
                            className='sm:w-44 w-36 sm:p-2 p-1 border-input  bg-buttonColor outline-none rounded-2xl hover:bg-buttonHover'>
                            {t('content:buy')}
                        </button>
                    </div>
                    <div className='flex justify-center pt-10 sm:justify-start'>
                        <p>{t('content:deliver')}</p>
                    </div>
                </div>
            </div>
            <TextInSlug />
            <div className='grid grid-cols-2 sm:grid sm:grid-cols-6   sm:px-32 gap-x-3 pb-4' >
                {randomShoes && (
                    Object.values(randomShoes).slice(0,6).map((item, i) => (
                        <div key={i}>
                            <div className='w-full p-2 sm:p-0 group'>
                                <Image src={item.image[0].formats.small.url} width={60} height={70} layout='responsive'/>
                                <div className='grid grid-cols-4 pt-2 '>
                                    <button onClick={() => router.push(`/shoesPage/${item.slug}`)} className='text-sm col-span-3 group-hover:underline'>{item.title}</button>
                                    <button className='bg-indigo-700 w-7 h-7 '>
                                        <p  className=' flex justify-center'>
                                            <img src="/Path.svg" alt="path" />
                                        </p>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </Layout>
    )
}
export const getServerSideProps = async ({query: {slug}}) => {
    const {data} = await axios.get(`${API_URL}/shoes?slug=${slug}`)

    const {data: shoes} = await axios.get(`${API_URL}/shoes`)
    const randomShoes = shoes.reduce((acc, item) => {
        return {...acc, [Math.floor(Math.random() * shoes.length)] : item}
    },{})


    return {
        props: {data: data[0], randomShoes }
    }
}