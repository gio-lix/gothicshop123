import {useRouter} from "next/router";
import useTranslation from "next-translate/useTranslation";

export default function WomenPopUpClothes({items,showWomenClothes, setShowClothes ,clothesWomUnShow,setShowMenClothes}) {
    let {t} = useTranslation()
    const router = useRouter()
    const loginPage = router.pathname === '/account/login'
    const registerPageStyles = router.pathname === '/account/register'



    const handleClick = (item) => {
        // router.push(`/category/clothes/clothesWomenCategory/${item.replace('/', '-').toLowerCase().toString()}`)
        setShowClothes(false)
    }

    return (
        <>
            <div onClick={clothesWomUnShow}
                 style={{border: 'gray 1px solid'}}
                 className='relative flex justify-between items-center px-2  cursor-pointer '>
                <div>{t('header:women')}</div>
                <p className={`transition duration-200 ease-in-out ${showWomenClothes && 'transform rotate-90' }`}>
                    <img src="/Polygon3.svg" alt="pol"/>
                </p>
                {showWomenClothes && (
                    <div
                        className={`absolute z-50 w-52  top-0 left-40 
                        ${(loginPage || registerPageStyles) ? 'bg-black' : ' bg-gradient-to-b from-header to-buttonHover'} grid`}>
                        {items.map((item, i) => (
                            <button onClick={() => handleClick(item)} key={i}
                                    style={{border: 'gray 1px solid'}}
                                    className={`p-2 mr-auto w-full h-full flex items-end hover:bg-buttonHover ${(loginPage || registerPageStyles)  ? 'hover:bg-gray-700' : 'hover:bg-buttonHover'}`}
                            >
                                {item}
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </>
    )
}