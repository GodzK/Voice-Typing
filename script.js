const SpeechRecognize = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognize = new SpeechRecognize();
const btn = document.querySelector('.controls button');
const meowAudio = document.getElementById('meow-audio');
let isAnswering = false;
let hasSpoken = false;
let trans = "";



document.addEventListener("DOMContentLoaded", () => {
    const creditContent = document.querySelector(".credit-content");
  
    creditContent.addEventListener("animationend", () => {
      creditContent.style.animation = "none"; // หยุดแอนิเมชันเมื่อจบ
    });
  });
  

  
window.addEventListener('load', function () {
    const preloader = document.querySelector('.preloader');

    // ตั้งเวลา 3 วินาทีในการซ่อนหน้า Loading Page
    setTimeout(() => {
        preloader.style.opacity = '0'; // เพิ่ม Animation การเลือนหาย
        preloader.style.transition = 'opacity 0.5s ease';

        // del element from dom
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }, 1000); 
});


function recordVoice() {
    if (btn.classList.contains('record') && !isAnswering) {
        recognize.start();
        btn.classList.replace('record', 'pause');
        btn.innerText = "หยุด"; // Change text to "Pause" when recording
    } else {
        recognize.stop();
        btn.classList.replace('pause', 'record');
        btn.innerText = "บันทึก"; // Change text to "Record" when not recording
    }
}

function setVoicetoText(e) {
    const transcript = e.results[0][0].transcript.trim();
    if (transcript !== "") {
        addUserMessage(transcript);
        trans = transcript;
        hasSpoken = true;
    }
}

function stopRecording() {
    recognize.stop();
    if (!isAnswering && hasSpoken) {
        playMeow();
    }
}

function playMeow() {
    const thinkingMessage = document.createElement('p');
    thinkingMessage.classList.add('thinking-message');
    thinkingMessage.innerText = 'กำลังคิด...';
    document.querySelector('.chat-container').appendChild(thinkingMessage);

    setTimeout(() => {
        thinkingMessage.remove();
        addCatMessage('Meow...Meow...Meow');
        meowAudio.play();
        isAnswering = false;
        hasSpoken = false;
    }, 2000);
}

function addUserMessage(message) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('user-message');
    const img = document.createElement('img');
    img.src = 'lk.png'; // รูปของผู้ใช้
    messageDiv.appendChild(img);
    const text = document.createElement('p');
    text.innerText = message;
    messageDiv.appendChild(text);
    document.querySelector('.chat-container').appendChild(messageDiv);
}

function addCatMessage(message) {
    console.log(trans);

    const messageDiv = document.createElement('div');
    messageDiv.classList.add('cat-message');
    const img = document.createElement('img');
    img.src = 'cat.jpg'; // รูปของแมว
    messageDiv.appendChild(img);
    const text = document.createElement('p');
    let random = Math.floor(Math.random() * 4) + 1;
    let played = true;

    if (trans.includes("3") || trans.includes("สาม")  && played) {
        played = false;
        text.innerText = 'Meowww !!';
        const audio = new Audio('เเมวตี.mp3');
        audio.play(); 
    }
    if (trans.includes("2") && played) {
        played = false;
        text.innerText = 'Meow Meow';
        const audio = new Audio('เมี๊ยวๆ.mp3');
        audio.play(); 
    }
    if (trans.includes("1") && played) {
        played = false;
        text.innerText = 'Meow...';
        const audio = new Audio('เมียว.mp3');
        audio.play(); 
    }

    if (random == 1 && played) {
        played = false;
        text.innerText = 'Meow Meow';
        const audio = new Audio('เมี๊ยวๆ.mp3');
        audio.play(); 
    }
    if (random == 2 && played) {
        played = false;  
        text.innerText = 'Meow';
        const audio = new Audio('เหมียว.mp3');
        audio.play(); 
    }
    if (random == 3 && played) {
        played = false;
        text.innerText = 'Meowww !!';
        const audio = new Audio('เแมวตี.mp3');
        audio.play(); 
    }
    if (random == 4 && played) {
        played = false;
        text.innerText = 'Meow...';
        const audio = new Audio('เมียว.mp3');
        audio.play(); 
    }
      
    messageDiv.appendChild(text);
    document.querySelector('.chat-container').appendChild(messageDiv);
}

function setUpVoice() {
    recognize.lang = "th-TH";
    recognize.continuous = true;
    btn.addEventListener('click', recordVoice);
    console.log("clicked")
    recognize.addEventListener('result', setVoicetoText);
    recognize.addEventListener('end', stopRecording);
}

document.getElementById("Back").onclick = function () {
         
    window.location.href = "/landingpage.html"; // Redirects to the page
  
};
setUpVoice();




