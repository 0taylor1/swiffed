import React from "react";
import { StyleSheet, ScrollView } from 'react-native';
import { RootTabScreenProps } from '../types';

import { View } from "react-native";
import { Flex, Box, Surface, Spacer, VStack, Text } from "@react-native-material/core";

// https://gifted-charts.web.app/barchart
import { BarChart } from "react-native-gifted-charts";
const barData = [
    {value: 250, label: 'M'},
    {value: 500, label: 'T', frontColor: '#177AD5'},
    {value: 745, label: 'W', frontColor: '#177AD5'},
    {value: 320, label: 'T'},
    {value: 600, label: 'F', frontColor: '#177AD5'},
    {value: 256, label: 'S'},
    {value: 300, label: 'S'},
];

export default function Home({ navigation }: RootTabScreenProps<'Home'>) {
    return (
        <Flex>
            <Box h={30}>{/*Space for top of screen*/}</Box> 
            <ScrollView>
                
                {/* FAV COMP */}
                <Surface elevation={2} style={{ marginHorizontal: 15, marginBottom: 15, width: 'auto', height: 'auto', borderRadius: 5 }}>
                    <VStack m={4} spacing={6}>
                    <BarChart
                        barWidth={22}
                        noOfSections={3}
                        barBorderRadius={4}
                        frontColor="lightgray"
                        data={barData}
                        yAxisThickness={0}
                        xAxisThickness={0}
                    />
                    </VStack>
                </Surface>
                
                
                <Box h={40}>{/*Space for bottom of screen*/}</Box> 
            </ScrollView>
        </Flex>
        
    );
  }