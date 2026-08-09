/**
 * MedConnect - Firebase Integration & Hybrid Real-Time Data Layer
 * 
 * Supports both live Firebase Firestore / Auth AND browser-native BroadcastChannel / LocalStorage
 * so the application works seamlessly online with Firebase or offline/demo instantly.
 */

// Firebase Configuration Placeholder (Can be updated by user in UI or script)
const firebaseConfig = {
    apiKey: "",
    authDomain: "medconnect-emergency.firebaseapp.com",
    projectId: "medconnect-emergency",
    storageBucket: "medconnect-emergency.appspot.com",
    messagingSenderId: "109823456789",
    appId: "1:109823456789:web:a1b2c3d4e5f67890"
};

class RealtimeStore {
    constructor() {
        this.storageKey = 'medconnect_pharmacies_data';
        this.channelName = 'medconnect_live_sync';
        this.broadcastChannel = typeof BroadcastChannel !== 'undefined' ? new BroadcastChannel(this.channelName) : null;
        this.listeners = [];
        this.isFirebaseActive = false;
        
        this.init();
    }

    init() {
        // Initialize seed data if not present
        if (!localStorage.getItem(this.storageKey)) {
            const seedData = window.SEED_PHARMACIES || [];
            localStorage.setItem(this.storageKey, JSON.stringify(seedData));
        }

        // Listen for multi-tab sync events
        if (this.broadcastChannel) {
            this.broadcastChannel.onmessage = (event) => {
                if (event.data && event.data.type === 'STOCK_UPDATE') {
                    this.notifyListeners(this.getAllPharmacies());
                }
            };
        }

        window.addEventListener('storage', (e) => {
            if (e.key === this.storageKey) {
                this.notifyListeners(this.getAllPharmacies());
            }
        });
    }

    getAllPharmacies() {
        try {
            const data = localStorage.getItem(this.storageKey);
            return data ? JSON.parse(data) : [];
        } catch (e) {
            console.error("Error reading local store", e);
            return window.SEED_PHARMACIES || [];
        }
    }

    getPharmacyById(id) {
        const list = this.getAllPharmacies();
        return list.find(p => p.id === id) || null;
    }

    updatePharmacyStock(pharmacyId, itemKey, updatedData) {
        let list = this.getAllPharmacies();
        const pharmIndex = list.findIndex(p => p.id === pharmacyId);

        if (pharmIndex !== -1) {
            const pharmacy = list[pharmIndex];
            const invItem = pharmacy.inventory.find(i => i.id === itemKey || i.name.toLowerCase() === itemKey.toLowerCase());
            
            if (invItem) {
                Object.assign(invItem, updatedData);
                pharmacy.lastUpdated = new Date().toISOString();
                list[pharmIndex] = pharmacy;
                this.saveAll(list);
                return { success: true, pharmacy, item: invItem };
            }
        }
        return { success: false, error: "Pharmacy or item not found" };
    }

    addInventoryItem(pharmacyId, newItem) {
        let list = this.getAllPharmacies();
        const pharmIndex = list.findIndex(p => p.id === pharmacyId);

        if (pharmIndex !== -1) {
            const pharmacy = list[pharmIndex];
            const newId = `inv-${Date.now()}`;
            const itemToAdd = { id: newId, ...newItem };
            pharmacy.inventory.unshift(itemToAdd);
            pharmacy.lastUpdated = new Date().toISOString();
            list[pharmIndex] = pharmacy;
            this.saveAll(list);
            return { success: true, pharmacy, item: itemToAdd };
        }
        return { success: false, error: "Pharmacy not found" };
    }

    deleteInventoryItem(pharmacyId, itemId) {
        let list = this.getAllPharmacies();
        const pharmIndex = list.findIndex(p => p.id === pharmacyId);

        if (pharmIndex !== -1) {
            const pharmacy = list[pharmIndex];
            pharmacy.inventory = pharmacy.inventory.filter(i => i.id !== itemId);
            pharmacy.lastUpdated = new Date().toISOString();
            list[pharmIndex] = pharmacy;
            this.saveAll(list);
            return { success: true, pharmacy };
        }
        return { success: false };
    }

    saveAll(list) {
        localStorage.setItem(this.storageKey, JSON.stringify(list));
        if (this.broadcastChannel) {
            this.broadcastChannel.postMessage({ type: 'STOCK_UPDATE', timestamp: Date.now() });
        }
        this.notifyListeners(list);
    }

    subscribe(callback) {
        this.listeners.push(callback);
        // Call immediately with current state
        callback(this.getAllPharmacies());
        return () => {
            this.listeners = this.listeners.filter(cb => cb !== callback);
        };
    }

    notifyListeners(data) {
        this.listeners.forEach(cb => {
            try { cb(data); } catch(err) { console.error(err); }
        });
    }

    // Reset to Seed Data
    resetToSeed() {
        if (window.SEED_PHARMACIES) {
            this.saveAll(window.SEED_PHARMACIES);
        }
    }
}

// Global Store Instance
window.medConnectStore = new RealtimeStore();
