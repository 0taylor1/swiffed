import React from "react";
import { StyleSheet, ScrollView } from 'react-native';
import { RootTabScreenProps } from '../types';

import { FontAwesome } from '@expo/vector-icons';

import { View } from "react-native";
import { Flex, Box, Surface, Spacer, HStack, VStack, Text, Divider } from "@react-native-material/core";

// https://gifted-charts.web.app/barchart
import { BarChart } from "react-native-gifted-charts";
const barData = [
    {value: 745, label: 'Tay', frontColor: '#00FF00'},
    {value: 500, label: 'Han'},
    {value: 250, label: 'Jac'},
];

export default function Home({ navigation }: RootTabScreenProps<'Home'>) {
    return (
        <Flex>
            <Box h={35}>{/*Space for top of screen*/}</Box> 
            <ScrollView>
                {/* FAV COMP */}
                <Surface elevation={2} style={{ marginHorizontal: 15, marginBottom: 15, padding: 15, 
                    width: 'auto', height: 'auto', borderRadius: 5 }}>
                        <HStack fill>
                            <Text variant="h4" style={{marginBottom: 10, fontWeight: "bold"}}>
                                Strathmore!
                            </Text>
                            <Spacer></Spacer>
                            <FontAwesome name="heart" size={32} color="red"/>
                        </HStack>
                    
                        <Divider></Divider>
                        <Box m={5}>
                            <BarChart
                                horizontal
                                barWidth={20}
                                barBorderRadius={4}
                                frontColor="lightgray"
                                data={barData}
                                hideYAxisText
                                hideRules
                            />
                        </Box>
                </Surface>

                {/* FAV COMP */}
                <Surface elevation={2} style={{ marginHorizontal: 15, marginBottom: 15, padding: 15, 
                    width: 'auto', height: 'auto', borderRadius: 5 }}>
                        <Text variant="h4" style={{marginBottom: 10, fontWeight: "bold"}}>
                            Strathmore!
                        </Text>
                        <Divider></Divider>
                        <Box m={10}>
                            <BarChart
                                horizontal
                                disableScroll
                                barWidth={20}
                                barBorderRadius={4}
                                frontColor="lightgray"
                                data={barData}
                                yAxisThickness={0}
                                xAxisThickness={0}
                                showVerticalLines={false}
                                hideYAxisText
                                hideRules
                            />
                        </Box>
                </Surface>
                
                
                <Box h={40}>{/*Space for bottom of screen*/}</Box> 
            </ScrollView>
        </Flex>
        
    );
  }