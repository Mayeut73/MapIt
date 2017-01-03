import { Component } from '@angular/core';
import { MarkerService } from './services/marker.services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // Zoom level
  zoom: number = 10;
  // Start Position
  lat: number = 45.181837;
  lng: number = 5.721281;
  // Values
  markerName: string;
  markerLat: string;
  markerLng: string;
  markerDraggable: string;


  // Tableau de Markers binder dans l'élément sebm-google-map
  // Tableau vide car remplie par le service "MarkerService""
  markers: marker[] = [];

  constructor(private _markerService: MarkerService) {
    this.markers = this._markerService.getMarkers();
  }

  //Au click sur un marker
  clickedMarker(marker: marker, index: number) {
    console.log(`Clicked marker : ${marker.name}  at index : ${index}`);
  }

  //Au click sur la map on créer un nouveau marker que l'on ajoute au tableau markers
  mapClicked($event: any) {

    var newMarker = {
      name: 'Untitled',
      lat: $event.coords.lat,
      lng: $event.coords.lng,
      draggable: false
    }

    this.markers.push(newMarker);
  }

  //Méthode pour le drag end pour update la position du markr
  markerDragEnd(marker: any, $event: any) {
    console.log('Drag End', marker, $event);

    var updMarker = {
      name: marker.name,
      lat: parseFloat(marker.lat),
      lng: parseFloat(marker.lng),
      draggable: false
    }

    var newLat = $event.coords.lat;
    var newLng = $event.coords.lng;

    this._markerService.updateMarker(updMarker, newLat, newLng);
  }

  //Methode pour ajouter un marker avec les input
  addMarker() {
    console.log(`Location name ${this.markerName} `)
    if (this.markerDraggable == 'yes') {
      var isDraggable = true;
    } else {
      var isDraggable = false;
    }

    var newMarker = {
      name: this.markerName,
      lat: parseFloat(this.markerLat),
      lng: parseFloat(this.markerLng),
      draggable: isDraggable
    }

    this.markers.push(newMarker);
    this._markerService.addMarker(newMarker);
  }

  removeMarker(marker) {
    console.log('Removing Marker ...');
    //On boucle sur le tableau de markers
    for (let i = 0; i < this.markers.length; i++) {
      //Si on tombe sur celui qui a été clicker
      if (marker.lat == this.markers[i].lat && marker.lng == this.markers[i].lng) {
        //On l'enléve du tableau
        this.markers.splice(i , 1);
      }
    }

    this._markerService.removeMarker(marker);
  }

}

// Marker Type interface
interface marker {
  name?: string;
  lat: number;
  lng: number;
  draggable: boolean;
}
