import { StyleSheet } from 'react-native';
import Colors from './colors';

const GlobalStyles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: Colors.background,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: Colors.primary,
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
});

export default GlobalStyles;
