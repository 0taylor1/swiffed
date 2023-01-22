import React, {useContext} from "react";
import { StyleSheet, ScrollView } from 'react-native';
import { RootTabScreenProps } from '../types';

import { FontAwesome } from '@expo/vector-icons';

import { View } from "react-native";
import { Flex, Box, Surface, Spacer, HStack, VStack, Text, Divider, IconButton} from "@react-native-material/core";

import {useState, useEffect} from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { firebase } from '../firebase/config'

// https://gifted-charts.web.app/barchart
import { BarChart, PieChart} from "react-native-gifted-charts";
import { UserInterfaceIdiom } from "expo-constants";


const barPers = [
    {value: 100, label: 'Taylor', frontColor:'#00A652'},
    {value: 60, label: 'Hannah', color:'#08B2E3'},
    {value: 40, label: 'Jacobi', color:'#EE6352'},
    {value: 25, label: 'Jinny', color:'#484D6D'},
];

const barTeam = [
    {value: 51, label: 'Left Room', color:'#00A652', focused: true, },
    {value: 20, label: 'Cool Room', color:'#08B2E3'},
];


const ovo = [
  {value: 75, label: 'tchung', color:'#00A652', frontColor:'#00A652', focused: true, },
  {value: 70, label: 'tprice', color:'#08B2E3'},
];

