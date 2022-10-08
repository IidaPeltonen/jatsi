import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2F3C7E'
  },
  header: {
    marginTop: 30,
    marginBottom: 15,
    backgroundColor: '#FF69B4',
    flexDirection: 'row',
  },
  footer: {
    marginTop: 20,
    backgroundColor: '#FF69B4',
    flexDirection: 'row'
  },
  title: {
    color: 'black',
    fontWeight: 'bold',
    flex: 1,
    fontSize: 30,
    textAlign: 'center',
    margin: 10
  },
  author: {
    color: '#2F3C7E',
    fontWeight: 'bold',
    flex: 1,
    fontSize: 25,
    textAlign: 'center',
    margin: 10
  },
  gameboard: {
    backgroundColor: '#FBEAEB',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10
  },
  gameinfo: {
    textAlign: 'center',
    justifyContent: 'center',
    fontSize: 18,
    margin: 10,
    fontFamily: 'Comfort'
  },
  status: {
    textAlign: 'center',
    justifyContent: 'center',
    fontSize: 25,
    margin: 10,
    fontFamily: 'Shadow'
  },
  row: {
    marginTop: 20,
    padding: 10
  },
  flex: {
    flexDirection: 'row'
  },
  button: {
    margin: 20,
    flexDirection: 'row',
    padding: 5,
    backgroundColor: '#FF69B4',
    width: 100,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    color: 'black',
    fontSize: 15
  },
  grid: {
    marginLeft: 10,
    marginRight: 10,
    alignItems: 'center',
    paddingBottom: 10
  },
  tulokset: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  tuloksetOtsikko: {
    flexDirection: 'row',
    padding: 5,
    justifyContent: 'center',
    alignSelf: 'center'
  },
  tuloksetButtons: {
    backgroundColor: '#FC85D3',
    flexDirection: 'row',
    padding: 5,
    backgroundColor: '#FF69B4',
    justifyContent: 'center',
    alignItems: 'center',
    width: 25,
     
  },
  yht: {
    textAlign: 'center',
    justifyContent: 'center',
    fontSize: 15,
    margin: 10,
    fontFamily: 'Comfort'
  }
})
