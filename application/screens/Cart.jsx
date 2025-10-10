import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  ActivityIndicator,
  I18nManager,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import Colors from '../src/constants/colors';
import { useTranslation } from 'react-i18next';
import { useAppContext } from '../context/RTLContext';
import GlobalStyles from '../src/constants/globalStyles';
import API from '../src/services/api';
import { useCart } from '../context/CartContext';

export default function CartScreen() {
  const { t } = useTranslation();
  const { isRTL } = useAppContext();
  const navigation = useNavigation();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const currency = '$';
  const { setCartCount } = useCart();

  const fetchCart = React.useCallback(async () => {
    try {
      const res = await API.getCart();
      const apiItems = res?.data?.data?.cart?.items || [];
      // console.log('Cart API Response:', apiItems?.length);

      const formatted = apiItems?.map((item) => {
        // console.log('newarrival', item);

        const parent = item?.item?.group?.parent;
        const photoArray = parent?.photo ? JSON.parse(parent.photo) : [];
        return {
          id: item?.encrypted_id,
          title: parent?.name || item?.item?.name || 'Unnamed Item',
          price: item?.price || 0,
          quantity: item?.qty || 1,
          image: photoArray.length ? { uri: photoArray[0] } : require('../../assets/images/shirt-banner.png'),
          color: item?.item?.group?.name || '',
          size: item?.item?.name || '',
        };
      });

      setCartItems(formatted);
      const totalQty = apiItems?.length;
      setCartCount(totalQty);
    } catch (err) {
      console.error('Error fetching cart:', err);
    } finally {
      setLoading(false);
    }
  }, [setCartCount]);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const updateCartItem = async (itemId, newQty) => {
    // console.log(itemId, newQty);
    try {
      const res = await API.updateCartItem({
        item_id: itemId,
        qty: newQty,
      });
      console.log('Cart updated:', res.data);
    } catch (err) {
      console.error('Error updating cart item:', err);
    }
  };


  const handleRemoveItem = async (itemId) => {
    Alert.alert(
      "Remove Item",
      "Are you sure you want to remove this item from the cart?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Yes, Remove",
          style: "destructive",
          onPress: async () => {
            try {
              const res = await API.removeCartItem({ item_id: itemId });
              console.log("Item removed:", res);
              if (res.data.status) {
                fetchCart()
              }
            } catch (err) {
              console.error("Error removing cart item:", err);
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

  const increaseQuantity = async (id, item) => {
    const updated = cartItems.map((item) =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCartItems(updated);

    const target = updated.find((i) => i.id === id);
    if (target) {
      await updateCartItem(id, target.quantity, item);
    }
  };

  const decreaseQuantity = async (id) => {
    const updated = cartItems.map((item) =>
      item.id === id && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
    setCartItems(updated);

    const target = updated.find((i) => i.id === id);
    if (target && target.quantity > 0) {
      await updateCartItem(id, target.quantity);
    }
  };


  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const renderItem = ({ item }) => (
    // console.log(item),

    <TouchableOpacity
      style={[styles.card, { flexDirection: isRTL ? 'row-reverse' : 'row' }]}
    // onPress={() => navigation.navigate('ProductDetailScreen', { item })}
    >
      <Image source={item.image} style={styles.image} resizeMode="cover" />
      <View style={styles.details}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.colorText}>
          {item.color} | {item.size}
        </Text>
        <Text style={styles.price}>
          {currency} {item.price.toFixed(2)}
        </Text>
      </View>
      <View style={styles.rightControls}>
        <View style={styles.counter}>
          <TouchableOpacity onPress={() => decreaseQuantity(item.id)}>
            <Text style={styles.counterBtn}>-</Text>
          </TouchableOpacity>
          <Text style={styles.counterText}>{item.quantity}</Text>
          <TouchableOpacity onPress={() => increaseQuantity(item.id, item)}>
            <Text style={styles.counterBtn}>+</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.removeBtn} onPress={() => handleRemoveItem(item.id)}>{t('cartScreen.remove')}</Text>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#fdfdfd" }}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  return (
    <SafeAreaView style={GlobalStyles.container}>
      {cartItems.length === 0 ? (
        <View style={styles.cartContainer}>
          <Image source={require('../../assets/images/empty-cart.png')} style={styles.cartImage} resizeMode="cover" />
          <Text style={{ color: Colors.textLight, fontSize: 16 }}>
            {/* {t('cartScreen.emptyCart') || 'Your cart is empty'} */}
            Your cart is empty. Add some items to get started!
          </Text>
        </View>
      ) : (
        <>
          <FlatList
            data={cartItems}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderItem}
            contentContainerStyle={{ paddingBottom: 130 }}
            showsVerticalScrollIndicator={false}
          />

          {/* Footer */}
          <View style={[styles.footer, { flexDirection: isRTL ? 'row-reverse' : 'row' }]}>
            <View style={styles.totalContainer}>
              <Text style={styles.totalLabel}>{t('cartScreen.totalPrice')}</Text>
              <Text style={styles.totalPrice}>
                {currency} {total.toFixed(2)}
              </Text>
            </View>
            <TouchableOpacity
              style={styles.checkoutBtn}
              onPress={() => navigation.navigate('CheckoutScreen')}
            >
              <Text style={styles.checkoutText}>{t('cartScreen.continue')}</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // marginVertical: 12,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
  },
  card: {
    flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    paddingVertical: 26,
    marginVertical: 10,
    marginHorizontal: 1,
    alignItems: 'center',
    shadowColor: '#ccc',
    shadowOpacity: 1,
    shadowRadius: 5,
    elevation: 2,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 12,
    objectFit: 'cover',
  },
  cartContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '80%',
  },
  cartImage: {
    width: 100,
    height: 100,
    marginBottom: 20
  },
  details: {
    flex: 1,
    marginLeft: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: '800',
  },
  colorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
  },
  colorDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 6,
  },
  colorText: {
    fontSize: 12,
    color: '#333',
    width: '80%',
  },
  price: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.black,
  },
  rightControls: {
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    height: 60,
  },
  counter: {
    backgroundColor: '#F4F4F4',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 8,
  },
  counterBtn: {
    fontSize: 18,
    fontWeight: 'bold',
    marginHorizontal: 8,
  },
  counterText: {
    fontSize: 16,
    color: Colors.black,
    fontWeight: '600',
  },
  removeBtn: {
    marginRight: 10,
    color: Colors.black,
    fontSize: 14,
    fontWeight: '600',
    marginTop: 10,
    textDecorationLine: 'underline',
    textDecorationColor: Colors.black,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: Colors.primary,
    padding: 26,
    paddingBottom: 50,
    borderRadius: 0,
    flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 0,
    elevation: 3,
  },
  totalLabel: {
    fontSize: 14,
    color: Colors.white,
    fontWeight: '600'
  },
  totalPrice: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.white
  },
  checkoutBtn: {
    backgroundColor: Colors.white,
    borderRadius: 5,
    paddingVertical: 16,
    paddingHorizontal: 48,
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkoutText: {
    color: Colors.black,
    fontSize: 16,
    fontWeight: '800',
  },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopColor: '#eee',
    borderTopWidth: 1,
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  navText: {
    fontSize: 10,
    marginTop: 2,
  },
  activeNav: {
    color: '#000',
  },
});

