import {useEffect, useRef, useState} from "react";
import {useRouter} from "next/router";
import WomenPopUpClothes from "@/components/headerMenu/clothesPopUpIndividual/WomenPopUpClothes";
import MenPopUpClothes from "@/components/headerMenu/clothesPopUpIndividual/MenPopUpClothes";
import useTranslation from "next-translate/useTranslation";

export default function ClothesPopUp() {
    let {t} = useTranslation()
    const [showClothes, setShowClothes] = useState(false)
    const [showMenClothes, setShowMenClothes] = useState(false)
    const [showWomenClothes, setShowWomenClothes] = useState(false)

    const clothesPopRef = useRef()
    const router = useRouter()
    const loginPage = router.pathname === '/account/login'
    const registerPageStyles = router.pathname === '/account/register'


    const clothesUnShow = () => {
        setShowMenClothes(!showMenClothes)
        setShowWomenClothes(false)
    }
    const clothesWomUnShow = () => {
        setShowWomenClothes(!showWomenClothes)
        setShowMenClothes(false)
    }


    const handleShoesPopUp = () => setShowClothes(!showClothes)

    //clean and close pop up
    useEffect(() => {
        document.body.addEventListener('click', handlePopUp)
        return () => removeEventListener('click',handlePopUp)
    },[showClothes])
    const handlePopUp = (e) => {
        if (!e.path.includes(clothesPopRef.current)) {
            setShowClothes(false)
            setShowMenClothes(false)
            setShowWomenClothes(false)
        }
    }


    return (
        <>
            <li className=' flex flex-col' ref={clothesPopRef} >
                <div onClick={handleShoesPopUp}>
                    <div>
                        <p className='mr-20 cursor-pointer'> {t('header:clothes')}</p>
                    </div>
                </div>
                {showClothes && (
                    <div  className={`absolute z-50 w-40 h-20 top-44 mr-52  grid ${(loginPage || registerPageStyles) ? 'bg-black' : 'bg-gradient-to-b from-header to-buttonHover'}`}>
                        <MenPopUpClothes
                            clothesUnShow={clothesUnShow}
                            setShowClothes={setShowClothes}
                            showMenClothes={showMenClothes}
                            setShowMenClothes={setShowMenClothes}
                            items={[
                                `${t('header:shirt')}`,
                                `${t('header:hoodies')}`,
                                `${t('header:trousers')}`,
                                `${t('header:coats')}`]}
                        />
                        <WomenPopUpClothes
                            setShowClothes={setShowClothes}
                            showWomenClothes={showWomenClothes}
                            clothesWomUnShow={clothesWomUnShow}
                            items={[
                                `${t('header:shirt')}`,
                                `${t('header:hoodies')}`,
                                `${t('header:trousers')}`,
                                `${t('header:coats')}`,
                                `${t('header:dresses')}`]}
                        />
                    </div>
                )}
            </li>
        </>
    )
}