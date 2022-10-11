import { useState, useEffect } from 'react'
import { Text, View, Pressable, Button } from 'react-native'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import styles from '../style/style'
import { Row, Grid } from 'react-native-easy-grid'

let board = []
let nopat = []
const NBR_OF_DICES = 5
const NBR_OF_THROWS = 3
const NBR_OF_ANSWERS = 6
const BONUSPOINT = 63
let tulokset = [0, 0, 0, 0, 0, 0]

export default function Gameboard () {
  const [nbrOfThrowsLeft, setNbrOfThrowsLeft] = useState(NBR_OF_THROWS)
  const [status, setStatus] = useState('')
  const [selectedDices, setSelectedDices] = useState(
    new Array(NBR_OF_DICES).fill(false)
  )
  const [selectedResult, setSelectedResult] = useState(
    new Array(NBR_OF_ANSWERS).fill(false)
  )
  const [yht, setYht] = useState(0)
  const [disabledTulosNapit, setDisabledTulosNapit] = useState(true)
  const [disabledNopat, setDisabledNopat] = useState(false)
  const [disabledYksiNappi, setDisabledYksiNappi] = useState(false)
  const [disabledHeittoNappi, setDisabledHeittoNappi] = useState(false)
  const [bonuspoints, setBonuspoints] = useState(63)
  const [teksti, setTeksti] = useState('')
  const [gameinfo, setGameinfo] = useState('Heittoja jäljellä: ')

  //nopparivin "arvonta"
  const row = []
  for (let i = 0; i < NBR_OF_DICES; i++) {
    row.push(
      <Pressable
        key={'row' + i}
        onPress={() => selectDice(i)}
        disabled={disabledNopat}
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
  let tuloksetButtons = []
  for (let i = 0; i < NBR_OF_ANSWERS; i++) {
    let y = i + 1
    tuloksetButtons.push(
      <View key={i} style={styles.tulokset}>
        <Grid style={styles.grid}>
          <Row size={1}>
            <Text style={styles.tuloksetOtsikko}>{tulokset[i]}</Text>
          </Row>
          <Row size={1}>
            <Pressable
              key={'nappi' + i}
              onPress={() => selectResult(i)}
              disabled={disabledTulosNapit} // tämä muuttaa koko rivin disabloiduksi
            >
              <MaterialCommunityIcons
                name={'numeric-' + y + '-box-multiple-outline'}
                key={'numeric' + i}
                size={40}
                color={getResultColor(i)}
                disabled={disabledYksiNappi} //miksi tämä ei muuta yhtä nappia disabloiduksi?
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
    nopat = []
    tulokset = [0, 0, 0, 0, 0, 0]
    setNbrOfThrowsLeft(NBR_OF_THROWS)
    setStatus('Aloita kierros heittämällä noppaa')
    setSelectedDices(new Array(NBR_OF_DICES).fill(false))
    setSelectedResult(new Array(NBR_OF_ANSWERS).fill(false))
    setYht(0)
    setDisabledTulosNapit(true)
    setDisabledYksiNappi(false)
    setDisabledHeittoNappi(false)
    setGameinfo('Heittoja jäljellä: ')
    setTeksti('Tarvitset vielä ' + bonuspoints + ' pistettä saadaksesi bonuksen!')
    setBonuspoints(63)
  }

  //tarkistetaan noppien väri
  function getDiceColor (i) {
    return selectedDices[i] ? 'grey' : '#FC85D3' // noppien väri, valittu : ei valittu
  }

    //tarkistetaan noppien väri
  function getResultColor (i) {
    //selectedResult[i] ? 'true' : 'false' // nappien väri, valittu
    return selectedResult[i] ? 'grey' : '#FC85D3' // nappien väri, valittu : ei valittu
  }

  //yritelmä muuttaa nappien disabilityä
  function getResultDisability (i) {
    let y = i + 1
    //console.log('y: ' + y)
    setDisabledYksiNappi(true)
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
    const tulos = tulokset.reduce((a,b) => a+b) 
    setYht(tulos)
    let vajaa = BONUSPOINT - tulos
    setBonuspoints(vajaa)
    setNbrOfThrowsLeft(NBR_OF_THROWS)
    setDisabledHeittoNappi(false)
    setDisabledNopat(false)
    setSelectedDices('')
    //ei toimi
    getResultDisability(i)
    // ei toumi
    setDisabledYksiNappi(true)
    //console.log('i:' + i)
    //console.log('disabledYksi:' + disabledYksiNappi)
  }

  //noppien heitto
  function throwDices () {
    if (nbrOfThrowsLeft < 4 && nbrOfThrowsLeft > 0) {
      for (let i = 0; i < NBR_OF_DICES; i++) {
        if (!selectedDices[i]) {
          let randomNumber = Math.floor(Math.random() * 6 + 1)
          board[i] = 'dice-' + randomNumber
          nopat[i] = randomNumber
        }
      }
    }
    setNbrOfThrowsLeft(nbrOfThrowsLeft - 1)
  }

  //tarkistaa mitä nappia painettiin ja laskee tuloksen yhteen
  function checkResults (i) {
    if (nbrOfThrowsLeft === 0) {
      let y = i + 1
      let sum = 0

      if (nopat[0] === y) {
        tulokset[i] += y
        sum += y
      }
      if (nopat[1] === y) {
        tulokset[i] += y
        sum += y
      }
      if (nopat[2] === y) {
        tulokset[i] += y
        sum += y
      }
      if (nopat[3] === y) {
        tulokset[i] += y
        sum += y
      }
      if (nopat[4] === y) {
        tulokset[i] += y
        sum += y
      }

      setYht(yht + sum)
      setNbrOfThrowsLeft(NBR_OF_THROWS)
      board = new Array(NBR_OF_DICES).fill(false)
      setStatus('Aloita uusi kierros')
      setDisabledNopat(false)
      setDisabledHeittoNappi(false)
      setDisabledTulosNapit(true)
      setBonuspoints(BONUSPOINT - yht)
      setTeksti('Tarvitset vielä ' + bonuspoints + ' pistettä saadaksesi bonuksen!')
    }
  }

  useEffect(() => {
    if (nbrOfThrowsLeft === NBR_OF_THROWS) {
      setStatus('Aloita kierros heittämällä noppaa')
      setDisabledTulosNapit(true)
      setDisabledNopat(false)
      setDisabledHeittoNappi(false)
      if (bonuspoints <= 0) {
        setTeksti('Bonus ansaittu!')
      } else {
        setTeksti(
          'Tarvitset vielä ' + bonuspoints + ' pistettä saadaksesi bonuksen!'
        )
      }
    }
    if (nbrOfThrowsLeft < 3 && nbrOfThrowsLeft > 0) {
      setStatus('Heitä kaikki heittosi ensin!')
      setDisabledTulosNapit(true)
      setDisabledNopat(false)
      setDisabledHeittoNappi(false)
      if (bonuspoints <= 0) {
        setTeksti('Bonus ansaittu!')
      } 
    }
    if (nbrOfThrowsLeft === 0) {
      setStatus('Valitse mihin asetat pisteesi')
      setDisabledNopat(false)
      setDisabledHeittoNappi(true)
      setDisabledTulosNapit(false)
      if (bonuspoints <= 0) {
        setTeksti('Bonus ansaittu!')
        setYht(yht + 50)
      } 
      //voisiko tässä tarkistaa taulukon, jossa tulokset on, ja palauttaa sieltä 
      //käytettävissä olevina vaan ne ,joissa ei oo tulosta?
      //if (selectResult.every())
    }
    if (selectedResult.every(x => x)) {
      setDisabledTulosNapit(true)
      setDisabledNopat(true)
      setDisabledHeittoNappi(true)
      setStatus('Peli päättyi, lopulliset pisteesi: ' + yht)
      setGameinfo('')
      setNbrOfThrowsLeft()
      if (bonuspoints <= 0) {
        setTeksti('Bonus ansaittu!')
      } else {
        setTeksti('Bonuksista jäi puuttumaan ' + bonuspoints + ' pistettä.')
      }
    }
  }, [nbrOfThrowsLeft])

  return (
    <View>
      <Pressable style={styles.alusta} onPress={() => reset()}>
        <Text style={styles.buttonText}>Aloita alusta!</Text>
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
          disabled={disabledHeittoNappi}
        >
          <Text style={styles.buttonText}>Heitä!</Text>
        </Pressable>
        <View style={styles.flex}>
          <Text>{tuloksetButtons}</Text>
        </View>
        <Text style={styles.yht}>Yhteensä: {yht} {''}</Text>
        <Text style={styles.puuttuu}>{teksti}</Text>
      </View>
    </View>
  )
}
