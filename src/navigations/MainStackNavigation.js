import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import MainScreen from "../screen/MainScreen";
import MemoListScreen from "../screen/memo/MemoListScreen";
import ExpenditureNavigation from "./ExpenditureNavigation";
import RipenessScreen from '../screen/ripeness/RipenessScreen';
import RipenessStackNavigation from './RipenessStackNavigation';
import GroupBuyingListScreen from '../screen/groupbuying/GroupBuyingListScreen';

const Stack = createNativeStackNavigator();

const MainStackNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName="Main"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Main" component={MainScreen} />
      <Stack.Screen name="MemoList" component={MemoListScreen} />
      <Stack.Screen name="Expenditure" component={ExpenditureNavigation} />
      <Stack.Screen name="Ripeness" component={RipenessStackNavigation} />
      <Stack.Screen name="GroupBuying" component={GroupBuyingListScreen} />
    </Stack.Navigator>
  );
};

export default MainStackNavigation;