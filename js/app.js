/**
 * MedConnect - Citizen Portal Application Controller
 * Matching screen.png Card Layout, Twin Mint Action Buttons, Heatmap Toggle
 */

document.addEventListener('DOMContentLoaded', () => {
    const store = window.medConnectStore;
    let mapInstance = null;
    let aiScanner = null;
    let currentSearchTerm = '';
    let currentFilterCategory = 'ALL';

    // DOM Elements
    const searchInput = document.getElementById('search-input');
    const resultsContainer = document.getElementById('results-container');
    const resultsCountEl = document.getElementById('results-count');
    const filterChips = document.querySelectorAll('.chip[data-category]');
    
    // Scanner Modal Elements
    const scannerModal = document.getElementById('scanner-modal');
    const openScannerBtn = document.getElementById('open-scanner-btn');
    const closeScannerBtn = document.getElementById('close-scanner-btn');
    const dropzone = document.getElementById('scanner-dropzone');
    const fileInput = document.getElementById('prescription-file');
    const sampleButtons = document.querySelectorAll('.btn-sample-prescription');
    const scanStatusArea = document.getElementById('scan-status-area');
    const scanResultsArea = document.getElementById('scan-results-area');
    const autoSearchBtn = document.getElementById('auto-search-btn');

    // Cart Elements
    const cartFab = document.getElementById('cart-fab');
    const cartBadge = document.getElementById('cart-badge');
    const cartBackdrop = document.getElementById('cart-backdrop');
    const checkoutSidebar = document.getElementById('checkout-sidebar');
    const closeCartBtn = document.getElementById('close-cart-btn');
    const cartItemsContainer = document.getElementById('cart-items-container');
    const cartTotalPrice = document.getElementById('cart-total-price');
    const checkoutForm = document.getElementById('checkout-form');
    const payCodBtn = document.getElementById('pay-cod-btn');
    const orderSuccessModal = document.getElementById('order-success-modal');
    const successModalCloseBtn = document.getElementById('success-modal-close-btn');

    let lastExtractedMedicines = [];

    function initApp() {
        mapInstance = new window.MedConnectMap('map');
        
        if (window.AIPrescriptionScanner) {
            aiScanner = new window.AIPrescriptionScanner();
        }

        store.subscribe((pharmacies) => {
            renderCitizenResults(pharmacies);
        });

        window.addEventListener('languageChanged', () => {
            renderCitizenResults(store.getAllPharmacies());
        });

        store.subscribeCart((cart) => {
            renderCart(cart);
        });

        setupEventListeners();
    }

    function setupEventListeners() {
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                currentSearchTerm = e.target.value.trim();
                renderCitizenResults(store.getAllPharmacies());
            });
        }

        filterChips.forEach(chip => {
            chip.addEventListener('click', () => {
                filterChips.forEach(c => c.classList.remove('active'));
                chip.classList.add('active');
                currentFilterCategory = chip.getAttribute('data-category');
                renderCitizenResults(store.getAllPharmacies());
            });
        });

        if (openScannerBtn && scannerModal) {
            openScannerBtn.addEventListener('click', () => scannerModal.classList.add('active'));
        }
        if (closeScannerBtn && scannerModal) {
            closeScannerBtn.addEventListener('click', () => scannerModal.classList.remove('active'));
        }

        if (dropzone && fileInput) {
            dropzone.addEventListener('click', () => fileInput.click());

            dropzone.addEventListener('dragover', (e) => {
                e.preventDefault();
                dropzone.classList.add('dragover');
            });
            dropzone.addEventListener('dragleave', () => dropzone.classList.remove('dragover'));
            dropzone.addEventListener('drop', (e) => {
                e.preventDefault();
                dropzone.classList.remove('dragover');
                if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                    processPrescriptionFile(e.dataTransfer.files[0]);
                }
            });

            fileInput.addEventListener('change', (e) => {
                if (e.target.files && e.target.files[0]) {
                    processPrescriptionFile(e.target.files[0]);
                }
            });
        }

        sampleButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const index = parseInt(btn.getAttribute('data-sample-index'), 10) || 0;
                processPrescriptionSample(index);
            });
        });

        if (autoSearchBtn) {
            autoSearchBtn.addEventListener('click', () => {
                if (lastExtractedMedicines.length > 0) {
                    const topMed = lastExtractedMedicines[0].name;
                    if (searchInput) searchInput.value = topMed;
                    currentSearchTerm = topMed;
                    renderCitizenResults(store.getAllPharmacies());
                    if (scannerModal) scannerModal.classList.remove('active');
                }
            });
        }

        // Cart Listeners
        const openCart = () => { checkoutSidebar.classList.add('active'); if(cartBackdrop) cartBackdrop.style.display = 'block'; };
        const closeCart = () => { checkoutSidebar.classList.remove('active'); if(cartBackdrop) cartBackdrop.style.display = 'none'; };

        if (cartFab) cartFab.addEventListener('click', openCart);
        if (closeCartBtn) closeCartBtn.addEventListener('click', closeCart);
        if (cartBackdrop) cartBackdrop.addEventListener('click', closeCart);
        if (successModalCloseBtn) successModalCloseBtn.addEventListener('click', () => orderSuccessModal.classList.remove('active'));
        
        if (payCodBtn) {
            payCodBtn.addEventListener('click', () => {
                if (checkoutForm.checkValidity()) {
                    processCheckout(false);
                } else {
                    checkoutForm.reportValidity();
                }
            });
        }

        if (checkoutForm) {
            checkoutForm.addEventListener('submit', (e) => {
                e.preventDefault();
                processCheckout(true);
            });
        }
    }

    window.handleAddToCart = function(pharmacyId, itemId) {
        const p = store.getPharmacyById(pharmacyId);
        if (p) {
            const item = p.inventory.find(i => i.id === itemId);
            if (item && item.inStock && item.quantity > 0) {
                store.addToCart(pharmacyId, item);
                // Open cart sidebar
                checkoutSidebar.classList.add('active');
                if (cartBackdrop) cartBackdrop.style.display = 'block';
            }
        }
    };

    window.handleRemoveFromCart = function(cartId) {
        store.removeFromCart(cartId);
    };

    window.handleQtyChange = function(cartId, delta) {
        const cart = store.getCart();
        const idx = cart.findIndex(c => c.cartId === cartId);
        if (idx !== -1) {
            const newQty = cart[idx].orderQty + delta;
            if (newQty <= 0) {
                store.removeFromCart(cartId);
            } else {
                cart[idx].orderQty = newQty;
                store.saveCart(cart);
            }
        }
    };

    function processCheckout(isOnline) {
        const buyerName = document.getElementById('buyer-name').value;
        const buyerPhone = document.getElementById('buyer-phone').value;
        const buyerAddress = document.getElementById('buyer-address').value;

        if (isOnline) {
            // Simulate Payment Gateway
            const btn = document.getElementById('pay-online-btn');
            const originalText = btn.innerHTML;
            btn.innerHTML = '⏳ Processing Payment...';
            setTimeout(() => {
                const res = store.checkout({ name: buyerName, phone: buyerPhone, address: buyerAddress });
                if (res.success) {
                    btn.innerHTML = '✅ Payment Successful!';
                    setTimeout(() => completeOrderSuccess(), 1500);
                }
            }, 2000);
        } else {
            const res = store.checkout({ name: buyerName, phone: buyerPhone, address: buyerAddress });
            if (res.success) completeOrderSuccess();
        }
    }

    function completeOrderSuccess() {
        checkoutSidebar.classList.remove('active');
        if (cartBackdrop) cartBackdrop.style.display = 'none';
        checkoutForm.reset();
        document.getElementById('pay-online-btn').innerHTML = '💳 Pay Online';
        // Show beautiful success modal instead of alert
        if (orderSuccessModal) orderSuccessModal.classList.add('active');
    }

    function renderCart(cart) {
        if (!cartFab || !cartBadge) return;
        
        if (cart.length > 0) {
            cartFab.style.display = 'flex';
            cartBadge.textContent = cart.reduce((acc, item) => acc + item.orderQty, 0);
        } else {
            cartFab.style.display = 'none';
            checkoutSidebar.classList.remove('active');
        }

        if (!cartItemsContainer) return;

        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p style="text-align:center; color:var(--text-muted); margin-top:2rem;">Your cart is empty.</p>';
            cartTotalPrice.textContent = '₹0';
            return;
        }

        let total = 0;
        cartItemsContainer.innerHTML = cart.map(item => {
            const priceVal = parseInt(item.price.replace(/[^0-9]/g, ''), 10) || 0;
            const itemTotal = priceVal * item.orderQty;
            total += itemTotal;
            // Fix grammar: "1 unit" vs "2 units"
            const unitLabel = item.orderQty === 1 ? item.unit.replace(/s$/, '') : item.unit;
            
            return `
                <div class="cart-item-row">
                    <div style="flex:1; min-width:0;">
                        <div style="font-weight:700; font-size:0.9rem; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${item.name}</div>
                        <div style="font-size:0.78rem; color:var(--text-muted);">${item.price} each • ₹${itemTotal.toLocaleString('en-IN')} total</div>
                    </div>
                    <div style="display:flex; align-items:center; gap:0.4rem; flex-shrink:0;">
                        <button onclick="window.handleQtyChange('${item.cartId}', -1)" style="width:26px; height:26px; border-radius:50%; background:var(--bg-input); border:1px solid var(--border-color); color:white; font-size:1rem; cursor:pointer; display:flex; align-items:center; justify-content:center;">-</button>
                        <span style="font-weight:700; min-width:1.5rem; text-align:center;">${item.orderQty}</span>
                        <button onclick="window.handleQtyChange('${item.cartId}', 1)" style="width:26px; height:26px; border-radius:50%; background:var(--primary); border:none; color:#042f2e; font-size:1rem; cursor:pointer; display:flex; align-items:center; justify-content:center;">+</button>
                        <button onclick="window.handleRemoveFromCart('${item.cartId}')" class="modal-close" style="color:var(--emergency); font-size:1.2rem; margin-left:0.25rem;">&times;</button>
                    </div>
                </div>
            `;
        }).join('');

        cartTotalPrice.textContent = `₹${total.toLocaleString('en-IN')}`;
    }

    async function processPrescriptionFile(file) {
        showScanStatus("🔍 Scanning prescription with Gemini Multimodal AI...");
        const result = await aiScanner.scanPrescriptionImage(file);
        displayScanResults(result);
    }

    async function processPrescriptionSample(index) {
        showScanStatus("🔍 Analyzing handwritten prescription sample...");
        const result = await aiScanner.scanPrescriptionImage(null, true, index);
        displayScanResults(result);
    }

    function showScanStatus(msg) {
        if (scanStatusArea) {
            scanStatusArea.style.display = 'block';
            scanStatusArea.innerHTML = `<div class="pulse-dot" style="display:inline-block;"></div> ${msg}`;
        }
        if (scanResultsArea) scanResultsArea.style.display = 'none';
    }

    function displayScanResults(result) {
        if (scanStatusArea) scanStatusArea.style.display = 'none';
        if (!scanResultsArea) return;

        scanResultsArea.style.display = 'block';
        lastExtractedMedicines = result.medicines || [];

        const tagsHtml = lastExtractedMedicines.map(m => `
            <span class="tag-badge">
                💊 ${window.i18n.translateItemName(m.name)} <small>(${m.confidence})</small>
            </span>
        `).join('');

        scanResultsArea.innerHTML = `
            <div style="background: rgba(16, 185, 129, 0.1); border: 1px solid rgba(16, 185, 129, 0.3); padding: 1rem; border-radius: 8px; margin-bottom: 1rem;">
                <h4 style="color: #10b981; margin-bottom: 4px;">✅ AI Extraction Complete</h4>
                <p style="font-size: 0.85rem; color: var(--text-muted);">Identified ${lastExtractedMedicines.length} emergency items from prescription handwriting:</p>
                <div class="extracted-tags">${tagsHtml}</div>
            </div>
        `;

        if (autoSearchBtn) autoSearchBtn.style.display = 'inline-flex';
    }

    function renderCitizenResults(pharmacies) {
        if (!resultsContainer) return;
        const i18n = window.i18n;

        let filteredPharmacies = pharmacies.map(pharmacy => {
            const distanceData = mapInstance.calculateDistance(
                mapInstance.userLocation.lat,
                mapInstance.userLocation.lng,
                pharmacy.lat,
                pharmacy.lng
            );

            const matchingInventory = pharmacy.inventory.filter(item => {
                const matchesQuery = !currentSearchTerm || 
                    item.name.toLowerCase().includes(currentSearchTerm.toLowerCase()) ||
                    i18n.translateItemName(item.name).toLowerCase().includes(currentSearchTerm.toLowerCase()) ||
                    item.category.toLowerCase().includes(currentSearchTerm.toLowerCase());
                
                const matchesCategory = currentFilterCategory === 'ALL' || 
                    (currentFilterCategory === 'OXYGEN' && item.category === 'Oxygen') ||
                    (currentFilterCategory === 'BLOOD' && item.category === 'Blood') ||
                    (currentFilterCategory === 'MEDICINE' && item.category === 'Medication') ||
                    (currentFilterCategory === 'IN_STOCK' && item.inStock);

                return matchesQuery && matchesCategory;
            });

            return {
                ...pharmacy,
                distanceKm: parseFloat(distanceData.distanceKm),
                travelTimeMin: distanceData.travelTimeMin,
                matchingInventory
            };
        });

        if (currentSearchTerm || currentFilterCategory !== 'ALL') {
            filteredPharmacies = filteredPharmacies.filter(p => p.matchingInventory.length > 0);
        }

        filteredPharmacies.sort((a, b) => a.distanceKm - b.distanceKm);

        if (resultsCountEl) {
            resultsCountEl.textContent = `${i18n.t('nearby_title')}: ${i18n.toDevanagari(filteredPharmacies.length)}`;
        }

        if (filteredPharmacies.length === 0) {
            resultsContainer.innerHTML = `
                <div style="background: var(--bg-card); padding: 3rem 1.5rem; text-align: center; border-radius: 16px; border: 1px solid var(--border-color);">
                    <div style="font-size: 3rem; margin-bottom: 1rem;">🔍</div>
                    <h3 style="color: var(--heading-color); margin-bottom: 0.5rem;">${i18n.t('out_of_stock')}</h3>
                    <p style="color: var(--text-muted); font-size: 0.95rem;">No items matching <strong>"${currentSearchTerm}"</strong>.</p>
                </div>
            `;
            mapInstance.renderPharmacyMarkers([], currentSearchTerm);
            return;
        }

        resultsContainer.innerHTML = filteredPharmacies.map((pharmacyRaw, idx) => {
            const pharmacy = i18n.translatePharmacy(pharmacyRaw);
            const isSatu = idx === 0 || pharmacy.isOpen247;
            const statusBadgeClass = isSatu ? 'satu' : 'amber';
            const statusBadgeText = isSatu ? i18n.t('satu') : i18n.t('amber');

            const itemBoxes = pharmacy.matchingInventory.map(item => {
                const translatedName = i18n.translateItemName(item.name);
                const translatedUnit = i18n.translateUnit(item.unit);
                const formattedQty = i18n.toDevanagari(item.quantity);
                const isLow = !item.inStock || item.quantity <= 5;
                const boxClass = isLow ? 'amber' : 'emerald';

                return `
                    <div class="item-box ${boxClass}">
                        <div class="item-box-title">${translatedName}</div>
                        <div class="item-box-meta">
                            ${isLow && item.inStock ? `${i18n.t('low_stock')}: ` : ''}
                            ${item.inStock ? `${formattedQty} ${translatedUnit}` : i18n.t('out_of_stock')} • ${item.price}
                        </div>
                        ${(item.inStock && item.quantity > 0) ? `<button class="btn-add-cart" onclick="window.handleAddToCart('${pharmacy.id}', '${item.id}')">🛒 Add</button>` : ''}
                    </div>
                `;
            }).join('');

            const mapsDirectionUrl = `https://www.google.com/maps/dir/?api=1&destination=${pharmacy.lat},${pharmacy.lng}`;

            return `
                <div class="pharmacy-card">
                    <div class="card-header-row">
                        <div class="pharmacy-title">${pharmacy.name}</div>
                        <span class="status-pill ${statusBadgeClass}">${statusBadgeText}</span>
                    </div>

                    <div class="card-subtitle">
                        📍 ${pharmacy.address}
                    </div>

                    <div class="card-status-bar">
                        <span>🕒 ${i18n.t('status')} • <strong style="color: ${pharmacy.isOpen247 ? '#34d399' : '#f87171'}">${pharmacy.isOpen247 ? i18n.t('open') : i18n.t('closed')}</strong></span>
                        <span class="pill-tag">${i18n.t('pharmacy_tag')}</span>
                    </div>

                    <div class="inventory-grid-row">
                        ${itemBoxes}
                    </div>

                    <div class="card-actions-twin">
                        <a href="tel:${pharmacy.phone}" class="btn-twin">
                            ${i18n.t('call_store')}
                        </a>
                        <a href="${mapsDirectionUrl}" target="_blank" rel="noopener" class="btn-twin">
                            ${i18n.t('get_directions')}
                        </a>
                    </div>
                </div>
            `;
        }).join('');

        mapInstance.renderPharmacyMarkers(filteredPharmacies, currentSearchTerm);
    }

    window.focusPharmacyOnMap = function(id, lat, lng) {
        if (mapInstance) {
            mapInstance.focusPharmacy(id, lat, lng);
        }
    };

    function formatTimeAgo(isoString) {
        if (!isoString) return window.i18n.t('updated_just_now');
        const diffMs = Date.now() - new Date(isoString).getTime();
        const mins = Math.floor(diffMs / 60000);
        if (mins < 1) return window.i18n.t('updated_just_now');
        if (mins < 60) return `${window.i18n.toDevanagari(mins)}m ${window.i18n.t('updated_ago')}`;
        return `${window.i18n.toDevanagari(Math.floor(mins / 60))}h ${window.i18n.t('updated_ago')}`;
    }

    initApp();
});
