import axios from "axios";
import Layout from "@/components/Layout";
import {API_URL, PER_PAGE} from "@/config/index";
import PageCount from "@/components/pagescount/PageCount";
import Item from "@/components/Item";


export default function Clothes({total, clothes, page,}) {

    return (
        <Layout title='clothes'>
            <div className='grid grid-cols-2  md:grid-cols-4 md:px-44 sm:px-20 '>
                {clothes.map((item, i) => (
                    <Item {...item} key={i} slugInfo='clothesPage'  />
                ))}
            </div>
            <div className='flex justify-center w-full'>
                <PageCount total={total} text='clothes'/>
            </div>
        </Layout>
    )
}
export const getServerSideProps = async ({query: {page = 1}}) => {
    const {data: total} = await axios.get(`${API_URL}/clothes/count`)

    const start = +page === 1 ? 0 : (+page - 1) * PER_PAGE
    const {data: clothes} = await axios.get(`${API_URL}/clothes?_limit=${PER_PAGE}&_start=${start}`)

    return {
        props: { total, clothes, page: +page}
    }
}