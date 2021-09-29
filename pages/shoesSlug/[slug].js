import axios from "axios";
import {API_URL} from "@/config/index";
import Layout from "@/components/Layout";
import Image from "next/image";
import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import {checkIndexSize, checkIndexType, currency} from "@/helper/index";
import BuyButton from "@/components/BuyButton";

export default function ShoesSlug({data}) {

    const router = useRouter()
    const activeSizes = data.size.map(el => checkIndexSize(el))
    const size = ['XS', 'L', 'S', 'XL', 'M', 'XXL']
    const [activeType, setActiveType] = useState(activeSizes[0])

    const [singleImage, setSingleImage] = useState(``)
    const handleClickImage = (item) => setSingleImage(item.formats.medium.url)

    const [values, setValues] = useState({
        status: "unpaid",
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
        <Layout>
            <div className='min-h-screen'>
                <h1>{data.title}</h1>
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
                                    <Image src={singleImage} width={400} height={400}/>
                                </div>

                            ) : (
                                <div className='lg:w-96'>
                                    <Image src={data.image[0].formats.small.url} width={400} height={400}
                                           objectFit='fill'/>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <div className=' w-full sm:w-full  sm:mt-0 p-2  sm:pr-20 mt-24 '>
                <p className='pt-2 font-semibold opacity-40 text-2xl'>{data.brand}</p>
                <p className='pt-2'>{data.type}</p>
                <p className='lg:inline-block text-2xl'>{currency(data.price)} <span
                    className='text-sm'>price</span>
                </p>
                <div className='pt-2 flex justify-between items-center'>
                    <div className='flex lg:flex-col'>
                        <p>size </p>
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
                                            ${!activeSizes.includes(index) && 'bg-buttonDisable'}
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
                        className='text-sm'>price</span></p>
                </div>
                <div className='flex justify-between pt-8'>
                    {/*add to product to chart*/}
                    <BuyButton product={values}/>
                    {/*<BuyButton product={values}/>*/}
                </div>
            </div>
        </Layout>
    )
}
export const getServerSideProps = async ({query: {slug}}) => {
    const {data} = await axios.get(`${API_URL}/shoes?slug=${slug}`)

    return {
        props: {data: data[0]}
    }
}