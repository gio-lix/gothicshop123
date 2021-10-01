import Head from 'next/head';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SubCategory from "@/components/subcategory/SubCategory";
import {useRouter} from "next/router";

export default function Layout({children, title, keywords, description}) {
    const router = useRouter()
    const mainPath = router.pathname === '/'
    const loginPath = router.pathname === '/account/login'
    const registerPath = router.pathname === '/account/register'
    const paymentPageStyles = router.pathname === '/payment/payment'
    return (
        <>
            <Head>
                <title>{title}</title>
                <meta name='keywords' content={keywords}/>
                <meta name='description' content={description}/>
            </Head>
            <Header />
            <div className={`${(mainPath || loginPath || registerPath || paymentPageStyles) && 'hidden '  }`}>
                <SubCategory />
            </div>
            <div className='pt-20 sm:pt-0'>
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