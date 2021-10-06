/*eslint-disable*/

import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Image } from 'react-native';
import * as MediaLibrary from 'expo-media-library';
import cover from '../image/j.png';
import { useHistory } from 'react-router-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { height as HEIGHT, width as WIDTH } from './Contants';

export const Dashboard = () => {

  const Actions = useHistory();

  const initialState = {
    songs: [],
    cover: ""
  };

  const getAudioFiles = async () => {
    let media = await MediaLibrary.getAssetsAsync({ mediaType: 'audio' });
    let Songs = media.assets;
    setState({ ...state, songs: Songs });

  };

  const [state, setState] = useState(initialState);
  useEffect(() => {
    getAudioFiles();
  }, []);

  const goplayMusic = async (id, url, title) => {

    await AsyncStorage.setItem("id", id);
    await AsyncStorage.setItem("url", url);
    await AsyncStorage.setItem("name", title);

    Actions.push("/Music");
  };

  return (
    <ScrollView style={styles.container}>
      {state.songs.length === 0 ? <View style={styles.NoMusic}>
        <Text style={styles.texts}>You have no music</Text>
      </View>
        : state.songs.map(({ id, uri, filename }) => {
          const file = filename.replace(".mp3", "");
          return (
            <TouchableOpacity key={id} style={styles.songs}
              onPress={(i, f, g) => goplayMusic(id, uri, filename)}
            >
              <Image source={cover} style={styles.imageStyle} />

              <Text style={styles.text2}>{file}</Text>
            </TouchableOpacity>
          );
        })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 7,
    backgroundColor: "#222831",
    height: HEIGHT,
    width: WIDTH
  },
  NoMusic: {
    alignContent: "center",
    textAlign: "center",
    alignItems: "center",
    marginTop: 250
  },
  songs: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: "space-between",
    margin: 5,
    padding: 6,
  },
  texts: {
    color: "#FFD369",
    fontSize: 18
  },
  text2: {
    color: "#FFD369",
  },
  imageStyle: {
    width: 50,
    height: 50,
    padding: 3
  }
});
