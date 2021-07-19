import firebase from "firebase";

var firebaseConfig = {
	apiKey: "AIzaSyB_zjgZPQqJQ8Md7KlpRlQkU_aOhOnBrzM",
	authDomain: "docs-b152d.firebaseapp.com",
	projectId: "docs-b152d",
	storageBucket: "docs-b152d.appspot.com",
	messagingSenderId: "877256938812",
	appId: "1:877256938812:web:11532dd8a3d1901bef3a39",
};

const app = firebase.apps.length
	? firebase.app()
	: firebase.initializeApp(firebaseConfig);

const db = app.firestore();

export default db;
