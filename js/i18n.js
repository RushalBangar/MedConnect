/**
 * MedConnect - Internationalization (i18n) Module
 * Supports English (en), Marathi (mr - मराठी), and Hindi (hi - हिन्दी)
 */

const TRANSLATIONS = {
    en: {
        brand_name: "MedConnect",
        brand_tagline: "Real-Time Healthcare Stock Locator",
        live_sync: "LIVE REAL-TIME SYNC",
        vendor_portal: "Pharmacy Portal Login",
        ai_scanner_btn: "📷 AI Prescription Scanner",
        hero_title_1: "Find Emergency Medical Supplies",
        hero_title_2: "Near You in Seconds",
        hero_desc: "Real-time local stock tracking for urgent medications, oxygen cylinders, ICU equipment, and rare blood groups across Nashik pharmacies.",
        search_placeholder: "Search medicine (e.g. Paracetamol, Remdesivir), 'Oxygen', or 'O-Negative Blood'...",
        quick_filters: "Quick Filters:",
        filter_all: "🌐 All Supplies",
        filter_medicines: "💊 Medicines",
        filter_oxygen: "🫁 Oxygen Cylinders",
        filter_blood: "🩸 Blood Groups",
        filter_instock: "✅ In Stock Only",
        nearby_title: "Nearby Pharmacies & Suppliers",
        loading_inventory: "Loading live inventory...",
        map_panel_title: "📍 Local Pharmacy Map & Route Distance",
        map_sorted_by: "Sorted by travel time",
        scanner_title: "Multimodal AI Prescription Scanner",
        scanner_subtitle: "Upload or take a photo of a doctor's handwritten prescription. Powered by Gemini API Vision to extract medicine names and automatically search nearby stock.",
        dropzone_title: "Drag & drop prescription image here",
        dropzone_subtitle: "Supports JPG, PNG, WEBP (Max 10MB)",
        browse_files: "Browse Files",
        sample_title: "Or try sample handwritten prescription:",
        sample_1: "📝 Dr. Sharma Emergency Script",
        sample_2: "🏥 ICU Prescription Chart",
        auto_search_btn: "🔍 Run Automatic Local Stock Search",
        footer_text: "MedConnect Emergency Healthcare Stock Locator © 2026. Real-Time Community Health Platform.",
        footer_vendor_link: "Pharmacy Vendor Portal",
        
        // Pharmacy Card Strings
        open_247: "24/7 Open",
        call_store: "📞 Call Store",
        view_on_map: "📍 View on Map",
        in_stock: "In Stock",
        low_stock: "Low Stock",
        out_of_stock: "Out of Stock",
        updated_just_now: "Updated Just now",
        updated_ago: "ago",

        // Vendor Portal Strings
        vendor_title: "MedConnect Vendor Portal",
        vendor_subtitle: "Real-Time Inventory Manager",
        synced_to_citizen: "SYNCED TO CITIZEN PORTAL",
        back_to_citizen: "👈 Back to Citizen Search",
        switch_pharmacy_label: "Switch Managed Pharmacy Store:",
        sms_title: "💬 Frictionless SMS / WhatsApp Updates",
        sms_desc: "Simulate updating inventory via Cloud Functions SMS/WhatsApp webhook without logging in.",
        add_item_title: "➕ Add Item to Stock",
        item_name_label: "Item / Medicine Name",
        item_category_label: "Category",
        category_med: "Medication / Drug",
        category_oxy: "Oxygen Supply",
        category_blood: "Blood Unit",
        category_eq: "ICU / Medical Equipment",
        quantity_label: "Quantity",
        unit_label: "Unit",
        price_label: "Price (INR)",
        publish_btn: "🚀 Publish to Live Citizen Search",
        live_inventory_title: "Live Stock Inventory",
        live_inventory_desc: "Changes made here instantly reflect in real-time on citizen search results.",
        th_item_name: "Item Name",
        th_stock_qty: "Stock Quantity",
        th_price: "Price",
        th_status: "Quick Status",
        th_action: "Action",
        mark_out_stock: "Mark Out of Stock",
        mark_in_stock: "Mark In Stock",
        delete_btn: "🗑️ Delete",
        auth_title: "🔐 Vendor Portal Authentication",
        auth_desc: "Sign in to manage pharmacy stock. Powered by Firebase Authentication.",
        email_label: "Pharmacy Email Address",
        password_label: "Password",
        signin_btn: "Sign In to Vendor Dashboard"
    },
    mr: {
        brand_name: "मेडकनेक्ट",
        brand_tagline: "रिअल-टाईम आरोग्य औषध साठा शोधक",
        live_sync: "लाइव्ह रिअल-टाईम सिंक",
        vendor_portal: "फार्मसी पोर्टल लॉगिन",
        ai_scanner_btn: "📷 AI प्रिस्क्रिप्शन स्कॅनर",
        hero_title_1: "तात्काळ वैद्यकीय साठा मिळवा",
        hero_title_2: "काही सेकंदात तुमच्या जवळ",
        hero_desc: "नाशिकमधील मेडिकल स्टोअर्समध्ये तातडीची औषधे, ऑक्सिजन सिलिंडर, आयसीयू उपकरणे आणि दुर्मिळ रक्तगटांचा रिअल-टाईम साठा शोधा.",
        search_placeholder: "औषधाचे नाव शोधा (उदा. पॅरासिटामॉल, रेमडेसिविर), 'ऑक्सिजन' किंवा 'ओ-नेगेटिव्ह रक्त'...",
        quick_filters: "जलद फिल्टर्स:",
        filter_all: "🌐 सर्व साठा",
        filter_medicines: "💊 औषधे",
        filter_oxygen: "🫁 ऑक्सिजन सिलिंडर",
        filter_blood: "🩸 रक्तगट",
        filter_instock: "✅ फक्त उपलब्ध",
        nearby_title: "जवळील फार्मसी आणि पुरवठादार",
        loading_inventory: "साठा लोड होत आहे...",
        map_panel_title: "📍 नकाशा आणि प्रवासाचे अंतर",
        map_sorted_by: "प्रवासाच्या वेळेनुसार क्रमवारी",
        scanner_title: "मल्टीमोडल AI प्रिस्क्रिप्शन स्कॅनर",
        scanner_subtitle: "डॉक्टरांच्या हस्तलिखित प्रिस्क्रिप्शनचा फोटो अपलोड करा. Gemini AI द्वारे औषधांची नावे आपोआप शोधली जातील.",
        dropzone_title: "येथे प्रिस्क्रिप्शन फोटो टाका",
        dropzone_subtitle: "JPG, PNG, WEBP (जास्तीत जास्त 10MB)",
        browse_files: "फाईल निवडा",
        sample_title: "किंवा नमुना प्रिस्क्रिप्शन वापरून पहा:",
        sample_1: "📝 डॉ. शर्मा यांचे इमर्जन्सी पत्रक",
        sample_2: "🏥 आयसीयू वैद्यकीय तक्ता",
        auto_search_btn: "🔍 स्वयंचलित स्थानिक साठा शोधा",
        footer_text: "मेडकनेक्ट इमर्जन्सी हेल्थकेअर स्टॉक लोकेटर © २०२६. रिअल-टाईम कम्युनिटी प्लॅटफॉर्म.",
        footer_vendor_link: "फार्मसी विक्रेता पोर्टल",
        
        // Pharmacy Card Strings
        open_247: "२४/७ उघडे",
        call_store: "📞 कॉल करा",
        view_on_map: "📍 नकाशावर पहा",
        in_stock: "उपलब्ध",
        low_stock: "कमी साठा",
        out_of_stock: "साठा नाही",
        updated_just_now: "आत्ताच अपडेट केले",
        updated_ago: "पूर्वी",

        // Vendor Portal Strings
        vendor_title: "मेडकनेक्ट विक्रेता पोर्टल",
        vendor_subtitle: "रिअल-टाईम इन्व्हेंटरी व्यवस्थापक",
        synced_to_citizen: "नागरिक पोर्टलशी सिंक केलेले",
        back_to_citizen: "👈 नागरिक शोधाकडे परत जा",
        switch_pharmacy_label: "मेडिकल स्टोअर बदला:",
        sms_title: "💬 एसएमएस / व्हॉट्सॲप मेसेज द्वारे अपडेट",
        sms_desc: "लॉगिन न करता क्लाउड फंक्शन एसएमएस मेसेजद्वारे साठा अपडेट करा.",
        add_item_title: "➕ साठ्यात नवीन औषध जोडा",
        item_name_label: "औषध / साहित्याचे नाव",
        item_category_label: "वर्ग",
        category_med: "औषध / ड्रग",
        category_oxy: "ऑक्सिजन पुरवठा",
        category_blood: "रक्तगट युनिट",
        category_eq: "आयसीयू उपकरणे",
        quantity_label: "प्रमाण",
        unit_label: "एकक",
        price_label: "किंमत (रुपये)",
        publish_btn: "🚀 थेट लाईव्ह सर्चवर प्रकाशित करा",
        live_inventory_title: "लाइव्ह औषध साठा सूची",
        live_inventory_desc: "येथे केलेले बदल थेट नागरिक शोध स्क्रीनवर दिसतात.",
        th_item_name: "औषधाचे नाव",
        th_stock_qty: "साठा प्रमाण",
        th_price: "किंमत",
        th_status: "स्थिती",
        th_action: "कृती",
        mark_out_stock: "साठा संपला करा",
        mark_in_stock: "उपलब्ध करा",
        delete_btn: "🗑️ काढून टाका",
        auth_title: "🔐 विक्रेता पोर्टल प्रवेश",
        auth_desc: "साठा व्यवस्थापित करण्यासाठी लॉग इन करा. फायरबेस ऑथेंटिकेशन द्वारे सुरक्षित.",
        email_label: "फार्मसी ई-मेल",
        password_label: "पासवर्ड",
        signin_btn: "विक्रेता डॅशबोर्डवर प्रवेश करा"
    },
    hi: {
        brand_name: "मेडकनेक्ट",
        brand_tagline: "रियल-टाइम स्वास्थ्य दवा स्टॉक लोकेटर",
        live_sync: "लाइव रियल-टाइम सिंक",
        vendor_portal: "फार्मेसी पोर्टल लॉगिन",
        ai_scanner_btn: "📷 AI पर्चा स्कैनर",
        hero_title_1: "आपातकालीन चिकित्सा आपूर्ति पाएं",
        hero_title_2: "कुछ ही सेकंड में आपके पास",
        hero_desc: "नासिक की फार्मेसियों में तत्काल दवाओं, ऑक्सीजन सिलेंडर, आईसीयू उपकरण और दुर्लभ रक्त समूहों का लाइव रियल-टाइम स्टॉक खोजें।",
        search_placeholder: "दवा का नाम खोजें (जैसे पैरासिटामोल, रेमडेसिविर), 'ऑक्सीजन' या 'ओ-नेगेटिव ब्लड'...",
        quick_filters: "त्वरित फिल्टर:",
        filter_all: "🌐 सभी आपूर्ति",
        filter_medicines: "💊 दवाएं",
        filter_oxygen: "🫁 ऑक्सीजन सिलेंडर",
        filter_blood: "🩸 रक्त समूह",
        filter_instock: "✅ केवल उपलब्ध",
        nearby_title: "निकटतम फार्मेसी और आपूर्तिकर्ता",
        loading_inventory: "लाइव स्टॉक लोड हो रहा है...",
        map_panel_title: "📍 स्थानीय नक्शा और यात्रा की दूरी",
        map_sorted_by: "यात्रा के समय के अनुसार क्रमित",
        scanner_title: "मल्टीमॉडल AI प्रिस्क्रिप्शन स्कैनर",
        scanner_subtitle: "डॉक्टर के हस्तलिखित पर्चे की फोटो अपलोड करें। Gemini AI के माध्यम से दवाओं के नाम स्वचालित रूप से निकाले जाएंगे।",
        dropzone_title: "यहां पर्चे की फोटो खींचकर डालें",
        dropzone_subtitle: "समर्थित प्रारूप: JPG, PNG, WEBP (अधिकतम 10MB)",
        browse_files: "फ़ाइलें चुनें",
        sample_title: "या नमूना पर्चा आज़माएं:",
        sample_1: "📝 डॉ. शर्मा का इमरजेंसी पर्चा",
        sample_2: "🏥 आईसीयू मेडिकल चार्ट",
        auto_search_btn: "🔍 स्वचालित स्थानीय स्टॉक खोज चलाएं",
        footer_text: "मेडकनेक्ट आपातकालीन स्वास्थ्य स्टॉक लोकेटर © 2026। रियल-टाइम कम्युनिटी प्लेटफॉर्म।",
        footer_vendor_link: "फार्मेसी विक्रेता पोर्टल",
        
        // Pharmacy Card Strings
        open_247: "24/7 खुला है",
        call_store: "📞 कॉल करें",
        view_on_map: "📍 नक्शे पर देखें",
        in_stock: "उपलब्ध है",
        low_stock: "कम स्टॉक",
        out_of_stock: "स्टॉक में नहीं",
        updated_just_now: "अभी अपडेट किया गया",
        updated_ago: "पहले",

        // Vendor Portal Strings
        vendor_title: "मेडकनेक्ट विक्रेता पोर्टल",
        vendor_subtitle: "रियल-टाइम इन्वेंटरी प्रबंधक",
        synced_to_citizen: "नागरिक पोर्टल के साथ सिंक किया गया",
        back_to_citizen: "👈 नागरिक खोज पर वापस जाएं",
        switch_pharmacy_label: "प्रबंधित मेडिकल स्टोर बदलें:",
        sms_title: "💬 एसएमएस / व्हाट्सएप संदेश अपडेट",
        sms_desc: "बिना लॉगिन किए क्लाउड फ़ंक्शन एसएमएस वेबहुक के माध्यम से स्टॉक अपडेट करें।",
        add_item_title: "➕ स्टॉक में नई दवा जोड़ें",
        item_name_label: "दवा / सामग्री का नाम",
        item_category_label: "श्रेणी",
        category_med: "दवा / मेडिसिन",
        category_oxy: "ऑक्सीजन आपूर्ति",
        category_blood: "ब्लड यूनिट",
        category_eq: "आईसीयू उपकरण",
        quantity_label: "मात्रा",
        unit_label: "इकाई",
        price_label: "मूल्य (रुपये)",
        publish_btn: "🚀 लाइव नागरिक खोज पर प्रकाशित करें",
        live_inventory_title: "लाइव स्टॉक इन्वेंटरी",
        live_inventory_desc: "यहां किए गए परिवर्तन तुरंत नागरिक खोज परिणामों में दिखाई देते हैं।",
        th_item_name: "सामग्री का नाम",
        th_stock_qty: "स्टॉक मात्रा",
        th_price: "मूल्य",
        th_status: "स्थिति",
        th_action: "कार्रवाई",
        mark_out_stock: "स्टॉक समाप्त करें",
        mark_in_stock: "उपलब्ध चिह्नित करें",
        delete_btn: "🗑️ हटाएं",
        auth_title: "🔐 विक्रेता पोर्टल प्रमाणीकरण",
        auth_desc: "स्टॉक प्रबंधित करने के लिए साइन इन करें। फायरबेस प्रमाणीकरण द्वारा सुरक्षित।",
        email_label: "फार्मेसी ई-मेल",
        password_label: "पासवर्ड",
        signin_btn: "विक्रेता डैशबोर्ड में साइन इन करें"
    }
};

