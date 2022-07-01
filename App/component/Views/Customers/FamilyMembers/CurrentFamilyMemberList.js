import React, { Component } from 'react';
import Loader from '../../../../../App/component/Loader'
import Styles from '../../../../Stylesheets/NAppSS'

import {
    View, StyleSheet, TouchableOpacity, FlatList, Text, ScrollView,
} from 'react-native';
import RadioForm from 'react-native-simple-radio-button';
import RadioButton from '../../Shared/RadioButton';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Card } from 'react-native-elements';
import EmptyMessage from '../../Shared/ListEmptyMessage';
import { TouchableOpacityBase } from 'react-native';
import { CallPI } from '../../../../Api/APICall';

var FamilyMembers = [];
export default class CurrentFamilyMembers extends Component {

    constructor(props) {
        super(props)
    }
    state = {
        isLoading: false,
        data: [],
        UserID: '',
        phoneNum: ''
    }

    GetFamilyData = async () => {
        const LoginUserID = await AsyncStorage.getItem('LoginUserID');
        var url =  `Dashboard/FamilyMembers?userID=${LoginUserID}`;
        // fetch(url, {
        //     method: "GET",
        // })
        await  CallPI("GET",url,null,null,'',null)
            .then(response => response.json())
            .then(responseJson => {
                FamilyMembers = [];
                for (let userObject of responseJson) {
                    FamilyMembers.push({ label: userObject.FirstName + ' ' + userObject.LastName + ' (' + userObject.Age + ')' + ' (' + userObject.Address + ')', value: userObject.UserID, isSelected: false });
                }
                FamilyMembers.push({ label: 'Create New', value: '' , isSelected: false});
                this.setState({ data: FamilyMembers })
            })
            .catch(error => {

            });
    }

    _SetFamilyhead(userID) {
        this.setState({
            UserID: userID
        })
    }
    ProceedUser() {

        AsyncStorage.setItem('FamilyMemberID', this.state.UserID.toString());

        this.props.navigation.navigate('AddFamilyMember')

    }
    componentDidMount() {
        this.GetFamilyData()
    }

    onTextChange(text) {

        var cleaned = ('' + text).replace(/\D/g, '')
        var match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/)
        if (match) {
            var intlCode = (match[1] ? '+1 ' : ''),
                number = [intlCode, '', match[2], ' ', match[3], ' ', match[4]].join('');
            this.setState({
                phoneNum: number
            });
            return;
        }
        this.setState({
            phoneNum: text
        });
    }
    rederItems = ({ item, index }) => {
        return (


            index % 2 == 0 ?
                <TouchableOpacity style={[Styles.ListItemRow_secondary, { marginBottom: 10 }]} onPress={()=>this.UpDatedExt(index)}>
                    <RadioButton props={item.isSelected} />
                    <Text style={Styles.ListRowText}>{item.label}</Text>
                </TouchableOpacity>
                :
                <TouchableOpacity style={[Styles.ListItemRow, { marginBottom: 10 }]} onPress={()=>this.UpDatedExt(index)}>
                    <RadioButton props={item.isSelected} />
                    <Text style={Styles.ListRowText}>{item.label}</Text>
                </TouchableOpacity>



        )
    }
    UpDatedExt =   (index) => {
    
        const array = [...this.state.data];
        var value = array[index]['value'];
        for (var i =0 ;i<array.length; i++ )
        {
         if(i==index){
           array[i]['isSelected'] = !array[i]['isSelected']
         }
         else{
           array[i]['isSelected'] =false;
         }
       
        }
           this.setState({ Data: array })
       
           
           this._SetFamilyhead(value)
       }
    render() {
        return (






            <View style={[Styles.Pagecontainer]}>
                <Loader loading={this.state.isLoading} />
                    <View style={[Styles.containerWithCard]}>
                <ScrollView>
                        <Card containerStyle={Styles.PageCardHeader}>
                            <View style={Styles.ListItemRow_secondary}>
                                <Text style={Styles.ListRowText}>Make selection to copy basic information for new profile</Text>
                            </View>
                            <View style={Styles.ListItemRow}>
                                <Text style={[Styles.ListRowText, Styles.font_18, Styles.Color_success, { fontWeight: 'bold' }]}>Family Members</Text>
                            </View>
                            <FlatList
                                data={this.state.data}
                                renderItem={this.rederItems}
                                keyExtractor={(item) => item.UserID}
                            />
                        </Card>


                        {/* 
                    <View style={{ marginTop: '5%' }}>

                        <Text style={{ fontWeight: 'bold' }}>
                            Family Members

                        </Text>
                        <RadioForm
                            radio_props={this.state.data}
                            initial={false}
                            circleSize={0}
                            initial={false}
                            buttonColor={'#50C900'}
                            formHorizontal={false}
                            labelHorizontal={true}
                            buttonSize={10}
                            buttonOuterSize={20}
                            thickness={10}
                            buttonWrapStyle={{ margin: 100 }}
                            radioStyle={{ paddingRight: 20 }}
                            buttonInnerColor={'50C900'}
                            style={{ marginTop: '5%' }}
                            onPress={(value) => this._SetFamilyhead(value)}
                        />
                    </View> */}





                </ScrollView>
                <TouchableOpacity style={Styles.buttonContainer} onPress={() => this.ProceedUser()}>

                    <Text style={Styles.buttunTextColo}>Proceed</Text>

                </TouchableOpacity>
                    </View>
            </View>


        )
    }
}