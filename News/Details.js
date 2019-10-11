import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableHighlight,
  ScrollView,
  Linking,
} from 'react-native';
import Constants from 'expo-constants';

export default class Details extends React.Component {
  static navigationOptions = {
    title: 'Detaylar',
    headerTintColor: '#ffffff',
    headerStyle: {
      backgroundColor: '#3d3c3c',
    },
  };
  render() {
    const item = this.props.navigation.getParam('item', null);
    return (
      <View style={styles.container}>
        <ScrollView>
          <TouchableHighlight
            onPress={() => {
              Linking.openURL(item.url);
            }}>
            <Image
              style={{ width: '100%', height: 300 }}
              source={{ uri: item.urlToImage }}
            />
          </TouchableHighlight>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.title}>{item.description}</Text>
          <Text style={styles.title}>{item.content}</Text>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#524f4f',
    padding: 8,
  },
  title: {
    fontSize: 16,
    color: '#ffffff',
    marginTop: 20,
  },
});
