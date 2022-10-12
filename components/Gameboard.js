import { useState, useEffect } from 'react'
import { Text, View, Pressable, Button, Alert } from 'react-native'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import styles from '../style/style'
import { Row, Grid } from 'react-native-easy-grid'

let board = []
let diceRow = []
const NBR_OF_DICES = 5
const NBR_OF_THROWS = 3
const NBR_OF_ANSWERS = 6
const BONUSPOINT = 63
let finalResults = new Array(6).fill(false)

export default function Gameboard () {
  const [nbrOfThrowsLeft, setNbrOfThrowsLeft] = useState(NBR_OF_THROWS)
  const [status, setStatus] = useState('')
  const [selectedDices, setSelectedDices] = useState(
    new Array(NBR_OF_DICES).fill(false)
  )
  const [selectedResult, setSelectedResult] = useState(
    new Array(NBR_OF_ANSWERS).fill(false)
  )
  const [finalSum, setFinalSum] = useState(0)
  const [disabledResultButtons, setDisabledResultButtons] = useState(true)
  const [disabledDices, setDisabledDices] = useState(false)
  const [disabledThrowButton, setDisabledThrowButton] = useState(false)
  const [bonuspoints, setBonuspoints] = useState(63)
  const [text, setText] = useState('')
  const [gameinfo, setGameinfo] = useState('Heittoja jäljellä: ')

  //nopparivin "arvonta"
  const row = []
  for (let i = 0; i < NBR_OF_DICES; i++) {
    row.push(
      <Pressable
        key={'row' + i}
        onPress={() => selectDice(i)}
        disabled={disabledDices}
      >
        <MaterialCommunityIcons
          name={board[i]}
          key={'row' + i}
          size={50}
          color={getDiceColor(i)}
        ></MaterialCommunityIcons>
      </Pressable>
    )
  }

  //nappirivin tulostus, tehdään vain kerran
    let resultsButtons = []
    for (let i = 0; i < NBR_OF_ANSWERS; i++) {
      let y = i + 1
      resultsButtons.push(
        <View key={i} style={styles.finalResults}>
          <Grid style={styles.grid}>
            <Row size={1}>
              <Text style={styles.resultsHeader}>{finalResults[i]}</Text>
            </Row>
            <Row size={1}>
              <Pressable
                key={'nappi' + i}
                onPress={() => selectResult(i)}

                disabled={disabledResultButtons}
              >
                <MaterialCommunityIcons
                  name={'numeric-' + y + '-box-multiple-outline'}
                  key={'numeric' + i}
                  size={40}
                  color={getResultColor(i)}
                ></MaterialCommunityIcons>
              </Pressable>
            </Row>
          </Grid>
        </View>
      )
  }


  //nollaa kaiken, aloittaa koko pelin alusta
  function reset () {
    board = []
    diceRow = []
    finalResults = new Array(6).fill(false)
    setNbrOfThrowsLeft(NBR_OF_THROWS)
    setStatus('Aloita kierros heittämällä noppaa')
    setSelectedDices(new Array(NBR_OF_DICES).fill(false))
    setSelectedResult(new Array(NBR_OF_ANSWERS).fill(false))
    setFinalSum(0)
    setDisabledResultButtons(true)
    setDisabledThrowButton(false)
    setGameinfo('Heittoja jäljellä: ')
    setBonuspoints(BONUSPOINT)
    setText('')
  }

  //tarkistetaan noppien väri
  function getDiceColor (i) {
    return selectedDices[i] ? 'grey' : '#FC85D3' // noppien väri, valittu : ei valittu
  }

    //tarkistetaan noppien väri
  function getResultColor (i) {
    return selectedResult[i] ? 'grey' : '#FC85D3' // nappien väri, valittu : ei valittu
  }

  //noppien valinta
  function selectDice (i) {
    let dices = [...selectedDices]
    dices[i] = selectedDices[i] ? false : true
    setSelectedDices(dices)
  }

  //tuloksen valinta
  function selectResult (i) {
    //jos painettiin nappia, jossa on jo tulos
    if (finalResults[i] !== false) {
      console.log('Tallennuspaikka käytetty jo!')
      setStatus("Valitse tallennuspaikka, jota et ole jo käyttänyt!")
    }
    //muuten
    else {
      let result = [...selectedResult]
      result[i] = selectedResult[i] ? false : true

      setSelectedResult(result)
      checkResults(i)
      const tulos = finalResults.reduce((a,b) => a+b) 
      setFinalSum(tulos)
      let vajaa = BONUSPOINT - tulos
      setBonuspoints(vajaa)
      setNbrOfThrowsLeft(NBR_OF_THROWS)
      setDisabledThrowButton(false)
      setDisabledDices(false)
      setSelectedDices('')
    }
  }

  //noppien heitto
  function throwDices () {
    if (nbrOfThrowsLeft < 4 && nbrOfThrowsLeft > 0) {
      for (let i = 0; i < NBR_OF_DICES; i++) {
        if (!selectedDices[i]) {
          let randomNumber = Math.floor(Math.random() * 6 + 1)
          board[i] = 'dice-' + randomNumber
          diceRow[i] = randomNumber
        }
      }
    }
    setNbrOfThrowsLeft(nbrOfThrowsLeft - 1)
  }

  //tarkistaa mitä nappia painettiin ja laskee tuloksen finalSumeen
  function checkResults (i) {
    if (nbrOfThrowsLeft === 0) {
      let y = i + 1
      let sum = 0

      if (diceRow[0] === y) {
        finalResults[i] += y
        sum += y
      }
      if (diceRow[1] === y) {
        finalResults[i] += y
        sum += y
      }
      if (diceRow[2] === y) {
        finalResults[i] += y
        sum += y
      }
      if (diceRow[3] === y) {
        finalResults[i] += y
        sum += y
      }
      if (diceRow[4] === y) {
        finalResults[i] += y
        sum += y
      }

      if (sum === 0) {
        finalResults[i] = 0
      }

      setFinalSum(finalSum + sum)
      setNbrOfThrowsLeft(NBR_OF_THROWS)
      board = new Array(NBR_OF_DICES).fill(false)
      setStatus('Aloita uusi kierros')
      setDisabledDices(false)
      setDisabledThrowButton(false)
      setDisabledResultButtons(true)
      setBonuspoints(BONUSPOINT - finalSum)
      setText('Tarvitset vielä ' + bonuspoints + ' pistettä saadaksesi bonuksen!')
    }
  }

  useEffect(() => {
    if (nbrOfThrowsLeft === NBR_OF_THROWS) {
      setStatus('Aloita kierros heittämällä noppaa')
      setDisabledResultButtons(true)
      setDisabledDices(false)
      setDisabledThrowButton(false)
      if (bonuspoints <= 0) {
        setText('Bonus ansaittu! +50 pistettä!')
      } else {
        setText(
          'Tarvitset vielä ' + bonuspoints + ' pistettä saadaksesi bonuksen!'
        )
      }
    }
    if (nbrOfThrowsLeft < 3 && nbrOfThrowsLeft > 0) {
      setStatus('Heitä kaikki heittosi ensin!')
      setDisabledResultButtons(true)
      setDisabledDices(false)
      setDisabledThrowButton(false)
      if (bonuspoints <= 0) {
        setText('Bonus ansaittu!')
      } 
    }
    if (nbrOfThrowsLeft === 0) {
      setStatus('Valitse mihin asetat pisteesi')
      setDisabledDices(false)
      setDisabledThrowButton(true)
      setDisabledResultButtons(false)
      if (bonuspoints <= 0) {
        setText('Bonus ansaittu! ')
        setFinalSum(finalSum + 50)
      } 
    }
    if (selectedResult.every(x => x)) {
      setDisabledResultButtons(true)
      setDisabledDices(true)
      setDisabledThrowButton(true)
      setGameinfo('')
      setNbrOfThrowsLeft()
      if (bonuspoints <= 0) {
        let finalSumBonus = finalSum + 50
        setText('Bonus ansaittu! ')
        setStatus('Peli päättyi, lopulliset pisteesi: ' + finalSum + ' + 50 = ' + finalSumBonus)
      } 
      else {
        setText('Bonuksista jäi puuttumaan ' + bonuspoints + ' pistettä.')
        setStatus('Peli päättyi, lopulliset pisteesi: ' + finalSum)
      }
    }
  }, [nbrOfThrowsLeft])

  return (
    <View>
      <Pressable style={styles.restart} onPress={() => reset()}>
        <Text style={styles.restartButtonText}>Aloita alusta!</Text>
      </Pressable>
      <View style={styles.gameboard}>
        <View style={styles.flex}>{row}</View>
        <Text style={styles.gameinfo}>
          {gameinfo} {nbrOfThrowsLeft} {''}
        </Text>
        <Text style={styles.status}> {status} </Text>
        <Pressable
          style={styles.button}
          onPress={() => throwDices()}
          disabled={disabledThrowButton}
        >
          <Text style={styles.buttonText}>Heitä!</Text>
        </Pressable>
        <View style={styles.flex}>
          <Text>{resultsButtons}</Text>
        </View>
        <Text style={styles.sum}>Yhteensä: {finalSum} {''}</Text>
        <Text style={styles.missingBonus}>{text}</Text>
      </View>
    </View>
  )
}
