import React, {PureComponent} from 'react';
import {
  View,
  Text,
  StatusBar,
  SafeAreaView,
  Image,
  StyleSheet,
  ToastAndroid,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import SearchBox from '../components/SearchBox';
import {Colors} from '../global/Colors';
import {connect} from 'react-redux';
import FontAwsome from 'react-native-vector-icons/FontAwesome';
import Empty from '../components/Empty';
import {Actions} from 'react-native-router-flux';

const API_KEY = 'e0fbd801';

class Search extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      Loading: false,
      result: [],
      searchText: '',
    };
  }
  renderItem({item}) {
    return (
      <TouchableOpacity
        onPress={() => Actions.push('product', {id: item.imdbID})}
        style={styles.Render}>
        <Image
          resizeMode="contain"
          style={styles.Img}
          source={{uri: item.Poster, cache: 'only-if-cached'}}
        />
        <Text style={styles.RenderYear}>{item.Year}</Text>
        <Text style={styles.RenderText}>{item.Title}</Text>
      </TouchableOpacity>
    );
  }
  async GetData(data) {
    await this.setState({
      Loading: true,
      searchText: data ? data : this.state.searchText,
    });
    try {
      let response = await fetch(
        this.props.global.baseApiUrl +
          `/?apikey=${API_KEY}&s=${this.state.searchText}`,
        {
          method: 'GET',
        },
      );
      const json = await response.json();
      this.setState({Loading: false});
      if (json.Response === 'True') {
        console.log(json.Search);
        this.setState({result: json.Search});
        this.scrollView.scrollToIndex({index: 0, animated: true});
      } else {
        this.setState({result: []});
      }
    } catch (er) {
      this.setState({Loading: false});
      ToastAndroid.show('An error occurred', ToastAndroid.LONG);
    }
  }
  render() {
    const {result, Loading} = this.state;
    console.log(this.props);
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar hidden />
        <Text style={styles.Title}>Movie Explore</Text>
        <SearchBox search={(data) => this.GetData(data)} />
        <View style={styles.result}>
          <Text style={styles.resultText}>Movies</Text>
          <FontAwsome style={styles.resultIcon} name="bars" />
        </View>
        <FlatList
          ref={(view) => {
            this.scrollView = view;
          }}
          refreshing={Loading}
          onRefresh={() => this.GetData()}
          numColumns={2}
          data={result}
          columnWrapperStyle={styles.columnWrapper}
          contentContainerStyle={styles.contentContainer}
          renderItem={this.renderItem.bind(this)}
          keyExtractor={(item) => item.imdbID}
          style={styles.content}
          ListEmptyComponent={!Loading ? <Empty /> : null}
        />
      </SafeAreaView>
    );
  }
}
const mapStateToProps = (state) => {
  return {global: state.global};
};

export default connect(mapStateToProps, null)(Search);

const styles = StyleSheet.create({
  Title: {
    color: Colors.White,
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 30,
    marginTop: 20,
  },
  container: {
    backgroundColor: Colors.Black,
    flex: 1,
  },
  content: {
    padding: 20,
  },
  contentContainer: {},
  columnWrapper: {
    paddingBottom: 20,
  },
  resultText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: Colors.Gray,
  },
  resultIcon: {
    fontSize: 20,
    color: Colors.White,
  },
  result: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 20,
  },
  Img: {
    height: 200,
    width: '100%',
    borderRadius: 10,
  },
  Render: {
    flex: 1,
    alignItems: 'center',
    marginBottom: 10,
  },
  RenderText: {
    textAlign: 'center',
    flex: 1,
    letterSpacing: 1,
    fontSize: 16,
    color: Colors.White,
  },
  RenderYear: {
    textAlign: 'center',
    color: Colors.Light,
    flex: 1,
    marginTop: 5,
    letterSpacing: 1,
    fontSize: 14,
  },
});
