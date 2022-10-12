import { View } from 'react-native'
import styles from './style/style'
import Header from './components/Header'
import Footer from './components/Footer'
import Gameboard from './components/Gameboard'
import { useFonts } from 'expo-font'

export default function App () {

  const [loaded] = useFonts({
    Caveat: require('./assets/Fonts/Caveat-VariableFont_wght.ttf'),
    Comforter: require('./assets/Fonts/ComforterBrush-Regular.ttf'),
    Shadow: require('./assets/Fonts/ShadowsIntoLight-Regular.ttf')
  })

  if (!loaded) {
    return null
  }

  return (
    <View style={styles.container}>
      <Header />
      <Gameboard />
      <Footer />
    </View>
  )
}
