import firebase from 'firebase/app'
import 'firebase/database'


var config = {
	apiKey: "AIzaSyCObn5egSyRFp4d68zJTfZQl5eDmbgAzaM",
	authDomain: "carry-me-9023d.firebaseapp.com",
	databaseURL: "https://carry-me-9023d.firebaseio.com",
	projectId: "carry-me-9023d",
	storageBucket: "carry-me-9023d.appspot.com",
	messagingSenderId: "688692808096"
};

firebase.initializeApp(config);

const database = firebase.database()

export default database;