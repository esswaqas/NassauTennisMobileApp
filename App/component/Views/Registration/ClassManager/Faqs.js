import * as React from 'react';
import { Dimensions, Text, View, TextInput, TouchableHighlight, Image, Alert, ListItem, Modal, ListRenderItem, ScrollView, Left, Right, FlatList, } from 'react-native';
import { WebView} from 'react-native-webview';//'react-native-WebView'
import { CallPI } from '../../../../Api/APICall'
import styles from '../../../../Stylesheets/NAppSS'

import { Card } from 'react-native-elements'

export default class  Faqs extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            
            Content:'',
            Title:'',
          
          }
    }
     
    async componentDidMount()
    {
       var url = `ClassManagment/Faqs?isClassmanageFaq=true`;
       await CallPI('GET', url, null, null,  " " , null).then((response) => response.json())
        .then(responseJson => {

         
       
         this.setState({
            Content: responseJson.Contents,
            Title:responseJson.Heading,
              isLoading:false
          })
          
        }
        ).catch(error => {
         });
    }

render(){
    return(

      
      <View style={styles.Pagecontainer}>
      <View style={styles.containerWithCard}>
        <Card containerStyle={styles.PageCardHeader}>
      <ScrollView>

<WebView
  style={{  height:Dimensions.get('window').height - 150,backgroundColor:'#FCF8F9'}}
 javaScriptEnabled={true}
 scalesPageToFit={false}
  domStorageEnabled={true}
  scrollEnabled={false}
  source={{ html:  '<html><body style="font-size:12px"><b>'+this.state.Title+'</b><br/>'+ this.state.Content +'</body></html>' }}
 />
        </ScrollView>
  </Card>
        </View>
        </View>

    
        )}}