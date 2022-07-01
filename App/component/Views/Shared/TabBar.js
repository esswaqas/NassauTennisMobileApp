import * as React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableHighlight,
  TouchableOpacity,
 

} from 'react-native';
import styles from '../../../../App/Stylesheets/NAppSS'

import { NavigationContainer, NavigationAction ,useRoute,useNavigation} from '@react-navigation/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  listenOrientationChange as lor,
  removeOrientationListener as rol
} from 'react-native-responsive-screen';

export default  function MyTabBar({ state, descriptors, navigation }) {
    debugger
    return (
      <View style={{ flexDirection: 'row',height:50, justifyContent:"center",alignItems:"center" }}>
        {
        state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;
  
          const isFocused = state.index === index;
  
          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
            });
  
            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };
  
          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };
  
          return (
   
           
            <TouchableOpacity
              accessibilityRole="button"
            
              accessibilityStates={isFocused ? ['selected'] : []}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={{ 
                 
                 backgroundColor:isFocused ? '#597e15' : '#415717',width:'100%', height:'100%' ,display:'flex',
                 justifyContent:'center', alignItems:'center',flex:1,
                 borderRightWidth: (state.routes.length-1==index)? 0:1,
                 borderRightColor:'white',
                 borderBottomWidth:isFocused?1:0,
                 borderBottomColor:isFocused? 'grey':'#415717'
  
            }}
            >
              <Text style={[styles.font_15,styles.fontFamily,{ textAlign:'center', color: 'white' , fontWeight:isFocused ? 'bold': 'normal'}]}>
                {
                label
         
    }
              </Text>
            </TouchableOpacity>
            
          );
        })}
      </View>
    );
  }