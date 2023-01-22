import React from "react";
import { StyleSheet, ScrollView } from 'react-native';
import { RootTabScreenProps } from '../types';
import { FontAwesome } from '@expo/vector-icons';

import { View } from "react-native";
import { Flex, Box, Surface, Spacer, HStack, VStack, Text, Divider, Button, IconButton, FAB, Stack } from "@react-native-material/core";


export default function Compete({ navigation }: RootTabScreenProps<'Compete'>) {
    return(
        <Flex>
            <Box h={30}>{/*Space for top of screen*/}</Box> 
            <Text variant="h5" style={{margin: 15, fontWeight: "bold"}}>
                Your Competitions
            </Text>
            <Divider style={{marginBottom: 15}}></Divider>
            <ScrollView>
                
                {/* FAV COMP */}
                <Surface elevation={2} style={{ marginHorizontal: 15, marginBottom: 15, padding: 15, 
                    width: 'auto', height: 'auto', borderRadius: 5 }}>
                    <HStack fill>
                        <Text variant="h6" style={{marginBottom: 10, fontWeight: "bold"}}>
                            Strathmore!
                        </Text>
                        <Spacer></Spacer>
                        <IconButton icon={props => <FontAwesome name="heart" size={32} color="red"/>} />
                    </HStack>
                </Surface>

                {/* FAV COMP */}
                <Surface elevation={2} style={{ marginHorizontal: 15, marginBottom: 15, padding: 15, 
                    width: 'auto', height: 'auto', borderRadius: 5 }}>
                    <HStack fill>
                        <Text variant="h6" style={{marginBottom: 10, fontWeight: "bold"}}>
                            DAYS!
                        </Text>
                        <Spacer></Spacer>
                        <IconButton icon={props => <FontAwesome name="heart" size={32} color="lightgrey"/>} />
                    </HStack>
                </Surface>

                <Surface elevation={2} style={{ marginHorizontal: 15, marginBottom: 15, padding: 15, 
                    width: 'auto', height: 'auto', borderRadius: 5 }}>
                    <HStack fill>
                        <Text variant="h6" style={{marginBottom: 10, fontWeight: "bold"}}>
                            Donut vs. Hole!
                        </Text>
                        <Spacer></Spacer>
                        <IconButton icon={props => <FontAwesome name="heart" size={32} color="lightgrey"/>} />
                    </HStack>
                </Surface>
            
                
                <Box h={40}>{/*Space for bottom of screen*/}</Box> 
            </ScrollView>
            <Spacer></Spacer>
                <Stack fill center>
                    <FAB
                    variant="extended"
                    icon={props => <FontAwesome name="heart" size={32} color="lightgrey"/>}
                    label="navigate"
                    color="primary"
                    />
                </Stack>
        </Flex>
    );
}