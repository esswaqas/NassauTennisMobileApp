import { StyleSheet } from 'react-native';
const AppSS = StyleSheet.create({
   
  TextColor: {
    color: 'white',
    fontSize: 18,
    textAlign:'center'
  },

  RegistrationsBox: {
    width: '50%',
    height: '25%',
    padding: 5,
    backgroundColor:'black'

  },
  SchedulersBox: {
    width: '50%',
    height: '25%',
    padding: 5,
  
  },

  PageContainer:{
    //test
    // backgroundColor: 'white',
    //  width: '100%'
    // ,height:'100%'

    backgroundColor: 'white',
    height: '100%',
    display:'flex',
    
 
    justifyContent: 'center',
    alignItems:'center',
  },
  
  container: {
    // flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    // backgroundColor: '#FFFFFF',
    // height:'100%',
    // width:'100%'
    backgroundColor: 'white',
    width:'90%',

    height:'100%'
 
     
  },
  innerDropdownContainer: {
    
   // width:'100%',
    height:45,
    backgroundColor: '#ECEDEB',
    
  },
  TouchableButton: {
    height: 45,
    marginTop:5,
    borderRadius:15,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#88aa31", 
    width: '100%',
     elevation: 2,
    

  },
 
  TouchableConfirmCreditButton: {
    height: 45,
    marginTop:0,
    borderRadius:15,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#88aa31", 
     
     elevation: 2,
    
     
  },
  TouchableCancelButton: {
    height: 45,
    padding:5,
    borderRadius:15,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "red", 
    width: '100%',
     elevation: 2,
    
  
     marginTop:5,
 
  
  },
  TouchableButtonText: {
    color: 'white',
    
    // fontWeight:'bold'
  },
  TouchableButtonTimeSlotsText: {
    color: 'black',
    
    // fontWeight:'bold'
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
  
  inputs: {
    // height: 45,
    // width:'100%',
    // backgroundColor: '#ECEDEB',   

    height: 45,
    marginLeft: 10,
    borderBottomColor: '#ECEDEB',
    
    
},
  innerDropdownContainer: {
    width:'100%',
    
    height:45,
    backgroundColor: '#ECEDEB',
    justifyContent:'center'
    
  },

    inputContainer: {
      width:'100%',
      marginTop:'2%',
    //      flexDirection: 'row',
    // justifyContent: 'center',
    // alignItems: 'center',
    },
    Checkboxcontainer: {

      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: '2%',
      marginBottom: '2%',
      paddingLeft:0
      
    },
    
    FlatListItems:{
      margin:5,
      padding:4,
      width:'100%',
       flexDirection:'row',
      backgroundColor:'#FCF8F9'
    },
    
    FlatListFontSize:{
      fontSize:12
    },
    FlatListHeader:{
    fontSize:10,
    fontWeight:'bold',
    flexShrink: 1
  },
  ErrorMessage:{
    color:'red'
  },
  ModalcenteredView: {
    flex: 1,
  
     
     
  },
  ManageContractModalView: {
    
     
    margin: 10,
   height:'30%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 5,
    
    shadowColor: "#0000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  ModalView: {
    
     
    margin: 10,
   
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 5,
    
    shadowColor: "#0000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  ModalCloseButton: {
    backgroundColor: "red",
    borderRadius: 10,
    padding: 5,
    alignItems:'center',
    elevation: 2
     
  },
   ModalSaveButton: {
    backgroundColor: "#88aa31",
    borderRadius: 10,
    padding: 5,
    elevation: 2
  },
  ModalCloseButtonTextStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  ModalSaveButtonTextStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  radioButton: {
  marginTop:10,
    flexDirection:'row',
    justifyContent: 'center',
 
    marginLeft:'10%'
    
  },
  
  
  bgGreenColor: {
  backgroundColor:"#88aa31"
    },
    pgmarginTop:{
      marginTop: '10%'
    },
    scrollView: {
      
  
     width: '90%', flex: 1,
     marginBottom:'4%'
    },
    ExpandablelistItems:{
      margin:'1%',
       marginLeft:'2%',
      width:'95%',
       flexDirection:'row',
     
    },
    ExpandableChildItems:{
      margin:10,
      padding:5,
      width:'95%',
       flexDirection:'row',
      backgroundColor:'#FCF8F9'
    },

    text:{fontSize:12},
    textHeader:{
      fontSize:13,
      fontWeight:'bold',
      flexShrink: 1
    },

    TimeSlotsButton: {
      height: 30,
      
      borderRadius:30,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
       borderColor:'black',
      width: '99%',
       elevation: 2,
       borderWidth:1,
  
    },
    TimeSlotsFlatListItems:{
      margin:2,
      padding:1,
      width: '100%',
       flexDirection:'column',
       
      
    },
    LabelText: {
      height: 45,
      width:'100%',
      backgroundColor: '#ECEDEB',   
      
  },
/////////////////////////
  containersss: {
    flex: 1,
    flexDirection:'column',
    margin:10,
    alignItems:'center',

    // flexDirection:'column',
    // height:500,
    // marginTop: 10,
    // backgroundColor: 'yellow',
    // height: '100%'
  },
  item: {
    flex: 1,
    flexDirection:'column',
    alignItems:'center',
    width:'100%',
    borderRadius:0,
    borderColor:'grey',
    borderWidth:1,margin:1,
    backgroundColor: '#f9c2ff',
    textAlign:'center',
     padding: 2,
    //   height:10,
  
    // marginVertical: 8,
    // marginHorizontal: 16,
  },
  CourtSchedulerTitle: {
    fontSize: 12,
    
  },
})



export default AppSS