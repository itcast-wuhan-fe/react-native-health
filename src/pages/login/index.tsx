import React, { useState, useContext } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import CommonFormItem from "../../components/CommonFormItem";
import { Button } from "react-native-elements";
import CommonColors from "../../utils/CommonColors";
import reactNavigationHelper from "../../utils/reactNavigationHelper";
import commonToast from "../../utils/commonToast";
import commonHttp from "../../utils/commonHttp";
import authContext from "../../context/auth";
const LoginPage = ({ navigation }) => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const auth = useContext(authContext);
  const submit = async () => {
    if ("" === name || "" === password) {
      commonToast.show("账号密码不为空");
      return;
    }
    const uri = "/login";
    try {
      const res = await commonHttp.post(uri, {
        email: name,
        password
      });

      auth.setToken(res.data.accessToken);
      reactNavigationHelper.pop();
      commonToast.show("登录成功");
    } catch (error) {
      commonToast.show(error.response.data);
    }
  };
  return (
    <ScrollView contentContainerStyle={style.wrapper}>
      <Text style={style.title}>账号密码登录</Text>
      <CommonFormItem
        label={"账号"}
        textInputPlaceholder={"请输入邮箱"}
        textInputValue={name}
        textInputOnChangeText={setName}
      ></CommonFormItem>
      <CommonFormItem
        label={"密码"}
        textInputValue={password}
        textInputOnChangeText={setPassword}
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
        title={"登录"}
        onPress={() => {
          submit();
        }}
      ></Button>
      <View style={style.footer}>
        <Text>
          <Text>没有账号</Text>
          <Text
            onPress={() => {
              reactNavigationHelper.replace("Register");
            }}
            style={style.colorText}
          >
            去注册～
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
LoginPage.navigationOptions = {
  title: "登录"
};
export default LoginPage;
