import React, { Component } from 'react';
import {
  View,   FlatList, Text
} from 'react-native';
import style from '../../../Stylesheets/AppSS';
import AsyncStorage from "@react-native-async-storage/async-storage";
export default class ClassManagements extends Component {

  constructor(props) {
    super(props)
    this.state = {
      isLoading: true,
      data: []
    }
  }

GetClassManagements=async ()=>{

  const LoginUserID = await  AsyncStorage.getItem('LoginUserID');
  var url = `http://testing.njtennis.net/api/Dashboard/GetClassManagment?classManagmentUserID=${LoginUserID}`;
  fetch(url, {
    method: "GET",

  })
    .then(response => response.json())
    .then(responseJson => {
      // Showing response message coming from server after inserting records.
      this.setState({
        data: responseJson
      })

    }
    )
    .catch(error => {

    });
}

  componentDidMount() {
   this.GetClassManagements()
    
  }

  render() {
    return (
      <View style={style.container}>
        <FlatList
          data={this.state.data}
          renderItem={({ item }) =>
            <View style={style.listItems}>
              <View>
              <Text>
            <Text style={style.text}> {item}  </Text>
             </Text>
              </View>
            </View>


          }
          ListHeaderComponent={() => (!this.state.data.length? 
          
            <View style={style.listItemsEmptyMessage}>
            <View>                
                <Text>
                  <Text style={style.text}> No record found.  </Text>
                </Text>
            </View>
          </View>
            : null)
          }
          keyExtractor={(item,index) => index.toString()}
        />
      </View>

    );
  }

}

 