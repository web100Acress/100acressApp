import React, { useState } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  ScrollView
} from 'react-native'
import { Picker } from '@react-native-picker/picker'
import { useNavigation, NavigationProp } from '@react-navigation/native'

type RootStackParamList = {
  PostProperty: undefined
  PropertyDetails: undefined
}
const STATES_OF_INDIA = [
  'Andhra Pradesh',
  'Arunachal Pradesh',
  'Assam',
  'Bihar',
  'Chhattisgarh',
  'Goa',
  'Gujarat',
  'Haryana',
  'Himachal Pradesh',
  'Jharkhand',
  'Karnataka',
  'Kerala',
  'Madhya Pradesh',
  'Maharashtra',
  'Manipur',
  'Meghalaya',
  'Mizoram',
  'Nagaland',
  'Odisha',
  'Punjab',
  'Rajasthan',
  'Sikkim',
  'Tamil Nadu',
  'Telangana',
  'Tripura',
  'Uttar Pradesh',
  'Uttarakhand',
  'West Bengal',
  'Delhi',
  'Jammu & Kashmir',
  'Ladakh',
  'Puducherry',
  'Chandigarh',
  'Dadra & Nagar Haveli and Daman & Diu',
  'Lakshadweep',
  'Andaman & Nicobar Islands'
]

const PostProperty = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>()
  const [lookingFor, setLookingFor] = useState('Sell')
  const [propertyKind, setPropertyKind] = useState('Residential')
  const [propertyType, setPropertyType] = useState('')
  const [state, setState] = useState('')
  const [contact, setContact] = useState('')

  const renderOption = (label: any, value: any, selected: any, onPress: any) => (
    <TouchableOpacity
      onPress={() => onPress(value)}
      style={[
        styles.optionBtn,
        selected === value && styles.activeOption
      ]}
    >
      <Text
        style={[
          styles.optionText,
          selected === value && styles.activeText
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  )

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>Add Basic Details</Text>

      {/* Looking To */}
      <Text style={styles.label}>What You're looking to?</Text>
      <View style={styles.row}>
        {renderOption('Sell', 'Sell', lookingFor, setLookingFor)}
        {renderOption('Rent / Lease', 'Rent', lookingFor, setLookingFor)}
      </View>

      {/* Property Kind */}
      <Text style={styles.label}>What kind of property?</Text>
      <View style={styles.row}>
        {renderOption('Residential', 'Residential', propertyKind, setPropertyKind)}
        {renderOption('Commercial', 'Commercial', propertyKind, setPropertyKind)}
      </View>

      {/* Property Type */}
      <Text style={styles.label}>Select Property Type :</Text>
      <View style={styles.row}>
        {renderOption('Flat/Apartment', 'Flat/Apartment', propertyType, setPropertyType)}
        {renderOption('Serviced Apartment', 'Serviced Apartment', propertyType, setPropertyType)}
        {renderOption('Independent House / Villas', 'Independent House / Villas', propertyType, setPropertyType)}
        {renderOption('Farmhouse', 'Farmhouse', propertyType, setPropertyType)}
        {renderOption('Independent / Builder floor', 'Independent / Builder floor', propertyType, setPropertyType)}
        {renderOption('Residential Land', 'Residential Land', propertyType, setPropertyType)}
        {renderOption('Other', 'Other', propertyType, setPropertyType)}
      </View>

      {/* State Dropdown */}
      <Text style={styles.label}>Where Is Your Property Located?</Text>
      <View style={styles.pickerWrapper}>
        <Picker
          selectedValue={state}
          onValueChange={(value) => setState(value)}
        >
          <Picker.Item label="Select State" value="" />
          {STATES_OF_INDIA.map((item) => (
            <Picker.Item key={item} label={item} value={item} />
          ))}
        </Picker>
      </View>

      {/* Contact */}
      <Text style={styles.label}>Your contact details</Text>
      <TextInput
        placeholder="Phone number / Email"
        value={contact}
        onChangeText={setContact}
        style={styles.input}
      />

      {/* Next Button */}
      <TouchableOpacity style={styles.nextBtn}
        onPress={(): void => navigation.navigate('PropertyDetails')}>
        <Text style={styles.nextText}>Next</Text>
      </TouchableOpacity>
    </ScrollView>
  )
}

export default PostProperty

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff'
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold'
  },
  step: {
    color: '#888',
    marginBottom: 20
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 20,
    marginBottom: 8
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  optionBtn: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    marginRight: 10,
    marginBottom: 10
  },
  activeOption: {
    backgroundColor: '#ffe6e6',
    borderColor: '#e51e1e'
  },
  optionText: {
    color: '#333'
  },
  activeText: {
    color: '#e51e1e',
    fontWeight: '600'
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginTop: 6
  },
  nextBtn: {
    backgroundColor: '#e51e1e',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 40
  },
  nextText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600'
  }
})
