import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {ToastProvider} from 'react-native-toast-notifications';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import ColorsApp from './ColorsApp';
import { Fonts } from './Fonts';

const CustomToastProvider = ({children}) => {
  return (
    <ToastProvider
      placement="bottom"
      dangerIcon={<AntDesign name="close" color="#fff" />}
      successIcon={<AntDesign name="check" color="#fff" size={18} />}
      offset={10}
      // Custom type example
      renderType={{
        custom_toast: (toast) => (
          <View
            style={{
              maxWidth: "85%",
              paddingHorizontal: 15,
              paddingVertical: 10,
              backgroundColor: "#fff",
              marginVertical: 4,
              borderRadius: 8,
              borderLeftColor: ColorsApp.SUCCESS,
              borderLeftWidth: 6,
              justifyContent: "center",
              paddingLeft: 16,
            }}
          >
            <Text
              style={{
                fontSize: 14,
                color: "#333",
                fontWeight: "bold",
              }}
            >
              {toast.data.title}
            </Text>
            <Text style={{ color: "#a3a3a3", marginTop: 2 }}>
              {toast.message}
            </Text>
          </View>
        ),
        error: (toast) => (
          <View
            style={{
              width: "95%",
              maxWidth: "95%",
              paddingVertical: 10,
              backgroundColor: "#fff",
              marginVertical: 4,
              borderRadius: 8,
              borderLeftColor: ColorsApp.DANGER,
              borderLeftWidth: 6,
              justifyContent: "center",
              paddingHorizontal: 16,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <View>
              <Text style={{ fontSize: 16, fontFamily: Fonts.SemiBold }}>
                Error
              </Text>
              <View>
                <Text
                  style={{
                    color: "#a3a3a3",
                    marginRight: 30,
                    fontFamily: Fonts.Regular,
                    fontSize: 13,
                  }}
                >
                  {toast.message}
                </Text>
              </View>
            </View>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => toast.onHide()}
              style={{
                marginLeft: "auto",
                width: 40,
                height: 40,
                borderRadius: 20,
                backgroundColor: "#333",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Entypo name="cross" color={ColorsApp.LIGHT} size={20} />
            </TouchableOpacity>
          </View>
        ),
        success: (toast) => (
          <View
            style={{
              width: "95%",
              maxWidth: "95%",
              paddingVertical: 10,
              backgroundColor: "#fff",
              marginVertical: 4,
              borderRadius: 8,
              borderLeftColor: ColorsApp.SUCCESS,
              borderLeftWidth: 6,
              justifyContent: "center",
              paddingHorizontal: 16,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <View>
              <Text style={{ fontSize: 16, fontFamily: Fonts.SemiBold }}>
                Success
              </Text>
              <View>
                <Text
                  style={{
                    color: "#a3a3a3",
                    marginRight: 16,
                    fontFamily: Fonts.Regular,
                    fontSize: 13,
                  }}
                >
                  {toast.message}
                </Text>
              </View>
            </View>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => toast.onHide()}
              style={{
                marginLeft: "auto",
                width: 40,
                height: 40,
                borderRadius: 20,
                backgroundColor: "#333",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Entypo name="cross" color={ColorsApp.LIGHT} size={20} />
            </TouchableOpacity>
          </View>
        ),
      }}
    >
      {children}
    </ToastProvider>
  );
};

export default CustomToastProvider;

const styles = StyleSheet.create({});
