import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Colors} from '../global/Colors';

const Empty = () => {
  return (
    <View style={styles.content}>
      <Text style={styles.text}>Not Found</Text>
    </View>
  );
};
export default Empty;

const styles = StyleSheet.create({
  content: {
    alignItems: 'center',
    alignSelf: 'center',
    flex: 1,
  },
  text: {
    color: Colors.HardGray,
    fontSize: 18,
  },
});
