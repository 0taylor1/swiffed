import React from "react";
import { StyleSheet, ScrollView } from 'react-native';
import { RootTabScreenProps } from '../types';

import { View } from "react-native";
import { Flex, Box, Surface, Spacer, VStack, Text } from "@react-native-material/core";



export default function Add({ navigation }: RootTabScreenProps<'Add'>) {
    return(
        <Flex>
            <Box h={30}>{/*Space for top of screen*/}</Box> 
            <ScrollView>
                
                {/* FAV COMP */}
                <Surface elevation={2} style={{ marginHorizontal: 15, marginBottom: 15, padding: 15, width: 'auto', height: 'auto', borderRadius: 5 }}>
                    <VStack m={4} spacing={6}>
                        <Box style={{overflow:'visible'}}>
                            <Text>Add Comp</Text>
                        </Box>

                    </VStack>
                </Surface>
                
                
                <Box h={40}>{/*Space for bottom of screen*/}</Box> 
            </ScrollView>
        </Flex>
    );
}