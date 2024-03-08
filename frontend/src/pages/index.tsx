import {CandlestickChart} from '@/components/CandlestickChart'
import {getData} from '@/requests'
import {useEffect, useState} from 'react'

export default function Home() {
    const [data, setData] = useState<any>(null)

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        console.log(' ')
        console.log('index fetchData()')
        let result = await getData()
        console.log('result: ', result)
        setData(result)
    }

    return (<>
        <CandlestickChart data={data}/>
    </>);
}

