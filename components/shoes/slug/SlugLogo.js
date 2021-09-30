import Image from "next/image";

export default function SlugLogo({img}) {
    console.log(img)
    return (
        <>
            <button >
                <Image src={`/${img}`} width={10} height={10}/>
            </button>
        </>
    )
}