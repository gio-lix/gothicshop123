import Layout from "@/components/Layout";
import LoginPopUp from "@/components/loginPopUp/LoginPopUp";

export default function Login() {

    return (
        <Layout title='login'>
            <div className='w-full h-screen bg-white flex justify-center'>
                <LoginPopUp />
            </div>
        </Layout>
    )
}

