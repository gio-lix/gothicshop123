import useTranslation from "next-translate/useTranslation";

export default function OrdersInfo() {
    let {t} = useTranslation()
    return (
        <>
            <div className='hidden sm:inline-block   sm:col-start-6 sm:col-end-8 sm:h-44 sm:sticky sm:top-24 '>
                <div>
                    <p className='text-sm  font-semibold text-gray-300 '>{t('content:help')}</p>
                </div>
                <div>
                    <button className='text-sm text-left pt-1.5 font-semibold text-gray-400 '>{t('content:deliverInfo')}</button>
                </div>
                <div>
                    <button className='text-sm text-left pt-1.5 font-semibold text-gray-400 '>{t('content:refund')}</button>
                </div>
                <div>
                    <button className='text-sm text-left pt-1.5 font-semibold text-gray-400 '>{t('content:ordering')}</button>
                </div>
                <div>
                    <button className='text-sm text-left pt-1.5 font-semibold text-gray-400 '>{t('content:promotion')}</button>
                </div>
                <div>
                    <p className='text-sm text-left pt-1.5 font-semibold text-gray-400 '>{t('content:available')}</p>
                </div>
                <div>
                    <button className='text-sm text-left pt-1.5 font-semibold text-gray-400 '>customersupport@gloomy-store.ge</button>
                </div>
            </div>
        </>
    )
}