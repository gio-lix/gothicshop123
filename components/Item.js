import Image from "next/image";
import Link from "next/link";

export default function Item({title, slug, image, brand, price, slugInfo}) {

    return (
        <>
            <div className='  p-2 flex flex-col items-center '>
                <div className='w-full flex-col items-center group '>
                    <div>
                        <Image
                            src={image[0].formats.small.url}
                            width={400}
                            height={400}
                        />
                    </div>
                    <div className='flex justify-between items-start pt-2 px-4'>
                        <div>
                            <Link href={`/${slugInfo}/${slug}`}>
                                <a className='group-hover:underline text-ss'>{title}</a>
                            </Link>
                            <p className='text-sm font-semibold'>{brand}</p>
                            <p className='text-ss'>{price} GEL</p>
                        </div>
                        <div>
                            <button className='bg-indigo-700 w-8 h-8 '>
                                <p  className=' flex justify-center'>
                                    <img src="/Path.svg" alt="path" />
                                </p>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}