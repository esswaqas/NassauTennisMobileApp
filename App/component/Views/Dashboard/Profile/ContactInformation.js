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
import { TextInputMask } from 'react-native-masked-text'
import AsyncStorage from "@react-native-async-storage/async-storage";
import { validateAll } from 'indicative/validator'
import styles from ' ../../../App/Stylesheets/NAppSS'
 
import RNPickerSelect from 'react-native-picker-select';
import DropdownList from '../../Shared/DropdownList';
import { CallPI } from '../../../../Api/APICall'
import CcheckBox from '../../../../../App/component/Views/Shared/CheckBox'
import AlertBox from '../../../../../App/component/Views/Shared/MessageBox'

export default class ContactInfo extends React.Component {
    constructor(props) {
        super(props)

    }
    state = {
        IsSendSmsNotification: false,
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
        error: {},


        Alert_Visibility: false,
        Alert_Title: '',
        Alert_Message: '',
        Alert_MessageMode: '',
    }
    dismissAlert = (values) => {
        this.setState({ Alert_Visibility: values })
    }
    CancelAlert = (values) => {
        this.setState({ Alert_Visibility: values })
    }

    GetState = value => {

        // alert(value)
        this.setState({
            State: value
        })
        this.state.error['State']=null;
        this.SetContactInfo()
    }
    GetCellProvider = value => {
        this.setState({
            CellProvider: value
        })
        this.SetContactInfo()
    }
    async GetStateList() {
        var url = `Common/GetStates?state=""`;
        // await fetch(url, {
        //     method: "GET",
        // })
        await CallPI("GET", url, null, null, '', null)
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
        var url = `Common/GetCellProvider?cellProvider=""`;
        await CallPI("GET", url, null, null, '', null)
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

        this.setState({
            isLoading: true
        })
        var LoginUserID = null;
        var personselectedID = await AsyncStorage.getItem('ParticipantSelectedID');

        if (personselectedID != null) {
            LoginUserID = personselectedID;
        }
        else {
            LoginUserID = await AsyncStorage.getItem('LoginUserID');
        }

        var url = `Customers/MyProfile?customerProfileID=${LoginUserID}`;
        // await fetch(url, {
        //     method: "GET",
        // })
        await CallPI("GET", url, null, null, '', null)
            .then(response => response.json())
            .then(responseJson => {

                console.log("Contact inofrmation  === " + JSON.stringify(responseJson))
              //  alert("CC ===  "+ responseJson.Address)

                this.setState({
                    Address: responseJson.Address,
                    City:  responseJson.City === null ? "" : responseJson.City.toString(),
                    State: responseJson.State === null ? "" :responseJson.State.toString(),
                    ZipCode: responseJson.ZipCode === null ? "" : responseJson.ZipCode.toString(),
                    HomePhone: responseJson.HomePhone === null ? "" : responseJson.HomePhone,
                    DaytimePhone: responseJson.DaytimePhone === null ? "" : responseJson.DaytimePhone,
                    CellPhone: responseJson.CellPhone === null ? "" : responseJson.CellPhone,
                    CellProvider: responseJson.CellProvider === null ? "" : responseJson.CellProvider.toString(),
                    Fax: responseJson.Fax === null ? "" : responseJson.Fax.toString(),
              })

            }

            ).catch(error => {
                console.log(JSON.stringify(error))
            });
        //  console.log(JSON.stringify(this.state))
        // await this.SetContactInfo()
    }

