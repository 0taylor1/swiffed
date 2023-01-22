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
import Compview from '../screens/CompView';
import NotFoundScreen from '../screens/NotFoundScreen';
import TabOneScreen from '../screens/TabOneScreen';
import TabTwoScreen from '../screens/TabTwoScreen';
import TabThreeScreen from '../screens/TabTwoScreen'; // TODO
import { LoginScreen, HomeScreen, RegistrationScreen } from '../screens';

import Home from '../screens/Home';
import Compete from '../screens/Compete';
import Add from '../screens/Add';


import { useEffect, useState, useRef } from 'react'
import { firebase } from '../firebase/config'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { RootStackParamList, RootTabParamList, RootTabScreenProps } from '../types';
import LinkingConfiguration from './LinkingConfiguration';
import { TabRouter } from 'react-navigation';

// push notifications
import * as Notifications from 'expo-notifications';
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true
  }),
});

export default function Navigation() {
  // notifications
  const notificationListener = useRef();
  const responseListener = useRef();

  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)
  const colorScheme = useColorScheme();
  
  useEffect(() => {
    // notification token
    registerForPushNotificationsAsync()
      .then(token => expoPushTokensApi.register(token));

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

  async function registerForPushNotificationsAsync() {
    let token;

    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
    }
    if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);

    return token;
  }
  
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
          <Stack.Screen name="Login" component={LoginScreen} options={{headerShown: false}}/>
          <Stack.Screen name="Registration" component={RegistrationScreen} options={{headerShown: false}}/>
          <Stack.Screen name="Home" options={{headerShown: false}}>
            {/* (component={BottomTabNavigator} options={{ headerShown: false }} />) */
              (props) => <BottomTabNavigator {...user} options={{ headerShown: false }}/>
            }
          </Stack.Screen> 
          <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
          <Stack.Group screenOptions={{ presentation: 'modal' }}>
            <Stack.Screen name="CompView" component={Compview} options={{ title: 'CompView', headerShown: false}}/>
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
        initialParams={{
          username: user.fullName,
          uid: user.uid
        }}
      />
      <BottomTab.Screen
        name="Compete"
        component={Compete}
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => <TabBarIcon name="flag-checkered" color={color} />,
        }}
        initialParams={{
          username: user.fullName,
          uid: user.uid
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
        initialParams={{
          username: user.fullName,
          uid: user.uid
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
