import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAjgFjvDz7T0WGZDNIPdfw3P_QYc82HdVE",
  authDomain: "socialsphere-2023.firebaseapp.com",
  projectId: "socialsphere-2023",
  storageBucket: "socialsphere-2023.appspot.com",
  messagingSenderId: "495426140864",
  appId: "1:495426140864:web:44cebec32f089615970b25",
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
