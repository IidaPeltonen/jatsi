import { useState, useEffect } from 'react'
import { Text, View, Pressable } from 'react-native'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import styles from '../style/style'
import { Row, Grid } from 'react-native-easy-grid'

let board = []
let nopat = []
const NBR_OF_DICES = 5
const NBR_OF_THROWS = 3
const BONUS = 63
let tulokset = [0, 0, 0, 0, 0, 0, 0]

export default function Gameboard () {
  const [nbrOfThrowsLeft, setNbrOfThrowsLeft] = useState(NBR_OF_THROWS)
  //const [nbrOfThrowsAllLeft, setNbrOfThrowsAllLeft] = useState(15)
  const [status, setStatus] = useState('')
  const [selectedDices, setSelectedDices] = useState(
    new Array(NBR_OF_DICES).fill(false)
  )
  const [selectedResult, setSelectedResult] = useState(
    new Array(NBR_OF_DICES).fill(false)
  )
  const [yht, setYht] = useState(0)
  const [disabledTulosNapit, setDisabledTulosNapit] = useState(false)
  const [disabledNopat, setDisabledNopat] = useState(false)
  const [disabledHeittoNappi, setDisabledHeittoNappi] = useState(false)

  const handleResultUpdate = async() => {
    setDisabledTulosNapit(true)
  }

  const handleNopatUpdate = async() => {
    disabledNopat(true)
  }

  const handleNappiUpdate = async() => {
    disabledHeittoNappi(true)
  }

  //nopparivi
  const row = []
  for (let i = 0; i < NBR_OF_DICES; i++) {
    row.push(
      <Pressable key={'row' + i} onPress={() => selectDice(i)}>
        <MaterialCommunityIcons
          name={board[i]}
          key={'row' + i}
          size={50}
          color={getDiceColor(i)}
        ></MaterialCommunityIcons>
      </Pressable>
    )
  }

  //nappirivi
  let tuloksetButtons = []
  for (let i = 1; i < 7; i++) {
    tuloksetButtons.push(
      <View key={i} style={styles.tulokset}>
        <Grid style={styles.grid}>
          <Row size={1}>
            <Text style={styles.tuloksetOtsikko}>{tulokset[i]}</Text>
          </Row>
          <Row size={1}>
            <Pressable key={'tuloksetButtons' + i} onPress={() => selectResult(i)}
              style={styles.tuloksetButtons}
              color={getResultColor(i)}
            >
              <Text>{i}</Text>
            </Pressable>
          </Row>
        </Grid>
      </View>
    )
  }

  function getDiceColor (i) {
    if (board.every((val, i, arr) => val === arr[0])) {
      return 'lightgreen'
    } else {
      return selectedDices[i] ? 'grey' : '#FC85D3' // noppien väri, valittu, ei
    }
  }

  function getResultColor (i) {
    if (tuloksetButtons.every((val, i, arr) => val === arr[0])) {
      return 'blue'
    } else {
      return selectedResult[i] ? 'blue' : 'purple' // nappien väri, valittu, ei
    }
  }

  //noppien valinta
  function selectDice (i) {
    let dices = [...selectedDices]
    dices[i] = selectedDices[i] ? false : true
    setSelectedDices(dices)
  }

  //tuloksen valinta
  function selectResult (i) {
    let result = [...selectedResult]
    result[i] = selectedResult[i] ? false : true
    setSelectedResult(result)
    checkResults(i)
    setSelectedDices(new Array(NBR_OF_DICES).fill(false))
  }

  function throwDices () {
    for (let i = 0; i < NBR_OF_DICES; i++) {
      if (!selectedDices[i]) {
        let randomNumber = Math.floor(Math.random() * 6 + 1)
        board[i] = 'dice-' + randomNumber // + '-outline' erilaiset, ei näköjään kovin nätit
        //kokeillaan taulukkoa jossa on tallesssa vain pelkkä numero
        nopat[i] = randomNumber
      }
    }
    setNbrOfThrowsLeft(nbrOfThrowsLeft - 1)
  }

  function checkResults (i) {
      if (nbrOfThrowsLeft === 0) {
        setStatus('Valitse mihin asetat pisteesi')
        let sum = 0
        //näihin pitää saada toiminto nappulan disabloimiseen 
        if (nopat[0] === i) {
          tulokset[i] += i
          sum +=i
        }
        if (nopat[1] === i) {
          tulokset[i] += i
          sum +=i
        }
        if (nopat[2] === i) {
          tulokset[i] += i
          sum +=i
        }
        if (nopat[3] === i) {
          tulokset[i] += i
          sum +=i
        }
        if (nopat[4] === i) {
          tulokset[i] += i
          sum +=i
        }
        setYht(yht + sum)

      } else {
        setStatus('Heitä kaikki heittosi ensin.')
      }

    }

    useEffect(() => {
      checkResults()
        if (nbrOfThrowsLeft === NBR_OF_THROWS) {
          setStatus('Aloita peli heittämällä noppaa')
        }
        if (nbrOfThrowsLeft < 0) {
          setNbrOfThrowsLeft(NBR_OF_THROWS - 1)
          setStatus('Heitä kaikki heittosi ensin.')
        }
    }, [nbrOfThrowsLeft] )



  let puuttuu = BONUS - yht

  return (
    <View style={styles.gameboard}>
      <View style={styles.flex}>{row}</View>
      <Text style={styles.gameinfo}>Heittoja jäljellä: {nbrOfThrowsLeft} </Text>
      <Text style={styles.status}> {status} </Text>
      <Pressable style={styles.button} onPress={() => throwDices()}>
        <Text style={styles.buttonText}>Heitä!</Text>
      </Pressable>
      <View style={styles.flex}>
        <Text>{tuloksetButtons}</Text>
      </View>
      <Text style={styles.yht}>Yhteensä: {yht}</Text>
      <Text style={styles.yht}>
        Tarvitset vielä {puuttuu} pistettä saadaksesi bonuksen!{' '}
      </Text>
    </View>
  )
}
