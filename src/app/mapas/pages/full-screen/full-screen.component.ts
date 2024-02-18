import { Component, OnInit } from '@angular/core';
import * as maptilersdk from '@maptiler/sdk';


@Component({
  selector: 'app-full-screen',
  templateUrl: './full-screen.component.html',
  styles:
    `
    #mapa {
      height: 100%;
      width: 100%;
    }
    `
})
export class FullScreenComponent implements OnInit {
  constructor() { }

  ngOnInit(): void {


    const map = new maptilersdk.Map({
      container: 'mapa', // container's id or the HTML element to render the map
      style: maptilersdk.MapStyle.STREETS,
      center: [-64.24977732345958, -31.432760569968032],
      zoom: 12
    });
  }
}
