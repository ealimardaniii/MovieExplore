import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import FontAwsome from 'react-native-vector-icons/FontAwesome5';
import {Colors} from '../global/Colors';
import {Actions} from 'react-native-router-flux';
import LinearGradient from 'react-native-linear-gradient';

const Header = () => {
  return (
    <LinearGradient
      colors={[Colors.Black, 'transparent']}
      style={styles.Header}>
      <TouchableOpacity onPress={() => Actions.pop()}>
        <FontAwsome style={styles.icon} name="long-arrow-alt-left" />
      </TouchableOpacity>
      <FontAwsome style={styles.icon} name="heart" />
    </LinearGradient>
  );
};
const styles = StyleSheet.create({
  Header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 50,
    position: 'absolute',
    left: 0,
    right: 0,
    zIndex: 3,
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  icon: {fontSize: 22, color: Colors.White},
});
export default Header;
