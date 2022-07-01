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

 
 
import SelectMultiple from 'react-native-select-multiple'
import AsyncStorage from '@react-native-async-storage/async-storage'

import { validateAll } from 'indicative/validator'
import styles from '../../../../Stylesheets/NAppSS'
import Loader from '../../../Loader'

import RNPickerSelect from 'react-native-picker-select';
import DropdownList from '../../Shared/DropdownList';
import { CommonActions } from '@react-navigation/native';
import Moment from 'moment';
import { CallPI } from '../../../../Api/APICall'
import Familys from '../../../../Api/FamilyMemberList'
import Doocuments from '../Membership/MembershipDocumentsList';
import MembershipTermsCondition from '../Membership/TermsConditionModel';
import RegistrationTermsConditionModel from '../../Shared/RegistrationTermsConditionModel'
import AlertBox from '../../Shared/MessageBox'
import CustomCheckbox from '../../Shared/CheckBox'
export default class PersonalInfo extends React.Component {

  constructor(props) {
    super(props)
  }
  state = {

    FirstName: '',
    ElectronicSignature: '',
    Membership: '',
    Participantdata: [],
    DocumentsList: [],
    MembershipList: [],
    MembershipID: '',
    Participant: '',
    NoteForDirector: '',
    UserID: '',
    IsRenew: '',
    IsRenewConfirmation: '',
    IsRenewConfirmationOk: false,
    ResponsPersonIncluded:'',
    PersonIncluded: '',
    error: {},
    IsExtended: '',
    Initail: '',
    TermsConditioncheckbox: '',
    isLoading: false,
    TermsmodalVisible: false,
    isChecked: false,

    selectedFamilyMembers: [],
    SavedFamilyMembers: [],
    ParticipantCheckBox: [],
    MembershipName: '',
    CartList: [],
    TermsConditionHeading: '',
    TermsCondition: '',
    modalVisible: false,
    LastUpdatetdDate: '',
    IsDocuments: false,
    Alert_Visibility: false,
    Alert_Title: '',
    Alert_Message: '',
    Alert_MessageMode: '',


    isAlreadyMembership: false,
    purchaseMembershipWuthActivity:false

  }
  CloseAlert = (values) => {
   // alert("Close s = "+ values)
    this.setState({ TermsmodalVisible: values })
  }

  dismissAlert = (values) => {
    //alert("Open = "+ values)

    this.setState({ Alert_Visibility: values })

    if (this.state.IsRenewConfirmation == true) {
      this.setState({
         IsRenew: "true",
         IsRenewConfirmation: false
         })
         this.FamilyMemberModal(this.state.ResponsPersonIncluded)
    }
    if (this.state.isAlreadyMembership == true) {
      this.setState({
        IsExtended: "true",
        isAlreadyMembership: false
      })
    }
  }
  CancelAlert = (values) => {
 //   alert('ccc')
    this.setState({ Alert_Visibility: values })

    if (this.state.IsRenewConfirmation == true) {
      this.setState({
         IsRenewConfirmation: false ,
         IsRenew: "false",
 MembershipID: '',
 MembershipName: ''
        })

    }
    if (this.state.isAlreadyMembership == true) {
      this.setState({
        IsExtended: "false",
        MembershipID: '',
        MembershipName: '',
        isAlreadyMembership: false

      })
    }
  }

  SelectFamilyMembers = (selectedFamilyMembers) => {
    // selectedFruits is array of { label, value }
    //alert(JSON.stringify( selectedFamilyMembers))
    this.setState({ selectedFamilyMembers })
  }

  SelectFamilyMember = (value) => {
     this.setState({ Participant: value })
  }

