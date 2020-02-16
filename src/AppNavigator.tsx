import React from "react";
import { createStackNavigator } from "react-navigation-stack";
import HomePage from "./pages/home";
import LoginPage from "./pages/login";
import ReservationDetailPage from "./pages/reservationDetail";
import CommonColors from "./utils/CommonColors";
import ReservationListPage from "./pages/reservationList";
import ReservationSubmitPage from "./pages/reservationSubmit";
import ReportListPage from "./pages/reportList";
import RegisterPage from "./pages/register";
import SettingPage from "./pages/setting";
import noticePage from "./pages/notice/index";

const AppNavigator = createStackNavigator(
  {
    Home: HomePage,
    Login: LoginPage,
    Register: RegisterPage,
    Setting: SettingPage,
    ReservationDetail: ReservationDetailPage,
    ReservationList: ReservationListPage,
    ReservationSubmit: ReservationSubmitPage,
    ReportList: ReportListPage,
    Notice: noticePage
  },
  {
    initialRouteName: "Home",
    // initialRouteName: "Notice",
    defaultNavigationOptions: {
      headerTintColor: CommonColors.primary
    }
  }
);

export default AppNavigator;
