import React, { useState, useEffect } from "react";
import {
  View,
  ScrollView,
  Text,
  TextInput,
  TouchableHighlight,
  Dimensions,
  StyleSheet,
  ActivityIndicator
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import _ from 'lodash';
import { fetchBoard, validate, solve, resetGame } from '../store/actions/gameAction';
import CountDown from "react-native-countdown-component";

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

function Game({navigation}) {
  const dispatch = useDispatch();
  const [gameBoard, setGameBoard] = useState([]);
  const [time, setTime] = useState("");
  const validatedResult = useSelector(state => state.gameReducer.validatedResult);
  const board = useSelector(state => state.gameReducer.board);
  const boardIsLoaded = useSelector(state => state.gameReducer.boardIsLoaded);
  const name = useSelector(state => state.homeReducer.name);
  const difficulty = useSelector(state => state.homeReducer.difficulty);
  let duration = 60;
  let isRunning = validatedResult === "solved" ? false : true;

  function onChangeText(text, { rowIndex, colIndex }) {
    const editedBoard = _.cloneDeep(gameBoard);
    editedBoard[rowIndex][colIndex] = Number(text);
    setGameBoard(editedBoard);
  }

  function validateBoard() {
    const data = {
      board: gameBoard
    }
    dispatch(validate(data));
  }

  function solveBoard() {
    const data = {
      board
    }
    dispatch(solve(data));
  }

  function finishGame() {
    dispatch(resetGame());
    navigation.replace('Finish', { name, time });
  }

  // function timeUp() {
  //   dispatch(resetGame());
  //   alert("Time's up!")
  //   navigation.replace('Home');
  // }

  useEffect(() => {
    dispatch(fetchBoard(difficulty));
  },[dispatch]);

  useEffect(() => {
    setGameBoard(board);
  },[board]);

  if (!boardIsLoaded) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0275d8" />
      </View>
    );
  }

  return (
    <ScrollView>
      <View style={styles.container}>
      
        <View style={{ marginTop: 50, marginBottom: 10 }}>
          <CountDown
            until={duration}
            size={20}
            running={isRunning}
            onChange={(x) => setTime(duration - x)}
            onFinish={() => {
              alert("Time Up"), navigation.navigate("Home");
            }}
            digitStyle={{ backgroundColor: "black" }}
            digitTxtStyle={{ color: "#1CC625" }}
            timeToShow={["M", "S"]}
            timeLabels={{ m: "", s: "" }}
          />
        </View>

        <View style={{ marginTop: 10, marginBottom: 20  }}>
          <Text style={{ color: "black", fontSize: 25, fontWeight: "bold" }}>
            {validatedResult.toUpperCase()}
          </Text>
        </View>

        <View style={{ marginBottom: 0 }}>
          {gameBoard.map((row, rowIndex) => (
            <View
              style={
                rowIndex == 2 || rowIndex == 5
                  ? {
                      flexDirection: "row",
                      marginBottom: 10,
                    }
                  : { flexDirection: "row" }
              }
              key={rowIndex}
            >
              {row.map((col, colIndex) => (
                <View
                  style={
                    colIndex == 2 || colIndex == 5
                      ? { marginRight: 10 }
                      : { margin: 0 }
                  }
                  key={colIndex}
                >
                  <TextInput
                    style={styles.input}
                    backgroundColor={board[rowIndex][colIndex] === 0 ? "#FFFFFF" : "#ff9500"}
                    onChangeText={text => onChangeText(text, { rowIndex, colIndex })}
                    value={col === 0 ? "" : col.toString()}
                    editable={board[rowIndex][colIndex] === 0 ? true : false}
                    keyboardType={"numeric"}
                    maxLength={1}
                  />
                </View>
              ))}
            </View>
          ))}
        </View>

        <View style={{ flexDirection: "row", marginTop: 50}}>
          {validatedResult === "solved" ? (
            <TouchableHighlight
              style={{ ...styles.button, backgroundColor: '#5bc0de', marginRight: 10 }}
              onPress={() => finishGame()}>
              <Text style={styles.textStyle}>Finish</Text>
            </TouchableHighlight>
            ) : (
              <>
                <TouchableHighlight
                  style={{ ...styles.button, backgroundColor: '#00e600', marginRight: 10 }}
                  onPress={() => solveBoard()}>
                  <Text style={styles.textStyle}>Solve</Text>
                </TouchableHighlight>
                <TouchableHighlight
                  style={{ ...styles.button, backgroundColor: 'orange' }}
                  onPress={() => validateBoard()}>
                  <Text style={styles.textStyle}>Validate</Text>
                </TouchableHighlight>
              </>
            )
          } 
        </View>

      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: windowHeight,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    flex: 1
  },
  input: {
    margin: 2,
    borderWidth: 1,
    borderColor: "black",
    color: "black",
    textAlign: "center",
    fontWeight: "bold",
    width: (windowWidth - 80) / 9,
    height: (windowWidth - 80) / 9
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

export default Game;
