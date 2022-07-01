import * as React from 'react';

import {
  StyleSheet,
  Text,
  View,
  TextInput,

  TouchableHighlight,
  Image,
  Alert,
  ListItem,
  Modal,
  ListRenderItem,

  ScrollView,
  Left,
  Right,
  FlatList,

} from 'react-native';
import { CheckBox } from 'react-native-elements'
import SelectMultiple from 'react-native-select-multiple'
import AsyncStorage from "@react-native-async-storage/async-storage";
import { validateAll } from 'indicative/validator'
import styles from '../../../../Stylesheets/NAppSS'
// import Loader from '../../../../Loader'
import Loader from '../../../../../App/component/Loader'
import { Icon, Card } from 'react-native-elements'

import { CommonActions } from '@react-navigation/native';
 
import RNPickerSelect from 'react-native-picker-select';
import Familys from '../../../../Api/FamilyMemberList'
import DropdownList from '../../Shared/DropdownList'
// import Programs from '../../../../../Api/Registrations/Programs'
  import { CallPI } from '../../../../Api/APICall'
//  import Moment from 'moment';
// import TransactionHistoryList from '../../../TransactionHistory/TransacrionHistoryList';


export default class ClinicRegistrations extends React.Component {
  constructor(props) {
    super(props)
  }
  state = {
    ContractList:[],
    ContractID:'',
    CustomerID :'',isLoading:false
  }


  SelectFamilyMember = (memberID, purchaseName) => {


  this.setState({CustomerID:memberID})
  //  this.GetBandkedCourtList(memberID)

  }

  async GetBandkedCourtList()
  {
   
   const LoginUserID = await AsyncStorage.getItem('LoginUserID');
   var url = 'CustomerScheduler/GetBankedCourtList?customerID='+this.state.CustomerID+'&&loginUserID='+LoginUserID+'&&contractID='+this.state.ContractID;
   console.log(url)
   this.setState({isLoading:true})
   await CallPI("GET",url,null,null,"",null).then(response => response.json()).then(responseJson => {
     console.log("kkaakakakakak  "+JSON.stringify(responseJson))
     this.setState({isLoading:false})
     this.props.navigation.navigate("ManageContractList", {
      BandkedCourtList: responseJson,
      MemberID: this.state.CustomerID,
    })
   }).catch(error => {
    console.log(error)
    this.setState({isLoading:false})
  }); 
  }

  async GetContractList(customerID){
    var contractList = [];
    var url = `CustomerScheduler/ContractManagement?customerID=${customerID}`;
    await CallPI("GET",url,null,customerID,"",null).then(response => response.json()).then(responseJson => {
      
        for (let userObject of responseJson) {
            contractList.push({ label: userObject.ContractName, value: userObject.ID });
        }
        this.setState({
            ContractList: contractList
        })
      }
      ).catch(error => {
        console.log(error)
      });
   }
   SelectContract =  (id) =>{
this.setState({ContractID:id})
   }
   async componentDidMount() {
        const LoginUserID = await AsyncStorage.getItem('LoginUserID');
        this.GetContractList(LoginUserID)
  }
  render() {

    return (
      
      <View style={styles.Pagecontainer}>
      <View style={styles.container}>
        <Loader loading={this.state.isLoading} />
        
            <View style={ styles.inputContainer}>
            <Familys SelectFamilyMember={this.SelectFamilyMember} />
            </View>

            <View style={ styles.inputContainer}>
            <View style={ styles.DropDownInnerContainer}>
           
               <DropdownList

                 OptionList={this.state.ContractList}
                 PlaceHolderText={"Contracts"}
                 selectedValue={this.state.ContractID}
                 setValue={this.SelectContract}

               />
                {/* <RNPickerSelect
        
        onValueChange={(value) => this.SelectContract(value)} 
      value={this.state.ContractID}
      placeholder={{ label: "Select", value: "" }}
      items={  this.state.ContractList}
  /> */}
                {/* <Picker
                      selectedValue={this.state.ContractID}
                      placeholder="Contract"
                      onValueChange={(itemValue, itemIndex) => this.SelectContract(itemValue)}
                    >
                        <Picker.Item label='Contract' value='' key='' color='gray' />
                       {
                        this.state.ContractList.map((v) => {
                          return <Picker.Item label={v.label} value={v.value} key={v.value}   />
                        })
                      }
                    </Picker> */}
                  </View>
                  </View>
             
            <TouchableHighlight style={[styles.buttonContainer]} onPress={() => this.GetBandkedCourtList()} >
              <Text style={styles.buttunTextColo}>Search</Text>
            </TouchableHighlight>
          
        
       
      </View>
      </View>
     


    );

  }

}
 

