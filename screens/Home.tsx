import React, {useContext} from "react";
import { StyleSheet, ScrollView } from 'react-native';
import { RootTabScreenProps } from '../types';

import { View } from "react-native";
import { Flex, Box, Surface, Spacer, VStack, Text } from "@react-native-material/core";

// https://gifted-charts.web.app/barchart
import { BarChart } from "react-native-gifted-charts";
import { UserInterfaceIdiom } from "expo-constants";
const barData = [
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
    return (
        <Flex>
            <Box h={30}>{/*Space for top of screen*/}</Box> 
            <View><Text style={{fontSize:20, fontWeight:'bold'}}>{user.fullName}</Text></View>
            <ScrollView>
                
                {/* FAV COMP */}
                <Surface elevation={2} style={{ marginHorizontal: 15, marginBottom: 15, padding: 15, width: 'auto', height: 'auto', borderRadius: 5 }}>
                    <VStack m={4} spacing={6}>
                        <Box style={{overflow:'visible'}}>
                            <BarChart
                                horizontal
                                barWidth={22}
                                noOfSections={3}
                                barBorderRadius={4}
                                frontColor="lightgray"
                                data={barData}
                                yAxisThickness={0}
                                xAxisThickness={0}
                            />
                        </Box>

                    </VStack>
                </Surface>
                
                
                <Box h={40}>{/*Space for bottom of screen*/}</Box> 
            </ScrollView>
        </Flex>
        
    );
  }