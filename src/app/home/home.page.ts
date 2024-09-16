import Map from '@arcgis/core/Map';
import MapView from '@arcgis/core/views/MapView';
import { Component, OnInit } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';
import Graphic from '@arcgis/core/Graphic';
import Point from '@arcgis/core/geometry/Point'; // Impor Point


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  private latitude: number | any;   // Inisialisasi dengan nilai default
  private longitude: number | any;  // Inisialisasi dengan nilai default

  constructor() {}

  public async ngOnInit() {
    //Mengambil posisi sekarang
    const position = await Geolocation.getCurrentPosition();
    this.latitude = position.coords.latitude;
    this.longitude = position.coords.longitude;

    // Inisialisasi dengan nilai default lokasi
    //this.longitude = 112.5005167;
    //this.latitude = -7.4545375;

    const map = new Map({
      basemap: 'topo-vector',
    });

    const view = new MapView({
      container: 'container',
      map: map,
      zoom: 14,
      center: [this.longitude, this.latitude],
    });

     // Gunakan class Point dari ArcGIS API
     const point = new Point({
      longitude: this.longitude,
      latitude: this.latitude
    });

    const markerSymbol = {
      type: "simple-marker",
      color: [226, 119, 40], // Oranye
      outline: {
        color: [255, 255, 255], // Putih
        width: 2
      }
    };

    const pointGraphic = new Graphic({
      geometry: point,  // Menggunakan class Point sebagai geometri
      symbol: markerSymbol
    });

    // Tambahkan marker ke peta
    view.graphics.add(pointGraphic);
  }
}
