# Efi Studios - Paros • Digital Guest Guide 🌊🔑

Μια premium, mobile-first Web Εφαρμογή για το κατάλυμα **Efi Studios** στην Πάρο (Κυκλάδες).

---

## 🌟 Βασικά Χαρακτηριστικά (Features)

### 1. Luxury Cycladic UI/UX (Εμπειρία Επισκέπτη)
- **Header:** Κυκλαδίτικη minimal αισθητική, Serif λογότυπο "Efi Studios - Paros" και αυστηρός διακόπτης γλώσσας (**ΕΛ | EN**) με μηδενική διαρροή κειμένου.
- **Κεντρικό Grid 9 Κατηγοριών (3x3):**
  1. 🔑 **Καλωσόρισμα & Άφιξη (Welcome & Check-in)**
  2. 📶 **Wi-Fi (Internet Access)** με άμεσο κουμπί αντιγραφής ("Copy Password")
  3. 🛏️ **Οδηγός Δωματίου (Rooms Guide)** - A/C, ηλιακός θερμοσίφωνας, κουζίνα
  4. 🌊 **Παροχές Καταλύματος (Facilities)** - Κήπος, ιδιωτικό parking
  5. 🍽️ **Πρωινό & Εστίαση (Breakfast & Dining)** - Τοπικοί φούρνοι, ταβέρνες & εστιατόρια
  6. ✨ **Καθαριότητα & Εξυπηρέτηση (Housekeeping & Services)** - Πρόγραμμα αλλαγής κλινοσκεπασμάτων, πετσέτες
  7. ⚓ **Γνωρίστε την Πάρο (Discover Paros)** - Χρυσή Ακτή, Κολυμπήθρες, Φάραγγας, Λεύκες, Νάουσα
  8. ℹ️ **Χρήσιμες Πληροφορίες (Useful Information)** - ΚΤΕΛ, ταξί, ιατρική βοήθεια, φαρμακεία
  9. 🚪 **Αναχώρηση (Check-out)** - Ώρες, κλειδιά, φύλαξη αποσκευών
- **Διαδραστικό Modal:** Αναλυτικές οδηγίες, bullets, ετικέτες (badges) και προαιρετικές κυκλαδίτικες φωτογραφίες με zoom preview.
- **Quick Assistance Footer:**
  - Direct Phone (Click-to-call)
  - WhatsApp Chat
  - Viber Chat
  - Direct Email
  - Google Maps Navigation Pin

---

### 2. Προστατευμένο Admin Panel (`/#admin`)
- **Πρόσβαση:** `/#admin` (ή μέσω του διακριτικού κουμπιού διαχείρισης στο footer/header).
- **Default PIN:** `2025` (υποστηρίζει και `efi`).
- **Δυνατότητα αλλαγής PIN:** Μέσα από την καρτέλα **«Ασφάλεια & PIN»**.
- **Ένδειξη Database:**
  - `🟢 Live Cloud (Supabase)` όταν έχουν ρυθμιστεί τα credentials στο `.env`.
  - `🟡 Local Sync Mode` για άμεση λειτουργία εκτός σύνδεσης ή πριν τη ρύθμιση του Supabase.
- **Πλήρες CRUD:**
  - Προσθήκη / Επεξεργασία / Διαγραφή οδηγιών σε όλες τις κατηγορίες.
  - Εναλλαγή: **[Χωρίς φωτογραφία]** ή **[Με φωτογραφία]** με live preview και έτοιμες προτάσεις εικόνων.
  - **Soft-hide Toggle (On/Off):** Προσωρινή απόκρυψη οδηγιών χωρίς διαγραφή.
  - **Realtime συγχρονισμός:** Οι αλλαγές εμφανίζονται αυτόματα σε όλες τις ανοιχτές συσκευές των επισκεπτών.
  - **Διαχείριση Στοιχείων:** Επεξεργασία Wi-Fi SSID/Password, τηλεφώνων, WhatsApp, Viber, Email και Google Maps pin.

---

## 🗄️ Supabase Setup (`supabase_schema.sql`)

1. Συνδεθείτε στο λογαριασμό σας στο [Supabase Dashboard](https://supabase.com/dashboard).
2. Ανοίξτε το **SQL Editor** του project σας.
3. Αντιγράψτε και εκτελέστε ολόκληρο το περιεχόμενο του αρχείου [`supabase_schema.sql`](file:///h:/project%20menu%20builders/EFI%20STUDIOS/supabase_schema.sql).
4. Το script δημιουργεί αυτόματα:
   - Τον πίνακα `categories`
   - Τον πίνακα `guide_items`
   - Τον πίνακα `property_settings`
   - Ενεργοποιεί το Row Level Security (RLS) με δημόσια ανάγνωση και διαχείριση
   - Ενεργοποιεί το Supabase Realtime
   - Εισάγει όλα τα έτοιμα Seed Data για τα Efi Studios στην Πάρο.

5. Αντιγράψτε το Project URL και το Anon Public Key από το **Project Settings -> API** και δημιουργήστε αρχείο `.env`:
```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-public-key
```

---

## 🚀 Τοπική Εκτέλεση (Local Development)

```bash
# Εγκατάσταση εξαρτήσεων
npm.cmd install

# Εκκίνηση Dev Server
npm.cmd run dev

# Έλεγχος & Παραγωγή Build
npm.cmd run build
```

---

## ☁️ Vercel Deployment

1. Κάντε push το project σε ένα Git repository (GitHub/GitLab/Bitbucket).
2. Συνδεθείτε στο [Vercel](https://vercel.com/) και εισάγετε το repository.
3. Στο πεδίο **Environment Variables** προσθέστε:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
4. Πατήστε **Deploy**.
