import Layout from "@/components/Layout";
import axios from "axios";
import {API_URL, NEXT_API} from "@/config/index";
import {useRouter} from 'next/router';
import Item from "@/components/Item";



export default function FilterData({products, shoes, clothes}) {
    const router = useRouter()
    const cd = router.pathname !== '/category/filterCategory/filterData'
    const {brand, color, size, minPrice, maxPrice} = router.query



    const nums = Object.values(router.query)
    const newNumsArray = nums.filter(item => {
        return parseInt(item)
    })
    const regex = /[a-z]|[A-Z]/g;
    const newStringArray = nums.filter(item => {
        return item.match(regex)
    })
    const newNumsArrayLength = (newNumsArray.length > 0 && 1) || undefined
    const length = [...newStringArray, newNumsArrayLength].filter(item => item !== undefined)


    const oneBrand = products.filter(item => item.brand.toLowerCase().replace('-', '') === brand)
    const oneColor = products.filter(item => item.color.toLowerCase().replace('-', '') === color)
    const onePrice = products.filter(item => item.price > minPrice && item.price < maxPrice)
    const oneSize = products.filter(item => item.size.includes(size))


    const two = products.filter(item =>
        item.brand.toLowerCase().replace('-', '') === brand
        && item.size.includes(size)
        || item.brand.toLowerCase().replace('-', '') === brand
        && item.color.toLowerCase() === color
        || item.brand.toLowerCase().replace('-', '') === brand
        && item.price > minPrice && item.price < maxPrice
        || item.color.toLowerCase() === color
        && item.size.includes(size)
        || item.color.toLowerCase() === color
        && item.price > minPrice && item.price < maxPrice
        || item.size.includes(size)
        && item.price > minPrice && item.price < maxPrice
    )


    const three = products.filter(item =>
        item.brand.toLowerCase().replace('-', '') === brand
        && item.color.toLowerCase() === color
        && item.size.includes(size)
        || item.brand.toLowerCase().replace('-', '') === brand
        && item.price > minPrice && item.price < maxPrice
        && item.size.includes(size)
        || item.color.toLowerCase() === color
        && item.price > minPrice && item.price < maxPrice
        && item.size.includes(size)
        || item.brand.toLowerCase().replace('-', '') === brand
        && item.color.toLowerCase() === color
        && item.price > minPrice && item.price < maxPrice
    )

    const four = products.filter(item => item.brand.toLowerCase().replace('-', '') === brand
        && item.color.toLowerCase() === color
        && item.price > minPrice && item.price < maxPrice
        && item.size.includes(size))




    const shoesSlug = shoes.map(item => item.slug)
    const clotheSlug = clothes.map(item => item.slug)

    if (length.length ===  1  && oneBrand.length === 0
        && length.length ===  1  && oneColor.length === 0
        && length.length ===  1  && onePrice.length === 0
        && length.length ===  1  && oneSize.length === 0) {
        console.log('brand not founr')
    }


    return (
        <Layout>
            <div className='min-h-screen'>
                {length.length === 2 && two.length === 0 && (
                    <div className='grid place-items-center mt-24'>
                        <p>Not Found</p>
                    </div>
                )}
                {length.length ===  1  && oneBrand.length === 0
                && length.length ===  1  && oneColor.length === 0
                && length.length ===  1  && onePrice.length === 0
                && length.length ===  1  && oneSize.length === 0 && (
                    <div className='grid place-items-center mt-24'>
                        <p>Not Found</p>
                    </div>
                )}
                {length.length === 3 && three.length === 0 && (
                    <div className='grid place-items-center mt-24'>
                        <p>Not Found</p>
                    </div>
                )}
                {length.length === 4 && four.length === 0 && (
                    <div className='grid place-items-center mt-24'>
                        <p>Not Found</p>
                    </div>
                )}
                {length.length === 1 && (
                    <>
                        <div className='grid grid-cols-2  md:grid-cols-4 md:px-44  sm:px-20   '>
                            {oneBrand.map((item, i) => {
                                if (shoesSlug.includes(item.slug)) {
                                    return <Item {...item} key={i} slugInfo='shoesPage'/>
                                }
                                if (clotheSlug.includes(item.slug)) {
                                    return <Item {...item} key={i} slugInfo='clothesPage'/>
                                }
                            })}
                        </div>
                        <div className='grid grid-cols-2  md:grid-cols-4 md:px-44  sm:px-20  '>
                            {oneColor.map((item, i) => {
                                if (shoesSlug.includes(item.slug)) {
                                    return <Item {...item} key={i} slugInfo='shoesPage'/>
                                }
                                if (clotheSlug.includes(item.slug)) {
                                    return <Item {...item} key={i} slugInfo='clothesPage'/>
                                }
                            })}
                        </div>
                        <div className='grid grid-cols-2  md:grid-cols-4 md:px-44  sm:px-20  '>
                            {onePrice.map((item, i) => {
                                if (shoesSlug.includes(item.slug)) {
                                    return <Item {...item} key={i} slugInfo='shoesPage'/>
                                }
                                if (clotheSlug.includes(item.slug)) {
                                    return <Item {...item} key={i} slugInfo='clothesPage'/>
                                }
                            })}
                        </div>
                        <div className='grid grid-cols-2  md:grid-cols-4 md:px-44  sm:px-20  '>
                            {oneSize.map((item, i) => {
                                if (shoesSlug.includes(item.slug)) {
                                    return <Item {...item} key={i} slugInfo='shoesPage'/>
                                }
                                if (clotheSlug.includes(item.slug)) {
                                    return <Item {...item} key={i} slugInfo='clothesPage'/>
                                }
                            })}
                        </div>
                    </>
                )}
                {length.length === 2 && (
                    <>
                        <div className='grid grid-cols-2  md:grid-cols-4 md:px-44  sm:px-20  '>
                            {two.map((item, i) => {
                                if (shoesSlug.includes(item.slug)) {
                                    return <Item {...item} key={i} slugInfo='shoesPage'/>
                                }
                                if (clotheSlug.includes(item.slug)) {
                                    return <Item {...item} key={i} slugInfo='clothesPage'/>
                                }
                            })}
                        </div>
                    </>
                )}
                {length.length === 3 && (
                    <>
                        <div className='grid grid-cols-2  md:grid-cols-4 md:px-44  sm:px-20  '>
                            {three.map((item, i) => {
                                if (shoesSlug.includes(item.slug)) {
                                    return <Item {...item} key={i} slugInfo='shoesPage'/>
                                }
                                if (clotheSlug.includes(item.slug)) {
                                    return <Item {...item} key={i} slugInfo='clothesPage'/>
                                }
                            })}
                        </div>
                    </>
                )}
                {length.length === 4 && (
                    <>
                        <div className='grid grid-cols-2  md:grid-cols-4 md:px-44  sm:px-20  '>
                            {four.map((item, i) => {
                                if (shoesSlug.includes(item.slug)) {
                                    return <Item {...item} key={i} slugInfo='shoesPage'/>
                                }
                                if (clotheSlug.includes(item.slug)) {
                                    return <Item {...item} key={i} slugInfo='clothesPage'/>
                                }
                            })}
                        </div>
                    </>
                )}
            </div>

        </Layout>

    )
}


export const getServerSideProps = async (ctx) => {
    const {data: clothes} = await axios.get(`${API_URL}/clothes`)
    const {data: shoes} = await axios.get(`${API_URL}/shoes`)

    const products = [...shoes, ...clothes]
    return {
        props: {products, shoes, clothes}
    }
}