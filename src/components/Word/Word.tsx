import { Box, Text } from "@chakra-ui/react";
import { motion } from 'framer-motion'
import { useEffect, useState } from "react";
type WordProps = {
    word: string
    isSelected: boolean
    wrongBorder: boolean
    correctAnswer?: boolean
}

export default function Word({word, isSelected, wrongBorder, correctAnswer}: WordProps){
    const [animate, setAnimate] = useState<boolean>(false)


    useEffect(() => {
        if(animate){
            setTimeout(() => {
                setAnimate(false)
            }, 1000)
        }
    }, [animate])
    return (
        <>
            <Box as={motion.div} animate={animate ? {
                scale: [1,0.95,1],
            } :  correctAnswer ? {scale: [1,0.5,0]} : ""} transition={{
                duration: 0.1,
                repeat:"none"
            }} cursor={"pointer"} border={wrongBorder ? "2px solid red" : "none"}  rounded={"10px"} p="20px" onClick={(() => setAnimate(true))} backgroundColor={isSelected ? "#009afe" : "#1e293b"} display={"flex"} alignItems={"center"}  justifyContent={"center"} w="24%" h="120px"  >
                <Text textAlign={"center"} textColor={"white"} fontWeight={"semibold"} fontSize={18} fontFamily={"inherit"}>
                    {word}
                </Text>
            </Box>
        </>
    )
}