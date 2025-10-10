import React, { useEffect, useState, useContext } from "react";
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    Image,
    TouchableOpacity,
    ScrollView,
    ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";
import { useTranslation } from "react-i18next";
import { useAppContext } from "../context/RTLContext";
import { RoleContext } from "../context/RoleContext";
import CustomerFilter from "../components/CustomerFilter";
import API from "../src/services/api";
import Colors from "../src/constants/colors";
import { useQuery } from "@tanstack/react-query";

const CategoryScreen = () => {
    const { t } = useTranslation();
    const { isRTL } = useAppContext();
    const navigation = useNavigation();
    const { role } = useContext(RoleContext);

    // const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    // useEffect(() => {
    //     const fetchCategories = async () => {
    //         try {
    //             const res = await API.getCategories();
    //             console.log(res?.data?.data?.categories);

    //             if (res.data?.status) {
    //                 setCategories(res?.data?.data?.categories);
    //             } else {
    //                 setCategories([]);
    //             }
    //         } catch (err) {
    //             console.error("Error fetching categories:", err);
    //         } finally {
    //             setLoading(false);
    //         }
    //     };

    //     fetchCategories();
    // }, []);


    const {
        data: categories,
        isLoading,
        refetch,
        isRefetching,
    } = useQuery({
        queryKey: ['categories'],
        queryFn: async () => {
            const res = await API.getCategories();
            return res.data?.data?.categories;
        },
        staleTime: 1000 * 60 * 5, // 5 min fresh cache
        gcTime: 1000 * 60 * 10,   // (replaces cacheTime) - 10 min in memory
        refetchOnMount: false,
        refetchOnWindowFocus: false,
    });

    return (
        <ScrollView style={styles.container}>
            {role === "sales" && <CustomerFilter show />}
            <View
                style={[
                    styles.searchBox,
                    { flexDirection: isRTL ? "row-reverse" : "row" },
                ]}
            >
                <Icon name="search" size={24} color="#999" />
                <TextInput
                    placeholder={t("category.search_placeholder")}
                    style={[styles.input, { textAlign: isRTL ? "right" : "left" }]}
                    placeholderTextColor="#999"
                />
            </View>

            {isLoading ? (
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#fdfdfd" }}>
                    <ActivityIndicator size="large" color={Colors.primary} />
                </View>
            ) : (
                categories?.map((section, idx) => (
                    <View key={idx} style={styles.section}>
                        <Text
                            style={[
                                styles.sectionTitle,
                                { textAlign: isRTL ? "right" : "left" },
                            ]}
                        >
                            {section.name}
                        </Text>

                        <View style={styles.categorySection}>
                            <Image
                                source={{ uri: section.photo }}
                                style={styles.banner}
                                resizeMode="cover"
                            />

                            <ScrollView
                                horizontal
                                showsHorizontalScrollIndicator={false}
                                contentContainerStyle={[
                                    styles.actionRow,
                                    { flexDirection: isRTL ? "row-reverse" : "row" },
                                ]}
                            >
                                {section.children?.map((item, i) => (
                                    <TouchableOpacity
                                        key={i}
                                        style={styles.actionItem}
                                        onPress={() =>
                                            navigation.navigate("ProductsPage", {
                                                categoryId: section.encrypted_id,
                                                subCategoryId: item.encrypted_id,
                                                categoryName: item.name,
                                            })
                                        }
                                    >
                                        <Image source={{ uri: item.photo }} style={styles.icon} />
                                        <Text
                                            style={[
                                                styles.label,
                                                { textAlign: isRTL ? "right" : "center" },
                                            ]}
                                        >
                                            {item.name}
                                        </Text>
                                    </TouchableOpacity>
                                ))}

                            </ScrollView>
                        </View>
                    </View>
                ))
            )
            }
        </ScrollView >
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fdfdfd',
        paddingHorizontal: 20
    },
    searchBox: {
        backgroundColor: '#f1f1f19c',
        borderRadius: 8,
        paddingHorizontal: 12,
        marginBottom: 20,
        height: 50,
        alignItems: 'center',
        marginTop: 20,
        gap: 10,
    },
    input: {
        fontSize: 16,
        flex: 1,
    },
    section: {
        marginBottom: 30,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 12,
    },
    banner: {
        width: '100%',
        height: 190,
        borderRadius: 10,
        marginBottom: 12,
    },
    categorySection: {
        borderBottomWidth: 0.6,
        borderColor: '#00000028',
        paddingBottom: 30,
    },
    actionRow: {
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        gap: 40,
        rowGap: 20,
    },
    actionItem: {
        flexWrap: 'nowrap',
        alignItems: 'center',
    },
    icon: {
        width: 60,
        height: 60,
        borderRadius: 100,
        marginBottom: 6,
        borderWidth: 1,
        borderColor: '#ccc',
    },
    label: {
        fontSize: 15,
        fontWeight: '500',
    },
});

export default CategoryScreen;
