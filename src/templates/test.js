// Test configuration for each subject
const testConfig = {
    math: {
        title: "Bài kiểm tra Toán học",
        time: 30,
        questions: 15
    },
    physics: {
        title: "Bài kiểm tra Vật lý",
        time: 25,
        questions: 12
    },
    chemistry: {
        title: "Bài kiểm tra Hóa học",
        time: 35,
        questions: 18
    },
    english: {
        title: "Bài kiểm tra Tiếng Anh",
        time: 40,
        questions: 20
    },
    literature: {
        title: "Bài kiểm tra Văn học",
        time: 45,
        questions: 10
    }
};

let currentTest = null;
let timer = null;
let timeRemaining = 0;

function openSubjectTest(subject) {
    if (!isLoggedIn()) {
        alert('Vui lòng đăng nhập để làm bài kiểm tra!');
        return;
    }

    const config = testConfig[subject];
    if (!config) return;

    currentTest = subject;
    document.getElementById('testTitle').textContent = config.title;
    document.getElementById('testTime').textContent = config.time;
    document.getElementById('testQuestions').textContent = config.questions;
    timeRemaining = config.time * 60;
    updateTimerDisplay();

    // Load test questions
    loadTestQuestions(subject);

    // Show modal
    document.getElementById('testModal').style.display = 'block';

    // Start timer
    startTimer();
}

function loadTestQuestions(subject) {
    // Lấy container để hiển thị câu hỏi trong modal của AI.html
    const questionsContainer = document.getElementById('testContent'); // ID này cần khớp với AI.html
    questionsContainer.innerHTML = ''; // Xóa nội dung cũ

    // Lấy dữ liệu quiz dựa trên môn học từ quizData (đã sao chép từ test.html và đặt ở cuối file test.js)
    const quiz = quizData[subject];
    if (!quiz) {
        console.error('Không tìm thấy dữ liệu bài kiểm tra cho môn học:', subject);
        // Có thể hiển thị thông báo lỗi cho người dùng nếu cần
        return;
    }

    // Lưu dữ liệu quiz hiện tại và userAnswers (sử dụng biến global đã khai báo)
    currentQuiz = quiz;
    userAnswers = {};
    
    // Cập nhật thông tin quiz trong header modal của AI.html (ID cần khớp)
    document.getElementById('testTitle').textContent = quiz.title; // ID: testTitle trong AI.html
    document.getElementById('testTime').textContent = quiz.duration; // ID: testTime trong AI.html, chỉ đặt giá trị số
    document.getElementById('testQuestions').textContent = quiz.questions.length; // ID: testQuestions trong AI.html
    
    // Bắt đầu timer khi tải câu hỏi (hàm startTimer đã được sao chép và điều chỉnh ID timer)
    startTimer(quiz.duration);

    // Hiển thị phần quiz và ẩn phần kết quả khi bắt đầu bài mới
    document.getElementById('testContent').style.display = 'block';
    document.getElementById('testResultContent').style.display = 'none'; // testResultContent là ID tôi đề xuất thêm vào AI.html modal
    document.getElementById('testTimer').style.display = 'block';
    document.getElementById('submitTestButton').style.display = 'block';

    // Tạo và hiển thị HTML cho từng câu hỏi dựa trên cấu trúc từ test.html
    quiz.questions.forEach((q, index) => {
        const questionDiv = document.createElement('div');
        questionDiv.className = 'question'; // Sử dụng class từ test.html CSS
        
        let optionsHtml = q.options.map((option, optIndex) => `
            <label class="option" onclick="selectAnswer(${index}, ${optIndex})">
                <input type="radio" name="question${index}" value="${optIndex}">
                <span>${option}</span>
            </label>
        `).join('');

        questionDiv.innerHTML = `
            <div class="question-number">Câu ${index + 1}:</div>
            <div class="question-text">${q.question}</div>
            <div class="options">
                ${optionsHtml}
            </div>
        `;
        
        questionsContainer.appendChild(questionDiv);
    });

    // Nút nộp bài đã được hiển thị ở trên
}

