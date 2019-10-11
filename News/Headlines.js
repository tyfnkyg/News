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
  Alert,
} from 'react-native';
import Constants from 'expo-constants';
import axios from 'axios';

export default class Headlines extends React.Component {
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
    title: 'Haberler',
    headerTintColor: '#ffffff',
    headerStyle: {
      backgroundColor: '#3d3c3c',
    },
    headerRight: (
      
        <Text style={{ fontSize: 16, color: 'white', marginRight: 10 }}>
          Tyfn
        </Text>
      
    ),
  };

  componentDidMount() {
    axios
      .get(
        'https://newsapi.org/v2/top-headlines?country=tr&apiKey=57cdbb1d29ff4960ae47351dc3150e67'
      )
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
          <View style={{ flex: 1, flexDirection: 'row' }}>
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate('source', {
                  kaynak:
                    'https://newsapi.org/v2/top-headlines?country=tr&category=business&apiKey=fb1e3bf9c5b44fac83c4b9ebcecf922a', baslik: 'İş'
                })
              }>
              <Text style={styles.source}>İş</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate('source', {
                  kaynak:
                    'https://newsapi.org/v2/top-headlines?country=tr&category=entertainment&apiKey=fb1e3bf9c5b44fac83c4b9ebcecf922a', baslik: 'İş'
                })
              }>
              <Text style={styles.source}>Eğlence</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate('source', {
                  kaynak:
                    'https://newsapi.org/v2/top-headlines?country=tr&category=health&apiKey=fb1e3bf9c5b44fac83c4b9ebcecf922a', baslik: 'İş'
                })
              }>
              <Text style={styles.source}>Sağlık</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate('source', {
                  kaynak:
                    'https://newsapi.org/v2/top-headlines?country=tr&category=science&apiKey=fb1e3bf9c5b44fac83c4b9ebcecf922a', baslik: 'İş'
                })
              }>
              <Text style={styles.source}>Bilim</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate('source', {
                  kaynak:
                    'https://newsapi.org/v2/top-headlines?country=tr&category=sports&apiKey=fb1e3bf9c5b44fac83c4b9ebcecf922a', baslik: 'İş'
                })
              }>
              <Text style={styles.source}>Spor</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate('source', {
                  kaynak:
                    'https://newsapi.org/v2/top-headlines?country=tr&category=technology&apiKey=fb1e3bf9c5b44fac83c4b9ebcecf922a', baslik: 'İş'
                })
              }>
              <Text style={styles.source}>Teknoloji</Text>
            </TouchableOpacity>
          </View>
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
  source: {
    fontSize: 24,
    color: '#ffffff',
    marginRight: 15,
    marginBottom: 20,
  },
});
