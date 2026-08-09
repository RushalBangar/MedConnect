/**
 * MedConnect - Vendor & Pharmacy Inventory Management Logic
 * Supports i18n, Theme Toggling, Real-Time CRUD, and SMS Command Parsing
 */

document.addEventListener('DOMContentLoaded', () => {
    const store = window.medConnectStore;
    const i18n = window.i18n;

    let currentVendorPharmacyId = localStorage.getItem('medconnect_vendor_pharmacy_id') || 'pharm-001';
    let isAuthenticated = localStorage.getItem('medconnect_vendor_auth') === 'true';

    // DOM Elements
    const authOverlay = document.getElementById('vendor-auth-modal');
    const authForm = document.getElementById('vendor-auth-form');
    const pharmacySelector = document.getElementById('pharmacy-selector');
    const inventoryTableBody = document.getElementById('inventory-table-body');
    const addItemForm = document.getElementById('add-item-form');
    const commandForm = document.getElementById('command-form');
    const commandInput = document.getElementById('command-input');
    const commandLog = document.getElementById('command-log');
    const storeNameHeader = document.getElementById('vendor-store-name');
    const storeAddressHeader = document.getElementById('vendor-store-address');

    function initVendorPortal() {
        if (!isAuthenticated) {
            showAuthModal();
        } else {
            hideAuthModal();
        }

        populatePharmacySelector();
        renderVendorDashboard();

        store.subscribe(() => {
            renderVendorDashboard();
        });

        window.addEventListener('languageChanged', () => {
            renderVendorDashboard();
        });
    }

    function showAuthModal() {
        if (authOverlay) authOverlay.classList.add('active');
    }

    function hideAuthModal() {
        if (authOverlay) authOverlay.classList.remove('active');
    }

    if (authForm) {
        authForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('auth-email').value;
            const password = document.getElementById('auth-password').value;

            if (email && password) {
                isAuthenticated = true;
                localStorage.setItem('medconnect_vendor_auth', 'true');
                hideAuthModal();
                showNotification("Successfully authenticated vendor profile!", "success");
            }
        });
    }

    function populatePharmacySelector() {
        if (!pharmacySelector) return;
        const pharmacies = store.getAllPharmacies();
        pharmacySelector.innerHTML = pharmacies.map(p => 
            `<option value="${p.id}" ${p.id === currentVendorPharmacyId ? 'selected' : ''}>${p.name} (${p.category})</option>`
        ).join('');

        pharmacySelector.addEventListener('change', (e) => {
            currentVendorPharmacyId = e.target.value;
            localStorage.setItem('medconnect_vendor_pharmacy_id', currentVendorPharmacyId);
            renderVendorDashboard();
        });
    }

    function renderVendorDashboard() {
        const pharmacy = store.getPharmacyById(currentVendorPharmacyId);
        if (!pharmacy) return;

        if (storeNameHeader) storeNameHeader.textContent = pharmacy.name;
        if (storeAddressHeader) storeAddressHeader.textContent = `📍 ${pharmacy.address} | 📞 ${pharmacy.phone}`;

        if (!inventoryTableBody) return;

        inventoryTableBody.innerHTML = pharmacy.inventory.map(item => `
            <tr>
                <td>
                    <strong style="color: var(--heading-color);">${item.name}</strong>
                    <div style="font-size: 0.75rem; color: var(--text-dim);">${item.category}</div>
                </td>
                <td>
                    <span class="pill-qty ${item.inStock ? (item.quantity > 5 ? 'qty-available' : 'qty-low') : 'qty-none'}">
                        ${item.inStock ? `${item.quantity} ${item.unit}` : i18n.t('out_of_stock')}
                    </span>
                </td>
                <td>${item.price}</td>
                <td>
                    <button onclick="toggleStockStatus('${item.id}', ${!item.inStock})" class="btn btn-sm ${item.inStock ? 'btn-outline' : 'btn-emergency'}">
                        ${item.inStock ? i18n.t('mark_out_stock') : i18n.t('mark_in_stock')}
                    </button>
                </td>
                <td>
                    <button onclick="deleteItem('${item.id}')" class="btn btn-sm btn-ghost" style="color: #ef4444;">
                        ${i18n.t('delete_btn')}
                    </button>
                </td>
            </tr>
        `).join('');
    }

    window.toggleStockStatus = function(itemId, newStatus) {
        const pharmacy = store.getPharmacyById(currentVendorPharmacyId);
        const item = pharmacy.inventory.find(i => i.id === itemId);
        if (!item) return;

        store.updatePharmacyStock(currentVendorPharmacyId, itemId, {
            inStock: newStatus,
            quantity: newStatus ? (item.quantity > 0 ? item.quantity : 10) : 0
        });

        showNotification(`Updated ${item.name} status`);
    };

    window.deleteItem = function(itemId) {
        if (confirm("Are you sure you want to remove this item from your live inventory?")) {
            store.deleteInventoryItem(currentVendorPharmacyId, itemId);
            showNotification("Item removed from store inventory.");
        }
    };

    if (addItemForm) {
        addItemForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('new-item-name').value;
            const category = document.getElementById('new-item-category').value;
            const quantity = parseInt(document.getElementById('new-item-qty').value, 10) || 0;
            const unit = document.getElementById('new-item-unit').value || 'units';
            const price = document.getElementById('new-item-price').value || '₹0';

            if (name) {
                store.addInventoryItem(currentVendorPharmacyId, {
                    name,
                    category,
                    quantity,
                    unit,
                    price,
                    inStock: quantity > 0
                });

                addItemForm.reset();
                showNotification(`Added ${name} (${quantity} ${unit}) to inventory!`, "success");
            }
        });
    }

    if (commandForm) {
        commandForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const cmd = commandInput.value.trim();
            if (!cmd) return;

            logTerminalCommand(`> ${cmd}`);
            parseSMSCommand(cmd);
            commandInput.value = '';
        });
    }

    function parseSMSCommand(cmdText) {
        const text = cmdText.toLowerCase();
        const pharmacy = store.getPharmacyById(currentVendorPharmacyId);

        const addMatch = text.match(/add\s+(\d+)\s+(.+)/i);
        if (addMatch) {
            const qty = parseInt(addMatch[1], 10);
            const itemName = addMatch[2].trim();
            
            const existing = pharmacy.inventory.find(i => i.name.toLowerCase().includes(itemName));
            if (existing) {
                store.updatePharmacyStock(currentVendorPharmacyId, existing.id, {
                    quantity: existing.quantity + qty,
                    inStock: true
                });
                logTerminalCommand(`✅ Success: Added ${qty} units to ${existing.name}.`);
            } else {
                store.addInventoryItem(currentVendorPharmacyId, {
                    name: itemName.charAt(0).toUpperCase() + itemName.slice(1),
                    category: "Medication",
                    quantity: qty,
                    unit: "units",
                    price: "₹50",
                    inStock: true
                });
                logTerminalCommand(`✅ Success: Created new item '${itemName}' with ${qty} units.`);
            }
            return;
        }

        const setMatch = text.match(/set\s+(.+)\s+(\d+)/i);
        if (setMatch) {
            const itemName = setMatch[1].trim();
            const qty = parseInt(setMatch[2], 10);

            const existing = pharmacy.inventory.find(i => i.name.toLowerCase().includes(itemName));
            if (existing) {
                store.updatePharmacyStock(currentVendorPharmacyId, existing.id, {
                    quantity: qty,
                    inStock: qty > 0
                });
                logTerminalCommand(`✅ Success: Set ${existing.name} stock quantity to ${qty}.`);
            } else {
                logTerminalCommand(`⚠️ Error: Could not find item '${itemName}' in stock list.`);
            }
            return;
        }

        logTerminalCommand(`⚠️ Unrecognized Command. Try: "Add 10 Paracetamol", "Set Oxygen 5"`);
    }

    function logTerminalCommand(msg) {
        if (!commandLog) return;
        const line = document.createElement('div');
        line.textContent = msg;
        commandLog.appendChild(line);
        commandLog.scrollTop = commandLog.scrollHeight;
    }

    function showNotification(msg, type = "info") {
        const toast = document.createElement('div');
        toast.style.cssText = `
            position: fixed; bottom: 20px; right: 20px; z-index: 9999;
            background: ${type === 'success' ? '#10b981' : '#0284c7'};
            color: white; padding: 12px 20px; border-radius: 8px; font-weight: 600;
            box-shadow: 0 10px 25px rgba(0,0,0,0.5); font-family: sans-serif;
        `;
        toast.textContent = msg;
        document.body.appendChild(toast);
        setTimeout(() => toast.remove(), 3000);
    }

    initVendorPortal();
});
