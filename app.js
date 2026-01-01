/* ===============================
   GLOBAL STATE
================================ */
let leftLang = "auto";
let rightLang = "jam";
let autoDetected = null;
let autoLocked = false;

/* ===============================
   DOM
================================ */
const inputBox = document.getElementById("input");
const resultBox = document.getElementById("result");

const leftTabs = document.querySelectorAll(".lang-left");
const rightTabs = document.querySelectorAll(".lang-right");

const leftAutoTab = document.getElementById("left-auto");

/* ===============================
   UTIL
================================ */
function tokenize(text) {
  return text.toLowerCase().trim().split(/\s+/);
}

function detectLanguage(words) {
  let jam = 0, eng = 0;
  words.forEach(w => {
    if (jamToEng[w]) jam++;
    if (engToJam[w]) eng++;
  });
  return jam >= eng ? "jam" : "eng";
}

function setUnderline(group, active) {
  group.forEach(t => {
    t.classList.toggle("active", t.dataset.lang === active);
  });
}

/* ===============================
   LANGUAGE SELECTION
================================ */
leftTabs.forEach(tab => {
  tab.addEventListener("click", () => {
    leftLang = tab.dataset.lang;
    autoLocked = leftLang !== "auto";

    setUnderline(leftTabs, leftLang);
    translate();
  });
});

rightTabs.forEach(tab => {
  tab.addEventListener("click", () => {
    rightLang = tab.dataset.lang;

    // Prevent duplicate languages
    if (rightLang === leftLang && leftLang !== "auto") {
      leftLang = rightLang === "eng" ? "jam" : "eng";
      setUnderline(leftTabs, leftLang);
    }

    setUnderline(rightTabs, rightLang);
    translate();
  });
});

/* ===============================
   TRANSLATION
================================ */
function translate() {
  const text = inputBox.value;

  if (!text.trim()) {
    resultBox.textContent = "";
    autoDetected = null;
    autoLocked = false;

    // Reset Auto label
    leftAutoTab.textContent = "Auto";
    setUnderline(leftTabs, leftLang);
    return;
  }

  let source = leftLang;

  if (leftLang === "auto") {
    autoDetected = detectLanguage(tokenize(text));
    source = autoDetected;

    // Update Auto tab label ONLY if auto is selected
    leftAutoTab.textContent =
      (autoDetected === "eng" ? "English" : "Jamalese") + " – Auto";
  }

  setUnderline(leftTabs, leftLang);

  const words = tokenize(text);

  if (source === "eng") {
    resultBox.textContent = translateWithPhrases(words, engToJam);
  } else {
    resultBox.textContent = translateWithPhrases(words, jamToEng);
  }
}

/* ===============================
   EVENTS
================================ */
inputBox.addEventListener("input", translate);
