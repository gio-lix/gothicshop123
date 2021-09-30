import {useRouter} from "next/router";
import useTranslation from "next-translate/useTranslation";

export default function SubCategoryItems({direction, path, text}) {
    let {t} = useTranslation()
    const router = useRouter()

    const handleSubmit = (item) => {
        if (item === t('header:clothes')) {
            router.push('/clothes')
        } else if (item === t('header:shoes'))  {
            router.push('/shoes')
        }
    }
    return (
        <div  className={` absolute w-28 lg:w-52  top-11  ${direction}-${path} bg-childrenColor z-50`}>
            {text.map(item => (
                <div key={item}>
                    <p onClick={() => handleSubmit(item)} className='p-1 border  border-gray-500 bg-childrenColor hover:bg-gray-700 text-gray-400 cursor-pointer'>{item}</p>
                </div>
            ))}
        </div>
    )
}
