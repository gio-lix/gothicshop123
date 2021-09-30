import WomenItems from "@/components/burger/individualPersonsOutput/WomenItems";
import MenShoesItems from "@/components/burger/individualPersonsShoes/MenShoesItems";
import useTranslation from "next-translate/useTranslation";

export default function ShoesItems({setBurgerClick}) {
    let {t} = useTranslation()
    return (
        <>
            <div className='grid grid-cols-2'>
                <div>
                    <p>women</p>
                    <WomenItems setBurgerClick={setBurgerClick}
                                items={[
                                    `${t('header:boots')}`,
                                    `${t('header:creepers')}`,
                                    `${t('header:sandals')}`,
                                    `${t('header:heels')}` ,
                                    `${t('header:sneakers')}`]} />
                </div>
                <div>
                    <p>men</p>
                    <MenShoesItems
                        setBurgerClick={setBurgerClick}
                        items={[
                            `${t('header:boots')}`,
                            `${t('header:creepers')}`,
                            `${t('header:sandals')}`,
                            `${t('header:sneakers')}`]}
                    />
                </div>
            </div>
        </>
    )
}