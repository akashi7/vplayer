/*eslint-disable*/
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, SafeAreaView, ScrollView, Dimensions, RefreshControl } from 'react-native';
import Slider from '@react-native-community/slider';
import Icon from 'react-native-vector-icons/Ionicons';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Trackplayer, { Capability, useProgress, RepeatMode } from 'react-native-track-player';
import images from '../image/j.png';



Trackplayer.updateOptions({
  stopWithApp: false,
  capabilities: [Capability.Play, Capability.Pause],
  compactCapabilities: [
    Capability.Play, Capability.Pause
  ]
});

const { width, height } = Dimensions.get("screen");
const HEIGHT = height;
const WIDTH = width;


export const PlayMusic = () => {


  const progress = useProgress();




  const [state, setState] = useState({
    current: 0,
    duration: 0,
    playing: false,
    songName: "",
    repeatMode: "off"
  });


  const Repeat = () => {
    if (state.repeatMode === 'off') {
      return 'repeat-off';
    }
    if (state.repeatMode === 'track') {
      return 'repeat-once';
    }
  };

  const Change = () => {
    if (state.repeatMode === 'off') {
      Trackplayer.setRepeatMode(RepeatMode.Track);
      setState({ ...state, repeatMode: 'track' });
    }
    if (state.repeatMode === 'track') {
      Trackplayer.setRepeatMode(RepeatMode.Queue);
      setState({ ...state, repeatMode: 'repeat' });
    }
    if (state.repeatMode === 'repeat') {
      Trackplayer.setRepeatMode(RepeatMode.Off);
      setState({ ...state, repeatMode: 'off' });
    }
  };






  const SetupPlayer = async () => {

    const Id = await AsyncStorage.getItem("id");
    const URL = await AsyncStorage.getItem("url");
    const title = await AsyncStorage.getItem("name");
    const TitleName = title.replace(".mp3", "");

    setState({ ...state, songName: TitleName });

    const Track = [
      {
        id: Id,
        url: URL,
        title: TitleName,
        artwork: images,
      }
    ];

    try {

      await Trackplayer.setupPlayer();
      await Trackplayer.add(Track);

    } catch (error) {
      console.log("err", error);
    }
  };

  useEffect(() => {
    SetupPlayer();
    return () => {
      Trackplayer.destroy();
    };
  }, []);

  const Time = progress.position;
  const StatePlaying = state.playing;
  const initial = 0;




  useEffect(() => {

    (async () => {
      if (Time >= progress.duration) {
        progress.position = initial;
        setState({ ...state, playing: false });
      }


      // if (playingState.Paused) {
      //   setState({ ...state, playing: true });
      // }
      // if (playingState.Playing) {
      //   setState({ ...state, playing: false });
      // }


    })();

  }, [Time, StatePlaying]);

  const play = async () => {

    if (state.playing) {
      setState({ ...state, playing: false });
      await Trackplayer.pause();
    }
    else {
      setState({ ...state, playing: true });
      await Trackplayer.play();
    }
  };

  const durationFunction = (sec) => {
    return ((sec - (sec %= 60)) / 60) + (9 < sec ? ':' : ':0') + ~~sec;
  };


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrapper} >
        <Image source={images} style={styles.myImage} />
      </View>
      <View>
        <Text style={styles.SongTitle}>{state.songName}</Text>
      </View>
      <Slider
        style={styles.progressBar}
        value={(progress.position) >= progress.duration ? 0 : progress.position}
        minimumValue={0}
        maximumValue={progress.duration}
        thumbTintColor="#FFD369"
        minimumTrackTintColor="#FFD369"
        maximumTrackTintColor="FFF"
        onSlidingComplete={async (value) => {
          await Trackplayer.seekTo(value);
        }}
      />
      <View style={styles.controlls}>
        <Text style={styles.controllText} >
          {durationFunction(progress.position)}
        </Text>
        <Text style={styles.controllText}>
          {durationFunction(progress.duration)}
        </Text>
      </View>
      <View style={styles.musicControlls}>
        <TouchableOpacity onPress={() => Change()}>
          <Icons name={`${Repeat()}`} size={45} color={(state.repeatMode !== 'off' && state.repeatMode === 'track') ? "#FFD369" : "#777777"} style={{ padding: 17 }} />
        </TouchableOpacity>

        {state.playing ? <TouchableOpacity >
          <Icon name={"ios-pause-circle"} size={75} color="#FFD369"
            onPress={
              () => { setState({ ...state, playing: false }); play(); }
            } />
        </TouchableOpacity>
          : <TouchableOpacity >
            <Icon name={"ios-play-circle"} size={75} color="#FFD369"
              onPress={
                () => { setState({ ...state, playing: true }); play(); }
              } />
          </TouchableOpacity>}
      </View>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 2,
    backgroundColor: "#222831",
    alignItems: "center",
    justifyContent: "center",
    height: HEIGHT,
    width: WIDTH
  },
  wrapper: {
    width: 300,
    height: 340,
    marginBottom: 25
  },
  myImage: {
    width: "100%",
    height: "100%",
    borderRadius: 15
  },
  SongTitle: {
    fontSize: 15,
    fontWeight: "600",
    textAlign: "center",
    color: "#EEEEEE"
  },
  progressBar: {
    width: 350,
    height: 50,
    marginTop: 25,
    flexDirection: "row"
  },
  controlls: {
    width: 340,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  controllText: {
    color: "white"
  },
  musicControlls: {
    flexDirection: "row",
    width: "60%",
    justifyContent: "space-between",
    marginTop: 1,
    marginLeft: 1,
  }
});
