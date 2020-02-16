import React, { useContext } from "react";

import { ScrollView, StyleSheet, Text } from "react-native";

import { Button } from "react-native-elements";
import CommonColors from "../../utils/CommonColors";
import reactNavigationHelper from "../../utils/reactNavigationHelper";
import authContext from "../../context/auth";
import authHelper from "../../utils/authHelper";
import commonToast from "../../utils/commonToast";

const SettingPage = () => {
  const auth = useContext(authContext);
  const token = auth.token;

  const isLogin = authHelper.isLogin(token);
  if (isLogin) {
    const email = authHelper.getInfoFromToken(token).email;
    return (
      <ScrollView style={style.wrapper}>
        <Text style={style.title}>
          当前用户<Text style={style.name}>{email}</Text>
        </Text>
        <Button
          linearGradientProps={{
            colors: ["red", "red"],
            start: { x: 0, y: 0.5 },
            end: { x: 1, y: 0.5 }
          }}
          buttonStyle={style.button}
          title={"退出登录"}
          onPress={() => {
            auth.setToken("");
            commonToast.show("已经成功退出登录");
          }}
        ></Button>
      </ScrollView>
    );
  }
  return (
    <ScrollView style={style.wrapper}>
      <Text style={style.title}>登录后使用完整 APP 功能</Text>
      <Button
        linearGradientProps={{
          colors: [CommonColors.gradientStart, CommonColors.gradientEnd],
          start: { x: 0, y: 0.5 },
          end: { x: 1, y: 0.5 }
        }}
        buttonStyle={style.button}
        title={"去登录"}
        onPress={() => {
          reactNavigationHelper.navigate("Login");
        }}
      ></Button>
    </ScrollView>
  );
};

const style = StyleSheet.create({
  wrapper: {
    margin: 20
  },
  title: {
    fontSize: 20,
    marginBottom: 30
  },
  name: {
    fontWeight: "600"
  },
  button: {
    marginVertical: 10
  }
});
SettingPage.navigationOptions = {
  title: "设置"
};
export default SettingPage;
