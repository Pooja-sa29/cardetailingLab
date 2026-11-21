import React from "react";
import { NavigationContainer, DarkTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../theme/theme";

import RegistrationScreen from "../screens/RegistrationScreen";
import LoginScreen from "../screens/LoginScreen";
import DashboardScreen from "../screens/DashboardScreen";
import CustomerListScreen from "../screens/CustomerListScreen";
import CustomerDetailsScreen from "../screens/CustomerDetailsScreen";
import AddCustomerScreen from "../screens/AddCustomerScreen";
import VehicleListScreen from "../screens/VehicleListScreen";
import VehicleDetailsScreen from "../screens/VehicleDetailsScreen";
import AddVehicleScreen from "../screens/AddVehicleScreen";

const AuthStack = createNativeStackNavigator();
const RootStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const CustomersStack = createNativeStackNavigator();
const VehiclesStack = createNativeStackNavigator();

const screenOptions = {
  headerStyle: { backgroundColor: colors.background },
  headerTintColor: colors.text,
  headerShadowVisible: false,
  headerTitleStyle: { fontWeight: "700" },
  contentStyle: { backgroundColor: colors.background },
};

function CustomersStackNavigator() {
  return (
    <CustomersStack.Navigator screenOptions={screenOptions}>
      <CustomersStack.Screen
        name="CustomerList"
        component={CustomerListScreen}
        options={{ headerShown: false }}
      />
      <CustomersStack.Screen
        name="CustomerDetails"
        component={CustomerDetailsScreen}
        options={{ title: "Customer" }}
      />
      <CustomersStack.Screen
        name="AddCustomer"
        component={AddCustomerScreen}
        options={{ title: "New Customer", presentation: "modal" }}
      />
      <CustomersStack.Screen
        name="AddVehicle"
        component={AddVehicleScreen}
        options={{ title: "New Vehicle", presentation: "modal" }}
      />
      <CustomersStack.Screen
        name="VehicleDetails"
        component={VehicleDetailsScreen}
        options={{ title: "Vehicle" }}
      />
    </CustomersStack.Navigator>
  );
}

function VehiclesStackNavigator() {
  return (
    <VehiclesStack.Navigator screenOptions={screenOptions}>
      <VehiclesStack.Screen
        name="VehicleList"
        component={VehicleListScreen}
        options={{ headerShown: false }}
      />
      <VehiclesStack.Screen
        name="VehicleDetails"
        component={VehicleDetailsScreen}
        options={{ title: "Vehicle" }}
      />
      <VehiclesStack.Screen
        name="AddVehicle"
        component={AddVehicleScreen}
        options={{ title: "New Vehicle", presentation: "modal" }}
      />
      <VehiclesStack.Screen
        name="CustomerDetails"
        component={CustomerDetailsScreen}
        options={{ title: "Customer" }}
      />
    </VehiclesStack.Navigator>
  );
}

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopColor: colors.border,
          height: 62,
          paddingBottom: 8,
          paddingTop: 6,
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textFaint,
        tabBarLabelStyle: { fontSize: 11, fontWeight: "600" },
        tabBarIcon: ({ color, size, focused }) => {
          const icons = {
            Dashboard: focused ? "grid" : "grid-outline",
            Customers: focused ? "people" : "people-outline",
            Vehicles: focused ? "car-sport" : "car-sport-outline",
          };
          return <Ionicons name={icons[route.name]} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Dashboard" component={DashboardScreen} />
      <Tab.Screen name="Customers" component={CustomersStackNavigator} />
      <Tab.Screen name="Vehicles" component={VehiclesStackNavigator} />
    </Tab.Navigator>
  );
}

const navTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: colors.background,
    card: colors.surface,
    text: colors.text,
    border: colors.border,
    primary: colors.primary,
  },
};

export default function AppNavigator() {
  return (
    <NavigationContainer theme={navTheme}>
      <RootStack.Navigator screenOptions={{ headerShown: false }}>
        <RootStack.Screen name="Login" component={LoginScreen} />
        <RootStack.Screen name="Registration" component={RegistrationScreen} />
        <RootStack.Screen name="Main" component={MainTabs} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}
