import Layout from "@/components/Layout";
import {StoreContext} from "@/context/createStore";
import {useContext, useEffect} from "react";
import useTranslation from "next-translate/useTranslation";
import {currency} from "@/helper/index";

export default function PaymentPage() {
    let {t} = useTranslation()
    const {getOrders, filterOrderData, setFilterOrderData} = useContext(StoreContext)
    useEffect(() => {
        const getOrder = async () => {
            let ordersData = await getOrders()
            setFilterOrderData(ordersData)
        }
        getOrder()
    },[])


    const  totalPrice = filterOrderData.length > 0 && (
        currency(filterOrderData.map((item) => item.totalPrice)
            .reduce((acc, num) => {
                return acc + num
            }))
    )
    const lastPrice = +totalPrice + 5

    const handleRadioSubmit = e => {
        e.preventDefault()
    }

    return (
        <Layout title='payment'>
            <div className='md:px-36 bg-white'>
                <div className='h-full w-full bg-white '>
                    <h1 className='text-black py-2 pl-6 font-bold'>check out</h1>
                    <div className=' w-full grid md:grid-cols-5'>
                        <div className='border border-black  md:col-start-1 md:col-end-4 p-2 border'>
                            <div className='w-full h-full '>
                                <div className='flex justify-between'>
                                    <div className='w-full px-1.5'>
                                        <p className='text-black text-sm sm:text-xs py-2'>{t('content:nameInfo')}</p>
                                        <input type="text"  className='text-black border border-black w-full outline-none'/>
                                    </div>
                                    <div className='w-full px-1.5'>
                                        <p  className='text-black text-sm sm:text-xs py-2'>{t('content:Surname')}</p>
                                        <input type="text"  className='text-black border border-black w-full outline-none' />
                                    </div>
                                </div>
                                <div className='flex justify-between'>
                                    <div className='w-full px-1.5'>
                                        <p className='text-black text-sm sm:text-xs py-2'>{t('content:phone')}</p>
                                        <input type="text"  className='text-black border border-black w-full outline-none'/>
                                    </div>
                                    <div className='w-full px-1.5'>
                                        <p  className='text-black text-sm sm:text-xs py-2'>{t('content:email')}</p>
                                        <input type="text"  className='text-black border border-black w-full outline-none'/>
                                    </div>
                                </div>
                                <div className='flex justify-between'>
                                    <div className='w-full px-1.5'>
                                        <p className='text-black text-sm sm:text-xs py-2'>{t('content:address')}</p>
                                        <input type="text"  className='text-black border border-black w-full outline-none'/>
                                    </div>
                                    <div className='w-full px-1.5'>
                                        <p  className='text-black text-sm sm:text-xs py-2'>{t('content:city')}</p>
                                        <input type="text"  className='text-black border border-black w-full outline-none'/>
                                    </div>
                                </div>
                                <div className='flex justify-between'>
                                    <div className='w-full px-1.5'>
                                        <p className='text-black text-sm sm:text-xs py-2'>{t('content:country')}</p>
                                        <input type="text"  className='text-black border border-black w-full outline-none'/>
                                    </div>
                                    <div className='w-full px-1.5'>
                                        <p  className='text-black text-sm sm:text-xs py-2'>{t('content:zipCode')}</p>
                                        <input type="text"  className='text-black border border-black w-full outline-none'/>
                                    </div>
                                </div>
                                <div className='flex flex-col justify-between px-1.5 '>
                                    <p className='text-black text-sm sm:text-xs  py-2'>{t('content:deliveryInfo')}</p>
                                    <textarea className='w-full h-20 border border-black text-black  outline-none'> </textarea>
                                </div>
                                <div className='w-full flex items-center justify-center my-10 '>
                                    <button className='w-44 bg-black text-sm sm:text-xs p-2 font-bold'>{t('content:addAddress')}</button>
                                </div>
                            </div>
                        </div>
                        <div className='  md:col-start-4 md:col-end-6 row-start-1  row-end-3  '>
                            <div className='w-full mt-4 sm:mt-0 sm:w-4/5 ml-auto  border-t border-black sm:border sm:border-black px-3  sm:sticky sm:top-0 '>
                                <p className='text-black font-semibold pb-3'>{t('content:summery')}</p>
                                <div className='text-black flex justify-between py-2 border-b'>
                                    <p className='text-black text-sm sm:text-xs'>{t('content:priceInfo')}</p>
                                    <p>{totalPrice}</p>
                                </div>
                                <div className='text-black flex justify-between py-2 border-b'>
                                    <p className='text-black text-sm sm:text-xs'>{t('content:deliveryPrice')}</p>
                                    <div >5.00  {t('content:price')}</div>
                                </div>
                                <div className='text-black flex justify-between py-2 border-b'>
                                    <p className='text-black text-sm sm:text-xs font-bold '>{t('content:totalPrice')}</p>
                                    <p className='font-bold text-sm sm:text-xs'>{lastPrice} {t('content:price')}</p>
                                </div>
                            </div>
                        </div>
                        <div className='border border-black md:col-start-1 md:col-end-4 mt-4 p-2 mb-8'>
                            <div className='w-full h-full '>
                                <p className='text-black text-sm sm:text-xs  pl-6 font-bold'>{t('content:paymentMethod')}</p>
                                <form onSubmit={handleRadioSubmit}>
                                    <div className='flex justify-between p-2'>
                                        <div  className='flex justify-between items-center '>
                                            <input type="radio" id="cart" name="Payment" className='outline-none'/>
                                            <p className='text-black ml-4 py-2'>Credit cart</p>
                                        </div>
                                        <div  className='flex justify-between items-center  '>
                                            <input type="radio" id="Cash" name="Payment" className='outline-none' />
                                            <p className='text-black ml-4 py-2'>Cash</p>
                                        </div>
                                        <div  className='flex justify-between items-center  '>
                                            <input type="radio" id="paypal py-2" name="Payment"  className='outline-none'/>
                                            <p className='text-black ml-4'>paypal</p>
                                        </div>
                                    </div>
                                    <div className='flex '>
                                        <div className='w-full px-1.5'>
                                            <input type="text" className='border w-full border-black text-black outline-none'/>
                                        </div>
                                        <div className='w-full px-1.5'>
                                            <input type="text"  className='border w-full border-black text-black outline-none'/>
                                        </div>
                                    </div>
                                    <div className='grid grid-cols-2 px-2'>
                                        <div className='grid grid-cols-2'>
                                            <p className='text-black py-2'>Expire date</p>
                                            <p className='text-black py-2'>CVC code</p>
                                        </div>
                                        <p className='text-black px-2 py-2'>Card name</p>
                                    </div>

                                    <div className='grid grid-cols-2 mt-2 mb-2'>
                                        <div className='grid grid-cols-2'>
                                            <div className='grid grid-cols-2'>
                                                <div className='w-full px-1.5'>
                                                    <input type="text"  className='border w-full border-black text-black outline-none'/>
                                                </div>
                                                <div className='w-full px-1.5'>
                                                    <input type="text"  className='border w-full border-black text-black outline-none'/>
                                                </div>
                                            </div>
                                            <div className='w-full px-1.5'>
                                                <input type="text"  className='border w-full border-black text-black outline-none'/>
                                            </div>
                                        </div>

                                        <div className='w-full px-1.5'>
                                            <input type="text"  className='border w-full border-black text-black outline-none'/>
                                        </div>
                                    </div>
                                    <button className='p-2 w-full sm:w-72  bg-payButton my-2'>{t('content:pay')}</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}