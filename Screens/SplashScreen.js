/*eslint-disable*/
import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image, SafeAreaView, Dimensions } from 'react-native';
import { useHistory } from 'react-router-native';
import { height as HEIGHT, width as WIDTH } from './Contants';



import Logo from '../image/j.png';



export const SplashScreen = () => {

  const { width, height } = Dimensions.get("screen");

  const Actions = useHistory();
  useEffect(() => {
    setTimeout(() => {
      Actions.push('/Dashboard');
    }, 7000);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Image source={Logo} style={styles.image} />
      <Text style={styles.first}></Text>
      <View style={styles.subContainer}>
        <Text style={{ color: '#FFD369', fontSize: 27, fontWeight: "bold" }}>Vplay</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    textAlign: "center",
    backgroundColor: "#222831",
    height: HEIGHT,
    width: WIDTH
  },
  image: {
    marginTop: 170,
    width: 151,
    height: 140
  },
  subContainer: {
    marginTop: 150,
  },
  first: {
    fontSize: 20,
    color: "#FFD369",
    marginTop: 25
  },
});
