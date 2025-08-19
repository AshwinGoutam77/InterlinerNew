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

const promoList = [
    { title: 'Special 25% Off', desc: 'Special promo only today!' },
    { title: 'Discount 30% Off', desc: 'New user special promo' },
    { title: 'Special 20% Off', desc: 'Special promo only today!' },
    { title: 'Discount 40% Off', desc: 'Special promo only valid today' },
    { title: 'Discount 35% Off', desc: 'Special promo only today!' }
];

export default function PromoCodeScreen() {
    const navigation = useNavigation();
    const [selected, setSelected] = useState(1);

    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false} style={{ marginBottom: 20 }}>
                {promoList.map((promo, index) => (
                    <TouchableOpacity
                        key={index}
                        style={styles.card(selected === index)}
                        onPress={() => setSelected(index)}
                    >
                        <View style={styles.row}>
                            <View style={styles.iconCircle}>
                                <Icon name="pricetag" size={20} color="#fff" />
                            </View>
                            <View style={{ flex: 1, marginLeft: 10 }}>
                                <Text style={styles.titleText}>{promo.title}</Text>
                                <Text style={styles.descText}>{promo.desc}</Text>
                            </View>
                            <View style={styles.radio(selected === index)} />
                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>

            <TouchableOpacity
                style={styles.applyBtn}
                onPress={() => navigation.goBack()}
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
        backgroundColor: '#fdfdfd',
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginVertical: 10
    },
    card: (active) => ({
        backgroundColor: '#fff',
        borderRadius: 16,
        paddingVertical: 22,
        paddingHorizontal: 16,
        marginVertical: 8,
        shadowColor: '#ccc',
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 3,
        borderWidth: active ? 1 : 1,
        borderColor: active ? '#ccc' : 'transparent',
    }),
    row: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    iconCircle: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: Colors.black,
        justifyContent: 'center',
        alignItems: 'center'
    },
    titleText: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    descText: {
        fontSize: 13,
        color: '#777'
    },
    radio: (selected) => ({
        width: 20,
        height: 20,
        borderRadius: 100,
        borderWidth: 2,
        borderColor: Colors.primary,
        backgroundColor: selected ? Colors.primary : 'transparent',
        marginLeft: 10
    }),
    applyBtn: {
        backgroundColor: Colors.primary,
        padding: 18,
        alignItems: 'center',
        borderRadius: 8
    },
    applyText: {
        color: '#000000ff',
        fontWeight: '600',
        fontSize: 16
    }
});
