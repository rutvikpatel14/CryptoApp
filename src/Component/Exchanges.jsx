import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { server } from '../index'
import { Container, Heading, HStack, Image, Text, VStack } from '@chakra-ui/react'
import Loader from './Loader'
import ErrorComponent from './ErrorComponent'

const Exchanges = () => {

    const [exchanges, setExchanges] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    useEffect(() => {
        try {
            const FetchExchanges = async () => {
                const { data } = await axios.get(`${server}/exchanges`)
                setExchanges(data)
                setLoading(false)
            }
            FetchExchanges();
        } catch (err) {
            setError(true)
            setLoading(false)
        }

    }, [])

    if(error) return<ErrorComponent message={"Error While Fetching Coin Exchanges"}/>

    return (
        <Container maxWidth={"container.xl"}>
            {loading ? (
                <Loader />
            ) : (
                <>
                <HStack wrap={"wrap"} justifyContent={"space-between"}>
                    {exchanges.map((i) => (
                        <ExchangeCard key={i.id} name={i.name} url={i.url} image={i.image} rank={i.trust_score_rank} />
                    ))}
                </HStack>
                </>
                )
            }
        </Container>
    )
}

const ExchangeCard = ({ name, url, image, rank }) => <a href={url} target={"blank"}>
<VStack w={"52"} shadow={"lg"} p={"8"} borderRadius={"lg"} transition={"all 0.3s"}
m={"4"}
css={{
    "&:hover":{
        transform:"scale(1.1)"
    }
}}
>
    <Image src={image} w={"10"} h={"10"} objectFit={"contain"} alt={"Exchanges"} />
    <Heading size={"md"} noOfLines={1}>{rank}</Heading>
    <Text>{name}</Text>
</VStack>
</a>

export default Exchanges