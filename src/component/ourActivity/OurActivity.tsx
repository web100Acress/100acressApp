import React from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import RealEstate from './activity/RealEstate'
import Why100Acress from './activity/Why100Acress'

const OurActivity = () => {
  return (
    <View style={styles.container}>
      <ScrollView>
        <RealEstate/>
        <Why100Acress /> 
      </ScrollView>
    </View>
  )
}

export default OurActivity

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fedbdb'
  }
})
