import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';

import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { 
  LoginScreen, HomeScreen, RegistrationScreen, 
  TabOneScreen, TabTwoScreen, 
  ModalScreen
} from './screens'
import { firebase } from './firebase/config'

import React, { useEffect, useState } from 'react'
import {decode, encode} from 'base-64'
if (!global.btoa) { global.btoa = encode }
if (!global.atob) { global.atob = decode }

const Stack = createStackNavigator();

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)

  useEffect(() => {
    const usersRef = firebase.firestore().collection('users');
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        usersRef
          .doc(user.uid)
          .get()
          .then((document) => {
            const userData = document.data()
            setLoading(false)
            setUser(userData)
          })
          .catch((error) => {
            setLoading(false)
          });
      } else {
        setLoading(false)
      }
    });
  }, []);
  
  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <NavigationContainer independent={true}>
            { user ? (
                <Navigation colorScheme={colorScheme} />
            ) : (
              <Stack.Navigator>
                <>
                  <Stack.Screen name="Login" component={LoginScreen} />
                  <Stack.Screen name="Registration" component={RegistrationScreen} />
                </>
              </Stack.Navigator>
            )}
        </NavigationContainer>
      </SafeAreaProvider>
    );
  }
}
