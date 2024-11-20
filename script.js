const SpeechRecognize = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognize = new SpeechRecognize();
const btn = document.querySelector('.control');
const meowAudio = document.getElementById('meow-audio');
let silenceTimeout;
let isAnswering = false;
let hasSpoken = false; // ตัวแปรสำหรับติดตามว่ามีการพูดหรือไม่

function recordVoice() {
    const isRecord = btn.classList.contains('record');
    if (isRecord && !isAnswering) {
        recognize.start();
        btn.classList.remove('record');
        btn.classList.add('pause');
        btn.innerText = "Pause";
    } else {
        recognize.stop();
        btn.classList.remove('pause');
        btn.classList.add('record');
        btn.innerText = "Record";
    }
}

function setVoicetoText(e) {
    const transcript = e.results[0][0].transcript;
    if (transcript.trim() !== "") {
        addUserMessage(transcript);
        clearTimeout(silenceTimeout);
        hasSpoken = true; // บันทึกว่าผู้ใช้พูด
    }
}

function stopRecording() {
    recognize.stop();
    if (!isAnswering && hasSpoken) {
        playMeow();
    }
}

function playMeow() {
    let thinkingMessage = document.createElement('p');
    thinkingMessage.classList.add('thinking-message');
    thinkingMessage.innerText = 'กำลังคิด...';
    document.querySelector('.chat-container').appendChild(thinkingMessage);
    setTimeout(() => {
        thinkingMessage.style.display = 'none';
        addCatMessage('Meow...');
        meowAudio.play();
        isAnswering = false;
        hasSpoken = false; // รีเซ็ตสถานะการพูด
    }, 2000);
}

function addUserMessage(message) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('user-message');
    const img = document.createElement('img');
    img.src = 'lk.png';
    messageDiv.appendChild(img);
    const text = document.createElement('p');
    text.innerText = message;
    messageDiv.appendChild(text);
    document.querySelector('.chat-container').appendChild(messageDiv);
}

function addCatMessage(message) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('cat-message');
    const img = document.createElement('img');
    img.src = 'cat.jpg';
    messageDiv.appendChild(img);
    const text = document.createElement('p');
    text.innerText = message;
    messageDiv.appendChild(text);
    document.querySelector('.chat-container').appendChild(messageDiv);
}

function continueRecord() {
    const isPause = btn.classList.contains('pause');
    if (isPause && !isAnswering) {
        recognize.start();
    }
}

function setUpVoice() {
    recognize.lang = "th-TH";
    recognize.continuous = true;
    btn.addEventListener('click', recordVoice);
    recognize.addEventListener('result', setVoicetoText);
    recognize.addEventListener('end', () => {
        if (!isAnswering && hasSpoken) { // ตรวจสอบว่าได้พูดจริงก่อนเล่นเสียง
            playMeow();
            continueRecord();
        } else {
            hasSpoken = false; // รีเซ็ตสถานะเมื่อไม่ได้พูด
        }
    });
}

setUpVoice();
