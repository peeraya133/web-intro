const monthYear = document.getElementById("monthYear");
const calendarBody = document.getElementById("calendarBody");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const popup = document.getElementById("popup");
const noteInput = document.getElementById("noteInput");
const saveNoteBtn = document.getElementById("saveNote");

let currentDate = new Date();
let notes = {}; // เก็บ note ของแต่ละวัน

function renderCalendar() {
calendarBody.innerHTML = "";
const year = currentDate.getFullYear();
const month = currentDate.getMonth();
const firstDay = new Date(year, month, 1).getDay();
const lastDate = new Date(year, month + 1, 0).getDate();

monthYear.textContent = currentDate.toLocaleString("th-TH", { month: "long", year: "numeric" });

let date = 1;
for (let i = 0; i < 6; i++) {
    let row = document.createElement("tr");

    for (let j = 0; j < 7; j++) {
    let cell = document.createElement("td");
    if (i === 0 && j < firstDay) {
        cell.textContent = "";
    } else if (date > lastDate) {
        break;
    } else {
        cell.textContent = date;
        let key = `${year}-${month}-${date}`;
        if (notes[key]) {
        let noteSpan = document.createElement("div");
        noteSpan.classList.add("note");
        noteSpan.textContent = notes[key];
        cell.appendChild(noteSpan);
        }
        cell.onclick = () => openPopup(key);
        date++;
    }
    row.appendChild(cell);
    }
    calendarBody.appendChild(row);
}
}

function openPopup(key) {
popup.style.display = "flex";
popup.dataset.key = key;
noteInput.value = notes[key] || "";
}

function closePopup() {
popup.style.display = "none";
}

saveNoteBtn.onclick = () => {
let key = popup.dataset.key;
notes[key] = noteInput.value;
closePopup();
renderCalendar();
};

prevBtn.onclick = () => {
currentDate.setMonth(currentDate.getMonth() - 1);
renderCalendar();
};

nextBtn.onclick = () => {
currentDate.setMonth(currentDate.getMonth() + 1);
renderCalendar();
};

renderCalendar();