// Hàm selectAnswer (đã sao chép từ test.html), thêm cập nhật giao diện trực quan
function selectAnswer(questionIndex, optionIndex) {
    userAnswers[questionIndex] = optionIndex;
    
    // Lấy tất cả các tùy chọn cho câu hỏi này
    const options = document.querySelectorAll(`label.option input[name="question${questionIndex}"]`);
    
    options.forEach((radio, index) => {
        const optionLabel = radio.closest('label.option');
        if (index === optionIndex) {
            radio.checked = true;
            optionLabel.classList.add('selected'); // Thêm class 'selected' cho tùy chọn được chọn
        } else {
            radio.checked = false;
            optionLabel.classList.remove('selected'); // Xóa class 'selected' khỏi các tùy chọn khác
        }
    });

    // Cập nhật giao diện radio button (tùy chọn cũ)
    // const options = document.querySelectorAll(`input[name="question${questionIndex}"]`);\n    // options.forEach((radio, index) => {\n    //     radio.checked = (index === optionIndex);\n    // });\n}
}

// Sao chép hàm startTimer từ test.html, điều chỉnh ID timer
function startTimer(minutes) {
    // Clear existing timer if any
    if (timerInterval) {
        clearInterval(timerInterval);
    }
    
    timeLeft = minutes * 60;
    updateTimerDisplay();
    
    timerInterval = setInterval(() => {
        timeLeft--;
        updateTimerDisplay();
        
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            submitTest(); // Gọi hàm submitTest trong test.js
        }
    }, 1000);
}

