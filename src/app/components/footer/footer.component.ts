import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

// ─── Footer ───────────────────────────────────────────────────────────────────
@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
})
export class FooterComponent {
  anio = new Date().getFullYear();
}
