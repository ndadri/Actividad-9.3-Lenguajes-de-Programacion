import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Tarea } from '../models/tarea.model';

@Injectable({
  providedIn: 'root'
})
export class TareaService {
  private apiUrl = 'https://jsonplaceholder.typicode.com/todos'; // API de prueba

  // Estado local simulado para respaldo
  private tareasMemoria: Tarea[] = [
    { id: 1, titulo: 'Diseñar Arquitectura SPA', descripcion: 'Definir rutas y servicios', completada: true, prioridad: 'Alta' },
    { id: 2, titulo: 'Integrar HttpClient', descripcion: 'Conectar con API REST y RxJS', completada: false, prioridad: 'Alta' }
  ];

  constructor(private http: HttpClient) { }

  getTareas(): Observable<Tarea[]> {
    // Dispara petición HTTP real para verificar el AuthInterceptor en la pestaña Red (Network) de DevTools
    this.http.get(this.apiUrl + '?_limit=5').pipe(
      catchError(this.manejarError)
    ).subscribe({
      next: (res) => console.log('[TareaService] Petición HTTP realizada con éxito (Token inyectado por interceptor):', res),
      error: (err) => console.warn('[TareaService] Error en petición HTTP:', err)
    });

    return of(this.tareasMemoria).pipe(
      retry(1),
      catchError(this.manejarError)
    );
  }

  agregarTarea(tarea: Tarea): Observable<Tarea> {
    tarea.id = this.tareasMemoria.length + 1;
    this.tareasMemoria.push(tarea);
    return of(tarea);
  }

  eliminarTarea(id: number): Observable<boolean> {
    this.tareasMemoria = this.tareasMemoria.filter(t => t.id !== id);
    return of(true);
  }

  private manejarError(error: HttpErrorResponse) {
    console.error('Error en la comunicación HTTP:', error.message);
    return throwError(() => new Error('Error en el servicio REST. Intente más tarde.'));
  }
}

