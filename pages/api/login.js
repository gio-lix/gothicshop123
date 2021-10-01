import axios from "axios";
import {API_URL} from "@/config/index";
import cookie from 'cookie'

export default async  (req, res) =>  {
    if (req.method === 'POST') {
        const {identifier, password} = req.body

        try {
            const {data} = await axios.post(`${API_URL}/auth/local`, {identifier, password})
            res.setHeader(
                'Set-Cookie',
                cookie.serialize('token', data.jwt, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV !== 'development',
                    maxAge: 60 * 60 * 24 * 7, // 1 week
                    sameSite: 'strict',
                    path: '/',
                })
            )
            res.status(200).json({user: data})

        } catch (err) {
            res.status(err.response.data.statusCode).json({message: err.response.data.message[0].messages[0].message})

        }

    } else {
        res.setHeader('Allow', ['POST'])
        res.status(405).json({message: `Method ${req.method} not allowed`})
    }
}
