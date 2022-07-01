import React, {useState,useEffect} from 'react';
import RNPickerSelect, { defaultStyles } from 'react-native-picker-select';
import {StyleSheet, Text, View, TouchableOpacity , Image, Platform} from 'react-native';
import { Icon } from 'react-native-elements'
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  listenOrientationChange as lor,
  removeOrientationListener as rol
} from 'react-native-responsive-screen';
let CustomSwitch = ({
  OptionList,
  PlaceHolderText,
 selectedValue,
  setValue
}) => {
     let [selectValue, setSelectValue] = useState(selectedValue);
    const updatedSwitchData = () => {
       
       //alert("after "+ selectValue)
        setValue(selectValue);
      };

      const updated  = val => {
      //  alert("set "+ val)
        selectValue=val
        setSelectValue(val);
        Platform.OS=="ios"? null: setValue(val);
       };
   
       useEffect(() => {
        //  alert(selectedValue)
       //  setValue(selectedValue);
 setSelectValue(selectedValue);
       }, [selectedValue]);
         
   
  return (
    <View >
        
       <RNPickerSelect
            placeholder= {{
                label: PlaceHolderText,
                value: '',
                color: '#a5a5a5'
              }}
            items={OptionList}
            
            onDonePress={() => {
              updatedSwitchData()
            
          }}
            onValueChange={value => {
              updated(value)
              
            }}
            

            style={{
              ...pickerSelectStyles,
              iconContainer: {
                top: Platform.OS=='ios'?0: 7,
                right: 20,
              },
              placeholder: {
                color: '#a5a5a5',
              
              },
            }}
            value={selectValue}
            useNativeAndroidPickerStyle={false}
             Icon={() => {
              return    <Icon name="sort-desc" type='font-awesome'  size={hp('3%')} />
            }}
          />
    </View>
    
  );
};
export default CustomSwitch;

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
    //   justifyContent:'center',
    //   alignItems:'center',
    //   fontSize: 13,
    //   paddingVertical: 8,
    //   paddingHorizontal: 20,
    //   //borderWidth: 1,
    //   borderColor: 'gray',
    //   backgroundColor: '#e9e9e9',
    //   borderRadius: 8,
    //  // marginTop:9,
    //   color: 'black',
    fontSize: RFValue(13),
    paddingHorizontal: 13,
    paddingVertical: 8,
    backgroundColor: '#e9e9e9',
    //borderWidth: 0.5,
    //borderColor: 'purple',
   borderRadius: 8,
    color: 'black',
    },
    inputAndroid: {
      fontSize: RFValue(13),
      paddingHorizontal: 13,
      paddingVertical: 8,
      backgroundColor: '#e9e9e9',
      //borderWidth: 0.5,
      //borderColor: 'purple',
     borderRadius: 8,
      color: 'black',
      //paddingRight: 30, // to ensure the text is never behind the icon
    },
  });
  