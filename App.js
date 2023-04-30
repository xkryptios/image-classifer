import { StatusBar } from 'expo-status-bar'
import React, { useEffect, useRef, useState } from 'react'
import { StyleSheet, Text, View, SafeAreaView, Image } from 'react-native'
import Button from './components/TouchOpacityButton'
import { Camera } from 'expo-camera'
// import * as MediaLibrary from 'expo-media-library';
import { classify, test } from './Classify'

export default function App() {
  const cameraRef = useRef();
  const [hasCameraPermission, setHasCameraPermission] = useState();
  const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState();
  const [photo, setPhoto] = useState();
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    (async () => {
      const cameraPermission = await Camera.requestCameraPermissionsAsync();
      // const mediaLibraryPermission = await MediaLibrary.requestPermissionsAsync();
      setHasCameraPermission(cameraPermission.status === "granted");
      // setHasMediaLibraryPermission(mediaLibraryPermission.status === "granted");
    })();
  }, []);

  if (hasCameraPermission === undefined) {
    return <Text>Requesting permissions...</Text>
  } else if (!hasCameraPermission) {
    return <Text>Permission for camera not granted. Please change this in settings.</Text>
  }

  let takePic = async () => {
    let options = {
      quality: 1,
      base64: true,
      exif: false
    };

    let newPhoto = await cameraRef.current.takePictureAsync(options);
    setPhoto(newPhoto);
    print(photo)
  };

  if (photo) {
    // let savePhoto = () => {
    //   MediaLibrary.saveToLibraryAsync(photo.uri).then(() => {
    //     setPhoto(undefined);
    //   });
    // };
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.baseText}>Test</Text>
        <Image style={styles.preview} source={{ uri: photo.uri }} />
        {/* <Button title="Share" onPress={sharePic} /> */}
        {/* {hasMediaLibraryPermission ? <Button title="Save" onPress={savePhoto} /> : undefined} */}
        <View style={styles.buttonContainer}>
          {/* <Button title="test" onPress={uploadPhoto} /> */}
          <Button title="Discard" onPress={() => setPhoto(undefined)} />
          <Button title="Classify" onPress={() => {
            res = classify(photo)
            // res = test()
          }
          }
          />

        </View>
      </SafeAreaView >
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.baseText}>
        Take a picture of a object!
      </Text>

      <Camera style={styles.camera} ref={cameraRef}>
        {/* <View style={styles.buttonContainer}>
        <Button title="Take Pic" onPress={takePic} />
      </View> */}
        {/* <StatusBar style="auto" /> */}
      </Camera>
      <Button onPress={
        //   () => {
        //   alert('hi')
        // }
        takePic
      }
        title={'Take Picture'}></Button>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: '#a5f3fc'

  },
  buttonContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  preview: {
    height: '60%',
    width: '80%',
  },
  camera: {
    height: '60%',
    width: '80%',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  baseText: {
    fontSize: 30,
    fontWeight: 'bold',
  }
});