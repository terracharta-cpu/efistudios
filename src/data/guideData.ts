import { Category, GuideItem, PropertySettings } from '../types/guide';

export const initialCategories: Category[] = [
  {
    id: 'welcome',
    name_el: 'Άφιξη',
    name_en: 'Check-in',
    subtitle_el: 'Οδηγίες άφιξης & καλωσορίσματος',
    subtitle_en: 'Arrival instructions & welcome tips',
    icon: 'Key',
    sort_order: 1,
    bg_image: '/images/categories/welcome.jpg',
  },
  {
    id: 'wifi',
    name_el: 'Wi-Fi',
    name_en: 'Wi-Fi',
    subtitle_el: 'Πρόσβαση στο Internet',
    subtitle_en: 'Internet Access',
    icon: 'Wifi',
    sort_order: 2,
    bg_image: '/images/categories/wifi.jpg',
  },
  {
    id: 'room_guide',
    name_el: 'Οδηγός Δωματίου',
    name_en: 'Rooms Guide',
    subtitle_el: 'A/C, ζεστό νερό & συσκευές',
    subtitle_en: 'A/C, hot water & appliances',
    icon: 'Bed',
    sort_order: 3,
    bg_image: '/images/categories/rooms.jpg',
  },
  {
    id: 'facilities',
    name_el: 'Παροχές Καταλύματος',
    name_en: 'Facilities',
    subtitle_el: 'Κήπος, πάρκινγκ & ανέσεις',
    subtitle_en: 'Garden, parking & amenities',
    icon: 'Waves',
    sort_order: 4,
    bg_image: '/images/categories/facilities.jpg',
  },
  {
    id: 'dining',
    name_el: 'Πρωινό & Φαγητό',
    name_en: 'Breakfast & Dining',
    subtitle_el: 'Προτάσεις για φαγητό & καφέ',
    subtitle_en: 'Dining & breakfast recommendations',
    icon: 'Utensils',
    sort_order: 5,
    bg_image: '/images/categories/dining.jpg',
  },
  {
    id: 'housekeeping',
    name_el: 'Καθαριότητα & Εξυπηρέτηση',
    name_en: 'Housekeeping & Services',
    subtitle_el: 'Πρόγραμμα καθαριότητας & πετσέτες',
    subtitle_en: 'Cleaning schedule & linens',
    icon: 'Sparkles',
    sort_order: 6,
    bg_image: '/images/categories/housekeeping.jpg',
  },
  {
    id: 'discover_paros',
    name_el: 'Γνωρίστε την Πάρο',
    name_en: 'Discover Paros',
    subtitle_el: 'Παραλίες, γραφικά χωριά & αξιοθέατα',
    subtitle_en: 'Beaches, scenic villages & sights',
    icon: 'Anchor',
    sort_order: 7,
    bg_image: '/images/categories/paros.jpg',
  },
  {
    id: 'useful_info',
    name_el: 'Χρήσιμες Πληροφορίες',
    name_en: 'Useful Information',
    subtitle_el: 'Φαρμακεία, λεωφορεία & ενοικιάσεις',
    subtitle_en: 'Pharmacies, buses & rentals',
    icon: 'Info',
    sort_order: 8,
    bg_image: '/images/categories/info.jpg',
  },
  {
    id: 'checkout',
    name_el: 'Αναχώρηση',
    name_en: 'Check-out',
    subtitle_el: 'Ώρες, κλειδιά & φύλαξη αποσκευών',
    subtitle_en: 'Hours, keys & luggage storage',
    icon: 'LogOut',
    sort_order: 9,
    bg_image: '/images/categories/checkout.jpg',
  },
];

