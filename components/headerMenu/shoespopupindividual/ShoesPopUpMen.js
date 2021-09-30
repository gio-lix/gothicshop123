
import {useRouter} from "next/router";
import useTranslation from "next-translate/useTranslation";

export default function ShoesPopUpMen({closeMenClothes, popUpMenClothes, items,setShoesPopUp}) {
    let {t} = useTranslation()
    const router = useRouter()
    const loginPage = router.pathname === '/account/login'
    const registerPageStyles = router.pathname === '/account/register'


    const handleClick = (item) => {
        router.push(`/category/shoes/shoesMenCategory/${item.replace('/', '-').toLowerCase().toString()}`)
        setShoesPopUp(false)
    }

    return (
        <>
            <div onClick={closeMenClothes}
                 className='relative  flex justify-between items-center px-2  cursor-pointer '
                 style={{border: 'gray 1px solid'}}

            >
                <div>{t('header:men')}</div>
                <p  className={`transition duration-200 ease-in-out  ${popUpMenClothes && 'transform rotate-90 ' }`}>
                    <img src="/Polygon3.svg" alt="pol"/>
                </p>
                {popUpMenClothes && (
                    <div
                        className={`absolute z-50 w-52  top-0 left-40 
                        ${(loginPage || registerPageStyles) ? 'bg-black' : ' bg-gradient-to-b from-header to-buttonHover'} grid`}>
                        {items.map((item, i) => (
                            <button
                                key={i}
                                onClick={() => handleClick(item)}
                                style={{border: 'gray 1px solid'}}
                                className={` p-2 mr-auto w-full h-full flex items-end hover:bg-buttonHover ${(loginPage || registerPageStyles)  ? 'hover:bg-gray-700' : 'hover:bg-buttonHover'}`}>{item}</button>
                        ))}
                    </div>
                )}
            </div>
        </>
    )
}












// const router = useRouter()
// const closeShoesRef = useRef()
// useEffect(() => {
//     document.body.addEventListener('click', handleClick)
//     return () => removeEventListener('click', handleClick)
// },[popUpMenClothes])
// const handleClick = (e) => {
//     if (e.path.includes(closeShoesRef.current)) {
//         setPopUpMenClothes(false)
//     }
// }

// const handlePopUpMenClothes = () => setPopUpMenClothes(!popUpMenClothes)