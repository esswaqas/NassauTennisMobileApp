

import React, { useState } from 'react';
import { WebView } from 'react-native-webview';
import { Modal, Text, View, TouchableOpacity, Image ,ScrollView, Platform,useWindowDimensions } from 'react-native';
import styless  from '../../../Stylesheets/NAppSS'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  listenOrientationChange as lor,
  removeOrientationListener as rol
} from 'react-native-responsive-screen';
import RenderHtml from 'react-native-render-html';

export default function CustomAlert({

  TermsConditionHeading,
  TermsConditionBody,
  IsDocuments,
  LastDate,
  ButtonTitle,
  visibility,
  CloseAlert,
  

}) 
{
  const { width } = useWindowDimensions();

  return (
    <View>
      <Modal
        visible={visibility}
        animationType={'fade'}
        transparent={true}
        >
        <View
          style={{
            flex: 1, 
            backgroundColor: 'rgba(52, 52, 52, 0.8)',
            alignItems: 'center',
            justifyContent: 'center',  
            height: hp('90%'), 
          }}>

          <View
            style={{
             
              height: Platform.OS==="ios"? hp('85%') :hp('90%'),
               backgroundColor: 'white',
              padding: '2%',
              width: '90%', borderWidth: 2, borderColor: '#fff', borderRadius: 7, elevation: 10, position: 'relative'
              
            }}> 
            
            {/* <TouchableOpacity activeOpacity={0.1} style={{ alignSelf: 'flex-end', top: Platform.OS==="ios"?-40: -30, right: Platform.OS==="ios"?-15:-10, position: 'absolute', }} onPress={() => CloseAlert(false)}> */}
            <TouchableOpacity  activeOpacity={1} style={{  alignSelf: 'flex-end',top: Platform.OS==="ios"? (-hp('4.5%')): -30, right: Platform.OS==="ios"?(-wp('4.5%')):-10, position: 'absolute',}}  onPress={() => CloseAlert(false)}>

              <Image
                style={{
                  height:  Platform.isPad? hp('7%') : hp('10%'),
                  width:  Platform.isPad? hp('7%') : wp('10%'),
                }}
                resizeMode="contain"
                source={require('../../../Images/Icon/cross.png')}
              />
            </TouchableOpacity>

            <View style={{ alignItems: 'center', marginBottom: hp('2%'),marginTop:hp('3%') , height: hp('70%'), }}>
             <ScrollView style={{ width: '100%' }} persistentScrollbar={true}>  
            {/* <View> */}
          { 
           IsDocuments == true ?
            <RenderHtml
            contentWidth={{width: '90%'}}
       
      source={{

        html: '<html><body style="font-size:12px,background:red"><h4>' + TermsConditionHeading + '</h4><hr/>' + TermsConditionBody + ' <br/><h4 style="color:red">Last Revise Date: ' + LastDate + '</h4></body></html> '  

      }}/>  
     :
 
     <RenderHtml
     contentWidth={{width: '90%'}}
    source={{
      
      html:'<html><body style="font-size:12px"><h4>' + TermsConditionHeading + '</h4><hr/>' + TermsConditionBody + ' <br/><br/></body></html> ' 
            
      }}/> 
    
    }
      {/* </View>*/}
       </ScrollView> 
              {/* <ScrollView style={{ width: '100%' }} persistentScrollbar={true}>
                <View>
                {
                  IsDocuments == true ?
                    <WebView
                      style={{ height: hp('100%'), fontSize: Platform.OS==="ios"? 30:12, width: '100%', backgroundColor: '#FCF8F9' }}
                      javaScriptEnabled={true}
                      scalesPageToFit={false}
                      domStorageEnabled={true}
                      scrollEnabled={true}
                      source={{ html: 
                        Platform.OS==="ios"?
                        '<html><body style="font-size:40px"><h4>' + TermsConditionHeading + '</h4><hr/> <br/>' + TermsConditionBody + ' <br/><br/><h4 style="color:"red"">Last Revise Date: ' + LastDate + '</h4></body></html> ' 
                      : 
                      '<html><body style="font-size:12px"><h4>' + TermsConditionHeading + '</h4><hr/> <br/>' + TermsConditionBody + ' <br/><br/><h4 style="color:"red"">Last Revise Date: ' + LastDate + '</h4></body></html> '  

                      }}
                    
                        />
                    :
                    <WebView
                      style={{ height: 700, fontSize: Platform.OS==="ios"?30 : 12, width: '100%', backgroundColor: '#FCF8F9' }}
                      javaScriptEnabled={true}
                      scalesPageToFit={false}
                      domStorageEnabled={true}
                      scrollEnabled={false}
                      source={{ html: 
                        Platform.OS==="ios"?
                        '<html><body style="font-size:40px"><h4>' + TermsConditionHeading + '</h4><hr/> <br/>' + TermsConditionBody + ' <br/><br/></body></html> ' 
                        : 
                        '<html><body style="font-size:12px"><h4>' + TermsConditionHeading + '</h4><hr/> <br/>' + TermsConditionBody + ' <br/><br/></body></html> ' 
                      }}
                    />}
                    </View>
              </ScrollView> */}

            </View>
            <View style={{ alignItems: 'center'}}>
            
            <TouchableOpacity
              activeOpacity={0.9}
              
              onPress={() => CloseAlert(false)}
              style={{
                width: '95%',
               
                alignItems: 'center',
                justifyContent: 'center',
                borderColor: '#88aa31',
               
                borderRadius: 5,
                
                backgroundColor: '#88aa31'
              }}>
              <Text style={[styless.font_12,{ color: 'white', margin: hp('2%') }]}>{ButtonTitle}</Text>
            </TouchableOpacity>
            </View>

          </View>
        </View>
      </Modal>
    </View>
  );
}