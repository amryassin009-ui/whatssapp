const socket = io();

// 1. هات العناصر من الصفحة (تأكد إن الـ IDs دي صحيحة عندك في الـ HTML)
const sendBtn = document.querySelector('.إرسال') || document.getElementById('send-btn'); 
const input = document.querySelector('input') || document.getElementById('input');
const messagesContainer = document.querySelector('.messages-container') || document.body; 

// --- الجزء المهم: الاستقبال لازم يكون بَرّه أي Function تانية ---
socket.off('message_from_server'); // دي حركة صايعة عشان نمسح أي مستمع قديم قبل ما نشغل الجديد
socket.on('message_from_server', (msg) => {
    console.log("رسالة جديدة جت من السيرفر:", msg);
    
    // كود إضافة الرسالة للشاشة
    const item = document.createElement('div');
    item.textContent = msg;
    item.className = 'message-item'; // ضيف الـ CSS اللي يعجبك
    messagesContainer.appendChild(item);
});

// --- الجزء بتاع الإرسال ---
function sendMessage() {
    const msg = input.value;
    if (msg.trim() !== "") {
        socket.emit('message_from_client', msg);
        input.value = ''; // فضي الخانة بعد ما تبعت
    }
}

// اسمع لضغطة الزرار
if(sendBtn) {
    sendBtn.onclick = (e) => {
        e.preventDefault();
        sendMessage();
    };
}

// اسمع لزِرار Enter
input.onkeypress = (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
};
socket.on('message_from_server', (data) => {
    const item = document.createElement('div');
    item.textContent = data.text;
    item.classList.add('message');

    // المقارنة اللي بتحدد الاتجاه
    if (data.senderId === socket.id) {
        // رسالتي أنا: تروح يمين (أخضر)
        item.classList.add('my-message');
    } else {
        // رسالة الشخص التاني: تروح شمال (أبيض)
        item.classList.add('other-message');
    }

    document.getElementById('messages').appendChild(item);
    // سكرول لتحت تلقائي
    const msgContainer = document.getElementById('messages');
    msgContainer.scrollTop = msgContainer.scrollHeight;
});
const socket = io();
const messages = document.getElementById('messages');
const form = document.getElementById('input-container');
const input = document.getElementById('input');

form.onsubmit = (e) => {
    e.preventDefault();
    if (input.value.trim()) {
        socket.emit('message_from_client', input.value);
        input.value = '';
    }
};

socket.on('message_from_server', (data) => {
    const item = document.createElement('div');
    item.textContent = data.text;
    item.classList.add('message');

    // اللعبة كلها هنا:
    if (data.senderId === socket.id) {
        item.classList.add('my-message'); // رسالتك أنت (أخضر)
    } else {
        item.classList.add('other-message'); // رسالة التاني (رصاصي)
    }

    messages.appendChild(item);
    messages.scrollTop = messages.scrollHeight;
});
