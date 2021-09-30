import axios from "axios";
import {API_URL} from "@/config/index";
import Layout from "@/components/Layout";
import useTranslation from "next-translate/useTranslation";
import Item from "@/components/Item";
import {translateCl} from "@/helper/index";


export default function CategoryType({allCategory,category_type}) {
    let {t} = useTranslation()

    return (
        <Layout>
            <div className='w-full min-h-screen sm:min-h-1/96  '>
                {allCategory.length < 1 && (
                    <div className='w-full flex justify-center pt-24 md:px-44  px-20'>
                        <p className='w-full '>{t('header:notFound')}
                            <span className='text-red-500 font-semibold'>{category_type}</span>
                            {t('header:yet')}
                        </p>
                    </div>
                )}
                <div className='grid grid-cols-2  md:grid-cols-4 md:px-44 sm:px-20 '>
                    {allCategory && allCategory.map((item, i) => (
                        <Item {...item} key={i} slugInfo='clothesPage'  />
                    ))}
                </div>
            </div>

        </Layout>
    )
}
export const getServerSideProps = async ({params: {category_type}}) => {
    const {data} = await axios.get(`${API_URL}/clothes`)



    const filterCategory = data.map(item => ({...item, type: item.type.replace('/','-').toLowerCase()}))

    console.log(filterCategory)

    const menShoes = filterCategory.filter(item => item.category === 'men')
    const allCategory = menShoes.filter(item => item.type === translateCl(category_type))

    return {
        props: {allCategory, category_type}
    }
}
