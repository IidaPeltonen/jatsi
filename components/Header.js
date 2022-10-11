import { Text, View } from 'react-native'
import styles from '../style/style'
import { useFonts } from 'expo-font'

export default function Header () {
  const [loaded] = useFonts({
    Caveat: require('../assets/Fonts/Caveat-VariableFont_wght.ttf'),
    Comfort: require('../assets/Fonts/ComforterBrush-Regular.ttf'), // otsikko
    Shadow: require('../assets/Fonts/ShadowsIntoLight-Regular.ttf')
  })

  if (!loaded) {
    return null
  }
  
  return (
    <View style={styles.header}>
      <Text style={styles.title}>
        <Text style={{ fontFamily: 'Comfort' }}>Mini Jatsi</Text>
      </Text>
    </View>
  )
}
