import axios from "axios";
import {API_URL} from "@/config/index";
import Layout from "@/components/Layout";
import Item from "@/components/Item";

export default function ClothesPage({clothes}) {

    return (
        <Layout>
            <div className='min-h-screen'>
                <h1>Clothes</h1>
                {clothes && clothes.map(item => (
                    <Item {...item} key={item.id} slugInfo='clothesSlug'/>
                ))}
            </div>
        </Layout>
    )
}
export const getServerSideProps = async () => {
    const {data: clothes} = await axios.get(`${API_URL}/clothes`)
    return {
        props: {
            clothes
        }
    }
}