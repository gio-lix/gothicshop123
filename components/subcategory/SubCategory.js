import {useRouter} from "next/router";
import {useEffect, useRef, useState} from "react";
import SubCategoryShow from "@/components/subcategory/SubCategoryShow";
import SubCategoryItems from "@/components/subcategory/SubCategoryItems";
import useTranslation from "next-translate/useTranslation";
import Image from "next/image";

export default function SubCategory() {
    let {t} = useTranslation()

    const [showItems, setShowItems] = useState(false)
    const [showSort, setShowSort] = useState(false)
    const router = useRouter()
    const clickRef = useRef()
    const sortRef = useRef()


    useEffect(() => {
        document.body.addEventListener('click', handleOutSideClick)
        return () => removeEventListener('click', handleOutSideClick)
    }, [showItems])
    const handleOutSideClick = (e) => {
        if (!e.path.includes(clickRef.current)) setShowItems(false)
    }

    useEffect(() => {
        document.body.addEventListener('click', handleOutSort)
        return () => removeEventListener('click', handleOutSort)
    }, [showSort])
    const handleOutSort = (e) => {
        if (!e.path.includes(sortRef.current)) setShowSort(false)
    }

    const handleClick = () => setShowItems(!showItems)
    const handleSort = () => setShowSort(!showSort)

    return (
        <div className='hidden sm:block px-36 '>
            {/*{(router.pathname === '/shoes' || router.pathname === '/clothes' ) && (*/}
            <div className=' relative  w-full h-10  flex  justify-between ' ref={sortRef}>
                <div onClick={handleClick} ref={clickRef} style={{border: 'gray 1px solid'}}
                     className='bg-childrenColor w-36 lg:w-60 h-10  flex justify-between items-center px-2  cursor-pointer'>
                    <p className=' text-gray-400'>{t('header:subCategory')}</p>
                    {showItems ? (<p><img src="/pol.svg" alt="pol"/></p>) : (
                        <p className='-rotate-90'>  <Image src="/Polygon3.svg" width={12} height={12} alt='some value'/></p>)}
                </div>
                <div className='flex '>
                    <div
                        onClick={handleSort}
                        className='bg-childrenColor w-36 lg:w-60 h-10 border border-gray-500 text-gray-400 px-2 flex justify-between items-center  cursor-pointer'>
                        <p>{t('header:sort')}</p>
                        {showSort ? (<p> <Image src="/Polygon3.svg" width={12} height={12} alt='some value'/></p>) : (
                            <p className='-rotate-90'> <Image src="/Polygon3.svg" width={12} height={12} alt='some value'/></p>)}
                    </div>
                    {/*show items to subcategory*/}
                    {showSort && <SubCategoryShow setShowSort={setShowSort} direction='right' path={+0}
                                                  text={[
                                                      t('header:byPrice'),
                                                      t('header:byColor'),
                                                      t('header:bySize'),
                                                      t('header:byBrand')
                                                  ]}/>}
                </div>
                {/*show items to subcategory*/}
                {showItems &&
                <SubCategoryItems direction='left' path={+11} text={[t('header:clothes'), t('header:shoes')]}/>}

            </div>
            {/*// )}*/}
        </div>
    )
}