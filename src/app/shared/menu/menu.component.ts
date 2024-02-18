import { Component } from '@angular/core';
import { MenuItem } from '../interfaces/menu-item.interface.';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styles: ``
})
export class MenuComponent {
  public menuItems: MenuItem[] = [
    { path: '/mapas/full-screen', name: 'Full Screen' },
    { path: '/mapas/zoom-range', name: 'Zoom Range' },
    { path: '/mapas/marcadores', name: 'Marcadores' },
    { path: '/mapas/propiedades', name: 'Propiedades' }
  ]
}
