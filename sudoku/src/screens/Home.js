import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setPlayerName, setGameDifficulty } from '../store/actions/homeAction';
import { View, TextInput, Text, Modal, TouchableHighlight, StyleSheet, Dimensions } from 'react-native';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

function Home({ navigation }) {
  const [name, setName] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [confirmationModal, setConfirmationModal] = useState(false);
  const [alertModal, setAlertModal] = useState(false);
  const dispatch = useDispatch();

  function showConfirmation(difficulty) {
    if(name.trim() === '') {
      setAlertModal(true);
    } else {
      setDifficulty(difficulty);
      setConfirmationModal(true);
    }
  }

  function playGame() {
    dispatch(setPlayerName(name));
    dispatch(setGameDifficulty(difficulty));
    navigation.replace("Game");
    setName('');
    setDifficulty('');
    setConfirmationModal(false);
  }

  return (
    <View style={styles.container}>
      <View
        style={{
          backgroundColor: "#ffecb3",
          justifyContent: "center",
          alignItems: "center",
          width: windowWidth - 70,
          height: windowWidth - 70,
          borderRadius: 10,
          marginTop: windowHeight / 20 
        }}
      >
        <View style={{ flex: 0.25 }}>
          <Text
            style={{
              fontSize: 27,
              fontWeight: "bold",
              color: "black"
            }}
          >
            Sudoku
          </Text>
        </View>
        <View
          style={{
            width: 250,
            marginTop: 10,
            marginBottom: 10,
            backgroundColor: "white",
            padding: 7,
            borderRadius: 10,
          }}
        >
          <TextInput
            style={{ textAlign: "center", borderRadius: 10, height: 30 }}
            onChangeText={(text) => setName(text)}
            value={name}
            placeholder="Enter your name"
            
          ></TextInput>
        </View>

        <View>
          <View style={{ flexDirection: "row", marginTop: 10}}>
            <TouchableHighlight
              style={{ ...styles.modalButton, backgroundColor: '#00e600', marginRight: 10 }}
              onPress={() => showConfirmation("easy")}>
              <Text style={styles.textStyle}>Easy</Text>
            </TouchableHighlight>
            <TouchableHighlight
              style={{ ...styles.modalButton, backgroundColor: 'orange' }}
              onPress={() => showConfirmation("medium")}>
              <Text style={styles.textStyle}>Medium</Text>
            </TouchableHighlight>
          </View>

          <View style={{ flexDirection: "row", marginTop: 10 }}>
            <TouchableHighlight
              style={{ ...styles.modalButton, backgroundColor: 'red', marginRight: 10 }}
              onPress={() => showConfirmation("hard")}>
              <Text style={styles.textStyle}>Hard</Text>
            </TouchableHighlight>
            <TouchableHighlight
              style={{ ...styles.modalButton, backgroundColor: 'violet' }}
              onPress={() => showConfirmation("random")}>
              <Text style={styles.textStyle}>Random</Text>
            </TouchableHighlight>
          </View>

        </View>
      </View>

      <Modal
        animationType="fade"
        transparent={true}
        visible={confirmationModal}
       >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={{ ...styles.modalText, fontWeight: "bold", fontSize: 25}}>{name}</Text>
            <Text style={{ ...styles.modalText, fontSize: 20, marginTop: 10}}>{difficulty.toUpperCase()}</Text>
            <View style={{ flexDirection: "row", marginTop: 10}}>
              <TouchableHighlight
                style={{ ...styles.modalButton, backgroundColor: '#00e600', marginRight: 10 }}
                onPress={() => playGame()}>
                <Text style={styles.textStyle}>Play</Text>
              </TouchableHighlight>
              <TouchableHighlight
                style={{ ...styles.modalButton, backgroundColor: '#ff3300' }}
                onPress={() => setConfirmationModal(!confirmationModal)}>
                <Text style={styles.textStyle}>Cancel</Text>
              </TouchableHighlight>
            </View>
            
          </View>
        </View>
      </Modal>

      <Modal
        animationType="fade"
        transparent={true}
        visible={alertModal}
       >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={{ ...styles.modalText, marginTop: 10, fontSize: 25}}>Name is required</Text>
            <View style={{ flexDirection: "row", marginTop: 40}}>
              <TouchableHighlight
                style={{ ...styles.modalButton, backgroundColor: '#00e600' }}
                onPress={() => setAlertModal(!alertModal)}>
                <Text style={styles.textStyle}>OK</Text>
              </TouchableHighlight>
            </View>
            
          </View>
        </View>
      </Modal>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffcc66",
    alignItems: "center",
    justifyContent: "center",
    height: windowHeight
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    height: 220
  },
  modalButton: {
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
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  }
});

export default Home;
