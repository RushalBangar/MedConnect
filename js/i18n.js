/**
 * MedConnect - Internationalization (i18n) Module
 * Complete Translations for English (en), Marathi (mr - मराठी), and Hindi (hi - हिन्दी)
 */

const TRANSLATIONS = {
    en: {
        brand_name: "MedConnect",
        brand_tagline: "Real-Time Healthcare Stock Locator",
        live_sync: "LIVE REAL-TIME SYNC",
        vendor_portal: "Pharmacy Portal Login",
        ai_scanner_btn: "AI Prescription Scanner",
        hero_title_v2: "Emergency Medical Supply Locator V2",
        hero_desc: "Real-time local stock tracking for urgent medications, oxygen cylinders, ICU equipment, and rare blood groups across Nashik pharmacies.",
        search_placeholder: "Search medicine (e.g., Paracetamol, Remdesivir), Oxygen, or O-Negative Blood...",
        quick_filters: "Quick Filters:",
        filter_all: "All Supplies",
        filter_medicines: "Medicines",
        filter_oxygen: "Oxygen Cylinders",
        filter_blood: "Blood Groups",
        filter_instock: "In Stock Only",
        nearby_title: "Nearby Pharmacies & Suppliers",
        loading_inventory: "Loading live inventory...",
        map_panel_title: "Local Pharmacy Map & Route Distance",
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
        
        // Pharmacy Card & Map Strings from screen.png
        open_247: "24/7 Open",
        call_store: "📞 Call",
        get_directions: "↗️ Get Directions",
        view_on_map: "📍 View on Map",
        in_stock: "In Stock",
        low_stock: "Low Stock",
        out_of_stock: "Out of Stock",
        updated_just_now: "Updated Just now",
        updated_ago: "ago",
        mins: "min",
        km: "km",
        status: "Status",
        open: "Open",
        closed: "Closed",
        realtime: "Real-time",
        heatmap: "Heatmap",
        pharmacy_tag: "Pharmacy",
        bloodbank_tag: "Blood Bank",
        equipment_tag: "Equipment",
        satu: "Satu",
        amber: "Amber",

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
        signin_btn: "Sign In to Vendor Dashboard",

        units: {
            strips: "strips",
            vials: "vials",
            cylinders: "cylinders",
            units: "units",
            devices: "devices",
            pens: "pens",
            bottles: "bottles",
            syringes: "syringes",
            pieces: "pieces"
        },

        item_names: {
            "Paracetamol 650mg": "Paracetamol 650mg",
            "Paracetamol 850mg": "Paracetamol 850mg",
            "Remdesivir 100mg": "Remdesivir 100mg",
            "Oxygen Cylinder (B-Type)": "Oxygen Cylinder (B-Type)",
            "Fabiflu 400mg": "Fabiflu 400mg",
            "O-Negative Blood Unit": "O-Negative Blood Unit",
            "AB-Positive Blood Unit": "AB-Positive Blood Unit",
            "B-Positive Blood Unit": "B-Positive Blood Unit",
            "A-Positive Blood Unit": "A-Positive Blood Unit",
            "Platelet Concentrate": "Platelet Concentrate",
            "Oxygen Concentrator (10L)": "Oxygen Concentrator (10L)",
            "Oxygen Cylinder (D-Type Jumbo)": "Oxygen Cylinder (D-Type Jumbo)",
            "Portable Pulse Oximeter": "Portable Pulse Oximeter",
            "BiPAP Machine": "BiPAP Machine",
            "Insulin Glargine Pen": "Insulin Glargine Pen",
            "Azithromycin 500mg": "Azithromycin 500mg",
            "N95 Respirator Masks": "N95 Respirator Masks",
            "Enoxaparin 60mg Injection": "Enoxaparin 60mg Injection",
            "IV Saline Bottle (500ml)": "IV Saline Bottle (500ml)"
        },

        categories: {
            "Medication": "Medication",
            "Oxygen": "Oxygen",
            "Blood": "Blood",
            "Equipment": "Equipment"
        },

        pharmacies: {
            "Apollo Pharmacy 24/7": { name: "Apollo Pharmacy 24/7", address: "Apollo Pharmaava, Nashik" },
            "Sanjeevani Blood Bank & Medical": { name: "Sanjeevani Blood Bank & Medical", address: "Sanjeevani Birod, Nashik" },
            "Lifeline Oxygen & Emergency Supplies": { name: "Lifeline Oxygen & Emergency Supplies", address: "Gangapur Road, Near KTHM College, Nashik" },
            "Shree Medical & Wellness": { name: "Shree Medical & Wellness", address: "Panchavati Karanja, Nashik" },
            "Metro Emergency Chemist": { name: "Metro Emergency Chemist", address: "Dwarka Circle, Mumbai-Agra Highway, Nashik" }
        }
    },

    mr: {
        brand_name: "मेडकनेक्ट",
        brand_tagline: "रिअल-टाईम आरोग्य औषध साठा शोधक",
        live_sync: "लाइव्ह रिअल-टाईम सिंक",
        vendor_portal: "फार्मसी पोर्टल लॉगिन",
        ai_scanner_btn: "AI प्रिस्क्रिप्शन स्कॅनर",
        hero_title_v2: "इमर्जन्सी मेडिकल सप्लाय लोकेटर V2",
        hero_desc: "नाशिकमधील मेडिकल स्टोअर्समध्ये तातडीची औषधे, ऑक्सिजन सिलिंडर, आयसीयू उपकरणे आणि दुर्मिळ रक्तगटांचा रिअल-टाईम साठा शोधा.",
        search_placeholder: "औषधाचे नाव शोधा (उदा. पॅरासिटामॉल, रेमडेसिविर), ऑक्सिजन, किंवा ओ-नेगेटिव्ह रक्त...",
        quick_filters: "जलद फिल्टर्स:",
        filter_all: "सर्व साठा",
        filter_medicines: "औषधे",
        filter_oxygen: "ऑक्सिजन सिलिंडर",
        filter_blood: "रक्तगट",
        filter_instock: "फक्त उपलब्ध",
        nearby_title: "जवळील फार्मसी आणि पुरवठादार",
        loading_inventory: "साठा लोड होत आहे...",
        map_panel_title: "नकाशा आणि प्रवासाचे अंतर",
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
        
        // Pharmacy Card & Map Strings from screen.png
        open_247: "२४/७ उघडे",
        call_store: "📞 कॉल करा",
        get_directions: "↗️ दिशा मिळवा",
        view_on_map: "📍 नकाशावर पहा",
        in_stock: "उपलब्ध",
        low_stock: "कमी साठा",
        out_of_stock: "साठा नाही",
        updated_just_now: "आत्ताच अपडेट केले",
        updated_ago: "पूर्वी",
        mins: "मि",
        km: "किमी",
        status: "स्थिती",
        open: "उघडे",
        closed: "बंद",
        realtime: "रिअल-टाईम",
        heatmap: "हिटमॅप",
        pharmacy_tag: "फार्मसी",
        bloodbank_tag: "ब्लड बँक",
        equipment_tag: "उपकरणे",
        satu: "साटू",
        amber: "अंबर",

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
        signin_btn: "विक्रेता डॅशबोर्डवर प्रवेश करा",

        units: {
            strips: "स्ट्रिप्स",
            vials: "व्हाइल्स",
            cylinders: "सिलिंडर",
            units: "युनिट्स",
            devices: "उपकरणे",
            pens: "पेन",
            bottles: "बॉटल",
            syringes: "सिरिंजेस",
            pieces: "नग"
        },

        item_names: {
            "Paracetamol 650mg": "पॅरासिटामॉल ६५० एमजी",
            "Paracetamol 850mg": "पॅरासिटामॉल ८५० एमजी",
            "Remdesivir 100mg": "रेमडेसिविर १०० एमजी",
            "Oxygen Cylinder (B-Type)": "ऑक्सिजन सिलिंडर (बी-टाइप)",
            "Fabiflu 400mg": "फॅबीफ्लू ४०० एमजी",
            "O-Negative Blood Unit": "ओ-नेगेटिव्ह रक्त युनिट",
            "AB-Positive Blood Unit": "एबी-पॉझिटिव्ह रक्त युनिट",
            "B-Positive Blood Unit": "बी-पॉझिटिव्ह रक्त युनिट",
            "A-Positive Blood Unit": "ए-पॉझिटिव्ह रक्त युनिट",
            "Platelet Concentrate": "प्लेटलेट कॉन्सन्ट्रेट",
            "Oxygen Concentrator (10L)": "ऑक्सिजन कॉन्सन्ट्रेटर (१० लि)",
            "Oxygen Cylinder (D-Type Jumbo)": "ऑक्सिजन सिलिंडर (डी-टाइप जंबो)",
            "Portable Pulse Oximeter": "पोर्टेबल पल्स ऑक्सिमीटर",
            "BiPAP Machine": "बायपॅप मशीन",
            "Insulin Glargine Pen": "इन्सुलिन ग्लारजिन पेन",
            "Azithromycin 500mg": "अझिथ्रोमायसिन ५०० एमजी",
            "N95 Respirator Masks": "एन९५ रेस्पिरेटर मास्क",
            "Enoxaparin 60mg Injection": "इनोक्सापेरिन ६० एमजी इंजेक्शन",
            "IV Saline Bottle (500ml)": "आयव्ही सलाईन बॉटल (५०० मिली)"
        },

        categories: {
            "Medication": "औषध",
            "Oxygen": "ऑक्सिजन",
            "Blood": "रक्तगट",
            "Equipment": "उपकरणे"
        },

        pharmacies: {
            "Apollo Pharmacy 24/7": { name: "अपोलो फार्मसी २४/७", address: "अपोलो फार्माव्हा, नाशिक" },
            "Sanjeevani Blood Bank & Medical": { name: "संजीवनी ब्लड बँक आणि मेडिकल", address: "संजीवनी बिरोड, नाशिक" },
            "Lifeline Oxygen & Emergency Supplies": { name: "लाइफलाइन ऑक्सिजन आणि इमर्जन्सी सप्लाय", address: "गंगापूर रोड, केटीएचएम कॉलेज जवळ, नाशिक" },
            "Shree Medical & Wellness": { name: "श्री मेडिकल आणि वेलनेस", address: "पंचवटी कारंजा, नाशिक" },
            "Metro Emergency Chemist": { name: "मेट्रो इमर्जन्सी केमिस्ट", address: "द्वारका सर्कल, मुंबई-आग्रा हायवे, नाशिक" }
        }
    },

    hi: {
        brand_name: "मेडकनेक्ट",
        brand_tagline: "रियल-टाइम स्वास्थ्य दवा स्टॉक लोकेटर",
        live_sync: "लाइव रियल-टाइम सिंक",
        vendor_portal: "फार्मेसी पोर्टल लॉगिन",
        ai_scanner_btn: "AI पर्चा स्कैनर",
        hero_title_v2: "इमरजेंसी मेडिकल सप्लाई लोकेटर V2",
        hero_desc: "नासिक की फार्मेसियों में तत्काल दवाओं, ऑक्सीजन सिलेंडर, आईसीयू उपकरण और दुर्लभ रक्त समूहों का लाइव रियल-टाइम स्टॉक खोजें।",
        search_placeholder: "दवा का नाम खोजें (जैसे पैरासिटामोल, रेमडेसिविर), ऑक्सीजन, या ओ-नेगेटिव ब्लड...",
        quick_filters: "त्वरित फिल्टर:",
        filter_all: "सभी आपूर्ति",
        filter_medicines: "दवाएं",
        filter_oxygen: "ऑक्सीजन सिलेंडर",
        filter_blood: "रक्त समूह",
        filter_instock: "केवल उपलब्ध",
        nearby_title: "निकटतम फार्मेसी और आपूर्तिकर्ता",
        loading_inventory: "लाइव स्टॉक लोड हो रहा है...",
        map_panel_title: "स्थानीय नक्शा और यात्रा की दूरी",
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
        
        // Pharmacy Card & Map Strings from screen.png
        open_247: "24/7 खुला है",
        call_store: "📞 कॉल करें",
        get_directions: "↗️ दिशाएं पाएं",
        view_on_map: "📍 नक्शे पर देखें",
        in_stock: "उपलब्ध है",
        low_stock: "कम स्टॉक",
        out_of_stock: "स्टॉक में नहीं",
        updated_just_now: "अभी अपडेट किया गया",
        updated_ago: "पहले",
        mins: "मिनट",
        km: "किमी",
        status: "स्थिति",
        open: "खुला है",
        closed: "बंद",
        realtime: "रियल-टाइम",
        heatmap: "हीटमैप",
        pharmacy_tag: "फार्मेसी",
        bloodbank_tag: "ब्लड बैंक",
        equipment_tag: "उपकरण",
        satu: "साटू",
        amber: "अंबर",

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
        signin_btn: "विक्रेता डैशबोर्ड में साइन इन करें",

        units: {
            strips: "स्ट्रिप्स",
            vials: "वायल",
            cylinders: "सिलेंडर",
            units: "यूनिट",
            devices: "उपकरण",
            pens: "पेन",
            bottles: "बोतल",
            syringes: "सिरिंज",
            pieces: "नग"
        },

        item_names: {
            "Paracetamol 650mg": "पैरासिटामोल 650mg",
            "Paracetamol 850mg": "पैरासिटामोल 850mg",
            "Remdesivir 100mg": "रेमडेसिविर 100mg",
            "Oxygen Cylinder (B-Type)": "ऑक्सीजन सिलेंडर (बी-टाइप)",
            "Fabiflu 400mg": "फैबीफ्लू 400mg",
            "O-Negative Blood Unit": "ओ-नेगेटिव ब्लड यूनिट",
            "AB-Positive Blood Unit": "एबी-पॉजिटिव ब्लड यूनिट",
            "B-Positive Blood Unit": "बी-पॉजिटिव ब्लड यूनिट",
            "A-Positive Blood Unit": "ए-पॉजिटिव ब्लड यूनिट",
            "Platelet Concentrate": "प्लेटलेट कॉन्संट्रेट",
            "Oxygen Concentrator (10L)": "ऑक्सीजन कंसन्ट्रेटर (10L)",
            "Oxygen Cylinder (D-Type Jumbo)": "ऑक्सीजन सिलेंडर (डी-टाइप जंबो)",
            "Portable Pulse Oximeter": "पोर्टेबल पल्स ऑक्सीमीटर",
            "BiPAP Machine": "बायपैप मशीन",
            "Insulin Glargine Pen": "इंसुलिन ग्लार्गिन पेन",
            "Azithromycin 500mg": "एजिथ्रोमाइसिन 500mg",
            "N95 Respirator Masks": "एन95 रेस्पिरेटर मास्क",
            "Enoxaparin 60mg Injection": "इनोक्सापेरिन 60mg इंजेक्शन",
            "IV Saline Bottle (500ml)": "आईवी सलाइन बोतल (500ml)"
        },

        categories: {
            "Medication": "दवा",
            "Oxygen": "ऑक्सीजन",
            "Blood": "ब्लड ग्रुप",
            "Equipment": "उपकरण"
        },

        pharmacies: {
            "Apollo Pharmacy 24/7": { name: "अपोलो फार्मेसी 24/7", address: "अपोलो फार्मावा, नासिक" },
            "Sanjeevani Blood Bank & Medical": { name: "संजीवनी ब्लड बैंक एंड मेडिकल", address: "संजीवनी बिरोड, नासिक" },
            "Lifeline Oxygen & Emergency Supplies": { name: "लाइफलाइन ऑक्सीजन एंड इमरजेंसी सप्लाईज़", address: "गंगापुर रोड, केटीएचएम कॉलेज के पास, नासिक" },
            "Shree Medical & Wellness": { name: "श्री मेडिकल एंड वेलनेस", address: "पंचवटी कारंजा, नासिक" },
            "Metro Emergency Chemist": { name: "मेट्रो इमरजेंसी केमिस्ट", address: "द्वारका सर्कल, मुंबई-आगरा हाईवे, नासिक" }
        }
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

    toDevanagari(numStr) {
        if (this.currentLang !== 'mr' && this.currentLang !== 'hi') return String(numStr);
        const devDigits = ['०', '१', '२', '३', '४', '५', '६', '७', '८', '९'];
        return String(numStr).replace(/[0-9]/g, w => devDigits[parseInt(w, 10)]);
    }

    translateUnit(unitRaw) {
        if (!unitRaw) return '';
        const dict = TRANSLATIONS[this.currentLang].units || {};
        return dict[unitRaw.toLowerCase()] || unitRaw;
    }

    translateItemName(nameRaw) {
        if (!nameRaw) return '';
        const dict = TRANSLATIONS[this.currentLang].item_names || {};
        if (dict[nameRaw]) return dict[nameRaw];
        
        if (this.currentLang === 'mr') {
            return nameRaw
                .replace(/Paracetamol/gi, 'पॅरासिटामॉल')
                .replace(/Remdesivir/gi, 'रेमडेसिविर')
                .replace(/Oxygen/gi, 'ऑक्सिजन')
                .replace(/Cylinder/gi, 'सिलिंडर')
                .replace(/Blood Unit/gi, 'रक्त युनिट')
                .replace(/Injection/gi, 'इंजेक्शन')
                .replace(/Bottle/gi, 'बॉटल')
                .replace(/Mask/gi, 'मास्क')
                .replace(/Machine/gi, 'मशीन');
        } else if (this.currentLang === 'hi') {
            return nameRaw
                .replace(/Paracetamol/gi, 'पैरासिटामोल')
                .replace(/Remdesivir/gi, 'रेमडेसिविर')
                .replace(/Oxygen/gi, 'ऑक्सीजन')
                .replace(/Cylinder/gi, 'सिलेंडर')
                .replace(/Blood Unit/gi, 'ब्लड यूनिट')
                .replace(/Injection/gi, 'इंजेक्शन')
                .replace(/Bottle/gi, 'बोतल')
                .replace(/Mask/gi, 'मास्क')
                .replace(/Machine/gi, 'मशीन');
        }
        return nameRaw;
    }

    translateCategory(catRaw) {
        if (!catRaw) return '';
        const dict = TRANSLATIONS[this.currentLang].categories || {};
        return dict[catRaw] || catRaw;
    }

    translatePharmacy(pharmObj) {
        if (!pharmObj) return pharmObj;
        const dict = TRANSLATIONS[this.currentLang].pharmacies || {};
        const match = dict[pharmObj.name];
        if (match) {
            return {
                ...pharmObj,
                name: match.name,
                address: match.address
            };
        }
        return pharmObj;
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

        const selectors = document.querySelectorAll('.language-select');
        selectors.forEach(s => s.value = this.currentLang);
    }

    bindLanguageSelector() {
        const selectors = document.querySelectorAll('.language-select');
        selectors.forEach(s => {
            s.value = this.currentLang;
            s.onchange = (e) => {
                this.setLanguage(e.target.value);
            };
        });
    }
}

window.i18n = new I18nManager();
