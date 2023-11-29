// default map layerY
function plotMap() {
    let map = L.map('mapa', {
        layers: MQ.mapLayer(),
        center: [-23.5475000, -46.6361100],
        zoom: 11
    });
}

function plotOptionsSelectBox() {

    fetch("http://localhost:8080/enderecos/")
        .then(response => response.json())
        .then(data => {
            if (data.length > 0) {
                //console.log(data);
                for (let index = 0; index < data.length; index++) {

                    select1.innerHTML += `
                    <option value="${data[index].rua}">${data[index].numero}, ${data[index].rua}</option>`;

                    select2.innerHTML += `
                    <option value="${data[index].rua}">${data[index].numero}, ${data[index].rua}</option>`;

                }
            } else {
                console.error('Sem endereços cadastrados');
            }
        })
        .catch(error => {
            console.error('Erro na solicitação:', error);
        });

}

function getLongAndLat() {
    const firstAdress = document.getElementById(`select1`);
    const secondAdress = document.getElementById(`select2`);
    var adress = [firstAdress.value, secondAdress.value];
    const fetchPromises = [];

    for (let index = 0; index < adress.length; index++) {
        const nominatimURL = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(adress[index])}`;

        const fetchPromise = fetch(nominatimURL)
            .then(response => response.json())
            .then(data => {
                if (data.length > 0) {
                    const latitude = data[0].lat;
                    const longitude = data[0].lon;
                    return {
                        end: adress[index],
                        lat: latitude,
                        lon: longitude
                    };
                } else {
                    console.error('Endereço não encontrado ou erro na solicitação.');
                    return null;
                }
            })
            .catch(error => {
                console.error('Erro na solicitação:', error);
                return null;
            });

        fetchPromises.push(fetchPromise);
    }

    Promise.all(fetchPromises)
        .then(results => {
            console.log(results);
            if (results[0].end == results[1].end) {
                alert(`Endereços iguais`)
            } else {
                runDirection(results);
            }
        })
        .catch(error => {
            console.error('Erro ao buscar coordenadas:', error);
        });
}

function runDirection(arr) {

    map.remove();

    map = L.map('mapa', {
        layers: MQ.mapLayer(),
        center: [-23.5475000, -46.6361100],
        zoom: 12
    });

    var dir = MQ.routing.directions();

    dir.route({
        locations: [
            { latLng: { lat: arr[0].lat, lng: arr[0].lon } },
            { latLng: { lat: arr[1].lat, lng: arr[1].lon } }
        ]
    });


    CustomRouteLayer = MQ.Routing.RouteLayer.extend({
        createStartMarker: (location) => {
            var custom_icon;
            var marker;

            custom_icon = L.icon({
                iconUrl: 'img/blue.png',
                iconSize: [20, 29],
                iconAnchor: [10, 29],
                popupAnchor: [0, -29]
            });

            marker = L.marker(location.latLng, { icon: custom_icon }).addTo(map);

            return marker;
        },

        createEndMarker: (location) => {
            var custom_icon;
            var marker;

            custom_icon = L.icon({
                iconUrl: 'img/red.png',
                iconSize: [20, 29],
                iconAnchor: [10, 29],
                popupAnchor: [0, -29]
            });

            marker = L.marker(location.latLng, { icon: custom_icon }).addTo(map);

            return marker;
        }
    });

    map.addLayer(new CustomRouteLayer({
        directions: dir,
        fitBounds: true
    }));
}


function enviarRota(data) {

    map.remove();

    var start = data[0].lat;
    var end = data[0].lon;

    console.log(rotas[0]);

    console.log("START = " + start);
    console.log("END = " + end);
    runDirection(start, end);

    document.getElementById("select1").reset();
    document.getElementById("select2").reset();
}

export default {
    maptiler: {
        url:
            "https://api.maptiler.com/maps/basic-v2/256/{z}/{x}/{y}.png?key=c3P54xf1ln4kPtpVWh4d",
        attribution:
            '&copy; <a href="https://www.maptiler.com/">MapTiler</a> &copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
    },
};

// window.onload = () => {
//     plotOptionsSelectBox();
// };