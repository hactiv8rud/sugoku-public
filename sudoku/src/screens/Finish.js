import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text, TouchableHighlight, StyleSheet, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';
import Table from '../components/Table'
import { useSelector } from 'react-redux';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

function Finish({ navigation, route }) {
  const { name, time } = route.params;
  const difficulty = useSelector(state => state.homeReducer.difficulty)
  const [rankEasy, setRankEasy] = useState([]);
  const [rankMedium, setRankMedium] = useState([]);
  const [rankHard, setRankHard] = useState([]);
  const [rankRandom, setRankRandom] = useState([]);

  const windowHeight = Dimensions.get('window').height;

  const storeData = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value)
    } catch (e) {
        console.log(e);
    }
  };

  const getMultiple = async () => {
    try {
      let rankEasyTemp = [];
      let rankMediumTemp = [];
      let rankHardTemp = [];
      let rankRandomTemp = [];
      const keys = await AsyncStorage.getAllKeys();
      const players = await AsyncStorage.multiGet(keys);
      players.forEach((player) => {
        if (player[1].split(',')[0] === 'easy') {
          rankEasyTemp.push(player);
        } else if (player[1].split(',')[0] === 'medium') {
          rankMediumTemp.push(player);
        } else if (player[1].split(',')[0] === 'hard') {
          rankHardTemp.push(player);
        } else {
          rankRandomTemp.push(player);
        }
      })
      setRankEasy(rankEasyTemp);
      setRankMedium(rankMediumTemp);
      setRankHard(rankHardTemp);
      setRankRandom(rankRandomTemp);
    } catch(e) {
        console.log(e);
    }
  }

  const replay = () => {
    navigation.replace('Home');
  }

  useEffect(() => {
    const data = `${difficulty},${time}`
    storeData(name, data);
  },[]);

  useEffect(() => {
    getMultiple();
  }, []);

  rankEasy.sort((a, b) => Number(a[1].split(',')[1]) - Number(b[1].split(',')[1]));
  rankMedium.sort((a, b) => Number(a[1].split(',')[1]) - Number(b[1].split(',')[1]));
  rankHard.sort((a, b) => Number(a[1].split(',')[1]) - Number(b[1].split(',')[1]));
  rankRandom.sort((a, b) => Number(a[1].split(',')[1]) - Number(b[1].split(',')[1]));

  return (
    
    <SafeAreaView>
      <ScrollView style={{backgroundColor: "#ffcc66", height: windowHeight}}>
        <View style={{flex: 1,
          backgroundColor: "#ffcc66",
          alignItems: "center",
          justifyContent: "center",
          }}
        >
        <View style={styles.container}>
          <Text style={{ fontSize: 27, marginTop: 50, marginBottom: 10, fontWeight: "bold" }}>Leader Board</Text>

          {rankEasy.length !== 0 && <Table players={rankEasy}/>}
          {rankMedium.length !== 0 && <Table players={rankMedium}/>}
          {rankHard.length !== 0 && <Table players={rankHard}/>}
          {rankRandom.length !== 0 && <Table players={rankRandom}/>}

          <View style={{ marginTop: 30, marginBottom: 30 }}>
            <TouchableHighlight
              style={{ ...styles.button, backgroundColor: '#5bc0de' }}
              onPress={() => replay()}>
            <Text style={styles.textStyle}>Play Again</Text>
            </TouchableHighlight>
          </View>

        </View>
        </View>
      </ScrollView>
    </SafeAreaView>
   
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffcc66",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    width: 100,
    backgroundColor: '#F194FF',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
  }
});

export default Finish;
