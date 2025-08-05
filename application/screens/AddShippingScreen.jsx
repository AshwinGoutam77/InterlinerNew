import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import Colors from '../src/constants/colors';

const shippingMethods = [
  { label: 'Economy', arrival: 'Dec 20-23', price: '$10', icon: 'cube-outline' },
  { label: 'Regular', arrival: 'Dec 20-22', price: '$15', icon: 'cube' },
  { label: 'Cargo', arrival: 'Dec 19-20', price: '$20', icon: 'car-outline' },
  { label: 'Express', arrival: 'Dec 18-19', price: '$30', icon: 'rocket-outline' }
];

export default function ChooseShippingScreen() {
  const [selectedIndex, setSelectedIndex] = useState(1);
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} style={{ marginBottom: 20 }}>
        {shippingMethods.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.card(selectedIndex === index)}
            onPress={() => setSelectedIndex(index)}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View style={styles.iconCircle}>
                <Icon name={item.icon} size={20} color="#fff" />
              </View>
              <View style={{ marginLeft: 10, flex: 1 }}>
                <Text style={styles.label}>{item.label}</Text>
                <Text style={styles.estimate}>Estimated Arrival, {item.arrival}</Text>
              </View>
              <Text style={styles.price}>{item.price}</Text>
              <View style={styles.radio(selectedIndex === index)} />
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <TouchableOpacity
        style={styles.applyBtn}
        onPress={() => navigation.navigate('CheckoutScreen')}
      >
        <Text style={styles.applyText}>Apply</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fdfdfd'
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginVertical: 10
  },
  card: (selected) => ({
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    paddingVertical: 26,
    marginVertical: 10,
    shadowColor: '#ccc',
    shadowOpacity: 1,
    shadowRadius: 5,
    elevation: 2,
    borderWidth: selected ? 1 : 1,
    borderColor: selected ? '#ccc' : 'transparent',
  }),
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center'
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  estimate: {
    fontSize: 13,
    color: '#777'
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 8
  },
  radio: (selected) => ({
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor:  Colors.primary,
    backgroundColor: selected ?  Colors.primary : 'transparent'
  }),
  applyBtn: {
    backgroundColor:  Colors.primary,
    padding: 18,
    fontWeight: '800',
    alignItems: 'center',
    borderRadius: 8
  },
  applyText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16
  }
});