  async Participant() {
    const LoginUserID = await AsyncStorage.getItem('LoginUserID');
    var DropDownFamilyMembers = [];
    var FamilyMembersList = [];
    var url = `Customers/GetFamilyMembers?familyMemberID=${LoginUserID}`;
    await CallPI("GET", url, null, null, null, null).then(response => response.json())
      .then(responseJson => {
        for (let userObject of responseJson) {
          DropDownFamilyMembers.push({ label: userObject.Name, value: userObject.Value });
        }
        for (let userObject of responseJson) {
          FamilyMembersList.push({ label: userObject.Name, value: userObject.Value });
        }
        this.setState({
          Participantdata: DropDownFamilyMembers,
          ParticipantCheckBox: FamilyMembersList
        })

      }
      ).catch(error => {
      });
  }

  async MembershipList() {
    const LoginUserID = await AsyncStorage.getItem('LoginUserID');
    var membershiplist = [];
    var url = `CustomerMembership/GetMembership`;
    // fetch(url, {
    //   method: "GET",
    // })
    //   .then(response => response.json())
    await CallPI("GET", url, null, null, null, null).then(response => response.json())
      .then(responseJson => {
        for (let userObject of responseJson) {
          membershiplist.push({ label: userObject.Name, value: userObject.ID });
        }
        this.setState({
          MembershipList: membershiplist
        })
      }
      ).catch(error => {

      });
  }

  ChangescheckboxValues = () => {
    this.setState({
      TermsConditioncheckbox: !this.state.TermsConditioncheckbox
    })
  }

