import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage'

export  async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
    getToken();
  }
}
const getToken=async () =>{
 var fcmToken =  await AsyncStorage.getItem("fcmToken")
//alert(fcmToken)
 console.log("Old "+ fcmToken)
 if(fcmToken===null)
 {

    try{
//alert(1)
      //  const fcmToken = await messaging.getToken();
        const fcmToken = await messaging().getToken();

        if(fcmToken)
        {
          //  alert("new  Toke  "+ fcmToken)
            await AsyncStorage.setItem("fcmToken" ,fcmToken);

        }
    } catch(error){

 console.log("error in fcmToekn  " + error)
    }
 }


}

export const  notificationlisteners= async ()=>{
messaging().onNotificationOpenedApp(remotemessage=>{
  //alert(1)
  console.log('app to open for background state: ',remotemessage)
});
messaging().onMessage(async remotemessage =>{
  console.log('receive in foreground: ',remotemessage);

})
messaging()
.getInitialNotification()
.then(remoteMessage => {
  alert(12)

  if (remoteMessage) {
    
    console.log(
      'Notification caused app to open from quit state:',
      remoteMessage.notification,
    );
  //  setInitialRoute(remoteMessage.data.type); // e.g. "Settings"
  }
});



}