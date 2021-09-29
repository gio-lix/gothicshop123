import Head from 'next/head';
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Layout({children, title, keywords, description}) {
    return (
        <>
            <Head>
                <title>{title}</title>
                <meta name='keywords' content={keywords}/>
                <meta name='description' content={description}/>
            </Head>
            <Header />
            <div>
                {children}
            </div>
            <Footer />
        </>
    )
}
Layout.defaultProps = {
    title: 'gothic shop',
    keywords: 'gothic',
    description: 'gothic shop'
}