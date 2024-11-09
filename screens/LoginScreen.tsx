import React, { useState } from 'react';
import LanguageSelector from '../localization/LanguageSelector';
import { useTranslation } from 'react-i18next';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useLoginMutation } from '../hooks/useLoginMutation';
import {
  validateEmail,
  validatePassword,
  userExists,
} from '../config/validation';
import { LoginScreenNavigationProp } from '../types/navigation';

interface LoginScreenProps {
  navigation: LoginScreenNavigationProp;
}

export default function LoginScreen({ navigation }: LoginScreenProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const { t } = useTranslation();

  const mutation = useLoginMutation(navigation);

  const handleLogin = () => {
    let isValid = true;

    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address');
      isValid = false;
    } else {
      setEmailError('');
    }

    if (!validatePassword(password)) {
      setPasswordError('Password must be at least 6 characters long');
      isValid = false;
    } else {
      setPasswordError('');
    }

    if (isValid && userExists(email, password)) {
      mutation.mutate({ email, password });
    } else if (!userExists(email, password)) {
      setEmailError('Invalid email or password');
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.headerlogin}>
          <Text style={styles.loginText}>{t('hey')}</Text>
          <Text style={styles.loginText}>{t('welcome')}</Text>
          <Text style={styles.loginText}>{t('back')}</Text>
          {/* <Image source={require('../assets/login.png')} style={styles.logo} /> */}
        </View>
        <View style={styles.form}>
          <View style={styles.input}>
            <Text style={styles.inputLabel}>{t('login.email')}</Text>
            <TextInput
              placeholder="email@example.com"
              placeholderTextColor="#6b7280"
              style={styles.inputControl}
              value={email}
              onChangeText={setEmail}
            />
            {emailError ? (
              <Text style={styles.errorText}>{t('login.email-error')}</Text>
            ) : null}
          </View>
          <View style={styles.input}>
            <Text style={styles.inputLabel}>{t('login.password')}</Text>
            <TextInput
              placeholder="********"
              placeholderTextColor="#6b7280"
              style={styles.inputControl}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
            {passwordError ? (
              <Text style={styles.errorText}>{t('login.password-error')}</Text>
            ) : null}
          </View>
          <LinearGradient colors={['#87888c', '#ffffff']} style={styles.btn}>
            <TouchableOpacity
              onPress={handleLogin}
              disabled={mutation.status === 'pending'} // Comparison to check if it's loading
            >
              <Text style={styles.btnText}>{t('login.button')}</Text>
            </TouchableOpacity>
          </LinearGradient>
          {mutation.status === 'pending' && ( // Use status instead of isLoading
            <Text style={styles.loadingText}>{t('login.logging')}</Text>
          )}

          <Text style={styles.orText}>{t('login.orLogin')}</Text>
          <View style={styles.socialLoginContainer}>
            <TouchableOpacity style={styles.socialBtn}>
              <Icon name="google" size={24} color="#db4437" />
              <Text style={styles.socialText}>{t('social.google')}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialBtn}>
              <Icon name="linkedin" size={24} color="#0A66C2" />
              <Text style={styles.socialText}>{t('social.linkedin')}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialBtn}>
              <Icon name="facebook" size={24} color="#1877F2" />
              <Text style={styles.socialText}>{t('social.facebook')}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.newUserContainer}>
            <Text style={styles.newUserText}>{t('newUser.new-user')}</Text>
            <TouchableOpacity>
              <Text style={styles.createAccountText}>
                {t('newUser.createnew')}
              </Text>
            </TouchableOpacity>
          </View>
          <LanguageSelector />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 24,
    backgroundColor: '#171717',
  },
  headerlogin: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
    marginRight: 10,
  },
  loginText: {
    alignSelf: 'stretch',
    fontSize: 57,
    fontWeight: 'bold',
    color: 'white',
    marginLeft: 15,
  },
  logo: {
    width: 120,
    height: 120,
    margin: '10%',
  },
  form: {
    marginBottom: 15,
    paddingHorizontal: 24,
  },
  input: {
    marginBottom: 10,
  },
  inputLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: 'white',
    marginBottom: 8,
  },
  inputControl: {
    height: 50,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    borderRadius: 12,
    fontSize: 15,
    fontWeight: '500',
    color: 'black',
    borderWidth: 1,
    borderColor: '#C9D3DB',
    borderStyle: 'solid',
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    paddingVertical: 10,
    marginLeft: 80,
    marginRight: 80,
    marginTop: 20,
  },
  btnText: {
    fontSize: 18,
    lineHeight: 26,
    fontWeight: '600',
    color: 'black',
  },
  orText: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    marginVertical: 20,
    color: 'white',
  },
  socialLoginContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  socialBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  socialText: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: '500',
    color: '#222',
  },
  newUserContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  newUserText: {
    fontSize: 16,
    color: 'white',
  },
  createAccountText: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
    textDecorationLine: 'underline', // Underline the text to indicate a link
  },
  errorText: {
    color: 'red',
    marginTop: 4,
    fontSize: 12,
  },
  loadingText: {
    textAlign: 'center',
    marginTop: 10,
    fontSize: 16,
    color: 'light-green',
  },
});
