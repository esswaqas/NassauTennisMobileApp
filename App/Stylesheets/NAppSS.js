import { StyleSheet ,Platform} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  listenOrientationChange as lor,
  removeOrientationListener as rol
} from 'react-native-responsive-screen';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
const AppSS = StyleSheet.create({

  Pagecontainer: {
    backgroundColor: 'white',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
 
  },

  PageScroll_heght: {

    height: hp('80%'),
  },
  
  PageFooter_heght: {

    height: hp('20%'),
  },
  ListPagecontainer: {

    backgroundColor: '#f6f3f3',
    //backgroundColor: 'red',
    height: '100%',
    display: 'flex',



  },

  container: {

    backgroundColor: 'white',
    width: '90%',
    height:'98%',
    marginTop: 10,
 

  },
  containerWithCard: {

    backgroundColor: 'white',
    width: '96%',
    height:'98%',
    marginTop: 10,
 

  },
  containerWithCardRow: {
    backgroundColor: 'white',
    width: '100%',
    height:'98%',
    marginTop: 5,

  },

  inputContainer: {

    marginBottom: 10
  },
  inputInnerContainer: {
    borderBottomColor: '#e9e9e9',
    backgroundColor: '#e9e9e9',
    borderRadius: 5,
    borderBottomWidth: 0,
    flexDirection: 'row',
  },
  inputs: {
    borderBottomColor: '#ECEDEB',
    margin: 0,
    //padding: Platform.OS=='ios'?16: 11,
    padding: Platform.OS=='ios'? hp('2%'): hp('1%'),
    
    width: '100%',
    fontSize: RFValue(13)
  },

  DropDownInnerContainer: {
   // height: 50,
   height: Platform.OS=='ios'? hp('6.3%'): hp('6.7%'),   
    borderRadius: 5,
    margin: 0,
    borderBottomColor: '#e9e9e9',
    backgroundColor: '#e9e9e9',
    justifyContent: 'center'
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    borderRadius: 5,
    
    backgroundColor: "#88aa31",
 
    padding:hp('2%')// 12
  },
  buttonWithBorder: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    borderWidth:2,
    borderRadius: 5,
    borderColor:"#88aa31",
    backgroundColor: "white",
    padding:hp('2%')// 12
  },
  
  buttonContainer_danger: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    borderRadius: 5,
    backgroundColor: "red",
    padding:hp('2%')// 12
  },
  buttunTextColo: {
    color: 'white',
    fontSize:RFValue(12),
    ...Platform.select({
      ios: {
         
      },
      android: {
        fontFamily:  'OpenSans-Regular',
      },
     
      // default: {
      //   // other platforms, web for example
      //   fontFamily:  'OpenSans-Regular',
      // }
    }),
    textTransform: 'uppercase'

  },
  buttun_Success: {
    color: "#88aa31",
    //fontFamily:'OpenSans-Regular',
    fontSize:RFValue(12),
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
    }),
  },
  ErrorMessage: {
    color: 'red', fontSize: RFValue(12)
    
  },
  font_8: {
    fontSize: RFValue(8)
  },
  font_9: {
    fontSize: RFValue(9)
  },
  font_10: {
    fontSize: RFValue(10)
  },
  font_11: {
    fontSize: RFValue(11)
  },
  font_12: {
    fontSize: RFValue(12)
  },
  font_13: {
    fontSize: RFValue(13)
  },
  font_14: {
    fontSize: RFValue(14)
  }
  ,
  font_15: {
    fontSize: RFValue(15)
  }
  ,
  font_16: {
    fontSize: RFValue(16)
  },
  font_17: {
    fontSize: RFValue(17)
  },
  font_18: {
    fontSize: RFValue(18)
  },
  font_20: {
    fontSize: RFValue(18)
  },
  Color_danger: {
    color: 'red'
  },
  Color_success: {
    color: "#213749"
  },
  Color_white: {
    color: 'white'
  },
  Color_secondery: {
    color: "#88aa31"
  },

  // use to show rows  card with  header
  CardItem: {
    padding:0,
    margin:5
  },
  // Card use in container with out border
  PageCard: {
    margin: 1,
    elevation: 5,
    marginBottom:1,
  },
  // use to show rows  with card border
  CardHeader: {
    padding: 10, borderTopWidth: 3, borderTopColor: "#213749",elevation: 8, margin: 10,
    //marginBottom:3,

    
  },
  // Card use in container with border
  PageCardHeader: {
     padding: 4, borderTopWidth: 3, borderTopColor: "#213749",
     marginBottom:1,
     margin: 1,
     elevation: 5
  },
  //  items with card border and bottom Delete 
  CardHeader_Button: {
    padding: 0, borderTopWidth: 3, borderTopColor: "#213749", margin:5 ,
    elevation: 8, position:'relative',   marginBottom:hp('2%')
  },
  btnCardbuttom:{
    alignItems: 'center',
    elevation: 50, position:'absolute',bottom:0,right:"45%",
   
  },
  CartItembg_Success: {
    backgroundColor: "#324909",
    borderColor: "#324909",
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
    , paddingRight: 5, paddingLeft: 5,
  },
  CardContainer: {
    padding: 5
  },
  CardExpandableContainer: {
    padding: 10
  },
  // CartItemRow_space_between: {
  //   flexDirection: 'row', justifyContent: 'space-between',paddingRight:5,paddingLeft:5,

  //   alignItems:'center'
  // },

  // CartItemRow_Secondary: {

  //   flexDirection: 'row',paddingRight:5,paddingLeft:5,alignItems:'center', backgroundColor: '#f6f3f3' 
  // },
  // CartItemRow_Secondary: {
  //   flexDirection: 'row', paddingRight:5,paddingLeft:5,alignItems:'center', backgroundColor: 'white'
  // },
  // ListExpandableRowText:{
  //   padding:5,fontSize:12
  //  },

  HeaderHT:{
    ...Platform.select({
      isPad :{
height:RFValue(200)
      },
      ios: {
         
      },
      android: {
        fontFamily:  'OpenSans-Regular',
      }
      // default: {
      //   // other platforms, web for example
      //   fontFamily:  'OpenSans-Regular',
      // }
    }),
  },
  ListRowText: {
    paddingRight: 5,
    paddingLeft: 5,
    paddingBottom: 3,
    paddingTop: 2,
    flexShrink: 1,
 fontSize:RFValue(12),
    
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
    }),
  },
  ListRowText_danger: {
    paddingRight: 5,
    paddingLeft: 5,
    paddingBottom: 3,
    paddingTop: 2,
    flexShrink: 1,
    fontSize:RFValue(12),
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
    }),
    
    color:'red'

  },

  fontFamily:
  {
   
    ...Platform.select({
      ios: {
         
      },
      android: {
        fontFamily:  'OpenSans-Regular',
      }
   
    })
  },
  listItems: {

    flexDirection: 'row',

  },


  MenuItemBox: {
    marginBottom: 10,
    backgroundColor: '#87a931'
  },


  MenuItemInnerBox: {
    flexDirection: "row", justifyContent: "flex-start", alignItems: "center", paddingLeft: 10
  },
  MenuItemBoxIcon: {
    alignSelf: 'center',
    height: hp('10%')
    , width: wp('10%')
  }
  ,
  MenuItemFontSize: {
    fontSize: RFValue(15)
  },
  MenuItemColor: {
    color: 'white'
  },
  PaySharingCount:{
   // padding: hp('0.6%'),
   display:'flex',
   

    color:'white',
    ...Platform.select({ ios: { }, android: { fontFamily:  'OpenSans-Regular',  } }),
    textAlign:'center', justifyContent:'center', alignItems:'center' , fontSize: RFValue(15)
    
  },
  MenuItemText: {
    paddingLeft: 15,
   // fontFamily:'OpenSans-Regular',
    ...Platform.select({ ios: { }, android: { fontFamily:  'OpenSans-Regular',  } }),
    //flex: 1,
   // flexWrap:'wrap',
   flexShrink:1
  }
  ,
 

  ListItemRow_Space_between_secondary: {
    backgroundColor: '#f6f3f3',
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'
  },
  ListItemRow_secondary: {
    backgroundColor: '#f6f3f3',
    flexDirection: 'row', alignItems: 'center'
  },
  ListItemRow_Space_between: {
    backgroundColor: 'white',
    flexDirection: 'row', justifyContent: 'space-between'
    , alignItems: 'center'

  },
  ListItemRow: {
    backgroundColor: 'white', flexDirection: 'row', alignItems: 'center'
  },
  Checkboxcontainer: {

    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '2%',
    marginBottom: '2%',
    paddingLeft: 0,
    alignSelf:'center'
    

  },
  ActivityCheckboxcontainer: {

    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginTop: '2%',
    marginBottom: '2%',
    paddingLeft: 0

  },


  RegitrationcheckBoxContainer:{
    backgroundColor: 'transparent',
    paddingBottom: hp('0.3%'),
    paddingTop: hp('0.8%'),
    paddingLeft: hp('0.8%'),
    paddingRight: hp('0.8%'),
    paddingLeft:hp('0.8%'),
    marginLeft:0,
    borderWidth:0,
    alignItems:'flex-start'
  },
  CheckboxListContain:
   {
    borderBottomColor: '#e9e9e9',
    backgroundColor: '#e9e9e9',
    borderRadius: 0,
     },

     ht_1:{
       height:1
     }, 
     ht_2:{
      height:2
    }, 
    ht_3:{
      height:3
    },
    ht_4:{
      height:4
    },
    ht_5:{
      height:5
    },
    ht_6:{
      height:6
    },
    ht_7:{
      height:7
    },
    ht_8:{
      height:8
    },
    ht_9:{
      height:9
    },
    ht_10:{
      height:10
    },
    ht_11:{
      height:11
    },
    ht_12:{
      height:12
    },
    ht_15:{
      height:15
    },
    ht_18:{
      height:18
    },
    ht_20:{
      height:20
    },
    
    ImageIcon:{
      height:hp('3.9%'),
      width:hp('3.9%'),
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

    tableRow:{

      //backgroundColor:"yellow",
      borderEndWidth:1,
      padding:0,
      margin:0
    },
    tableRowHeader:{
    flex: 1 ,

     //backgroundColor:"yellow",
     borderEndWidth:1,
     padding:10,
     margin:0
   },
    // ViewAsrow:{
    //   display:"flex",
    //   alignItems:'center',
    //   width:wp('20%'),
    //   borderRadius:0,
    //   borderColor:col.borderColor ,
    //   borderWidth:0.4,
    //   alignSelf:'center',
    //   backgroundColor: "#88aa31" ,
    //   textAlign:'center',
    // }
    CartItembg_Success_Text:{
      fontSize:RFValue(12)
    },
    text:{
      fontSize:RFValue(12)
    },
    checkboxImageIcon:{
      height:hp('3.9%'),
      width:hp('3.9%'),
    },

    pdl:{
      ...Platform.select({
        ios: {
          paddingLeft: Platform.isPad?  wp('10%'):  wp('5%')},
        android: {
          paddingLeft:   wp('3.5%')
         }}),
    },
    pdr:{
      ...Platform.select({
        ios: {
          paddingRight: Platform.isPad?  wp('10%'):  wp('5%')},
        android: {
          paddingRight:   wp('3.5%')
         }}),
    },

})




export default AppSS