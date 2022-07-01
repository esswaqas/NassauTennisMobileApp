import React, {useState} from 'react';
import RNPickerSelect, { defaultStyles } from 'react-native-picker-select';
import {StyleSheet, Text, View, TouchableOpacity , Image} from 'react-native';
import style from '../../../Stylesheets/NAppSS'
import { Icon ,CheckBox} from 'react-native-elements'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  listenOrientationChange as lor,
  removeOrientationListener as rol
} from 'react-native-responsive-screen';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
let CustomCheckBox = ({
  title,
 checked,
 setValue
}) => {
    //const [getSelectionMode, setSelectionMode] = useState(selectedValue);
   
    const updatedSwitchData = () => {
       // setSelectionMode(val);
        setValue();
      };


  return (
    <View>
      {
      title=="Remember me"?

    <CheckBox
      onPress={() => updatedSwitchData()}
      title={title}
      checkedIcon={<Image style={{ width: hp('2.5%'),height: hp('2.5%'),}} source={require('../../../Images/CheckedBox.png')} />}
      uncheckedIcon={<Image style={{ width: hp('2.5%'),height: hp('2.5%'),}} source={require('../../../Images/uncheckBox.png')} />}
      
      textStyle={[style.fontFamily,style.font_12,{color:'white',fontWeight:'normal'}]}
      containerStyle={[{color:'white', backgroundColor: 'transparent'
      , padding:0,  
      borderWidth:0,
      
      margin:0,
      alignItems:'flex-start',
      justifyContent:'flex-start', 
    }]}
      checked={checked}
    />
    :

    <CheckBox
    onPress={() => updatedSwitchData()}
    title={title}
    style={{margin:0, padding:0}}
    checkedIcon={<Image style={style.checkboxImageIcon}  source={require('../../../Images/icon-checkbox-checked.png')} />}
      uncheckedIcon={<Image style={style.checkboxImageIcon}   source={require('../../../Images/icon-checkbox.png')} />}
     
      textStyle={[style.fontFamily,style.font_12,{fontWeight:'normal', marginLeft:10}]}
   containerStyle={style.RegitrationcheckBoxContainer}
    checked={checked}
  />
  }
  </View>
  );
};
export default CustomCheckBox;
 
  