import { Badge, Box, Button, Container, HStack, Image, Progress, Radio, RadioGroup, Stat, StatArrow, StatHelpText, StatLabel, StatNumber, Text, VStack } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import Loader from './Loader'
import axios from 'axios'
import { server } from '../index'
import { useParams } from 'react-router-dom'
import ErrorComponent from './ErrorComponent'
import Chart from './Chart'

const CoinDetails = () => {
  const Params = useParams()
  const [coins, setCoins] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [currency, setCurrency] = useState("inr")
  const [days, setDays] = useState("24h")
  const [chartArray, setchartArray] = useState([])

  const Currencysymbol = currency === "inr" ? "₹" : currency === 'eur' ? "€" : "$";

  const btns=["24h","7d","14d","30d","60d","200d","365d","max"];

  const SwitchChartStats=(val)=>{
    setDays(val)
    setLoading(true)
  }

  useEffect(() => {
    try {
      const FetchCoin = async () => {
        const { data } = await axios.get(`${server}/coins/${Params.id}`)
        const { data:Chartdata } = await axios.get(`${server}/coins/${Params.id}/market_chart?vs_currency=${currency}&days=${days}`)
        setchartArray(Chartdata.prices);
        setCoins(data);
        setLoading(false);
      }
      FetchCoin();
    } catch (err) {
      setError(true)
      setLoading(false)
    }

  }, [currency,Params.id,days])

  if (error) return <ErrorComponent message={"Error While Fetching Coin"} />
  return (
    <Container maxWidth={"container.xl"}>
      {loading ? <Loader /> : (
        <>
          <Box borderWidth={1} width={"full"}>
          <Chart currency={Currencysymbol} array={chartArray} days={days}/>
          </Box>

        <HStack p={'4'} wrap={'wrap'}>
          {
            btns.map((i)=>(
              <Button key={i} onClick={()=>SwitchChartStats(i)}>{i}</Button>
            ))
          }
        </HStack>

          <RadioGroup value={currency} onChange={setCurrency} p={"8"}>
            <HStack spacing={"4"}>
              <Radio value={'inr'}>INR</Radio>
              <Radio value={'eur'}>EUR</Radio>
              <Radio value={'usd'}>USD</Radio>
            </HStack>
          </RadioGroup>

          <VStack spacing={"4"} p="16" alignItems={"flex-start"}>
            <Text fontSize={"small"} alignSelf="center" opacity={0.7}>Last Update On {Date(coins.market_data.last_updated).split("G")[0]}</Text>
            <Image src={coins.image.large} w={"16"} h={"16"} objectFit={"contain"} />
            <Stat>
              <StatLabel>{coins.name}</StatLabel>
              <StatNumber>{Currencysymbol}{coins.market_data.current_price[currency]}</StatNumber>
              <StatHelpText>
                <StatArrow type={coins.market_data.price_change_24h > 0 ? "increase" : "decrease"} />
                {coins.market_data.price_change_24h}%
              </StatHelpText>
            </Stat>
            <Badge fontSize={"2xl"} backgroundColor={"blackAlpha.800"} color={"white"}>
              {`#${coins.market_data.market_cap_rank}`}
            </Badge>
            <CustomBar high={`${Currencysymbol}${coins.market_data.high_24h[currency]}`}
              low={`${Currencysymbol}${coins.market_data.low_24h[currency]}`} />
            <Box w={"full"} p='4'>
              <Item title={"Max Supply"} value={coins.market_data.max_supply} />
              <Item title={"Circulating Supply"} value={coins.market_data.circulating_supply} />
              <Item title={"Market Cap"} value={`${Currencysymbol}${coins.market_data.market_cap[currency]}`} />
              <Item title={"All Time low"} value={`${Currencysymbol}${coins.market_data.atl[currency]}`} />
              <Item title={"All Time high"} value={`${Currencysymbol}${coins.market_data.ath[currency]}`} />
            </Box>
          </VStack>
        </>
      )}
    </Container>
  )
}

const Item = ({ title, value }) => (
  <HStack justifyContent={'space-between'} w={'full'} my={'4'}>
    <Text fontFamily={"Bebas Neue"} letterSpacing={'widest'}>{title}</Text>
    <Text>{value}</Text>
  </HStack>
)

const CustomBar = ({ high, low }) => (
  <VStack w={'full'}>
    <Progress value={50} colorScheme={'teal'} w={'full'} />
    <HStack justifyContent={'space-between'} w={'full'}>
      <Badge children={low} colorScheme={'red'} />
      <Text fontSize={"sm"}>24H Range</Text>
      <Badge children={high} colorScheme={'green'} />
    </HStack>
  </VStack>
)

export default CoinDetails