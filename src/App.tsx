import { useEffect, useState } from 'react'
import './App.css'
import { Box, Flex, Heading, Icon, Text } from '@chakra-ui/react'
import Word from './components/Word/Word'
import { FaArrowLeft } from "react-icons/fa";
import { FaRegCircleQuestion } from "react-icons/fa6";
import Answer from './components/Word/Answer';
type Category = {
  tittle: string
  items: string[]
}

type Result = {
  tittle: string
  items: string[]
}

function App() { 
  const [allowToAttempt, setAllowToAttempt] = useState<boolean>(true)
  const [words, setWords] = useState<string[]>([])
  const [wordsClicked, setWordsClicked] = useState<string[]>([])
  const [wrongBorder, setWrongBorder] = useState<string[]>([])
  const [attempts, setAttempts] = useState<number>(0)
  const [answer, setAnswer] = useState<Result[]>([])
  const maxAttempts = 4
  const result = {
    "first": {tittle: "Campeoes preferidos do Elias:", items:["Kai`sa", "Varus", "Jinx", "Caitlyn"]},
    "second": {tittle: "Jogos que o Elias ja jogou:", items:["Mir4", "Counter-Strike", "League Of Legends", "Survivor.io"]},
    "third": {tittle: "Girias do Lugano", items:["Cuzin", "SALAH", "REX", "Barulhos estranhos"]},
    "fourth": {tittle: "Nomes de pets", items: ["Leona", "Fumacinha", "Julio", "Capuccino"]}
  }

  function shuffleArray(array: string[]){
      const randomComparator = () => Math.random() - 0.5
      return array.sort(randomComparator)
  }

  function handleWordClick(e: any){
    if(!allowToAttempt){
      return
    }
    if(wordsClicked.includes(e.target.innerText)){
      setWordsClicked(prev => prev.filter(prevWords => prevWords != e.target.innerText))
      return
    }
    setWordsClicked(prev => [...prev, e.target.innerText])
  }

  function setResult(){
    const response = wordsClicked.sort()
    const checkCategories = (category: Category) => JSON.stringify(category.items.sort()) === JSON.stringify(response) 
    const categories = Object.values(result)
    let isCorrectAnswer: boolean = false
     categories.map((category) => {
      if(checkCategories(category)){
        setAnswer(prev => [...prev, category])
        isCorrectAnswer = true
        return 
      } 
      return 
    })
    if(!isCorrectAnswer){
       response.map(word => setWrongBorder(prev => [...prev, word]))
    }
  }
  
  function correctWord(word: string){
    let isCorrect = false
    answer.map(uniqueAnswer => {
      const wordIsCorrect = uniqueAnswer.items.includes(word)
      if(wordIsCorrect){
        isCorrect = true
      } 
      return 
    })
    if(isCorrect){
      return true
    } 
    return false
  }

  useEffect(() => {
    const table = document.getElementById("table")
    if(!table){
      return
    }
    if(wordsClicked.length >= maxAttempts){
      setAllowToAttempt(false)
      setResult()
      return
    }
    table.addEventListener("click", handleWordClick)
    return () => {
        table.removeEventListener("click", handleWordClick)
    }
  }, [wordsClicked])

  useEffect(() => {
    if(!allowToAttempt){
        setAttempts(prev => prev + 1)
    }
    if(!allowToAttempt){
      setTimeout(()=> {
        setAllowToAttempt(true)
        setWordsClicked([])
        setWrongBorder([])
      }, 1000)
    }
  }, [allowToAttempt])

  useEffect(() => {
    const object = Object.values(result).flat();
    const words = object.map(item =>  item.items).flat()
    const shuffledArray = shuffleArray(words)
    setAnswer([])
    setWords(shuffledArray)
    setWordsClicked([])
  }, [])

  useEffect(() => {
    setTimeout(() => {
      answer.map(uniqueAnswer => {
        uniqueAnswer.items.map(word => {
          setWords(prev => prev.filter(uniqueWord => uniqueWord != word))
        })
      })
    }, 2000)
  }, [answer])



  return (
    <>
     <Flex backgroundColor={"#0f172a"} w="100%" minH="100vh" justifyContent={"start"} flexDir={"column"} alignItems="center" pt="40px" gap="15px">
      <Heading w="29%" display={"flex"} alignItems={"center"} justifyContent={"space-between"}>
        <Icon fontSize={25} color="white" as={FaArrowLeft}/> 
        <Text fontSize={35} color="white" fontFamily={"inherit"}>Cunexo</Text>
        <Icon fontSize={25} color="white" as={FaRegCircleQuestion }/> 
      </Heading>
      <Flex fontSize={20} w="29%" gap="20px" color="white">
        <Text fontWeight={"bold"}>01/03/2024</Text>   
        <Text>Tentativas: {attempts}</Text>   
      </Flex>
      <Flex flexWrap={"wrap"} maxW="30%" maxH="450px"  gap="6px" id="table">
        {answer.map((uniqueAnswer, index) => <Answer index={index} tittle={uniqueAnswer.tittle} items={uniqueAnswer.items} />)}
        <Flex flexWrap={"wrap"} gap="6px" >
        {words.map(word => <Word word={word} correctAnswer={correctWord(word)}  wrongBorder={wrongBorder.includes(word) ? true : false} isSelected={wordsClicked.find(wordClicked => wordClicked === word) ? true : false}/>)}
        </Flex>
      </Flex >
     </Flex>
    </>
  )
}

export default App
