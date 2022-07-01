import React from 'react';
import { Button } from 'react-native-elements';

import { View, Text,TouchableOpacity,Alert,StyleSheet,Image} from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
    listenOrientationChange as lor,
    removeOrientationListener as rol
  } from 'react-native-responsive-screen';
//import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

 
 
 
  export default  class AppStartPage extends React.PureComponent {
  //  export default function Appss() {
  
  constructor(props) {
    super(props)
  }
  
  state = {
    isLogout:false,
    HouseCreditAmount:0.00,
    CartItem: [],
  }

  componentDidMount() {
    lor(this);
  }
  
  componentWillUnmount() {
    rol(this);
  }

    render() {
  
      return (

   
        <View style={[styles.containersss, {
           
          flexDirection: "column"
        }]}>
    
    
            <View style={{ height:hp('10%'), alignItems:'center', justifyContent:'center'}} ></View>
            
          <View style={{ height:hp('30%'),  alignItems:'center', justifyContent:'center'}} >
          <Image style={{
    alignSelf: 'center',
    height:hp('30%'),
    
   
    
  }}  resizeMode="stretch" source={require('../../../Images/logo.png')}  />
          </View>
          <View style={{ height:hp('10%'),  alignItems:'center', justifyContent:'center'}} >
            <Text style={{fontSize:RFValue(26), fontWeight:'bold',color:"#88aa31"}} allowFontScaling={false}>PRIDE IN PERFORMANCE</Text>
          </View>
          <View style={{ height:hp('10%'),}}  >
          
              <Button
               
                    title="Login" color="#88aa31"
                     onPress={() => this.props.navigation.navigate('Login')}
                     buttonStyle={{borderRadius:20, backgroundColor:"#88aa31"}}
                    
                   />
                         <Button   buttonStyle={{borderRadius:20 , backgroundColor:"#88aa31" , marginTop:5}}
                 title="New User"   onPress={() => this.props.navigation.navigate('Signup')}
               style={{borderRadius:50}} />
                            <Button   buttonStyle={{borderRadius:20 , backgroundColor:"#88aa31" , marginTop:5}}
                 title="New test"   onPress={() => this.props.navigation.navigate('Test')}
               style={{borderRadius:50}} />
                   </View>
        </View>
                   
           
        // <View>
        //     <View style={{flex:1, alignItems:'center'}}>
    
        //     <Text style={{ fontSize: 23,fontWeight:'bold', color:"#88aa31", alignItems: "center",marginBottom:0}} >
        //         PRIDE IN PERFORMANCE
        //    </Text>    
        //     </View>
          
        //     </View>
    
          
            // <View >
            //   <View style={styles.LoginbuttonContainer}>
    
            //     <Button
               
            //      title="Login" color="#88aa31"
            //       onPress={() => navigation.navigate('Login')}
            //       buttonStyle={{borderRadius:20, backgroundColor:"#88aa31"}}
                 
            //     />
            //   </View>
    
            //   <View style={styles.SignUpButton}>
            //     <Button   buttonStyle={{borderRadius:20 , backgroundColor:"#88aa31"}}
            //       title="New User"   onPress={() => navigation.navigate('Signup')}
            //        style={{borderRadius:50}} />
            //   </View>
            //   <View style={styles.SignUpButton}>
            //     <Button   title="Test" color="#88aa31" onPress={() => navigation.navigate('Test')} />
            //   </View>   
              
              
            // </View>  
          //</View>
           
      );
 }
}


const styles = StyleSheet.create({
    body: {
      flex: 1,
      margin: 50,
      justifyContent:'center',
      alignItems: 'center',
      
    },
    containersss: {
      flex: 1,
      padding: 20,
    },
    container: {
      flex: 0.75,
  
      justifyContent: 'center',
      alignItems: 'center',
  
    },
    LoginbuttonContainer: {
       
   
      marginTop: 15,
      width:'100%'
  
    },
    SignUpButton: {
      marginTop: 5,
      
      color: '#88aa31',
      width:'100%'
  
    },
    container: {
      width: '100%',
       height: '100%',
       flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
     
  },
  header: {
  marginLeft:50
  },
  headerText: {
      fontSize: 15,
      fontWeight: 'bold',
      color: 'white',
      flexWrap: 'wrap',
      textAlign:'center',
   
  },
  headerbackgroundColor: {
    backgroundColor: '#88aa31', 
  
  }
  
  ,icon:{
  
      position:'absolute',
      left:0,
      color:'white'
  
  }
  });
   
  