import Link from "next/link";
import {PER_PAGE} from "@/config/index";

export default function PageCount({total, text}) {
    const totalPage = Math.ceil(total / PER_PAGE)

    return (
        <>
            <div>
                <div className='flex'>
                    <p>Pages: </p>
                    {Array.from({length: totalPage}, (_, i) => {
                        console.log(i)
                        return (
                            <Link href={`/${text}?page=${i + 1}`} key={i}>
                                <a className='ml-4'>{i + 1}</a>
                            </Link>
                        )
                    })}
                </div>
            </div>
            {/*{page > 1 && (*/}
            {/*    <Link href={`/clothes?page=${page - 1}`}>*/}
            {/*        <a>Previous</a>*/}
            {/*    </Link>*/}
            {/*)}*/}

            {/*{page < totalPage && (*/}
            {/*    <Link href={`/clothes?page=${page + 1}`}>*/}
            {/*        <a>next</a>*/}
            {/*    </Link>*/}
            {/*)}*/}
        </>
    )
}