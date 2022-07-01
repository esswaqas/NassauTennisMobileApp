import React, {useState} from 'react';
import {Modal, Text, View, TouchableOpacity,Image,style} from 'react-native';
  
export default function EmptyMessage() {
  return (
          <View style={{ margin:10, padding:5,width:'95%',flexDirection:'row',justifyContent: 'center',backgroundColor:'#FCF8F9'}}>
                                <View>
                                    <Text>
                                        <Text style={{textAlign:"center"}}> No record found.  </Text>
                                    </Text>
                                </View>
                            </View>
  );
}