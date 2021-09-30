import {useRouter} from "next/router";


export default function WomenItems({items, setBurgerClick}) {

    const router = useRouter()

    const handleClick = (item) => {
        router.push(`/category/clothes/clothesWomenCategory/${item.replace('/', '-').toLowerCase().toString()}`)
        setBurgerClick(false)

    }

    return (
        <>
            <div>
                {items.map((item, i) => (
                    <div key={i}>
                        <button onClick={() => handleClick(item)} className=' p-2'>{item}</button>
                    </div>
                ))}
            </div>
        </>
    )
}