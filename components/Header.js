import { Text, View } from 'react-native'
import styles from '../style/style'
import { useFonts } from 'expo-font'

export default function Header () {
  const [loaded] = useFonts({
    Caveat: require('../assets/Fonts/Caveat-VariableFont_wght.ttf'),
    ComforterBrush: require('../assets/Fonts/ComforterBrush-Regular.ttf'),
    Shadow: require('../assets/Fonts/ShadowsIntoLight-Regular.ttf')
  })

  if (!loaded) {
    return null
  }
  
  return (
    <View style={styles.header}>
      <Text style={styles.title}>
        <Text style={{ fontFamily: 'Caveat' }}>Mini Jatsi</Text>
      </Text>
    </View>
  )
}
