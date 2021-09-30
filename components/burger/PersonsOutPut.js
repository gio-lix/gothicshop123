import MenItem from "@/components/burger/individualPersonsOutput/MenItem";
import WomenItems from "@/components/burger/individualPersonsOutput/WomenItems";
import useTranslation from "next-translate/useTranslation";


export default function PersonsOutPut({setBurgerClick}) {
    let {t} = useTranslation()

    return (
        <>
            <div className='grid grid-cols-2'>
                <div>
                    <p>women</p>
                    <WomenItems
                        setBurgerClick={setBurgerClick}
                        items={[
                            `${t('header:shirt')}`,
                            `${t('header:hoodies')}`,
                            `${t('header:trousers')}`,
                            `${t('header:coats')}`,
                            `${t('header:dresses')}`]}
                    />
                </div>
                <div>
                    <p>men</p>
                    <MenItem
                        items={[
                            `${t('header:shirt')}`,
                            `${t('header:hoodies')}`,
                            `${t('header:trousers')}`,
                            `${t('header:coats')}`]}
                        setBurgerClick={setBurgerClick}/>
                </div>
            </div>
        </>
    )
}