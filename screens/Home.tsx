import React, {useContext} from "react";
import { StyleSheet, ScrollView } from 'react-native';
import { RootTabScreenProps } from '../types';

import { FontAwesome } from '@expo/vector-icons';

import { View } from "react-native";
import { Flex, Box, Surface, Spacer, HStack, VStack, Text, Divider } from "@react-native-material/core";

import {useState, useEffect} from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { firebase } from '../firebase/config'

// https://gifted-charts.web.app/barchart
import { BarChart, PieChart} from "react-native-gifted-charts";
import { UserInterfaceIdiom } from "expo-constants";


const barData = [
    {value: 745, label: 'Taylor', frontColor: '#00FF00'},
    {value: 500, label: 'Hannah'},
    {value: 250, label: 'Jacobi'},
];

const barData2 = [
    {value: 250, label: 'M'},
                {value: 500, label: 'T', frontColor: '#177AD5'},
                {value: 745, label: 'W', frontColor: '#177AD5'},
                {value: 320, label: 'T'},
                {value: 600, label: 'F', frontColor: '#177AD5'},
                {value: 256, label: 'S'},
                {value: 300, label: 'S'},
];


export default function Home({ route, navigation }) {
    const { itemId, user } = route.params;

    // async func to get localStorage user
    const [aUser, setAUser] = useState({id:'',fullName:'',email:''});
    const getUser = async () => {
        try {
        const jsonValue = await AsyncStorage.getItem('@storage_User')
        let val = jsonValue != null ? JSON.parse(jsonValue) : null;
        if (!val) {
            throw Error(val)
        }
        setAUser(val)
        } catch(e) {
        alert(e)
        }
    }
    // get user
    useEffect(() => {
        getUser();
        getFav();
        fetchComps();
    }, []);

    // async func to get localStorage user Favorite
    const [aFav, setAFav] = useState('');
    const getFav = async () => {
        try {
        let val = await AsyncStorage.getItem('@storage_Fav')
        val = val?val:''
        setAFav(val)
        } catch(e) {
        // alert(e)
        }
    }
    // query favorite competitions
    const [compsFav, setCompsFav] = useState<CompProps[]>([])
    const compsRef = firebase.firestore().collection('comps')
    const fetchComps = () => {
        console.log("fetch comps")
        compsRef.where("compId", "==", aFav)            
            .onSnapshot(
                snapshot => {
                    const listofcomps:CompProps[] = []
                    snapshot.forEach(doc => {
                        const comp = doc.data()
                        let compProps:CompProps = {
                            compId: comp.compId,
                            compName: comp.compName,
                            createdAt: comp.createdAt,
                            team: comp.team,
                            uId: comp.uid,
                            username: comp.username,
                        }
                        listofcomps.push(compProps)
                    });
                    setCompsFav(listofcomps)
                },
                error => {
                    console.log(error)
                }
            )
    }

    // query team stats
    const [teamsFav,setTeamsFav] = useState<String[]>([])
    const [teamsStat,setTeamsStat] = useState<Number[]>([])
    const sessionsRef = firebase.firestore().collection('sessions')
    compsFav.forEach(comp => {
        if(teamsFav.indexOf(comp.team)<0) {teamsFav.push(comp.team)}
        sessionsRef.where("username","==",comp.username).where("startTime",">=",comp.createdAt)
            .onSnapshot(
                snapshot => {
                    snapshot.forEach(doc => {
                        const sess = doc.data()
                        teamsStat[teamsFav.indexOf(comp.team)] += sess.distance 
                        // double check this works
                    });
                },
                error => {
                    console.log(error)
                }
            )
    })

    console.log(teamsStat)

    // query personal stats
    const [usersFav,setUsersFav] = useState<String[]>([])
    const [persStat,setPersStat] = useState<Number[]>([])
    compsFav.forEach(comp => {
        if(usersFav.indexOf(comp.username)<0) {usersFav.push(comp.username)}
        sessionsRef.where("username","==",comp.username).where("startTime",">=",comp.createdAt)
            .onSnapshot(
                snapshot => {
                    snapshot.forEach(doc => {
                        const sess = doc.data()
                        console.log(sess.distance)
                        persStat[usersFav.indexOf(comp.username)] += sess.distance 
                        // double check this works
                    });
                },
                error => {
                    console.log(error)
                }
            )
    })

    console.log(persStat)

    // alert(faUser.fullName)

    return (
        <Flex>
            <Box h={35}>{/*Space for top of screen*/}</Box> 
            <Text variant="h5" style={{margin: 15, fontWeight: "bold"}} color="#00a652">
                welcome {aUser.fullName} !!
            </Text>
            <Divider style={{marginBottom: 15}}></Divider>

            <ScrollView>
                {/* FAV COMP */}
                <Surface elevation={2} style={{ marginHorizontal: 15, marginBottom: 15, padding: 15, 
                    width: 'auto', height: 'auto', borderRadius: 5 }}>
                        <HStack fill>
                            <Text variant="h5" style={{marginBottom: 10, fontWeight: "bold"}}>
                                Strathmore!
                            </Text>
                            <Spacer></Spacer>
                            <FontAwesome name="heart" size={32} color="red"/>
                        </HStack>
                    
                        <Divider style={{marginBottom: 10}}></Divider>
                        <Flex shrink={1} m={10} style={{justifyContent: 'center', alignItems: 'center'}}>
                            <BarChart
                                horizontal
                                // barWidth={20}
                                barBorderRadius={5}
                                frontColor="lightgray"
                                data={barData}
                                yAxisThickness={0}
                                xAxisThickness={0}
                                hideYAxisText
                                hideRules
                                disableScroll={true}
                            />
                        </Flex>
                </Surface>

                {/* FAV COMP */}
                <Surface elevation={2} style={{ marginHorizontal: 15, marginBottom: 15, padding: 15, 
                    width: 'auto', height: 'auto', borderRadius: 5 }}>
                        <HStack fill>
                            <Text variant="h5" style={{marginBottom: 10, fontWeight: "bold"}}>
                                DAYS!
                            </Text>
                            <Spacer></Spacer>
                            <FontAwesome name="heart" size={32} color="red"/>
                        </HStack>
                    
                        <Divider style={{marginBottom: 10}}></Divider>
                        <Flex shrink={1} m={10} style={{justifyContent: 'center', alignItems: 'center'}}>
                            <BarChart
                                horizontal
                                // width={barData2.length*90}
                                // barWidth={20}
                                barBorderRadius={5}
                                frontColor="lightgray"
                                data={barData2}
                                yAxisThickness={0}
                                xAxisThickness={0}
                                hideYAxisText
                                hideRules
                                disableScroll={true}
                            />
                        </Flex>
                </Surface>

                {/* FAV COMP */}
                <Surface elevation={2} style={{ marginHorizontal: 15, marginBottom: 15, padding: 15, 
                    width: 'auto', height: 'auto', borderRadius: 5 }}>
                        <Text variant="h5" style={{marginBottom: 10, fontWeight: "bold"}}>
                            Donut vs Hole!
                        </Text>
                        <Divider style={{marginBottom: 10}}></Divider>
                        <Flex shrink={1} m={10} style={{justifyContent: 'center', alignItems: 'center'}}>
                        <PieChart
                            donut
                            innerRadius={80}
                            data={barData}
                            centerLabelComponent={() => {
                            return <Text style={{fontSize: 30}}></Text>;
                            }}
                        />
                        </Flex>
                </Surface>
                
                
                <Box h={40}>{/*Space for bottom of screen*/}</Box> 
            </ScrollView>
        </Flex>
        
    );
  }

  export type CompProps = {
    compId: string;
    compName: string;
    createdAt: string;
    team: string;
    uId: string;
    username;
}