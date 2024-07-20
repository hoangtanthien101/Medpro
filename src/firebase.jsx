import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
    //backup account
    // apiKey: "AIzaSyCgMTIxR4XvDbsbcnI-PSujI_F2FGgjBNQ",
    // authDomain: "pgt-capton2.firebaseapp.com",
    // projectId: "pgt-capton2",
    // storageBucket: "pgt-capton2.appspot.com",

    // messagingSenderId: "670609171389",
    // appId: "1:670609171389:web:a75d0682ff10681980a8d4"

    // new account 
    apiKey: "AIzaSyAxV48QkkSepg_glT_nrh4FkvJCN3a3Y4E",
    authDomain: "medpro-5a0dc.firebaseapp.com",
    projectId: "medpro-5a0dc",
    storageBucket: "medpro-5a0dc.appspot.com",
    messagingSenderId: "261508356488",
    appId: "1:261508356488:web:42de3c01f91b84f976023d",
    measurementId: "G-SHM0WNDB60"
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);
export const requestPermission = () => {
    Notification.requestPermission()?.then(permission => {
        if (permission === "granted") {
            return getToken(messaging, {
                vapidKey:
                    "bpgLdobq5U9uHEbkV9P-1fSwTBvF-wd-O1WbngU0xk4",
            })
                ?.then(currentToken => {
                    if (currentToken) {
                        console.log('Client Token: ', currentToken);
                    }
                    else {
                        console.log("Không tạo được token");
                    }
                })
                ?.catch(err => {
                    console.log("Error tạo Token", err);
                });
        } else {
            console.log("Quyền gửi thông báo bị từ chối");
        }
    });
}
// requestPermission();
export const onMessageListener = () => {
    new Promise(resolve => onMessage(messaging, payload => {
        resolve(payload);
    }))
}
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
