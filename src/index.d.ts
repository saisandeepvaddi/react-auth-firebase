/**
 * Firebase Configuration object.
 * Check https://firebase.google.com/docs/web/setup?authuser=0#config-object
 *
 * @interface IFirebaseConfig
 */
export interface IFirebaseConfig {
  apiKey?: string;
  authDomain?: string;
  databaseUrl?: string;
  projectId?: string;
  storageBucket?: string;
  messagingSenderId?: string;
  appId?: string;
  measurementId?: string;
}
