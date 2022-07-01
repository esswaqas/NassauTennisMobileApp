import React, { Component } from 'react';
import {
  View,StyleSheet,TouchableHighlight,FlatList,Text,ScrollView,TouchableOpacity,Platform


} from 'react-native';
import style from '../../../Stylesheets/NAppSS';
import { CallPI } from '../../../Api/APICall'
import { WebView} from 'react-native-webview';//'react-native-WebView' testetetetetet
import RenderHtml from 'react-native-render-html';
 import EmptyMessage from '../Shared/ListEmptyMessage'
import { Icon ,Card} from 'react-native-elements'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  listenOrientationChange as lor,
  removeOrientationListener as rol
} from 'react-native-responsive-screen';
  export default class AnnouncementsList extends Component {
    constructor(props) {
      super(props)
      this.state = {
        isLoading: true,
         data: [],
        Announcements:[]
      }
    }
    componentWillUnmount() {
      rol(this);
    }
   async componentDidMount()
   {
    lor(this);
      
      var url = `Dashboard/AnnouncementList`;
      await CallPI('GET', url, null, null,  " " , null).then((response) => response.json())

       .then(responseJson => {
         console.log(JSON.stringify(responseJson))

         var list =[];
         for (let userObject of responseJson) {
       
          list.push({ Title: userObject.Title, Body: userObject.Text,   Expanded: false });
        }
 
        this.setState({
             data: list,
             isLoading:false
         })

        }
       ).catch(error => {

        });


   }
   UpDatedExt = (index) => {

    const array = [...this.state.data];

    array[index]['Expanded'] = !array[index]['Expanded']
    this.setState({ data: array })
}
   rederItems = ({ item, index }) => {
    return ( 
      
        <Card containerStyle={style.CardItem}>
          
          <TouchableOpacity style={style.CartItembg_Success} onPress={() => { this.UpDatedExt(index) }}>
                 
                         
                            <Text style={[style.Color_white,{alignItems:'center'} ]}>
                                <Text style={style.font_13}>{item.Title}</Text>
                            </Text>
                         
                        <View>
                        {
                            item.Expanded ?
                            <Icon name="angle-up" type='font-awesome' color={'#fff'} size={24} />
                            :
                            <Icon name="angle-down" type='font-awesome' color={'#fff'} size={24} />
                            }
                        </View>
                    
             </TouchableOpacity> 
             
                    {
                    item.Expanded ?
                    <View style={{  
      
                      height:hp('20%'),
                      flexDirection:'row',
                      justifyContent: 'center',
                      backgroundColor:'#FCF8F9'}}>
                        <ScrollView contentContainerStyle={{ flexGrow: 1 }} 
                        showsVerticalScrollIndicator={true}
                        persistentScrollbar={true}>
                    
                 
                     {/* <WebView
                style={{height: Number(hp('70%')),fontSize:9 ,  backgroundColor:'#FCF8F9'}}
               javaScriptEnabled={true}
               scalesPageToFit={false}
                domStorageEnabled={true}
                scrollEnabled={true}
                startInLoadingState={true}
               
                source={{ html:  Platform.isPad?  '<html><body style="font-size:28px"><b>'+item.Title+'</b><br/>'+ item.Body +'</body></html>': '<html><body style="font-size:14px"><b>'+item.Title+'</b><br/>'+ item.Body +'</body></html>'}} 
               />*/}
            <RenderHtml
            contentWidth={{width: '90%'}}
            source={{ html:    '<html><body style="font-size:14px"><b>'+item.Title+'</b><br/>'+ item.Body +'</body></html>'}}

                 />  
               </ScrollView>
                    </View>
                        :
                        null
                }
              
                </Card>
               


        
        )
}


render() {
    return (
      <View style={style.ListPagecontainer}>
      <FlatList
      data={this.state.data}
      renderItem={this.rederItems}
      ListHeaderComponent={() => (!this.state.data.length? <EmptyMessage/> : null ) }
  keyExtractor={(item,index)=>index.toString()}
      />
      </View>

    );
  }

}

 
const stylessss = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#e5e5e5",
    fontSize:5,
   
  },
});