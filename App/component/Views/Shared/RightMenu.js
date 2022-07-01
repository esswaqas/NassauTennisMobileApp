import React from 'react';

import { View,StyleSheet, Text,TouchableOpacity,Alert,Image, Platform} from 'react-native';
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';
//import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Avatar, Badge, Icon, withBadge } from 'react-native-elements'

import { color } from 'react-native-reanimated';
 
import { CallPI } from '../../../Api/APICall'
import {AuthContext} from  './Context'
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CommonActions } from '@react-navigation/native';
import RightMenu from '../Shared/HeaderRightMenuList'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  listenOrientationChange as lor,
  removeOrientationListener as rol
} from 'react-native-responsive-screen';
import { RFValue } from 'react-native-responsive-fontsize';
import { red100 } from 'react-native-paper/lib/typescript/styles/colors';


  export default  class RightHeader extends React.PureComponent {
  //  export default function Appss() {
  
  constructor(props) {
    super(props)
  }
  
  state = {
    isLogout:false,
    HouseCreditAmount:0.00,
    CartItem: [],

  }


  _menu = null;
  

  setMenuRef = ref => {
    this._menu = ref;
  };

  hideMenu = () => {
    
    this.setState({isLogout:true})
 
    this._menu.hide();
  };

  GoToManagecreditCard = () => {
         
    this.props.navigation.navigate('AddEditCreditCard')
    //setVisible(false) 

  }
 
 
  showMenu =  async () => {
    var amount =await   AsyncStorage.getItem('CustomerHouseCredit');
 
 

    this.setState({HouseCreditAmount:amount})
    this._menu.show();
  };
  CartPage = () => {
    
    this.props.navigation.reset({routes: [{ name: 'MyCart' }]});


     
  };

  show = () => {
    this.setState({
      buttonHeight: 0,
      buttonWidth: 0,
      left: this.props.left,
      menuState: STATES.SHOWN,
      top: this.props.top,
    });
  };
 
 
  BindCartList = async () => {
 
 
    var Cart = await AsyncStorage.getItem('AddToCart');
    if(Cart!=null)
    {
    const LoginUserID = await AsyncStorage.getItem('LoginUserID');
  
    var url =  `Customers/MyCart?customerID=${LoginUserID}&&isBindCart=true`;
 
   // alert("cart be ===="+JSON.parse(Cart))
    // await fetch(url, {
    //   method: 'POST',
    //   headers: {
    //     'Accept': 'application/json',
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(
    //     JSON.parse(Cart)
    //   )
    // })
     await  CallPI('POST', url, JSON.parse(Cart),null,'',  null)
    .then((response) =>      response.json()).then(responseJson => {
        this.setState({
          CartItem: responseJson.CartList,
         
        })
        console.log(" cart   =  " +  this.state.CartItem.length)
      }).catch(error => {
      //  alert("Error  "+JSON.stringify(error))
        this.setState({ isLoading: false })

      });
    }


  }
 async componentDidMount()
  {
    this.BindCartList()
  }

    render() 
    {
      var cartCount = 0 
    return (
 

        <View style={{   flexDirection:'row',alignItems:'center' } }>

          
 
       <View style={{alignItems: 'center',  justifyContent:'center' , marginRight:hp('0.8%')}}> 
      
      {
        this.props.title == "Manage Card(s)" ?
      <Icon  name="plus"  type='font-awesome' color='white' size={hp('3.5%')} onPress={()=>this.GoToManagecreditCard()} style={{ color:'white'}}/>  

       :
null
      } 

      </View>
      
    
            {/* <Icon  name="shopping-cart" type='material' color='white' size={25} onPress={this.CartPage} style={{ color:'white'}}/>  */}
            
            <View style={{alignItems: 'center',  justifyContent:'center' }}>
            <TouchableOpacity
            onPress={this.CartPage} 
             >
              <View style={{flex:1, alignItems: 'center',  justifyContent:'center'}}>
              
 
                 <Icon  name="shopping-cart" type='feather'  color='white' size={hp('3.7%') } 
                />
 {this.state.CartItem.length > 0 ? (
                  <View
                    style={{
                     
                      position: 'absolute',
                      backgroundColor: 'red',
                      width: hp('2.3%'),
                      height: hp('2.3%'),
                      borderRadius:  hp('2%') / 2,
                      right: hp('3.7%'),
                      top: Platform.OS=="ios"? Platform.isPad? hp('0.1%'): -hp('1%'):hp('1%'),
                      alignItems: 'center',
                      justifyContent: 'center',
                      zIndex:9999
                    }}>
                    <Text
                      style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: "#FFFFFF",
                        fontSize: RFValue(12),
                      }}>
                      {this.state.CartItem.length!= null? this.state.CartItem.length:''}
                    </Text>
                  </View>
                ) : null}
               
                <View>
              
                </View>
              </View>
            </TouchableOpacity>
             </View>
              <View>

                <RightMenu  HouseCredit={this.state.HouseCreditAmount}/>
         
        </View> 
        </View>
    );
 }
}


const styless = StyleSheet.create({
    container: {
        // width: '100%',
        // height: '100%',
        flexDirection: 'row',
        alignItems: 'center',
       justifyContent: 'flex-end',
        marginLeft:0,
        //backgroundColor: '#88aa31',
       // backgroundColor: 'pink',
  //marginRight:0,
 // paddingRight:0
       
    },
   
})