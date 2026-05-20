import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SzerszamService, Szerszam } from './szerszam.service';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'app-lista-szerszam',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './lista.html',
  styleUrls: ['./app.css']
})
export class ListaSzerszamComponent implements OnInit {
  private szerszamokSubject = new BehaviorSubject<Szerszam[]>([]);
  szerszamok$: Observable<Szerszam[]> = this.szerszamokSubject.asObservable();

  constructor(private szerszamService: SzerszamService) {}

  ngOnInit(): void {
    this.loadSzerszamok();
  }

  loadSzerszamok(): void {
    this.szerszamService.getSzerszamok().subscribe({
      next: (data) => {
        this.szerszamokSubject.next(data);
      },
      error: (err) => {
        console.error('Hiba a betöltéskor', err);
      }
    });
  }

  trackByFn(index: number, item: Szerszam): number {
    return item.id || index;
  }

  increaseQuantity(sz: Szerszam): void {
    if (sz.id == null) return;
    const updatedCount = sz.keszleten + 1;
    
    this.szerszamService.updateSzerszam(sz.id, { keszleten: updatedCount }).subscribe({
      next: () => {
        this.loadSzerszamok();
      },
      error: (err) => {
        console.error('Hiba a készlet növelésekor', err);
        alert('Hiba történt a készlet növelése közben!');
      }
    });
  }

  decreaseQuantity(sz: Szerszam): void {
    if (sz.keszleten === 0 || sz.id == null) {
      return;
    }
    const updatedCount = sz.keszleten - 1;
    
    this.szerszamService.updateSzerszam(sz.id, { keszleten: updatedCount }).subscribe({
      next: () => {
        this.loadSzerszamok();
      },
      error: (err) => {
        console.error('Hiba a készlet csökkentésekor', err);
        alert('Hiba történt a készlet csökkentése közben!');
      }
    });
  }
}