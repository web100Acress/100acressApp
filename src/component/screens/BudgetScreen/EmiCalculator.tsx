import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import Slider from '@react-native-community/slider';

const EmiCalculator = () => {
  const [loanAmount, setLoanAmount] = useState(14.3); 
  const [interestRate, setInterestRate] = useState(8);
  const [tenure, setTenure] = useState(30);

  const emiCalulator = useMemo(() => {
    const principal = loanAmount * 10000000;
    const monthlyRate = interestRate / 12 / 100;
    const months = tenure * 12;

    if(monthlyRate === 0) return {
      emi: principal / months,
      principal,
      totalInterest: 0,
      totalAmount: principal,
    };

    const emiValue = (principal * monthlyRate * Math.pow(1 + monthlyRate, months))/(Math.pow(1 + monthlyRate, months) -1);
    const totalAmount = emiValue * months;
    const totalInterest = totalAmount - principal;
    
    return {
      emi: emiValue,
      principal,
      totalInterest,
      totalAmount,
    };
  }, [loanAmount, interestRate, tenure])

  const breakdown = emiCalulator;

  return (
    <View style={styles.container}>
      
      {/* EMI Section */}
      <Text style={styles.subTitle}>Estimated EMI per month you may consider</Text>
      {/* <Text style={styles.emi}>₹ 10.49 lacs</Text> */}
      <Text style={styles.emi} >₹{(emiCalulator.emi / 100000).toFixed(2)} lacs</Text>

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
        minimumTrackTintColor="#d21919ff"
        maximumTrackTintColor="#E0E0E0"
        thumbTintColor="#d21919ff"
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
        minimumTrackTintColor="#d21919ff"
        maximumTrackTintColor="#E0E0E0"
        thumbTintColor="#d21919ff"
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
        minimumTrackTintColor="#d21919ff"
        maximumTrackTintColor="#E0E0E0"
        thumbTintColor="#d21919ff"
      />

      <View style={styles.rangeRow}>
        <Text>1 years</Text>
        <Text>30 years</Text>
      </View>

      <View style={styles.summaryBox}>
        <Text style={styles.summaryLabel}>Principal Amount:</Text>
        <Text style={styles.summaryValue}>₹ {Math.round(breakdown.principal).toLocaleString('en-In')}</Text>
      </View>
      <View style={styles.summaryBox}>
        <Text style={styles.summaryLabel}>Total Interest: </Text>
        <Text style={styles.summaryValue}>₹ {Math.round(breakdown.totalInterest).toLocaleString('en-In')}</Text>
      </View>
      <View style={styles.summaryBox}>
        <Text style={styles.summaryLabel}>Total Amount:</Text>
        <Text style={styles.summaryValue}>₹ {Math.round(breakdown.totalAmount).toLocaleString('en-In')}</Text>
      </View>
    </View>

    
  );
};

export default EmiCalculator;

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
  summaryBox: {
  marginTop: 10,
  padding: 16,
  backgroundColor: '#fcd3d3ff',
  borderRadius: 10,
},

summaryRow: {
  flexDirection: 'row',
  justifyContent: 'space-between',

},

summaryLabel: {
  fontSize: 16,
  color: '#000',
  fontWeight: '600'
},

summaryValue: {
  fontSize: 16,
  fontWeight: '600',
  color: '#000',
},

});