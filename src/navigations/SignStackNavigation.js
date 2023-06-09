import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import OnboardingScreen from "../screen/onboarding/Onboarding";
import PippScreen from "../screen/onboarding/PIPP";
import TcsScreen from "../screen/onboarding/TCS";
import SignUpScreen from "../screen/onboarding/SignUp";
import VerificationScreen from "../screen/onboarding/Verification";
import SignUpFormScreen from "../screen/onboarding/SignUpForm";
import SignInWPasswordScreen from "../screen/onboarding/SignIn";
import SignInWCodeNumScreen from "../screen/onboarding/SignInWCodeNum";


const Stack = createNativeStackNavigator();

const SignStackNavigation = () => {
  
  return (
    <Stack.Navigator
      initialRouteName="Onboarding"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      <Stack.Screen name="TCS" component={TcsScreen} />
      <Stack.Screen name="PIPP" component={PippScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
      <Stack.Screen name="Verify" component={VerificationScreen} />
      <Stack.Screen name="SignUpForm" component={SignUpFormScreen} />
      <Stack.Screen name="SignIn" component={SignInWPasswordScreen} />
      <Stack.Screen name="SignInWCN" component={SignInWCodeNumScreen} />
    </Stack.Navigator>
  );
};

export default SignStackNavigation;