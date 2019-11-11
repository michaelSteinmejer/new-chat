import { db } from "@/firestore/init";
import moment from "moment";

const SendMessage = (commit, data) => {

  return new Promise((resolve, reject) => {
    db
      .collection("chatroom")
      .doc(data.id)
      .collection("messages")
      .add({
        content: data.content,
        date: data.date,
        email: data.email
      })
      .then(response => { resolve(response.id) })
      .catch(error => { reject(error.message) });
  });
}


const GetMessages = ({ commit }, data) => {
  let emptyarr = []

  let dbRef = db
    .collection("chatroom")
    .doc(data.id)
    .collection("messages").orderBy("date");

  dbRef.onSnapshot(snapshot => {
    snapshot.docChanges().forEach(change => {
      if (change.type === "added") {
        let doc = change.doc;

        emptyarr.push({
          id: doc.id,
          content: doc.data().content,
          date: moment(doc.data().date).format("lll"),
          email: doc.data().email
        })
      }
    });
    commit('GET_MESSAGES', emptyarr)
  });
}

const GetChats = ({ commit }) => {
  let dbRef = db.collection("chatroom");
  let emptyarr = []
  dbRef.onSnapshot(snapshot => {
    snapshot.docChanges().forEach(change => {
      if (change.type === "added") {
        let doc = change.doc;

        emptyarr.push({
          id: doc.id,
          title: doc.data().title,
          createdby: doc.data().loggedinuser,
          date: moment(doc.data().date).format("lll")
        })
      }
    });
    commit('GET_CHATS', emptyarr)
  });
};

const GetUserChatInfo = ({ commit }) => {
  let dbRef = db.collection("userchatinfo");
  let emptyarr = []
  dbRef.onSnapshot(snapshot => {
    snapshot.docChanges().forEach(change => {
      if (change.type === "added") {
        let doc = change.doc;

        emptyarr.push({
          id: doc.id,
          userId: doc.data().userId,
          chatId: doc.data().chatId,
        })
      }
    });
    commit('GET_USERCHATINFO', emptyarr)
  });
};

const UserChatInfo = (commit, data) => {
  let emptyarr = []
  return new Promise((resolve, reject) => {

    data.allowedusers.forEach(user => {
      let chatUserInfo = { userId: user.id, chatId: data.chatId }
      db.collection("userchatinfo").add(chatUserInfo).then(
        info => {
          emptyarr.push(info)
        }).then(resolve(emptyarr))
    }).catch(error => { reject(error) })

  })
}

const OwnerChatInfo = (commit, data) => {
  return new Promise((resolve, reject) => {
    db.collection("userchatinfo").add({ userId: data.loggedinuser.id, chatId: data.chatId })
      .then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
  })
}


const ChatMessages = (commit, data) => {
  db.collection("chatroom").doc(data.chatId).collection("messages")
    .add({ content: data.content, date: data.date, email: data.email })
}

const AddChat = (commit, data) => {

  return new Promise((resolve, reject) => {
    return db.collection("chatroom")
      .add({
        title: data.title,
        loggedinuser: data.loggedinuser,
        date: data.date
      })
      .then(response => {
        resolve(response)
      }, error => {
        reject(error)
      })
  })
}

export default {
  AddChat,
  UserChatInfo,
  OwnerChatInfo,
  ChatMessages,
  GetUserChatInfo,
  GetChats,
  GetMessages,
  SendMessage
};