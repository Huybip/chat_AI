// Cấu trúc dữ liệu cho kiến thức AI
const knowledgeBase = {
    math: {
        name: "Toán học",
        topics: {
            algebra: {
                name: "Đại số",
                questions: []
            },
            geometry: {
                name: "Hình học",
                questions: []
            },
            calculus: {
                name: "Giải tích",
                questions: []
            }
        }
    },
    physics: {
        name: "Vật lý",
        topics: {
            mechanics: {
                name: "Cơ học",
                questions: []
            },
            electricity: {
                name: "Điện học",
                questions: []
            },
            thermodynamics: {
                name: "Nhiệt học",
                questions: []
            }
        }
    },
    chemistry: {
        name: "Hóa học",
        topics: {
            organic: {
                name: "Hóa hữu cơ",
                questions: []
            },
            inorganic: {
                name: "Hóa vô cơ",
                questions: []
            },
            physical: {
                name: "Hóa lý",
                questions: []
            }
        }
    }
};

// Hàm thêm câu hỏi và câu trả lời mới
function addKnowledge(subject, topic, question, answer) {
    if (!knowledgeBase[subject]) {
        console.error('Môn học không tồn tại');
        return false;
    }

    if (!knowledgeBase[subject].topics[topic]) {
        console.error('Chủ đề không tồn tại');
        return false;
    }

    const newQuestion = {
        id: Date.now(),
        question: question,
        answer: answer,
        keywords: extractKeywords(question),
        createdAt: new Date().toISOString()
    };

    knowledgeBase[subject].topics[topic].questions.push(newQuestion);
    saveToLocalStorage();
    return true;
}

// Hàm trích xuất từ khóa từ câu hỏi
function extractKeywords(question) {
    // Loại bỏ các từ không cần thiết
    const stopWords = ['là', 'gì', 'có', 'và', 'hoặc', 'tại', 'sao', 'thế', 'nào', 'để', 'cho', 'với'];
    const words = question.toLowerCase().split(' ');
    return words.filter(word => !stopWords.includes(word));
}

// Hàm tìm kiếm câu trả lời
function findAnswer(question) {
    const keywords = extractKeywords(question);
    let bestMatch = null;
    let highestScore = 0;

    // Duyệt qua tất cả các môn học và chủ đề
    for (const subject in knowledgeBase) {
        for (const topic in knowledgeBase[subject].topics) {
            const questions = knowledgeBase[subject].topics[topic].questions;
            
            questions.forEach(q => {
                const score = calculateMatchScore(keywords, q.keywords);
                if (score > highestScore) {
                    highestScore = score;
                    bestMatch = {
                        answer: q.answer,
                        subject: knowledgeBase[subject].name,
                        topic: knowledgeBase[subject].topics[topic].name
                    };
                }
            });
        }
    }

    return bestMatch;
}

// Hàm tính điểm phù hợp giữa câu hỏi và câu trả lời
function calculateMatchScore(questionKeywords, answerKeywords) {
    let score = 0;
    questionKeywords.forEach(keyword => {
        if (answerKeywords.includes(keyword)) {
            score += 1;
        }
    });
    return score;
}

// Hàm lưu dữ liệu vào localStorage
function saveToLocalStorage() {
    localStorage.setItem('aiKnowledgeBase', JSON.stringify(knowledgeBase));
}

// Hàm tải dữ liệu từ localStorage
function loadFromLocalStorage() {
    const savedData = localStorage.getItem('aiKnowledgeBase');
    if (savedData) {
        Object.assign(knowledgeBase, JSON.parse(savedData));
    }
}

// Hàm xóa câu hỏi
function deleteQuestion(subject, topic, questionId) {
    if (!knowledgeBase[subject]?.topics[topic]) return false;
    
    const questions = knowledgeBase[subject].topics[topic].questions;
    const index = questions.findIndex(q => q.id === questionId);
    
    if (index !== -1) {
        questions.splice(index, 1);
        saveToLocalStorage();
        return true;
    }
    return false;
}

// Hàm cập nhật câu hỏi
function updateQuestion(subject, topic, questionId, newQuestion, newAnswer) {
    if (!knowledgeBase[subject]?.topics[topic]) return false;
    
    const questions = knowledgeBase[subject].topics[topic].questions;
    const question = questions.find(q => q.id === questionId);
    
    if (question) {
        question.question = newQuestion;
        question.answer = newAnswer;
        question.keywords = extractKeywords(newQuestion);
        question.updatedAt = new Date().toISOString();
        saveToLocalStorage();
        return true;
    }
    return false;
}

// Tải dữ liệu khi khởi động
loadFromLocalStorage();

// Export các hàm cần thiết
window.AIKnowledge = {
    addKnowledge,
    findAnswer,
    deleteQuestion,
    updateQuestion,
    knowledgeBase
}; 