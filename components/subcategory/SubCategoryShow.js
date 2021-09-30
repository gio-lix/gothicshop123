import {useRouter} from "next/router";
import {useContext, useState} from "react";
import {StoreContext} from "@/context/createStore";
import {brands, sizes} from "@/config/index";
import useTranslation from "next-translate/useTranslation";
import {checkItemLang} from "@/helper/index";


export default function SubCategoryShow({direction, path, text}) {
    let {t} = useTranslation()
    const router = useRouter()


    const colorData = [
        t('header:red'),
        t('header:pink'),
        t('header:mix'),
        t('header:black'),
        t('header:yellow'),
        t('header:white')
    ]

    const [priceFilter, setPriceFilter] = useState(false)
    const [colorFilter, setColorFilter] = useState(false)
    const [sizeFilter, setSizeFilter] = useState(false)
    const [categoryFilter, setCategoryFilter] = useState(false)

    const [minRange, setMinRange] = useState(0)
    const [maxRange, setMaxRange] = useState(50)

    const [brandInfo , setBrandInfo] = useState('')
    const [colorInfo , setColorInfo] = useState('')


    const handleClockSort = (item) => {
        // const sliceItem = item.slice(3)


        switch (item) {
            case t('header:byPrice'):
                return [
                    setPriceFilter(true),
                    setColorFilter(false),
                    setSizeFilter(false),
                    setCategoryFilter(false)
                ]
            case t('header:byColor'):
                return [
                    setColorFilter(true),
                    setPriceFilter(false),
                    setSizeFilter(false),
                    setCategoryFilter(false),

                ]

            case  t('header:bySize'):
                return [
                    setSizeFilter(true),
                    setColorFilter(false),
                    setPriceFilter(false),
                    setCategoryFilter(false)
                ]
            case  t('header:byBrand'):
                return [
                    setSizeFilter(false),
                    setColorFilter(false),
                    setPriceFilter(false),
                    setCategoryFilter(true)
                ]
        }
    }




    const {state: {allCart}, dispatch} = useContext(StoreContext)

    const handleColor = (color) => {
        let newColor = checkItemLang(color)
        dispatch({type: 'ADD_COLOR', payload: newColor})
        setColorInfo(color)
        setColorFilter(false)
    }
    const handleSize = (size) => {
        dispatch({type: 'ADD_SIZE', payload: size})
        setSizeFilter(false)
    }
    const handleBrand = (brand) => {
        setBrandInfo(brand)
        dispatch({type: 'ADD_BRAND', payload: brand})
        setCategoryFilter(false)
    }
    const handlePrice = (e) => {
        e.preventDefault()
        dispatch({type: 'ADD_MIN_RANGE', payload: minRange})
        dispatch({type: 'ADD_MAX_RANGE', payload: maxRange})
        setPriceFilter(false)
    }

    const handleSubmitRange = async (e) => {
        e.preventDefault()
        router.push({
            pathname:'/category/filterCategory/filterData',
            query: allCart
        })
        setPriceFilter(false)
    }
    const handleSubmitCancel = () => {
        dispatch({type: 'CANCEL_AL'})
    }


    return (
        <>

            <div
                className={` absolute w-28 lg:w-52  top-11  ${direction}-${path} bg-childrenColor z-50`}
            >
                {text.map((item, i) => (
                    <div onClick={() => handleClockSort(item)} key={i}
                         className='h-10 w-full  px-2 text-gray-400 hover:bg-gray-700 cursor-pointer flex items-center'
                         style={{border: 'gray 1px solid'}}>
                        {item}
                    </div>
                ))}
                <div className='absolute '>
                    <div>
                        {priceFilter &&  (
                            <div className=' absolute bg-childrenColor w-28  h-24 lg:w-52 -ml-28 lg:-ml-52 bottom-16 border border-gray-600 h-20 flex flex-col  justify-between '>
                                <form  onSubmit={handlePrice} className='flex flex-col  justify-between h-full group '>
                                    <div className='flex flex-col px-1'>
                                        <div className='flex justify-between '>
                                            <label htmlFor="volume" className='text-sm text-gray-400'> {t('header:MinPrice')}</label>
                                            <p>
                                                {minRange && minRange}
                                            </p>

                                        </div>
                                        <input type="range"
                                               id="volume" name="volume"
                                               min="0" max="50"
                                               className='h-0.5  opacity-50 '
                                               onChange={(e) => setMinRange(e.target.value)}
                                        />
                                    </div>
                                    <div className='flex flex-col px-1'>
                                        <div className='flex justify-between '>
                                            <label htmlFor="volume" className='text-sm text-gray-400'> {t('header:MaxPrice')}</label>
                                            <p>
                                                {maxRange && maxRange}
                                            </p>

                                        </div>
                                        <input type="range"
                                               id="volume" name="volume"
                                               min="50" max="500"
                                               className='h-0.5  opacity-50 '
                                               onChange={(e) => setMaxRange(e.target.value)}
                                        />
                                    </div>
                                    <div className='w-full  group-hover:text-white text-gray-500 flex justify-center items-center mb-1 '>
                                        <button  type='submit'>{t('header:submit')}</button>
                                    </div>
                                </form>
                            </div>
                        )}
                    </div>

                    <div>
                        {colorFilter &&  (
                            <div className='absolute w-28 lg:w-52 -ml-28 lg:-ml-52 ' style={{marginTop:"-120px"}}>
                                {colorData.map(color => (
                                    <p
                                        onClick={() => handleColor(color)}
                                        className='p-1 border  border-gray-500 bg-childrenColor hover:bg-gray-700   text-gray-400 cursor-pointer'
                                        key={color}
                                    >
                                        {color}
                                    </p>
                                ))}
                            </div>
                        )}
                    </div>

                    <div>
                        {sizeFilter &&  (
                            <div className=' absolute w-28 lg:w-52 -ml-28 lg:-ml-52 -bottom-0 h-20 bg-input'>
                                {sizes.map(size => (
                                    <p
                                        onClick={() => handleSize(size)}
                                        className='p-1 border  border-gray-500 bg-childrenColor hover:bg-gray-700 text-gray-400 cursor-pointer'
                                        key={size}
                                    >
                                        {size}
                                    </p>
                                ))}
                            </div>
                        )}
                    </div>

                    <div>
                        {categoryFilter &&  (
                            <div className=' absolute w-28 lg:w-52  -ml-28 lg:-ml-52 -bottom-10 h-20 bg-input'>
                                {brands.map(brand => (
                                    <p
                                        onClick={() => handleBrand(brand)}
                                        className='p-1 border  border-gray-500 bg-childrenColor hover:bg-gray-700 text-gray-400 cursor-pointer'
                                        key={brand}
                                    >
                                        {brand}
                                    </p>
                                ))}
                            </div>
                        )}
                    </div>
                    {/*{allCart.color &&  <p>color: {allCart.color}</p>}*/}
                </div>
                <div className='w-full bg-childrenColor w-28 lg:w-52 '>
                    {Object.values(allCart.color).length > 0 &&
                    ( <div className='flex justify-between border-b border-gray-500 py-2 px-1'>
                        <p className='text-sm text-xs md:text-sm  '>{t('header:byColor')}: </p>
                        <p className='text-xs md:text-sm '>{colorInfo}</p>
                    </div>)}
                    {Object.values(allCart.size).length > 0 &&  (
                        <div className='flex justify-between border-b border-gray-500  py-2 px-1'>
                            <p className='text-sm text-xs md:text-sm  '>{t('header:bySize')}: </p>
                            <p className='text-xs md:text-sm '>{allCart.size}</p>
                        </div>
                    )}
                    {Object.values(allCart.brand).length > 0 &&   (
                        <div className='flex justify-between border-b border-gray-500 py-2 px-1'>
                            <p className='text-xs md:text-sm '>{t('header:byBrand')}: </p>
                            <p className='text-xs md:text-sm '>{brandInfo}</p>
                        </div>
                    )}
                    {Object.values(allCart.minPrice).length > 0 &&   (
                        <div className='grid grid-cols-2 py-1 px-1'>
                            <p  className='text-sm text-xs md:text-sm '>{t('header:priceRange')}</p>
                            <div>
                                <p className='text-right text-xs md:text-sm '>{allCart.minPrice}</p>
                                <p className='text-right text-xs md:text-sm '>{allCart.maxPrice}</p>
                            </div>
                        </div>
                    )}
                    {Object.values(allCart).some(item => item.length > 0) && (
                        <button onClick={handleSubmitRange} className='w-full bg-buttonColor hover:bg-buttonHover mt-2'>{t('header:filter')}</button>
                    )}
                    {Object.values(allCart).some(item => item.length > 0) && (
                        <button onClick={handleSubmitCancel} className='w-full bg-buttonColor hover:bg-buttonHover mt-2'>{t('header:cancel')}</button>
                    )}
                </div>
            </div>
        </>
    )
}