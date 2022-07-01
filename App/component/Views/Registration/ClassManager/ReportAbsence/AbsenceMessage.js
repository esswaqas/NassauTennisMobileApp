import * as React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableHighlight, Image, Alert, ListItem, Modal, ListRenderItem, ScrollView, Left, Right, FlatList, } from 'react-native';
import { CheckBox } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';
import RadioForm from 'react-native-simple-radio-button';
import AsyncStorage from '@react-native-async-storage/async-storage'

import { validateAll } from 'indicative/validator'
import styles from '../../../../../Stylesheets/NAppSS'
import { Card } from 'react-native-elements'

export default class ReportAbsenceMessage extends React.Component {
  constructor(props) {
    super(props)
  }
  state = {
    NoteHour:''
  }

  async componentDidMount() {

   var HourNote = this.props.route.params.HourNote;
   this.setState({NoteHour:HourNote})

  }
  render() {
    return (
      <View style={styles.Pagecontainer}>
      <View style={styles.containerWithCard}>
        <ScrollView>
        <Card containerStyle={styles.PageCardHeader}>
          
            <View style={[styles.inputContainer]}>
              <Text style={[styles.font_12,styles.fontFamily]}>
                <Text>Thank you for reporting your upcoming Absence.</Text> {"\n"}{"\n"}
                 <Text style={{ fontWeight: "bold" }}>
                  To request a Make-Up, or to pay for an additional class, view all available openings on the <Text style={{textDecorationLine:'underline'}}>Request Make-Up</Text> page or on the <Text style={{textDecorationLine:'underline'}}>Drop-In Class</Text> page.
                 </Text>  
                 {
                  this.state.NoteHour !=null && this.state.NoteHour !='' ?
                  <Text style={{ fontWeight: "bold" }}>
                  Your Absence Report was submitted only ({this.state.NoteHour} hours) before your scheduled class.
                  </Text>
                 : null
                 }
               </Text>
            </View>
         </Card>
        </ScrollView>
      </View>
      </View>
    );

  }

}


