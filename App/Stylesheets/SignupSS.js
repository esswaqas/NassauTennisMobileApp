import { StyleSheet } from 'react-native';
 
const styles = StyleSheet.create({

  Pagecontainer: {
    
    backgroundColor: 'white',
    height: '100%',
    display:'flex',
    
 
    justifyContent: 'center',
    alignItems:'center',
    
},
container: {
          
         
  backgroundColor: 'white',
 width:'90%'
},
  // container: {
  //   flex: 1,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   backgroundColor: '#FFFFFF',
  //   height:'100%'
     
     
  // },
  Adresscontainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  inputContainer: {

    marginBottom:10
  },
  inputInnerContainer:{

    borderBottomColor: '#F5FCFF',
    backgroundColor: '#ECEDEB',
    borderRadius: 0,
    borderBottomWidth: 1,
    width: '100%',
    height: 45,

    flexDirection: 'row',
    alignItems: 'center'
    
  },
   DropDownInnerContainer:{
     
    height:45,
    borderRadius:0,
    backgroundColor: '#ECEDEB',
    justifyContent:'center'
    
  },
  inputs: {
    height: 45,
          marginLeft: 16,
          borderBottomColor: '#ECEDEB',
          flex: 1,
  },
  inputIcon: {
    width: 30,
    height: 30,
    marginLeft: 15,
    justifyContent: 'center',
   },
  radioButton: {
  
    flexDirection:'row',
    justifyContent: 'center',
 
    marginLeft:'10%'
    
  },
  buttonContainer: {
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: '2%',
    
    borderRadius: 15,
  },
  loginButton: {
    backgroundColor: "#88aa31",
  },
  loginText: {
    color: 'white',
  },
  rbdMale: {
    color: "#88aa31",
    width: 300,
  },
  Checkboxcontainer: {

    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',

  },
  TermsConditionsCheckbox: {
    marginBottom: 5,
  },
  dropdown_6: {
     

    backgroundColor: '#ECEDEB',
    width: 350,
    height: 45,
    
  },
  dropdown_3_dropdownTextStyle: {

    textAlignVertical: 'center',
    width: 350,
    textAlign: 'center',
    fontSize: 18,
  
    backgroundColor: '#ECEDEB',
    color: '#000'
  },
  dropdown_textStyle: {

   
    marginTop:14,
    textAlign: 'center',
    fontSize: 14,


  },
  ErrorMessage:{
    color:'red'
  },
  radioButtonList: {
  
    flexDirection:'row',
    justifyContent: 'center',
 
 
    
  }
  
});

export default styles