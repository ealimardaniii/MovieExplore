import React, {PureComponent} from 'react';
import {
  View,
  Text,
  StatusBar,
  SafeAreaView,
  Image,
  StyleSheet,
  ToastAndroid,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import {setProduct} from '../redux/Actions/Index';
import SearchBox from '../components/SearchBox';
import {Colors} from '../global/Colors';
import {connect} from 'react-redux';
import FontAwsome from 'react-native-vector-icons/FontAwesome';
import FontAwsome5 from 'react-native-vector-icons/FontAwesome5';
import Empty from '../components/Empty';
import {Actions} from 'react-native-router-flux';
import LinearGradient from 'react-native-linear-gradient';
import Header from '../components/Header';

const height = Dimensions.get('window').height;
const API_KEY = 'e0fbd801';

class Product extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      Loading: true,
      result: [],
      searchText: '',
    };
  }
  componentDidMount() {
    this.GetData(this.props.id);
  }
  async GetData(id) {
    await this.setState({
      Loading: true,
    });
    try {
      let response = await fetch(
        this.props.global.baseApiUrl + `/?apikey=${API_KEY}&i=${id}`,
        {
          method: 'GET',
        },
      );
      const json = await response.json();
      this.setState({Loading: false});
      if (json.Response === 'True') {
        console.log(json.Search);
        this.props.setProduct({
          data: json,
        });
      } else {
        ToastAndroid.show('An error occurred', ToastAndroid.LONG);
      }
    } catch (er) {
      this.setState({Loading: false});
      ToastAndroid.show('An error occurred', ToastAndroid.LONG);
    }
  }
  render() {
    const {result, Loading} = this.state;
    const {data} = this.props.product;
    console.log(this.props);
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar hidden />
        {!Loading ? (
          <ScrollView style={styles.content}>
            <View>
              <Header />
              <View style={styles.Cover} />
              <Image
                resizeMode="stretch"
                style={styles.Img}
                source={{uri: data.Poster}}
              />
              <View style={styles.FooterImg}>
                <LinearGradient
                  colors={['transparent', Colors.Black]}
                  style={styles.linearGradient}>
                  <View style={styles.NameWrapper}>
                    <Text style={styles.Title}>{data.Title}</Text>
                    <Text style={styles.Year}>({data.Year})</Text>
                  </View>
                  <View style={styles.GenreWrapper}>
                    <Text style={styles.GenreText}>{data.Genre}</Text>
                  </View>
                </LinearGradient>
              </View>
            </View>
            <View style={styles.Border} />
            <View style={styles.Detail}>
              <View style={styles.DetailItem}>
                <Text style={styles.DetailItemMeta}>{data.Metascore}</Text>
                <Text style={styles.DetailItemText}>Metascore</Text>
              </View>
              <View style={styles.DetailItem}>
                <FontAwsome name="star" style={styles.DetailItemImdb} />
                <Text style={styles.DetailItemText}>
                  {data.imdbRating}
                  <Text style={styles.imdb}>/10</Text>
                </Text>
              </View>
              <View style={styles.DetailItem}>
                <FontAwsome5 name="clock" style={styles.DetailItemTime} />
                <Text style={styles.DetailItemText}>{data.Runtime}</Text>
              </View>
            </View>
            <View style={styles.Border} />
            <Text style={styles.ContextTitle}>Plot</Text>
            <Text style={styles.Context}>{data.Plot}</Text>
            <View style={styles.Border} />
            <Text style={styles.ContextTitle}>Writers</Text>
            <Text style={styles.Context}>{data.Writer}</Text>
            <View style={styles.Border} />
            <Text style={styles.ContextTitle}>Actors</Text>
            <Text style={styles.Context}>{data.Actors}</Text>
            <View style={styles.Border} />
            <Text style={styles.ContextTitle}>Language</Text>
            <Text style={styles.Context}>{data.Language}</Text>
            <View style={styles.Border} />
            <Text style={styles.ContextTitle}>Country</Text>
            <Text style={styles.Context}>{data.Country}</Text>
            <View style={styles.Border} />
            <Text style={styles.ContextTitle}>Awards</Text>
            <Text style={styles.Context}>{data.Awards}</Text>
            <View style={styles.Border} />
            <Text style={styles.ContextTitle}>Production</Text>
            <Text style={styles.Context}>{data.Production}</Text>
          </ScrollView>
        ) : (
          <ActivityIndicator size={'large'} color={Colors.White} />
        )}
      </SafeAreaView>
    );
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    setProduct: (data) => {
      dispatch(setProduct(data));
    },
  };
};

const mapStateToProps = (state) => {
  return {global: state.global, product: state.product};
};

export default connect(mapStateToProps, mapDispatchToProps)(Product);

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.Black,
    flex: 1,
  },
  DetailItemImdb: {
    color: Colors.Red,
    fontSize: 22,
  },
  DetailItemTime: {
    color: Colors.Light,
    fontSize: 22,
  },
  Context: {
    color: Colors.Light,
    opacity: 0.7,
    marginTop: 10,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  ContextTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
    color: Colors.White,
  },
  content: {},
  Img: {
    flex: 1,
    width: null,
    height: height * 0.8,
  },
  Detail: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  imdb: {
    fontSize: 12,
  },
  DetailItem: {
    alignItems: 'center',
  },
  linearGradient: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    paddingTop: 10,
  },
  Cover: {
    backgroundColor: Colors.Black,
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    zIndex: 2,
    opacity: 0.5,
  },
  Title: {
    fontSize: 22,
    color: Colors.White,
    flex: 1,
  },
  Year: {
    fontSize: 16,
    color: Colors.White,
    flex: 0.7,
  },
  NameWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  GenreWrapper: {
    flex: 1,
  },
  GenreText: {
    borderRadius: 5,
    color: Colors.Light,
    flex: 1,
    opacity: 0.7,
  },
  FooterImg: {
    position: 'absolute',
    bottom: 0,
    zIndex: 5,
    left: 0,
    right: 0,
  },
  Border: {
    borderWidth: 0.3,
    borderColor: Colors.Light,
    marginHorizontal: 20,
    opacity: 0.2,
    marginVertical: 5,
  },
  DetailItemMeta: {
    color: Colors.Green,
    fontWeight: 'bold',
    fontSize: 18,
  },
  DetailItemText: {
    color: Colors.White,
    fontSize: 16,
    marginTop: 3,
  },
});
