import {useEffect, useState} from "react";

export const useErrorHook  = (y) => {
    const [error, setError] = useState(y)

    useEffect(() => {
        const time = setTimeout(() => {
            setError('')
        },1500)
        return () => clearTimeout(time)
    },[error])
    return [error, setError]
}