import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableHighlight,
  Image,
  Alert,
  state,
  ScrollView
} from 'react-native';
import Loader from '../../../component/Loader'
import styles from '../../../Stylesheets/NAppSS'
import { validateAll } from 'indicative/validator'
  
export default class InviteFriends extends Component {
 
  constructor(props) {

    super(props);
    this.state = {
      isLoading: false,
      FirstName: "waqas",
      LastName: "",
      Email: "",
  
    };
    
  }
   

SearchList(){
    this.props.navigation.navigate("InviteFriendList",{
        firstName :  this.state.FirstName,
        lastName :  this.state.LastName,
        email :  this.state.Email   })

 }
 
  

  render() {
    return (
    
      <View style={styles.Pagecontainer}>
      <View style={styles.container}>
             
<ScrollView >

        <Loader loading={this.state.isLoading} />

        <View style={styles.inputContainer}>
          <View style={styles.inputInnerContainer}>
            <TextInput style={styles.inputs}
              placeholder="First Name"
              onChangeText={(FirstName) => this.setState({ FirstName })}
            />
          </View>
        </View>

        <View style={styles.inputContainer}>
          <View style={styles.inputInnerContainer}>
            <TextInput style={styles.inputs}
              placeholder="Last Name"
               
              
              onChangeText={(LastName) => this.setState({ LastName })}
            />
          </View>

         
        </View>
        <View style={styles.inputContainer}>
          <View style={styles.inputInnerContainer}>
            <TextInput style={styles.inputs}
              placeholder="Email"
              onChangeText={(Email) => this.setState({ Email })}
            />
          </View>
        </View>
 
        <TouchableHighlight style={[styles.buttonContainer]}  onPress={() => this.SearchList(this.state)}  >
          <Text style={styles.buttunTextColo}>Search </Text>
        </TouchableHighlight>
      
     
      
      </ScrollView>
      </View>
      </View>
    );
  }



}
