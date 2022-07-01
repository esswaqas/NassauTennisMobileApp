import * as React from 'react'
import { StyleSheet, RefreshControl, Text, View, TextInput, Button, TouchableOpacity, Image, Alert, ScrollView } from 'react-native';
import styles from '../../../Stylesheets/NAppSS'

import moment from 'moment';

 

 import DropdownList from '../Shared/DropdownList'
export default class DateRangeList extends React.Component {
    constructor(props) {
        super(props)
    }
    state = {
        Participant: '',
        DateFrom: '',
        DateTo: '',
        StatusData: [
            { label: "Today", value: "Today" },

            { label: "Yesterday", value: "Yesterday" },
            { label: "Last 7 Days", value: "Last7Days" },
            { label: "Month To Date", value: "MonthToDate" },
            { label: "Last Month", value: "LastMonth" },
            { label: "Last 2 Months", value: "Last2Month" },
            { label: "Year to Date", value: "YeartoDate" },
            { label: "1 Year", value: "OneYear" },
            { label: "2 Year", value: "TwoYear" }
        ]



    }

    GetDateRangeValues = value => {

        var fromDate = ''
        var toDate = ''
        if (value == "MonthToDate") {
            var date = new Date()
            var month = date.getMonth() + 1
            var dateto = month + '/' + '01' + '/' + date.getFullYear();
            fromDate = moment(new Date(dateto)).format('MM/DD/YYYY');
            toDate = moment(new Date()).format('MM/DD/YYYY');

        }
        else if (value == "Today") {
            var toDayDate = new Date();
            fromDate = moment(new Date(toDayDate)).format('MM/DD/YYYY');
            toDate = fromDate;
        }
        else if (value == "Yesterday") {
            var toDayDate = new Date();
            fromDate = moment(new Date(toDayDate.setDate(toDayDate.getDate() - 1))).format('MM/DD/YYYY');
            toDate = moment(new Date(toDayDate)).format('MM/DD/YYYY');
        }
        else if (value == "LastMonth") {
            var date = new Date();
            var now = new Date(date.getFullYear(), date.getMonth(), 1);
            var firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
            var lastDay = new Date(now.getFullYear(), now.getMonth(), 0);
            var year;
            var Month

            if (firstDay.getMonth() == 0) {
                Month = 12
                year = firstDay.getFullYear() - 1;
            }
            else {
                Month = ("0" + (firstDay.getMonth())).slice(-2)
                year = firstDay.getFullYear()
            }
            fromDate = Month + '/' + ("0" + firstDay.getDate()).slice(-2) + '/' + year
            toDate = Month + '/' + ("0" + lastDay.getDate()).slice(-2) + '/' + year
        }
        else if (value == "YeartoDate") {
            var date = new Date();
            var fromDates = '01' + '/' + '01' + '/' + date.getFullYear();
            fromDate = fromDates;
            toDate = moment(new Date(date)).format('MM/DD/YYYY');
        }
        else if (value == "Last2Month") {
            debugger
            var date = new Date();
            var past = new Date();
            past.setMonth(past.getMonth() - 2);
            fromDate = moment(new Date(past)).format('MM/DD/YYYY'); //twoDigitfromMonth + '/' + past.getDate() + '/' + past.getFullYear();
            toDate = moment(new Date(date)).format('MM/DD/YYYY'); //twoDigitMonth + '/' + date.getDate() + '/' + date.getFullYear();
        }
        else if (value == "OneYear") {
            debugger
            var date = new Date();
            var past = new Date();
            past.setYear(date.getFullYear() - 1);
            fromDate = moment(new Date(past)).format('MM/DD/YYYY');
            toDate = moment(new Date(date)).format('MM/DD/YYYY');
        }
        else if (value == "TwoYear") {
            debugger
            var date = new Date();
            var past = new Date();
            past.setYear(date.getFullYear() - 2);
            fromDate = moment(new Date(past)).format('MM/DD/YYYY');
            toDate = moment(new Date(date)).format('MM/DD/YYYY');
        }
        else if (value == "Last7Days") {
            var date = new Date();
            fromDate = moment(new Date(date.setDate(date.getDate() - 6))).format('MM/DD/YYYY'); //twoDigitfromMonth + '/' + past.getDate() + '/' + past.getFullYear();
            toDate = moment(new Date()).format('MM/DD/YYYY');
        }

        this.setState({
            DateFrom: fromDate,
            DateTo: toDate
        })

        this.props.SetDateRangeValues(fromDate, toDate)

    }
    
    render() {
        return (

            <View style={styles.DropDownInnerContainer}>

                <DropdownList
                    OptionList={this.state.StatusData}
                    PlaceHolderText={"Date Shortcuts"}
                    selectedValue={this.state.Status}
                    setValue={this.GetDateRangeValues}
                />

            </View>

        )
    }

}