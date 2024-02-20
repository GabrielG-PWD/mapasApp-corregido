import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import * as maptilersdk from '@maptiler/sdk';

interface MarcadorColor {
  color: string;
  marcador?: maptilersdk.Marker;
  centro?: [number, number];
}

@Component({
  selector: 'app-marcadores',
  templateUrl: './marcadores.component.html',
  styles:
    `
  .mapa-container {
    height: 100%;
    width: 100%;
  }

  .list-group {
    position: fixed;
    top: 20px;
    right: 20px;
    z-index: 99;
  }

  li {
    cursor: pointer;
  }
  `


})
export class MarcadoresComponent implements AfterViewInit {

  @ViewChild('mapa') divMapa!: ElementRef;
  mapa!: maptilersdk.Map;
  zoomLevel: number = 15;
  center: [number, number] = [-64.24977732345958, -31.432760569968032];
  marcadores: MarcadorColor[] = [];

  ngAfterViewInit(): void {
    this.mapa = new maptilersdk.Map({
      container: this.divMapa.nativeElement,
      style: maptilersdk.MapStyle.STREETS,
      center: [-64.24977732345958, -31.432760569968032],
      zoom: this.zoomLevel,
      navigationControl: false,
      geolocateControl: false
    });

    this.leerLocalStorage();
  }


  agregarMarcador() {
    const color = `#${crypto.getRandomValues(new Uint32Array(1))[0].toString(16).padStart(8, '0').slice(-6)}`

    const nuevoMarcador = new maptilersdk.Marker({
      draggable: true,
      color
    })
      .setLngLat(this.center)
      .addTo(this.mapa);

    this.marcadores.push({
      color,
      marcador: nuevoMarcador
    });

    this.guardarMarcadoresLocalStorage()
    nuevoMarcador.on('dragend', () => this.guardarMarcadoresLocalStorage())
  }


  irMarcador(marcador: maptilersdk.Marker) {
    this.mapa.flyTo({
      center: marcador.getLngLat()
    })
  }


  guardarMarcadoresLocalStorage() {
    const lngLatArr: MarcadorColor[] = [];

    this.marcadores.forEach(m => {
      const color = m.color;
      const { lng, lat } = m.marcador!.getLngLat();

      lngLatArr.push({
        color: color,
        centro: [lng, lat]
      })
    })

    localStorage.setItem('marcadores', JSON.stringify(lngLatArr))
  }


  leerLocalStorage() {
    if (!localStorage.getItem('marcadores')) {
      return;
    }

    const lngLatArr: MarcadorColor[] = JSON.parse(localStorage.getItem('marcadores')!);

    lngLatArr.forEach(m => {
      const newMarker = new maptilersdk.Marker({
        color: m.color,
        draggable: true
      }).setLngLat(m.centro!)
        .addTo(this.mapa);

      this.marcadores.push({
        marcador: newMarker,
        color: m.color
      })

      newMarker.on('dragend', () => this.guardarMarcadoresLocalStorage())

    })
  }

  borrarMarcador(pos: number) {
    this.marcadores[pos].marcador?.remove();
    this.marcadores.splice(pos, 1);
    this.guardarMarcadoresLocalStorage();
  }

}
