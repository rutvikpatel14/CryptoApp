import { Box, Image, Text } from '@chakra-ui/react'
import React from 'react'
import BitCoin from '../Assets/Bitcoin3.jpg'
import { motion } from 'framer-motion'
const Home = () => {
  return (
    <Box bgColor={"blackAlpha.900"} w={"full"} h={"85vh"}>
      <motion.div style={{
        height:"80vh",
      }}
      animate={{
        translateY:"20px"
      }}
      transition={{
        duration:2,
        repeat:Infinity,
        repeatType:"reverse"
      }}
      >
      <Image
        h={"full"}
        objectFit={"contain"}
        src={BitCoin}
        filter={'grayscale(1)'} />
      </motion.div>
      
      <Text
        fontSize={"6xl"}
        textAlign={"center"}
        fontWeight={"thin"}
        color={"whiteAlpha.700"}
        mt={"-20"}>
        Crypto App
      </Text>
    </Box>
  )
}

export default Home