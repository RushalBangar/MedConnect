/**
 * MedConnect - Interactive Map & Proximity Routing Module
 * Uses Leaflet.js and OpenStreetMap with dynamic Light/Dark theme tile layer switching.
 */

class MedConnectMap {
    constructor(elementId = 'map') {
        this.elementId = elementId;
        this.map = null;
        this.tileLayer = null;
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

        // Initial Tile Layer setup based on active theme
        this.updateTileLayer(document.documentElement.getAttribute('data-theme') || 'dark');

        // Add User Location Marker
        this.addUserMarker();

        // Listen for Theme Change Event
        window.addEventListener('themeChanged', (e) => {
            if (e.detail && e.detail.theme) {
                this.updateTileLayer(e.detail.theme);
            }
        });
    }

    updateTileLayer(themeName) {
        if (!this.map) return;
        if (this.tileLayer) {
            this.map.removeLayer(this.tileLayer);
        }

        const tileUrl = themeName === 'dark' 
            ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
            : 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png';

        this.tileLayer = L.tileLayer(tileUrl, {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
            subdomains: 'abcd',
            maxZoom: 19
        }).addTo(this.map);
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
                html: `<div style="background: ${statusColor}; color: white; border-radius: 50%; width: 32px; height: 32px; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 15px; border: 2px solid white; box-shadow: 0 4px 10px rgba(0,0,0,0.4);">🏥</div>`,
                iconSize: [32, 32],
                iconAnchor: [16, 16]
            });

            const distanceInfo = this.calculateDistance(this.userLocation.lat, this.userLocation.lng, pharmacy.lat, pharmacy.lng);

            const popupContent = `
                <div style="font-family: sans-serif; padding: 4px;">
                    <h4 style="margin: 0 0 4px 0; font-size: 14px; color: #0f172a;">${pharmacy.name}</h4>
                    <p style="margin: 0 0 6px 0; font-size: 12px; color: #64748b;">${pharmacy.address}</p>
                    <div style="display: flex; gap: 6px; font-size: 11px; margin-bottom: 8px;">
                        <span style="background: #e2e8f0; padding: 2px 6px; border-radius: 4px; font-weight: 600; color: #1e293b;">🚗 ${distanceInfo.distanceKm} km (${distanceInfo.travelTimeMin} mins)</span>
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
        const travelTimeMin = Math.round((distanceKm / 25) * 60) || 3;

        return { distanceKm, travelTimeMin };
    }
}

window.MedConnectMap = MedConnectMap;
