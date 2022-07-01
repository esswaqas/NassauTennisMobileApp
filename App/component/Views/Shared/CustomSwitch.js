import React, {useState} from 'react';

import {StyleSheet, Text, View, TouchableOpacity , Image} from 'react-native';
import  style from '../../../Stylesheets/NAppSS'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
    listenOrientationChange as lor,
    removeOrientationListener as rol
  } from 'react-native-responsive-screen';
let CustomSwitch = ({
  navigation,
  selectionMode,
  roundCorner,
  option1,
  option2,
  onSelectSwitch,
  selectionColor,
 

}) => {
  const [getSelectionMode, setSelectionMode] = useState(selectionMode);
  const [getRoundCorner, setRoundCorner] = useState(roundCorner);

  const updatedSwitchData = val =>
   {
    setSelectionMode(val);
    onSelectSwitch(val);
  };
let image1 = getSelectionMode == 1 ? "../../../Images/Icon/male-03.png" : "../../../Images/Icon/male-04.png";
let image2 = getSelectionMode == 1 ? "../../../Images/Icon/female-01.png" : "../../../Images/Icon/female-02.png";

  return (
    <View>
      <View
        style={{
          height: hp('3.9%'),
          width: wp('40%'),
          backgroundColor: '#e9e9e9',
          borderRadius: getRoundCorner ? 25 : 0,
         
           borderColor: getSelectionMode == 1 ? selectionColor : getSelectionMode == 0? 'white':'#e9e9e9',
          flexDirection: 'row',
          justifyContent: 'center',
          padding: 2,
        }}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => updatedSwitchData(1)}
          style={{
            flex: 1,
            flexDirection:'row',
            backgroundColor: getSelectionMode == 1 ? selectionColor : getSelectionMode == 0? 'white':'#e9e9e9',
            borderRadius: getRoundCorner ? 25 : 0,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
              {/* {
              getSelectionMode == 1 ? 
              <Image  
             style={{
                  alignSelf: 'center',
                  height:hp('5%'),
          
          width:wp('5%'),

          
        }}
        resizeMode="contain"
   
        source={require("../../../Images/Icon/male-04.png")}

          /> : <Image  
          style={{
            alignSelf: 'center',
            height:hp('5%'),
            
            width:wp('5%'),
  
            
          }}
          resizeMode="contain"
     
          source={require("../../../Images/Icon/male-03.png")}
  
            />} */}
          <Text
            style={ [style.font_12, {
              color: getSelectionMode == 1 ? '#e9e9e9' : "#324909",
              marginLeft:7
            }]}>
            {option1}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          TouchableOpacity
          activeOpacity={1}
          onPress={() => updatedSwitchData(2)}
          style={{
            flex: 1,
            flexDirection:'row',
            backgroundColor: getSelectionMode == 2 ? selectionColor : '#e9e9e9',
            borderRadius: getRoundCorner ? 25 : 0,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
           {/* {getSelectionMode == 2 ? 
            <Image  
          style={[{
          alignSelf: 'center',
          height:hp('4%'),
          width:wp('4%'),
        }]}
        resizeMode="contain"
        source={require("../../../Images/Icon/female-02.png")}
          /> : 

          <Image  
          style={{
            alignSelf: 'center',
            height:hp('4%'),
            
            width:wp('4%'),
  
            
          }}
          resizeMode="contain"
          source={require("../../../Images/Icon/female-01.png")}
            />} */}
          <Text
            style={[style.font_12, {
              color: getSelectionMode == 2 ? '#e9e9e9' : "#324909",
              marginLeft:7
            }]}>
            {option2}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default CustomSwitch;