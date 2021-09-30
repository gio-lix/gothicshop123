import axios from "axios";
import {API_URL} from "@/config/index";
import Layout from "@/components/Layout";
import Item from "@/components/Item";
import {translateSho} from "@/helper/index";


export default function MenShoesType({allCategory,menShoes_type}) {

    return (
        <Layout>
            <div className='w-full min-h-screen sm:min-h-1/96'>
                {allCategory.length < 1 && (
                    <div className='w-full flex justify-center pt-24 md:px-44  px-20'>
                        <p className='w-full '>sorry there no <span className='text-red-500 font-semibold'>{menShoes_type}</span> yet</p>
                    </div>
                )}
                <div className='grid grid-cols-2  md:grid-cols-4 md:px-44  sm:px-20  '>

                    {allCategory.map((item, i) => (
                        <Item {...item} key={i} slugInfo='shoesPage'/>
                    ))}
                </div>
            </div>
        </Layout>
    )
}
export const getServerSideProps = async ({params: {menShoes_type}}) => {
    const {data} = await axios.get(`${API_URL}/shoes`)
    const filterCategory = data.map(item => ({...item, type: item.type.replace('/','-').toLowerCase()}))
    const menShoes = filterCategory.filter(item => item.category === 'men')
    const allCategory = menShoes.filter(item => item.type === translateSho(menShoes_type))

    return {
        props: {allCategory, menShoes_type}
    }
}