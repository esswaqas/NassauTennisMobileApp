import * as React from 'react'
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import { StyleSheet, RefreshControl, Text, View, TextInput, Button, TouchableOpacity, Image, Alert,  ScrollView,PermissionsAndroid,Platform } from 'react-native';
import styles from '../../../Stylesheets/NAppSS'

import AsyncStorage from "@react-native-async-storage/async-storage";
import FileViewer from 'react-native-file-viewer';
  import Loader from '../../Loader'

//import Calender from '../../../component/Views/Shared/DatePicker';
import Moment from 'moment';
import Calender from '../../../component/Views/Shared/DateRangePicker'
import DropdownList from '../../Views/Shared/DropdownList';
import RadioButton from '../../Views/Shared/RadioButton';
import { CallPI } from '../../../Api/APICall';
import DateRangeList from '../Shared/DateRangeList'
import {widthPercentageToDP as wp,heightPercentageToDP as hp,listenOrientationChange as lor,removeOrientationListener as rol} from 'react-native-responsive-screen';
 
export default class TransactionHistory extends React.Component {
  constructor(props) {
    super(props)
  }
  state = {
    PDFDATA:[],
    Participant: '',
    DateFrom: '',
    DateTo: '',
    Status: '',
    OrderBy: '',
    SortBy: 'Ascending',
    IsSearch: false,
    ShowFamilyMembersTransaction: false,
    isLoading: true,
    Participantdata: [],
    StatusData: [
      {
        label: "All", value: "All"
      },
      {
      label: "Paid", value: "Approve"
    }, 
    {
      label: "Pending", value: "Pending"
    }, {
      label: "Refund", value: "Refund"
    }, {
      label: "Reject", value: "Rejected"
    }, {
      label: "Delete", value: "Deleted"
    }]
  }

  async Participant() {

    const LoginUserID = await AsyncStorage.getItem('LoginUserID');
    var FamilyMembers = [];
    var url = `Customers/GetFamilyMembers?familyMemberID=${LoginUserID}`;
     
    await  CallPI("GET",url,null,null,null,null,).then(response => response.json())
      .then(responseJson => {
        FamilyMembers.push({ label: "All", value: "All" });

        for (let userObject of responseJson) {
          FamilyMembers.push({ label: userObject.Name, value: userObject.Value });
        }
        this.setState({
          Participantdata: FamilyMembers
        })

      }
      ).catch(error => {
        console.log(error)
      });
  }
    SetParticipant = value => {
    this.setState({
      Participant: value
      ,IsSearch: false
    })
  }
  
   
    SetStatus = value => {
    this.setState({
      Status: value
      ,IsSearch: false
    })
  }
  SetOrderBy = value => {
    this.setState({
      OrderBy: value
      ,IsSearch: false
    })
  }
  SetSortBy = value => {
    this.setState({
      SortBy: value
      ,IsSearch: false
    })
  }
   async GetTransactionList(isPDF)
   {
    
    const LoginUserID = await AsyncStorage.getItem('LoginUserID');
    var  DateFrom= this.state.DateFrom;
    var  DateTo= this.state.DateTo;
    var  Participant= this.state.Participant;
    var  Status= this.state.Status;
    var  OrderBy= this.state.OrderBy;
    var  SortBy= this.state.SortBy;
    var  ShowFamilyMembersTransaction= this.state.ShowFamilyMembersTransaction;

    this.setState({isLoading:true})
    var url =  `Customers/TransactionHistory?customerID=${LoginUserID}&&startDate=${DateFrom}&&endDate=${DateTo}&&purchaserID=${(Participant=="All"? "": Participant)}&&orderBy=${OrderBy}&&sort=${SortBy}&&IsFamilyDetail=${ShowFamilyMembersTransaction}&&status=${(Status=="All"?"":Status)}`;
 // alert(url)
 //return 
    await CallPI('GET', url, null, null,  " " , null).then((response) => response.json())
      .then(responseJson => 
        {
         console.log("TransactionList===="+JSON.stringify(responseJson))
        this.setState({
          data: responseJson.LstTransaction,
          PDFDATA: responseJson.LstTransaction,
          isLoading: false,
          IsSearch:true
       
        })

        if(isPDF==false)
        {
         this.setState({IsSearch:true})
          this.props.navigation.navigate("TransactionHistoryList", {data: responseJson.LstTransaction})
        }
       }
      ).catch(error => {
        this.setState({
          isLoading: false
        })
      });

 
  }
    askPermission = async () =>
     {

      this.setState({isLoading:true})
      if(this.state.IsSearch==false)
      {
        await  this.GetTransactionList(true)
      }
   // async function requestExternalWritePermission()
   if (Platform.OS === 'android')
    {
      try 
      {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'Pdf creator needs External Storage Write Permission',
            message:
              'Pdf creator needs access to Storage data in your SD Card',
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) 
        {
        
          this.createPDF();
          this.setState({isLoading:false})
        } 
        else 
        {
          this.setState({isLoading:false})
          alert('WRITE_EXTERNAL_STORAGE permission denied');
        }
      } 
      catch (err) 
      {
        alert('Write permission err', err);
        this.setState({isLoading:false})
        console.warn(err);
      }
  
    }
     else
      {

      this.createPDF();
      this.setState({isLoading:false})

    }
  }

    createPDF = async () => {
    var htmlContent= await this.ExportHtmlPDf()
    //alert('htmlContent    '+htmlContent)
    let options = {
      //Content to print
      html: htmlContent,
      //File Name
      fileName: 'Transaction-History-List',
      //File directory
      directory: 'Download',

      base64: true
    };

    let file = await RNHTMLtoPDF.convert(options)
    // console.log(file.filePath);
    Alert.alert('File Successfully Exported', 'Path:storage/Download/Transaction-History-List'  , [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Open', onPress: () => this.openFile(file.filePath) }
    ], { cancelable: true });

  }

    openFile = (filepath) => {
    const path = filepath;// absolute-path-to-my-local-file.
    FileViewer.open(path)
      .then(() => {
        // success
      })
      .catch(error => {
        // error
      });
  }
  BindFamilyMemberList() {

  }
  ChangescheckboxValues() {
 
    this.setState({
      ShowFamilyMembersTransaction: !this.state.ShowFamilyMembersTransaction
    })
  }
  updateState(data) {
    //this.setState(data);
    //alert('paernt')
  }
  SelectDateRange =(startDate,endDate)=>{

    
    this.setState({
      DateFrom:startDate,
      DateTo:endDate
      ,IsSearch: true
        })
  }

 
 
