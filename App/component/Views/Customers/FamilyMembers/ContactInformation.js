import * as React from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    Button,
    TouchableOpacity,
    Image,

    Alert,
    ScrollView
} from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TextInputMask } from 'react-native-masked-text'
import { CallPI } from '../../../../Api/APICall';
import MessageBox from '../../Shared/MessageBox'
import { validateAll } from 'indicative/validator'
import styles from '../../../../Stylesheets/NAppSS'
import Loader from '../../../Loader'
 
import RNPickerSelect from 'react-native-picker-select';
import { CommonActions } from '@react-navigation/native';
import DropdowList from '../../Shared/DropdownList'
import { TouchableOpacityBase } from 'react-native';
import { TapGestureHandler } from 'react-native-gesture-handler';
export default class ContactInfo extends React.Component {

    constructor(props) {
        super(props)

    }
    state = {
        FirstName: '',
        LastName: '',
        Email: '',
        Suffix: '',
        MI: '',
        ID: '',
        BirthdayDate: '',
        Gender: '',
        AgeGroup: '',
        HomePhone: '',
        DaytimePhone: '',
        CellPhone: '',
        Address: '',
        CellProvider: '',
        City: '',
        Fax: '',
        State: '',
        ZipCode: '',
        StateList: [],
        CellProviderList: [],
        isLoading: false,
        error: {},
        Alert_Visibility: false,
        Alert_Title: '',
        Alert_Message: '',
        Alert_MessageMode: '',
        isRedirectPage:false
    }
    dismissAlert = (values) => {
        this.setState({ Alert_Visibility: values })
        if(this.state.isRedirectPage==true)
            {
            this.RedirectToPersonTabInfo() 
        }
         
    }
    CancelAlert = (values) => {
        this.setState({ Alert_Visibility: values })
        if(this.state.isRedirectPage==true)
        {
        this.RedirectToPersonTabInfo() 
    }
    }
       
    GetState =(value)=> {

        this.setState({
            state: value
        })
        //this.SetContactInfo()
    }
    GetCellProvider=(value)=> {

        this.setState({
            CellProvider: value
        })
       // this.SetContactInfo()
    }
    async GetStateList() {
        var url =  `Common/GetStates?state=""`;
        // await fetch(url, {
        //     method: "GET",
        // })
        await  CallPI("GET",url,null,null,'',null)
            .then(response => response.json())
            .then(responseJson => {

                this.setState({
                    StateList: responseJson
                })

            }
            ).catch(error => {

            });
    }
    async GetCellProviderList() {
        var url =   `Common/GetCellProvider?cellProvider=""`;
        // await fetch(url, {
        //     method: "GET",
        // })
        await  CallPI("GET",url,null,null,'',null)
            .then(response => response.json())
            .then(responseJson => {
                this.setState({
                    CellProviderList: responseJson
                })

            }
            ).catch(error => {

            });
    }
    async GetProfileInfo() {


        var userID = null;
        var LoginUserID = await AsyncStorage.getItem('LoginUserID');;
        userID = await AsyncStorage.getItem('FamilyMemberID');
        if (userID == null) {
            userID = LoginUserID;
        }
        var url =   `Customers/MyProfile?customerProfileID=${userID}`;
        // await fetch(url, {
        //     method: "GET",
        // })
        await  CallPI("GET",url,null,null,'',null)
        .then(response => response.json()).then(responseJson => {

            console.log(JSON.stringify(responseJson))
            // if (responseJson.ok) {    
            this.setState({

                HomePhone: responseJson.HomePhone === null ? "" : responseJson.HomePhone,
                DaytimePhone: responseJson.DaytimePhone === null ? "" : responseJson.DaytimePhone,
                CellPhone: responseJson.CellPhone === null ? "" : responseJson.CellPhone,
                Address: responseJson.Address,
                CellProvider: responseJson.CellProvider === null ? "" : responseJson.CellProvider.toString(),
                City: responseJson.City,
                State: responseJson.State.toString(),
                Fax: responseJson.Fax === null ? "" : responseJson.Fax.toString(),
                ZipCode: responseJson.ZipCode.toString(),
            })


        }

        ).catch(error => {
            console.log(JSON.stringify(error))
        });
        //  console.log(JSON.stringify(this.state))
        // await this.SetContactInfo()
    }


