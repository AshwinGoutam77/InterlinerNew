import React, { useRef, useState } from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    FlatList,
    Dimensions,
    TouchableOpacity,
    I18nManager,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import Colors from '../src/constants/colors';

const { width, height } = Dimensions.get('window');

// Slide Data
const slides = [
    {
        id: '1',
        image: require('../../assets/images/onbording-banner-1.jpg'),
        title: 'Elevating garments from within where interlining meets innovation',
    },
    {
        id: '2',
        image: require('../../assets/images/onbording-banner-2.jpg'),
        title: 'Precision and premium interlining your standards are our benchmark.',
    },
    {
        id: '3',
        image: require('../../assets/images/onbording-banner-3.jpg'),
        title: 'Elegance engineered interlining that performs beautifully.',
    },
];


const WalkthroughScreen = () => {
    const navigation = useNavigation();
    const [currentIndex, setCurrentIndex] = useState(0);
    const flatListRef = useRef(null);

    // const handleNext = async () => {
    //     if (currentIndex < slides.length - 1) {
    //         flatListRef.current?.scrollToIndex({ index: currentIndex + 1 });
    //     } else {
    //         await AsyncStorage.setItem('hasSeenWalkthrough', 'true');
    //         navigation.replace('Login');
    //     }
    // };
    const handleNext = async () => {
        if (I18nManager.isRTL) {
            // In RTL inverted list, going "next" means decreasing index
            if (currentIndex > 0) {
                flatListRef.current?.scrollToIndex({ index: currentIndex - 1 });
            } else {
                await AsyncStorage.setItem('hasSeenWalkthrough', 'true');
                navigation.replace('Login');
            }
        } else {
            // Normal LTR flow
            if (currentIndex < slides.length - 1) {
                flatListRef.current?.scrollToIndex({ index: currentIndex + 1 });
            } else {
                await AsyncStorage.setItem('hasSeenWalkthrough', 'true');
                navigation.replace('Login');
            }
        }
    };

    return (
        <SafeAreaView style={{ flex: 1 }} edges={['left', 'right', 'bottom']}>
            <FlatList
                ref={flatListRef}
                data={slides}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                inverted={I18nManager.isRTL}
                keyExtractor={(item) => item.id}
                onMomentumScrollEnd={(e) => {
                    const index = Math.round(e.nativeEvent.contentOffset.x / width);
                    setCurrentIndex(index);
                }}
                renderItem={({ item }) => (
                    <View style={styles.slide}>
                        <Image
                            source={item.image}
                            style={styles.image}
                            resizeMode="cover"
                        />

                        <View style={styles.textContainer}>
                            <Text style={styles.title}>{item.title}</Text>
                            <View style={styles.dots}>
                                {slides.map((_, i) => (
                                    <View
                                        key={i}
                                        style={[styles.dot, currentIndex === i && styles.activeDot]}
                                    />
                                ))}
                            </View>
                            <TouchableOpacity style={styles.button} onPress={handleNext}>
                                <Text style={styles.buttonText}>
                                    {currentIndex === slides.length - 1 ? 'Get Started' : 'Next'}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },

    slide: {
        width: width,
        height: height,
        alignItems: 'center',
        justifyContent: 'flex-end',
    },

    image: {
        width: width,
        height: height,
        position: 'absolute',
        top: -100,
    },


    textContainer: {
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 40,
        backgroundColor: '#fff',
        width,
    },
    title: {
        color: '#000000',
        fontSize: 22,
        fontWeight: '600',
        textAlign: 'center',
        marginBottom: 16,
    },
    dots: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 24,
        direction: 'ltr', // stops auto-flip
    },

    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#757575ff',
        marginHorizontal: 4,
    },
    activeDot: {
        backgroundColor: Colors.primary,
        width: 24,
    },
    button: {
        backgroundColor: Colors.primary,
        paddingVertical: 16,
        paddingHorizontal: 48,
        borderRadius: 8,
        direction: 'ltr', // optional, if your text or icon jumps
    },

    buttonText: {
        color: Colors.textColor,
        fontSize: 16,
        fontWeight: '800',
    },
});

export default WalkthroughScreen;
