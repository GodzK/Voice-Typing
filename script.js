const SpeechRecognize = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognize = new SpeechRecognize();
const btn = document.querySelector('.control');
const meowAudio = document.getElementById('meow-audio');
let isAnswering = false;
let hasSpoken = false;

function recordVoice() {
    if (btn.classList.contains('record') && !isAnswering) {
        recognize.start();
        btn.classList.replace('record', 'pause');
        btn.innerText = "Pause";
    } else {
        recognize.stop();
        btn.classList.replace('pause', 'record');
        btn.innerText = "Record";
    }
}

function setVoicetoText(e) {
    const transcript = e.results[0][0].transcript.trim();
    if (transcript !== "") {
        addUserMessage(transcript);
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
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('cat-message');
    const img = document.createElement('img');
    img.src = 'cat.jpg'; // รูปของแมว
    messageDiv.appendChild(img);
    const text = document.createElement('p');
    text.innerText = message;
    messageDiv.appendChild(text);
    document.querySelector('.chat-container').appendChild(messageDiv);
}

function setUpVoice() {
    recognize.lang = "th-TH";
    recognize.continuous = true;
    btn.addEventListener('click', recordVoice);
    recognize.addEventListener('result', setVoicetoText);
    recognize.addEventListener('end', stopRecording);
}

setUpVoice();
