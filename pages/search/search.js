import Item from "@/components/Item";
import Layout from "@/components/Layout";
import qs from "qs";
import axios from "axios";
import {API_URL} from "@/config/index";

export default function SearchPage({clothes,shoes}) {

    const totalSearch = [...clothes,...shoes]
    return (
        <Layout>

            {shoes  && (
                <div className='grid grid-cols-2  md:grid-cols-4 md:px-44 sm:px-20 '>
                    {shoes && shoes.map((item, i) => (
                        <Item {...item} key={i} slugInfo='shoesPage'  />
                    ))}
                </div>
            )}
            {clothes && (
                <div className='grid grid-cols-2  md:grid-cols-4 md:px-44 sm:px-20 '>
                    {clothes && clothes.map((item, i) => (
                        <Item {...item} key={i} slugInfo='clothesPage'  />
                    ))}
                </div>
            )}

            {totalSearch.length  === 0 && (
                <div className='grid  place-items-center md:px-44 sm:px-20 min-h-screen sm:min-h-1/96'>
                    <p className='text-2xl font-semibold'>Not Found</p>
                </div>
            )}


        </Layout>
    )
}
export const getServerSideProps = async ({query: {term}}) => {

    const query = qs.stringify({
        _where: {
            _or: [
                {title_contains: term},
                {category_contains: term},
                {brand_contains: term},
                {color_contains: term},
                {type_contains: term}
            ]
        }
    })

    const {data: clothes} = await axios.get(`${API_URL}/clothes?${query}`)
    const {data: shoes} = await axios.get(`${API_URL}/shoes?${query}`)
    return {
        props: {clothes,shoes}
    }
}