class I18nManager {
    constructor() {
        this.currentLang = localStorage.getItem('medconnect_lang') || 'en';
        this.init();
    }

    init() {
        document.documentElement.lang = this.currentLang;
        window.addEventListener('DOMContentLoaded', () => {
            this.applyTranslations();
            this.bindLanguageSelector();
        });
    }

    setLanguage(langCode) {
        if (TRANSLATIONS[langCode]) {
            this.currentLang = langCode;
            localStorage.setItem('medconnect_lang', langCode);
            document.documentElement.lang = langCode;
            this.applyTranslations();
            
            // Dispatch global event for components
            window.dispatchEvent(new CustomEvent('languageChanged', { detail: { lang: langCode } }));
        }
    }

    t(key) {
        return TRANSLATIONS[this.currentLang][key] || TRANSLATIONS['en'][key] || key;
    }

    applyTranslations() {
        const elements = document.querySelectorAll('[data-i18n]');
        elements.forEach(el => {
            const key = el.getAttribute('data-i18n');
            const translation = this.t(key);
            if (translation) {
                if (el.tagName === 'INPUT' && el.getAttribute('placeholder')) {
                    el.placeholder = translation;
                } else {
                    el.textContent = translation;
                }
            }
        });

        // Update active language selector option
        const selectors = document.querySelectorAll('.language-select');
        selectors.forEach(s => s.value = this.currentLang);
    }

    bindLanguageSelector() {
        const selectors = document.querySelectorAll('.language-select');
        selectors.forEach(s => {
            s.value = this.currentLang;
            s.addEventListener('change', (e) => {
                this.setLanguage(e.target.value);
            });
        });
    }
}

window.i18n = new I18nManager();
