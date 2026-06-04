import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FooterComponent } from '../../../../shared/components/app-footer/app-footer';
import { HeaderComponent } from "../../../../shared/components/app-header/app-header";

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [RouterModule, FooterComponent, HeaderComponent], 
  templateUrl: './home-page.html',
  styleUrl: './home-page.css'
})
export class HomePageComponent { 
  
}