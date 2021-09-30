import cookie from 'cookie'
import axios from "axios";
import {API_URL} from "@/config/index";

export default async (req, res) => {
    if (req.method === 'GET') {
        if (!req.headers.cookie) {
            res.status(403).json({message: 'Not Authorized'})
            return
        }
        const {token} = cookie.parse(req.headers.cookie)
        try {
            const {data} = await axios.get(`${API_URL}/orders`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            res.status(200).json({data})
        } catch (err) {
            console.log(err)
        }

    } else {
        res.setHeader('allow', ['GET'])
        res.status(405).json({message: `${req.method} not allowed`})
    }
}