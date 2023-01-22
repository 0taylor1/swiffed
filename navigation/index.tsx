/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { FontAwesome } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { ColorSchemeName, Pressable } from 'react-native';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import ModalScreen from '../screens/ModalScreen';
import NotFoundScreen from '../screens/NotFoundScreen';
import TabOneScreen from '../screens/TabOneScreen';
import TabTwoScreen from '../screens/TabTwoScreen';
import TabThreeScreen from '../screens/TabTwoScreen'; // TODO
import { LoginScreen, HomeScreen, RegistrationScreen } from '../screens';

import Home from '../screens/Home';
import Compete from '../screens/Compete';
import Add from '../screens/Add';


import { useEffect, useState } from 'react'
import { firebase } from '../firebase/config'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { RootStackParamList, RootTabParamList, RootTabScreenProps } from '../types';
import LinkingConfiguration from './LinkingConfiguration';
import { TabRouter } from 'react-navigation';
// import SyncStorage from 'sync-storage';

export default function Navigation() {
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)
  const colorScheme = useColorScheme();
  
  // local storage
  // SyncStorage.set('foo', 'bar');
  // const result = SyncStorage.get('foo');
  // console.log(result); // 'bar'

  useEffect(() => {
    const usersRef = firebase.firestore().collection('users');
    firebase.auth().onAuthStateChanged((user: { uid: any; }) => {
      if (user) {
        usersRef
          .doc(user.uid)
          .get()
          .then((document: { data: () => any; }) => {
            const userData = document.data()
            setLoading(false)
            setUser(userData)
          })
          .catch((error: any) => {
            setLoading(false)
          });
      } else {
        setLoading(false)
      }
    });
  }, []);
  
  return (
    <SafeAreaProvider>
      <NavigationContainer
        // independent={true}
        linking={LinkingConfiguration}
        theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
          

        <RootNavigator {...user}/>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator(user) {
  if (true) {
    return (
      <Stack.Navigator>
        <>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Registration" component={RegistrationScreen} />
          <Stack.Screen name="Home">
            {/* (component={BottomTabNavigator} options={{ headerShown: false }} />) */
              (props) => <BottomTabNavigator {...user} options={{ headerShown: false }}/>
            }
          </Stack.Screen> 
          <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
          <Stack.Group screenOptions={{ presentation: 'modal' }}>
            <Stack.Screen name="Modal" component={ModalScreen} />
          </Stack.Group>
        </>
      </Stack.Navigator>
    )
  } 
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();
/*
  {     component={Home}
        options={({ navigation }: RootTabScreenProps<'Home'>) => ({
          headerShown: false,
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />, 
*/

function BottomTabNavigator(user) {
  const colorScheme = useColorScheme();
  // console.log(user) // user data available

  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
      }}>
      <BottomTab.Screen
        name="Home"
        component={Home}
        options={({ navigation }: RootTabScreenProps<'Home'>) => ({
          headerShown: false,
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
        })}
      />
      <BottomTab.Screen
        name="Compete"
        component={Compete}
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => <TabBarIcon name="flag-checkered" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Add"
        component={Add}
        options={{
          title: "Add",
          headerShown: false,
          tabBarIcon: ({ color }) => <TabBarIcon name="plus" color={color} />,
        }}
      />
    </BottomTab.Navigator>
  );
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}
