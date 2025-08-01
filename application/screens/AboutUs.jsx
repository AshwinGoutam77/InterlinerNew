import React from 'react';
import { useTranslation } from 'react-i18next';
import { Text, View, ScrollView } from 'react-native';

export default function AboutUs() {
    const { t } = useTranslation();

    return (
        <ScrollView style={{ flex: 1, backgroundColor: 'white', padding: 20 }}>
            <Text style={{
                fontSize: 24,
                fontWeight: '700',
                color: 'black',
                fontFamily: 'Poppins-Regular',
                textAlign: 'start',
                marginBottom: 20
            }}>
                {t('about.title')}
            </Text>

            <Text style={{
                fontSize: 16,
                fontWeight: '700',
                color: 'black',
                fontFamily: 'Poppins-Regular',
                textAlign: 'start',
                marginBottom: 10
            }}>{t('about.subtitle')}</Text>

            <Text style={{
                fontSize: 16,
                color: 'black',
                fontFamily: 'Poppins-Regular',
                lineHeight: 24,
                marginBottom: 20
            }}>
                {t('about.description')}
            </Text>

            <Text style={{
                fontSize: 14,
                color: 'black',
                fontFamily: 'Poppins-Regular',
                lineHeight: 20,
                marginBottom: 20
            }}>
                {t('about.disclaimer')}
            </Text>

            <Text style={{ fontSize: 16, fontWeight: '600', marginBottom: 10 }}>
                {t('about.authorsTitle')}
            </Text>

            {t('about.authors', { returnObjects: true }).map((author, i) => (
                <Text key={i} style={{ fontSize: 16, color: 'black', lineHeight: 24 }}>
                    • {author}
                </Text>
            ))}
        </ScrollView>

    );
}
