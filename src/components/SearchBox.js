import React, {PureComponent} from 'react';
import {View, TextInput, StyleSheet, TouchableOpacity} from 'react-native';
import FontAwsome from 'react-native-vector-icons/FontAwesome';
import {Colors} from '../global/Colors';
class SearchBox extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
    };
  }
  render() {
    const {input} = this.state;
    const {search} = this.props;
    return (
      <View style={styles.content}>
        <TouchableOpacity onPress={() => search(input)} style={styles.btnIcon}>
          <FontAwsome style={styles.icon} name="search" />
        </TouchableOpacity>
        <TextInput
          placeholder="Search Movie"
          placeholderTextColor={Colors.Gray}
          onChangeText={(text) => this.setState({input: text})}
          style={styles.textInput}
          value={input}
          returnKeyType="search"
          onSubmitEditing={() => search(input)}
        />
      </View>
    );
  }
}

export default SearchBox;

const styles = StyleSheet.create({
  textInput: {
    height: 50,
    fontWeight: 'bold',
    letterSpacing: 2,
    flex: 1,
  },
  content: {
    alignSelf: 'center',
    marginVertical: 15,
    flexDirection: 'row',
    alignItems: 'center',
    width: '60%',
    borderRadius: 10,
    elevation: 1,
    backgroundColor: Colors.White,
  },
  icon: {
    fontSize: 24,
  },
  btnIcon: {
    marginHorizontal: 10,
  },
});
