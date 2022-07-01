import * as React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  
  TouchableHighlight,
  Image,
  Alert,
 
  ListItem,
  Modal,
  ListRenderItem,
 
  ScrollView
   
 
} from 'react-native';
 

 
import styles from '../../../../Stylesheets/AppSS'
 
import { WebView } from 'react-native-webview';


export default class MembershipTermsCondition extends React.Component {

  constructor(props) {
    super(props)
  }
  state = {
    
     
  }
  HideTermsConditionModel = async (visible) => {
       this.props.HideTermsConditionModel(visible)
  }
   render() {

    return (
      <View>
         <Modal
                    animationType="slide"
                    transparent={true}
                    visible={this.props.Data.TermsmodalVisible}
                    onRequestClose={() => {
                        Alert.alert("Modal has been closed.");
                    }}
                >

                    <View style={styles.ModalView}>
                        <ScrollView style={{ width: '100%' }}>
                            {
                               this.props.Data.IsTermsCondition ?
                            <WebView
                                style={{ height: Number(500), fontSize: 8, width: '100%', backgroundColor: '#FCF8F9' }}
                                javaScriptEnabled={true}
                                scalesPageToFit={false}
                                domStorageEnabled={true}
                                scrollEnabled={false}
                                source={{ html: '<html><body style="font-size:12px"><h4>' + this.props.Data.TermsConditionHeading + '</h4><hr/> <br/>' + this.props.Data.TermsCondition + ' <br/><br/></body></html> ' }}
                            />: null
                            }

                             {
                               this.props.Data.IsDocuments ?
                            <WebView
                                style={{ height: Number(500), fontSize: 8, width: '100%', backgroundColor: '#FCF8F9' }}
                                javaScriptEnabled={true}
                                scalesPageToFit={false}
                                domStorageEnabled={true}
                                scrollEnabled={false}
                                source={{ html: '<html><body style="font-size:12px"><h4>' + this.props.Data.TermsConditionHeading + '</h4><hr/> <br/>' + this.props.Data.TermsCondition + ' <br/><br/><h4 style="color:"red"">Last Revise Date: '+this.props.Data.LastUpdatetdDate+'</h4></body></html> ' }}
                            />: null
                            }
                            
{
    this.props.Data.IsTermsCondition?
                            <View style={{ justifyContent: 'center', alignItems: 'center', width: '100%', paddingTop: '2%' }}>
                                <View style={{ width: '30%' }}>
                                    <TouchableHighlight style={styles.ModalCloseButton}
                                        onPress={() => {
                                            this.HideTermsConditionModel(false);
                                        }}
                                    >
                                        <Text style={styles.ModalCloseButtonTextStyle}>Close</Text>
                                    </TouchableHighlight>
                                </View>
                            </View>:
                            <View style={{ justifyContent: 'center', alignItems: 'center', width: '100%', paddingTop: '2%' }}>
                            <View style={{ width: '30%' }}>
                                <TouchableHighlight style={styles.ModalSaveButton}
                                    onPress={() => {
                                        this.HideTermsConditionModel(false);
                                    }}
                                >
                                    <Text style={styles.ModalCloseButtonTextStyle}>Accept</Text>
                                </TouchableHighlight>
                            </View>
                        </View>

                            }
                        </ScrollView>
                    </View>
                </Modal>
              
      </View>


    );

  }

}
 