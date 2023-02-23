import React from "react";
import { createRoot } from 'react-dom/client';

import App from './App';

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: import.meta.env.VITE_APP_KEY,
	authDomain: import.meta.env.VITE_AUTH_DMAIN,
	projectId: import.meta.env.VITE_PROJECT_ID,
	storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
	messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
	appId: import.meta.env.VITE_APP_ID,
	measurementId: "G-H6RNDNEYBV"
};
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app)

const container = document.getElementById('root');
const root = createRoot(container);

root.render(<App />);




