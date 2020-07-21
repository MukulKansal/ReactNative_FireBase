import React from 'react';
import { StyleSheet, Text, View , Image} from 'react-native';
import { Button } from 'native-base';
import * as firebase from 'firebase';

export default class HomeScreen extends React.Component {

  constructor(props){
    super(props);
    this.state = {
        name: "" ,
        email: "",
    }
}
static navigationOptions = {
  title: "Home",
  header: null
}

 componentDidMount(){
  firebase.auth().onAuthStateChanged(authenticate => {
    if (authenticate) {
      this.setState({
        email: authenticate.email,
        name: authenticate.displayName
      })
    }else {
      this.props.navigation.replace('Sign In')
    }
  })
}

  signOutUser = () => {
    firebase.auth().signOut()
    .then(()=>{
      console.log('Sign out')
    })
    .catch(error => alert(error.message))
  }

  render(){
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image 
          source={require('../assets/logo.png')}
        />
        <Text> Learn Code Online </Text>
      </View>
      <View style={styles.userDetails}>
        <Text> Hey User {this.state.name}</Text>
      </View>
      <Button
        style={styles.button}
        full
        rounded
        success
        onPress={()=>{
          this.signOutUser();
        }}
      >
        <Text style={styles.buttonText}> Sign Out </Text>
      </Button>
    </View>
  );
}}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    margin: 20
  },
  logoContainer: {
    alignItems: "center",
    marginTop: 100,
    marginBottom: 100
  },
  userDetails: {},

  button: {
    marginTop: 20
  },
  buttonText: {
    color: "#fff"
  }
});