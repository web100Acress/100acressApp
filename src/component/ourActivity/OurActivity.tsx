import React from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import RealEstate from '../screens/Properties/RealEstate'
import Why100Acress from '../screens/Properties/Why100Acress'

const OurActivity = () => {
  return (
    <View style={styles.container}>
      <ScrollView>
        {/* <RealEstate/>
        <Why100Acress />  */}
      </ScrollView>
    </View>
  )
}

export default OurActivity

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f8efefff'
  }
})
