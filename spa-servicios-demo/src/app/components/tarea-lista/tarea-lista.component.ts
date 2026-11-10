import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Tarea } from '../../models/tarea.model';
import { TareaService } from '../../services/tarea.service';

@Component({
  selector: 'app-tarea-lista',
  templateUrl: './tarea-lista.component.html',
  styleUrls: ['./tarea-lista.component.css'],
  standalone: false
})
export class TareaListaComponent implements OnInit {
  tareas$!: Observable<Tarea[]>;

  // Formulario rápido para nueva tarea
  nuevoTitulo = '';
  nuevaDescripcion = '';
  nuevaPrioridad: 'Alta' | 'Media' | 'Baja' = 'Media';

  constructor(private tareaService: TareaService) { }

  ngOnInit(): void {
    this.cargarTareas();
  }

  cargarTareas(): void {
    this.tareas$ = this.tareaService.getTareas();
  }

  agregar(): void {
    if (!this.nuevoTitulo.trim()) return;

    const nuevaTarea: Tarea = {
      titulo: this.nuevoTitulo.trim(),
      descripcion: this.nuevaDescripcion.trim() || 'Sin descripción adicional',
      completada: false,
      prioridad: this.nuevaPrioridad
    };

    this.tareaService.agregarTarea(nuevaTarea).subscribe(() => {
      this.nuevoTitulo = '';
      this.nuevaDescripcion = '';
      this.nuevaPrioridad = 'Media';
      this.cargarTareas();
    });
  }

  eliminar(id: number | undefined): void {
    if (id) {
      this.tareaService.eliminarTarea(id).subscribe(() => {
        this.cargarTareas();
      });
    }
  }
}
