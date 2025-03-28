const locationInput = document.getElementById("locationInput");
const addLocationButton = document.getElementById("addLocationButton");
const locationsList = document.getElementById("locationsList");

let locationsArray = [];
let map;

addLocationButton.addEventListener("click", addLocation);

function addLocation() {
    const location = locationInput.value.trim();
    if (location !== "") {
        locationsArray.push(location);
        locationInput.value = "";
        updateLocationsList();
        updateMap(location);
    }
}

function updateLocationsList() {
    locationsList.innerHTML = "";
    locationsArray.forEach((location) => {
        const li = document.createElement("li");
        li.textContent = location;
        li.addEventListener("click", () => updateMap(location));
        locationsList.appendChild(li);
    });
}

function updateMap(location) {
    if (!map) {
        map = L.map("map").setView([0, 0], 2);
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution: "© OpenStreetMap contributors",
        }).addTo(map);
    }

    const coordinates = getCoordinatesForLocation(location);
    if (coordinates) {
        map.setView(coordinates, 6);
        L.marker(coordinates).addTo(map).bindPopup(location);
    } else {
        alert("Location not found or coordinates not available.");
    }
}

function getCoordinatesForLocation(location) {
    const locationCoordinates = {
        "philippines": [13.41, 122.56],
        "taiwan": [23.697809, 120.960518],
        "manila": [14.599512, 120.984222],
        "iloilo": [10.720150, 122.562103],
        "new york": [40.7128, -74.0060],
        "los angeles": [34.0522, -118.2437],
        "london": [51.5074, -0.1278],
        "paris": [48.8566, 2.3522],
        "tokyo": [35.6895, 139.6917],
        "beijing": [39.9042, 116.4074],
        "sydney": [-33.8688, 151.2093],
        "rio de janeiro": [-22.9068, -43.1729],
        "cape town": [-33.9249, 18.4241],
        "moscow": [55.7558, 37.6173],
        "berlin": [52.5200, 13.4050],
        "dubai": [25.276987, 55.296249],
        "mexico city": [19.4326, -99.1332],
        "mumbai": [19.0760, 72.8777],
        "jakarta": [-6.2088, 106.8456],
        "cairo": [30.0444, 31.2357],
        "istanbul": [41.0082, 28.9784],
        "rome": [41.9028, 12.4964],
        "toronto": [43.65107, -79.347015],
        "bangkok": [13.7563, 100.5018],
        "singapore": [1.3521, 103.8198],
        "athens": [37.9838, 23.7275],
    };

    return locationCoordinates[location.toLowerCase()];
}
