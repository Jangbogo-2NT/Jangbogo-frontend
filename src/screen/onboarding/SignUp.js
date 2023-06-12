import { useNavigation } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, TextInput, Pressable } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Header from '../../components/Header/Header';

const SignUp = () => {
  const navigation = useNavigation();

  const [isVerifyScreenOpen, setIsVerifyScreenOpen] = useState(false);

  useEffect(() => {
    if (isVerifyScreenOpen) {
      // Verification.js screen 열기
      navigation.navigate("Verify");
    }
  }, [isVerifyScreenOpen]);

  return (
    <View style={styles.container}>
      {/* 회원가입 헤더 */}
      <Header>
        <Header.Title size={18} style={styles.Header}>회원가입</Header.Title>
      </Header>
      {/* 인증번호 타이틀 */}
      <View style={styles.container_title}>
        <Text style={styles.h1}>안녕하세요!👋{"\n"}반가워요🥰</Text>
      </View>
      {/* 휴대폰 번호 입력칸 */}
      <View style={styles.inputContainer}>
        <TextInput style={styles.input}
          keyboardType="numeric"
          maxLength={11}
          placeholder='휴대폰 번호 입력' />
      </View>
      {/* 인증번호 전송 버튼 */}
      <View style={styles.verification_verify}>
        <Pressable
          style={styles.verification_button}
          onPress={setIsVerifyScreenOpen(true)}
        >
          <Text style={styles.h2}>인증번호 전송</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 100,
    marginLeft: 60,
    marginRight: 60,
  },
  container_title: {

  },
  h1: {
    fontSize: 30,
    fontWeight: "bold",
  },
  h2: {
    fontSize: 16,
  },

  highlight: {
    color: '#00FF9D',
  },
  verification_fields: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  input: {
    height: 60,
    borderRadius: 16,
    borderColor: "black",
    borderWidth: 1,
    fontSize: 18,
    paddingHorizontal: 15,
    marginTop: 20,
    marginBottom: 10,
  },
  verification_input: {
    width: 55,
    height: 60,
    marginHorizontal: 10,
    borderRadius: 16,
    borderWidth: 1,
    padding: 10,
    textAlign: 'center',
    fontSize: 24,
  },
  verification_verify: {

  },
  verification_button: {
    backgroundColor: '#00FF9D',
    alignItems: 'center',
    padding: 20,
    borderRadius: 16,
    marginBottom: 20,
  },

  verification_time: {
    margintop: 10,
    marginLeft: 'auto',
    marginBottom: 5,
  },
  verification_retry: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",

  }

});

export default SignUp;