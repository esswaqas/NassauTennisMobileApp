import { StyleSheet } from 'react-native';
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    height:'100%'
     
     
  },
  Adresscontainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  inputContainer: {

    marginBottom:'2%'
  },
  inputInnerContainer:{

    borderBottomColor: '#F5FCFF',
    backgroundColor: '#FFFFFF',
    borderRadius:0,
    borderBottomWidth: 1,
    width:350,
    height:45,
    flexDirection: 'row',
    alignItems:'center'
    
  },
  inputs: {
    height: 45,
 
    backgroundColor: '#ECEDEB',
    flex: 1,
  },
  innerDropdownContainer: {
    
    width:350,
    height:45,
    backgroundColor: '#ECEDEB',
    
  },
  dropdownInputs: {
    height: 45,
   
    
   
  },
  inputIcon: {
    width: 30,
    height: 30,
    marginBottom: 20,
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
    width: 350,
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

   
    marginTop:10,
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