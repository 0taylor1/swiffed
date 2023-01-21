import React from "react";
import { StyleSheet, ScrollView } from 'react-native';
import { RootTabScreenProps } from '../types';

import { FontAwesome } from '@expo/vector-icons';

import { View } from "react-native";
import { Flex, Box, Surface, Spacer, HStack, VStack, Text, Divider } from "@react-native-material/core";

// https://gifted-charts.web.app/barchart
import { BarChart, PieChart} from "react-native-gifted-charts";
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
                                disableScroll={false}
                            />
                        </Flex>
                        <Text>end</Text>
                </Surface>

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
                                disableScroll={false}
                            />
                        </Flex>
                        <Text>end</Text>
                </Surface>

                {/* FAV COMP */}
                <Surface elevation={2} style={{ marginHorizontal: 15, marginBottom: 15, padding: 15, 
                    width: 'auto', height: 'auto', borderRadius: 5 }}>
                        <Text variant="h4" style={{marginBottom: 10, fontWeight: "bold"}}>
                            Strathmore!
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