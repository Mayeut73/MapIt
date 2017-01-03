//Class qui gére l'enregistrement des markers dans le local storage
export class Init {
    load() {
        if (localStorage.getItem('markers') === null || localStorage.getItem('markers') === undefined) {
            console.log('No markers found');

            var markers = [{
                name: 'Econocom',
                lat: 45.158412,
                lng: 5.737913,
                draggable: true
            },
            {
                name: 'EPSI',
                lat: 45.188098,
                lng: 5.777946,
                draggable: true
            },
            {
                name: 'Sequoiasoft',
                lat: 45.555340,
                lng: 5.973933,
                draggable: false
            }]

            localStorage.setItem('markers', JSON.stringify(markers));

        } else {
            console.log('Loading markers ...');
        }
    }
}