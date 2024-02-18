import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import * as maptilersdk from '@maptiler/sdk';


@Component({
  selector: 'app-zoom-range',
  templateUrl: './zoom-range.component.html',
  styles:
    `
    .mapa-container {
      height: 100%;
      width: 100%;
    }

    .row {
      background-color: white;
      border-radius: 5px;
      bottom: 50px;
      left: 50px;
      padding: 10px;
      position: fixed;
      z-index: 999;
      width: 400px;
    }
    `
})
export class ZoomRangeComponent implements AfterViewInit, OnDestroy {

  @ViewChild('mapa') divMapa!: ElementRef;
  mapa!: maptilersdk.Map;
  zoomLevel: number = 10;
  center: [number, number] = [-64.24977732345958, -31.432760569968032];

  constructor() { }

  ngOnDestroy(): void {
    this.mapa.off('zoom', () => { })
    this.mapa.off('zoomend', () => { })
    this.mapa.off('move', () => { })
  }

  ngAfterViewInit(): void {
    this.mapa = new maptilersdk.Map({
      container: this.divMapa.nativeElement,
      style: maptilersdk.MapStyle.STREETS,
      center: [-64.24977732345958, -31.432760569968032],
      zoom: this.zoomLevel,
      navigationControl: false,
      geolocateControl: false
    });

    this.mapa.on('zoom', e => {
      this.zoomLevel = this.mapa.getZoom();
    })

    this.mapa.on('zoomend', e => {
      if (this.mapa.getZoom() > 18) {
        this.mapa.zoomTo(18);
      }
    })

    this.mapa.on('move', (event) => {
      const { lng, lat } = event.target.getCenter();
      this.center = [lng, lat];
    })
  }

  zoomOut() {
    this.mapa.zoomOut();
  }

  zoomIn() {
    this.mapa.zoomIn();
  }

  zoomCambio(valor: string) {
    this.mapa.zoomTo(Number(valor))
  }



}