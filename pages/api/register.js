import cookie from 'cookie'

import axios from "axios";
import {API_URL} from "@/config/index";

export default async (req, res) => {
    if (req.method === 'POST') {
        const {username, email, password} = req.body
        console.log({username, email, password})

        try {
            const {data} = await axios.post(`${API_URL}/auth/local/register`, {username, email, password})
            res.setHeader('Set-Cookie', cookie.serialize('token', data.jwt, {
                httpOnly: true,
                secure: process.env.NODE_ENV !== 'development',
                maxAge: 60 * 60 * 24 * 7, // 1 week
                sameSite: 'strict',
                path: '/',
            }))
            res.status(200).json({user: data})
        } catch (err) {
            res.status(err.response.data.statusCode).json({message: err.response.data.message[0].messages[0].message})
        }


    } else {
        res.setHeader('Allow', ['POST'])
        res.status(405).json({message: `${req.method} not allowed`})
    }
}