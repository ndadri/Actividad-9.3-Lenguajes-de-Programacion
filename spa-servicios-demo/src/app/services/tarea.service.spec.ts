import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { firstValueFrom } from 'rxjs';
import { TareaService } from './tarea.service';
import { Tarea } from '../models/tarea.model';

describe('TareaService', () => {
  let service: TareaService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TareaService,
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });
    service = TestBed.inject(TareaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return initial tasks', async () => {
    const tareas = await firstValueFrom(service.getTareas());
    expect(tareas.length).toBeGreaterThan(0);
    expect(tareas[0].titulo).toBe('Diseñar Arquitectura SPA');
  });

  it('should add a new task', async () => {
    const nuevaTarea: Tarea = {
      titulo: 'Nueva tarea de prueba',
      descripcion: 'Probando servicio',
      completada: false,
      prioridad: 'Media'
    };

    const tarea = await firstValueFrom(service.agregarTarea(nuevaTarea));
    expect(tarea.id).toBeDefined();
    expect(tarea.titulo).toBe('Nueva tarea de prueba');
  });

  it('should delete a task by id', async () => {
    const result = await firstValueFrom(service.eliminarTarea(1));
    expect(result).toBe(true);
    const tareas = await firstValueFrom(service.getTareas());
    expect(tareas.find(t => t.id === 1)).toBeUndefined();
  });
});
