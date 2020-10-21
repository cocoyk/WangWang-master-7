// NavigationService.js

import {StackActions, NavigationActions} from '@react-navigation/native';

let _navigator;

function setTopLevelNavigator(navigatorRef) {
  _navigator = navigatorRef;
}

function push(routeName, params) {
  _navigator.dispatch(
    StackActions.push({
      routeName,
      params,
    }),
  );
}

function replace(routeName, params) {
  _navigator.dispatch(
    StackActions.replace({
      routeName,
      params,
    }),
  );
}

function pop(n) {
  _navigator.dispatch(StackActions.pop({n: n ? n : 1}));
}

function getRoutes() {
  _navigator.dispatch(StackActions.getCurrentRoutes());
}

function navigate(routeName, params) {
  _navigator.dispatch(
    NavigationActions.navigate({
      routeName,
      params,
    }),
  );
}

function reset(routeName) {
  const resetAction = StackActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({routeName: routeName})],
  });
  _navigator.dispatch(resetAction);
}

// add other navigation functions that you need and export them

export default {
  push,
  replace,
  pop,
  getRoutes,
  navigate,
  setTopLevelNavigator,
  reset,
};
