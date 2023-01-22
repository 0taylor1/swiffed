import React from "react";
import { StyleSheet, ScrollView, Alert } from 'react-native';
import { RootTabScreenProps } from '../types';
import { FontAwesome } from '@expo/vector-icons';

import { View } from "react-native";
import { Flex, Box, Surface, Spacer, HStack, VStack, Text, Divider, Button, IconButton, FAB, Stack, Pressable } from "@react-native-material/core";
import {useState, useEffect} from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { firebase } from '../firebase/config'

const listofcomps:CompCardProps[] =[
    {compId:"aa",compName:"c1",team:"A",userFav:"cc"},
    {compId:"bb",compName:"Competition 2",team:"B",userFav:"cc"},
    {compId:"cc",compName:"Battle Royal",team:"A",userFav:"cc"},
    {compId:"dd",compName:"CFour",team:"T",userFav:"cc"},
];

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
        // compsRef
            // .where("username", "==", )
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
        return(
            <Pressable onPress={() => alert(cprops.compName)} style={{ marginHorizontal: 15, marginBottom: 15,}}>
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
    team: string;
    userFav: string;
}