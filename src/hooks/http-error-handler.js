import { useState, useEffect } from 'react'

export default httpClient => {
    const [error, setError] = useState(null)
    const [interceptors] = useState({
        req: httpClient.interceptors.request.use(req => {
            setError(null)
            return req
        }, err => {
            setError(err)
        }),
        res: httpClient.interceptors.response.use(res => res, err => {
            setError(err)
        })
    })

    useEffect(() => {
        return () => {
            httpClient.interceptors.request.eject(interceptors.req)
            httpClient.interceptors.response.eject(interceptors.res)
        }
    }, [])

    const modalCloseHandler = () => {
        setError(null)
    }

    return [error, modalCloseHandler]
}