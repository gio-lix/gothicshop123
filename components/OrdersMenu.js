import {useRouter} from "next/router";
import {useContext, useEffect, useState} from "react";
import {StoreContext} from "@/context/createStore";
import Image from "next/image";
import axios from "axios";
import {API_URL} from "@/config/index";
import useTranslation from "next-translate/useTranslation";

export default function OrdersMenu() {
    const {user, getOrders, getToken, filterOrderData, setFilterOrderData} = useContext(StoreContext)
    let {t} = useTranslation()
    const router = useRouter()
    const orderPath = router.pathname === '/orders'


    const dataClotheMap = filterOrderData && filterOrderData.filter(element => element.clothe)
    const dataShoesMap = filterOrderData && filterOrderData.filter(element => element.shoes)

    const deleteItem = async (id) => {
        const token = await getToken()
        const {data} = await axios.delete(`${API_URL}/orders/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        setFilterOrderData(filterOrderData.filter(el => el.id !== data.id))
    }

    return (
        <>
            <div className='h-72 w-full  '>
                {!orderPath && (
                    <div className='absolute w-full '>
                        {dataClotheMap && dataClotheMap.map(item => {
                                return (
                                    <div className=' w-full flex items-center px-1'>
                                        <div className='w-full border-t   flex items-center justify-between'>
                                            <div className='flex '>
                                                <div className='w-16 h-16 mt-2'>
                                                    <Image src={item.clothe.image[0].formats.thumbnail.url} height={50} width={50}/>
                                                </div>
                                                <div className='flex flex-col'>
                                                    <div className='pt-1 ml-1'>
                                                        <p className='text-xs'>{item.clothe.title}</p>
                                                    </div>
                                                    <div className='pt-1 ml-1'>
                                                        <p className='text-xs'>{item.clothe.brand} </p>
                                                    </div>
                                                    <div className='pt-1 ml-1'>
                                                        <p className='text-xs'>{item.clothe.price} <span>{t('content:price')}</span></p>
                                                    </div>
                                                </div>

                                            </div>

                                            <div className='pr-2'>
                                                <button onClick={() => deleteItem(item.id)}>x</button>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                        )}
                        {dataShoesMap && dataShoesMap.map(item => {
                                return (
                                    <div className=' w-full flex items-center px-1'>
                                        <div className='w-full border-t   flex items-center justify-between'>
                                            <div className='flex '>
                                                <div className='w-16 h-16 mt-2'>
                                                    <Image src={item.shoes.image[0].formats.thumbnail.url} height={50} width={50}/>
                                                </div>
                                                <div className='flex flex-col'>
                                                    <div className='pt-1 ml-1'>
                                                        <p className='text-xs'>{item.shoes.title}</p>
                                                    </div>
                                                    <div className='pt-1 ml-1'>
                                                        <p className='text-xs'>{item.shoes.brand} </p>
                                                    </div>
                                                    <div className='pt-1 ml-1'>
                                                        <p className='text-xs'>{item.shoes.price} <span>{t('content:price')}</span></p>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className='pr-2'>
                                                <button onClick={() => deleteItem(item.id)}>x</button>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                        )}
                    </div>
                )}
            </div>
        </>
    )
}