/* Dark mode */
const toggle = document.getElementById("darkToggle");
toggle.addEventListener("change", () => {
  document.documentElement.dataset.theme =
    toggle.checked ? "dark" : "light";
});

/* Copy */
function copyResult(){
  const btn = document.getElementById("copyBtn");
  const text = document.getElementById("result").innerText;
  if(!text) return;

  navigator.clipboard.writeText(text);
  btn.innerHTML = "✓ Copied";
  btn.disabled = true;

  setTimeout(()=>{
    btn.innerHTML = "📋";
    btn.disabled = false;
  },1200);
}
