import React from 'react';
import { View, StyleSheet, Text, I18nManager } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import i18next from 'i18next';
import LinearGradient from 'react-native-linear-gradient';
import { TouchableOpacity } from 'react-native-gesture-handler';

const LanguageSelector = () => {
  const changeLanguage = async (lng: string) => {
    await AsyncStorage.setItem('appLanguage', lng);
    i18next.changeLanguage(lng);

    if (lng === 'ar' && !I18nManager.isRTL) {
      I18nManager.forceRTL(true);
    } else if (lng === 'en' && I18nManager.isRTL) {
      I18nManager.forceRTL(false);
    }
  };

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#87888c', '#ffffff']} style={styles.btn}>
        <TouchableOpacity
          onPress={() => changeLanguage('en')}
          style={styles.btn}
        >
          <Text style={styles.btnText}>English</Text>
        </TouchableOpacity>
      </LinearGradient>
      <LinearGradient colors={['#87888c', '#ffffff']} style={styles.btn}>
        <TouchableOpacity
          onPress={() => changeLanguage('ar-')}
          style={styles.btn}
        >
          <Text style={styles.btnText}>عربى</Text>
        </TouchableOpacity>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
  btn: {
    flexDirection: 'row',

    borderRadius: 30,
    paddingVertical: 5,
    paddingHorizontal: 8,
  },
  btnText: {
    fontSize: 18,
    lineHeight: 26,
    fontWeight: '600',
    color: 'black',
  },
});

export default LanguageSelector;
