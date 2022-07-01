 

import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { StyleSheet,Platform } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  listenOrientationChange as lor,
  removeOrientationListener as rol
} from 'react-native-responsive-screen';
 
    const styles = StyleSheet.create({
        // container: {
        //   flex: 1,
        //   justifyContent: 'center',
        //   alignItems: 'center',
        //   backgroundColor: '#DCDCDC',
        // },
        // inputContainer: {

        //   marginBottom:20
        // },
        // inputInnerContainer:{
        //   borderBottomColor: '#FFFFFF',
        //   backgroundColor: '#ECEDEB',
         
        //   borderRadius:0,
        //   borderBottomWidth: 1,
        //   width:350,
        //   height:45,
         
        //   flexDirection: 'row',
        //   alignItems:'center'
        // },
        // inputs:{
        //     height:45,
        //     marginLeft:16,
        //     borderBottomColor: '#ECEDEB',
        //     flex:1,
        // },
        // inputIcon:{
        //   width:30,
        //   height:30,
        //   marginLeft:15,
        //   justifyContent: 'center'
        // },
        // buttonContainer: {
        //   height:45,
        //   flexDirection: 'row',
        //   justifyContent: 'center',
        //   alignItems: 'center',
        //   marginBottom:5,
        //   width:350,
        //   borderRadius:0,
        // },
        // loginButton: {
        //   backgroundColor: "#88aa31",
        // },
        // loginText: {
        //   color: 'white',
        // },
        // ErrorMessage:{
        //   color:'red'
        // }
        Pagecontainer: {
    
             backgroundColor: 'white',
             height: '100%',
             display:'flex',
             
          
             justifyContent: 'center',
             alignItems:'center',
             
        },

        container: {
          
         
             backgroundColor: 'white',
            width:'96%'
        },
        inputContainer: {
      
          marginBottom: 10
        },
        inputInnerContainer: {
        
          borderBottomColor: '#e9e9e9',
          backgroundColor: '#e9e9e9',
          borderRadius: 5,
          borderBottomWidth: 1,
         
          flexDirection: 'row',
          
 
        },
        inputs: {
          borderBottomColor: '#ECEDEB',
          margin:0  ,
          padding: hp('1.5%'),
          width:'100%', fontSize: RFValue(13)
        
          
        
        },
        Logininputs: {
          borderBottomColor: '#ECEDEB',
          margin:0  ,
        //  padding: Platform.OS=='ios'? 10:8,
        padding: Platform.isPad? hp('1.5%'): hp('1.2%'),
          width:'100%',
        },
        inputIcon: {
          width: '100%',
          height: 30,
          marginLeft: 15,
          justifyContent: 'center'
        },
        LoginbuttonContainer: {
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: 10,
          borderRadius: 5,
          backgroundColor: "#88aa31",
         // padding: Platform.OS=='ios'? 10:8,
          padding: Platform.isPad? hp('1.5%'): hp('1.2%'),
        },
        buttonContainer: {
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: 10,
           borderRadius: 5,
          backgroundColor: "#88aa31",
          //padding:12
          padding:hp('1.6%')// 12
        },
        DropDownInnerContainer: {
          // height: 50,
          height: hp('5.8%'),
           borderRadius: 5,
           margin: 0,
           borderBottomColor: '#e9e9e9',
           backgroundColor: '#e9e9e9',
           justifyContent: 'center'
         },
        buttonTextColor: {
          color:'white'
        },
        buttonFontSize: {
         fontSize:RFValue(12)
        },
        
       
        loginText: {
          color: 'white',
        },
        ErrorMessage: {
          color: 'red'
        },



        Checkboxcontainer: {

 
          marginBottom: 10,
          flexDirection: "row", 
           justifyContent: "space-between" ,
           alignItems:'center'
      
        },
         Checkbox: {
         
          // color:'red'
       
      transform: [{ scaleX:1.2 }, { scaleY:1.2 }]  
        },

        textFontFamily:{
          ...Platform.select({
            ios: {
               
            },
            android: {
              fontFamily:  'OpenSans-Regular',
            }
            // default: {
            //   // other platforms, web for example
            //   fontFamily:  'OpenSans-Regular',
            // }
          })
        },
        textStyle:{
          textAlign:'center' , fontSize:RFValue(10)
          //,textDecorationLine:'underline',
        },
    textColor:{
          color: "#88aa31", 
        },
        textColor_white:{
          color: "white", 
        }
,
        CardList:{

          padding: 0, borderTopWidth: 3, borderTopColor: "#213749", margin: 1 
        },
        CardListText:{
          fontSize: RFValue(12)
        }
        
});

export default styles