import Layout from "@/components/Layout";
import {useContext, useEffect} from "react";
import {StoreContext} from "@/context/createStore";
import {cookieParse} from "@/helper/index";
import axios from "axios";
import {API_URL} from "@/config/index";

export default function Orders({orders}) {
    const {getOrders, filterOrderData, setFilterOrderData} = useContext(StoreContext)
    useEffect(() => {
        const getOrder = async () => {
            let ordersData = await getOrders()
            setFilterOrderData(ordersData)
        }
        getOrder()
    },[])


    console.log(filterOrderData)
    return (
        <Layout title='orders'>
            <div className='min-h-screen'>
                <h1>orders</h1>
            </div>
        </Layout>
    )
}

export const getServerSideProps = async ({req}) => {
    const {token} = cookieParse(req)
    const {data: orders} = await axios.get(`${API_URL}/orders`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })

    return {
        props: { orders}
    }
}