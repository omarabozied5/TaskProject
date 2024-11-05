import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
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
          <Text style={styles.loginText}>Login</Text>
          <Image source={require('../assets/login.png')} style={styles.logo} />
        </View>
        <View style={styles.form}>
          <View style={styles.input}>
            <Text style={styles.inputLabel}>Email address</Text>
            <TextInput
              placeholder="omarabozeid@example.com"
              placeholderTextColor="#6b7280"
              style={styles.inputControl}
              value={email}
              onChangeText={setEmail}
            />
            {emailError ? (
              <Text style={styles.errorText}>{emailError}</Text>
            ) : null}
          </View>
          <View style={styles.input}>
            <Text style={styles.inputLabel}>Password</Text>
            <TextInput
              placeholder="********"
              placeholderTextColor="#6b7280"
              style={styles.inputControl}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
            {passwordError ? (
              <Text style={styles.errorText}>{passwordError}</Text>
            ) : null}
          </View>
          <LinearGradient colors={['#341948', '#8155ba']} style={styles.btn}>
            <TouchableOpacity
              onPress={handleLogin}
              disabled={mutation.status === 'pending'} // Comparison to check if it's loading
            >
              <Text style={styles.btnText}>Login</Text>
            </TouchableOpacity>
          </LinearGradient>
          {mutation.status === 'pending' && ( // Use status instead of isLoading
            <Text style={styles.loadingText}>Logging in...</Text>
          )}

          <Text style={styles.orText}>Or Login with:</Text>
          <View style={styles.socialLoginContainer}>
            <TouchableOpacity style={styles.socialBtn}>
              <Icon name="google" size={24} color="#db4437" />
              <Text style={styles.socialText}>Google</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialBtn}>
              <Icon name="linkedin" size={24} color="#0A66C2" />
              <Text style={styles.socialText}>LinkedIn</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialBtn}>
              <Icon name="facebook" size={24} color="#1877F2" />
              <Text style={styles.socialText}>Facebook</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.newUserContainer}>
            <Text style={styles.newUserText}>New user? </Text>
            <TouchableOpacity>
              <Text style={styles.createAccountText}>Create new account</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 24,
    backgroundColor: '#d3d3ff',
  },
  headerlogin: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 50,
  },
  loginText: {
    alignSelf: 'center',
    fontSize: 30,
    fontWeight: 'bold',
    color: '#301934',
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
    color: '#222',
    marginBottom: 8,
  },
  inputControl: {
    height: 50,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    borderRadius: 12,
    fontSize: 15,
    fontWeight: '500',
    color: '#222',
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
    color: 'white',
  },
  orText: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    marginVertical: 20,
    color: '#301934',
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
    color: '#222',
  },
  createAccountText: {
    fontSize: 16,
    color: '#301934',
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
    color: '#301934',
  },
});
