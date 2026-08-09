/**
 * MedConnect Initial Seed Data
 * Real-world healthcare facilities, pharmacies, blood banks, and oxygen suppliers in Nashik.
 */

const SEED_PHARMACIES = [
    {
        id: "pharm-001",
        name: "Apollo Pharmacy 24/7",
        category: "Pharmacy",
        address: "College Road, Near City Center Mall, Nashik",
        phone: "+91 98230 11223",
        isOpen247: true,
        lat: 20.0063,
        lng: 73.7661,
        verified: true,
        lastUpdated: new Date().toISOString(),
        inventory: [
            { id: "inv-101", name: "Paracetamol 650mg", category: "Medication", inStock: true, quantity: 150, unit: "strips", price: "₹30" },
            { id: "inv-102", name: "Remdesivir 100mg", category: "Medication", inStock: true, quantity: 8, unit: "vials", price: "₹2,800" },
            { id: "inv-103", name: "Oxygen Cylinder (B-Type)", category: "Oxygen", inStock: true, quantity: 4, unit: "cylinders", price: "₹4,500" },
            { id: "inv-104", name: "Fabiflu 400mg", category: "Medication", inStock: true, quantity: 25, unit: "strips", price: "₹1,250" },
            { id: "inv-105", name: "O-Negative Blood Unit", category: "Blood", inStock: false, quantity: 0, unit: "units", price: "₹1,500" }
        ]
    },
    {
        id: "pharm-002",
        name: "Sanjeevani Blood Bank & Medical",
        category: "Blood Bank",
        address: "CBS Signal, Main Road, Nashik",
        phone: "+91 94222 55667",
        isOpen247: true,
        lat: 19.9975,
        lng: 73.7898,
        verified: true,
        lastUpdated: new Date().toISOString(),
        inventory: [
            { id: "inv-201", name: "O-Negative Blood Unit", category: "Blood", inStock: true, quantity: 3, unit: "units", price: "₹1,450" },
            { id: "inv-202", name: "AB-Positive Blood Unit", category: "Blood", inStock: true, quantity: 12, unit: "units", price: "₹1,400" },
            { id: "inv-203", name: "B-Positive Blood Unit", category: "Blood", inStock: true, quantity: 24, unit: "units", price: "₹1,200" },
            { id: "inv-204", name: "Platelet Concentrate", category: "Blood", inStock: true, quantity: 6, unit: "units", price: "₹2,100" }
        ]
    },
    {
        id: "pharm-003",
        name: "Lifeline Oxygen & Emergency Supplies",
        category: "Equipment",
        address: "Gangapur Road, Near KTHM College, Nashik",
        phone: "+91 98901 44332",
        isOpen247: false,
        lat: 20.0150,
        lng: 73.7710,
        verified: true,
        lastUpdated: new Date().toISOString(),
        inventory: [
            { id: "inv-301", name: "Oxygen Concentrator (10L)", category: "Equipment", inStock: true, quantity: 5, unit: "units", price: "₹38,000" },
            { id: "inv-302", name: "Oxygen Cylinder (D-Type Jumbo)", category: "Oxygen", inStock: true, quantity: 12, unit: "cylinders", price: "₹8,500" },
            { id: "inv-303", name: "Portable Pulse Oximeter", category: "Equipment", inStock: true, quantity: 30, unit: "devices", price: "₹950" },
            { id: "inv-304", name: "BiPAP Machine", category: "Equipment", inStock: true, quantity: 2, unit: "units", price: "₹45,000" }
        ]
    },
    {
        id: "pharm-004",
        name: "Shree Medical & Wellness",
        category: "Pharmacy",
        address: "Panchavati Karanja, Nashik",
        phone: "+91 98225 77889",
        isOpen247: false,
        lat: 20.0089,
        lng: 73.7960,
        verified: true,
        lastUpdated: new Date().toISOString(),
        inventory: [
            { id: "inv-401", name: "Insulin Glargine Pen", category: "Medication", inStock: true, quantity: 18, unit: "pens", price: "₹680" },
            { id: "inv-402", name: "Azithromycin 500mg", category: "Medication", inStock: true, quantity: 45, unit: "strips", price: "₹115" },
            { id: "inv-403", name: "Paracetamol 650mg", category: "Medication", inStock: true, quantity: 80, unit: "strips", price: "₹32" },
            { id: "inv-404", name: "N95 Respirator Masks", category: "Equipment", inStock: true, quantity: 200, unit: "pieces", price: "₹40" }
        ]
    },
    {
        id: "pharm-005",
        name: "Metro Emergency Chemist",
        category: "Pharmacy",
        address: "Dwarka Circle, Mumbai-Agra Highway, Nashik",
        phone: "+91 98221 00998",
        isOpen247: true,
        lat: 19.9880,
        lng: 73.7985,
        verified: true,
        lastUpdated: new Date().toISOString(),
        inventory: [
            { id: "inv-501", name: "Enoxaparin 60mg Injection", category: "Medication", inStock: true, quantity: 10, unit: "syringes", price: "₹750" },
            { id: "inv-502", name: "IV Saline Bottle (500ml)", category: "Medication", inStock: true, quantity: 100, unit: "bottles", price: "₹65" },
            { id: "inv-503", name: "Oxygen Cylinder (B-Type)", category: "Oxygen", inStock: true, quantity: 7, unit: "cylinders", price: "₹4,200" },
            { id: "inv-504", name: "A-Positive Blood Unit", category: "Blood", inStock: true, quantity: 5, unit: "units", price: "₹1,250" }
        ]
    }
];

if (typeof window !== 'undefined') {
    window.SEED_PHARMACIES = SEED_PHARMACIES;
}
