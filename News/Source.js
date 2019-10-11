import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  Button,
  TouchableOpacity,
  Platform,
  ScrollView,
  FlatList,
  RefreshControl,
  Linking,
} from 'react-native';
import Constants from 'expo-constants';
import axios from 'axios';

export default class Source extends React.Component {
  constructor(props) {
    super(props);
    this.state = { dr: {}, refreshing: true };
    this.componentDidMount = this.componentDidMount.bind(this);
  }

  handleRefresh() {
    this.setState(
      {
        refreshing: true,
      },
      () => this.componentDidMount()
    );
  }

  static navigationOptions = {
    headerTintColor: '#ffffff',
    headerStyle: {
      backgroundColor: '#3d3c3c',
    }
  }

  componentDidMount() {
    const item = this.props.navigation.state.params.kaynak;
    axios
      .get(item)
      .then(dr => this.setState({ dt: dr.data.articles, refreshing: false }))
      .catch(() => this.setState({ refreshing: false }));
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this.handleRefresh.bind(this)}
            />
          }>
          <FlatList
            data={this.state.dt}
            contentContainerStyle={{ flex: 1 }}
            keyExtractor={item => item.publishedAt}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() =>
                  this.props.navigation.navigate('details', { item: item })
                }>
                <View
                  style={{
                    flexDirection: 'row',
                    borderWidth: 1,
                    borderColor: '#000000',
                    borderRadius: 10,
                    marginBottom: 10,
                    marginRight: 10,
                  }}>
                  <Image
                    style={{ width: '20%', height: 75, borderRadius: 10 }}
                    source={{ uri: item.urlToImage }}
                  />
                  <View
                    style={{
                      flex: 1,
                      flexDirection: 'row',
                      marginBottom: 10,
                      marginRight: 10,
                      backgroundColor: 'transparent',
                    }}>
                    <Text
                      style={{
                        marginTop: 10,
                        marginLeft: 10,
                        fontSize: 16,
                        color: '#ffffff',
                      }}>
                      {item.title}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            )}
          />
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
});
