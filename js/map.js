/**
 * MedConnect - Interactive Map & Proximity Routing Module
 * Uses Leaflet.js and OpenStreetMap for real-time map rendering and distance sorting.
 */

class MedConnectMap {
    constructor(elementId = 'map') {
        this.elementId = elementId;
        this.map = null;
        this.markers = {};
        this.userLocation = { lat: 20.0000, lng: 73.7800, label: "Current Location (Nashik City)" };
        this.init();
    }

    init() {
        const container = document.getElementById(this.elementId);
        if (!container) return;

        // Initialize Leaflet Map
        this.map = L.map(this.elementId, {
            center: [this.userLocation.lat, this.userLocation.lng],
            zoom: 13,
            zoomControl: true
        });

        // Add Dark Theme Tile Layer from CartoDB or OpenStreetMap
        L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
            subdomains: 'abcd',
            maxZoom: 19
        }).addTo(this.map);

        // Add User Location Marker
        this.addUserMarker();
    }

    addUserMarker() {
        if (!this.map) return;

        const userIcon = L.divIcon({
            className: 'user-location-marker',
            html: `<div style="background-color: #0284c7; width: 16px; height: 16px; border-radius: 50%; border: 3px solid white; box-shadow: 0 0 12px #0284c7;"></div>`,
            iconSize: [20, 20],
            iconAnchor: [10, 10]
        });

        L.marker([this.userLocation.lat, this.userLocation.lng], { icon: userIcon })
            .addTo(this.map)
            .bindPopup(`<b>📍 ${this.userLocation.label}</b>`);
    }

    renderPharmacyMarkers(pharmacies, activeSearchTerm = '') {
        if (!this.map) return;

        // Clear existing pharmacy markers
        Object.values(this.markers).forEach(marker => this.map.removeLayer(marker));
        this.markers = {};

        pharmacies.forEach(pharmacy => {
            if (!pharmacy.lat || !pharmacy.lng) return;

            // Determine stock status for icon color
            let statusColor = '#10b981'; // Green (default)
            let statusText = 'In Stock';

            if (activeSearchTerm) {
                const matchItem = pharmacy.inventory.find(i => 
                    i.name.toLowerCase().includes(activeSearchTerm.toLowerCase()) || 
                    i.category.toLowerCase().includes(activeSearchTerm.toLowerCase())
                );

                if (!matchItem || !matchItem.inStock) {
                    statusColor = '#e11d48'; // Red
                    statusText = 'Out of Stock';
                } else if (matchItem.quantity > 0 && matchItem.quantity <= 5) {
                    statusColor = '#f59e0b'; // Yellow
                    statusText = 'Low Stock';
                }
            }

            const customIcon = L.divIcon({
                className: 'pharmacy-map-pin',
                html: `<div style="background: ${statusColor}; color: white; border-radius: 50%; width: 30px; height: 30px; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 14px; border: 2px solid white; box-shadow: 0 4px 10px rgba(0,0,0,0.4);">🏥</div>`,
                iconSize: [30, 30],
                iconAnchor: [15, 15]
            });

            const distanceInfo = this.calculateDistance(this.userLocation.lat, this.userLocation.lng, pharmacy.lat, pharmacy.lng);

            const popupContent = `
                <div style="font-family: sans-serif; padding: 4px;">
                    <h4 style="margin: 0 0 4px 0; font-size: 14px; color: #0f172a;">${pharmacy.name}</h4>
                    <p style="margin: 0 0 6px 0; font-size: 12px; color: #64748b;">${pharmacy.address}</p>
                    <div style="display: flex; gap: 6px; font-size: 11px; margin-bottom: 8px;">
                        <span style="background: #e2e8f0; padding: 2px 6px; border-radius: 4px; font-weight: 600;">🚗 ${distanceInfo.distanceKm} km (${distanceInfo.travelTimeMin} mins)</span>
                        <span style="background: ${statusColor}22; color: ${statusColor}; padding: 2px 6px; border-radius: 4px; font-weight: 700;">${statusText}</span>
                    </div>
                    <a href="tel:${pharmacy.phone}" style="display: inline-block; background: #0284c7; color: white; text-decoration: none; padding: 4px 10px; border-radius: 4px; font-size: 11px; font-weight: 600;">📞 Call Store</a>
                </div>
            `;

            const marker = L.marker([pharmacy.lat, pharmacy.lng], { icon: customIcon })
                .addTo(this.map)
                .bindPopup(popupContent);

            this.markers[pharmacy.id] = marker;
        });
    }

    focusPharmacy(pharmacyId, lat, lng) {
        if (!this.map) return;
        this.map.setView([lat, lng], 15, { animate: true });
        if (this.markers[pharmacyId]) {
            this.markers[pharmacyId].openPopup();
        }
    }

    // Haversine formula to compute travel distance & time
    calculateDistance(lat1, lon1, lat2, lon2) {
        const R = 6371; // Earth's radius in KM
        const dLat = (lat2 - lat1) * Math.PI / 180;
        const dLon = (lon2 - lon1) * Math.PI / 180;
        const a = 
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
        
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const distanceKm = (R * c).toFixed(1);
        
        // Estimated city driving travel time (assuming ~25 km/h average city speed in emergency)
        const travelTimeMin = Math.round((distanceKm / 25) * 60) || 3;

        return { distanceKm, travelTimeMin };
    }
}

window.MedConnectMap = MedConnectMap;
