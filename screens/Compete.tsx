import React from "react";
import { StyleSheet, ScrollView, Alert } from 'react-native';
import { RootTabScreenProps } from '../types';
import { FontAwesome } from '@expo/vector-icons';

import { View } from "react-native";
import { Flex, Box, Surface, Spacer, HStack, VStack, Text, Divider, Button, IconButton, FAB, Stack, Pressable } from "@react-native-material/core";
import {useState, useEffect} from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { firebase } from '../firebase/config'

// const listofcomps:CompCardProps[] =[
//     {compId:"aa",compName:"c1",team:"A",userFav:"cc"},
//     {compId:"bb",compName:"Competition 2",team:"B",userFav:"cc"},
//     {compId:"cc",compName:"Battle Royal",team:"A",userFav:"cc"},
//     {compId:"dd",compName:"CFour",team:"T",userFav:"cc"},
// ];
const listofcomps:CompCardProps[] = []

export default function Compete({ route, navigation }) {
    const { username, uid } = route.params
    console.log("i am : " + username)

    // async func to get localStorage user Favorite
    const [aFav, setAFav] = useState('');
    const getFav = async () => {
        try {
        const val = await AsyncStorage.getItem('@storage_Fav')
        if (!val) {
            throw Error(val?val:"null")
        }
        setAFav(val)
        } catch(e) {
        // alert(e)
        }
    }

    // query user competitions
    const [comps, setComps] = useState([])
    const compsRef = firebase.firestore().collection('comps')
    
    const fetchComps = () => {
        console.log("fetch comps")
        compsRef
            .where("username", "==", username)
            .onSnapshot(
                snapshot => {
                    snapshot.forEach(doc => {
                        console.log(doc.id, " => ", doc.data())
                        const comp = doc.data()
                        const compCardProps:CompCardProps = {
                            compId: comp.compId,
                            compName: comp.compName,
                            createdAt: comp.createdAt,
                            team: comp.team,
                            userFav: getFav()? getFav() : comp.compId
                        }
                        listofcomps.push(compCardProps)
                        console.log("fetched " + comps.length + " competitions")
                    });
                    setComps(listofcomps)
                },
                error => {
                    console.log(error)
                }
            )
    }
    
    // get fav
    useEffect(() => {
        getFav();
        fetchComps();
    }, []);

    // get list of compcards
    let compStack: any[] = [];
    for(let i = 0; i < listofcomps.length; i++) {
        listofcomps[i].userFav=aFav;
        compStack.push(CompCard(listofcomps[i]));
    }

    return(
        <Flex>
            <Box h={35}>{/*Space for top of screen*/}</Box> 
            <Text variant="h5" style={{margin: 15, fontWeight: "bold"}} color="#00a652">
                your competitions
            </Text>
            <Divider style={{marginBottom: 15}}></Divider>
            <ScrollView>
                
            {compStack}
                
            <Box h={40}>{/*Space for bottom of screen*/}</Box> 
            </ScrollView>
        </Flex>
    );

    function CompCard(cprops: CompCardProps) {
        function updateFav(compId, updateState){
            // save to asyncStorage
            const storeFav = async (value) => {
                try {
                    await AsyncStorage.setItem('@storage_Fav', value)
                } catch (e) {
                  alert(e)
                }
              }
            storeFav(compId);
            updateState(compId);
        }
        console.log("Pressed compId " + cprops.compId)
        return(
            <Pressable 
                onPress={() => {
                navigation.navigate('CompView', {compId:cprops.compId, compName: cprops.compName});
                }}>
                <Surface elevation={2} style={{ padding: 15, 
                    width: 'auto', height: 'auto', borderRadius: 5 }}>
                    <HStack fill>
                        <VStack fill>
                        <Text variant="h6" style={{marginBottom: 15, fontWeight: "bold"}}>
                            {cprops.compName}
                        </Text>
                        <Text>
                            Team {cprops.team}
                        </Text>
                        </VStack>
                        
                        <Spacer></Spacer>
                        <IconButton icon={props => <FontAwesome name="heart" size={32} color={(cprops.userFav===cprops.compId)?"red":"lightgrey"}/>} 
                            onPress={() => updateFav(cprops.compId, setAFav)}/>
                    </HStack>
                </Surface>
            </Pressable>
        );
    }
}

type CompCardProps = {
    compId: string;
    compName: string;
    createdAt: string;
    team: string;
    userFav: string;
}

/*
      <BottomTab.Screen
        name="TabOne"
        component={TabOneScreen}
        options={({ navigation }: RootTabScreenProps<'TabOne'>) => ({
          title: 'Tab One',
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
          headerRight: () => (
            <Pressable
              onPress={() => navigation.navigate('Modal')}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
              })}>
              <FontAwesome
                name="info-circle"
                size={25}
                color={Colors[colorScheme].text}
                style={{ marginRight: 15 }}
              />
            </Pressable>
          ),
        })}
      />
*/