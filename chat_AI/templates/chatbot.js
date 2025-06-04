// Quản lý tin nhắn
let chatHistory = [];

// Gửi tin nhắn
async function sendMessage() {
    const messageInput = document.getElementById('messageInput');
    const message = messageInput.value.trim();
    
    if (message === '') return;
    
    // Thêm tin nhắn của người dùng vào chat
    addMessage(message, 'user');
    messageInput.value = '';
    
    // Hiển thị tin nhắn đang xử lý
    const loadingMessage = addMessage('Đang xử lý...', 'bot');
    
    try {
        // Kiểm tra xem có phải là yêu cầu tính toán không
        const calculationResult = await Calculator.processCalculation(message);
        
        if (calculationResult !== null) {
            // Nếu là phép tính, hiển thị kết quả
            loadingMessage.querySelector('.message-content div:last-child').textContent = `Kết quả: ${calculationResult}`;
        } else {
            // Nếu không phải phép tính, tìm câu trả lời trong knowledge base
            const answer = findAnswer(message);
            if (answer) {
                loadingMessage.querySelector('.message-content div:last-child').textContent = answer;
            } else {
                loadingMessage.querySelector('.message-content div:last-child').textContent = 'Xin lỗi, tôi không hiểu câu hỏi của bạn.';
            }
        }
    } catch (error) {
        console.error('Lỗi khi xử lý tin nhắn:', error);
        loadingMessage.querySelector('.message-content div:last-child').textContent = 'Có lỗi xảy ra khi xử lý yêu cầu của bạn.';
    }
}

// Thêm tin nhắn vào giao diện
function addMessage(message, sender) {
    const chatMessages = document.getElementById('chatMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}-message`;
    
    const avatar = sender === 'user' ? '👤' : '🤖';
    const name = sender === 'user' ? 'Bạn' : 'AI Assistant';
    
    messageDiv.innerHTML = `
        <div class="message-content">
            <div class="message-header">
                <span class="message-avatar">${avatar}</span>
                <span class="message-name">${name}</span>
            </div>
            <div class="message-text">${message}</div>
        </div>
    `;
    
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    
    // Lưu vào lịch sử
    chatHistory.push({
        sender,
        message,
        timestamp: new Date().toISOString()
    });

    return messageDiv;
}

// Định dạng câu trả lời
function formatAnswer(answer) {
    return `
        <div class="answer-content">
            <div class="answer-text">${answer.answer}</div>
            <div class="answer-meta">
                <span class="subject">${answer.subject}</span>
                <span class="topic">${answer.topic}</span>
            </div>
        </div>
    `;
}

// Định dạng câu trả lời cho phép tính
function formatCalculationAnswer(result) {
    return `
        <div class="answer-content calculation">
            <div class="answer-text">${result.answer}</div>
            <div class="calculation-details">
                <div class="detail-item">
                    <span class="label">Phép tính:</span>
                    <span class="value">${result.details.operation}</span>
                </div>
                <div class="detail-item">
                    <span class="label">Khoảng:</span>
                    <span class="value">${result.details.range}</span>
                </div>
                <div class="detail-item">
                    <span class="label">Kết quả:</span>
                    <span class="value">${result.details.result}</span>
                </div>
            </div>
        </div>
    `;
}

// Xử lý sự kiện nhấn Enter
document.addEventListener('DOMContentLoaded', function() {
    const messageInput = document.getElementById('messageInput');
    const sendBtn = document.getElementById('sendBtn');
    
    if (messageInput) {
        messageInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
    }
    
    if (sendBtn) {
        sendBtn.addEventListener('click', sendMessage);
    }
});

// Thêm style cho tin nhắn
const style = document.createElement('style');
style.textContent = `
    .message {
        margin: 10px 0;
        display: flex;
        flex-direction: column;
    }

    .user-message {
        align-items: flex-end;
    }

    .bot-message {
        align-items: flex-start;
    }

    .message-content {
        max-width: 70%;
        padding: 10px 15px;
        border-radius: 15px;
        background: #f0f2f5;
    }

    .user-message .message-content {
        background: #4a90e2;
        color: white;
    }

    .bot-message .message-content {
        background: #f0f2f5;
        color: #333;
    }

    .message-header {
        display: flex;
        align-items: center;
        gap: 8px;
        margin-bottom: 5px;
    }

    .message-avatar {
        font-size: 1.2em;
    }

    .message-name {
        font-weight: bold;
        font-size: 0.9em;
    }

    .message-text {
        word-wrap: break-word;
    }

    .welcome-message {
        text-align: center;
        padding: 20px;
        color: #666;
        font-style: italic;
    }
`;
document.head.appendChild(style);

// Thêm style cho phần tính toán
const calculationStyle = document.createElement('style');
calculationStyle.textContent = `
    .calculation {
        background: #f8f9fa;
        border-radius: 15px;
        padding: 15px;
    }

    .calculation-details {
        margin-top: 10px;
        padding-top: 10px;
        border-top: 1px solid #e9ecef;
    }

    .detail-item {
        display: flex;
        justify-content: space-between;
        margin: 5px 0;
        font-size: 0.9em;
    }

    .detail-item .label {
        color: #666;
        font-weight: 500;
    }

    .detail-item .value {
        color: #4a90e2;
        font-weight: 600;
    }
`;
document.head.appendChild(calculationStyle);

// Tìm câu trả lời phù hợp
function findAnswer(message) {
    const lowerMessage = message.toLowerCase();
    
    // Tìm kiếm trong cơ sở kiến thức
    const knowledgeBase = window.AIKnowledge ? window.AIKnowledge.getKnowledgeBase() : [];
    
    // Tìm kiếm chính xác
    const exactMatch = knowledgeBase.find(item => 
        item.keyword.toLowerCase() === lowerMessage
    );
    
    if (exactMatch) {
        return exactMatch.answer;
    }
    
    // Tìm kiếm một phần
    const partialMatch = knowledgeBase.find(item => 
        lowerMessage.includes(item.keyword.toLowerCase()) ||
        item.keyword.toLowerCase().includes(lowerMessage)
    );
    
    if (partialMatch) {
        return partialMatch.answer;
    }
    
    // Trả lời mặc định nếu không tìm thấy
    return "Xin lỗi, tôi không hiểu câu hỏi của bạn. Bạn có thể thử diễn đạt lại hoặc hỏi về một chủ đề khác.";
}

// Xóa lịch sử chat
function clearChat() {
    const chatMessages = document.getElementById('chatMessages');
    chatMessages.innerHTML = `
        <div class="welcome-message">
            Chào mừng bạn đến với AI Learning Assistant! <br>
            Hãy đặt câu hỏi về các môn học hoặc yêu cầu tính toán.
        </div>
    `;
    chatHistory = [];
}

// Thêm kiến thức mới
AIKnowledge.addKnowledge(
    'physics',
    'mechanics',
    'Định luật Newton thứ nhất là gì?',
    'Định luật Newton thứ nhất (định luật quán tính): Một vật sẽ giữ nguyên trạng thái đứng yên hoặc chuyển động thẳng đều nếu không có lực nào tác dụng lên nó.'
);

// Tìm câu trả lời
const answer = AIKnowledge.findAnswer('Định luật Newton thứ nhất là gì?');
console.log(answer);
// Kết quả: { answer: "...", subject: "Vật lý", topic: "Cơ học" } 