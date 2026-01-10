import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import Slider from '@react-native-community/slider';


const BudgetCalculator = () => {
  const [loanAmount, setLoanAmount] = useState(14.3); 
  const [interestRate, setInterestRate] = useState(8);
  const [tenure, setTenure] = useState(30);

  return (
    <View style={styles.container}>
      
      {/* EMI Section */}
      <Text style={styles.subTitle}>Estimated EMI per month you may consider</Text>
      <Text style={styles.emi}>₹ 10.49 lacs</Text>

      {/* Loan Amount */}
      <View style={styles.row}>
        <Text style={styles.label}>Loan Amount</Text>
        <Text style={styles.value}>₹ {loanAmount.toFixed(2)} Crores</Text>
      </View>

      <Slider
        minimumValue={1}
        maximumValue={27}
        value={loanAmount}
        onValueChange={setLoanAmount}
        minimumTrackTintColor="#1976D2"
        maximumTrackTintColor="#E0E0E0"
        thumbTintColor="#1976D2"
      />

      <View style={styles.rangeRow}>
        <Text>₹ 1 Lac</Text>
        <Text>₹ 27 Crores</Text>
      </View>

      {/* Interest Rate */}
      <View style={styles.row}>
        <Text style={styles.label}>Interest rate %</Text>
        <Text style={styles.value}>{interestRate.toFixed(1)}%</Text>
      </View>

      <Slider
        minimumValue={7}
        maximumValue={15}
        step={0.1}
        value={interestRate}
        onValueChange={setInterestRate}
        minimumTrackTintColor="#1976D2"
        maximumTrackTintColor="#E0E0E0"
        thumbTintColor="#1976D2"
      />

      <View style={styles.rangeRow}>
        <Text>7.0%</Text>
        <Text>15.0%</Text>
      </View>

      {/* Tenure */}
      <View style={styles.row}>
        <Text style={styles.label}>Preferred loan tenure</Text>
        <Text style={styles.value}>{tenure} years</Text>
      </View>

      <Slider
        minimumValue={1}
        maximumValue={30}
        step={1}
        value={tenure}
        onValueChange={setTenure}
        minimumTrackTintColor="#1976D2"
        maximumTrackTintColor="#E0E0E0"
        thumbTintColor="#1976D2"
      />

      <View style={styles.rangeRow}>
        <Text>1 years</Text>
        <Text>30 years</Text>
      </View>

    </View>
  );
};

export default BudgetCalculator;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  subTitle: {
    fontSize: 14,
    color: '#555',
    marginBottom: 8,
  },
  emi: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 25,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  label: {
    fontSize: 16,
    color: '#000',
  },
  value: {
    fontSize: 16,
    fontWeight: '600',
  },
  rangeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
});