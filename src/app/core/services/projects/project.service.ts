import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import {getFirestore,collection,addDoc,getDocs} from 'firebase/firestore';

import { environment } from '../../../../enviroments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private app = initializeApp(environment.firebaseConfig);
  private db = getFirestore(this.app);

async getProjects() {

  console.log('LEYENDO FIRESTORE...');

  const snapshot = await getDocs(
    collection(this.db, 'proyectos')
  );

  console.log('DOCUMENTOS:', snapshot.docs.length);

  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
}

  async addProject(project: any) {

    return addDoc(
      collection(this.db, 'proyectos'),
      project
    );
  }

  
}