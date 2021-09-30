import axios from "axios";
import Layout from "@/components/Layout";
import {API_URL, PER_PAGE} from "@/config/index";
import PageCount from "@/components/pagescount/PageCount";
import Item from "@/components/Item";


export default function Shoes({ shoes,totalShoes, totalPages}) {
    return (
        <Layout title='shoes'>
            <div className=' w-full  '>
                <div className='grid grid-cols-2  md:grid-cols-4 md:px-44  sm:px-20  '>
                    {shoes.map((item, i) => (
                        <Item {...item} key={i} slugInfo='shoesPage'/>
                    ))}
                </div>
                <div className='flex justify-center w-full'>
                    <PageCount total={totalShoes} text='shoes'/>
                </div>
            </div>
        </Layout>
    )
}
export const getServerSideProps = async ({query: {page = 1}}) => {
    const {data: totalShoes} = await axios.get(`${API_URL}/shoes/count`)

    const start = +page === 1 ? 0 : (+page - 1) * PER_PAGE
    const {data: shoes} = await axios.get(`${API_URL}/shoes?_limit=${PER_PAGE}&_start=${start}`)

    return {
        props: { shoes, totalShoes, totalPages: +page,

        },

    }
}