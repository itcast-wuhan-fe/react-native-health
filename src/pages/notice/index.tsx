import React, { SFC, useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, Linking } from "react-native";
import { NavigationStackProp } from "react-navigation-stack";
import { Button, Divider } from "react-native-elements";
import CommonColors from "../../utils/CommonColors";
import ReservationHeader from "../../components/ReservationHeader";
import constant from "../../constant";
import CommonFloatButton from "../../components/CommonFloatButton";
import reactNavigationHelper from "../../utils/reactNavigationHelper";
import commonHttp from "../../utils/commonHttp";
// type Props = {
//   navigation: NavigationStackProp<any, { reservationDetailId: string }>;
// };

const Title = ({ text }) => <Text style={style.title}>{text}</Text>;
const Content = ({ text }) => <Text style={style.content}>{text}</Text>;

const noticePage = ({ navigation }) => {
  return (
    <View style={style.outWrapper}>
      <ScrollView>
        <Title text={"体检报告：体检报告将于体检后5-7个工作日出具。"}></Title>
        <Content
          text={
            "A、纸质报告可在接到体检中心电话通知后自取，或于体检当日前台登记要求邮寄（邮费自理）"
          }
        ></Content>
        <Divider style={style.divider}></Divider>
        <Title text={"体检前："}></Title>
        <Content
          text={
            "1、体检前一天请您清淡饮食,勿饮酒、勿劳累。体检当天请空腹,禁食。"
          }
        ></Content>
        <Content
          text={
            "2、体检前一天要注意休息，晚上8点后不再进食。避免剧烈运动和情绪激动，保证充足睡眠，以免影响体检结果。"
          }
        ></Content>
        <Content text={"3、例假期间不宜做妇科、尿液检查。"}></Content>
        <Divider style={style.divider}></Divider>
        <Title text={"体检中："}></Title>
        <Content
          text={
            "1、需空腹检查的项目为抽血、腹部B超、数字胃肠，胃镜及其它标注的体检项目。"
          }
        ></Content>
        <Content
          text={
            "2、做膀胱、子宫、附件B超时请勿排尿，如无尿需饮水至膀胱充盈。做妇科检查前应排空尿。"
          }
        ></Content>
        <Content
          text={
            "3、未婚女性不做妇科检查；怀孕的女性请预先告知医护人员,不安排做放射及其他有影响的检查。"
          }
        ></Content>
        <Content
          text={"4、做放射线检查前,请您除去身上佩戴的金银、玉器等饰物。"}
        ></Content>
        <Content
          text={
            "5、核磁共振检查，应禁止佩带首饰、手表、传呼、手机等金属物品，磁卡也不应带入检查室，以防消磁。"
          }
        ></Content>
        <Divider style={style.divider}></Divider>
        <Title text={"体检后："}></Title>
        <Content text={"1、全部项目完毕后请您务必将体检单交到前台。"}></Content>
        <Content
          text={"2、请您认真听取医生的建议,及时复查.随诊或进一步检查治疗。"}
        ></Content>
        <Content
          text={
            "3、请您保存好体检结果，以便和下次体检结果作对照，也可作为您就医时的资料。"
          }
        ></Content>
      </ScrollView>
    </View>
  );
};

const style = StyleSheet.create({
  outWrapper: {
    flex: 1,
    padding: 10
  },
  wrapper: {
    flex: 1,
    backgroundColor: CommonColors.lineGray
  },
  divider: {
    marginVertical: 10
  },
  title: { color: CommonColors.black, fontSize: 14, lineHeight: 40 },
  content: { color: CommonColors.gray, fontSize: 12, lineHeight: 18 }
});

//@ts-ignore
noticePage.navigationOptions = {
  title: "预约须知"
};
export default noticePage;
