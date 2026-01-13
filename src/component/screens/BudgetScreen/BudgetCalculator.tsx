import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Slider from '@react-native-community/slider';

// Slider value → Savings in Crores
const getSavingsFromSlider = (value: number) => {
  if (value <= 100) {
    return value / 100; // 0–1 Cr (Lakhs)
  }
  return 1 + (value - 100) * (49 / 400); // 1–50 Cr
};

// Smart formatter: Lakh or Crore
const formatAmount = (amount: number) => {
  if (amount < 100000) {
    return `₹ ${(amount / 100000).toFixed(2)} Lakh`;
  }
  return `₹ ${(amount / 10000000).toFixed(2)} Cr`;
};

const FIXED_INTEREST_RATE = 8; // %

const BudgetCalculator = () => {
  const [savingsSlider, setSavingsSlider] = useState(50);
  const [affordableEmi, setAffordableEmi] = useState(50000);
  const [tenure, setTenure] = useState(20);

  const savings = useMemo(
    () => getSavingsFromSlider(savingsSlider) * 10000000,
    [savingsSlider]
  );

  const calculation = useMemo(() => {
    const monthlyRate = FIXED_INTEREST_RATE / 12 / 100;
    const months = tenure * 12;

    const loanAmount =
      affordableEmi *
      ((Math.pow(1 + monthlyRate, months) - 1) /
        (monthlyRate * Math.pow(1 + monthlyRate, months)));

    return {
      loanAmount,
      totalBudget: loanAmount + savings,
    };
  }, [savings, affordableEmi, tenure]);

  return (
    <View style={styles.container}>
      <Text style={styles.subTitle}>Budget Calculator</Text>
      <Text style={styles.emi}>
        {formatAmount(calculation.totalBudget)}
      </Text>

      {/* Savings */}
      <View style={styles.row}>
        <Text style={styles.label}>Savings for Home</Text>
        <Text style={styles.value}>{formatAmount(savings)}</Text>
      </View>

      <Slider
        minimumValue={0}
        maximumValue={500}
        step={1}
        value={savingsSlider}
        onValueChange={setSavingsSlider}
        minimumTrackTintColor="#d21919ff"
        thumbTintColor="#d21919ff"
      />

      <View style={styles.rangeRow}>
        <Text>₹ 0</Text>
        <Text>₹ 50 Cr</Text>
      </View>

      {/* EMI */}
      <View style={styles.row}>
        <Text style={styles.label}>EMI you can afford</Text>
        <Text style={styles.value}>
          ₹ {affordableEmi.toLocaleString('en-IN')}
        </Text>
      </View>

      <Slider
        minimumValue={0}
        maximumValue={1000000}
        step={1000}
        value={affordableEmi}
        onValueChange={setAffordableEmi}
        minimumTrackTintColor="#d21919ff"
        thumbTintColor="#d21919ff"
      />

      {/* Tenure */}
      <View style={styles.row}>
        <Text style={styles.label}>Loan Tenure</Text>
        <Text style={styles.value}>{tenure} years</Text>
      </View>

      <Slider
        minimumValue={1}
        maximumValue={30}
        step={1}
        value={tenure}
        onValueChange={setTenure}
        minimumTrackTintColor="#d21919ff"
        thumbTintColor="#d21919ff"
      />

      {/* Summary */}
      <View style={styles.summaryBox}>
        <Text style={styles.summaryLabel}>Max Loan Amount</Text>
        <Text style={styles.summaryValue}>
          {formatAmount(calculation.loanAmount)}
        </Text>
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
    fontSize: 20,
    fontWeight: '600',
    color: '#000000ff',
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
},

summaryValue: {
  fontSize: 16,
  fontWeight: '600',
  color: '#000',
},

});