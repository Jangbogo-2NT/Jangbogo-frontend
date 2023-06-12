import { Feather, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import React, { useCallback, useEffect, useState } from "react";
import { FlatList, Platform, Pressable, StyleSheet, Text, View } from "react-native";
import DateTimePicker from "react-native-modal-datetime-picker";
import colors from "../../../assets/colors/colors";
import HeaderMain from "../../components/HeaderMain";
import { ROOT_API } from '../../constants/api';

const MemoListScreen = () => {
  const navigation = useNavigation();
  const [data, setData] = useState([]);
  const [visibleDatePicker, setVisibleDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [date, setDate] = useState(`${selectedDate.getFullYear()}-${selectedDate.getMonth() + 1}-${selectedDate.getDate()}`);
  const onPressCalendar = useCallback(() => {
    setVisibleDatePicker(true);
  });
  const onPressRegister = useCallback(() => {
    navigation.navigate("Memo", {
      type: "post",
      date: date,
    });
  });
  const onPressDetail = useCallback((item) => {
    navigation.navigate("Memo", {
      id: item.id,
      title: item.title,
      type: "detail",
      date: `${selectedDate.getFullYear()}.${selectedDate.getMonth() + 1}.${selectedDate.getDate()}`,
    });
  });
  useEffect(() => {
    fetch(`${ROOT_API}/memo/memolist?date=${date}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaHAiOiIwMTA1NjkxNzU4NiIsImlhdCI6MTY4NjU4MDIwOCwiZXhwIjoxNjg3MTg1MDA4fQ.Az1HeKCb4B6k3-UKbQghrNDr2wJ8zySUyMTG-iA97uw`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      })
      .catch((err) => {
        console.log(err.response);
      });
  }, [date]);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <HeaderMain>
          <View style={styles.title}>
            <Text style={styles.text1}>장보기</Text>
            <Text style={styles.text1}>메모</Text>
          </View>
          <Pressable style={styles.register} onPress={onPressRegister}>
            <MaterialCommunityIcons name="pencil" size={24} color={colors.greenH} />
            <Text style={styles.text2}>작성</Text>
          </Pressable>
        </HeaderMain>
      </View>
      <View style={styles.main}>
        <View style={styles.dateContainer}>
          <Text style={styles.dateText}>{date}</Text>
          <Feather name="calendar" size={22} color={colors.red} onPress={onPressCalendar} />
        </View>
        {data.length === 0? (
          <Text>작성한 장보기 메모가 없습니다.</Text>
        ) : (
          <FlatList
            showsVerticalScrollIndicator={false}
            data={data}
            renderItem={({ item }) => {
              return (
                <Pressable onPress={() => onPressDetail(item)}>
                  <View style={styles.memoContainer}>
                    <View style={styles.memoInfo}>
                      <Text style={styles.createAt}>{date}</Text>
                      <Text style={styles.text2}>{item.name}</Text>
                    </View>
                    <Ionicons name="md-chevron-forward-sharp" size={24} color={colors.greenH} />
                  </View>
                </Pressable>
              );
            }}
          />
        )}
      </View>
      <DateTimePicker
        isVisible={visibleDatePicker}
        mode="date"
        onConfirm={(date) => {
          setSelectedDate(new Date(date));
          setDate(`${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`);
          setVisibleDatePicker(false);
        }}
        onCancel={() => {
          setVisibleDatePicker(false);
        }}
      />
    </View>
  );
};
export default MemoListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.grayLL,
  },
  header: {
    alignItems: "center",
    backgroundColor: "white",
    ...Platform.select({
      ios: {
        shadowColor: "#ECECEC",
        shadowOpacity: 0.5,
        shadowRadius: 5,
        shadowOffset: {
          height: -1,
          width: 0,
        },
      },
      android: {
        elevation: 3,
      },
    }),
  },
  main: {
    flex: 7,
    padding: 15,
    marginBottom: 90,
  },
  title: {
    flex: 1,
  },
  register: {
    flexDirection: "row",
  },
  text1: {
    fontSize: 30,
    fontWeight: 800,
  },
  text2: {
    fontSize: 19,
  },
  btn1: {
    fontSize: 20,
    backgroundColor: colors.white,
  },
  dateContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  dateText: {
    fontSize: 22,
    color: colors.green,
    marginRight: 2,
  },
  memoContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    paddingVertical: 15,
    paddingHorizontal: 10,
    backgroundColor: colors.white,
    borderRadius: 5,
    ...Platform.select({
      ios: {
        shadowColor: "#ECECEC",
        shadowOpacity: 0.5,
        shadowRadius: 5,
        shadowOffset: {
          height: -1,
          width: 0,
        },
      },
      android: {
        elevation: 3,
      },
    }),
  },
  memoInfo: {
    flex: 1,
  },
  createAt: {
    fontSize: 14,
    color: colors.gray,
    fontWeight: 400,
  },
});