  CheckMembershipStatus = async (membershipID) => {
     this.CheckMembershipStatusss(membershipID);
  }
  CheckMembershipStatusss = async (membershipID) => {
    debugger
    var mID = membershipID.split('-')[0]
    this.setState({ DocumentsList: [] })
    if (membershipID != '') {
      var membershipName = this.state.MembershipList.find(data => data.value == membershipID).label;
      if (this.state.Participant === '') {
        this.setState({
          Alert_Visibility: true,
          Alert_Title: 'Alert',
          Alert_Message: 'Please select participant.',
          Alert_MessageMode: 'error',
          MemebrshipID: ''
        })
        return false;
      }

      var addtocart = new Object();
  //    this.setState({ isLoading: true })
     // alert("www   "+this.state.Participant )
      var url = 'CustomerMembership/CheckMembership?membershipID=' + mID + '&&customerID=' + this.state.Participant + '&&isCheckMembership=true';
      //alert(url)
      var clist = await AsyncStorage.getItem('AddToCart');
      var cartlist = [];
      cartlist = clist == null ? [] : clist
      addtocart.lstCart = cartlist;
      debugger
      await CallPI("POST", url, addtocart, null, '', null).then(response => response.json()).
        then(response => {
          this.setState({ isLoading: false })
         // alert(JSON.stringify(response))

       //   this.setState({ })
var membershipCase = response.Data.message;
          // this.CheckStatusMembership(response,membershipName,membershipID)
          switch (membershipCase) {
            case "This membership is auto renewal. You cannot purchase that.":
              {
                this.setState({
                  isLoading: false,
                  Alert_Visibility: true,
                  Alert_Title: 'Alert',
                  Alert_Message: "This membership is auto renewal. You cannot purchase that.",
                  Alert_MessageMode: 'error',
                  MemebrshipID: '',
                  MembershipName: ''

                })

              }
              break;
            //if any customer family member has that membership then restrict customer not to puchase that membership
            case "Already Family Member has membership.":
              {
                this.setState({
                  isLoading: false,
                  Alert_Visibility: true,
                  Alert_Title: 'Alert',
                  Alert_Message: "Another Family Member Already has a Multi-Person Membership.\nTo Join this Membership please contact Front Desk.",
                  Alert_MessageMode: 'error',
                  MemebrshipID: '',
                  MembershipName: ''
                })
              }
              break;
            //if customer has already membership but want to purchase again
            case "Already Member":
              {

             
           
                this.setState({
                  Alert_Visibility: true,
                  isLoading: false,
                  Alert_Title: 'Are you sure?',
                  Alert_Message: "You already have this membership.\n Do you want to extend from Current Expiration Date?",
                  Alert_MessageMode: 'warngin',
                  MembershipID: membershipID,
                  MembershipName: membershipName,
                  isAlreadyMembership: true

                })
               
              }
              break;
            //if customer want to renew membership
            case "renew":
              {
                this.setState({
                  isLoading: false,
                  Alert_Visibility: true,
                  Alert_Title: 'Are you sure',
                  Alert_Message: "Do you want to renew this membership?",
                  Alert_MessageMode: 'error',
                  IsRenewConfirmation: true,
                  
                  MembershipID: membershipID,
                  MembershipName: membershipName,
                  ResponsPersonIncluded:response.Data.personIncluded

                })
                //renewConfirmation
                // if (this.state.IsRenewConfirmationOk == false) {
                //   this.setState({
                //     IsRenew: "false",
                //     MembershipID: '',
                //     MembershipName: ''
                //   })
                // }
                // else if (this.state.IsRenewConfirmationOk == true) {

                //   this.setState({
                //     IsRenew: "true",
                //     MembershipID: membershipID,
                //     MembershipName: membershipName,
                //     PersonIncluded: response.Data.personIncluded
                //   })
                //   this.FamilyMemberModal(response.Data.personIncluded)
                // }
              }
              break;
     

            default:
            
              if (response.Data.isAutoRenewal == "true") {
                //Alert('Warning', "This membership is auto renewal. You cannot purchase that.");
                this.setState({
               
                  Alert_Visibility: true,
                  Alert_Title: 'Alert',
                  Alert_Message: "This membership is auto renewal. You cannot purchase that.",
                  Alert_MessageMode: 'error',

                })
                return false;
              }
              // alert("esle dsada   "+ membershipID)
              this.setState({
                isLoading: false,
                IsRenew: "false",
                MembershipID: membershipID,
                MembershipName: membershipName
              })

              if (response.Data.personIncluded > 1)
              {
                this.setState({ modalVisible: true })
              }
              else 
              {

              }
              break;
          }
          var lists = [];
          console.log("Responce Document List  == " + JSON.stringify(response.Data.docmodel.lstDocuments))
          for (let userObject of response.Data.docmodel.lstDocuments) {
            lists.push({ label: userObject.Name, value: userObject.ID, Content: userObject.Content, LastUpdatedDate: userObject.LastUpdatedDate, checked: false });
          }


          this.setState({ DocumentsList: lists })
          
        }
        ).catch(error => {
          this.setState({ isLoading: false })
        });
    }
  }
//   CheckStatusMembership = async (response, membershipID,membershipName) => {

//     alert('call ==  '+ response.Data.message+' == '+ membershipID+" ----- "+ membershipName) 
//     if(response.Data.message== "This membership is auto renewal. You cannot purchase that.")
//     {
//         (this.setState({
//         isLoading: false,
//         Alert_Visibility: true,
//         Alert_Title: 'Alert',
//         Alert_Message: "This membership is auto renewal. You cannot purchase that.",
//         Alert_MessageMode: 'error',
//         MemebrshipID: '',
//         MembershipName: ''
//       }))
//     }
//   //if any customer family member has that membership then restrict customer not to puchase that membership
//   else  if(response.Data.message== "Already Family Member has membership.")
//     {
//         this.setState({
//         isLoading: false,
//         Alert_Visibility: true,
//         Alert_Title: 'Alert',
//         Alert_Message: "Another Family Member Already has a Multi-Person Membership.\nTo Join this Membership please contact Front Desk.",
//         Alert_MessageMode: 'error',
//         MemebrshipID: '',
//         MembershipName: ''
//       })
//     }
//   //if customer has already membership but want to purchase again
//   else  if(response.Data.message== "Already Member")
//     {
//       this.setState({
//         Alert_Visibility: true,
//         isLoading: false,
//         Alert_Title: 'Are you sure?',
//         Alert_Message: "You already have this membership.\n Do you want to extend from Current Expiration Date?",
//         Alert_MessageMode: 'warngin',
//         MembershipID: membershipID,
//         MembershipName: membershipName,
//         isAlreadyMembership: true
//      })
//      if(this.state.Alert_Visibility===true)
//      {
//        return false;
//      }
//      //alert(this.state.Alert_Visibility+"  ===   "+ "Already")
//     }
//   //if customer want to renew membership
//   else if(response.Data.message== "renew")
//     {
//       this.setState({
//         isLoading: false,
//         Alert_Visibility: true,
//         Alert_Title: 'Are you sure',
//         Alert_Message: "Do you want to renew this membership?",
//         Alert_MessageMode: 'error',
//         IsRenewConfirmation: true,
//         MembershipID: membershipID,
//         MembershipName: membershipName,
//         ResponsPersonIncluded:response.Data.personIncluded
//       })
//     }
//      else
//  {
//     if (response.Data.isAutoRenewal == "true") {
//       //Alert('Warning', "This membership is auto renewal. You cannot purchase that.");
//       this.setState({
//         Alert_Visibility: true,
//         Alert_Title: 'Alert',
//         Alert_Message: "This membership is auto renewal. You cannot purchase that.",
//         Alert_MessageMode: 'error',
//      })
//       return false;
//     }
//        this.setState({
//       isLoading: false,
//       IsRenew: "false",
//       MembershipID: membershipID,
//       MembershipName: membershipName
//     })
//     if (response.Data.personIncluded > 1)
//     {
//         this.setState({ modalVisible: true })
//     }
//     else
//     {

//     }
//   }
//   }

