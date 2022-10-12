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
    flex: 1,
    fontSize: 40,
    textAlign: 'center',
    margin: 0
  },
  author: {
    color: '#2F3C7E',
    fontWeight: 'bold',
    flex: 1,
    fontSize: 30,
    textAlign: 'center',
    margin: 5
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
    fontSize: 20,
    margin: 5,
    fontFamily: 'Caveat',
  },
  status: {
    textAlign: 'center',
    justifyContent: 'center',
    fontSize: 20,
    margin: 5,
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
    margin: 12,
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
    margin: 4,
    alignItems: 'center',
    paddingBottom: 10
  },
  results: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  resultsHeader: {
    flexDirection: 'row',
    padding: 5,
    justifyContent: 'center',
    alignSelf: 'center'
  },
  resultsButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius:3
  },
  sum: {
    textAlign: 'center',
    justifyContent: 'center',
    fontSize: 20,
    margin: 5,
    fontFamily: 'Caveat'
  },
  missingBonus: {
    textAlign: 'center',
    justifyContent: 'center',
    fontSize: 20,
    margin: 5,
    fontFamily: 'Caveat',
  },
  restart: {
    marginLeft: 20,
    padding: 5,
    backgroundColor: '#cc3300',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-start',
    shadowColor: 'white',
    shadowOpacity: 0,
    shadowRadius: 100
  },
  restartButtonText: {
    color: 'white'
  }

})
