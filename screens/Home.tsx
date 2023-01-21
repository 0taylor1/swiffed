import React from "react";
import { StyleSheet, ScrollView } from 'react-native';
import { RootTabScreenProps } from '../types';

import { View } from "react-native";
import { Flex, Box, Surface, Spacer, VStack, Text } from "@react-native-material/core";

export default function Home({ navigation }: RootTabScreenProps<'Home'>) {
    return (
        <Flex>
            <Box h={30}>{/*Space for top of screen*/}</Box> 
            <ScrollView>
                
                {/* FAV COMP */}
                <Surface elevation={2} style={{ marginHorizontal: 15, marginBottom: 15, width: 'auto', height: 'auto', borderRadius: 5 }}>
                    <VStack m={4} spacing={6}>
                        <View style={{ width: 40, height: 40, backgroundColor: "#faf089" }} />
                        <View style={{ width: 40, height: 40, backgroundColor: "#ff6347" }} />
                        <View style={{ width: 40, height: 40, backgroundColor: "#fed7e2" }} />
                    </VStack>
                </Surface>
                
                
                <Box h={40}>{/*Space for bottom of screen*/}</Box> 
            </ScrollView>
        </Flex>
        
    );
  }