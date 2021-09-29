import Link from 'next/link'

export default function Item({title, slug, slugInfo}) {
    return (
        <>
            <div>
                <Link href={`/${slugInfo}/${slug}`}>
                    <a>{title}</a>
                </Link>
            </div>
        </>
    )
}