  FamilyMemberModal(personIncluded) {


    if (personIncluded > 1) {

      this.setState({
        modalVisible: true,
        PersonIncluded: personIncluded
      })
    }
    else {

    }
  }
  HideShowFamilyMemberModel(id) {
    this.setState({ modalVisible: id, MembershipID: '', MembershipName: '' });
  }

  SaveFamilyMemberModel(id) {
    if (this.state.selectedFamilyMembers.length == 0) {
      //  alert("")
      this.setState({
        Alert_Visibility: true,
        Alert_Title: 'Alert',
        Alert_Message: "Please select any family member first.",
        Alert_MessageMode: 'error',

      })
      return false
    }
    else {
      //alert(  this.state.selectedFamilyMembers.map(a => a.value))
      this.setState({
        SavedFamilyMembers:    this.state.selectedFamilyMembers.map(a => a.value),
        modalVisible: id,
      });
    }

  }

  async AddToCart(data) {
    try {



      var addtocart = new Object();
      const rules = {
        Participant: 'required',
        ElectronicSignature: 'required|string|min:5',
        MembershipID: 'required',
      }
      const messages = {

        required: 'Required',
        'ElectronicSignature.min': 'Must be at least five characters.',
      }
      if(this.state.Participant==''){
        this.setState({
          Alert_Visibility: true,
          Alert_Title: 'Alert',
          Alert_Message: "Please select participants.",
          Alert_MessageMode: 'error',

        })
      }

      await validateAll(data, rules, messages)

      if (this.state.DocumentsList.filter(data => data.checked == true).length != this.state.DocumentsList.length)
      {
        //alert("Please check, read and accept all documents.")
        this.setState({
          Alert_Visibility: true,
          Alert_Title: 'Alert',
          Alert_Message: "Please check, read and accept all documents.",
          Alert_MessageMode: 'error',

        })

        return false;
      }
      if (!this.state.TermsConditioncheckbox) {
        // alert("Please select term condition to register.")
        this.setState({
          Alert_Visibility: true,
          Alert_Title: 'Alert',
          Alert_Message: "Please select term condition to register.",
          Alert_MessageMode: 'error',

        })
        return false;
      }

      const LoginUserID = await AsyncStorage.getItem('LoginUserID');
      var clist = await AsyncStorage.getItem('AddToCart');

      debugger
      var cartlist = [];

      cartlist = clist == null ? [] : clist


      if (cartlist.length != 0) {
        this.setState({
          CartList: JSON.parse(cartlist),
          isLoading: true
        })
      }
      this.setState({

        isLoading: true
      })
      //alert(JSON.stringify(this.state.CartList))
      var url =  'CustomerMembership/AddToCartMembership'

      console.log(JSON.stringify(url))
      addtocart.membershipModel = {
        IsRenew: this.state.IsRenew,
        IsExtended: this.state.IsExtended,
        PersonIncluded: this.state.PersonIncluded,
        FamilyMembersInMembership: this.state.SavedFamilyMembers,
        FamilyID: this.state.Participant,
        MemberShipID: this.state.MembershipID,
        ElectronicSignature: this.state.ElectronicSignature,
      };
      addtocart.userID = LoginUserID;
      addtocart.membershipName = this.state.MembershipName;

      addtocart.lstMyCart = this.state.CartList;

 
      
      console.log( "url"+ JSON.stringify(url))
      
      console.log( "Bofy"+ JSON.stringify(addtocart))
     
      await  CallPI('POST', url,addtocart,null,'',  null)
      .then((response) => response.json())
        .then(responseJson => {


          //alert(JSON.stringify(responseJson.message))
          if (responseJson.message.indexOf("Membership already added into cart.") > -1) {
            //Alert.alert("Error", responseJson.message);
            this.setState({
              Alert_Visibility: true,
              Alert_Title: 'Alert',
              Alert_Message: responseJson.message,
              Alert_MessageMode: 'error',

            })
            return false;
          }
          else
          {
            // Alert.alert("Success", responseJson.message);
            AsyncStorage.setItem("AddToCart", JSON.stringify(responseJson.lstMyCart));
          }
            this.setState({
              Alert_Visibility: true,
              Alert_Title: 'Success',
              Alert_Message: responseJson.message,
              Alert_MessageMode: 'succes',

            })



          this.setState({

            isLoading: false
          })
          this.props.navigation.dispatch(
            CommonActions.navigate({
              name: 'MyCart',
            })
          );

        }).catch(error => {

          this.setState({ isLoading: false })
        });
    }
    catch (errors) {
      const formattedErrors = {}
      errors.forEach(error => formattedErrors[error.field] = error.message);
      this.setState({
        error: formattedErrors
      })
    }

  }

