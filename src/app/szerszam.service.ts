import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, firstValueFrom } from 'rxjs';

export interface Szerszam {
  id?: number;
  nev: string;
  tipus: string;
  ar: number;
  keszleten: number;
}

@Injectable({
  providedIn: 'root'
})
export class SzerszamService {
  private apiUrl = 'http://localhost:3000/szerszamok';

  constructor(private http: HttpClient) {}

  getSzerszamok(): Observable<Szerszam[]> {
    return this.http.get<Szerszam[]>(this.apiUrl);
  }

  async existsByName(nev: string): Promise<boolean> {
    const szerszamok = await firstValueFrom(
      this.http.get<Szerszam[]>(`${this.apiUrl}?nev=${nev}`)
    );
    return szerszamok.length > 0;
  }

  addSzerszam(szerszam: Szerszam): Observable<Szerszam> {
    return this.http.post<Szerszam>(this.apiUrl, szerszam);
  }

  updateSzerszam(id: number, changes: Partial<Szerszam>): Observable<Szerszam> {
    return this.http.patch<Szerszam>(`${this.apiUrl}/${id}`, changes);
  }
}
