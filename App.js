/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

/*eslint-disable*/
import React, { useEffect } from 'react';

import { NativeRouter, Switch, Route, BackButton } from 'react-router-native';

import { Alert } from 'react-native';

import * as MediaLibrary from 'expo-media-library';
import { SplashScreen } from './Screens/SplashScreen';
import { Dashboard } from './Screens/Dashboard';
import { PlayMusic } from './Screens/PlayMusic';

import InAppUpdate from './InAppUpdate';





const App = () => {


  const getPermission = async () => {
    const permission = await MediaLibrary.getPermissionsAsync();
    if (!permission.granted && permission.canAskAgain) {
      const { status, canAskAgain } = await MediaLibrary.requestPermissionsAsync();
      if (status === 'denied' && canAskAgain) {
        getPermission();
      }
      if (status === 'denied' && !canAskAgain) {
        Alert.alert("Warning", "can't access storage", [{
          text: "Allow again",
          onPress: () => getPermission()
        }]);
      }
    }
  };

  useEffect(() => {
    InAppUpdate.checkUpdate();
    getPermission();
  }, []);


  return (
    <NativeRouter>
      <BackButton>
        <Switch>
          <Route path="/" component={SplashScreen} exact />
          <Route path="/Dashboard" component={Dashboard} exact />
          <Route path="/Music" component={PlayMusic} exact />
        </Switch>
      </BackButton>
    </NativeRouter>
  );
};



export default App;
