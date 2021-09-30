import Image from "next/image";

export default function ShoesOrder({item, addShoesQuantity,deleteItem}) {

    return  (
        <>
            <div key={item.id} className=' h-44 border-b border-gray-400 '
                 style={{backgroundImage: "url('/bg.png')"}}>
                <div className='h-full flex justify-between items-center p-2'>
                    <div className='flex flex-col sm:flex-row'>
                        <div className=' w-16 h-16 sm:w-24 sm:h-24 sm:w-36 sm:h-36'>
                            <Image src={item.shoe.image[0].formats.thumbnail.url || item.clothes.image[0].formats.thumbnail.url} height={100} width={100}
                                   layout='responsive' alt='image'/>
                        </div>
                        <div className='sm:ml-10'>
                            <p className='text-xs sm:text-base'>{item.shoe.title}</p>
                            <p className='text-xs sm:text-base'>{item.shoe.brand}</p>
                            {/*<p>{item.totalPrice}</p>*/}
                            {/*    show chosen size*/}
                            <p>size: {item.size}</p>
                        </div>
                    </div>
                    <div className=' w-52 grid grid-cols-2 items-center'>
                        <div className='mr-14   ms:mr-36'>
                            <select className='h-7 w-10 text-black  outline-none scrollbar-hide'
                                    value={item.quantity}
                                    onChange={(e) => addShoesQuantity(e.target.value, item.id)}
                            >
                                {[...Array(20).keys()].map(item => (
                                    <option value={item+1}  key={item}>{item + 1}</option>
                                ))}
                            </select>
                        </div>
                        <div  className=' flex flex-col items-center'>
                            <div>
                                {item.shoe.price} GEL
                            </div>
                            <button className='w-5 h-5 relative  bg-input flex items-center justify-center' onClick={() => deleteItem(item.id)}>
                                <p className=' absolute -top-1'>x</p>
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}