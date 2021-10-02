import Layout from "@/components/Layout";
import {cookieParse, currency} from "@/helper/index";
import axios from "axios";
import {API_URL} from "@/config/index";
import {useRouter} from "next/router";
import ShoesOrder from "@/components/orders/ShoesOrder";
import ClothesOrder from "@/components/orders/ClothesOrder";
import {useContext, useEffect, useState} from "react";
import {StoreContext} from "@/context/createStore";
import OrdersInfo from "@/components/orders/ordersPageDiesign/OrdersInfo";
import useTranslation from "next-translate/useTranslation";


let price = 0


export default function Orders({data, token}) {
    let {t} = useTranslation()
    const router = useRouter()
    const orderPath = router.pathname === '/orders'
    const [localData, setLocalData] = useState([])
    const {getOrders, filterOrderData, setFilterOrderData} = useContext(StoreContext)


    useEffect(() => {
        setFilterOrderData(data)
    },[])
    // console.log('change data')
    // console.log(filterOrderData)
    //
    // useEffect(() => {
    //     const getOrder = async () => {
    //         let ordersData = await getOrders()
    //         setFilterOrderData(ordersData)
    //     }
    //     getOrder()
    // },[])



    const deleteItem = async (id) => {
        try {
            const {data} = await axios.delete(`${API_URL}/orders/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            setFilterOrderData(filterOrderData.filter(el => el.id !== data.id))
        } catch (err) {
            console.log(err)
        }
    }



    //add shoes quantity
    const addShoesQuantity = async (addQuantity, id) => {

        let filterElement = filterOrderData.filter(el => el.id === id)
        filterElement[0].quantity = Number(addQuantity)
        price = filterElement[0].quantity * filterElement[0].shoe.price
        filterElement[0].totalPrice = price
        const updateElement = filterElement[0]
        try {
            const {data: uppGrate} = await axios.put(`${API_URL}/orders/${id}`, updateElement, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            setLocalData(uppGrate)
        } catch (err) {
            console.log(err)
        }

    }
    //add clothes quantity
    const addClothesQuantity = async (addClotheQuantity, id) => {

        let filterEl = filterOrderData.filter(el => el.id === id)
        filterEl[0].quantity = Number(addClotheQuantity)
        price = filterEl[0].quantity * filterEl[0].clothe.price
        filterEl[0].totalPrice = price
        const updateElement = filterEl[0]

        try {
            const {data: uppGrate} = await axios.put(`${API_URL}/orders/${id}`, updateElement, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            setLocalData(uppGrate)
        } catch (err) {
            console.log(err)
        }
    }

    const handleCheckout = () => {
        router.push('/payment/payment')
    }
    return (
        <Layout title='orders'>
            <div className='px-2 sm:px-28 md:px-36 h-96 overflow-y-scroll   scrollbar-hide'>
                <h1 className='pb-14 text-center sm:text-left font-semibold text-2xl text-gray-400 '>{t('content:shoppingCart')}</h1>
                <div className=' sm:grid sm:grid-cols-7 sm:gap-x-3'>
                    <div className='sm:col-span-5'>
                        {filterOrderData.length > 0 && filterOrderData.map((item) => {
                            if (item.shoe) {
                                return (
                                    <ShoesOrder
                                        item={item}
                                        addShoesQuantity={addShoesQuantity}
                                        deleteItem={deleteItem}
                                        key={item.id}
                                    />
                                )
                            } else if (item.clothe) {
                                return (
                                    <ClothesOrder
                                        item={item}
                                        addClothesQuantity={addClothesQuantity}
                                        deleteItem={deleteItem}
                                        key={item.id}
                                    />
                                )
                            }
                        })}
                    </div>
                    {/*orders info*/}
                    <OrdersInfo />
                </div>
            </div>
            <div className='w-full h-44 sm:py-1 sm:py-2 '>
                <div className=' px-2 h-full flex flex-col-reverse  mt-4 sm:mt-2 flex-col sm:flex-row justify-between  px-2 sm:px-28 md:px-36 '>
                    <div className='text-gray-400 flex flex-col justify-between'>
                        <p className='text-sm sm:text-base  text-center sm:text-left'>{t('content:promo')}</p>
                        <div className=' text-center sm:text-left'>
                            <input
                                placeholder='enter a code..'
                                type="text" className='rounded sm:p-1 mt-2 text-black outline-none bg-gray-500'/>
                        </div>
                        <div className='mt-2 flex items-center justify-between'>
                            <img src="/truck.svg" alt="truck" className='h-10 mt-2 '/>
                            <p className='text-sm ml-2 text-gray-500'>{t('content:time')}</p>
                        </div>

                    </div>
                    <div className='flex flex-col w-full px-8 sm:px-0 sm:w-64 justify-around   '>
                        <div className='flex  '>
                            <div className='flex w-full justify-between'>
                                <p className=' text-gray-600'> {t('content:subTotal')}: </p>
                                <p className='font-bold text-gray-400'>{filterOrderData.length} </p>
                            </div>
                        </div>
                        <div>
                            <p className='flex justify-between'>
                                <p className='font-bold text-gray-600'>{t('content:total')} (incl VAT):</p>
                                <span className='wl-2  text-gray-400 font-bold'>
                                      {filterOrderData.length > 0 && (
                                          currency(filterOrderData.map((item) => item.totalPrice)
                                              .reduce((acc, num) => {
                                                  return acc + num
                                              }))
                                      )}
                                    <span className='ml-1'>
                                        {t('content:price')}
                                    </span>
                                </span>
                            </p>

                        </div>
                        <div
                            onClick={handleCheckout}
                            className='bg-buttonColor  group w-full  sm:w-64  rounded-2xl bg-input text-center cursor-pointer '  >
                            <p className='sm:p-2 p-1 text-gray-400 group-hover:text-white'>checkout</p>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}
export const getServerSideProps = async ({req}) => {
    const {token} = cookieParse(req)
    const {data} = await axios.get(`${API_URL}/orders`,{
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return {
        props: { token,data}
    }
}