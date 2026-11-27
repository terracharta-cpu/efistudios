-- ==============================================================================
-- EFI STUDIOS PAROS - DIGITAL GUEST GUIDE
-- Supabase Schema & Seed Data Script
-- ==============================================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. CREATE CATEGORIES TABLE
CREATE TABLE IF NOT EXISTS categories (
  id TEXT PRIMARY KEY,
  name_el TEXT NOT NULL,
  name_en TEXT NOT NULL,
  subtitle_el TEXT,
  subtitle_en TEXT,
  icon TEXT NOT NULL,
  sort_order INTEGER NOT NULL DEFAULT 0,
  bg_image TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE categories ADD COLUMN IF NOT EXISTS bg_image TEXT;

-- 3. CREATE GUIDE ITEMS TABLE
CREATE TABLE IF NOT EXISTS guide_items (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::TEXT,
  category_id TEXT NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
  title_el TEXT NOT NULL,
  title_en TEXT NOT NULL,
  content_el TEXT NOT NULL,
  content_en TEXT NOT NULL,
  image TEXT,
  has_image BOOLEAN DEFAULT FALSE,
  is_active BOOLEAN DEFAULT TRUE,
  sort_order INTEGER NOT NULL DEFAULT 0,
  badge_el TEXT,
  badge_en TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. CREATE PROPERTY SETTINGS TABLE
CREATE TABLE IF NOT EXISTS property_settings (
  id TEXT PRIMARY KEY,
  key TEXT UNIQUE NOT NULL,
  value TEXT NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. ENABLE ROW LEVEL SECURITY (RLS)
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE guide_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE property_settings ENABLE ROW LEVEL SECURITY;

-- 6. RLS POLICIES: PUBLIC READ ACCESS FOR GUESTS
DROP POLICY IF EXISTS "Public can view active categories" ON categories;
CREATE POLICY "Public can view active categories"
  ON categories FOR SELECT
  USING (true);

DROP POLICY IF EXISTS "Public can view active guide items" ON guide_items;
CREATE POLICY "Public can view active guide items"
  ON guide_items FOR SELECT
  USING (true);

DROP POLICY IF EXISTS "Public can view property settings" ON property_settings;
CREATE POLICY "Public can view property settings"
  ON property_settings FOR SELECT
  USING (true);

-- 7. RLS POLICIES: ADMIN MANAGEMENT (INSERT, UPDATE, DELETE)
DROP POLICY IF EXISTS "Enable insert for categories" ON categories;
CREATE POLICY "Enable insert for categories" ON categories FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Enable update for categories" ON categories;
CREATE POLICY "Enable update for categories" ON categories FOR UPDATE USING (true);

DROP POLICY IF EXISTS "Enable delete for categories" ON categories;
CREATE POLICY "Enable delete for categories" ON categories FOR DELETE USING (true);

DROP POLICY IF EXISTS "Enable insert for guide items" ON guide_items;
CREATE POLICY "Enable insert for guide items" ON guide_items FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Enable update for guide items" ON guide_items;
CREATE POLICY "Enable update for guide items" ON guide_items FOR UPDATE USING (true);

DROP POLICY IF EXISTS "Enable delete for guide items" ON guide_items;
CREATE POLICY "Enable delete for guide items" ON guide_items FOR DELETE USING (true);

DROP POLICY IF EXISTS "Enable all for property settings" ON property_settings;
CREATE POLICY "Enable all for property settings" ON property_settings FOR ALL USING (true);

-- 8. ENABLE REALTIME SYNC
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM pg_publication WHERE pubname = 'supabase_realtime') THEN
    BEGIN
      ALTER PUBLICATION supabase_realtime ADD TABLE categories;
    EXCEPTION WHEN duplicate_object THEN NULL;
    END;
    BEGIN
      ALTER PUBLICATION supabase_realtime ADD TABLE guide_items;
    EXCEPTION WHEN duplicate_object THEN NULL;
    END;
    BEGIN
      ALTER PUBLICATION supabase_realtime ADD TABLE property_settings;
    EXCEPTION WHEN duplicate_object THEN NULL;
    END;
  END IF;
END $$;

-- 9. SEED DATA: CATEGORIES (9 CORE CATEGORIES)
INSERT INTO categories (id, name_el, name_en, subtitle_el, subtitle_en, icon, sort_order, bg_image)
VALUES
  ('welcome', 'Καλωσόρισμα & Άφιξη', 'Welcome & Check-in', 'Οδηγίες άφιξης & καλωσορίσματος', 'Arrival instructions & welcome tips', 'Key', 1, '/images/categories/welcome.jpg'),
  ('wifi', 'Wi-Fi', 'Wi-Fi', 'Πρόσβαση στο Internet', 'Internet Access', 'Wifi', 2, '/images/categories/wifi.jpg'),
  ('room_guide', 'Οδηγός Δωματίου', 'Rooms Guide', 'A/C, ζεστό νερό & συσκευές', 'A/C, hot water & appliances', 'Bed', 3, '/images/categories/rooms.jpg'),
  ('facilities', 'Παροχές Καταλύματος', 'Facilities', 'Κήπος, πάρκινγκ & ανέσεις', 'Garden, parking & amenities', 'Waves', 4, '/images/categories/facilities.jpg'),
  ('dining', 'Πρωινό & Εστίαση', 'Breakfast & Dining', 'Προτάσεις για φαγητό & καφέ', 'Dining & breakfast recommendations', 'Utensils', 5, '/images/categories/dining.jpg'),
  ('housekeeping', 'Καθαριότητα & Εξυπηρέτηση', 'Housekeeping & Services', 'Πρόγραμμα καθαριότητας & πετσέτες', 'Cleaning schedule & linens', 'Sparkles', 6, '/images/categories/housekeeping.jpg'),
  ('discover_paros', 'Γνωρίστε την Πάρο', 'Discover Paros', 'Παραλίες, γραφικά χωριά & αξιοθέατα', 'Beaches, scenic villages & sights', 'Anchor', 7, '/images/categories/paros.jpg'),
  ('useful_info', 'Χρήσιμες Πληροφορίες', 'Useful Information', 'Φαρμακεία, λεωφορεία & ενοικιάσεις', 'Pharmacies, buses & rentals', 'Info', 8, '/images/categories/info.jpg'),
  ('checkout', 'Αναχώρηση', 'Check-out', 'Ώρες, κλειδιά & φύλαξη αποσκευών', 'Hours, keys & luggage storage', 'LogOut', 9, '/images/categories/checkout.jpg')
ON CONFLICT (id) DO UPDATE SET
  name_el = EXCLUDED.name_el,
  name_en = EXCLUDED.name_en,
  subtitle_el = EXCLUDED.subtitle_el,
  subtitle_en = EXCLUDED.subtitle_en,
  icon = EXCLUDED.icon,
  sort_order = EXCLUDED.sort_order,
  bg_image = EXCLUDED.bg_image;

-- 10. SEED DATA: GUIDE ITEMS
INSERT INTO guide_items (id, category_id, title_el, title_en, content_el, content_en, image, has_image, is_active, sort_order, badge_el, badge_en)
VALUES
  ('item-welcome-1', 'welcome', 'Καλώς ήρθατε στα Efi Studios!', 'Welcome to Efi Studios!',
   'Σας ευχόμαστε μια αξέχαστη και γαλήνια διαμονή στην πανέμορφη Πάρο! Το κατάλυμά μας συνδυάζει την παραδοσιακή κυκλαδίτικη φιλοξενία με όλες τις σύγχρονες ανέσεις. Βρισκόμαστε δίπλα σας για οτιδήποτε χρειαστείτε.',
   'We warmly welcome you to beautiful Paros! Our studios blend authentic Cycladic hospitality with modern comforts. We are always at your disposal to make your stay memorable and relaxing.',
   NULL, FALSE, TRUE, 1, 'Καλωσόρισμα', 'Welcome'),

  ('item-welcome-2', 'welcome', 'Ώρες & Διαδικασία Άφιξης (Check-in)', 'Check-in Hours & Instructions',
   '• Ώρα Check-in: από τις 15:00.\n• Σε περίπτωση πρόωρης άφιξης, μπορείτε να αφήσετε με ασφάλεια τις αποσκευές σας στο χώρο υποδοχής.\n• Παραλαβή κλειδιών: Είτε προσωπικά από την υποδοχή είτε μέσω της θυρίδας κλειδιών (keybox) με τον προσωπικό κωδικό που σας έχουμε αποστείλει.',
   '• Check-in time: from 15:00 onwards.\n• Early arrival: You can safely store your luggage at our reception area.\n• Key collection: Personally at reception or via the secure keybox using the code sent to your message.',
   NULL, FALSE, TRUE, 2, 'Check-in: 15:00', 'Check-in: 15:00'),

  ('item-wifi-1', 'wifi', 'Υπερυψηλής Ταχύτητας Wi-Fi (VDSL / Fiber)', 'High-Speed Wi-Fi (VDSL / Fiber)',
   'Απολαύστε δωρεάν απεριόριστο internet σε όλους τους εσωτερικούς χώρους και στους κήπους του καταλύματος.\n\n• Όνομα Δικτύου (SSID): EfiStudios_Guest\n• Κωδικός Πρόσβασης: ParosSummer2025!\n\nΠατήστε το κουμπί παρακάτω για αυτόματη αντιγραφή του κωδικού στη συσκευή σας.',
   'Enjoy complimentary fast Wi-Fi in all studios, verandas, and garden areas.\n\n• Network Name (SSID): EfiStudios_Guest\n• Password: ParosSummer2025!\n\nClick the button below to copy the password instantly to your clipboard.',
   NULL, FALSE, TRUE, 1, 'Δωρεάν Wi-Fi', 'Free Wi-Fi'),

  ('item-room-1', 'room_guide', 'Κλιματισμός (A/C) & Οικολογική Χρήση', 'Air Conditioning (A/C) & Eco Guidelines',
   'Κάθε δωμάτιο διαθέτει αυτόνομο σύγχρονο κλιματισμό Inverter.\n• Συνιστώμενη θερμοκρασία ψύξης: 24°C - 26°C.\n• Παρακαλούμε βεβαιωθείτε ότι οι πόρτες και τα παράθυρα είναι κλειστά κατά τη λειτουργία του κλιματιστικού.\n• Όταν αποχωρείτε από το δωμάτιο, απενεργοποιήστε το A/C για εξοικονόμηση ενέργειας και προστασία του κυκλαδίτικου περιβάλλοντος.',
   'Each studio is equipped with an autonomous Inverter A/C unit.\n• Recommended cooling temperature: 24°C - 26°C.\n• Please make sure doors and windows are closed when A/C is active.\n• Kindly turn off the unit when leaving your room to protect the island environment and conserve energy.',
   NULL, FALSE, TRUE, 1, NULL, NULL),

  ('item-room-2', 'room_guide', 'Ζεστό Νερό & Ηλιακός Θερμοσίφωνας', 'Hot Water & Solar Heating',
   'Το κατάλυμα διαθέτει οικολογικό ηλιακό θερμοσίφωνα που παρέχει άφθονο ζεστό νερό καθ'' όλη τη διάρκεια της ημέρας.\nΣε ημέρες με συννεφιά, ο διακόπτης του θερμοσίφωνα βρίσκεται στον κεντρικό ηλεκτρικό πίνακα. Χρειάζονται μόνο 15-20 λεπτά για να ζεσταθεί το νερό. Παρακαλούμε απενεργοποιήστε τον μετά τη χρήση.',
   'Our property uses solar water heating providing hot water throughout sunny days.\nOn cloudy days, you can activate the water heater switch inside your studio electrical panel. It heats up in 15-20 minutes. Please switch it off after use.',
   NULL, FALSE, TRUE, 2, NULL, NULL),

  ('item-room-3', 'room_guide', 'Κουζίνα & Συσκευές', 'Kitchenette & Appliances',
   'Το στούντιο είναι εξοπλισμένο με ψυγείο, εστίες μαγειρέματος, βραστήρα, καφετιέρα και βασικά μαγειρικά σκεύη.\nΠαρακαλούμε μην αφήνετε αναμμένες τις εστίες χωρίς επίβλεψη.',
   'Your studio is equipped with a refrigerator, cooking stovetop, kettle, coffee maker, and basic cookware.\nPlease do not leave stovetops unattended while cooking.',
   NULL, FALSE, TRUE, 3, NULL, NULL),

  ('item-facilities-1', 'facilities', 'Όλα τα δωμάτια είναι πλήρως εξοπλισμένα με:', 'All rooms are fully equipped with:',
   '• Κλιματισμός\n• TV\n• Εστίες\n• Ζεστό νερό (όλη την ημέρα)\n• Ψυγείο\n• Καφετιέρα\n• Βραστήρα\n• Τοστιέρα\n• Χρηματοκιβώτιο\n• Σεσουάρ\n• Σίδερο και σιδερώστρα\n• Φούρνος μικροκυμάτων',
   '• Air Conditioning\n• TV\n• Stovetop\n• Hot water (all day)\n• Refrigerator\n• Coffee Maker\n• Kettle\n• Toaster\n• Safe box\n• Hairdryer\n• Iron & ironing board\n• Microwave oven',
   NULL, FALSE, TRUE, 1, 'Πλήρης Εξοπλισμός', 'Full Amenities'),

  ('item-facilities-2', 'facilities', 'Τα Στούντιο και Διαμερίσματα έχουν επίσης:', 'Studios & Apartments also feature:',
   '• Εστίες ή μικρή ηλεκτρική κουζίνα\n• Μαγειρικά σκεύη',
   '• Stovetop or small electric kitchen\n• Cookware & utensils',
   NULL, FALSE, TRUE, 2, 'Κουζίνα', 'Kitchen'),

  ('item-facilities-3', 'facilities', 'Σεντόνια και πετσέτες', 'Linens and Towels',
   'Όλα τα δωμάτια καθαρίζονται καθημερινά. Οι πετσέτες αλλάζονται κάθε δύο ημέρες και τα σεντόνια κάθε τρεις ημέρες.',
   'All rooms are cleaned daily. Towels are changed every two days and linens every three days.',
   NULL, FALSE, TRUE, 3, 'Καθαριότητα', 'Housekeeping'),

  ('item-facilities-4', 'facilities', 'Πλυντήριο', 'Laundry & Ironing',
   'Πλύσιμο ρούχων και σιδερωτήριο. Παρέχεται δωρεάν πλυντήριο και σιδερωτήριο καθώς και απορρυπαντικά προς χρήση από τους πελάτες.',
   'Laundry and ironing facilities. Free washing machine, ironing board, and complimentary detergents are available for guest use.',
   NULL, FALSE, TRUE, 4, 'Δωρεάν Παροχή', 'Free Facility'),

  ('item-facilities-5', 'facilities', 'Ψησταριά', 'Barbeque (BBQ)',
   'Κοινόχρηστη κτιστή ψησταριά για τα δικά σας καλοκαιρινά γεύματα, υπάρχει στην πίσω αυλή.',
   'Shared built-in BBQ for your summer cookouts, located in the back courtyard.',
   NULL, FALSE, TRUE, 5, 'Πίσω Αυλή', 'Back Courtyard'),

  ('item-facilities-6', 'facilities', 'Φαγητό', 'Dining & Takeaway',
   'Μπορείτε να παραγγείλετε φαγητό σε πακέτο από το εστιατόριο της Άννας καθ'' όλη τη διάρκεια της ημέρας. Ακόμη μπορείτε να κάνετε ειδικές παραγγελίες εκτός μενού. Ισχύουν οι τιμές εστιατορίου.',
   'You can order takeaway food from Anna''s restaurant throughout the day. Special off-menu orders can also be requested. Regular restaurant prices apply.',
   NULL, FALSE, TRUE, 6, 'Εστιατόριο Άννα', 'Anna Restaurant'),

  ('item-facilities-7', 'facilities', 'Πάρκινγκ', 'Parking',
   'Ο ήσυχος δρόμος μπροστά από τα ενοικιαζόμενα δωμάτια προσφέρει άφθονο χώρο στάθμευσης.',
   'The quiet street in front of the rooms offers ample free parking space.',
   NULL, FALSE, TRUE, 7, 'Δωρεάν Parking', 'Free Parking'),

  ('item-facilities-8', 'facilities', 'Παιδική χαρά', 'Children''s Playground',
   'Παιδική χαρά θα βρείτε απέναντι από τα ενοικιαζόμενα δωμάτια, περιτριγυρισμένη από ψηλά δέντρα για σκιά – για δημιουργική και ξέγνοιαστη απασχόληση για τα παιδιά.',
   'A children''s playground is located directly opposite the rooms, shaded by tall trees – for creative and carefree playtime for kids.',
   NULL, FALSE, TRUE, 8, 'Για παιδιά', 'Family Friendly'),

  ('item-facilities-9', 'facilities', 'Internet', 'Internet',
   'Υπάρχει δωρεάν Wi-Fi πρόσβαση στο Internet σε όλα τα δωμάτια και στον κήπο.',
   'Free Wi-Fi internet access is available throughout all rooms and the garden.',
   NULL, FALSE, TRUE, 9, 'Δωρεάν Wi-Fi', 'Free Wi-Fi'),

  ('item-dining-1', 'dining', 'Πρωινό & Παραδοσιακοί Φούρνοι', 'Breakfast & Traditional Bakeries',
   '• Φούρνος του Δρυού (500μ): Φρέσκο ζυμωτό ψωμί, παραδοσιακή παριανή τυρόπιτα και λαχταριστά κρουασάν.\n• To Steki Café: Ιδανικό για πλούσιο πρωινό, eggs benedict και specialty coffee δίπλα στη θάλασσα.',
   '• Drios Traditional Bakery (500m): Authentic sourdough bread, local cheese pies, and fresh pastries.\n• To Steki Café: Perfect for brunch, Greek eggs, fresh orange juice, and specialty coffee by the seaside.',
   NULL, FALSE, TRUE, 1, NULL, NULL),

  ('item-dining-2', 'dining', 'Κορυφαίες Ταβέρνες & Εστιατόρια στην Πάρο', 'Top Tavernas & Restaurants in Paros',
   '• Ταβέρνα Άννα (Δρυός): Αυθεντική παριανή κουζίνα, φρέσκο ψάρι και τοπικά πιάτα με θέα τη θάλασσα.\n• Barbarossa & Mario (Νάουσα): High-end θαλασσινά και κοσμοπολίτικη ατμόσφαιρα στο γραφικό λιμανάκι.\n• Siparos Seaside Restaurant (Σάντα Μαρία): Δημιουργική κυκλαδίτικη γαστρονομία με μαγευτικό ηλιοβασίλεμα.\n• Το Κλαρίνο (Λεύκες): Παραδοσιακά ψητά, ρεβιθάδα φούρνου και σπιτικές πίτες στο γραφικό ορεινό χωριό.',
   '• Anna Taverna (Drios): Authentic Parian recipes, fresh daily catch, and seaside charm.\n• Barbarossa & Mario (Naoussa): High-end seafood and cosmopolitan vibes at the historic Venetian harbor.\n• Siparos Seaside (Santa Maria): Refined Cycladic gastronomy accompanied by sensational sunset views.\n• To Klarino (Lefkes village): Traditional grill, wood-oven chickpeas (revithada), and home pies in the mountain village.',
   NULL, FALSE, TRUE, 2, 'Προτάσεις', 'Recommendations'),

  ('item-housekeeping-1', 'housekeeping', 'Πρόγραμμα Καθαριότητας & Αλλαγή Κλινοσκεπασμάτων', 'Housekeeping Schedule & Linens Change',
   '• Καθημερινή περιποίηση δωματίου και αποκομιδή απορριμμάτων: 10:00 - 14:00.\n• Αλλαγή σεντονιών και πετσετών: Κάθε 3 ημέρες (ή νωρίτερα κατόπιν αιτήματος).\n• Προστασία Περιβάλλοντος: Αν επιθυμείτε αλλαγή πετσετών, αφήστε τις στο δάπεδο του μπάνιου.',
   '• Daily room freshening & trash disposal: 10:00 - 14:00.\n• Linen & towels change: Every 3 days (or earlier upon guest request).\n• Eco note: If you require fresh towels, simply leave the used ones on the bathroom floor.',
   NULL, FALSE, TRUE, 1, 'Κάθε 3 ημέρες', 'Every 3 days'),

  ('item-housekeeping-2', 'housekeeping', 'Πετσέτες Θαλάσσης & Σίδερο / Σιδερώστρα', 'Beach Towels & Ironing Amenities',
   '• Παρακαλούμε μην χρησιμοποιείτε τις λευκές πετσέτες του μπάνιου στην παραλία.\n• Διατίθενται ειδικές πετσέτες θαλάσσης στην υποδοχή κατόπιν συνεννόησης.\n• Σίδερο και σιδερώστρα διατίθενται δωρεάν για χρήση στο δωμάτιό σας.',
   '• Please do not take the white bathroom towels to the beach.\n• Dedicated beach towels are available upon request at reception.\n• Iron & ironing board can be provided free of charge for your room.',
   NULL, FALSE, TRUE, 2, NULL, NULL),

  ('item-paros-1', 'discover_paros', 'Οι Καλύτερες Παραλίες της Πάρου', 'Top Beaches in Paros',
   '• Χρυσή Ακτή (Golden Beach - 3 λεπτά): Παγκοσμίου φήμης χρυσή αμμουδιά, windsurfing, beach bars και κρυστάλλινα νερά.\n• Κολυμπήθρες (Κοντά στη Νάουσα): Μοναδικοί γρανιτένιοι βράχοι που θυμίζουν σεληνιακό τοπίο.\n• Φάραγγας (Νότια Πάρος): Προστατευμένος απάνεμος κόλπος με καταπράσινα νερά και premium sunbeds.\n• Σάντα Μαρία: Ζωντανή ατμόσφαιρα, watersports και ρηχά τιρκουάζ νερά ιδανικά για όλους.',
   '• Golden Beach (Chrissi Akti - 3 min): World-famous golden sands, windsurfing hotspot, premium beach bars.\n• Kolymbithres (Naoussa): Lunar-like granite rock formations sculpted by sea and wind.\n• Faragas (South): Sheltered cove with emerald calm waters and fine amenities.\n• Santa Maria: Vibrant beach clubs, watersports, and crystal turquoise waters.',
   NULL, FALSE, TRUE, 1, 'Παραλίες', 'Top Beaches'),

  ('item-paros-2', 'discover_paros', 'Γραφικά Χωριά & Αξιοθέατα', 'Scenic Villages & Highlights',
   '• Λεύκες: Το ομορφότερο ορεινό χωριό με πλακόστρωτα σοκάκια, νεοκλασικά αρχοντικά και το βυζαντινό μονοπάτι.\n• Νάουσα: Το γραφικό ενετικό λιμάνι με τα παλιά καρνάγια, τα μπαράκια και τα κομψά σοκάκια.\n• Παροικιά & Παναγία Εκατονταπυλιανή: Η ιστορική πρωτεύουσα με το παλαιότερο σωζόμενο παλαιοχριστιανικό μνημείο της Ελλάδας.\n• Αντίπαρος: Μόλις 7 λεπτά με το καραβάκι από την Πούντα για ημερήσια εκδρομή στο σπήλαιο και τα μυστικά σοκάκια.',
   '• Lefkes: The picturesque mountain village with marble alleys, neoclassical mansions, and the Byzantine path.\n• Naoussa: The iconic Venetian fishing harbor, cosmopolitan nightlife, and boutique alleys.\n• Parikia & Panagia Ekatontapyliani: The historic capital housing one of the oldest Byzantine churches in Greece.\n• Antiparos: Only a 7-minute ferry from Pounda, ideal for a day trip to explore the cave and secluded beaches.',
   NULL, FALSE, TRUE, 2, NULL, NULL),

  ('item-useful-1', 'useful_info', 'Συγκοινωνίες, Λεωφορεία (ΚΤΕΛ) & Ταξί', 'Public Transport (KTEL Buses) & Taxis',
   '• Στάση Λεωφορείου Δρυού: 350 μέτρα από το κατάλυμα με τακτικά δρομολόγια προς Παροικιά, Νάουσα και Χρυσή Ακτή.\n• Κεντρικός Σταθμός Ταξί Παροικιάς: +30 22840 21500\n• Σταθμός Ταξί Νάουσας: +30 22840 51496\n• Ενοικιάσεις Αυτοκινήτων / Μηχανών: Συνεργαζόμαστε με τοπικά γραφεία ενοικίασης με παράδοση στο studio. Ρωτήστε μας στην υποδοχή!',
   '• Drios Bus Stop: 350m from studios with frequent connections to Parikia, Naoussa, and Golden Beach.\n• Parikia Taxi Station: +30 22840 21500\n• Naoussa Taxi Station: +30 22840 51496\n• Car / Scooter Rental: We partner with trusted local rental agencies offering studio delivery. Ask reception!',
   NULL, FALSE, TRUE, 1, NULL, NULL),

  ('item-useful-2', 'useful_info', 'Φαρμακεία, Ιατρική Βοήθεια & Έκτακτη Ανάγκη', 'Pharmacies, Medical Help & Emergencies',
   '• Κέντρο Υγείας Πάρου (Παροικιά): +30 22843 60000 (24ωρη λειτουργία)\n• Εθνικό Κέντρο Άμεσης Βοήθειας (ΕΚΑΒ): 166\n• Κοντινότερο Φαρμακείο (Μάρπησσα / Δρυός): +30 22840 41555\n• Αστυνομικό Τμήμα Πάρου: +30 22840 23333 / 100\n• Πυροσβεστική Υπηρεσία: 199\n• Λιμεναρχείο Πάρου: +30 22840 21240',
   '• Paros Health Center (Parikia): +30 22843 60000 (24/7 service)\n• National Ambulance Emergency: 166\n• Closest Pharmacy (Marpissa / Drios): +30 22840 41555\n• Paros Police Station: +30 22840 23333 / 100\n• Fire Department: 199\n• Paros Port Authority: +30 22840 21240',
   NULL, FALSE, TRUE, 2, 'Έκτακτη Ανάγκη', 'Emergency'),

  ('item-checkout-1', 'checkout', 'Ώρες & Διαδικασία Αναχώρησης (Check-out)', 'Check-out Policy & Process',
   '• Ώρα Check-out: έως τις 11:00 π.μ.\n• Παράδοση κλειδιού: Παρακαλούμε παραδώστε το κλειδί στην υποδοχή ή αφήστε το στην κλειδαριά της πόρτας του δωματίου σας.\n• Φύλαξη Αποσκευών: Εάν η αναχώρηση του πλοίου ή της πτήσης σας είναι αργότερα μέσα στην ημέρα, μπορείτε να φυλάξετε τις αποσκευές σας δωρεάν στον ειδικό χώρο μας.\n• Late Check-out: Παρέχεται κατόπιν συνεννόησης και βάσει διαθεσιμότητας.',
   '• Check-out time: by 11:00 AM.\n• Key return: Please return the key to reception or leave it on the room door lock.\n• Luggage Storage: If your ferry or flight departs later, you can store your luggage safely at no extra charge.\n• Late Check-out: Subject to availability upon prior arrangement with management.',
   NULL, FALSE, TRUE, 1, 'Έως τις 11:00', 'Until 11:00')
ON CONFLICT (id) DO UPDATE SET
  category_id = EXCLUDED.category_id,
  title_el = EXCLUDED.title_el,
  title_en = EXCLUDED.title_en,
  content_el = EXCLUDED.content_el,
  content_en = EXCLUDED.content_en,
  image = EXCLUDED.image,
  has_image = EXCLUDED.has_image,
  is_active = EXCLUDED.is_active,
  sort_order = EXCLUDED.sort_order,
  badge_el = EXCLUDED.badge_el,
  badge_en = EXCLUDED.badge_en,
  updated_at = NOW();

-- 11. SEED DATA: PROPERTY SETTINGS
INSERT INTO property_settings (id, key, value)
VALUES
  ('prop_name', 'property_name', 'Efi Studios - Paros'),
  ('loc_el', 'location_name_el', 'Δρυός, Πάρος'),
  ('loc_en', 'location_name_en', 'Drios, Paros'),
  ('wifi_name', 'wifi_ssid', 'EfiStudios_Guest'),
  ('wifi_pass', 'wifi_password', 'ParosSummer2025!'),
  ('phone_1', 'phone_primary', '+30 22840 41015'),
  ('phone_2', 'phone_secondary', '+30 6942 422511'),
  ('phone_3', 'mobile_secondary', '+30 6942 402355'),
  ('whatsapp', 'whatsapp_number', '+306942422511'),
  ('viber', 'viber_number', '+306942422511'),
  ('email', 'email', 'anna@efistudios.gr'),
  ('website', 'website_url', 'https://www.efistudios.gr/el/'),
  ('tripadvisor', 'tripadvisor_url', 'https://www.tripadvisor.com.gr/Hotel_Review-g1066347-d2709783-Reviews-Efi_Studios_Apartments-Drios_Paros_Cyclades_South_Aegean.html'),
  ('google_reviews', 'google_reviews_url', 'https://www.google.com/maps/place/Efi+Studios/@37.0094,25.2155,17z/data=!4m8!3m7!1s0x149854b85f3fba43:0xa85b379864fa9f5f!8m2!3d37.0094!4d25.2155!9m1!1b1'),
  ('gmaps', 'google_maps_url', 'https://maps.google.com/?q=Efi+Studios+Drios+Paros+84400'),
  ('addr_el', 'address_el', 'Δρυός, Πάρος 84400'),
  ('addr_en', 'address_en', 'Drios, Paros 84400'),
  ('checkin_t', 'check_in_time', '15:00'),
  ('checkout_t', 'check_out_time', '11:00'),
  ('emg_police', 'emergency_police', '+30 22840 23333 (Αστυνομικό Τμήμα Πάρου)'),
  ('emg_health', 'emergency_health_center', '+30 22843 60000 (Κέντρο Υγείας Παροικιάς)'),
  ('emg_pharmacy', 'emergency_pharmacy', '+30 22840 41555 (Φαρμακείο Μάρπησσας / Δρυού)')
ON CONFLICT (id) DO UPDATE SET
  key = EXCLUDED.key,
  value = EXCLUDED.value,
  updated_at = NOW();

-- 12. GRANT API ACCESS TO ANON & AUTHENTICATED ROLES
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON TABLE public.categories TO anon, authenticated;
GRANT ALL ON TABLE public.guide_items TO anon, authenticated;
GRANT ALL ON TABLE public.property_settings TO anon, authenticated;
