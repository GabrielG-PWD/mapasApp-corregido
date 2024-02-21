import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import * as maptilersdk from '@maptiler/sdk';


@Component({
  selector: 'app-mini-mapa',
  templateUrl: './mini-mapa.component.html',
  styles:
    `
  div {
    width: 100%;
    height: 150px;
    margin: 0px;
  }
  `
})
export class MiniMapaComponent implements AfterViewInit {
  @Input() lngLat: [number, number] = [0, 0];
  @ViewChild('mapa') divMapa!: ElementRef

  ngAfterViewInit(): void {
    const mapa = new maptilersdk.Map({
      container: this.divMapa.nativeElement, // container's id or the HTML element to render the map
      style: maptilersdk.MapStyle.STREETS,
      center: this.lngLat,
      zoom: 15,
      interactive: false,
      geolocateControl: false,
      navigationControl: false
    });

    new maptilersdk.Marker()
      .setLngLat(this.lngLat)
      .addTo(mapa);
  }
}
