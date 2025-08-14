import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    FlatList,
    StyleSheet,
    ScrollView,
    Linking,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Colors from '../src/constants/colors';

const categories = ['General', 'Account', 'Service', 'Payment'];
const faqs = [
    {
        question: 'What is Funica?',
        answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    },
    { question: 'How to use Funica?', answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
    { question: 'How do I cancel a orders product?', answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
    { question: 'Is Funica free to use?', answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
    { question: 'How to add promo when checkout?', answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
];

export default function HelpCenterScreen() {
    const [activeTab, setActiveTab] = useState('FAQ');
    const [selectedCategory, setSelectedCategory] = useState('General');
    const [expanded, setExpanded] = useState(null);

    const openWhatsApp = () => {
        Linking.openURL('https://wa.me/+971504775180');
    };

    const makeCall = () => {
        Linking.openURL(`tel:+971504775180`);
    };


    return (
        <ScrollView contentContainerStyle={styles.container}>
            {/* Tabs */}
            {/* <View style={styles.tabs}>
                <TouchableOpacity onPress={() => setActiveTab('FAQ')}>
                    <Text style={[styles.tabText, activeTab === 'FAQ' && styles.activeTab]}>FAQ</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setActiveTab('Contact')}>
                    <Text style={[styles.tabText, activeTab === 'Contact' && styles.inactiveTab]}>Contact us</Text>
                </TouchableOpacity>
            </View> */}

            {/* Category Buttons */}
            <View style={styles.categoryContainer}>
                {categories.map((item, index) => (
                    <TouchableOpacity
                        key={index}
                        style={[
                            styles.categoryButton,
                            selectedCategory === item && styles.categoryButtonActive,
                        ]}
                        onPress={() => setSelectedCategory(item)}
                    >
                        <Text
                            style={[
                                styles.categoryText,
                                selectedCategory === item && styles.categoryTextActive,
                            ]}
                        >
                            {item}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

            {/* FAQs */}
            <View style={{ marginTop: 26 }}>
                {faqs.map((item, index) => (
                    <View key={index} style={styles.faqItem}>
                        <TouchableOpacity
                            onPress={() => setExpanded(expanded === index ? null : index)}
                            style={styles.faqHeader}
                        >
                            <Text style={styles.faqQuestion}>{item.question}</Text>
                            <Icon
                                name={expanded === index ? 'chevron-up' : 'chevron-down'}
                                size={18}
                                color="#000"
                            />
                        </TouchableOpacity>
                        {expanded === index && item.answer !== '' && (
                            <Text style={styles.faqAnswer}>{item.answer}</Text>
                        )}
                    </View>
                ))}
            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={openWhatsApp}>
                    <Icon name="logo-whatsapp" size={20} color="#fff" />
                    <Text style={styles.buttonText}>WhatsApp</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={makeCall}>
                    <Icon name="call" size={20} color="#fff" />
                    <Text style={styles.buttonText}>Phone</Text>
                </TouchableOpacity>
            </View>

        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        paddingBottom: 60,
        backgroundColor: '#fdfdfd',
        height: '100%'
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    headerText: {
        fontSize: 18,
        fontWeight: '600',
    },
    tabs: {
        flexDirection: 'row',
        marginTop: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        paddingBottom: 8,
    },
    tabText: {
        marginRight: 24,
        fontSize: 16,
    },
    activeTab: {
        borderBottomWidth: 2,
        borderColor: '#000',
        fontWeight: 'bold',
    },
    inactiveTab: {
        color: '#ccc',
    },
    categoryContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10,
        marginTop: 16,
    },
    categoryButton: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 24,
        paddingHorizontal: 16,
        paddingVertical: 6,
    },
    categoryButtonActive: {
        backgroundColor: '#000',
    },
    categoryText: {
        fontSize: 14,
        color: '#000',
    },
    categoryTextActive: {
        color: '#fff',
    },
    searchContainer: {
        marginTop: 16,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F5F5F5',
        borderRadius: 12,
        paddingHorizontal: 12,
        paddingVertical: 8,
    },
    searchInput: {
        flex: 1,
        fontSize: 14,
    },
    faqItem: {
        backgroundColor: '#F9F9F9',
        borderRadius: 5,
        padding: 16,
        marginBottom: 12,
    },
    faqHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    faqQuestion: {
        fontSize: 15,
        fontWeight: '500',
        color: '#000',
    },
    faqAnswer: {
        marginTop: 8,
        color: '#555',
        fontSize: 14,
        lineHeight: 20,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    button: {
        flexDirection: 'row',
        backgroundColor: Colors.primary,
        borderRadius: 8,
        paddingVertical: 12,
        paddingHorizontal: 16,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
        gap: 8,
        width: '49%'
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
});
