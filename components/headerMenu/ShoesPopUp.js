import {useEffect, useRef, useState} from "react";
import ShoesPopUpMen from "@/components/headerMenu/shoespopupindividual/ShoesPopUpMen";
import ShoesPopUpWomen from "@/components/headerMenu/shoespopupindividual/ShoesPopUpWomen";
import {useRouter} from "next/router";
import useTranslation from "next-translate/useTranslation";

export default function ShoesPopUp() {
    let {t} = useTranslation()
    const [shoesPopUp ,setShoesPopUp] = useState(false)
    const [popUpMenClothes , setPopUpMenClothes] = useState(false)
    const [openWomenClothes, setOpenWomenClothes] = useState(false)

    const shoesPopRef = useRef()
    const router = useRouter()

    const loginPage = router.pathname === '/account/login'
    const registerPageStyles = router.pathname === '/account/register'


    const closeShoes = () => {
        setPopUpMenClothes(!popUpMenClothes)
        setOpenWomenClothes(false)
    }
    const closeClothes = () => {
        setOpenWomenClothes(!openWomenClothes)
        setPopUpMenClothes(false)
    }


    const handleShoesPopUp = () => setShoesPopUp(!shoesPopUp)
    useEffect(() => {
        document.body.addEventListener('click', handlePopUp)
        return () => removeEventListener('click',handlePopUp)
    },[shoesPopUp])
    const handlePopUp = (e) => {
        if (!e.path.includes(shoesPopRef.current)) {
            setShoesPopUp(false)
            setOpenWomenClothes(false)
            setPopUpMenClothes(false)
        }
    }



    return (
        <div>
            <li className=' flex flex-col' ref={shoesPopRef}>
                <div onClick={handleShoesPopUp} >
                    <div>
                        <p className='mr-20 cursor-pointer'>{t('header:shoes')}</p>
                    </div>
                </div>

                {shoesPopUp && (
                    <div
                        className={`absolute z-50 w-40 h-20 top-44 mr-52  grid ${(loginPage || registerPageStyles) ? 'bg-black' : 'bg-gradient-to-b from-header to-buttonHover'}`}>
                        <ShoesPopUpMen
                            items={[
                                `${t('header:boots')}`,
                                `${t('header:creepers')}`,
                                `${t('header:sandals')}`,
                                `${t('header:sneakers')}`]}
                            setShoesPopUp={setShoesPopUp}
                            closeMenClothes={closeShoes}
                            popUpMenClothes={popUpMenClothes}/>

                        <ShoesPopUpWomen
                            items={[
                                `${t('header:boots')}`,
                                `${t('header:creepers')}`,
                                `${t('header:sandals')}`,
                                `${t('header:heels')}` ,
                                `${t('header:sneakers')}`]}
                            clotheWomenCl={closeClothes}
                            setShoesPopUp={setShoesPopUp}
                            openWomenClothes={openWomenClothes}
                        />
                    </div>
                )}
            </li>
        </div>
    )
}