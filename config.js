// switch – zentrale Einstellungen
// Hier trägst du deine Firebase-Daten ein. Alles andere kannst du so lassen oder anpassen.

export const firebaseConfig = {
  apiKey: "AIzaSyDbIsFJZJJaKjQ6SoT5cPH9k_cMDNg9Qbc",
  authDomain: "emotion-und-musik.firebaseapp.com",
  projectId: "emotion-und-musik",
  storageBucket: "emotion-und-musik.firebasestorage.app",
  messagingSenderId: "793766090477",
  appId: "1:793766090477:web:fea2c91c0402fb69741ee4"
};

export const SONG_SECONDS = 5;            // Anzeigedauer pro Song (groß, mit QR-Code); eine Kategorie läuft immer 5 × 5 s = 25 s
export const SLOTS_PER_CATEGORY = 5;      // 1 große + 4 kleine Kacheln
export const SUBMIT_COOLDOWN_SECONDS = 60; // Wartezeit zwischen zwei Einreichungen vom selben Handy

// Die IDs (focus, hype, …) müssen mit firestore.rules übereinstimmen.
export const CATEGORIES = [
  { id: "focus",     name: "Focus",      color: "#5B8CFF", line: "wenn du lernen willst, aber abgelenkt bist" },
  { id: "hype",      name: "Hype",       color: "#FF7A2E", line: "wenn du müde bist und in die Gänge kommen willst" },
  { id: "chill",     name: "Chill",      color: "#2ED3B7", line: "wenn du gestresst bist und runterkommen willst" },
  { id: "brave",     name: "Brave",      color: "#FF4D5E", line: "wenn du nervös bist vor Prüfung oder Referat" },
  { id: "comfort",   name: "Comfort",    color: "#B26BFF", line: "wenn du traurig bist und Trost brauchst" },
  { id: "goodvibes", name: "Good Vibes", color: "#FFD23F", line: "wenn der Tag grau ist und du Leichtigkeit willst" }
];

// Wortfilter für Spitznamen. Erweitern, wenn dir etwas durchrutscht.
// Geprüft wird auf Teilwörter, nach Kleinschreibung und Ersetzen typischer Tricks (0→o, 1→i, 3→e, 4→a, 5→s, @→a).
export const NICKNAME_BLOCKLIST = [
  "fick", "fuck", "hure", "hurensohn", "nutte", "schlampe", "fotze", "wichser", "arschloch",
  "spast", "behindert", "missgeburt", "schwuchtel", "nazi", "hitler", "adolf", "siegheil",
  "penis", "vagina", "porno", "sex", "kotz", "bitch", "slut", "nigg", "neger"
];

export function isConfigured() {
  return !firebaseConfig.apiKey.startsWith("DEIN");
}

function normalizeForFilter(text) {
  return text
    .toLowerCase()
    .replace(/0/g, "o").replace(/1/g, "i").replace(/3/g, "e")
    .replace(/4/g, "a").replace(/5/g, "s").replace(/@/g, "a")
    .replace(/[^a-zäöüß]/g, "");
}

export function nicknameAllowed(nickname) {
  const clean = normalizeForFilter(nickname);
  return !NICKNAME_BLOCKLIST.some(word => clean.includes(word));
}
