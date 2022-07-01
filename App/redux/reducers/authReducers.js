import { State } from "react-native-gesture-handler"

const Initial_State ={

    userID : null,
    username: null
}

export default function(stat3= Initial_State ,action )
{
    switch(action.type){

        case "UserID":
            return {...State, serID: action.payload}
            case "Username": 
                return {...State, username: action.payload}
                default:
                    return false
    }

}