export const defaultPropertySettings: PropertySettings = {
  property_name: 'Efi Studios - Paros',
  location_name_el: 'Δρυός, Πάρος',
  location_name_en: 'Drios, Paros',
  wifi_ssid: 'EfiStudios_Guest',
  wifi_password: 'ParosSummer2025!',
  phone_primary: '+30 22840 41015',
  phone_secondary: '+30 6942 422511',
  mobile_secondary: '+30 6942 402355',
  whatsapp_number: '+306942422511',
  viber_number: '+306942422511',
  email: 'anna@efistudios.gr',
  website_url: 'https://www.efistudios.gr/el/',
  tripadvisor_url:
    'https://www.tripadvisor.com.gr/Hotel_Review-g1066347-d2709783-Reviews-Efi_Studios_Apartments-Drios_Paros_Cyclades_South_Aegean.html',
  google_reviews_url:
    'https://www.google.com/maps/place/Efi+Studios/@37.0094,25.2155,17z/data=!4m8!3m7!1s0x149854b85f3fba43:0xa85b379864fa9f5f!8m2!3d37.0094!4d25.2155!9m1!1b1',
  google_maps_url: 'https://maps.google.com/?q=Drios+Paros+Cyclades',
  address_el: 'Δρυός, Πάρος 84400',
  address_en: 'Drios, Paros 84400',
  check_in_time: '15:00',
  check_out_time: '11:00',
  emergency_police: '+30 22840 23333 (Αστυνομικό Τμήμα Πάρου)',
  emergency_health_center: '+30 22843 60000 (Κέντρο Υγείας Παροικιάς)',
  emergency_pharmacy: '+30 22840 41555 (Φαρμακείο Μάρπησσας / Δρυού)',
};