ExportHtmlPDf = async ()=>{

  var boday = ``;
//alert("DATA PAFD =="+ JSON.stringify(this.state.PDFDATA))
for(let obj of this.state.PDFDATA)
 
{
  
  
  var  tr = '';
 var dates =  Moment(obj.Date).format('MM/DD/YYYY');
 var PostDate = Moment(obj.PostDate).format('MM/DD/YYYY');
 var BuyerName = obj.BuyerName;
 var Description = obj.Description;
 var PurchasedFor = obj.PurchasedFor;
 var Quantity = obj.Quantity;
 var RgDetails = obj.RegistrationDays!= null ?obj.RegistrationDays:'';
 var Subtotal = obj.Subtotal.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
 var ShareAmount =  obj.ShareAmount!= null ? obj.ShareAmount.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'): '';
 var Surcharge =  obj.Surcharge!= null ?obj.Surcharge.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'): '';
 var RefundAmount =  obj.RefundAmount!= null ?obj.RefundAmount.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'): '';
 var Tax =  obj.Tax!= null ? obj.Tax.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'): '';

  tr=`<tr>
  <td>${dates} </td>
  <td>${PostDate}</td>
  <td>${BuyerName}</td>
  <td>${Description}</td>
  <td>${PurchasedFor}</td>
  <td style="text-align:center">${Quantity}</td>
  <td>${RgDetails}</td>
  <td style="text-align:right">${Subtotal}</td>
  <td style="text-align:right">${ShareAmount}</td>
  <td style="text-align:right">${Surcharge}</td>
  <td style="text-align:right">${Tax}</td>
  <td style="text-align:right">${RefundAmount}</td>
   </tr>
  
  `;

  //alert("tr======="+tr)
  boday+=tr;

}

//alert('boday   ' +  boday)
var html=`  <html>
  <head>
    <meta charset="utf-8">
    <title>Invoice</title>
    <link rel="license" href="https://www.opensource.org/licenses/mit-license/">
    <style>
      ${htmlStyles}
    </style>
  </head>
  <body>
  <h4 style="text-align:center">Transaction History List </h4>
  <table>
  <thead>
  <tr>
  <th>Date</th>
  <th>Post Date</th>
  <th>Name</th>
  <th style="width:18%">Description</th>
  <th>Purchased For</th>
  <th style="width:5%">Qty</th>
  <th style="width:18%">Detail</th>
  <th>Total</th>
  <th>My Share</th>
  <th>Surcharge</th>
  <th>Tax</th>
  <th>Refund</th>
  </tr>
  </thead>
  <tbody>
  </tbody>
  ${boday}
  </table>

  </body>
</html>`;

//alert('html    '+html)
return html;
}
 
  componentDidMount()
   {
    this.setState({
      isLoading: false
    })
    this.Participant()
  }
  render() {

    return (
        <View style={styles.Pagecontainer}>
      <View style={styles.container}>
        <Loader loading={this.state.isLoading} />
        <ScrollView>
            <View style={styles.inputContainer}>
              <View style={styles.DropDownInnerContainer}>
              <DropdownList
          OptionList={this.state.Participantdata}
          PlaceHolderText={"Purchase For"}
          selectedValue= {this.state.Participant}
           setValue={this.SetParticipant}
          />
              </View>
            </View>
            <View style={styles.inputContainer}>
        <DateRangeList SetDateRangeValues={this.SelectDateRange}/>
              </View>
            <View style={styles.inputContainer}>
              <View style={styles.DropDownInnerContainer}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <View style={{ width: '85%' }}>

                    <TextInput style={styles.inputs}
                  placeholder="Date From"
                  value={this.state.DateFrom}
                   editable={false}
                />
                  </View>
                  <View style={{ width: '15%', alignItems: 'flex-end', justifyContent: 'center'  ,paddingRight:hp('1%')}}>
                  <Calender
                  callback={(date) =>
                    this.setState({ ...this.state, DateFrom: date,IsSearch: false })
                  }
                  startDate={this.state.DateFrom}
                  endDate={this.state.DateTo}
                  Type={"startDate"}
                />
                  </View>
                </View>
                
                
              </View>
            </View>
            <View style={styles.inputContainer}>
              <View style={styles.DropDownInnerContainer}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <View style={{ width: '85%' }}>
                  <TextInput style={styles.inputs}
                  placeholder="Date To"
                  value={this.state.DateTo}
                  editable={false}
                />
                  </View>
                  <View style={{ width: '15%', alignItems: 'flex-end', justifyContent: 'center'  ,paddingRight:hp('1%')}}>
                  <Calender
                  callback={(date) =>
                    this.setState({ ...this.state, DateTo: date,IsSearch: false })
                  }
                  startDate={this.state.DateFrom}
                  endDate={this.state.DateTo}
                  Type={"endDate"}
                />
                  </View>
                </View>
                
                
              </View>
            </View>
          
            <View style={styles.inputContainer}>
              <View style={styles.DropDownInnerContainer}>

              <DropdownList
          OptionList={this.state.StatusData}
          PlaceHolderText={"Type"}
          selectedValue= {this.state.Status}
           setValue={this.SetStatus}
          />
         

                 
              </View>
            </View>
            <View style={styles.inputContainer}>
              <View style={styles.DropDownInnerContainer}>

              <DropdownList
          OptionList={[
            
            {label:'Purcahsed By', value:'BuyerName'},  
            {label:'Purcahsed For', value:'PurchasedFor'},  
            {label:'Date', value:'Date'  } ]}  
          PlaceHolderText={"Order By"}
          selectedValue= {this.state.OrderBy}
           setValue={this.SetOrderBy}
          />
             

             
              </View>
            </View>
            <View style={styles.inputContainer}>
              <View style={styles.DropDownInnerContainer}>
              <DropdownList
          OptionList={[
            
            {label:'Ascending', value:'Ascending'},  
            {label:'Descending', value:'Descending'},  
           ]}  
          PlaceHolderText={"Sort By"}
          selectedValue= {this.state.SortBy}
           setValue={this.SetSortBy}
          />
               
                
              </View>
            </View>
            <View style={[styles.Checkboxcontainer]}>
            <TouchableOpacity onPress={() => this.ChangescheckboxValues()}
             style={{flexDirection:'row', flex:1 ,justifyContent: 'center' , alignItems:'center'}}>
            <View style={{width:'10%'}}>
            <RadioButton props={this.state.ShowFamilyMembersTransaction} />
            </View>
            <View style={{width:'90%'}}>
              <Text style={[ styles.font_12,{flex: 1, flexWrap: 'wrap'}]}>Show Transaction For All Family Members </Text>
              </View>
            </TouchableOpacity>
              
            
            </View>

              
                 <TouchableOpacity style={[styles.buttonContainer]} onPress={() => this.GetTransactionList(false)} >
              <Text style={styles.buttunTextColo}>Search </Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.buttonContainer]} onPress={() => this.askPermission()} >
              <Text style={styles.buttunTextColo}>Export to PDF </Text>
            </TouchableOpacity>
            
        
        </ScrollView>
      </View>
      </View>
    )
  }

}


const htmlStyles = `
*, ::before, ::after {
  box-sizing: border-box;
}
@media print{@page {size: landscape}}

/*
:root
{
	--col1-width: 10em;
	--col2-width: 15em;
	--col3-width: auto;
	--col4-width: 10em;
}

@media (max-width: 50em)
{
	:root
	{
		--col1-width: 20%;
		--col2-width: 30%;
		--col3-width: 30%;
		--col4-width: 20%;
	}
}
*/
table {
  border-collapse: collapse;
  width: 100%;
  min-width: 30em;
 // background: #d9eaf2;
}

thead {
 // background: #66aacc;
}

// tbody tr:nth-child(even) {
//   background: #b3d5e6;
// }

th, td {
  padding: 0.5em;
  border: 1px solid;
  text-align: left;
  vertical-align: top;
}

/*
#col1 { width: var(--col1-width) }
#col2 { width: var(--col2-width) }
#col3 { width: var(--col3-width) }
#col4 { width: var(--col4-width) }
*/
`;