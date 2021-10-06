import TrackPlayer from 'react-native-track-player';

module.exports = async function () {
  TrackPlayer.addEventListener('remote-play', async () => await TrackPlayer.play());
  TrackPlayer.addEventListener('remote-pause', async () => await TrackPlayer.pause());
};
