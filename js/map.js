/**
 * MedConnect - Interactive Map & Proximity Routing Module
 * Matching screen.png Layout with Heatmap Toggle Mode and Travel Time Pin Markers.
 */

class MedConnectMap {
    constructor(elementId = 'map') {
        this.elementId = elementId;
        this.map = null;
        this.tileLayer = null;
        this.heatmapLayerGroup = null;
        this.isHeatmapActive = true;
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
            zoomControl: false
        });

        // Add Zoom Control to Bottom Right (matching screen.png)
        L.control.zoom({ position: 'bottomright' }).addTo(this.map);

        // Initial Tile Layer setup based on active theme
        this.updateTileLayer(document.documentElement.getAttribute('data-theme') || 'dark');

        // Heatmap Layer Group
        this.heatmapLayerGroup = L.layerGroup().addTo(this.map);

        // Add User Location Marker
        this.addUserMarker();

        // Listen for Theme Change Event
        window.addEventListener('themeChanged', (e) => {
            if (e.detail && e.detail.theme) {
                this.updateTileLayer(e.detail.theme);
            }
        });

        // Heatmap Toggle Switch Listener
        const heatmapToggle = document.getElementById('heatmap-toggle');
        if (heatmapToggle) {
            heatmapToggle.checked = this.isHeatmapActive;
            heatmapToggle.addEventListener('change', (e) => {
                this.toggleHeatmap(e.target.checked);
            });
        }
    }

    toggleHeatmap(active) {
        this.isHeatmapActive = active;
        if (!this.heatmapLayerGroup) return;

        if (active) {
            this.heatmapLayerGroup.addTo(this.map);
        } else {
            this.map.removeLayer(this.heatmapLayerGroup);
        }
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
            attribution: '&copy; OpenStreetMap &copy; CARTO',
            subdomains: 'abcd',
            maxZoom: 19
        }).addTo(this.map);
    }

    addUserMarker() {
        if (!this.map) return;

        const userIcon = L.divIcon({
            className: 'user-location-marker',
            html: `<div style="background-color: #10b981; width: 16px; height: 16px; border-radius: 50%; border: 3px solid white; box-shadow: 0 0 12px #10b981;"></div>`,
            iconSize: [20, 20],
            iconAnchor: [10, 10]
        });

        L.marker([this.userLocation.lat, this.userLocation.lng], { icon: userIcon })
            .addTo(this.map)
            .bindPopup(`<b>📍 ${this.userLocation.label}</b>`);
    }

    renderPharmacyMarkers(pharmacies, activeSearchTerm = '') {
        if (!this.map) return;
        const i18n = window.i18n;

        // Clear existing markers & heatmap circles
        Object.values(this.markers).forEach(marker => this.map.removeLayer(marker));
        this.markers = {};

        if (this.heatmapLayerGroup) {
            this.heatmapLayerGroup.clearLayers();
        }

        pharmacies.forEach(pharmacy => {
            if (!pharmacy.lat || !pharmacy.lng) return;

            const distanceInfo = this.calculateDistance(this.userLocation.lat, this.userLocation.lng, pharmacy.lat, pharmacy.lng);

            // Create Heatmap Availability Radial Circles (Matching screen.png hotspot)
            if (this.heatmapLayerGroup) {
                const heatCircle1 = L.circle([pharmacy.lat, pharmacy.lng], {
                    radius: 800,
                    color: '#10b981',
                    fillColor: '#10b981',
                    fillOpacity: 0.15,
                    stroke: false
                });
                const heatCircle2 = L.circle([pharmacy.lat, pharmacy.lng], {
                    radius: 400,
                    color: '#f59e0b',
                    fillColor: '#f59e0b',
                    fillOpacity: 0.25,
                    stroke: false
                });
                this.heatmapLayerGroup.addLayer(heatCircle1);
                this.heatmapLayerGroup.addLayer(heatCircle2);
            }

            // Travel Time Pin Marker (Matching screen.png badges e.g. 🏃 17 min)
            const travelBadge = `🏃 ${i18n.toDevanagari(distanceInfo.travelTimeMin)} ${i18n.t('mins')}`;

            const customIcon = L.divIcon({
                className: 'pharmacy-map-badge-pin',
                html: `
                    <div style="display:flex; flex-direction:column; align-items:center;">
                        <div style="background: #111c21; color: white; border: 1px solid #10b981; border-radius: 6px; padding: 2px 8px; font-size: 11px; font-weight: 700; white-space: nowrap; box-shadow: 0 4px 10px rgba(0,0,0,0.5);">
                            ${travelBadge}
                        </div>
                        <div style="background: #10b981; width: 12px; height: 12px; border-radius: 50%; border: 2px solid white; margin-top: -3px;"></div>
                    </div>
                `,
                iconSize: [60, 30],
                iconAnchor: [30, 28]
            });

            const pTrans = i18n.translatePharmacy(pharmacy);
            const popupContent = `
                <div style="font-family: sans-serif; padding: 4px;">
                    <h4 style="margin: 0 0 4px 0; font-size: 14px; color: #0f172a;">${pTrans.name}</h4>
                    <p style="margin: 0 0 6px 0; font-size: 12px; color: #64748b;">${pTrans.address}</p>
                    <div style="display: flex; gap: 6px; font-size: 11px; margin-bottom: 8px;">
                        <span style="background: #e2e8f0; padding: 2px 6px; border-radius: 4px; font-weight: 600; color: #1e293b;">🚗 ${i18n.toDevanagari(distanceInfo.distanceKm)} ${i18n.t('km')} (${i18n.toDevanagari(distanceInfo.travelTimeMin)} ${i18n.t('mins')})</span>
                    </div>
                    <a href="tel:${pharmacy.phone}" style="display: inline-block; background: #10b981; color: #042f2e; text-decoration: none; padding: 4px 10px; border-radius: 4px; font-size: 11px; font-weight: 700;">${i18n.t('call_store')}</a>
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
        const R = 6371;
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
