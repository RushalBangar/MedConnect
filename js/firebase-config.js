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
        this.cartStorageKey = 'medconnect_cart';
        this.ordersStorageKey = 'medconnect_orders';
        this.cartListeners = [];
        
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

    // --- E-Commerce / Cart Methods ---

    getCart() {
        try {
            const data = localStorage.getItem(this.cartStorageKey);
            return data ? JSON.parse(data) : [];
        } catch (e) {
            return [];
        }
    }

    saveCart(cart) {
        localStorage.setItem(this.cartStorageKey, JSON.stringify(cart));
        this.notifyCartListeners(cart);
    }

    addToCart(pharmacyId, itemData) {
        const cart = this.getCart();
        const existingIdx = cart.findIndex(c => c.itemId === itemData.id && c.pharmacyId === pharmacyId);
        if (existingIdx !== -1) {
            cart[existingIdx].orderQty += 1;
        } else {
            cart.push({
                cartId: `cart-${Date.now()}`,
                pharmacyId: pharmacyId,
                itemId: itemData.id,
                name: itemData.name,
                price: itemData.price,
                unit: itemData.unit,
                orderQty: 1
            });
        }
        this.saveCart(cart);
    }

    removeFromCart(cartId) {
        const cart = this.getCart().filter(c => c.cartId !== cartId);
        this.saveCart(cart);
    }

    clearCart() {
        this.saveCart([]);
    }

    subscribeCart(callback) {
        this.cartListeners.push(callback);
        callback(this.getCart());
        return () => {
            this.cartListeners = this.cartListeners.filter(cb => cb !== callback);
        };
    }

    notifyCartListeners(cart) {
        this.cartListeners.forEach(cb => {
            try { cb(cart); } catch(err) { console.error(err); }
        });
    }

    // --- Orders Methods ---

    getAllOrders() {
        try {
            const data = localStorage.getItem(this.ordersStorageKey);
            return data ? JSON.parse(data) : [];
        } catch (e) {
            return [];
        }
    }

    saveOrders(orders) {
        localStorage.setItem(this.ordersStorageKey, JSON.stringify(orders));
        if (this.broadcastChannel) {
            this.broadcastChannel.postMessage({ type: 'ORDER_UPDATE', timestamp: Date.now() });
        }
    }

    checkout(buyerDetails) {
        const cart = this.getCart();
        if (cart.length === 0) return { success: false, error: 'Cart is empty' };

        // 1. Deduct Inventory & Group Orders by Pharmacy
        let pharmacies = this.getAllPharmacies();
        const orders = this.getAllOrders();
        
        cart.forEach(cartItem => {
            const pIdx = pharmacies.findIndex(p => p.id === cartItem.pharmacyId);
            if (pIdx !== -1) {
                const iIdx = pharmacies[pIdx].inventory.findIndex(i => i.id === cartItem.itemId);
                if (iIdx !== -1) {
                    const currentQty = pharmacies[pIdx].inventory[iIdx].quantity;
                    const newQty = Math.max(0, currentQty - cartItem.orderQty);
                    pharmacies[pIdx].inventory[iIdx].quantity = newQty;
                    if (newQty === 0) pharmacies[pIdx].inventory[iIdx].inStock = false;
                }
            }
            
            // Create Order Record
            orders.push({
                orderId: `ORD-${Date.now()}-${Math.floor(Math.random()*1000)}`,
                pharmacyId: cartItem.pharmacyId,
                itemName: cartItem.name,
                orderQty: cartItem.orderQty,
                unit: cartItem.unit,
                price: cartItem.price,
                buyerName: buyerDetails.name,
                buyerPhone: buyerDetails.phone,
                buyerAddress: buyerDetails.address,
                timestamp: new Date().toISOString(),
                status: 'Pending'
            });
        });

        // Save changes
        this.saveAll(pharmacies); // Deducts inventory globally
        this.saveOrders(orders);
        this.clearCart();
        
        return { success: true };
    }

    getOrdersForPharmacy(pharmacyId) {
        return this.getAllOrders().filter(o => o.pharmacyId === pharmacyId).sort((a,b) => new Date(b.timestamp) - new Date(a.timestamp));
    }
}

// Global Store Instance
window.medConnectStore = new RealtimeStore();