  //  GetDocumentDetail(id, list)
  GetDocumentDetail = async (id, list) => {
    this.setState({ DocumentsList: list })

    // var  doc =list.find(data => data.value == id);
    const doc = list.find(data => data.value == id && data.checked)
    var content = list.find(data => data.value == id).Content;
    var heading = list.find(data => data.value == id).label;
    var lastupdateDate = list.find(data => data.value == id).LastUpdatedDate;
    if (doc != null) {
      this.setState({
        TermsCondition: content,
        TermsConditionHeading: heading,
        LastUpdatetdDate: lastupdateDate == null ? '' : lastupdateDate,
        TermsmodalVisible: true,
        IsDocuments: true
      })
    }
    else {
      this.setState({
        TermsCondition: '',
        TermsConditionHeading: '',
        LastUpdatetdDate: '',
        TermsmodalVisible: false,
        IsDocuments: false
      })
    }


  }
  HideTermsConditionModel = async (visible) => {
    this.setState({
      TermsmodalVisible: visible,
      IsTermsCondition: false,
      IsDocuments: false,
    });
  }

GetActivityMembershipData = async ()=>
 {
    const ispurchaseMembershipfromActivity = await AsyncStorage.getItem('IsPurchaseMembershipwithActivity');
    const purchaseMembershipfromActivity = await AsyncStorage.getItem('PurchaseMembershipwithActivity');
    
    if(ispurchaseMembershipfromActivity=="true")
    {
      var participantsID= purchaseMembershipfromActivity.split('|')[0];
     // alert("In "+ participantsID)

      this.setState({ Participant: parseInt(participantsID)})
    }
 
  }


