import { Injectable } from '@angular/core';
import { Init } from '../init-markers';

@Injectable()
export class MarkerService extends Init{
    // Vue que l'on étend la classe init, on l'initialise avec super() 
    // puis on utilise la méthode load()
    constructor(){
        super();
        console.log('MarkeService Initialized ...');
        this.load();
    }

    // Méthode qui va récupérer les markers dans le local storage
    // Vue que ce sont des string il faut les parser pour récupérer des objet JSON
    getMarkers(){
        var markers = JSON.parse(localStorage.getItem('markers'));
        return markers;
    }

    addMarker(newMarker){
        //Find markers
        var markers = JSON.parse(localStorage.getItem('markers'));
        // Push to array
        markers.push(newMarker);
        //Set localStorage markers again
        localStorage.setItem('markers', JSON.stringify(markers));
    }

    updateMarker(udpMarker, newLat, newLng){
        //Find markers
        var markers = JSON.parse(localStorage.getItem('markers'));
        for(let i=0; i< markers.length; i++){
            if(udpMarker.lat == markers[i].lat && udpMarker.lng == markers[i].lng){
                markers[i].lat = newLat;
                markers[i].lng = newLng;
            }
        }

        //Set localStorage markers again
        localStorage.setItem('markers', JSON.stringify(markers));
    }

    removeMarker(markerToDelete){
        var markers = JSON.parse(localStorage.getItem('markers'));
        for(let i=0; i< markers.length; i++){
            if(markerToDelete.lat == markers[i].lat && markerToDelete.lng == markers[i].lng){
                 markers.splice(i , 1);
            }
        }

             //Set localStorage markers again
        localStorage.setItem('markers', JSON.stringify(markers));
    }
}