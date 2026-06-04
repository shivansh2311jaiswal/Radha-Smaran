// ==========================
// RADHA SMARAN APP
// ==========================

let count = Number(localStorage.getItem("count")) || 0;

let totalCount = Number(localStorage.getItem("totalCount")) || 0;

let bestDay = Number(localStorage.getItem("bestDay")) || 0;

let history = JSON.parse(localStorage.getItem("history")) || [];

const counter = document.getElementById("counter");
const progressFill = document.getElementById("progressFill");

const todayCountEl = document.getElementById("todayCount");
const totalCountEl = document.getElementById("totalCount");
const malaCountEl = document.getElementById("malaCount");
const bestDayEl = document.getElementById("bestDay");

const historyContainer = document.getElementById("historyContainer");

const milestoneMessage = document.getElementById("milestoneMessage");

const achievementBox = document.getElementById("achievementBox");

const quoteBox = document.getElementById("quoteBox");

// ==========================
// DATE
// ==========================

const today = new Date().toLocaleDateString();

// ==========================
// QUOTES
// ==========================

const quotes = [

"🌷 Every remembrance is a flower offered from the heart.",

"🌸 Small efforts repeated daily become great achievements.",

"📚 Discipline is stronger than motivation.",

"🪷 Stay calm and keep moving forward.",

"✨ Focus on effort, not fear.",

"🌼 One sincere step is enough for today."

];

// ==========================
// KRISHNA MESSAGES
// ==========================

const milestones = {

108: "🌸 One Mala Complete! Focus on your actions, not only results.",

216: "📚 A calm mind learns faster than a worried mind.",

324: "🌷 Consistency creates success.",

540: "🪷 Walk your own path without comparison.",

1008: "🪔 Great things come from steady effort.",

5000: "✨ You are building discipline every day.",

10000: "🏆 A journey of patience creates greatness."

};

// ==========================
// UPDATE UI
// ==========================

function updateUI() {

counter.textContent = count;

todayCountEl.textContent = count;

totalCountEl.textContent = totalCount;

malaCountEl.textContent = Math.floor(totalCount / 108);

bestDayEl.textContent = bestDay;

let percent = (count % 108) / 108 * 100;

progressFill.style.width = percent + "%";

checkMilestone();

saveData();
}

// ==========================
// SAVE DATA
// ==========================

function saveData() {

localStorage.setItem("count", count);

localStorage.setItem("totalCount", totalCount);

localStorage.setItem("bestDay", bestDay);

localStorage.setItem("history", JSON.stringify(history));

}

// ==========================
// FLOATING RADHA
// ==========================

function createFloatingText(x,y){

const names = [

"राधे 🌸",

"Radha 🌷",

"Radhe ✨",

"राधे राधे 🪷",

"Radha Rani 💖"

];

const text = document.createElement("div");

text.className = "floating";

text.innerText = names[Math.floor(Math.random()*names.length)];

text.style.left = x + "px";

text.style.top = y + "px";

document.body.appendChild(text);

setTimeout(()=>{

text.remove();

},2000);

}

// ==========================
// KEY PRESS
// ==========================

function increaseCount() {

    count++;
    totalCount++;

    if (count > bestDay) {
        bestDay = count;
    }

    updateUI();

    createFloatingText(
        Math.random() * window.innerWidth,
        window.innerHeight - 150
    );
}

// Laptop keyboard support
document.addEventListener("keydown", (e) => {

    e.preventDefault();

    if (e.repeat) return;

    increaseCount();
});

// Mobile touch support
const tapArea = document.getElementById("tapArea");

// Only this area increases count (PHONE)
tapArea.addEventListener("touchstart", (e) => {
    e.preventDefault();
    increaseCount();
});

// Only this area increases count (CLICK)
tapArea.addEventListener("click", () => {
    increaseCount();
});
// ==========================
// MILESTONES
// ==========================

function checkMilestone(){

if(milestones[count]){

milestoneMessage.innerHTML = milestones[count];

alert(milestones[count]);

}

}

// ==========================
// SAVE SESSION
// ==========================

function saveSession(){

history.unshift({

date: today,

count: count

});

saveData();

renderHistory();

alert("🌸 Session Saved");

}

// ==========================
// HISTORY
// ==========================

function renderHistory(){

historyContainer.innerHTML = "";

if(history.length === 0){

historyContainer.innerHTML =

'<div class="history-item">No history saved yet.</div>';

return;

}

history.forEach(item=>{

historyContainer.innerHTML += `

<div class="history-item">

📅 ${item.date}

<br>

🌸 Count: ${item.count}

</div>

`;

});

}

// ==========================
// SHOW HISTORY
// ==========================

function showHistory(){

renderHistory();

}

// ==========================
// STATS
// ==========================

function showStats(){

alert(

`Today's Count: ${count}

Total Count: ${totalCount}

Total Malas: ${Math.floor(totalCount/108)}

Best Day: ${bestDay}`

);

}

// ==========================
// RESET
// ==========================

function resetCounter(){

if(confirm("Reset today's count?")){

count = 0;

updateUI();

}

}

// ==========================
// DAILY QUOTE
// ==========================

setInterval(()=>{

quoteBox.textContent =

quotes[Math.floor(Math.random()*quotes.length)];

},10000);

// ==========================
// ACHIEVEMENTS
// ==========================

function updateAchievements(){

if(totalCount >= 10000){

achievementBox.innerHTML =

"🏆 Golden Lotus Achievement";

}

else if(totalCount >= 5000){

achievementBox.innerHTML =

"✨ Dedicated Practitioner";

}

else if(totalCount >= 1000){

achievementBox.innerHTML =

"🪷 Consistent Seeker";

}

else if(totalCount >= 108){

achievementBox.innerHTML =

"🌸 First Mala Complete";

}

else{

achievementBox.innerHTML =

"🌱 Begin your journey with one key press.";

}

}

setInterval(updateAchievements,1000);

// ==========================
// START
// ==========================

renderHistory();

updateAchievements();

updateUI();
