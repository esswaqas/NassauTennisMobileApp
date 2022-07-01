
export const setuserID =(data) => async (dispatch)=>{
    dispatch({type:"UserID",payload:data})
}
export const setusername =(data) => async (dispatch)=>{
    dispatch({type:"Username",payload:data})
}