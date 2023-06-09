import React, { useCallback, useContext, useEffect, useState } from "react";
import { Text } from "react-native";
import colors from "../../../../assets/colors/colors";
import { ROOT_API } from "../../../constants/api";
import { TokenContext } from "../../../contexts/TokenContext";

const EndTimer = (props) => {
  const now = new Date();
  const end = new Date(props.endTime);
  const diff = Math.max(0, end - now); // 음수일 경우 0으로 설정
  const seconds = Math.floor((diff / 1000) % 60);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const days = Math.floor(diff / (1000 * 60 * 60 * 24)); // diff 값의 전체 일수 계산
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24) + days * 24; // 전체 일수에 따른 hours 계산
  const [timer, setTimer] = useState(diff);
  const [timeOut, setTimeOut] = useState(false);
  const [token, setToken] = useContext(TokenContext);

  const handleTimeOut = useCallback(() => {
    fetch(`${ROOT_API}/grouppurchase/timeoutgp?gpId=${props.id}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(() => {
        console.log("삭제");
        props.setRender((prev) => !prev);
      })
      .catch((err) => {
        console.log(err);
      });
  });

  useEffect(() => {
    const interval = setInterval(() => {
      if (timer > 0) {
        setTimer(timer - 1);
      } else {
        setTimeOut(true);
      }
    }, 1000);

    return () => {
      // 컴포넌트가 언마운트되면 타이머 클리어
      clearInterval(interval);
    };
  }, [timer]);

  useEffect(() => {
    if (timeOut) {
      handleTimeOut();
    }
  }, [timeOut]);

  return (
    <>
      <Text style={{ fontSize: 12, fontWeight: 500, color: timer < 3600000 ? colors.red : colors.green }}>
        {`${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`}
      </Text>
    </>
  );
};

export default EndTimer;
