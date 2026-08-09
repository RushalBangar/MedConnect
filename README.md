<div align="center">

# ?? MedConnect

### Real-Time Emergency Medical Supply Locator

**Instantly find & buy urgent medicines, oxygen cylinders, and rare blood groups at nearby pharmacies.**

[![Live Demo](https://img.shields.io/badge/??_Live_Demo-medconnect19.netlify.app-10b981?style=for-the-badge&labelColor=0b1317)](https://medconnect19.netlify.app/)
[![GitHub](https://img.shields.io/badge/GitHub-RushalBangar%2FMedConnect-181717?style=for-the-badge&logo=github)](https://github.com/RushalBangar/MedConnect)
[![Netlify Status](https://img.shields.io/badge/Deployed_on-Netlify-00C7B7?style=for-the-badge&logo=netlify&logoColor=white)](https://medconnect19.netlify.app/)

</div>

---

## ? Features

### ?? Citizen Portal
| Feature | Description |
|---------|-------------|
| **Real-Time Stock Locator** | Search medicines, oxygen, blood groups — results update live across all tabs |
| **Interactive Heatmap Map** | Leaflet.js map with pharmacy pins, travel time badges (?? walk / ?? drive), and heatmap overlay |
| **AI Prescription Scanner** | Upload a doctor's prescription — Gemini Vision AI extracts medicine names automatically |
| **E-Commerce Cart & Checkout** | Add to cart, adjust quantities with `-`/`+` steppers, pay via COD or simulated Online Payment |
| **Live Inventory Deduction** | Checkout auto-deducts stock quantities in real time globally |
| **Filter Chips** | Quick filters: All / Medicines / Oxygen / Blood Groups / In Stock Only |
| **Dark & Light Theme** | Toggle between charcoal dark mode and clean light mode |
| **Multilingual (i18n)** | ???? English · ???? Marathi (?????) · ???? Hindi (??????) with Devanagari numerals |
| **Mobile Responsive** | Fully optimized layout with horizontal filter scroll and stacked mobile view |

### ?? Vendor Portal
| Feature | Description |
|---------|-------------|
| **Live Inventory Management** | Add, delete, and update stock in real time |
| **Quick Status Toggle** | Mark any item In Stock / Out of Stock with one click |
| **Incoming Orders Dashboard** | View orders with buyer name, phone, address and dispatch them |
| **SMS / WhatsApp Terminal** | Type `"Add 10 Paracetamol"` to update stock via SMS-style commands |
| **Real-Time Cross-Tab Sync** | BroadcastChannel API syncs everything across browser tabs instantly |
| **Multi-Pharmacy Switcher** | Switch between multiple managed pharmacy stores |

---

## ??? Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | HTML5, Vanilla CSS3, JavaScript ES6+ |
| **Map** | Leaflet.js + OpenStreetMap tiles |
| **AI Scanner** | Google Gemini Multimodal API (Vision) |
| **Real-Time Sync** | BroadcastChannel API + localStorage |
| **Database** | Firebase Firestore + localStorage fallback |
| **Deployment** | Netlify (auto-deploy from GitHub) |
| **Design** | Emerald Mint `#10b981` + Amber `#f59e0b` on Charcoal Dark `#0b1317` |
| **Fonts** | Inter + Outfit (Google Fonts) |

---

## ?? Getting Started

```bash
# Clone the repository
git clone https://github.com/RushalBangar/MedConnect.git
cd MedConnect

# Serve with any static file server
python -m http.server 8080
# Open http://localhost:8080
```

**Demo Vendor Login:**
```
Email:    apollo.nashik@medconnect.org
Password: vendor12345
```

---

## ?? Project Structure

```
MedConnect/
+-- index.html              # Citizen Search Portal
+-- vendor.html             # Pharmacy Vendor Dashboard
+-- favicon.png             # App icon (emerald cross)
+-- logo.png                # Full brand logo
+-- css/
¦   +-- styles.css          # Design system & responsive styles
+-- js/
    +-- i18n.js             # Translations (EN / MR / HI)
    +-- theme.js            # Dark/Light theme
    +-- data.js             # Seed pharmacy data
    +-- firebase-config.js  # RealtimeStore (cart, orders, pharmacies)
    +-- map.js              # Leaflet map, heatmap, travel pins
    +-- ai-scanner.js       # Gemini AI prescription scanner
    +-- app.js              # Citizen portal + e-commerce logic
    +-- vendor.js           # Vendor dashboard logic
```

---

## ?? Live Demo

?? **[https://medconnect19.netlify.app/](https://medconnect19.netlify.app/)**

---

## ????? Author

<div align="center">

**Rushal Bangar**

[![GitHub](https://img.shields.io/badge/GitHub-@RushalBangar-181717?style=flat-square&logo=github)](https://github.com/RushalBangar)

*Built with ?? in Nashik, India — 2026*

</div>

---

## ?? License

This project is open source and available under the [MIT License](LICENSE).