    ChangescheckboxValues = () => {

        this.setState({
            IsSendSmsNotification: !this.state.IsSendSmsNotification
        })
    }
    NextTab = async (data) => {
        try {
            //  alert(this.state.State)

            if (this.state.HomePhone == '' && this.state.DaytimePhone == '' && this.state.CellPhone == '') {
                this.setState(
                    {
                        Alert_Visibility: true,
                        Alert_Title: "Warning",
                        Alert_Message: "Please enter at least one phone number.",
                        Alert_MessageMode: "success"
                    }
                )
                return false
            }
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
            this.SetContactInfo()
            await validateAll(data, rules, messages)
            this.props.navigation.navigate("Addressinfo")
        }
        catch (errors) {

            const formattedErrors = {}
            errors.forEach(error => formattedErrors[error.field] = error.message);
            this.setState({
                error: formattedErrors
            })

        }

    }
    async SetContactInfo() {

        //  alert("Set st== "+ this.state.State)
        await AsyncStorage.setItem('ContactHomePhone', this.state.HomePhone);
        await AsyncStorage.setItem('ontactDaytimePhone', this.state.DaytimePhone);
        await AsyncStorage.setItem('ontactCellPhone', this.state.CellPhone);
        await AsyncStorage.setItem('ontactAddress', this.state.Address);
        await AsyncStorage.setItem('ontactCellProvider', this.state.CellProvider);
        await AsyncStorage.setItem('ontactCity', this.state.City);
        await AsyncStorage.setItem('ontactFax', this.state.Fax);
        await AsyncStorage.setItem('ontactState', this.state.State);
        await AsyncStorage.setItem('ZipCode', this.state.ZipCode.toString());
        await AsyncStorage.setItem('IsSendSmsNotification', this.state.IsSendSmsNotification.toString());
        if (this.state.CellPhone === '' || this.state.CellPhone === null) {
            this.setState({ IsSendSmsNotification: false })
        }
        else {

            this.setState({ IsSendSmsNotification: true })
        }

    }
    SetPhoneFormate(phone) {
        // string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        // var pp=  phone.Replace("1112224444", "(\d{3})(\d{3})(\d{4})", "$1-$2-$3");
        var pp = phone.replace(/(\d\d\d)(\d\d\d)(\d\d\d\d)/, '$1-$2-$3');
     //   alert(pp)
        this.state({ CellPhone: pp })
        if (phone.length <= 3) {

            return phone;
        }
        else if (phone.length > 3 && phone.length <= 7) {

            var trFirstThree = str.substring(0, 3)
            var trlastThree = str.substring(3, 7)
            // alert(trFirstThree+" "+trlastThree)
            // return trFirstThree+" "+trlastThree ;
        }
        else if (phone.length > 7 && phone.length <= 12) {
            var trFirstThree = str.substring(0, 3)
            var trlastThree = str.substring(3, 6)
            var trlastf = str.substring(7, 6)
        }


    }
    async componentDidMount() {
        await this.GetStateList()
        await this.GetCellProviderList()


        await this.GetProfileInfo()
        await this.SetContactInfo()


    }

    render() {

        return (
            <View style={styles.Pagecontainer}>

                <AlertBox
                    displayMode={this.state.Alert_MessageMode}
                    MessageType={''}
                    displayMsg={this.state.Alert_Message}
                    Title={this.state.Alert_Title}
                    visibility={this.state.Alert_Visibility}
                    dismissAlert={this.dismissAlert}
                    CancelAlert={this.CancelAlert}
                />
                <View style={styles.container}>

                    <ScrollView>

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
                                <DropdownList
                                    OptionList={this.state.CellProviderList}
                                    PlaceHolderText={"Cell Provider"}
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
                                    onChangeText={(Address) => {
                                        this.state.error['Address']=null;   
                                        this.setState({ Address })}}
                                    onEndEditing={() => this.SetContactInfo()}

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
                                    onChangeText={(City) => {
                                        this.state.error['City']=null
                                        this.setState({ City })}}
                                    onEndEditing={() => this.SetContactInfo()}
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


                                <DropdownList
                                    OptionList={this.state.StateList}
                                    PlaceHolderText={"State"}
                                    selectedValue={this.state.State}
                                    setValue={this.GetState}
                                />

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
                                    onEndEditing={() => this.SetContactInfo()}
                                    onChangeText={(ZipCode) =>{
                                        this.state.error['ZipCode'] =null;
                                        this.setState({ ZipCode })}}
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
                                {/* <TextInput style={styles.inputs}
                                    placeholder="Fax"
                                    keyboardType="number-pad"
                                    maxLength={10}
                                    value={this.state.Fax}
                                    onEndEditing={() => this.SetContactInfo()}
                                    onChangeText={(Fax) => this.setState({ Fax })}
                                />
                                 */}
                                  <TextInputMask
                                    type={'cel-phone'}
                                    options={{
                                        maskType: 'BRL',//for international set it -&amp;nbsp;INTERNATIONAL type masking
                                        withDDD: true,
                                        dddMask: '999 999 9999'//this is a your define formatting you use according to your requirment
                                    }}
                                    maxLength={12}              //set length according to your input requirment
                                    value={this.state.Fax}
                                    placeholder={'Fax'}
                                    onChangeText={(Fax) => this.setState({ Fax })}
                                    style={styles.inputs} ref='mobile'
                                    autoCapitalize={'none'}
                                    autoCorrect={false}
                                    returnKeyType={'next'}
                                    keyboardType={'number-pad'}
                                />
                            </View>

                        </View>

                       

                        {

                            this.state.CellPhone != '' ?

                                <View style={styles.Checkboxcontainer}>
                                    <CcheckBox
                                        title={"SMS Messaging On"}
                                        checked={this.state.IsSendSmsNotification}
                                        setValue={this.ChangescheckboxValues}
                                    />
                                </View>
                                : null


                        }












                    </ScrollView>
                    <TouchableOpacity style={[styles.buttonContainer]} onPress={() => this.NextTab(this.state)} >
                        <Text style={styles.buttunTextColo}>Next</Text>
                    </TouchableOpacity>
                </View>
            </View>


        );

    }

}

