import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet } from "react-native";
import React from "react";
import HomeScreen from "../screens/home/HomeScreen";
import CreateScreen from "../screens/create/CreateScreen";
import ProfileScreen from "../screens/profile/ProfileScreen";
import Icon from "../components/Icon";

const Tab = createBottomTabNavigator();

const RootNavigation = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            const getIconName = () => {
              if (route.name === "Home") {
                return "house";
              } else if (route.name === "Create") {
                return "pencil";
              }
              return "user";
            };

            return <Icon name={getIconName()} size={size} color={color} />;
          },
        })}>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Create" component={CreateScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigation;

const styles = StyleSheet.create({});
