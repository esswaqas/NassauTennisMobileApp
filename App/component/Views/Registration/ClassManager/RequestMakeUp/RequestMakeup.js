import * as React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, Alert, ListItem, Modal, ListRenderItem, ScrollView, Left, Right, FlatList, } from 'react-native';
 
 
import { Card } from 'react-native-elements'
import AsyncStorage from '@react-native-async-storage/async-storage'

import { validateAll } from 'indicative/validator'
import styles from '../../../../../Stylesheets/NAppSS'
import Loader from '../../../../Loader'
import RNPickerSelect from 'react-native-picker-select';
import Familys from '../../../../../Api/FamilyMemberList'
import { CallPI } from '../../../../../Api/APICall'
import SelectMultiple from 'react-native-select-multiple'
import  DropdownList from '../../../Shared/DropdownList'
import AlertBox from  '../../../Shared/MessageBox'

export default class ReportAbsence extends React.Component {
    constructor(props) {
        super(props)
    }

    state = {
        ParticipantName: '',
        isLoading: false,
        Participant: '',
        AbsnceErrorMessage: '',
        ProgramID: '',
        HourNotice: '',
        ClasstoMissed: '',
        MakeupClassesList: [],
        ActivityList: [],
        SelectedActivityList: [],
        MakeupProgramList: [],
        ClassID: '',
        checkboxes: [{ id: "yes", title: "Yes" }, { id: "no", title: "No" }],

        Alert_Visibility: false,
        Alert_Title: '',
        Alert_Message: '',
        Alert_MessageMode: '',
        isRedirectPage: false
    }

    dismissAlert = (values) => {
        this.setState({ Alert_Visibility: values })
        if(this.state.isRedirectPage===true)
        {
            this.props.navigation.reset({ routes: [{ name: 'DashboardList' }] });
        }
    }
    CancelAlert = (values) => {
        this.setState({ Alert_Visibility: values })
        if(this.state.isRedirectPage===true)
        {
            this.props.navigation.reset({ routes: [{ name: 'DashboardList' }] });
        }
    }

    handleConfirm(pItems) {
        console.log('pItems =>', pItems);
    }


    SelectFamilyMember = async (memberID, purchaseName) => {

        this.setState({ Participant: memberID, ParticipantName: purchaseName });
    }



     _setProgram = async value => {
        this.setState({ ProgramID: value })
        var registerClassess = 'ClassManagment/GetAllAbsenceByProgramID?programID=' + value
        await CallPI('GET', registerClassess, null, null, "", null).then((response) => response.json()).then(responseJson => {
            
            console.log(" testestetet  " + JSON.stringify(responseJson))
            var ClassesList = []
            for (let item of responseJson.lstAbsenceClasses) {
                ClassesList.push({ label:  item.ClassName , value: item.ClassID });
            }
             this.setState({ MakeupClassesList: ClassesList })
            var days = []
            for (let item of responseJson.clinic.lstabsence) {
                if( item.ManagerNotes!= null &&   item.ManagerNotes!='')
                {
               
                days.push({ label: "(" + item.ClassDateTime + ")(" + item.Class + ")(" + item.DayTime + ")\n "+ item.ManagerNotes, value: item.ID });
                }
                else{
                   
                    days.push({ label: "(" + item.ClassDateTime + ")(" + item.Class + ")(" + item.DayTime + ")" , value: item.ID });

                }            }
            this.setState({ ActivityList: days })
        })
    }

     _SetSetclass = async value => 
     { 
         if(value!= null && value!= ''){
        this.setState({ ClassID: value })
        var url = 'ClassManagment/GetAllAbsenceByClassID?programID=' + this.state.ProgramID + '&classID=' + value
        await CallPI('GET', url, null, null, "", null).then((response) => response.json()).then(responseJson => {
//            console.log(" calllinf f  list   ===   " + JSON.stringify(responseJson.clinic.lstabsence))
            var days = []
            for (let item of responseJson.clinic.lstabsence) {
                if( item.ManagerNotes!= null &&   item.ManagerNotes!='')
                {
                days.push({ label: "(" + item.ClassDateTime + ")(" + item.Class + ")(" + item.DayTime + ")\n "+ item.ManagerNotes, value: item.ID });
                }
                else{
                   
                    days.push({ label: "(" + item.ClassDateTime + ")(" + item.Class + ")(" + item.DayTime + ")" , value: item.ID });
                }
            }
            this.setState({ ActivityList: days })
        })}
    }
    SelectedActivityList = (SelectedActivityList) => { this.setState({ SelectedActivityList }) }

