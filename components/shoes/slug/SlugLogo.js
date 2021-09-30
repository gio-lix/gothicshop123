export default function SlugLogo({img}) {
    console.log(img)
    return (
        <>
            <button >
                <img src={`/${img}`} alt="img"/>
            </button>
        </>
    )
}