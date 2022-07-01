import { validateAll } from 'indicative/validator'
import { AsyncStorage } from "@react-native-async-storage/async-storage";

   export   const UserLogin = async (data,invalidUsernamePassword) => {
    alert(data.email)
    //this.props.navigation.navigate("Dashboard");
    //try {
      var usernmae = data.email;
      var password = data.password;
      var url = `http://testing.njtennis.net/api/APITesting/LoginCustomers?username=${usernmae}&password=${password}`;
      await fetch(url, {
        method: "POST",
      })
        .then(response => response.json())
        .then(responseJson => {
          // Showing response message coming from server after inserting records.
          this.setState({
            isLoading: false
         })

          if (responseJson["Message"] == "") {
              AsyncStorage.setItem('LoginUserFirstName', responseJson["FirstName"]);
              AsyncStorage.setItem('LoginUserLastName', responseJson["LastName"]);
              AsyncStorage.setItem('LoginUserID', responseJson["ID"]);
              this.props.navigation.navigate("Dashboard");
             }

          else 
          {
            invalidUsernamePassword='Invalid username or password.';
            // this.setState({
            //   invalidUsernamePassword:'Invalid username or password.',// responseJson["Message"]
            //  isLoading: false
            // })
          }
        }
        )
        .catch(error => {
        });
      
    // }
    // catch (errors) {
    //   const formattedErrors = {}
    //   errors.forEach(error => formattedErrors[error.field] = error.message);
    //   this.setState({
    //     error: formattedErrors
    //   })
    // }

  }
