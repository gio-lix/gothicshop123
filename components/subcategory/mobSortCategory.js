import {useContext, useState} from "react";
import {brands, colorData, sizes} from "@/config/index";

import {StoreContext} from "@/context/createStore";
import {useRouter} from "next/router";
import useTranslation from "next-translate/useTranslation";
import {checkItemLang} from "@/helper/index";

export default function MobSortCategory({setBurgerClick, setSort}) {
    let {t} = useTranslation()
    const router = useRouter()


    const colorData = [
        t('header:red'),
        t('header:pink'),
        t('header:mix'),
        t('header:black'),
        t('header:yellow')
    ]

    const [mobOpenPrice, setMobOpenPrice] = useState(false)
    const [mobOpenColor, setMobOpenColor] = useState(false)
    const [mobOpenSize, setMobOpenSize] = useState(false)
    const [mobOpenCategory, setMobOpenCategory] = useState(false)

    const [colorInfo , setColorInfo] = useState('')


    const [minRange ,setMinRange] = useState(0)
    const [maxRange ,setMaxRange] = useState(50)


    const [checkBrand, setCheckBrand] = useState('')

    const {state: {allCart}, dispatch} = useContext(StoreContext)

    const handleOpenMobPrice = () => {
        setMobOpenPrice(!mobOpenPrice)
        setMobOpenColor(false)
        setMobOpenSize(false)
        setMobOpenCategory(false)
    }
    const handleMobColor = () => {
        setMobOpenColor(!mobOpenColor)
        setMobOpenPrice(false)
        setMobOpenSize(false)
        setMobOpenCategory(false)
    }
    const handleMobSize = () => {
        setMobOpenSize(!mobOpenSize)
        setMobOpenPrice(false)
        setMobOpenColor(false)
        setMobOpenCategory(false)
    }
    const handleCategory = () => {
        setMobOpenCategory(!mobOpenCategory)
        setMobOpenPrice(false)
        setMobOpenColor(false)
        setMobOpenSize(false)
    }


    const handlePrice = (e) => {
        e.preventDefault()
        dispatch({type: 'ADD_MIN_RANGE', payload: minRange})
        dispatch({type: 'ADD_MAX_RANGE', payload: maxRange})
        setMobOpenPrice(false)
    }

    const handleColor = (color) => {
        let newColor = checkItemLang(color)
        dispatch({type: 'ADD_COLOR', payload: newColor})
        setColorInfo(color)
        setMobOpenColor(false)
    }
    const handleSize = (size) => {
        dispatch({type: 'ADD_SIZE', payload: size})
        setMobOpenSize(false)
    }
    const handleBrand = (brand) => {
        setCheckBrand(brand)
        dispatch({type: 'ADD_BRAND', payload: brand})
        setMobOpenCategory(false)
    }


    const handleFilterSend = () => {
        router.push({
            pathname:'/category/filterCategory/filterData',
            query: allCart
        })
        setSort(false)
        setBurgerClick(false)
    }
    const handleSubmitCancel = () => {
        dispatch({type: 'CANCEL_AL'})
        setSort(false)
        // setBurgerClick(false)
    }
    return (
        <>
            <div>
                <div>
                    <div>{Object.values(allCart.minPrice).length > 0 && (
                        <div className='flex justify-between px-6'>
                            <p className='flex'>
                                <span className='text-gray-300'>{t('header:from')}:</span>
                                <p className='ml-2'>{allCart.minPrice}</p>
                            </p>
                            <p className='flex '>
                                <span className='text-gray-300'>{t('header:to')}:</span>
                                <p className='ml-2'>{allCart.maxPrice}</p>
                            </p>
                        </div>
                    )}
                    </div>
                </div>
                {Object.values(allCart.size).length > 0  && (
                    <div className='px-6'> <span className='text-gray-300'>{t('header:bySize')}</span> {allCart.size}</div>
                )}

                {Object.values(allCart.color).length > 0  && (
                    <div className='px-6'> <span className='text-gray-300'>{t('header:byColor')}</span> {colorInfo}</div>
                )}

                {checkBrand  && (
                    <div className='px-6'> <span className='text-gray-300'>{t('header:byBrand')}</span> {checkBrand}</div>
                )}

            </div>
            <div className='w-full  '>
                <div onClick={handleOpenMobPrice} className='cursor-pointer w-full p-2 border-b'>
                    <p className='font-semibold'>{t('header:price')}</p>
                </div>
                {mobOpenPrice && (
                    <div className='mt-3'>
                        <div className='flex justify-between px-2 '>
                            <div className='h-8 w-36 border flex justify-center items-center'>
                                <p>{minRange}</p>
                            </div>
                            <div className='h-8 w-36 border flex justify-center items-center'>
                                <p>{maxRange}</p>
                            </div>
                        </div>

                        <form>
                            <div className='w-full'>
                                <div className='w-full p-2'>
                                    <input type="range"
                                           id="volume" name="volume"
                                           min="0" max="50"
                                           className='h-0.5  opacity-50 w-full '
                                           onChange={(e) => setMinRange(e.target.value)}
                                    />
                                </div>
                                <div className='w-full p-2'>
                                    <input type="range"
                                           id="volume" name="volume"
                                           min="50" max="500"
                                           className='h-0.5  opacity-50 w-full'
                                           onChange={(e) => setMaxRange(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className='px-2  mt-2 '>
                                <button onClick={handlePrice} className='w-full bg-buttonColor p-1 '>
                                    {t('header:addPrice')}
                                </button>
                            </div>
                        </form>
                    </div>
                )}
                <div onClick={handleMobColor} className='cursor-pointer w-full p-2 border-b'>
                    <p className='font-semibold'>{t('header:color')}</p>
                </div>
                {mobOpenColor && (
                    <div className='w-full'>
                        {colorData.map(item => (
                            <div key={item} >
                                <p onClick={() => handleColor(item)} className='w-full p-2 border-b text-gray-400'>{item}</p>
                            </div>
                        ))}
                    </div>
                )}
                <div onClick={handleMobSize} className='cursor-pointer w-full p-2 border-b'>
                    <p className='font-semibold'>{t('header:size')}</p>
                </div>
                {mobOpenSize && (
                    <div>
                        {sizes.map(item => (
                            <div key={item}>
                                <p onClick={() => handleSize(item)} className='w-full p-2 border-b text-gray-400'>{item}</p>
                            </div>
                        ))}
                    </div>
                )}
                <div onClick={handleCategory} className='cursor-pointer w-full p-2 border-b'>
                    <p>{t('header:byBrand')}</p>
                </div>
                {mobOpenCategory && (
                    <div>
                        {brands.map(item => (
                            <div key={item}>
                                <p onClick={() => handleBrand(item)} className='w-full p-2 border-b text-gray-400 cursor-pointer '>{item}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <div className='flex justify-between mt-4 px-2'>
                <div onClick={handleFilterSend} className=' border border-gray-100  w-36 cursor-pointer'>
                    <p className=' p-2 text-center' >filter</p>
                </div>
                <div onClick={handleSubmitCancel} className='border border-gray-100 w-36 cursor-pointer'>
                    <p className='text-center p-2'>cancel</p>
                </div>
            </div>
        </>
    )
}