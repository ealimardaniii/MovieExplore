import React, {PureComponent} from 'react';
import {BackHandler, ToastAndroid} from 'react-native';
import {Router, Scene, Stack, Actions} from 'react-native-router-flux';
import {connect, Provider} from 'react-redux';
import store from './src/redux/Store/Index';
import Search from './src/screens/Search';
import Product from './src/screens/Product';

let backButtonPressedOnceToExit = false;
export default class App extends PureComponent {
  constructor(props) {
    super(props);
    this.onBackPress = this.onBackPress.bind(this);
  }
  onBackPress() {
    if (backButtonPressedOnceToExit) {
      BackHandler.exitApp();
    } else {
      if (Actions.currentScene === 'search') {
        backButtonPressedOnceToExit = true;
        ToastAndroid.show(
          'برای خروج، یک بار دیگر دکمه بازگشت را بزنید.',
          ToastAndroid.LONG,
        );
        setTimeout(() => {
          backButtonPressedOnceToExit = false;
        }, 2000);
        return true;
      } else {
        Actions.pop();
        return true;
      }
    }
  }

  render() {
    const RouterWithRedux = connect()(Router);
    return (
      <Provider store={store}>
        <RouterWithRedux backAndroidHandler={this.onBackPress.bind(this)}>
          <Stack hideNavBar>
            <Scene key="search" component={Search} initial />
            <Scene key="product" component={Product} />
          </Stack>
        </RouterWithRedux>
      </Provider>
    );
  }
}
