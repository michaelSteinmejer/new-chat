const GET_USERS = (state, payload) => { 
  state.users = payload;
  };

  const GET_LOGGEDINUSER = (state,payload) =>{
    state.loggedinuser = payload;
  }
  
 
  export default {
    GET_USERS,
    GET_LOGGEDINUSER
  };
