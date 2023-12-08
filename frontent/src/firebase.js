// import { initializeApp } from "firebase/app";
// import { getMessaging,getToken,onMessage } from "firebase/messaging";


// const firebaseConfig = {
//     apiKey: "AIzaSyBEMuNF9kK1kDfpVkjmCPkG0UknpeFr0dQ",
//     authDomain: "le-venner.firebaseapp.com",
//     projectId: "le-venner",
//     storageBucket: "le-venner.appspot.com",
//     messagingSenderId: "705416719472",
//     appId: "1:705416719472:web:3af08d02219a496a2d58b5",
//     measurementId: "G-4LKKY82RQP"
//   };

//   const app = initializeApp(firebaseConfig);
// const messaging = getMessaging(app);

// export const requestPermission =()=>{
//     console.log("Requesting user permission.....");
//     Notification.requestPermission().then(permission =>{
//         if(permission === 'granted'){
//             console.log("Notification User Permission Granted...");

//             return getToken(messaging,{
//                 vapidKey:"BOIQJIIqAbZsQJGiriprNx0H9shimDL34XtkQ25wLgHejkkN0rA2sN4tCX_DkLnBKNdG2WWsjLybGZOXgjxhSjE"
//             }).then(currentToken => {
//                 if(currentToken){
//                     console.log("Client Token : " ,currentToken);
//                 }
//                 else{
//                     console.log("Failed to Generate the app registration token.");
//                 }
//             }).catch(err=>{
//                 console.log("An error Occured when requesting to recieve the token",err);
//             })
//         }else{
//             console.log("user permission Denied.");
//         }
//     })
// }

//     requestPermission()

//     export const onMessageListener = ()=>{
//         new Promise (resolve =>{
//             onMessage(messaging,payload =>{
//                 resolve(payload)
//             })
//         })
//     }



