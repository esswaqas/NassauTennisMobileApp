import * as React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableHighlight,
  Image,
  Alert,
  ScrollView
 
} from 'react-native';
 
 export default class SignupTermsConditions extends React.Component {
  constructor(props) {
    super(props)

  }
  state = {
  
  }
 render() {
    
    return (
 
      <View style={styles.container}>

         <ScrollView style={{height:'100%'}}> 
           <View> 
             <View >
              <Text style={{fontWeight:'bold' }}>
              LIABILITY WAIVER

             </Text>
               
            </View>
            
            <View>
              <Text>
              It is expressly agreed that use of the Tennis and/or Fitness
               Facilities and/or Pool at Nassau Racquet & Tennis Club (“the Club”) shall be undertaken by an Adult or Minor 
               Participant (”Participant”) at his or her sole risk, and the Club shall not be liable for any injuries or damage to any Participant or guest, or the property of any Participant, or be subject to any claim, demand, injury or damages whatsoever, including, without any limitation, those damages resulting from acts of active or passive negligence on the part of the Club, its successors or assigns, as well as its officers and agents, for all such claims, demands, injuries, damages, actions or causes of actions. It is specifically agreed that the Club shall not be responsible or liable to Participants for articles or property lost or stolen in the Club. It is also agreed that any damages to the Club facilities or property by a Participant, or to the property of
               any Participant by another Participant, is the sole responsibility of the offending Participant.
             </Text>
            </View>
            <View>
            <Text style={{fontWeight:'bold' , marginTop:'5%'}}>
              NO CLASSES:
            </Text>
            </View>
            <View>
            <Text style={{fontWeight:'bold' , marginTop:'5%'}}>
            2016-2017 Session
            </Text>
            </View>

            <View>
            <Text style={{marginLeft:'4%', marginTop:'5%'}}>
            <Text style={{fontWeight:'bold' , marginTop:'5%'}}>
            Thanksgiving:
            </Text>
            <Text>
              {'    '}
              Thursday, November 24th – Sunday, November 27th
            </Text>
            </Text>
          
            </View>
            <View>
            <Text style={{marginLeft:'4%', marginTop:'5%'}}>
            <Text style={{fontWeight:'bold' , marginTop:'5%'}}>
            Winter Holiday:
            </Text>
            <Text>
              {'    '}
              Saturday, December 24th – Sunday, January 1st
            </Text>
            </Text>
          
            </View>
            <View>
            <Text style={{marginLeft:'4%', marginTop:'5%'}}>
            <Text style={{fontWeight:'bold' , marginTop:'5%'}}>
            Presidents Weekend:
            </Text>
            <Text>
              {'    '}
              Saturday, February 18th – Monday, February 20th
            </Text>
            </Text>
          
            </View>
            <View>
            <Text style={{marginLeft:'4%', marginTop:'5%'}}>
            <Text style={{fontWeight:'bold' , marginTop:'5%'}}>
            Easter Weekend:
            </Text>
            <Text>
              {'    '}
              Friday, April 14th – Sunday, April 16th
            </Text>
            </Text>
          
            </View>
            <View>
            <Text style={{marginLeft:'4%', marginTop:'5%'}}>
            <Text style={{fontWeight:'bold' , marginTop:'5%'}}>
            Memorial Day Weekend:
            </Text>
            <Text>
              {'    '}
              Saturday, May 22nd – Monday, May 29th
            </Text>
            </Text>
          
            </View>

            <View  style={{marginTop:'5%'}}>
              <Text>
              <Text style={{fontWeight:'bold'}}>
              NOTE:
              </Text>
              Additional days may be cancelled and rescheduled at the end of any given session
             </Text>
            </View>

             <View  style={{marginTop:'5%'}}>
              <Text style={{fontWeight:'bold'}}>
              MAKE UP POLICY:
              </Text>
            </View>
            <View  style={{marginTop:'2%'}}>
              <Text style={{color:'red'}}>
              No Make-Ups Guaranteed. Only 1 Make-Up per session, by permission of Director. 24-Hour Notice of absence required. ALL Absence Reports and Make-Up Requests Must be Made ONLINE
              </Text>
            </View>
             
            <View  style={{marginTop:'5%'}}>
              <Text style={{fontWeight:'bold'}}>
              SNOW DAYS:
              </Text>
            </View>
            <View  style={{marginTop:'2%'}}>
              <Text>
              Call Club during inclement weather to find out if class has been cancelled. Snow days will be made up at the end of session.
              </Text>
            </View>
             
            <View  style={{marginTop:'5%'}}>
              <Text style={{fontWeight:'bold'}}>
              CREDITS:
              </Text>
            </View>
            <View  style={{marginTop:'2%'}}>
              <Text>
              No Refunds, No Credits for any class(es) missed. Exception: if a paying substitute is found by Club or absent/withdrawn student, a partial credit may be issued.
               </Text>
            </View>

            <View  style={{marginTop:'5%'}}>
              <Text style={{fontWeight:'bold'}}>
              MEMBERSHIP TYPES:
              </Text>
            </View>
            <View>
            <Text style={{marginLeft:'4%', marginTop:'5%'}}>
            <Text style={{ marginTop:'5%'}}>
            Silver Membership(s):
            </Text>
            <Text>
              {'    '}
              Require No credit card information be kept on file. No Open Balances allowed.
            </Text>
            </Text>
          
            </View>
            <View>
            <Text style={{marginLeft:'4%', marginTop:'5%'}}>
            <Text style={{ marginTop:'5%'}}>
            Gold Membership(s):
            </Text>
            <Text>
              {'    '}
              Encrypted credit card information kept on file. Stored credit card may be used to pay customer open balances.            </Text>
            </Text>
          
            </View>
            </View>
           </ScrollView>
        </View>   
    


    );

  }

}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 5,
    backgroundColor:'white'
     
     
  }})