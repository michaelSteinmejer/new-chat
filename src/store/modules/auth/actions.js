import {db} from "@/firestore/init";
import firebase from "firebase";

const Login = (commit, data)=>{
  return new Promise((resolve, reject) => {
          firebase
          .auth()
          .signInWithEmailAndPassword(data.email, data.password)
          .then(cred=> { resolve(cred.user) })
          .catch(error => {
            reject(error.message);
          })   
  })
}

const GetUsers = ({ commit }) => {
  let dbRef = db.collection("user");
  let emptyarr = []
  dbRef.onSnapshot(snapshot => {
    snapshot.docChanges().forEach(change => {
      if (change.type === "added") {
        let doc = change.doc;
        emptyarr.push({
          id: doc.id,
          profilepic: doc.data().ProfilePic,
          name: doc.data().name,
          address: doc.data().address,
          email: doc.data().email,
          birthday: doc.data().birthday
        })
      }
    });
    commit('GET_USERS', emptyarr)
  });
};

const GetLoggedInUser = ({ commit }) => {
  var user = firebase.auth().currentUser
  let docRef = db.collection("user").doc(user.uid);

  docRef.get().then((doc) => {
    if (doc.exists) {
      var obj = {
        id: doc.id,
        profilepic: doc.data().ProfilePic,
        name: doc.data().name,
        address: doc.data().address,
        email: doc.data().email,
        birthday: doc.data().birthday
      }
    }

    commit('GET_LOGGEDINUSER', obj)
  })


}

export default {
  GetUsers,
  GetLoggedInUser,
  Login
};