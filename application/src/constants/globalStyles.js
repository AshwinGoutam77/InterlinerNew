import { StyleSheet } from 'react-native';
import Colors from './colors';

const GlobalStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fdfdfd',
        paddingHorizontal: 20
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 5,
    },
    paragraph: {
        fontSize: 16,
        color: Colors.text,
    },
    PrimaryButton: {
        backgroundColor: Colors.primary,
        padding: 12,
        borderRadius: 8,
    },
    PrimaryButtonText: {
        color: Colors.white,
        fontSize: 16,
        fontWeight: 'bold',
    },
    label: {
        fontSize: 15,
        fontWeight: '600',
        color: '#000000'
    },
    value: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#000000ff'
    },
    flexRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 10
    }
});

export default GlobalStyles;