  componentDidMount() {
    this.Participant()

    this.MembershipList()
this.GetActivityMembershipData();
  }

  render() {
    return (
      <View style={styles.Pagecontainer}>
        <View style={styles.container}>
          <AlertBox
            displayMode={this.state.Alert_MessageMode}
            MessageType={''}
            displayMsg={this.state.Alert_Message}
            Title={this.state.Alert_Title}
            visibility={this.state.Alert_Visibility}
            dismissAlert={this.dismissAlert}
            CancelAlert={this.CancelAlert}
          />

          <RegistrationTermsConditionModel
            TermsConditionHeading={this.state.TermsConditionHeading}
            TermsConditionBody={this.state.TermsCondition}
            IsDocuments={this.state.IsDocuments}
            LastDate={this.state.LastUpdatetdDate}
            ButtonTitle={this.state.IsDocuments == true ? 'Accept' : "Close"}
            visibility={this.state.TermsmodalVisible}
            CloseAlert={this.CloseAlert}

          />
          <Loader loading={this.state.isLoading} />
          
          <Modal
              animationType="slide"
              transparent={true}
              visible={this.state.modalVisible}
              onRequestClose={() => {
               // Alert.alert("Modal has been closed.");
              }}
            >


              <View style={styles.ModalView}>

                <Text style={[styles.fontFamily, { marginLeft: 13, marginTop: 10 }]}>Add Family Members </Text>

                <SelectMultiple
                  items={this.state.ParticipantCheckBox}
                  // renderLabel={renderLabel}
                  selectedItems={this.state.selectedFamilyMembers}
                  onSelectionsChange={this.SelectFamilyMembers} />


                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center',alignSelf :'center', marginTop:'2%'}}>
 

                    <TouchableHighlight style={[{ width: '30%' }, styles.buttonContainer_danger, { marginRight: 5 ,padding:'2%'}]}
                      onPress={() => {
                        this.HideShowFamilyMemberModel(false);
                      }}
                    >
                      <Text style={styles.buttunTextColo}>Close</Text>
                    </TouchableHighlight>
                   
                    <TouchableHighlight style={[{ width: '30%' }, styles.buttonContainer , { padding:'2%'}]}
                      onPress={() => {
                        this.SaveFamilyMemberModel(false);
                      }}
                    >
                      <Text style={styles.buttunTextColo}>Save</Text>
                    </TouchableHighlight>
                  </View>
 



              </View>


            </Modal>
          <ScrollView >





            <View style={styles.inputContainer}>
            <View style={styles.DropDownInnerContainer}>
              {

              }

<DropdownList
  OptionList={this.state.Participantdata}
  PlaceHolderText={"Participants"}
  selectedValue={this.state.Participant}
  setValue={this.SelectFamilyMember}
/>


</View>
              {/* <Familys SelectFamilyMember={this.SelectFamilyMember} /> */}


              <View>
                {
                  this.state.error['Participant'] && <Text style={styles.ErrorMessage}>{this.state.error['Participant']}</Text>
                }
              </View>
            </View>

            <View style={styles.inputContainer}>
              <View style={styles.DropDownInnerContainer}>

                <DropdownList
                  OptionList={this.state.MembershipList}
                  PlaceHolderText={"Membership"}
                  selectedValue={this.state.MembershipID}
                  setValue={this.CheckMembershipStatus}
                />


              </View>
              <View>
                {
                  this.state.error['MembershipID'] && <Text style={styles.ErrorMessage}>{this.state.error['MembershipID']}</Text>
                }
              </View>
            </View>
            <View style={styles.inputContainer}>
              <View style={styles.inputInnerContainer}>
                <TextInput style={styles.inputs}
                  placeholder="Note for Director"
                  multiline={true}
                  numberOfLines={4}

                  value={this.state.NoteForDirector}
                  onChangeText={(NoteForDirector) => this.setState({ NoteForDirector })}
                />
              </View>
              <View>
                {
                  this.state.error['NoteForDirector'] && <Text style={styles.ErrorMessage}>{this.state.error['NoteForDirector']}</Text>
                }
              </View>
            </View>
            <View style={styles.inputContainer}>
            <Text style={[styles.font_12,styles.fontFamily]}>TERMS OF ACCEPTANCE and SIGNATURE</Text>
            </View>
            <View style={styles.inputContainer}>
              <Text style={[styles.font_12,styles.fontFamily]}>
                I, the adult applicant (and/or parent/guardian of the minor applicant) of the program(s) chosen above, acknowledge and agree to the
                terms, conditions and liability waiver required for all program participants.

              </Text>




            </View>

            <View style={styles.inputContainer}>
              <View style={styles.inputInnerContainer}>
                <TextInput style={styles.inputs}
                  placeholder="Signature"

                  value={this.state.ElectronicSignature}
                  onChangeText={(ElectronicSignature) => this.setState({ ElectronicSignature })}
                />
              </View>
              <View>
                {
                  this.state.error['ElectronicSignature'] && <Text style={styles.ErrorMessage}>{this.state.error['ElectronicSignature']}</Text>
                }
              </View>
            </View>

            {

              this.state.DocumentsList.length > 0 ?
                <View style={styles.inputContainer}>
                  <View style={styles.inputInnerContainer}>

                    <Doocuments docomentList={this.state.DocumentsList} DocumentDetail={this.GetDocumentDetail} />
                  </View>
                </View>

                :
                null
            }

            <View style={styles.ActivityCheckboxcontainer}>
              <View style={{ width: '12%',   marginRight:5 }}>
                <CustomCheckbox
                  title={''}
                  checked={this.state.TermsConditioncheckbox}
                  setValue={this.ChangescheckboxValues}
                />
              </View>
              <View style={{ width: '87%' }}>
              <Text style={[styles.font_12,styles.fontFamily]}>
                  I understand that checking this box constitutes a legal signature confirming that
                  I acknowledge and agree to the terms, conditions and liability waiver  required for all program participants.
                  {/*
                                            <Text
                                                style={{ color: 'red' }}
                                                onPress={() => { this.TermsConditions() }}
                                            >
                                                terms and conditions
                                            </Text>
                                            {" "}  as well as the contents, conditions and requirements contained in the documents above.
                                         */}
                </Text>
              </View>
            </View>
            {/* <View style={[styles.Checkboxcontainer,{marginLeft:15,paddingRight:15 }]}>
              <CheckBox
               style={{  width:20, height:20}}
                 boxType={true}
                 tintColor="#000"
                 onFillColor="#000"πˆˆü onTintColor="#000" offAnimationType="flat"
                value={this.state.TermsConditioncheckbox}
                onChange={() => this.ChangescheckboxValues()} />

              <Text style={{ marginTop: '10%' , justifyContent: 'space-between',flexWrap:'wrap'}} >
               I understand that checking this box constitutes a legal signature confirming that
               I acknowledge and agree to the terms, conditions and liability waiver  required for all program participants.

                </Text>
                <View>

                </View>
            </View> */}



          </ScrollView>
          <TouchableHighlight style={[styles.buttonContainer]} onPress={() => this.AddToCart(this.state)} >
            <Text style={styles.buttunTextColo}>Add to Cart</Text>
          </TouchableHighlight>

          <TouchableHighlight style={[styles.buttonContainer_danger]} onPress={() => this.props.navigation.reset({ routes: [{ name: 'DashboardList' }] })} >
            <Text style={styles.buttunTextColo}>cancel </Text>
          </TouchableHighlight>
        </View>

      </View>
    );

  }

}