    AddFamilyMember = async (data) => {
        try {
            const rules = {

                Address: 'required',
                City: 'required',
                State: 'required',
                ZipCode: 'required',

            }
            const messages = {
                required: 'Required',
                email: 'The email is invalid.',
                max: '{{ field }} should be less than 20 character.'
            }
            var personInfo = await this.GetPersonalInfo();
            if (personInfo == false) {
                return false;
            }

            await validateAll(data, rules, messages);
            this.setState({
                isLoading: true
            })

            var url =   'Customers/AddFamilyMember?addFamilyMember=FamilyMember';
            // await fetch(url, {
            //     method: 'POST',
            //     headers: {
            //         Accept: 'application/json',
            //         'Content-Type': 'application/json',
            //     },
            //     body: JSON.stringify()
            // })
            var  pro =  new Object()
            pro= {
                FirstName: this.state.FirstName,
                LastName: this.state.LastName,
                Email: this.state.Email,
                Suffix: this.state.Suffix,
                MI: this.state.Initail,
                ID: '',
                BirthdayDate: this.state.DateofBirth,
                Gender: this.state.Gender,
                AgeGroup: this.state.AgeGroup,
                HomePhone: this.state.HomePhone,
                DaytimePhone: this.state.DaytimePhone,
                CellPhone: this.state.CellPhone,
                Address: this.state.Address,
                CellProvider: this.state.CellProvider,
                City: this.state.City,
                Fax: this.state.Fax,
                State: this.state.State,
                ZipCode: this.state.ZipCode,
                PersonId: await AsyncStorage.getItem('LoginUserID')
            }
            await  CallPI("POST",url,pro,null,'',null)
            .then((response) => response.json())
                .then(responseJson => {
                    if (responseJson.Message != "") {
                       this.setState({
                        Alert_Visibility: true,
                        Alert_Title:  'Alert',
                        Alert_Message:  responseJson.Message,
                        Alert_MessageMode: 'success',
                        isRedirectPage:false
                       })

                       // Alert.alert("", responseJson.Message)
                        this.setState({
                            isLoading: false
                        })
                        this.props.navigation.dispatch(
                            CommonActions.navigate({
                                name: 'CurrentFamilyMembers',

                            })
                        );

                    }
                }).catch(error => {
                    this.setState({
                        isLoading: false
                    })
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
    GetPersonalInfo = async () => {
        var firstname = await AsyncStorage.getItem('FamilyPersonFirstName');
        var lastname = await AsyncStorage.getItem('FamilyPersonLastName');
        var mi = await AsyncStorage.getItem('FamilyPersonInitail');
        var suffix = await AsyncStorage.getItem('FamilyPersonSuffix');
        var email = await AsyncStorage.getItem('FamilyPersonEmail');
        var dateofBirth = await AsyncStorage.getItem('FamilyPersonDateofBirth');
        var gender = await AsyncStorage.getItem('FamilyPersonGender');
        var agegroup = await AsyncStorage.getItem('FamilyPersonAgeGroup');
        this.setState({
            FirstName: firstname,
            LastName: lastname,
            Suffix: suffix,
            Email: email,
            MI: mi,
            BirthdayDate: dateofBirth,
            Gender: gender,
            AgeGroup: agegroup,

        })

        if (firstname == null || lastname == null || email == null || dateofBirth == null || gender == null || agegroup == null) {

            this.setState({
                Alert_Visibility: true,
                Alert_Title:  'Alert',
                Alert_Message:  "Please compelete the personal information.",
                Alert_MessageMode: 'erroe',
                isRedirectPage:TabRouter
               })
            // Alert.alert("", "Please compelete the personal information.", [
            //     { text: 'Ok', onPress: () => }]
            //     , { cancelable: false }
            // )
            return false;
        }
        else {
            return true;
        }



    }
    RedirectToPersonTabInfo() {

        this.props.navigation.navigate("Personalinformation")
    }
    async componentDidMount() {


        await this.GetStateList()
        await this.GetCellProviderList()


        await this.GetProfileInfo()



    }

    render() {

        return (
            <View style={styles.Pagecontainer}>
                <MessageBox
                       displayMode={this.state.Alert_MessageMode}
                       MessageType={''} 
                       displayMsg={this.state.Alert_Message}
                       Title={this.state.Alert_Title}
                       visibility={this.state.Alert_Visibility}
                       dismissAlert={this.dismissAlert}
                       CancelAlert = {this.CancelAlert}
                />
                <View style={styles.container}>
                    <ScrollView>
                        <Loader loading={this.state.isLoading} />
                      

                            <View style={styles.inputContainer}>
                                <View style={styles.inputInnerContainer}>
                                     
                                     <TextInputMask
                                    type={'cel-phone'}
                                    options={{
                                        maskType: 'BRL',//for international set it -&amp;nbsp;INTERNATIONAL type masking
                                        withDDD: true,
                                        dddMask: '999 999 9999'//this is a your define formatting you use according to your requirment
                                    }}
                                    maxLength={12}              //set length according to your input requirment
                                    value={this.state.CellPhone}
                                    placeholder={'Cell Phone'}
                                    onChangeText={(CellPhone) => this.setState({ CellPhone })}
                                    style={styles.inputs} ref='mobile'
                                    autoCapitalize={'none'}
                                    autoCorrect={false}
                                    returnKeyType={'next'}
                                    keyboardType={'number-pad'}
                                />
                                </View>

                            </View>
                            <View style={styles.inputContainer}>
                                <View style={styles.DropDownInnerContainer}>

                                <DropdowList
                  OptionList={this.state.CellProviderList}
                  PlaceHolderText={"Cell provider"}
                  selectedValue={this.state.CellProvider}
                  setValue={this.GetCellProvider}
                />

                                  
                                </View>
                                <View >
                                </View>
                            </View>
                            <View style={styles.inputContainer}>
                                <View style={styles.inputInnerContainer}>
                                    
                                     <TextInputMask
                                    type={'cel-phone'}
                                    options={{
                                        maskType: 'BRL',//for international set it -&amp;nbsp;INTERNATIONAL type masking
                                        withDDD: true,
                                        dddMask: '999 999 9999'//this is a your define formatting you use according to your requirment
                                    }}
                                    maxLength={12}              //set length according to your input requirment
                                    value={this.state.HomePhone}
                                    placeholder={'Home Phone'}
                                    onChangeText={(HomePhone) => this.setState({ HomePhone })}
                                    style={styles.inputs} ref='mobile'
                                    autoCapitalize={'none'}
                                    autoCorrect={false}
                                    returnKeyType={'next'}
                                    keyboardType={'number-pad'}
                                />
                                </View>

                            </View>

                            <View style={styles.inputContainer}>
                                <View style={styles.inputInnerContainer}>

                                    {/* <TextInput style={styles.inputs}
                                        placeholder="Work Phone"
                                        keyboardType="number-pad"
                                        maxLength={12}
                                        value={this.state.DaytimePhone}
                                        onChangeText={(DaytimePhone) => this.setState({ DaytimePhone })}
                                    /> */}


                                     <TextInputMask
                                    type={'cel-phone'}
                                    options={{
                                        maskType: 'BRL',//for international set it -&amp;nbsp;INTERNATIONAL type masking
                                        withDDD: true,
                                        dddMask: '999 999 9999'//this is a your define formatting you use according to your requirment
                                    }}
                                    maxLength={12}              //set length according to your input requirment
                                    value={this.state.DaytimePhone}
                                    placeholder={'Work Phone'}
                                    onChangeText={(DaytimePhone) => this.setState({ DaytimePhone })}
                                    style={styles.inputs} ref='mobile'
                                    autoCapitalize={'none'}
                                    autoCorrect={false}
                                    returnKeyType={'next'}
                                    keyboardType={'number-pad'}
                                />

                                </View>

                            </View>
                            <View style={styles.inputContainer}>
                                <View style={styles.inputInnerContainer}>
                                    <TextInput style={styles.inputs}
                                        placeholder="Street Address"
                                        value={this.state.Address}
                                        onChangeText={(Address) => this.setState({ Address })}


                                    />
                                </View>
                                <View>
                                    {
                                        this.state.error['Address'] && <Text style={styles.ErrorMessage}>{this.state.error['Address']}</Text>
                                    }
                                </View>
                            </View>
                            <View style={styles.inputContainer}>
                                <View style={styles.inputInnerContainer}>
                                    <TextInput style={styles.inputs}
                                        placeholder="City"

                                        value={this.state.City}
                                        onChangeText={(City) => this.setState({ City })}

                                    />
                                </View>
                                <View >

                                    {
                                        this.state.error['City'] && <Text style={styles.ErrorMessage}>{this.state.error['City']}</Text>

                                    }
                                </View>
                            </View>
                            <View style={styles.inputContainer}>
                                <View style={styles.DropDownInnerContainer}>
                                <DropdowList
                  OptionList={this.state.StateList}
                  PlaceHolderText={"State"}
                  selectedValue={this.state.State}
                  setValue={this.GetState}
                />
                                    {/* <RNPickerSelect
                                        onValueChange={(value) => this.GetState(value)}
                                        value={this.state.State}
                                        placeholder={{ label: "Select State", value: "" }}
                                        items={this.state.StateList}
                                    /> */}

                                </View>

                                <View >
                                    {
                                        this.state.error['State'] && <Text style={styles.ErrorMessage}>{this.state.error['State']}</Text>
                                    }
                                </View>
                            </View>
                            <View style={styles.inputContainer}>
                                <View style={styles.inputInnerContainer}>
                                    <TextInput style={styles.inputs}
                                        placeholder="Zip Code"
                                        underlineColorAndroid='transparent'
                                        keyboardType='numeric'
                                        maxLength={5}
                                        value={this.state.ZipCode}

                                        onChangeText={(ZipCode) => this.setState({ ZipCode })}
                                    />
                                </View>
                                <View >
                                    {
                                        this.state.error['ZipCode'] && <Text style={styles.ErrorMessage}>{this.state.error['ZipCode']}</Text>
                                    }
                                </View>
                            </View>



                            <View style={styles.inputContainer}>
                                <View style={styles.inputInnerContainer}>
                                    <TextInput style={styles.inputs}
                                        placeholder="Fax"
                                        keyboardType="number-pad"
                                        maxLength={10}
                                        value={this.state.Fax}

                                        onChangeText={(Fax) => this.setState({ Fax })}
                                    />
                                </View>

                            </View>








                        


                        
                    </ScrollView>
                    <TouchableOpacity style={[styles.buttonContainer]} onPress={() => this.AddFamilyMember(this.state)} >
                                <Text style={styles.buttunTextColo}>Save</Text>
                            </TouchableOpacity>
                </View>
            </View>


        );

    }

}