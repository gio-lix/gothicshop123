import {useContext, useState} from "react";
import {StoreContext} from "@/context/createStore";
import {useRouter} from "next/router";
import axios from "axios";
import {API_URL} from "@/config/index";
import useTranslation from "next-translate/useTranslation";


export default function BuyButton({product}) {
    let {t} = useTranslation()
    const {user, getToken, getOrders , setInfoText, setFilterOrderData} = useContext(StoreContext)


    const router = useRouter()



    const handleBuy = async (e) => {
        e.preventDefault()
        const token = await getToken()
        const ordersData = await getOrders()



        const dataClotheMap = ordersData && ordersData.filter(element => element.clothe).map(el => el.clothe.id)
        const dataShoesMap = ordersData && ordersData.filter(element => element.shoes).map(el => el.shoes.id)
        const dataMAp = [...dataClotheMap, ...dataShoesMap]

        const productId = Object.keys(product).includes('shoes')
        const productClothes = Object.keys(product).includes('clothe')


        const x = productId && dataMAp.filter(el => el === product.shoes.id)
        const y = productClothes && dataMAp.filter(el => el === product.clothe.id)

        if (x.length > 0 || y.length > 0) {
            setInfoText('item already exist')
            return
        }

        try {
            const {data} = await axios.post(`${API_URL}/orders`, product, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            router.push('/orders')
        } catch (err) {
            console.log(err)
        }
    }

    const handleDirected = async () => {
        router.push('/account/login')
    }



    return (
        <>
            {user ? (
                <button onClick={handleBuy}
                        className='sm:w-44 w-36 sm:p-2 p-1 border-input bg-buttonColor outline-none rounded-2xl hover:bg-buttonHover'
                >{t('content:chart')}</button>
            ) : (
                <button onClick={handleDirected}
                        className='sm:w-44 w-36 sm:p-2 p-1 border-input bg-buttonColor outline-none rounded-2xl hover:bg-buttonHover'
                >{t('content:login')}</button>
            )}
        </>
    )
}