import cookie from 'cookie'

export default async (req, res) => {
    if (req.method === 'GET') {
        if (!req.headers.cookie) {
            res.status(403).json({message: 'Not Authorized'})
            return
        }
        const {token} = cookie.parse(req.headers.cookie)

        res.status(200).json({token})

    } else {
        res.setHeader('allow', ['GET'])
        res.status(405).json({message: `${req.method} not allowed`})
    }
}