export const initialGuideItems: GuideItem[] = [
  // 1. WELCOME & CHECK-IN
  {
    id: 'item-welcome-1',
    category_id: 'welcome',
    title_el: 'Καλώς ήρθατε στα Efi Studios!',
    title_en: 'Welcome to Efi Studios!',
    content_el:
      'Σας ευχόμαστε μια αξέχαστη και γαλήνια διαμονή στην πανέμορφη Πάρο! Το κατάλυμά μας συνδυάζει την παραδοσιακή κυκλαδίτικη φιλοξενία με όλες τις σύγχρονες ανέσεις. Βρισκόμαστε δίπλα σας για οτιδήποτε χρειαστείτε.',
    content_en:
      'We warmly welcome you to beautiful Paros! Our studios blend authentic Cycladic hospitality with modern comforts. We are always at your disposal to make your stay memorable and relaxing.',
    image: null,
    has_image: false,
    is_active: true,
    sort_order: 1,
    badge_el: 'Καλωσόρισμα',
    badge_en: 'Welcome',
  },
  {
    id: 'item-welcome-2',
    category_id: 'welcome',
    title_el: 'Ώρες & Διαδικασία Άφιξης (Check-in)',
    title_en: 'Check-in Hours & Instructions',
    content_el:
      '• Ώρα Check-in: από τις 15:00.\n• Σε περίπτωση πρόωρης άφιξης, μπορείτε να αφήσετε με ασφάλεια τις αποσκευές σας στο χώρο υποδοχής.\n• Παραλαβή κλειδιών: Είτε προσωπικά από την υποδοχή είτε μέσω της θυρίδας κλειδιών (keybox) με τον προσωπικό κωδικό που σας έχουμε αποστείλει.',
    content_en:
      '• Check-in time: from 15:00 onwards.\n• Early arrival: You can safely store your luggage at our reception area.\n• Key collection: Personally at reception or via the secure keybox using the code sent to your message.',
    image: null,
    has_image: false,
    is_active: true,
    sort_order: 2,
    badge_el: 'Check-in: 15:00',
    badge_en: 'Check-in: 15:00',
  },

  // 2. WI-FI
  {
    id: 'item-wifi-1',
    category_id: 'wifi',
    title_el: 'Υπερυψηλής Ταχύτητας Wi-Fi (VDSL / Fiber)',
    title_en: 'High-Speed Wi-Fi (VDSL / Fiber)',
    content_el:
      'Απολαύστε δωρεάν απεριόριστο internet σε όλους τους εσωτερικούς χώρους και στους κήπους του καταλύματος.\n\n• Όνομα Δικτύου (SSID): EfiStudios_Guest\n• Κωδικός Πρόσβασης: ParosSummer2025!\n\nΠατήστε το κουμπί παρακάτω για αυτόματη αντιγραφή του κωδικού στη συσκευή σας.',
    content_en:
      'Enjoy complimentary fast Wi-Fi in all studios, verandas, and garden areas.\n\n• Network Name (SSID): EfiStudios_Guest\n• Password: ParosSummer2025!\n\nClick the button below to copy the password instantly to your clipboard.',
    image: null,
    has_image: false,
    is_active: true,
    sort_order: 1,
    badge_el: 'Δωρεάν Wi-Fi',
    badge_en: 'Free Wi-Fi',
  },

  // 3. ROOM GUIDE
  {
    id: 'item-room-1',
    category_id: 'room_guide',
    title_el: 'Κλιματισμός (A/C) & Οικολογική Χρήση',
    title_en: 'Air Conditioning (A/C) & Eco Guidelines',
    content_el:
      'Κάθε δωμάτιο διαθέτει αυτόνομο σύγχρονο κλιματισμό Inverter.\n• Συνιστώμενη θερμοκρασία ψύξης: 24°C - 26°C.\n• Παρακαλούμε βεβαιωθείτε ότι οι πόρτες και τα παράθυρα είναι κλειστά κατά τη λειτουργία του κλιματιστικού.\n• Όταν αποχωρείτε από το δωμάτιο, απενεργοποιήστε το A/C για εξοικονόμηση ενέργειας και προστασία του κυκλαδίτικου περιβάλλοντος.',
    content_en:
      'Each studio is equipped with an autonomous Inverter A/C unit.\n• Recommended cooling temperature: 24°C - 26°C.\n• Please make sure doors and windows are closed when A/C is active.\n• Kindly turn off the unit when leaving your room to protect the island environment and conserve energy.',
    image: null,
    has_image: false,
    is_active: true,
    sort_order: 1,
  },
  {
    id: 'item-room-2',
    category_id: 'room_guide',
    title_el: 'Ζεστό Νερό & Ηλιακός Θερμοσίφωνας',
    title_en: 'Hot Water & Solar Heating',
    content_el:
      'Το κατάλυμα διαθέτει οικολογικό ηλιακό θερμοσίφωνα που παρέχει άφθονο ζεστό νερό καθ\' όλη τη διάρκεια της ημέρας.\nΣε ημέρες με συννεφιά, ο διακόπτης του θερμοσίφωνα βρίσκεται στον κεντρικό ηλεκτρικό πίνακα. Χρειάζονται μόνο 15-20 λεπτά για να ζεσταθεί το νερό. Παρακαλούμε απενεργοποιήστε τον μετά τη χρήση.',
    content_en:
      'Our property uses solar water heating providing hot water throughout sunny days.\nOn cloudy days, you can activate the water heater switch inside your studio electrical panel. It heats up in 15-20 minutes. Please switch it off after use.',
    image: null,
    has_image: false,
    is_active: true,
    sort_order: 2,
  },
  {
    id: 'item-room-3',
    category_id: 'room_guide',
    title_el: 'Κουζίνα & Συσκευές',
    title_en: 'Kitchenette & Appliances',
    content_el:
      'Το στούντιο είναι εξοπλισμένο με ψυγείο, εστίες μαγειρέματος, βραστήρα, καφετιέρα και βασικά μαγειρικά σκεύη.\nΠαρακαλούμε μην αφήνετε αναμμένες τις εστίες χωρίς επίβλεψη.',
    content_en:
      'Your studio is equipped with a refrigerator, cooking stovetop, kettle, coffee maker, and basic cookware.\nPlease do not leave stovetops unattended while cooking.',
    image: null,
    has_image: false,
    is_active: true,
    sort_order: 3,
  },

  // 4. FACILITIES (Exact Data from user image)
  {
    id: 'item-facilities-1',
    category_id: 'facilities',
    title_el: 'Όλα τα δωμάτια είναι πλήρως εξοπλισμένα με:',
    title_en: 'All rooms are fully equipped with:',
    content_el:
      '• Κλιματισμός\n• TV\n• Εστίες\n• Ζεστό νερό (όλη την ημέρα)\n• Ψυγείο\n• Καφετιέρα\n• Βραστήρα\n• Τοστιέρα\n• Χρηματοκιβώτιο\n• Σεσουάρ\n• Σίδερο και σιδερώστρα\n• Φούρνος μικροκυμάτων',
    content_en:
      '• Air Conditioning\n• TV\n• Stovetop\n• Hot water (all day)\n• Refrigerator\n• Coffee Maker\n• Kettle\n• Toaster\n• Safe box\n• Hairdryer\n• Iron & ironing board\n• Microwave oven',
    image: null,
    has_image: false,
    is_active: true,
    sort_order: 1,
    badge_el: 'Πλήρης Εξοπλισμός',
    badge_en: 'Full Amenities',
  },
  {
    id: 'item-facilities-2',
    category_id: 'facilities',
    title_el: 'Τα Στούντιο και Διαμερίσματα έχουν επίσης:',
    title_en: 'Studios & Apartments also feature:',
    content_el:
      '• Εστίες ή μικρή ηλεκτρική κουζίνα\n• Μαγειρικά σκεύη',
    content_en:
      '• Stovetop or small electric kitchen\n• Cookware & utensils',
    image: null,
    has_image: false,
    is_active: true,
    sort_order: 2,
    badge_el: 'Κουζίνα',
    badge_en: 'Kitchen',
  },
  {
    id: 'item-facilities-3',
    category_id: 'facilities',
    title_el: 'Σεντόνια και πετσέτες',
    title_en: 'Linens and Towels',
    content_el:
      'Όλα τα δωμάτια καθαρίζονται καθημερινά. Οι πετσέτες αλλάζονται κάθε δύο ημέρες και τα σεντόνια κάθε τρεις ημέρες.',
    content_en:
      'All rooms are cleaned daily. Towels are changed every two days and linens every three days.',
    image: null,
    has_image: false,
    is_active: true,
    sort_order: 3,
    badge_el: 'Καθαριότητα',
    badge_en: 'Housekeeping',
  },
  {
    id: 'item-facilities-4',
    category_id: 'facilities',
    title_el: 'Πλυντήριο',
    title_en: 'Laundry & Ironing',
    content_el:
      'Πλύσιμο ρούχων και σιδερωτήριο. Παρέχεται δωρεάν πλυντήριο και σιδερωτήριο καθώς και απορρυπαντικά προς χρήση από τους πελάτες.',
    content_en:
      'Laundry and ironing facilities. Free washing machine, ironing board, and complimentary detergents are available for guest use.',
    image: null,
    has_image: false,
    is_active: true,
    sort_order: 4,
    badge_el: 'Δωρεάν Παροχή',
    badge_en: 'Free Facility',
  },
  {
    id: 'item-facilities-5',
    category_id: 'facilities',
    title_el: 'Ψησταριά',
    title_en: 'Barbeque (BBQ)',
    content_el:
      'Κοινόχρηστη κτιστή ψησταριά για τα δικά σας καλοκαιρινά γεύματα, υπάρχει στην πίσω αυλή.',
    content_en:
      'Shared built-in BBQ for your summer cookouts, located in the back courtyard.',
    image: null,
    has_image: false,
    is_active: true,
    sort_order: 5,
    badge_el: 'Πίσω Αυλή',
    badge_en: 'Back Courtyard',
  },
  {
    id: 'item-facilities-6',
    category_id: 'facilities',
    title_el: 'Φαγητό',
    title_en: 'Dining & Takeaway',
    content_el:
      'Μπορείτε να παραγγείλετε φαγητό σε πακέτο από το εστιατόριο της Άννας καθ\' όλη τη διάρκεια της ημέρας. Ακόμη μπορείτε να κάνετε ειδικές παραγγελίες εκτός μενού. Ισχύουν οι τιμές εστιατορίου.',
    content_en:
      'You can order takeaway food from Anna\'s restaurant throughout the day. Special off-menu orders can also be requested. Regular restaurant prices apply.',
    image: null,
    has_image: false,
    is_active: true,
    sort_order: 6,
    badge_el: 'Εστιατόριο Άννα',
    badge_en: 'Anna Restaurant',
  },
  {
    id: 'item-facilities-7',
    category_id: 'facilities',
    title_el: 'Πάρκινγκ',
    title_en: 'Parking',
    content_el:
      'Ο ήσυχος δρόμος μπροστά από τα ενοικιαζόμενα δωμάτια προσφέρει άφθονο χώρο στάθμευσης.',
    content_en:
      'The quiet street in front of the rooms offers ample free parking space.',
    image: null,
    has_image: false,
    is_active: true,
    sort_order: 7,
    badge_el: 'Δωρεάν Parking',
    badge_en: 'Free Parking',
  },
  {
    id: 'item-facilities-8',
    category_id: 'facilities',
    title_el: 'Παιδική χαρά',
    title_en: 'Children\'s Playground',
    content_el:
      'Παιδική χαρά θα βρείτε απέναντι από τα ενοικιαζόμενα δωμάτια, περιτριγυρισμένη από ψηλά δέντρα για σκιά – για δημιουργική και ξέγνοιαστη απασχόληση για τα παιδιά.',
    content_en:
      'A children\'s playground is located directly opposite the rooms, shaded by tall trees – for creative and carefree playtime for kids.',
    image: null,
    has_image: false,
    is_active: true,
    sort_order: 8,
    badge_el: 'Για παιδιά',
    badge_en: 'Family Friendly',
  },
  {
    id: 'item-facilities-9',
    category_id: 'facilities',
    title_el: 'Internet',
    title_en: 'Internet',
    content_el:
      'Υπάρχει δωρεάν Wi-Fi πρόσβαση στο Internet σε όλα τα δωμάτια και στον κήπο.',
    content_en:
      'Free Wi-Fi internet access is available throughout all rooms and the garden.',
    image: null,
    has_image: false,
    is_active: true,
    sort_order: 9,
    badge_el: 'Δωρεάν Wi-Fi',
    badge_en: 'Free Wi-Fi',
  },

  // 5. DINING & BREAKFAST
  {
    id: 'item-dining-1',
    category_id: 'dining',
    title_el: 'Πρωινό & Παραδοσιακοί Φούρνοι',
    title_en: 'Breakfast & Traditional Bakeries',
    content_el:
      '• Φούρνος του Δρυού (500μ): Φρέσκο ζυμωτό ψωμί, παραδοσιακή παριανή τυρόπιτα και λαχταριστά κρουασάν.\n• To Steki Café: Ιδανικό για πλούσιο πρωινό, eggs benedict και specialty coffee δίπλα στη θάλασσα.',
    content_en:
      '• Drios Traditional Bakery (500m): Authentic sourdough bread, local cheese pies, and fresh pastries.\n• To Steki Café: Perfect for brunch, Greek eggs, fresh orange juice, and specialty coffee by the seaside.',
    image: null,
    has_image: false,
    is_active: true,
    sort_order: 1,
  },
  {
    id: 'item-dining-2',
    category_id: 'dining',
    title_el: 'Κορυφαίες Ταβέρνες & Εστιατόρια στην Πάρο',
    title_en: 'Top Tavernas & Restaurants in Paros',
    content_el:
      '• Ταβέρνα Άννα (Δρυός): Αυθεντική παριανή κουζίνα, φρέσκο ψάρι και τοπικά πιάτα με θέα τη θάλασσα.\n• Barbarossa & Mario (Νάουσα): High-end θαλασσινά και κοσμοπολίτικη ατμόσφαιρα στο γραφικό λιμανάκι.\n• Siparos Seaside Restaurant (Σάντα Μαρία): Δημιουργική κυκλαδίτικη γαστρονομία με μαγευτικό ηλιοβασίλεμα.\n• Το Κλαρίνο (Λεύκες): Παραδοσιακά ψητά, ρεβιθάδα φούρνου και σπιτικές πίτες στο γραφικό ορεινό χωριό.',
    content_en:
      '• Anna Taverna (Drios): Authentic Parian recipes, fresh daily catch, and seaside charm.\n• Barbarossa & Mario (Naoussa): High-end seafood and cosmopolitan vibes at the historic Venetian harbor.\n• Siparos Seaside (Santa Maria): Refined Cycladic gastronomy accompanied by sensational sunset views.\n• To Klarino (Lefkes village): Traditional grill, wood-oven chickpeas (revithada), and home pies in the mountain village.',
    image: null,
    has_image: false,
    is_active: true,
    sort_order: 2,
    badge_el: 'Προτάσεις',
    badge_en: 'Recommendations',
  },

  // 6. HOUSEKEEPING & SERVICES
  {
    id: 'item-housekeeping-1',
    category_id: 'housekeeping',
    title_el: 'Πρόγραμμα Καθαριότητας & Αλλαγή Κλινοσκεπασμάτων',
    title_en: 'Housekeeping Schedule & Linens Change',
    content_el:
      '• Όλα τα δωμάτια καθαρίζονται καθημερινά (10:00 - 14:00).\n• Οι πετσέτες αλλάζονται κάθε δύο ημέρες και τα σεντόνια κάθε τρεις ημέρες.\n• Προστασία Περιβάλλοντος: Αν επιθυμείτε άμεση αλλαγή πετσετών, αφήστε τις στο δάπεδο του μπάνιου.',
    content_en:
      '• All rooms are cleaned daily (10:00 - 14:00).\n• Towels are changed every two days and bed linens every three days.\n• Eco note: If you require fresh towels, please leave the used ones on the bathroom floor.',
    image: null,
    has_image: false,
    is_active: true,
    sort_order: 1,
    badge_el: 'Καθημερινά',
    badge_en: 'Daily',
  },
  {
    id: 'item-housekeeping-2',
    category_id: 'housekeeping',
    title_el: 'Πετσέτες Θαλάσσης & Σίδερο / Σιδερώστρα',
    title_en: 'Beach Towels & Ironing Amenities',
    content_el:
      '• Παρακαλούμε μην χρησιμοποιείτε τις λευκές πετσέτες του μπάνιου στην παραλία.\n• Διατίθενται ειδικές πετσέτες θαλάσσης στην υποδοχή κατόπιν συνεννόησης.\n• Σίδερο και σιδερώστρα διατίθενται δωρεάν για χρήση στο δωμάτιό σας.',
    content_en:
      '• Please do not take the white bathroom towels to the beach.\n• Dedicated beach towels are available upon request at reception.\n• Iron & ironing board can be provided free of charge for your room.',
    image: null,
    has_image: false,
    is_active: true,
    sort_order: 2,
  },

  // 7. DISCOVER PAROS
  {
    id: 'item-paros-1',
    category_id: 'discover_paros',
    title_el: 'Οι Καλύτερες Παραλίες της Πάρου',
    title_en: 'Top Beaches in Paros',
    content_el:
      '• Χρυσή Ακτή (Golden Beach - 3 λεπτά): Παγκοσμίου φήμης χρυσή αμμουδιά, windsurfing, beach bars και κρυστάλλινα νερά.\n• Κολυμπήθρες (Κοντά στη Νάουσα): Μοναδικοί γρανιτένιοι βράχοι που θυμίζουν σεληνιακό τοπίο.\n• Φάραγγας (Νότια Πάρος): Προστατευμένος απάνεμος κόλπος με καταπράσινα νερά και premium sunbeds.\n• Σάντα Μαρία: Ζωντανή ατμόσφαιρα, watersports και ρηχά τιρκουάζ νερά ιδανικά για όλους.',
    content_en:
      '• Golden Beach (Chrissi Akti - 3 min): World-famous golden sands, windsurfing hotspot, premium beach bars.\n• Kolymbithres (Naoussa): Lunar-like granite rock formations sculpted by sea and wind.\n• Faragas (South): Sheltered cove with emerald calm waters and fine amenities.\n• Santa Maria: Vibrant beach clubs, watersports, and crystal turquoise waters.',
    image: null,
    has_image: false,
    is_active: true,
    sort_order: 1,
    badge_el: 'Παραλίες',
    badge_en: 'Top Beaches',
  },
  {
    id: 'item-paros-2',
    category_id: 'discover_paros',
    title_el: 'Γραφικά Χωριά & Αξιοθέατα',
    title_en: 'Scenic Villages & Highlights',
    content_el:
      '• Λεύκες: Το ομορφότερο ορεινό χωριό με πλακόστρωτα σοκάκια, νεοκλασικά αρχοντικά και το βυζαντινό μονοπάτι.\n• Νάουσα: Το γραφικό ενετικό λιμάνι με τα παλιά καρνάγια, τα μπαράκια και τα κομψά σοκάκια.\n• Παροικιά & Παναγία Εκατονταπυλιανή: Η ιστορική πρωτεύουσα με το παλαιότερο σωζόμενο παλαιοχριστιανικό μνημείο της Ελλάδας.\n• Αντίπαρος: Μόλις 7 λεπτά με το καραβάκι από την Πούντα για ημερήσια εκδρομή στο σπήλαιο και τα μυστικά σοκάκια.',
    content_en:
      '• Lefkes: The picturesque mountain village with marble alleys, neoclassical mansions, and the Byzantine path.\n• Naoussa: The iconic Venetian fishing harbor, cosmopolitan nightlife, and boutique alleys.\n• Parikia & Panagia Ekatontapyliani: The historic capital housing one of the oldest Byzantine churches in Greece.\n• Antiparos: Only a 7-minute ferry from Pounda, ideal for a day trip to explore the cave and secluded beaches.',
    image: null,
    has_image: false,
    is_active: true,
    sort_order: 2,
  },

  // 8. USEFUL INFORMATION
  {
    id: 'item-useful-1',
    category_id: 'useful_info',
    title_el: 'Συγκοινωνίες, Λεωφορεία (ΚΤΕΛ) & Ταξί',
    title_en: 'Public Transport (KTEL Buses) & Taxis',
    content_el:
      '• Στάση Λεωφορείου Δρυού: 350 μέτρα από το κατάλυμα με τακτικά δρομολόγια προς Παροικιά, Νάουσα και Χρυσή Ακτή.\n• Κεντρικός Σταθμός Ταξί Παροικιάς: +30 22840 21500\n• Σταθμός Ταξί Νάουσας: +30 22840 51496\n• Ενοικιάσεις Αυτοκινήτων / Μηχανών: Συνεργαζόμαστε με τοπικά γραφεία ενοικίασης με παράδοση στο studio. Ρωτήστε μας στην υποδοχή!',
    content_en:
      '• Drios Bus Stop: 350m from studios with frequent connections to Parikia, Naoussa, and Golden Beach.\n• Parikia Taxi Station: +30 22840 21500\n• Naoussa Taxi Station: +30 22840 51496\n• Car / Scooter Rental: We partner with trusted local rental agencies offering studio delivery. Ask reception!',
    image: null,
    has_image: false,
    is_active: true,
    sort_order: 1,
  },
  {
    id: 'item-useful-2',
    category_id: 'useful_info',
    title_el: 'Φαρμακεία, Ιατρική Βοήθεια & Έκτακτη Ανάγκη',
    title_en: 'Pharmacies, Medical Help & Emergencies',
    content_el:
      '• Κέντρο Υγείας Πάρου (Παροικιά): +30 22843 60000 (24ωρη λειτουργία)\n• Εθνικό Κέντρο Άμεσης Βοήθειας (ΕΚΑΒ): 166\n• Κοντινότερο Φαρμακείο (Μάρπησσα / Δρυός): +30 22840 41555\n• Αστυνομικό Τμήμα Πάρου: +30 22840 23333 / 100\n• Πυροσβεστική Υπηρεσία: 199\n• Λιμεναρχείο Πάρου: +30 22840 21240',
    content_en:
      '• Paros Health Center (Parikia): +30 22843 60000 (24/7 service)\n• National Ambulance Emergency: 166\n• Closest Pharmacy (Marpissa / Drios): +30 22840 41555\n• Paros Police Station: +30 22840 23333 / 100\n• Fire Department: 199\n• Paros Port Authority: +30 22840 21240',
    image: null,
    has_image: false,
    is_active: true,
    sort_order: 2,
    badge_el: 'Έκτακτη Ανάγκη',
    badge_en: 'Emergency',
  },

  // 9. CHECK-OUT
  {
    id: 'item-checkout-1',
    category_id: 'checkout',
    title_el: 'Ώρες & Διαδικασία Αναχώρησης (Check-out)',
    title_en: 'Check-out Policy & Process',
    content_el:
      '• Ώρα Check-out: έως τις 11:00 π.μ.\n• Παράδοση κλειδιού: Παρακαλούμε παραδώστε το κλειδί στην υποδοχή ή αφήστε το στην κλειδαριά της πόρτας του δωματίου σας.\n• Φύλαξη Αποσκευών: Εάν η αναχώρηση του πλοίου ή της πτήσης σας είναι αργότερα μέσα στην ημέρα, μπορείτε να φυλάξετε τις αποσκευές σας δωρεάν στον ειδικό χώρο μας.\n• Late Check-out: Παρέχεται κατόπιν συνεννόησης και βάσει διαθεσιμότητας.',
    content_en:
      '• Check-out time: by 11:00 AM.\n• Key return: Please return the key to reception or leave it on the room door lock.\n• Luggage Storage: If your ferry or flight departs later, you can store your luggage safely at no extra charge.\n• Late Check-out: Subject to availability upon prior arrangement with management.',
    image: null,
    has_image: false,
    is_active: true,
    sort_order: 1,
    badge_el: 'Έως τις 11:00',
    badge_en: 'Until 11:00',
  },
];
