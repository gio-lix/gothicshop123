import Layout from "@/components/Layout";
import {useContext, useState} from "react";
import {StoreContext} from "@/context/createStore";

export default function LoginPage() {
    const {login} = useContext(StoreContext)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        login({email, password})
    }

    return (
        <Layout title='login'>
            <div className='min-h-screen'>
                <div className='w-full h-full flex items-center justify-center'>
                    <form onSubmit={handleSubmit}>
                        <div className='border border-black w-72 h-52 flex flex-col justify-center items-center'>
                            <div>
                                <p>email</p>
                                <input type="email"
                                       onChange={(e) => setEmail(e.target.value)}
                                       className='border border-black text-black'
                                />
                            </div>
                            <div>
                                <p>password</p>
                                <input type="password "
                                       onChange={(e) =>
                                           setPassword(e.target.value)}
                                       className='border border-black text-black'
                                />
                            </div>



                            <input type="submit" value='submit' className='p-2 text-white bg-indigo-700 mt-2'/>
                        </div>
                    </form>
                </div>
            </div>
        </Layout>
    )
}