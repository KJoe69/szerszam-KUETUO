import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SzerszamService, Szerszam } from './szerszam.service';

@Component({
  selector: 'app-new-szerszam',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './new.html',
  styleUrls: ['./app.css']
})
export class NewSzerszamComponent {
  ujSzerszam: Szerszam = {
    nev: '',
    tipus: '',
    ar: 0,
    keszleten: 0
  };

  hibak: { [key: string]: string } = {};
  errorMessage = '';

  constructor(private szerszamService: SzerszamService) {}

  validateForm(): boolean {
    this.hibak = {};

    if (!this.ujSzerszam.nev.trim()) {
      this.hibak['nev'] = 'A név megadása kötelező!';
    }

    if (!this.ujSzerszam.tipus.trim()) {
      this.hibak['tipus'] = 'A típus megadása kötelező!';
    }

    if (isNaN(this.ujSzerszam.ar) || this.ujSzerszam.ar <= 0) {
      this.hibak['ar'] = 'Az árnak pozitív számnak kell lennie!';
    }

    if (!Number.isInteger(this.ujSzerszam.keszleten) || this.ujSzerszam.keszleten < 0) {
      this.hibak['keszleten'] = 'A készletnek nemnegatív egész számnak kell lennie!';
    }

    return Object.keys(this.hibak).length === 0;
  }

  async addSzerszam(): Promise<void> {
    this.errorMessage = '';

    if (!this.validateForm()) {
      return;
    }

    const exists = await this.szerszamService.existsByName(this.ujSzerszam.nev.trim());
    if (exists) {
      this.errorMessage = `A(z) "${this.ujSzerszam.nev}" nevű szerszám már létezik a nyilvántartásban!`;
      return;
    }

    this.szerszamService.addSzerszam({ ...this.ujSzerszam }).subscribe({
      next: (uj) => {
        this.ujSzerszam = { nev: '', tipus: '', ar: 0, keszleten: 0 };
        this.errorMessage = '';
      },
      error: (err) => {
        console.error('Hiba a mentéskor', err);
        this.errorMessage = 'Hiba történt a mentés során.';
      }
    });
  }
}