    SubmitAbsenceReason = async () => {

        if (this.state.ProgramID == '') {
         
            this.setState({
                Alert_Visibility: true,
                Alert_Title: 'Warning',
                Alert_Message: 'Please select program.',
                Alert_MessageMode: 'warning',
              })
            return false
        }
        if (this.state.Participant == '') {
             
            this.setState({
                Alert_Visibility: true,
                Alert_Title: 'Warning',
                Alert_Message: "Please select participant.",
                Alert_MessageMode: 'warning',
              })
            return false
        }


        if (this.state.SelectedActivityList.length == 0) {
             
            this.setState({
                Alert_Visibility: true,
                Alert_Title: 'Warning',
                Alert_Message: "Please Choose a Class",
                Alert_MessageMode: 'warning',
              })
            return false
        }
        var addtoGrid = new Object();
        addtoGrid = {
            FamilyID: this.state.Participant,
            ClassID: this.state.ClassID,
            ProgramID: this.state.ProgramID,
            SelectedClassList: this.state.SelectedActivityList.length > 0 ? "," + this.state.SelectedActivityList.map(i => i.value).join(",") : null,

        };
        var url = 'ClassManagment/RequestMakeUpClass?isMAkeRequest=true';
        console.log("Body  ===     " + JSON.stringify(addtoGrid))

        try {
            this.setState({ isLoading: true })
            await CallPI("POST", url, addtoGrid, null, null, null).then((response) => response.json()).then(responseJson => {
                console.log(" e after MAke response   == " + JSON.stringify(responseJson))

                if (responseJson == "Success")
                 {
                    
                    this.setState({
                        Alert_Visibility: true,
                        Alert_Title: 'Success',
                        Alert_Message: "We have received your class opening request. We will process it and get back to you soon.",
                        Alert_MessageMode: 'success',
                        isRedirectPage: true
                      })
                    this.setState({
                        ProgramID: '',
                        Participant: '',
                        ParticipantName: '',
                        ClassID: '',
                        SelectedActivityList: [],
                        ActivityList: [],
                        isLoading: false
                    })

                }
                else {
                    
                    this.setState({
                        Alert_Visibility: true,
                        Alert_Title: 'Alert',
                        Alert_Message: "There is an error during request make up class.",
                        Alert_MessageMode: 'error',
                      })
                    this.setState({ isLoading: false })
                }
            })
        }
        catch (e) {
            this.setState({ isLoading: false })
        }

    }

    async componentDidMount() {

      
        try
         {
            var url = 'ClassManagment/GetequestMakeUpClasse';
            await CallPI('GET', url, null, null, "", null).then((response) => response.json()).then(responseJson => {
                
                console.log(" calllin Program==  " + JSON.stringify(responseJson))
                this.setState({ MakeupProgramList: responseJson })
            })
        }
        catch (e) {
            alert("Catch  " + e)
        }
    }
    render() {
        const { checkboxes, checkedId } = this.state
        return (
            <View style={styles.Pagecontainer}>
            <View style={styles.containerWithCard}>
            <AlertBox
displayMode={this.state.Alert_MessageMode}
MessageType={''} 
displayMsg={this.state.Alert_Message}
Title={this.state.Alert_Title}
visibility={this.state.Alert_Visibility}
dismissAlert={this.dismissAlert}
CancelAlert = {this.CancelAlert}
/>
                <Loader loading={this.state.isLoading} />
 
                <ScrollView >
                <Card containerStyle={styles.PageCardHeader}>

                    <View>
                        <View style={[styles.inputContainer]}>
                            
                        <Text style={styles.font_13}>Before requesting a Make-Up, you must <Text style={{ color: 'red' }}>first report an Absence </Text> </Text> 
                             
                        </View>
                        <View style={styles.inputContainer}>
                            <View style={styles.DropDownInnerContainer}>
                            <DropdownList
                             OptionList={this.state.MakeupProgramList}
                             PlaceHolderText={"Program"}
                            selectedValue={this.state.ProgramID}
                             setValue={this._setProgram}
                            />
            
                                
                            </View>
                        </View>
                        <View style={styles.inputContainer}>
                        <Familys SelectFamilyMember={this.SelectFamilyMember} /> 
                          </View>
                        <View style={styles.inputContainer}>
                            <View style={styles.DropDownInnerContainer}>
                            <DropdownList
                             OptionList={this.state.MakeupClassesList}
                             PlaceHolderText={"Class"}
                            selectedValue={this.state.ClassID}
                             setValue={this._SetSetclass}
                            />
                           
                            </View>
                        </View>
                    </View>
                    {
                        this.state.ActivityList.length > 0 ?
                            <View >
                                <Text style={[styles.font_12,styles.fontFamily]}>Available Classes</Text>
                                <SelectMultiple
                                    items={this.state.ActivityList}
                                    selectedItems={this.state.SelectedActivityList}
                                    onSelectionsChange={this.SelectedActivityList}
                                    checkboxSource={require("../../../../../Images/Icon/radio-01.png")}
                                    selectedCheckboxSource={require("../../../../../Images/Icon/radio-02.png")}
                                     />
                            </View>
                            :
                            null
                    }
                   

                </Card>
                </ScrollView>
                
                        <TouchableOpacity style={[styles.buttonContainer]} onPress={() => this.SubmitAbsenceReason()} >
                            <Text style={styles.buttunTextColo}>Submit</Text>
                        </TouchableOpacity>
            </View>
            </View>
        );
    }
}



 