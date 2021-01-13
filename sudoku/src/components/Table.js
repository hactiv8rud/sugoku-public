import React from 'react';
import { View, Text, Dimensions } from 'react-native';


function Table(props) {

  const windowWidth = Dimensions.get('window').width;
  
  return (
    <>
      <Text style={{ marginTop: 20, fontWeight: 'bold' }}>{props.players[0][1].split(',')[0].toUpperCase()}</Text>
      <View style={{ borderWidth: 1, marginTop: 10}}>
        <View style={{ borderBottomWidth: 1 }}>
          <View
            style={{flexDirection: "row", width: (windowWidth - 60) / 2 }}
          >
            <View
              style={{ width: (windowWidth - 60) / 2, alignItems: "center", borderRightWidth: 1 }}
            >
              <Text style={{ fontWeight: "bold" }}>Name</Text>
            </View>
            <View style={{ width: (windowWidth - 60) / 2, alignItems: "center" }}>
              <Text style={{ fontWeight: "bold" }}>Time (seconds)</Text>
            </View>
          </View>
        </View>
        {props.players.map((player, index) => (
          <View key={index} style={{ flexDirection: "row", width: windowWidth - 60 }}>
            <View
              style={{ width: (windowWidth - 60) / 2, alignItems: "center", borderRightWidth: 1 }}
            >
              <Text style={{ fontSize: 16 }}>{player[0]}</Text>
            </View>
            <View style={{ width: (windowWidth - 60) / 2, alignItems: "center" }}>
              <Text style={{ fontSize: 16 }}>{player[1].split(',')[1]}</Text>
            </View>
          </View>
        ))}
      </View>
    </>
  );
}

export default Table;
