import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { server } from '../index'
import { Button, Container,HStack, Radio, RadioGroup } from '@chakra-ui/react'
import Loader from './Loader'
import ErrorComponent from './ErrorComponent'
import CoinsCard from './CoinsCard'

const Coins = () => {

    const [coins, setCoins] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [page, setPage] = useState(1)
    const [currency, setCurrency] = useState("inr")

    const Currencysymbol =currency ==="inr"?"₹" :currency==='eur'? "€":"$";

    const changePage =(page)=>{
        setPage(page)
        setLoading(true)
    }

    const btns=new Array(132).fill(1)
    useEffect(() => {
        try {
            const FetchCoins = async () => {
                const { data } = await axios.get(`${server}/coins/markets?vs_currency=${currency}&page=${page}`)
                setCoins(data)
                setLoading(false)
            }
            FetchCoins();
        } catch (err) {
            setError(true)
            setLoading(false)
        }

    }, [currency,page])

    if(error) return<ErrorComponent message={"Error While Fetching Coins"}/>

    return (
        <Container maxWidth={"container.xl"}>
            {loading ? (
                <Loader />
            ) : (
                <>
                <RadioGroup value={currency} onChange={setCurrency} p={"8"}>
                    <HStack spacing={"4"}>
                        <Radio value={'inr'}>INR</Radio>
                        <Radio value={'eur'}>EUR</Radio>
                        <Radio value={'usd'}>USD</Radio>
                    </HStack>
                </RadioGroup>
                <HStack wrap={"wrap"} justifyContent={"space-evenly"}>
                    {coins.map((i) => (
                        <CoinsCard key={i.id} id={i.id} name={i.name} image={i.image} symbol={i.symbol} price={i.current_price}   Currencysymbol={Currencysymbol}/>
                    ))}
                </HStack>
                <HStack w={"full"} overflowX={"auto"} p={"8"}>
                    {btns.map((item,index)=>(
                        <Button 
                        key={index}
                        backgroundColor={"blackAlpha.900"} 
                        color={"white"} 
                        onClick={()=>changePage(index+1)}
                        >{index+1}</Button>
                    ))}
                </HStack>
                </>
                )
            }
        </Container>
    )
}



export default Coins