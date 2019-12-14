import React, { SFC } from "react";
import { View, Text, StyleSheet, Button, ScrollView } from "react-native";
import { NavigationStackProp } from "react-navigation-stack";
import reactNavigationHelper from "../../utils/reactNavigationHelper";
import CommonColors from "../../utils/CommonColors";
import CommonSwiper from "../../components/CommonSwiper";
import FunctionNavigate from "./functionNavigate";
import Advertisement from "./Advertisement";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";

type Props = {
  navigation: NavigationStackProp;
};
const HomePage: SFC<Props> = ({ navigation }) => {
  return (
    <ScrollView style={style.wrapper}>
      <CommonSwiper></CommonSwiper>
      <FunctionNavigate></FunctionNavigate>
      <Advertisement></Advertisement>
    </ScrollView>
  );
};

const style = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: CommonColors.backgroudGray
  }
});

//@ts-ignore
HomePage.navigationOptions = {
  title: "猿健康",
  headerRight: (
    <TouchableOpacity
      style={{
        marginRight: 10
      }}
      onPress={() => {
        reactNavigationHelper.navigate("Setting");
      }}
    >
      <Ionicons
        name={"md-settings"}
        size={20}
        color={CommonColors.primary}
      ></Ionicons>
    </TouchableOpacity>
  )
};
export default HomePage;
