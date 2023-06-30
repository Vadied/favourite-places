import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import AppLoading from "expo-app-loading";

import { RootStackParamList } from "./models";
import { Colors } from "./constants";
import { usePlaces } from "./contexts";
import { AllPlaces, AddPlace, Map, PlaceDetails } from "./screens";
import { IconButton } from "./components/ui";
import Context from "./components/Context";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  const { loading } = usePlaces();

  if (loading) return <AppLoading />;

  return (
    <>
      <StatusBar style="dark" />
      <Context>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerStyle: { backgroundColor: Colors.primary500 },
              headerTintColor: Colors.gray700,
              contentStyle: { backgroundColor: Colors.gray700 },
            }}
          >
            <Stack.Screen
              name="AllPlaces"
              component={AllPlaces}
              options={({ navigation }) => ({
                title: "Your Favorite Places",
                headerRight: ({ tintColor }) => (
                  <IconButton
                    icon="add"
                    size={24}
                    color={tintColor || ""}
                    onPress={() => navigation.navigate("AddPlace")}
                  />
                ),
              })}
            />
            <Stack.Screen
              name="AddPlace"
              component={AddPlace}
              options={{
                title: "Add a new Place",
              }}
            />
            <Stack.Screen name="Map" component={Map} />
            <Stack.Screen name="PlaceDetails" component={PlaceDetails} />
          </Stack.Navigator>
        </NavigationContainer>
      </Context>
    </>
  );
}
