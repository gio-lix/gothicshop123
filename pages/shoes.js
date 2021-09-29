import axios from "axios";
import {API_URL} from "@/config/index";
import Layout from "@/components/Layout";
import Item from "@/components/Item";

export default function ClothesPage({shoes}) {

    return (
        <Layout>
            <div className='min-h-screen'>
                <h1>Clothes</h1>
                {shoes && shoes.map(item => (
                    <Item {...item} key={item.id} slugInfo='shoesSlug'/>
                ))}
            </div>
        </Layout>
    )
}
export const getServerSideProps = async () => {
    const {data: shoes} = await axios.get(`${API_URL}/shoes`)

    return {
        props: {
            shoes
        }
    }
}