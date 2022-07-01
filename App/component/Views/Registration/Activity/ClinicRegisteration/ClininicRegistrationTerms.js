import * as React from 'react';
import {Text,  View,TextInput,TouchableOpacity,Image,Alert,ScrollView,FlatList} from 'react-native';
import { CheckBox, Card ,Icon} from 'react-native-elements'
import AsyncStorage from '@react-native-async-storage/async-storage'

import { validateAll } from 'indicative/validator'
import styles from '../../../../../Stylesheets/NAppSS'
import Loader from '../../../../Loader'
import { CallPI } from '../../../../../Api/APICall'
import { CommonActions } from '@react-navigation/native';
import CustomCheckbox from '../../../Shared/CheckBox'
import RegistrationTermsConditionModel from '../../../Shared/RegistrationTermsConditionModel'
import AlertBox from '../../../Shared/MessageBox'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
    listenOrientationChange as lor,
    removeOrientationListener as rol
  } from 'react-native-responsive-screen';
export default class PersonalInfo extends React.Component {

    constructor(props) {
        super(props)
    }
    state = {
        NoteForDirector: '',
        ElectronicSignature: '',
        TermsConditioncheckbox: false,
        isLoading: false,
        TermsCondition: '',
        modalVisible: false,
        TermsConditionHeading: '',
        DocumentsList: [],
        SelectedDocumentsList: [],
        LastUpdatetdDate: '',
        checkedId: -1,
        SelectedDocumentList: [],
        SelectedDocuments: [],
        IsTermsCondition: false,
        IsDocuments: false,
        SelectedDays:[],
        error: {},
        Alert_Visibility: false,
        Alert_Title: '',
        Alert_Message: '',
        Alert_MessageMode: '',


    }

    CloseAlert = (values) => { this.setState({ modalVisible: values }) }

