
import React, { Component } from 'react'
import {
    Text,
    View,
    TouchableOpacity,
    StyleSheet, FlatList,Image

} from 'react-native';

//import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { CheckBox } from 'react-native-elements'
import styles from '../../../../Stylesheets/NAppSS'

import {CallPI} from '../../../../Api/APICall'
  

export default class DocumentList extends React.Component {
    constructor(props) {
      super(props)
    }
    state = {
      DocumentList: [],
      
    }
  
  async  GetDocumentDetail(id) 
    {

        var list = [];
        for (let userObject of this.state.DocumentList)
        {
            if (id == userObject.value)
            {
                list.push({ label: userObject.label, value: userObject.value, Content:userObject.Content,LastUpdatedDate:userObject.LastUpdatedDate,checked: !userObject.checked });
            }
            else 
            {
                list.push({ label: userObject.label, value: userObject.value,Content:userObject.Content,LastUpdatedDate:userObject.LastUpdatedDate, checked: userObject.checked });
            }
        }
        this.setState({DocumentList:list})
        this.props.DocumentDetail(id,list)
    }
    
//     FamilyMembers(itemValue){
       
//       var purchaseName  =''
//    if(itemValue!=''){
//         purchaseName =    this.state.Participantdata.find(data=>data.value== itemValue).label;
//       }
      
//       this.props.SelectFamilyMember(itemValue,purchaseName)
    
  
  
   
     
//       this.setState({
//         Participant:itemValue
//       })
//     }
     componentDidMount()
     {
        this.setState({
            DocumentList:this.props.docomentList
     })
     }
     
    render() {
     
      return (
        <View style={styles.inputContainer}>

<FlatList
    data={this.state.DocumentList}
    renderItem={({ item }) =>
        <CheckBox
        checkedIcon={<Image style={styles.ImageIcon} source={require('../../../../Images/icon-checkbox-checked.png')} />}
        uncheckedIcon={<Image style={styles.ImageIcon} source={require('../../../../Images/icon-checkbox.png')} />}
      
        textStyle={[styles.fontFamily, styles.font_14,{fontWeight:''}]}
        containerStyle={styles.RegitrationcheckBoxContainer}
            title={item.label}

            onPress={() => this.GetDocumentDetail(item.value)}
            checked={item.checked}
        />
    }
    keyExtractor={(item) => item.value.toString()}
/>
</View>
      )
    }
  
  }

//   function Doocuments({ docomentList }) {
//     return (
        
// <View style={styles.inputContainer}>

// <FlatList
//     data={docomentList}
//     renderItem={({ item }) =>
//         <CheckBox

//             title={item.label}

//             onPress={() => this.GetDocumentDetail(item.value)}
//             checked={item.checked}
//         />
//     }
//     keyExtractor={(item) => item.value.toString()}
// />
// </View>
         
// );

 
// }
  
