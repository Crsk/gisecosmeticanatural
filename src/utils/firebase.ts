import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getDatabase } from "firebase/database"

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIRE_API_KEY,
  authDomain: import.meta.env.VITE_FIRE_AUTH_DOM,
  databaseURL: import.meta.env.VITE_FIRE_DB_URL,
  projectId: import.meta.env.VITE_FIRE_PRJ_ID,
  storageBucket: import.meta.env.VITE_FIRE_STG_BKT,
  messagingSenderId: import.meta.env.VITE_FIRE_MSG_ID,
  appId: import.meta.env.VITE_FIRE_APP_ID
}

export const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const database = getDatabase(app)