import { initializeApp, FirebaseApp } from 'firebase/app';
import { Injectable } from '@nestjs/common';

const firebaseConfig = {
  apiKey: 'AIzaSyDvtbNEePwtqoPjO5KZco73EUWEpNrHxeE',
  authDomain: 'stately-sentry-367018.firebaseapp.com',
  projectId: 'stately-sentry-367018',
  storageBucket: 'stately-sentry-367018.appspot.com',
  messagingSenderId: '829722910637',
  appId: '1:829722910637:web:37ec345673939ae9e2cb24',
  measurementId: 'G-67BV7XKF6C',
};

@Injectable()
export class LocalFirebaseService {
  private readonly firebase: FirebaseApp;

  constructor() {
    this.firebase = initializeApp(firebaseConfig);
  }

  getFirebase() {
    return this.firebase;
  }
}
