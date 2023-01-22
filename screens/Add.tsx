import React, { useEffect, useState } from 'react'
import styles from './styles'
import { FlatList, Keyboard, TouchableOpacity, View, ScrollView, Alert } from 'react-native'
import { RootTabScreenProps } from '../types';
import { firebase } from '../firebase/config'

import { StyleSheet } from 'react-native';
import { Flex, Box, Surface, Spacer, Button, IconButton, VStack, HStack, Divider, Text, TextInput, ListItem} from "@react-native-material/core";
import { FontAwesome } from '@expo/vector-icons';
import SelectDropdown from 'react-native-select-dropdown'
import { keyboardProps } from 'react-native-web/dist/cjs/modules/forwardedProps';

type userProps = {id:string,fullName:string,email:string}

export default function Add({ route, navigation }) {
    
    const usersRef = firebase.firestore().collection('users')
    const compsRef = firebase.firestore().collection('comps')
    const { username, uid } = route.params
    // console.log("i am :" + username)

    // device code
    const [deviceCode, setDeviceCode] = useState(''); 
    // comp name
    const [compName, setCompName] = useState('');
    // teams
    const [teamInput, setTeamInput] = useState('');
    const [teams, setTeams] = useState<String[]>([]);
    // players
    const [playerInput, setPlayerInput] = useState('')
    const [players, setPlayers] = useState<userProps[]|any>([]) // lmao does this even work
    const [playerMap, setPlayerMap] = useState<{uid:String,team:String}[]>([])

    const onAddTeam = () => {
        if (teamInput && teamInput.length > 0 && teams.length < 4){
            teams.push(teamInput)
            setTeamInput('')
        }
    }
    function onDelTeam(val) {
        let newteams = teams.filter((value, i) => value !== val)
        setTeams(newteams)
    }

    const onAddUser = () => {
        console.log(playerInput)
        if (playerInput && playerInput.length > 0) {
            console.log("looking for user: " + playerInput + " in the database")
            usersRef
                .where('fullName', '==', playerInput)
                .onSnapshot(
                    querySnapshot => {
                        if (!querySnapshot.size) {
                            alert("user not found.")
                        }
                        querySnapshot.forEach(doc => {
                            console.log(doc.id, " => ", doc.data())
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
                        setPlayerInput('')
                    },
                    error => {
                        console.log(error)
                    }
                )
        }
    }
    function onAddPlayerMap(uid, team) {
        // remove player's previous team
        let newPlayerMap = playerMap.filter((value, i) => value.uid !== uid)
        newPlayerMap.push({uid,team})
        setPlayerMap(newPlayerMap)
        console.log(playerMap)
    }
    function onDelPlayer(uid) {
        // remove from players
        let newPlayers:any[] = [] 
        for(let i=0; i<players.length; i++){
            if(players[i].id != uid) {
                newPlayers.push(players[i])
            }
        }
        setPlayers(newPlayers)
        // remove from playerMap
        let newPlayerMap = playerMap.filter((value, i) => value.uid !== uid)
        setPlayerMap(newPlayerMap)
    }

    const onSubmitComp = () => {
        if (players.length > 0 && compName && (players.length == playerMap.length)) {
            let timestamp = firebase.firestore.FieldValue.serverTimestamp();
            // const compName = Math.random().toString(36).slice(2,8)
            const ts = firebase.firestore.Timestamp.now()
            players.forEach(p => {
                const data = {
                    compId: ts.toMillis().toString()+compName,
                    compName: compName,
                    createdAt: timestamp,
                    username: p.fullName,
                    uid: p.id,
                    team: playerMap.find(pm => pm.uid == p.id)?.team
                };
                compsRef
                    .add(data)
                    .then(_doc => {
                        console.log("recorded data")
                        // clear fields
                        setCompName('')
                        setTeams([])
                        setPlayers([])
                        setPlayerMap([])
                        Alert.alert("Swiffin!", "Competition Created")
                    })
                    .catch((error) => {
                        alert(error)
                    });
            })
        }
        else {
            alert("not all competition fields are satisfied. each player must be in a team.")
        }
    }

    // create dynamic team list
    let teamStack: any[] = []
    for(let i=0; i <teams.length; i++) {
        let teamButton = <Button title={teams[i]} color="lightgrey"
            trailing={props => <FontAwesome name="remove" size={24}
                onPress={() => onDelTeam(teams[i])} />}></Button>
        teamStack.push(teamButton)
    }
    // format teams list
    let dataTeams: {title:String}[] = []
    for(let i=0; i<teams.length; i++){
        dataTeams.push({title:teams[i]})
    }
    // create dynamic players list
    let playerStack: any[] = []
    for(let i=0; i <players.length; i++) {
        let playerRow = <HStack fill style={{paddingLeft: 15, marginVertical: 5, backgroundColor: "lightgrey", borderRadius: 5}} >
            <Text variant="h6" style={{textAlignVertical: 'center'}}>{players[i].fullName}</Text>
            <Spacer></Spacer>
            <SelectDropdown 
                data={dataTeams}
                onSelect={(selectedItem, index) => {
                    console.log(selectedItem, index);
                    onAddPlayerMap(players[i].id,selectedItem.title)
                }}
                defaultButtonText={'team'}
                buttonTextAfterSelection={(selectedItem, index) => {
                    return selectedItem.title;
                }}
                rowTextForSelection={(item, index) => {
                    return item.title;
                }}
                buttonStyle={dropdownStyles.dropdown1BtnStyle}
                buttonTextStyle={dropdownStyles.dropdown1BtnTxtStyle}
                renderDropdownIcon={isOpened => {
                    return <FontAwesome name={isOpened ? 'chevron-up' : 'chevron-down'} color={'#444'} size={18} />;
                }}
                dropdownIconPosition={'right'}
                dropdownStyle={dropdownStyles.dropdown1DropdownStyle}
                rowStyle={dropdownStyles.dropdown1RowStyle}
                rowTextStyle={dropdownStyles.dropdown1RowTxtStyle}
                />
            <IconButton icon={props => <FontAwesome name="remove" size={24}/>} 
                            onPress={() => onDelPlayer(players[i].id)}/>
        </HStack>
        playerStack.push(playerRow)
    }


    return (
        <Flex>
            <Box h={35}>{/*Space for top of screen*/}</Box> 
            <Box m={15}>
                <Text variant="h5" style={{marginBottom: 15, fontWeight: "bold"}} color="#00a652">
                    add swiffed device
                </Text>
                <HStack>
                    <TextInput variant='outlined' label='device code' style={{width: "85%"}} color="#00aeee" autoCapitalize='none' autoComplete='off' autoCorrect={false}></TextInput>
                    <Spacer></Spacer>
                    <IconButton icon={props => <FontAwesome name="send" size={32} color="#00a652"/>} 
                            onPress={() => {
                                setDeviceCode('')
                                Keyboard.dismiss()
                                Alert.alert("Swiffed!", "Your device has been added :)")
                            }} />
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
                        <TextInput variant='outlined' label='competition name' style={{width: "100%", marginBottom: 15}} color="#00aeee" autoCapitalize="none" autoCorrect={false}
                                onChangeText={newText => setCompName(newText)} value={compName} ></TextInput>
                        <HStack>
                            <TextInput variant='outlined' label='add teams (max 4)' style={{width: "85%"}} color="#00aeee" autoCapitalize="none" autoCorrect={false}
                                onChangeText={newText => setTeamInput(newText)} 
                                value={teamInput}
                                ></TextInput>

                            <Spacer></Spacer>
                            <IconButton icon={props => <FontAwesome name="plus" size={32} color="#00a652"/>} 
                                    onPress={() => onAddTeam()}/>
                        </HStack>
                        <HStack fill center spacing={10} style={{marginTop: 5}}>
                            {teamStack}
                        </HStack>
                        <Divider style={{marginVertical: 15}}></Divider>

                        {/* PLAYERS */}
                        <HStack>
                            <TextInput variant='outlined' label='add players' style={{width: "85%"}} color="#00aeee"
                            onChangeText={newText => setPlayerInput(newText)} 
                            value={playerInput} autoCapitalize="none" autoCorrect={false}
                            ></TextInput>
                            <Spacer></Spacer>
                            <IconButton icon={props => <FontAwesome name="plus" size={32} color="#00a652"/>} 
                                    onPress={() => onAddUser()}/>
                        </HStack>
                        <>{playerStack}</>
                        <Divider style={{marginVertical: 15}}></Divider>
                        <HStack fill center>
                            <IconButton icon={props => <FontAwesome name="send" size={32} color="#00a652"/>} 
                                    onPress={() => onSubmitComp()}/>
                        </HStack>
                    </Surface>

                </Box>

            <Box h={40}>{/*Space for bottom of screen*/}</Box> 
            </ScrollView>
        </Flex>

    )
}

const dropdownStyles = StyleSheet.create({
    shadow: {
      shadowColor: '#000',
      shadowOffset: {width: 0, height: 6},
      shadowOpacity: 0.1,
      shadowRadius: 10,
      elevation: 10,
    },
    header: {
      flexDirection: 'row',
      height: 50,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#F6F6F6',
    },
    headerTitle: {color: '#000', fontWeight: 'bold', fontSize: 16},
    saveAreaViewContainer: {flex: 1, backgroundColor: '#FFF'},
    viewContainer: {flex: 1, backgroundColor: '#FFF'},
    scrollViewContainer: {
      flexGrow: 1,
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: '10%',
    },
    dropdownsRow: {flexDirection: 'row', paddingHorizontal: '5%'},
  
    dropdown1BtnStyle: {
      flex: 1,
      height: 50,
      backgroundColor: '#FFF',
      borderRadius: 8,
      borderWidth: 1,
      borderColor: '#444',
    },
    dropdown1BtnTxtStyle: {color: '#444', textAlign: 'left'},
    dropdown1DropdownStyle: {backgroundColor: '#EFEFEF'},
    dropdown1RowStyle: {backgroundColor: '#EFEFEF', borderBottomColor: '#C5C5C5'},
    dropdown1RowTxtStyle: {color: '#444', textAlign: 'left'},
    divider: {width: 12},
    dropdown2BtnStyle: {
      flex: 1,
      height: 50,
      backgroundColor: '#FFF',
      borderRadius: 8,
      borderWidth: 1,
      borderColor: '#444',
    },
    dropdown2BtnTxtStyle: {color: '#444', textAlign: 'left'},
    dropdown2DropdownStyle: {backgroundColor: '#EFEFEF'},
    dropdown2RowStyle: {backgroundColor: '#EFEFEF', borderBottomColor: '#C5C5C5'},
    dropdown2RowTxtStyle: {color: '#444', textAlign: 'left'},
  });