export default function ModalScreen({ route, navigation }) {
  const { compId, compName } = route.params

    const renderDot = color => {
      return (
        <View
          style={{
            height: 10,
            width: 10,
            borderRadius: 5,
            backgroundColor: color,
            marginRight: 10,
          }}
        />
      );
    };
  
  if (compName[0] === 'S') {
    return (
      <Flex>
          <Box h={35}>{/*Space for top of screen*/}</Box> 
          <ScrollView>
              {/* FAVORITE */}
              <Surface elevation={2} style={{ margin:15, padding: 15, 
                  width: 'auto', borderRadius: 5 }} >
                  <HStack fill>
                      <VStack fill>
                      <Text variant="h6" style={{marginBottom: 15, fontWeight: "bold"}}>
                          Strathmore Roomies! {}
                      </Text>
                      <Text>
                          Team Room Left
                      </Text>
                      </VStack>
                      
                      <Spacer></Spacer>
                      <IconButton icon={props => <FontAwesome name="heart" size={32} color="red"/>} />
                  </HStack>
              </Surface>

              {/* TEAM VIEW */}
              <Surface elevation={2} style={{ marginHorizontal: 15, marginBottom: 15, padding: 15, 
                  width: 'auto', height: 'auto', borderRadius: 5 }}>
                      <Text variant="h6" style={{marginBottom: 10, fontWeight: "bold"}}>
                          by team
                      </Text>
                  
                      <Divider style={{marginBottom: 10}}></Divider>
                      <Flex shrink={1} m={10} style={{justifyContent: 'center', alignItems: 'center'}}>
                          {/* <BarChart
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
                          /> */}
                              <View style={{padding: 15, alignItems: 'center'}}>
                                  <PieChart
                                  data={barTeam}
                                  donut
                                  sectionAutoFocus
                                  radius={90}
                                  innerRadius={60}
                                  />
                              </View>
                              <View
                              style={{
                                flexDirection: 'row',
                                justifyContent: 'center',
                                marginBottom: 10,
                              }}>
                              <View
                                style={{
                                  flexDirection: 'row',
                                  alignItems: 'center',
                                  width: 120,
                                  marginRight: 20,
                                }}>
                                {renderDot('#00A652')}
                                <Text style={{color: 'black'}}>Room Left</Text>
                              </View>
                              <View
                                style={{flexDirection: 'row', alignItems: 'center', width: 120}}>
                                {renderDot('#08B2E3')}
                                <Text style={{color: 'black'}}>Cool Room</Text>
                              </View>
                            </View>
                      </Flex>
              </Surface>

              {/* PERSONAL VIEW */}
              <Surface elevation={2} style={{ marginHorizontal: 15, marginBottom: 15, padding: 15, 
                  width: 'auto', height: 'auto', borderRadius: 5 }}>
                      <Text variant="h6" style={{marginBottom: 10, fontWeight: "bold"}}>
                          by person
                      </Text>
                  
                      <Divider style={{marginBottom: 10}}></Divider>
                      <Flex shrink={1} m={10} style={{justifyContent: 'center', alignItems: 'center'}}>
                          <BarChart
                              horizontal
                              // width={barData2.length*90}
                              // barWidth={20}
                              maxValue={70}
                              barBorderRadius={5}
                              frontColor="lightgray"
                              data={barPers}
                              yAxisThickness={0}
                              xAxisThickness={0}
                              hideYAxisText
                              hideRules
                              disableScroll={true}
                          />
                      </Flex>
              </Surface>

              <Surface elevation={2} style={{ marginHorizontal: 15, marginBottom: 15, padding: 15, 
                  width: 'auto', height: 'auto', borderRadius: 5 }}>
                      <Text variant="h6" style={{marginBottom: 10, fontWeight: "bold"}}>
                          You swiffed <Text variant="h6" style={{marginBottom: 10, fontWeight: "900", color:"#00a652"}}>0.75 miles</Text> this week!
                      </Text>
              </Surface>

              <Surface elevation={2} style={{ marginHorizontal: 15, marginBottom: 15, padding: 15, 
                  width: 'auto', height: 'auto', borderRadius: 5 }}>
                      <Text variant="h6" style={{marginBottom: 10, fontWeight: "bold"}}>
                          You swiffed <Text variant="h6" style={{marginBottom: 10, fontWeight: "900", color:"#00a652"}}>3.1 times</Text> more than 
                          <Text variant="h6" style={{marginBottom: 10, fontWeight: "900", color:"#00aeee"}}> Jinny</Text> this week!
                      </Text>
              </Surface>
              
              
              <Box h={120}>{/*Space for bottom of screen*/}</Box> 
          </ScrollView>
      </Flex>
      
  );
  } else {
    return (
      <Flex>
          <Box h={35}>{/*Space for top of screen*/}</Box> 
          <ScrollView>
              {/* FAVORITE */}
              <Surface elevation={2} style={{ margin:15, padding: 15, 
                  width: 'auto', borderRadius: 5 }} >
                  <HStack fill>
                      <VStack fill>
                      <Text variant="h6" style={{marginBottom: 15, fontWeight: "bold"}}>
                          loser gets swiffed {'>:)'}
                      </Text>
                      <Text>
                          Team tchung
                      </Text>
                      </VStack>
                      
                      <Spacer></Spacer>
                      <IconButton icon={props => <FontAwesome name="heart" size={32} color="lightgrey"/>} />
                  </HStack>
              </Surface>

              {/* TEAM VIEW */}
              <Surface elevation={2} style={{ marginHorizontal: 15, marginBottom: 15, padding: 15, 
                  width: 'auto', height: 'auto', borderRadius: 5 }}>
                      <Text variant="h6" style={{marginBottom: 10, fontWeight: "bold"}}>
                          by team
                      </Text>
                  
                      <Divider style={{marginBottom: 10}}></Divider>
                      <Flex shrink={1} m={10} style={{justifyContent: 'center', alignItems: 'center'}}>
                              <View style={{padding: 15, alignItems: 'center'}}>
                                  <PieChart
                                  data={ovo}
                                  donut
                                  sectionAutoFocus
                                  radius={90}
                                  innerRadius={60}
                                  />
                              </View>
                              <View
                              style={{
                                flexDirection: 'row',
                                justifyContent: 'center',
                                marginBottom: 10,
                              }}>
                              <View
                                style={{
                                  flexDirection: 'row',
                                  alignItems: 'center',
                                  width: 120,
                                  marginRight: 20,
                                }}>
                                {renderDot('#00A652')}
                                <Text style={{color: 'black'}}>tchung</Text>
                              </View>
                              <View
                                style={{flexDirection: 'row', alignItems: 'center', width: 120}}>
                                {renderDot('#08B2E3')}
                                <Text style={{color: 'black'}}>tprice</Text>
                              </View>
                            </View>
                      </Flex>
              </Surface>

              {/* PERSONAL VIEW */}
              <Surface elevation={2} style={{ marginHorizontal: 15, marginBottom: 15, padding: 15, 
                  width: 'auto', height: 'auto', borderRadius: 5 }}>
                      <Text variant="h6" style={{marginBottom: 10, fontWeight: "bold"}}>
                          by person
                      </Text>
                  
                      <Divider style={{marginBottom: 10}}></Divider>
                      <Flex shrink={1} m={10} style={{justifyContent: 'center', alignItems: 'center'}}>
                          <BarChart
                              horizontal
                              // width={barData2.length*90}
                              maxValue={70}
                              barBorderRadius={5}
                              frontColor="lightgray"
                              data={ovo}
                              yAxisThickness={0}
                              xAxisThickness={0}
                              hideYAxisText
                              hideRules
                              disableScroll={true}
                          />
                      </Flex>
              </Surface>

              <Surface elevation={2} style={{ marginHorizontal: 15, marginBottom: 15, padding: 15, 
                  width: 'auto', height: 'auto', borderRadius: 5 }}>
                      <Text variant="h6" style={{marginBottom: 10, fontWeight: "bold"}}>
                          You swiffed <Text variant="h6" style={{marginBottom: 10, fontWeight: "900", color:"#00a652"}}>0.75 miles</Text> this week!
                      </Text>
              </Surface>

              <Surface elevation={2} style={{ marginHorizontal: 15, marginBottom: 15, padding: 15, 
                  width: 'auto', height: 'auto', borderRadius: 5 }}>
                      <Text variant="h6" style={{marginBottom: 10, fontWeight: "bold"}}>
                          You swiffed <Text variant="h6" style={{marginBottom: 10, fontWeight: "900", color:"#00a652"}}>1.1 times</Text> more than 
                          <Text variant="h6" style={{marginBottom: 10, fontWeight: "900", color:"#00aeee"}}> tprice</Text> this week!
                      </Text>
              </Surface>
              
              
              <Box h={120}>{/*Space for bottom of screen*/}</Box> 
          </ScrollView>
      </Flex>
      
  );
  }
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
