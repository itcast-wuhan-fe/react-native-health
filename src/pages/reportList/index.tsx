import React, { SFC, useContext, useState, useEffect } from "react";
import constant from "../../../src/constant";
import {
  View,
  StyleSheet,
  FlatList,
  Image,
  Text,
  TouchableOpacity
} from "react-native";
import { Linking } from "expo";
import CommonColors from "../../../src/utils/CommonColors";
import reactNavigationHelper from "../../utils/reactNavigationHelper";
import authContext from "../../context/auth";
import authHelper from "../../utils/authHelper";
import commonHttp from "../../utils/commonHttp";
import commonToast from "../../utils/commonToast";

const ReportListPage: SFC = () => {
  const auth = useContext(authContext);
  const token = auth.token;
  const isLogin = authHelper.isLogin(token);
  const userId = authHelper.getInfoFromToken(token).id;
  const [dataList, setDataList] = useState([]);

  const getData = async () => {
    const uri = `/reportList?userId=${userId}`;

    try {
      const res = await commonHttp.get(uri, {
        headers: {
          Authorization: `Bearer ${auth.token}`
        }
      });
      setDataList(res.data);
    } catch (error) {
      commonToast.show(error.response.data);
    }
  };
  useEffect(() => {
    getData();
  }, [userId]);

  if (!isLogin) {
    reactNavigationHelper.navigate("Login");
    return <View></View>;
  }

  return (
    <FlatList
      contentContainerStyle={style.wrapper}
      data={dataList}
      keyExtractor={item => item.id}
      renderItem={({ item }) => {
        return (
          <TouchableOpacity
            onPress={() => {
              // Linking.openURL(`${constant.reportUri}?id=${item.id}`);
              commonToast.show("该功能暂未实现，敬请期待！");
            }}
          >
            <View style={style.item}>
              <View style={style.itemUser}>
                <Image style={style.image} source={{ uri: item.image }}></Image>
                <Text style={style.name}>{item.name}</Text>
              </View>
              <View style={style.itemContent}>
                <View style={style.textWrapper}>
                  <Text style={style.textLabel}>{"体检日期:"}</Text>
                  <Text style={style.textData}>{item.date}</Text>
                </View>
                <View style={style.textWrapper}>
                  <Text style={style.textLabel}>{"档案号:"}</Text>
                  <Text style={style.textData}>{item.id}</Text>
                </View>
                <View style={style.textWrapper}>
                  <Text style={style.textLabel}>{"体检套餐:"}</Text>
                  <Text style={style.textData}>{item.type}</Text>
                </View>
                <View style={style.textWrapper}>
                  <Text style={style.textLabel}>{"上传时间:"}</Text>
                  <Text style={style.textData}>{item.uploadDate}</Text>
                </View>
              </View>
              <View style={style.itemButton}>
                <Text style={style.button}>体检报告</Text>
              </View>
            </View>
          </TouchableOpacity>
        );
      }}
    ></FlatList>
  );
};

const style = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: CommonColors.lineGray
  },
  item: {
    backgroundColor: CommonColors.white,
    borderRadius: 8,
    marginHorizontal: 10,
    marginTop: 10,

    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  itemUser: {
    width: 60,
    margin: 20,
    justifyContent: "center",
    alignItems: "center"
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30
  },
  name: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: "500"
  },
  itemContent: {
    flex: 1,
    justifyContent: "space-between"
  },
  textWrapper: {
    flexDirection: "row",
    marginBottom: 10
  },
  textLabel: {
    color: CommonColors.gray,
    marginRight: 4
  },
  textData: {},
  itemButton: {
    backgroundColor: CommonColors.primary,
    alignSelf: "stretch",
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
    width: 30,
    padding: 4,
    justifyContent: "center",
    alignItems: "center"
  },
  button: {
    lineHeight: 20
  }
});

// @ts-ignore
ReportListPage.navigationOptions = {
  title: "体检报告"
};

export default ReportListPage;
