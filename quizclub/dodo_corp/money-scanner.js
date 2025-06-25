const codeValueMap = {
  "2dodo": 2,
  "5dodo": 5,
  "10dodo": 10,
};

const cooldownMs = 10 * 60 * 1000;

let db;
let total = 0;
let scanTimestamps = {};

const totalEl = document.getElementById("total");
const msgEl = document.getElementById("message");
const codeInput = document.getElementById("codeInput");
const submitBtn = document.getElementById("submitBtn");

function updateTotalDisplay() {
  totalEl.innerText = `Total: $${total}`;
}

function showMessage(msg) {
  msgEl.innerText = msg;
  setTimeout(() => {
    msgEl.innerText = "";
  }, 4000);
}

function openDatabase() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open("QRMoneyDB", 1);
    request.onerror = () => reject("Database failed to open");
    request.onsuccess = () => {
      db = request.result;
      resolve();
    };
    request.onupgradeneeded = (e) => {
      db = e.target.result;
      db.createObjectStore("data", { keyPath: "key" });
    };
  });
}

function saveData(key, value) {
  const tx = db.transaction("data", "readwrite");
  const store = tx.objectStore("data");
  store.put({ key, value });
}

function loadData(key) {
  return new Promise((resolve) => {
    const tx = db.transaction("data", "readonly");
    const store = tx.objectStore("data");
    const req = store.get(key);
    req.onsuccess = () => resolve(req.result ? req.result.value : null);
    req.onerror = () => resolve(null);
  });
}

async function loadInitialState() {
  total = (await loadData("total")) || 0;
  scanTimestamps = (await loadData("scanTimestamps")) || {};
  updateTotalDisplay();
}

async function onSubmit() {
  const code = codeInput.value.trim().toLowerCase();
  if (!codeValueMap[code]) {
    showMessage("code wrong");
    return;
  }

  const now = Date.now();
  const lastScan = scanTimestamps[code] || 0;
  if (now - lastScan < cooldownMs) {
    showMessage("no cheating");
    return;
  }

  total += codeValueMap[code];
  scanTimestamps[code] = now;
  updateTotalDisplay();
  saveData("total", total);
  saveData("scanTimestamps", scanTimestamps);
  showMessage(`Added $${codeValueMap[code]}`);
  codeInput.value = "";
}

submitBtn.addEventListener("click", onSubmit);
codeInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    onSubmit();
  }
});

(async () => {
  await openDatabase();
  await loadInitialState();
})();
