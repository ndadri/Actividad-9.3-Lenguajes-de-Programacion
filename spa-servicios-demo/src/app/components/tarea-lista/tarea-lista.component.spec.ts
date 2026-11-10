import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { firstValueFrom } from 'rxjs';
import { TareaListaComponent } from './tarea-lista.component';
import { TareaService } from '../../services/tarea.service';

describe('TareaListaComponent', () => {
  let component: TareaListaComponent;
  let fixture: ComponentFixture<TareaListaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TareaListaComponent],
      providers: [
        TareaService,
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TareaListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load tasks in tareas$ observable', async () => {
    const tareas = await firstValueFrom(component.tareas$);
    expect(tareas.length).toBeGreaterThan(0);
  });

  it('should render the tasks table and title', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h2')?.textContent).toContain('Lista de Tareas');
    const rows = compiled.querySelectorAll('tbody tr');
    expect(rows.length).toBeGreaterThan(0);
  });
});
