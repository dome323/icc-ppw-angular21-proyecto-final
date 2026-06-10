import { Injectable } from '@angular/core';
import {getApp,getApps,initializeApp} from 'firebase/app';
import {addDoc,collection,getDocs,getFirestore,query,serverTimestamp,where, doc,updateDoc} from 'firebase/firestore';
import { environment } from '../../../../enviroments/environment';


export interface NuevaSolicitud {
  nombre: string;
  correo: string;
  descripcion: string;
  programadorNombre: string;
  programadorSlug: string;
  uidUsuario: string;
}

@Injectable({
  providedIn: 'root'
})
export class SolicitudesService {

  private app = getApps().length
    ? getApp()
    : initializeApp(environment.firebaseConfig);

  private db = getFirestore(this.app);

  async crearSolicitud(solicitud: NuevaSolicitud) {
    return await addDoc(
      collection(this.db, 'solicitudes'),
      {
        ...solicitud,
        estado: 'pendiente',
        fecha: serverTimestamp()
      }
    );
  }

  async getSolicitudesPorUsuario(uidUsuario: string) {

    const consulta = query(
      collection(this.db, 'solicitudes'),
      where('uidUsuario', '==', uidUsuario)
    );

    const snapshot = await getDocs(consulta);

    const solicitudes = snapshot.docs.map(documento => ({
      id: documento.id,
      ...documento.data()
    })) as any[];

    solicitudes.sort((a, b) => {
      const fechaA = a.fecha?.toMillis?.() ?? 0;
      const fechaB = b.fecha?.toMillis?.() ?? 0;

      return fechaB - fechaA;
    });

    return solicitudes;
  }

    async getSolicitudesRecibidas(programadorSlug: string) {

      const consulta = query(
        collection(this.db, 'solicitudes'),
        where(
          'programadorSlug',
          '==',
          programadorSlug
        )
      );

      const snapshot = await getDocs(consulta);

      const solicitudes = snapshot.docs.map(documento => ({
        id: documento.id,
        ...documento.data()
      })) as any[];

      solicitudes.sort((a, b) => {
        const fechaA = a.fecha?.toMillis?.() ?? 0;
        const fechaB = b.fecha?.toMillis?.() ?? 0;

        return fechaB - fechaA;
      });

      return solicitudes;
    }

    async responderSolicitud(
      solicitudId: string,
      respuesta: string
    ) {

      const referencia = doc(
        this.db,
        'solicitudes',
        solicitudId
      );

      return await updateDoc(referencia, {
        respuesta: respuesta.trim(),
        estado: 'respondida',
        fechaRespuesta: serverTimestamp()
      });
    }

}