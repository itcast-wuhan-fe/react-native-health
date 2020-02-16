import React, { SFC, useState, useContext, useEffect } from "react";

import { View, StyleSheet, Text } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import CommonFloatButton from "../../components/CommonFloatButton";
import ReservationHeader from "../../components/ReservationHeader";
import CommonColors from "../../../src/utils/CommonColors";
import CommonTitle from "../../components/CommonTitle";
import CommonFormItem from "../../components/CommonFormItem";
import CommonFormRadio from "../../components/CommonFormRadio";
import DateTimePicker from "react-native-modal-datetime-picker";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import authContext from "../../context/auth";
import authHelper from "../../utils/authHelper";
import commonHttp from "../../utils/commonHttp";
import commonToast from "../../utils/commonToast";
import reactNavigationHelper from "../../utils/reactNavigationHelper";
const ReservationSubmitPage = ({ navigation }) => {
  const sexOptions = ["男", "女"];
  const marriageOptions = ["未婚", "已婚"];
  const auth = useContext(authContext);
  const token = auth.token;
  const userId = authHelper.getInfoFromToken(token).id;
  const isLogin = authHelper.isLogin(token);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [date, setDate] = useState(new Date());
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [idNumber, setIdNumber] = useState("");
  const [sex, setSex] = useState(0);
  const [marriage, setMarriage] = useState(0);

  const id = navigation.getParam("reservationDetailId", "1");

  const [data, setData] = useState(null);

  const getData = async () => {
    const uri = `/reservationList/${id}`;
    const res = await commonHttp.get(uri);
    setData(res.data);
  };

  useEffect(() => {
    getData();
  }, []);

  if (data === null) {
    return <View></View>;
  }
  if (!isLogin) {
    reactNavigationHelper.navigate("Login");
    return <View></View>;
  }
  const submit = async () => {
    if (name === "") {
      commonToast.show("体检人不能为空");
      return;
    }
    if (phoneNumber === "") {
      commonToast.show("手机号不能为空");
      return;
    }
    if (idNumber === "") {
      commonToast.show("身份证不能为空");
      return;
    }
    const uri = "/reservationSubmit";

    //  headers: {
    //    Authorization: `Bearer ${auth.token}`;
    //  }
    //4.参数：
    const sexString = sexOptions[sex];
    const marriageString = marriageOptions[marriage];
    const param = {
      name,
      sex: sexString,
      phoneNumber,
      idNumber,
      marriage: marriageString,
      userId,
      date
    };
    try {
      const res = await commonHttp.post(uri, param, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      commonToast.show("数据提交成功");
    } catch (error) {
      commonToast.show(error.response.data);
    }
  };
  return (
    <View style={style.wrapper}>
      <KeyboardAwareScrollView enableOnAndroid={true}>
        <ReservationHeader data={data}></ReservationHeader>
        <View style={style.content}>
          <CommonTitle title={"体检人信息"}></CommonTitle>
          <CommonFormItem
            textInputValue={name}
            textInputOnChangeText={setName}
            label={"体检人"}
            textInputPlaceholder={"请输入体检人姓名"}
          ></CommonFormItem>
          <CommonFormRadio
            label={"性别"}
            value={sex}
            onChange={setSex}
            options={sexOptions}
          ></CommonFormRadio>
          <CommonFormItem
            label={"手机号"}
            textInputValue={phoneNumber}
            textInputOnChangeText={setPhoneNumber}
            textInputPlaceholder={"请输入手机号"}
          ></CommonFormItem>
          <CommonFormItem
            label={"身份证号"}
            textInputValue={idNumber}
            textInputOnChangeText={setIdNumber}
            textInputPlaceholder={"请输入身份证号"}
          ></CommonFormItem>
          <CommonFormRadio
            label={"婚否"}
            value={marriage}
            onChange={setMarriage}
            options={marriageOptions}
          ></CommonFormRadio>
          <CommonFormItem
            label={"体检日期"}
            renderItem={() => (
              <TouchableOpacity
                onPress={() => {
                  setShowDatePicker(true);
                }}
                style={style.dateWrapper}
              >
                <Text>{date.toLocaleDateString()}</Text>
                <Ionicons name={"md-calendar"} size={16}></Ionicons>
              </TouchableOpacity>
            )}
          ></CommonFormItem>
        </View>
        <DateTimePicker
          isVisible={showDatePicker}
          onConfirm={data => {
            setDate(data);
            setShowDatePicker(false);
          }}
          onCancel={() => {
            setShowDatePicker(false);
          }}
        ></DateTimePicker>
      </KeyboardAwareScrollView>

      <CommonFloatButton title={"提交"} onPress={submit}></CommonFloatButton>
    </View>
  );
};

const style = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: CommonColors.lineGray
  },
  content: {
    marginTop: 10,
    paddingBottom: 80,
    backgroundColor: CommonColors.white,
    paddingHorizontal: 10
  },
  dateWrapper: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginLeft: 20,
    marginRight: 40
  }
});

ReservationSubmitPage.navigationOptions = {
  title: "体检提交"
};

export default ReservationSubmitPage;
