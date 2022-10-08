import { Text, View } from 'react-native'
import styles from '../style/style'

export default function Footer () {
  return (
    <View style={styles.footer}>
      <Text style={styles.author}>
        <Text style={{ fontFamily: 'Caveat' }}>Tekijä: n0peii00 </Text>
      </Text>
    </View>
  )
}
