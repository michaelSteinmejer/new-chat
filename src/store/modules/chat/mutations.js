const GET_USERCHATINFO = (state, payload) => {
    state.userchatinfo = payload;
  };

const GET_CHATS = (state, payload) => {
    state.chats = payload;
  };

  const GET_MESSAGES = (state, payload) => {
    state.messages = payload;
  };
  
  export default {
    GET_USERCHATINFO,
    GET_CHATS,
    GET_MESSAGES
  };