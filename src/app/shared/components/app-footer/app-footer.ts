import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslocoModule } from '@ngneat/transloco';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    TranslocoModule
  ],
  templateUrl: './app-footer.html',
  styleUrl: './app-footer.css'
})
export class FooterComponent {}