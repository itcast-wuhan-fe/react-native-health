import { NavigationActions, StackActions } from "react-navigation";

let _navigatorRef;

const setNavigatorRef = navigatorRef => {
  _navigatorRef = navigatorRef;
};

const navigate = (routeName: string, params?: any) => {
  _navigatorRef.current.dispatch(
    NavigationActions.navigate({
      routeName,
      params
    })
  );
};

const pop = () => {
  _navigatorRef.current.dispatch(StackActions.pop({}));
};
const replace = (routeName: string, params?: any) => {
  _navigatorRef.current.dispatch(
    StackActions.replace({
      routeName,
      params
    })
  );
};

const reactNavigationHelper = {
  setNavigatorRef,
  navigate,
  pop,
  replace
};

export default reactNavigationHelper;