    dismissAlert = (values) => { this.setState({ Alert_Visibility: values }) }
    CancelAlert = (values) => { this.setState({ Alert_Visibility: values }) }
    ChangescheckboxValues = () => {
        this.setState({
            TermsConditioncheckbox: !this.state.TermsConditioncheckbox
        })
    }
    async AddToCart(data) {
        try {
            const rules = {
                ElectronicSignature: 'required',
                ElectronicSignature: 'required|string|min:5',
            }
            const messages = {
                required: 'Required',
                'ElectronicSignature.min': 'Must be at least five characters.',
            }
            await validateAll(data, rules, messages)
            if (!this.state.TermsConditioncheckbox) {
                //alert("Please select term condition to register.")
                this.setState({
                    Alert_Visibility: true,
                    Alert_Title: 'Alert',
                    Alert_Message: "Please select term condition to register.",
                    Alert_MessageMode: 'warning',
                })
                return false;
            }
            var updatedCart = await AsyncStorage.getItem('updateCart');
            //var grid = await AsyncStorage.getItem('Grid');
            var cart = await AsyncStorage.getItem('AddToCart');
            var fName = await AsyncStorage.getItem('LoginUserFirstName');
            var lName = await AsyncStorage.getItem('LoginUserLastName');
            const LoginUserID = await AsyncStorage.getItem('LoginUserID');

            console.log("TeststSTst   = = " + JSON.stringify(updatedCart))
            var addtoGrid = new Object();
            addtoGrid.clinic = {
                ElectronicSignature: this.state.ElectronicSignature,
            };

            addtoGrid.RegistrationUpdatedCart = JSON.parse(updatedCart)
            var url = 'CustomerClinicRegistration/ProcessPaymentClinicRegistration?isClinicRegistration=true';
            this.setState({ isLoading: true })
            await CallPI("POST", url, addtoGrid, LoginUserID, fName + " " + lName, cart).then((response) => response.json())
                .then(responseJson => {
                    // alert(JSON.stringify(responseJson))
                    console.log("Clininc result======" + JSON.stringify(responseJson.CaetItems))
                    if (responseJson.isSuccess == true) {
                        this.setState({
                            Alert_Visibility: true,
                            Alert_Title: 'Success',
                            Alert_Message: "Please select term condition to register.",
                            Alert_MessageMode: 'success',
                        })
                        AsyncStorage.setItem("AddToCart", JSON.stringify(responseJson.CaetItems));
                        AsyncStorage.removeItem('Grid');
                        AsyncStorage.removeItem('updateCart');
                        this.props.navigation.reset({routes: [{ name: 'MyCart' }]});

                        // this.props.navigation.dispatch(
                        //     CommonActions.reset({
                        //         index: 9,
                        //         routes: [
                        //             {
                        //                 name: 'ClinicRegistration',
                        //             },
                        //             { name: 'MyCart' },
                        //         ],
                        //     })
                        // )

                    }
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

    async TermsConditions() {

        var url = `CustomerLeagueRegistration/RegistrationTermsConditions?type=League&&isTermsCondition=true`;
        await CallPI('GET', url, null, null, " ", null).then((response) => response.json())
            .then(responseJson => {
                console.log(JSON.stringify(responseJson))
                this.setState({
                    TermsCondition: responseJson.TermsConditionsContent,
                    TermsConditionHeading: responseJson.Subject,
                    modalVisible: true,
                    IsTermsCondition: true
                })


            }
            ).catch(error => {

            });
    }

    HideModel = async (visible) => {
        this.setState({
            modalVisible: visible,
            IsTermsCondition: false,
            IsDocuments: false,
        });
    }




    //GetDocumentDetail = async (value) => {
        GetDocumentDetail = async (index) => {
        //var list = []
        const array = [...this.state.DocumentsList];
        array[index]['checked'] = !array[index]['checked']
        var id = array[index]['value'];
        this.setState({ DocumentsList: array , isLoading:true})
        var url = 'CustomerClinicRegistration/GetActivityDocumentsDetail?documentID=' + id + '&getdocumentDetail=true'
         await CallPI('GET', url, null, null, " ", null).then((response) => response.json())
            .then(responseJson => {
                // console.log(JSON.stringify(responseJson))
                this.setState({
                    TermsCondition: responseJson.Content,
                    TermsConditionHeading: responseJson.Name,
                    LastUpdatetdDate: responseJson.LastUpdatedDate,
                    modalVisible: true,
                    IsDocuments: true, isLoading:false
                })

            }
            ).catch(error => {

            });
    }

    async componentDidMount() {

        var activityID = this.props.route.params.ActivityID;
        var url = 'CustomerClinicRegistration/GetActivityDocumentsListByID?activityID=' + activityID + '&igetdocumentList=true';
        await CallPI("GET", url, null, null, null + " " + null, null).then((response) => response.json())
            .then(responseJson => {
                var list = []
                // console.log("  result======" + JSON.stringify(responseJson))
                for (let userObject of responseJson.lstDocuments) {
                    list.push({ label: userObject.Name, value: userObject.ID, checked: false });
                }
                this.setState({ DocumentsList: list })
            }).catch(error => {
                //alert(JSON.stringify(error))
                this.setState({ isLoading: false })
            });
    }
    

    rederItems = ({ item, index }) => {
        return (
                   
            <CheckBox

                checkedIcon={<Image style={styles.checkboxImageIcon} source={require('../../../../../Images/icon-checkbox-checked.png')} />}
                uncheckedIcon={<Image style={styles.checkboxImageIcon} source={require('../../../../../Images/icon-checkbox.png')} />}
              
                textStyle={[styles.fontFamily, styles.font_14,{fontWeight:''}]}
                containerStyle={styles.RegitrationcheckBoxContainer}
                title={item.label}
                onPress={() => this.GetDocumentDetail(index)}
                checked={item.checked}
            />
                )
        }



                render() {

        return (
                <View style={[styles.Pagecontainer]}>
                    <AlertBox
          displayMode={this.state.Alert_MessageMode}
          MessageType={''}
          displayMsg={this.state.Alert_Message}
          Title={this.state.Alert_Title}
          visibility={this.state.Alert_Visibility}

          dismissAlert={this.dismissAlert}
          CancelAlert={this.CancelAlert}
        />
                    <View style={[styles.containerWithCard]}>


                        <RegistrationTermsConditionModel

                            TermsConditionHeading={this.state.TermsConditionHeading}
                            TermsConditionBody={this.state.TermsCondition}
                            IsDocuments={!this.state.IsTermsCondition}

                            LastDate={this.state.LastUpdatetdDate}
                            ButtonTitle={this.state.IsTermsCondition == true ? 'Close' : "Accept"}
                            visibility={this.state.modalVisible}
                            CloseAlert={this.CloseAlert}

                        />



                        <Loader loading={this.state.isLoading} />
                        <ScrollView>
                            <Card containerStyle={[styles.PageCardHeader]}>


                                <View style={styles.inputContainer}>
                                    <View style={styles.inputInnerContainer}>
                                        <TextInput style={styles.inputs}
                                            placeholder="Note for Director"
                                            multiline={true}
                                            numberOfLines={2}
                                            value={this.state.NoteForDirector}
                                            onChangeText={(NoteForDirector) => this.setState({ NoteForDirector })}
                                        />
                                    </View>

                                </View>

                                <View style={styles.inputContainer}>
                                <Text style={styles.font_12}>TERMS OF ACCEPTANCE and SIGNATURE</Text>
                                </View>

                                <View style={styles.inputContainer}>
                               
                                    <FlatList
                                        data={this.state.DocumentsList}
                                        renderItem={this.rederItems}
                                        keyExtractor={(item) => item.value.toString()}
                                    />



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
                                <View style={styles.ActivityCheckboxcontainer}>
                                    <View style={{ width: '12%' , marginRight:5 }}>
                                        <CustomCheckbox
                                            title={''}
                                            checked={this.state.TermsConditioncheckbox}
                                            setValue={this.ChangescheckboxValues}
                                        />
                                    </View>
                                    <View style={{ width: '85%' }}>
                                        <Text style={styles.font_12}>
                                            I understand that by checking this box and entering my name above constitutes a legal
                                            signature
                                            confirming that I acknowledge and agree to these general{" "}  
                                            <Text
                                                style={{ color: 'red' }}
                                                onPress={() => { this.TermsConditions() }}
                                            >
                                                terms and conditions
                                            </Text>
                                            {" "}  as well as the contents, conditions and requirements contained in the documents above.
                                        </Text>
                                    </View>
                                </View>
                            </Card>
                        </ScrollView>
                        <TouchableOpacity style={[styles.buttonContainer]} onPress={() => this.AddToCart(this.state)} >
                            <Text style={styles.buttunTextColo}>Add to Cart</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.buttonContainer_danger]} onPress={() => this.props.navigation.reset({ routes: [{ name: 'DashboardList' }] })} >
                            <Text style={styles.buttunTextColo}>cancel </Text>
                        </TouchableOpacity>

                    </View>
                </View>

                );

    }

}



