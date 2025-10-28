// Generating ticket 

const uploadContainer = document.getElementById('uploadContainer');
const fileInput = document.getElementById('fileInput');
const preview = document.getElementById('preview');
const defaultIcon = document.getElementById('defaultIcon');
let subtext = document.getElementById("subtext");

let ticketbtn = document.getElementById("ticketbtn");
let maintext = document.getElementById("maintext");
let subtexttop = document.getElementById("form");
let secondpara = document.getElementById("secondpara");
let ticket = document.getElementById("ticket");

// === Upload logic ===
uploadContainer.addEventListener('click', () => fileInput.click());
fileInput.addEventListener('change', handleFile);

uploadContainer.addEventListener('dragover', (e) => {
  e.preventDefault();
  uploadContainer.classList.add('dragover');
});

uploadContainer.addEventListener('dragleave', () => {
  uploadContainer.classList.remove('dragover');
});

uploadContainer.addEventListener('drop', (e) => {
  e.preventDefault();
  uploadContainer.classList.remove('dragover');
  const file = e.dataTransfer.files[0];
  handleFile({ target: { files: [file] } });
});

function handleFile(event) {
  const file = event.target.files[0];
  if (!file) return;

  const validTypes = ['image/jpeg', 'image/png'];
  const maxSize = 500 * 1024; // 500 KB

  if (!validTypes.includes(file.type)) {
    alert('Only JPG and PNG images are allowed!');
    fileInput.value = '';
    return;
  }

  if (file.size > maxSize) {
    alert('Image size must be less than 500 KB!');
    fileInput.value = '';
    return;
  }

  let preview2 = document.getElementById("preview2");
  preview2.style.cssText = `
    width:80px;
    height:80px;
    background-position: center;
    background-size: cover;
  `;

  const reader = new FileReader();
  reader.onload = function(e) {
    preview.src = e.target.result;
    preview2.src = e.target.result;
    subtext.textContent = "Click again to choose new image";
    preview.classList.remove('d-none');
    defaultIcon.classList.add('d-none');
  };

  reader.readAsDataURL(file);
}

// === Ticket Generation + Validation ===
ticketbtn.addEventListener("click", (event) => {
  event.preventDefault();

  // Get values
  let fname = document.getElementById("fName").value.trim();
  let email = document.getElementById("email").value.trim();
  let gName = document.getElementById("gName").value.trim();
  let imageUploaded = fileInput.files.length > 0;

  // Validation
  if (fname === "" || email === "" || gName === "" || !imageUploaded) {
    alert("Please fill all fields and upload your image before generating the ticket!");
    return; // Stop here if invalid
  }

  // If all fields are filled — generate the ticket
  let text = `Congrats <span style="background: linear-gradient(to right, #FF7F50, #808080);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;">${fname}</span>!<br> Your Ticket is Ready!`;
  maintext.innerHTML = text;

  subtexttop.style.display = "none";
  let para2 = `We've emailed your ticket to <br><span style="color:#FF7F50;">${email}</span><br>will send updates in the run up to the event`;
  secondpara.innerHTML = para2;

  ticket.style.display = "block";

  const today = new Date();
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  const formattedDate = today.toLocaleDateString('en-US', options);
  document.getElementById("paradate").textContent = formattedDate;

  document.getElementById("FNametic").textContent = fname;
  document.getElementById("GNametic").textContent = gName;

  ticket.style.cssText = `
    display: flex;
    justify-content: center;
  `;

  // Generate random 6-digit number with #
let randomNumber = Math.floor(100000 + Math.random() * 900000);
let ticketNumber = "#" + randomNumber;
let verticalNumber = ticketNumber.split("").join("<br>");
// Display vertically
let ticketNumElem = document.getElementById("ticketNumber");
ticketNumElem.innerHTML = verticalNumber;


});

