import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import CommonFormItem from "../../components/CommonFormItem";
import { Button } from "react-native-elements";
import CommonColors from "../../utils/CommonColors";
import reactNavigationHelper from "../../utils/reactNavigationHelper";
import commonToast from "../../utils/commonToast";
import commonHttp from "../../utils/commonHttp";
const RegisterPage = ({ navigation }) => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");
  const goLogin = () => {
    reactNavigationHelper.replace("Login");
  };
  const submit = async () => {
    if (name === "" || password === "") {
      commonToast.show("账号或密码不能为空");
      return;
    }
    if (passwordRepeat !== password) {
      commonToast.show("两次输入的密码不一致");
      return;
    }
    const uri = "/register";
    try {
      const _res = await commonHttp.post(uri, {
        email: name,
        password
      });
      commonToast.show("注册成功");
      goLogin();
    } catch (error) {
      commonToast.show(error.response.data);
    }
  };
  return (
    <ScrollView contentContainerStyle={style.wrapper}>
      <Text style={style.title}>账号密码注册</Text>
      <CommonFormItem
        label={"账号"}
        textInputValue={name}
        textInputOnChangeText={setName}
        textInputPlaceholder={"请输入邮箱"}
      ></CommonFormItem>
      <CommonFormItem
        label={"密码"}
        textInputValue={password}
        textInputOnChangeText={setPassword}
        textInputPlaceholder={"请输入密码"}
        textInputSecureTextEntry={true}
      ></CommonFormItem>
      <CommonFormItem
        label={"密码确认"}
        textInputValue={passwordRepeat}
        textInputOnChangeText={setPasswordRepeat}
        textInputPlaceholder={"请输入密码"}
        textInputSecureTextEntry={true}
      ></CommonFormItem>
      <Button
        linearGradientProps={{
          colors: [CommonColors.gradientStart, CommonColors.gradientEnd],
          start: { x: 0, y: 0.5 },
          end: { x: 1, y: 0.5 }
        }}
        buttonStyle={style.button}
        onPress={() => {
          submit();
        }}
        title={"注册"}
      ></Button>
      <View style={style.footer}>
        <Text>
          <Text>已有账号</Text>
          <Text style={style.colorText} onPress={goLogin}>
            去登录～
          </Text>
        </Text>
      </View>
    </ScrollView>
  );
};

const style = StyleSheet.create({
  wrapper: {
    margin: 20
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 30
  },
  button: {
    marginVertical: 10
  },
  footer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10
  },
  colorText: { color: CommonColors.primary }
});

//@ts-ignore
RegisterPage.navigationOptions = {
  title: "注册"
};
export default RegisterPage;