// Sao chép hàm updateTimerDisplay từ test.html, điều chỉnh ID timer
function updateTimerDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    // Cập nhật phần tử thời gian còn lại trong AI.html (ID cần khớp)
    const timerElement = document.getElementById('timeRemaining'); // ID: timeRemaining trong AI.html
    if (timerElement) {
        timerElement.textContent = 
            `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
}

// Sao chép hàm submitQuiz từ test.html, đổi tên thành submitTest và điều chỉnh ID kết quả
function submitTest() {
    clearInterval(timerInterval);
    
    // Tính điểm
    let correctAnswers = 0;
    const totalQuestions = currentQuiz.questions.length;
    
    // Hiển thị kết quả chi tiết (đảm bảo ID container khớp với AI.html)
    const detailedContainer = document.getElementById('testResultContent'); // ID: testResultContent trong AI.html
    detailedContainer.innerHTML = '';
    
    currentQuiz.questions.forEach((q, index) => {
        const userAnswer = userAnswers[index];
        // Sử dụng q.correct là index của đáp án đúng
        const isCorrect = userAnswer === q.correct;
        
        if (isCorrect) {
            correctAnswers++;
        }
        
        const resultDiv = document.createElement('div');
        resultDiv.className = 'question'; // Sử dụng lại class question cho mục kết quả chi tiết
        resultDiv.innerHTML = `
            <div class="question-number">Câu ${index + 1}:</div>
            <div class="question-text">${q.question}</div>
            <div class="options">
                ${q.options.map((option, optIndex) => {
                    let className = 'option';
                    if (optIndex === q.correct) {
                        className += ' correct'; // Class correct từ test.html
                    } else if (optIndex === userAnswer && userAnswer !== q.correct) {
                        className += ' incorrect user-selected'; // Class incorrect và user-selected từ test.html
                    } else if (optIndex === userAnswer) {
                         className += ' user-selected'; // Class user-selected từ test.html
                    }
                    
                    return `
                        <div class="${className}">
                            <span>${option}</span>
                            ${optIndex === q.correct ? ' ✓' : ''}
                            ${optIndex === userAnswer && userAnswer !== q.correct ? ' ✗' : ''}
                        </div>
                    `;
                }).join('')}
            </div>
            ${!isCorrect && q.explanation ? `
                <div class="explanation">
                    <div class="explanation-title">💡 Giải thích:</div>
                    <div class="explanation-content">${q.explanation}</div>
                </div>
            ` : ''}
        `;
        detailedContainer.appendChild(resultDiv);
    });
    
    // Cập nhật tổng kết điểm (đảm bảo ID khớp với AI.html)
    // AI.html modal không có phần score-summary riêng như test.html, sẽ hiển thị trong testResultContent
    // Cần tạo HTML cho phần tổng kết điểm và chèn vào đầu testResultContent
    const scoreSummaryHtml = `
        <div class="score-summary">
            <div class="score-title">Kết quả bài kiểm tra</div>
            <div class="score-value" id="scoreValue">${correctAnswers}/${totalQuestions}</div>
            <div class="score-details">
                <div class="score-item">
                    <div id="correctCount">${correctAnswers}</div>
                    <div>Đúng</div>
                </div>
                <div class="score-item">
                    <div id="incorrectCount">${totalQuestions - correctAnswers}</div>
                    <div>Sai</div>
                </div>
                <div class="score-item">
                    <div id="scorePercentage">${Math.round((correctAnswers / totalQuestions) * 100)}%</div>
                    <div>Điểm</div>
                </div>
            </div>
        </div>
    `;
    detailedContainer.innerHTML = scoreSummaryHtml + detailedContainer.innerHTML; // Chèn tổng kết lên đầu

    // Ẩn phần quiz và hiển thị phần kết quả (đảm bảo ID khớp với AI.html)
    // AI.html modal có thể không dùng quizSection/resultsSection, cần điều chỉnh display của testContent và testResultContent
    document.getElementById('testContent').style.display = 'none'; // ID testContent của AI.html
    document.getElementById('submitTestButton').style.display = 'none'; // ID submitTestButton của AI.html
    document.getElementById('testTimer').style.display = 'none'; // ID testTimer của AI.html
    document.getElementById('testResultContent').style.display = 'block'; // ID testResultContent của AI.html

    // Thêm nút làm lại bài kiểm tra (tùy chọn, test.html có nút này)
    // Cần thêm nút này vào AI.html hoặc tạo động ở đây
    // Ví dụ tạo động:
    const restartBtn = document.createElement('button');
    restartBtn.textContent = 'Làm lại bài kiểm tra';
    restartBtn.className = 'restart-btn'; // Sử dụng class từ test.html style
    restartBtn.onclick = restartQuiz; // Gọi hàm restartQuiz
    detailedContainer.appendChild(restartBtn); // Thêm nút vào cuối phần kết quả
}

// Sao chép hàm restartQuiz từ test.html
function restartQuiz() {
    // Ẩn phần kết quả và hiển thị lại phần quiz (đảm bảo ID khớp với AI.html)
    document.getElementById('testResultContent').style.display = 'none';
    document.getElementById('testContent').style.display = 'block';
    document.getElementById('testTimer').style.display = 'block';
    document.getElementById('submitTestButton').style.display = 'block';
    
    // Reset dữ liệu và hiển thị lại câu hỏi
    userAnswers = {};
    displayQuestions(); // Hàm này cần được điều chỉnh để dùng currentQuiz và cập nhật testContent
    startTimer(currentQuiz.duration); // Bắt đầu lại timer
}

// Biến global để lưu dữ liệu quiz và đáp án
let currentQuiz = null;
let userAnswers = {};
let timerInterval = null;
let timeLeft = 0;

// Dữ liệu câu hỏi sẽ được định nghĩa ở đây hoặc lấy từ learningData.js nếu cần
// Tạm thời sao chép quizData từ test.html vào đây để test
const quizData = {
    math: {
        title: 'Bài kiểm tra Toán học',
        duration: 30,
        questions: [
            {
                question: 'Giải phương trình: 2x + 5 = 13',
                options: ['x = 3', 'x = 4', 'x = 5', 'x = 6'],
                correct: 1,
                explanation: 'Giải: 2x + 5 = 13 → 2x = 13 - 5 = 8 → x = 8/2 = 4'
            },
            {
                question: 'Tính đạo hàm của hàm số f(x) = x² + 3x - 2',
                options: ["f'(x) = 2x + 3", "f'(x) = x + 3", "f'(x) = 2x - 3", "f'(x) = 2x + 6"],
                correct: 0,
                explanation: "Áp dụng quy tắc đạo hàm: (x²)' = 2x, (3x)' = 3, (hằng số)' = 0"
            },
            {
                question: 'Trong tam giác vuông, nếu một cạnh góc vuông dài 3cm và cạnh huyền dài 5cm, cạnh góc vuông còn lại dài bao nhiêu?',
                options: ['4cm', '6cm', '7cm', '8cm'],
                correct: 0,
                explanation: 'Áp dụng định lý Pythagoras: a² + b² = c² → 3² + b² = 5² → b² = 25 - 9 = 16 → b = 4cm'
            },
            {
                question: 'Giá trị của log₂(8) là bao nhiêu?',
                options: ['2', '3', '4', '8'],
                correct: 1,
                explanation: 'log₂(8) = log₂(2³) = 3 × log₂(2) = 3 × 1 = 3'
            },
            {
                question: 'Tổng của dãy số cộng: 2, 5, 8, 11, ..., 29 là bao nhiêu?',
                options: ['155', '160', '165', '170'],
                correct: 0,
                explanation: 'Dãy có công sai d=3, số hạng đầu a₁=2, số hạng cuối a₁₀=29. Tổng S₁₀ = 10×(2+29)/2 = 155'
            },
            {
                question: 'Tìm nghiệm của phương trình bậc hai: x² - 5x + 6 = 0',
                options: ['x = 2 và x = 3', 'x = -2 và x = -3', 'x = 1 và x = 6', 'x = -1 và x = -6'],
                correct: 0,
                explanation: 'Giải: x² - 5x + 6 = 0 → (x-2)(x-3) = 0 → x = 2 hoặc x = 3'
            },
            {
                question: 'Tính tích phân: ∫(2x + 3)dx',
                options: ['x² + 3x + C', '2x² + 3x + C', 'x² + 3', '2x² + 3'],
                correct: 0,
                explanation: '∫(2x + 3)dx = x² + 3x + C, với C là hằng số tích phân'
            },
            {
                question: 'Trong không gian Oxyz, khoảng cách từ điểm M(1,2,3) đến mặt phẳng (P): 2x + y - z + 1 = 0 là:',
                options: ['√6', '2√6', '3√6', '4√6'],
                correct: 1,
                explanation: 'Áp dụng công thức khoảng cách từ điểm đến mặt phẳng: d = |2(1) + 1(2) - 1(3) + 1|/√(2² + 1² + (-1)²) = 2/√6 = 2√6'
            }
        ]
    },
    physics: {
        title: 'Bài kiểm tra Vật lý',
        duration: 25,
        questions: [
            {
                question: 'Công thức tính vận tốc trong chuyển động thẳng đều là gì?',
                options: ['v = s/t', 'v = at', 'v = s×t', 'v = a/t'],
                correct: 0,
                explanation: 'Trong chuyển động thẳng đều, vận tốc = quãng đường / thời gian: v = s/t'
            },
            {
                question: 'Đơn vị đo lực trong hệ SI là gì?',
                options: ['Kilogram (kg)', 'Newton (N)', 'Joule (J)', 'Watt (W)'],
                correct: 1,
                explanation: 'Newton (N) là đơn vị đo lực trong hệ đo lường quốc tế SI'
            },
            {
                question: 'Định luật II Newton được phát biểu như thế nào?',
                options: ['F = ma', 'F = mv', 'F = m/a', 'F = a/m'],
                correct: 0,
                explanation: 'Định luật II Newton: Lực tác dụng lên vật bằng khối lượng nhân với gia tốc: F = ma'
            },
            {
                question: 'Công thức tính công cơ học là:',
                options: ['A = F.s', 'A = F/s', 'A = F-s', 'A = F+s'],
                correct: 0,
                explanation: 'Công cơ học được tính bằng tích của lực và quãng đường dịch chuyển: A = F.s'
            },
            {
                question: 'Định luật bảo toàn năng lượng phát biểu rằng:',
                options: ['Năng lượng không tự sinh ra hoặc mất đi', 'Năng lượng có thể tự sinh ra', 'Năng lượng có thể mất đi', 'Năng lượng luôn tăng'],
                correct: 0,
                explanation: 'Định luật bảo toàn năng lượng: Năng lượng không tự sinh ra hoặc mất đi, mà chỉ chuyển từ dạng này sang dạng khác'
            },
            {
                question: 'Hiệu điện thế giữa hai điểm trong mạch điện được tính bằng:',
                options: ['U = I.R', 'U = I/R', 'U = R/I', 'U = I+R'],
                correct: 0,
                explanation: 'Theo định luật Ohm, hiệu điện thế bằng tích của cường độ dòng điện và điện trở: U = I.R'
            }
        ]
    },
    chemistry: {
        title: 'Bài kiểm tra Hóa học',
        duration: 35,
        questions: [
            {
                question: 'Công thức hóa học của nước là gì?',
                options: ['H₂O', 'CO₂', 'NaCl', 'CH₄'],
                correct: 0,
                explanation: 'Nước có công thức hóa học là H₂O (2 nguyên tử Hydrogen + 1 nguyên tử Oxygen)'
            },
            {
                question: 'Nguyên tố nào có ký hiệu hóa học là "Au"?',
                options: ['Bạc', 'Vàng', 'Đồng', 'Sắt'],
                correct: 1,
                explanation: 'Au là ký hiệu hóa học của vàng (từ tiếng Latin "aurum")'
            },
            {
                question: 'Phản ứng nào sau đây là phản ứng oxi hóa khử?',
                options: ['2H₂ + O₂ → 2H₂O', 'NaCl + AgNO₃ → AgCl + NaNO₃', 'CaO + H₂O → Ca(OH)₂', 'NH₃ + HCl → NH₄Cl'],
                correct: 0,
                explanation: '2H₂ + O₂ → 2H₂O là phản ứng oxi hóa khử vì có sự thay đổi số oxi hóa của H và O'
            },
            {
                question: 'Dung dịch có pH = 7 là:',
                options: ['Trung tính', 'Axit', 'Bazơ', 'Không xác định'],
                correct: 0,
                explanation: 'Dung dịch có pH = 7 là trung tính, pH < 7 là axit, pH > 7 là bazơ'
            },
            {
                question: 'Công thức hóa học của axit sunfuric là:',
                options: ['H₂SO₄', 'HCl', 'HNO₃', 'H₃PO₄'],
                correct: 0,
                explanation: 'Axit sunfuric có công thức hóa học là H₂SO₄'
            },
            {
                question: 'Nguyên tố nào sau đây là kim loại kiềm?',
                options: ['Na', 'Ca', 'Fe', 'Cu'],
                correct: 0,
                explanation: 'Na (Natri) là kim loại kiềm, thuộc nhóm IA trong bảng tuần hoàn'
            }
        ]
    },
    english: {
        title: 'Bài kiểm tra Tiếng Anh',
        duration: 40,
        questions: [
            {
                question: 'Choose the correct form: "She _____ to school every day."',
                options: ['has been', 'is', 'was', 'were'],
                correct: 0,
                explanation: 'Present Perfect Continuous is used for actions that started in the past and continue to the present'
            },
            {
                question: 'Which word is a synonym of "happy"?',
                options: ['Joyful', 'Sad', 'Angry', 'Tired'],
                correct: 0,
                explanation: 'Joyful means feeling or expressing great happiness'
            },
            {
                question: 'Choose the correct preposition: "I am interested _____ learning English."',
                options: ['in', 'on', 'at', 'for'],
                correct: 0,
                explanation: 'The correct preposition after "interested" is "in"'
            },
            {
                question: 'Which sentence is grammatically correct?',
                options: ['If I were you, I would study harder', 'If I was you, I would study harder', 'If I am you, I would study harder', 'If I be you, I would study harder'],
                correct: 0,
                explanation: 'In conditional sentences type 2, we use "were" for all persons in the if-clause'
            },
            {
                question: 'Choose the correct phrasal verb: "Please _____ your shoes before entering the house."',
                options: ['take off', 'take on', 'take in', 'take up'],
                correct: 0,
                explanation: '"Take off" means to remove something, especially clothes'
            },
            {
                question: 'Which word is an antonym of "begin"?',
                options: ['End', 'Start', 'Continue', 'Proceed'],
                correct: 0,
                explanation: 'End is the opposite of begin, meaning to bring something to a conclusion'
            }
        ]
    },
    literature: {
        title: 'Bài kiểm tra Văn học',
        duration: 45,
        questions: [
            {
                question: 'Tác phẩm "Tắt đèn" của nhà văn nào?',
                options: ['Ngô Tất Tố', 'Nam Cao', 'Vũ Trọng Phụng', 'Nguyễn Công Hoan'],
                correct: 0,
                explanation: 'Tắt đèn là tiểu thuyết của nhà văn Ngô Tất Tố, xuất bản năm 1939'
            },
            {
                question: 'Thể thơ của bài thơ "Tây Tiến" là:',
                options: ['Thất ngôn', 'Lục bát', 'Song thất lục bát', 'Tự do'],
                correct: 0,
                explanation: 'Bài thơ Tây Tiến của Quang Dũng được viết theo thể thơ thất ngôn'
            },
            {
                question: 'Tác phẩm "Chí Phèo" của nhà văn nào?',
                options: ['Nam Cao', 'Ngô Tất Tố', 'Vũ Trọng Phụng', 'Nguyễn Công Hoan'],
                correct: 0,
                explanation: 'Chí Phèo là truyện ngắn của nhà văn Nam Cao, xuất bản năm 1941'
            },
            {
                question: 'Bài thơ "Đây thôn Vĩ Dạ" của Hàn Mặc Tử được viết theo thể thơ:',
                options: ['Thất ngôn', 'Lục bát', 'Song thất lục bát', 'Tự do'],
                correct: 0,
                explanation: 'Bài thơ Đây thôn Vĩ Dạ được viết theo thể thơ thất ngôn'
            },
            {
                question: 'Tác phẩm "Số đỏ" của nhà văn nào?',
                options: ['Vũ Trọng Phụng', 'Nam Cao', 'Ngô Tất Tố', 'Nguyễn Công Hoan'],
                correct: 0,
                explanation: 'Số đỏ là tiểu thuyết của nhà văn Vũ Trọng Phụng, xuất bản năm 1936'
            },
            {
                question: 'Thể loại của tác phẩm "Truyện Kiều" là:',
                options: ['Truyện thơ', 'Tiểu thuyết', 'Truyện ngắn', 'Kịch'],
                correct: 0,
                explanation: 'Truyện Kiều là một truyện thơ Nôm của Nguyễn Du, viết bằng thể lục bát'
            }
        ]
    }
};

// Xử lý đáp án
function handleAnswer(questionId, answer) {
    const test = JSON.parse(localStorage.getItem('currentTest'));
    test.userAnswers[questionId] = answer;
    localStorage.setItem('currentTest', JSON.stringify(test));
}

// Lấy tên môn học
function getSubjectName(subject) {
    const names = {
        math: 'Toán học',
        physics: 'Vật lý',
        chemistry: 'Hóa học',
        english: 'Tiếng Anh',
        literature: 'Văn học'
    };
    return names[subject] || subject;
}

// Thêm style cho bài kiểm tra
const testStyle = document.createElement('style');
testStyle.textContent = `
    .question-container {
        background: #fff;
        border-radius: 10px;
        padding: 20px;
        margin-bottom: 20px;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    .question-header {
        margin-bottom: 15px;
    }

    .question-number {
        font-weight: bold;
        color: #3498db; /* Màu xanh */
        margin-bottom: 10px;
        font-size: 18px; /* Cỡ chữ bạn muốn */
    }

    .question-text {
        font-size: 1.1em;
        color: #333;
    }

    .options-container {
        display: flex;
        flex-direction: column;
        gap: 10px;
    }

    .option {
        display: flex;
        align-items: center;
        padding: 10px;
        border: 1px solid #e0e0e0;
        border-radius: 5px;
        cursor: pointer;
        transition: all 0.3s ease;
    }

    .option:hover {
        background: #f5f5f5;
    }

    .option input[type="radio"] {
        margin-right: 10px;
    }

    .test-result {
        padding: 20px;
    }

    .result-details {
        background: #f8f9fa;
        padding: 20px;
        border-radius: 10px;
        margin-bottom: 20px;
    }

    .answer-item {
        background: #fff;
        padding: 15px;
        border-radius: 8px;
        margin-bottom: 15px;
        border-left: 4px solid #e0e0e0;
    }

    .answer-item.correct {
        border-left-color: #28a745;
    }

    .answer-item.incorrect {
        border-left-color: #dc3545;
    }

    .explanation {
        color: #666;
        font-style: italic;
        margin-top: 10px;
    }

    /* Style for selected option */
    .option.selected {
        background: #e0f7fa; /* Nền xanh dương nhạt */
        border-color: #00bcd4; /* Viền xanh dương */
        font-weight: bold; /* Chữ đậm */
    }
`;
document.head.appendChild(testStyle); 