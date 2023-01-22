import React, { useEffect, useState } from 'react'
import styles from './styles'
import { FlatList, Keyboard, TouchableOpacity, View, ScrollView } from 'react-native'
import { RootTabScreenProps } from '../types';
import { firebase } from '../firebase/config'
// import { SelectList } from 'react-native-dropdown-select-list'

import { Flex, Box, Surface, Spacer, Button, IconButton, VStack, HStack, Divider, Text, TextInput, ListItem} from "@react-native-material/core";
import { FontAwesome } from '@expo/vector-icons';
import SelectDropdown from 'react-native-select-dropdown'

type userProps = {id:string,fullName:string,email:string}

export default function Add({ route, navigation }) {
    const [inputText, setInputText] = useState('')
    const [players, setPlayers] = useState<userProps[]|any>([]) // lmao does this even work
    const usersRef = firebase.firestore().collection('users')
    const compsRef = firebase.firestore().collection('comps')
    const { username, uid } = route.params
    // const dropdowns = [
    //     {key: '1', value: 1},
    //     {key: '2', value: 2},
    //     {key: '3', value: 3},
    //     {key: '4', value: 4}
    // ]

    const [teamInput, setTeamInput] = useState('');
    const [teams, setTeams] = useState<String[]>([]);

    console.log(username)
    console.log(uid)

    const onAddUser = () => {
        if (inputText && inputText.length > 0) {
            console.log("looking for user: " + inputText + " in the database")
            usersRef
                .where('fullName', '==', inputText)
                .onSnapshot(
                    querySnapshot => {
                        querySnapshot.forEach(doc => {
                            console.log(doc.id, " => ", doc.data())
                            setInputText('')
                            Keyboard.dismiss()
                            const player = doc.data()
                            player.id = doc.id
                            if (players.indexOf(player.fullName) != -1) {
                                alert("already added")
                            } else {
                                players.push(player)
                                console.log("added player to comp, length= " + players.length)
                            }
                        });
                        setPlayers(players)
                    },
                    error => {
                        console.log(error)
                    }
                )
        }
    }

    const onAddTeam = () => {
        if (teams.length < 4){
            teams.push(teamInput)
            setTeamInput('')
        }
    }
    function onDelTeam(val) {
        let newteams = teams.filter((value, i) => value !== val)
        setTeams(newteams)
    }

    const onSubmitButtonPress = () => {
        if (players.length > 0) {
            const timestamp = firebase.firestore.FieldValue.serverTimestamp();
            const compName = Math.random().toString(36).slice(2,8)
            players.forEach(p => {
                const data = {
                    compName: compName,
                    createdAt: timestamp,
                    username: p.fullName,
                    uid: p.id,
                    team: "TODO"
                };
                compsRef
                    .add(data)
                    .then(_doc => {
                        console.log("recorded data")
                    })
                    .catch((error) => {
                        alert(error)
                    });
    
            })
        }
    }

    const renderPlayer = ({item, index}) => {
        return (
            <View style={styles.formContainer}>
                <Text style={styles.entityText}>
                    {item.fullName}
                </Text>
                <TextInput
                    name={item.fullName}
                    onChange = {(e) => handleAssignTeam(e)}
                    style={styles.input}
                    placeholder='Enter team number'
                    placeholderTextColor="#aaaaaa"
                />
            </View>
        )
    }


    // create the lists
    let teamStack: any[] = []
    for(let i=0; i <teams.length; i++) {
        let teamButton = <Button title={teams[i]} color="lightgrey"
            trailing={props => <FontAwesome name="remove" size={24}
                onPress={() => onDelTeam(teams[i])} />}></Button>
        teamStack.push(teamButton)
    }


    return (
        <Flex>
            <Box h={35}>{/*Space for top of screen*/}</Box> 
            <Box m={15}>
                <Text variant="h5" style={{marginBottom: 15, fontWeight: "bold"}} color="#00a652">
                    add swiffed device
                </Text>
                <HStack>
                    <TextInput variant='outlined' label='TBD' style={{width: "85%"}}></TextInput>
                    <Spacer></Spacer>
                    <IconButton icon={props => <FontAwesome name="send" size={32} color="#00a652"/>} 
                            onPress={() => null}/>
                </HStack>
            </Box>
            
            

            <Divider style={{marginBottom: 15}}></Divider>
            <ScrollView>
                <Box m={15}>
                    <Text variant="h5" style={{marginBottom: 15, fontWeight: "bold"}} color="#00a652">
                        add competition
                    </Text>

                    {/* TEAMS */}
                    <Surface elevation={2} style={{ padding: 15, width: 'auto', height: 'auto', borderRadius: 5 }}>
                        <TextInput variant='outlined' label='competition name' style={{width: "100%", marginBottom: 15}} color="#00aeee"></TextInput>
                        <HStack>
                            <TextInput variant='outlined' label='add teams (max 4)' style={{width: "85%"}} color="#00aeee"
                                onChangeText={newText => setTeamInput(newText)} 
                                value={teamInput}
                                ></TextInput>

                            <Spacer></Spacer>
                            <IconButton icon={props => <FontAwesome name="plus" size={32} color="#00a652"/>} 
                                    onPress={() => onAddTeam()}/>
                        </HStack>
                        <HStack fill center spacing={5}>
                            {teamStack}
                        </HStack>
                        <Divider style={{marginVertical: 15}}></Divider>

                        {/* PLAYERS */}
                        <HStack>
                            <TextInput variant='outlined' label='add players' style={{width: "85%"}} color="#00aeee"></TextInput>
                            <Spacer></Spacer>
                            <IconButton icon={props => <FontAwesome name="plus" size={32} color="#00a652"/>} 
                                    onPress={() => onAddUser}/>
                        </HStack>
                        <>{}</>
                        <Divider style={{marginVertical: 15}}></Divider>
                        <HStack fill center>
                            <IconButton icon={props => <FontAwesome name="send" size={32} color="#00a652"/>} 
                                    onPress={() => null}/>
                        </HStack>
                    </Surface>
                    


                </Box>
            
                
            <Box h={40}>{/*Space for bottom of screen*/}</Box> 
            </ScrollView>
        </Flex>







        
        // <View style={styles.container}>
        //     <View style={styles.formContainer}>
        //         <TextInput
        //             style={styles.input}
        //             placeholder='Add new entity'
        //             placeholderTextColor="#aaaaaa"
        //             onChangeText={(text) => setInputText(text)}
        //             value={inputText}
        //             underlineColorAndroid="transparent"
        //             autoCapitalize="none"
        //         />
        //         <TouchableOpacity style={styles.button} onPress={onAddButtonPress}>
        //             <Text style={styles.buttonText}>Add</Text>
        //         </TouchableOpacity>
        //         <View style={styles.container}>
        //             <TouchableOpacity style={styles.button} onPress={onSubmitButtonPress}>
        //                 <Text style={styles.buttonText}>Submit</Text>
        //             </TouchableOpacity>
        //         </View>
        //     </View>
        //     { players && (
        //         <View style={styles.listContainer}>
        //             <FlatList
        //                 data={players}
        //                 renderItem={renderPlayer}
        //                 keyExtractor={(item) => item.fullName}
        //                 removeClippedSubviews={true}
        //             />
        //         </View>
        //     )}

        //     <Box h={40}>{/*Space for bottom of screen*/}</Box> 
        // </View>
    )
}