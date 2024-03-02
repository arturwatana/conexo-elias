import { Flex, Text } from "@chakra-ui/react";
import { motion } from 'framer-motion'

type AnswerType = {
    tittle: string
    items: string[]
    index: number
}

export default function Answer({tittle, items, index}: AnswerType){

    const colors = {
        purple: "#A500FF",
        red: "#490400",
        blue: "#0048BA",
        pink: "#F1CBFF"
    }

    function randomColor(){
       const uniqueColors = Object.values(colors)
       return uniqueColors[index]
    }

    return (
        <>
            <Flex as={motion.div} bg={randomColor()} rounded={"15px"} w="98.5%" h="80px" animate={{scale:[0, 0, 1]}} transition={{
                duration: 2,
                repeat:"none"
            }} color="white" fontWeight={"bold"} flexDir={"column"} scale={0} justifyContent={"center"} alignItems={"center"}>
                <Text>{tittle}</Text>
                <Text>{items.join(",")}</Text>
            </Flex>
        </>
    )
}