import React, { useEffect, useState } from 'react'
import styles from './styles'
import { FlatList, Keyboard, TextInput, TouchableOpacity, View, ScrollView } from 'react-native'
import { RootTabScreenProps } from '../types';
import { firebase } from '../firebase/config'
// import { SelectList } from 'react-native-dropdown-select-list'
import { Flex, Box, Surface, Spacer, VStack, Text } from "@react-native-material/core";



export default function Add({ route, navigation }) {
    const [inputText, setInputText] = useState('')
    const [players, setPlayers] = useState([])
    const usersRef = firebase.firestore().collection('users')
    const compsRef = firebase.firestore().collection('comps')
    const { username, uid } = route.params
    // const dropdowns = [
    //     {key: '1', value: 1},
    //     {key: '2', value: 2},
    //     {key: '3', value: 3},
    //     {key: '4', value: 4}
    // ]
    const [teams, setTeams] = useState([])

    console.log(username)
    console.log(uid)

    const onAddButtonPress = () => {
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
                            if (player.id in players) {
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
    const handleAssignTeam = (e) => {
        console.log("change event detecteds")
        console.log("handling " + e.target + e.text)
        if (e.text && e.text.length > 0) {
            const timestamp = firebase.firestore.FieldValue.serverTimestamp();
            const data = { 
                createdBy: e.target.name,
                createdAt: timestamp
            };
            compsRef
                .add(data)
                .then(_doc => {
                    Keyboard.dismiss()
                    console.log("assign team # " + e.text + " to player " + e.target.name)
                })
                .catch((error) => {
                    alert(error)
                });
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

    return (
        <View style={styles.container}>
            <View style={styles.formContainer}>
                <TextInput
                    style={styles.input}
                    placeholder='Add new entity'
                    placeholderTextColor="#aaaaaa"
                    onChangeText={(text) => setInputText(text)}
                    value={inputText}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TouchableOpacity style={styles.button} onPress={onAddButtonPress}>
                    <Text style={styles.buttonText}>Add</Text>
                </TouchableOpacity>
            </View>
            { players && (
                <View style={styles.listContainer}>
                    <FlatList
                        data={players}
                        renderItem={renderPlayer}
                        keyExtractor={(item) => item.id}
                        removeClippedSubviews={true}
                    />
                </View>
            )}
        </View>
    )
}