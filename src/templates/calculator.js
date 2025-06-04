// Module xử lý tính toán
const Calculator = {
    // Tính tổng từ 1 đến n
    sumFromOneToN: function(n) {
        if (n < 1 || !Number.isInteger(n)) {
            throw new Error('Số phải là số nguyên dương');
        }
        return (n * (n + 1)) / 2;
    },

    // Kiểm tra xem câu hỏi có phải là yêu cầu tính toán không
    isCalculationRequest: function(message) {
        const patterns = [
            /tính\s+tổng\s+từ\s+1\s+đến\s+(\d+)/i,
            /tổng\s+các\s+số\s+từ\s+1\s+đến\s+(\d+)/i,
            /tính\s+tổng\s+1\s+đến\s+(\d+)/i,
            /tính\s+tổng\s+các\s+số\s+từ\s+1\s+đến\s+(\d+)/i,
            /tổng\s+1\s+đến\s+(\d+)/i,
            /tính\s+tổng\s+của\s+các\s+số\s+từ\s+1\s+đến\s+(\d+)/i,
            /tính\s+tổng\s+của\s+1\s+đến\s+(\d+)/i,
            /tổng\s+của\s+các\s+số\s+từ\s+1\s+đến\s+(\d+)/i,
            /tổng\s+của\s+1\s+đến\s+(\d+)/i
        ];

        for (let pattern of patterns) {
            const match = message.match(pattern);
            if (match) {
                const number = parseInt(match[1]);
                if (!isNaN(number) && number > 0) {
                    return number;
                }
            }
        }
        return null;
    },

    // Xử lý yêu cầu tính toán
    processCalculation: function(message) {
        try {
            const number = this.isCalculationRequest(message);
            if (number) {
                const result = this.sumFromOneToN(number);
                return {
                    type: 'calculation',
                    question: message,
                    answer: `Tổng các số từ 1 đến ${number} là: ${result}`,
                    details: {
                        operation: 'sum',
                        range: `1 đến ${number}`,
                        result: result
                    }
                };
            }
            return null;
        } catch (error) {
            console.error('Lỗi khi xử lý tính toán:', error);
            return {
                type: 'error',
                message: error.message || 'Có lỗi xảy ra khi thực hiện tính toán'
            };
        }
    },

    // Các hàm tính toán cơ bản
    sumNumbers: function(numbers) {
        return numbers.reduce((a, b) => a + b, 0);
    },

    sumRange: function(start, end) {
        let sum = 0;
        for (let i = start; i <= end; i++) {
            sum += i;
        }
        return sum;
    },

    // Hàm gọi API Python
    async callPythonAPI(operation, params) {
        try {
            const response = await fetch('http://localhost:5000/api/calculate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    operation: operation,
                    params: params
                })
            });

            if (!response.ok) {
                throw new Error('Lỗi kết nối API');
            }

            const data = await response.json();
            if (data.error) {
                throw new Error(data.error);
            }

            return data.result;
        } catch (error) {
            console.error('Lỗi khi gọi API:', error);
            throw error;
        }
    },

    // Các hàm xử lý tính toán nâng cao
    async calculateAdvanced(message) {
        try {
            // Nhận diện biểu thức dạng "a + b", "a - b", "a * b", "a / b", "a x b", "a : b"
            const exprMatch = message.match(/(-?\d+(?:\.\d+)?)\s*([+\-*/x×:])\s*(-?\d+(?:\.\d+)?)/);
            if (exprMatch) {
                const a = parseFloat(exprMatch[1]);
                const op = exprMatch[2];
                const b = parseFloat(exprMatch[3]);
                if (op === '+') return await this.callPythonAPI('add', { a, b });
                if (op === '-') return await this.callPythonAPI('subtract', { a, b });
                if (op === '*' || op === 'x' || op === '×') return await this.callPythonAPI('multiply', { a, b });
                if (op === '/' || op === ':') return await this.callPythonAPI('divide', { a, b });
            }
            // Phép cộng/tổng
            if (message.match(/tổng|cộng/i)) {
                const numbers = this.extractNumbers(message);
                return await this.callPythonAPI('sum_numbers', { numbers });
            }
            // Phép trừ/hiệu
            else if (message.match(/trừ|hiệu/i)) {
                const numbers = this.extractNumbers(message);
                return await this.callPythonAPI('subtract_numbers', { numbers });
            }
            // Phép nhân/tích
            else if (message.match(/nhân|tích/i)) {
                const numbers = this.extractNumbers(message);
                return await this.callPythonAPI('multiply_numbers', { numbers });
            }
            // Phép chia/thương
            else if (message.match(/chia|thương/i)) {
                const numbers = this.extractNumbers(message);
                return await this.callPythonAPI('divide_numbers', { numbers });
            }
            // Dịch sang tiếng Anh
            else if (message.match(/dịch sang tiếng anh|dịch sang english/i)) {
                const text = message.replace(/dịch sang tiếng anh|dịch sang english/i, '').trim();
                return await this.callPythonAPI('translate', { text, dest: 'en' });
            }
            // Dịch sang tiếng Việt
            else if (message.match(/dịch sang tiếng việt|dịch sang vietnamese/i)) {
                const text = message.replace(/dịch sang tiếng việt|dịch sang vietnamese/i, '').trim();
                return await this.callPythonAPI('translate', { text, dest: 'vi' });
            }
            // Phân tích câu hỏi để xác định loại tính toán
            else if (message.includes('tổng các số chẵn')) {
                const numbers = this.extractNumbers(message);
                return await this.callPythonAPI('sum_even_numbers', { numbers });
            }
            else if (message.includes('tổng các số lẻ')) {
                const numbers = this.extractNumbers(message);
                return await this.callPythonAPI('sum_odd_numbers', { numbers });
            }
            else if (message.includes('trung bình cộng')) {
                const numbers = this.extractNumbers(message);
                return await this.callPythonAPI('average', { numbers });
            }
            else if (message.includes('giai thừa')) {
                const n = this.extractSingleNumber(message);
                return await this.callPythonAPI('factorial', { n });
            }
            else if (message.includes('fibonacci')) {
                const n = this.extractSingleNumber(message);
                return await this.callPythonAPI('fibonacci', { n });
            }
            else if (message.includes('số nguyên tố')) {
                const n = this.extractSingleNumber(message);
                const isPrime = await this.callPythonAPI('is_prime', { n });
                return `${n} ${isPrime ? 'là' : 'không phải là'} số nguyên tố`;
            }
            else if (message.includes('thừa số nguyên tố')) {
                const n = this.extractSingleNumber(message);
                const factors = await this.callPythonAPI('prime_factors', { n });
                return `Các thừa số nguyên tố của ${n} là: ${factors.join(' × ')}`;
            }
            else if (message.includes('ước chung lớn nhất')) {
                const [a, b] = this.extractTwoNumbers(message);
                return await this.callPythonAPI('gcd', { a, b });
            }
            else if (message.includes('bội chung nhỏ nhất')) {
                const [a, b] = this.extractTwoNumbers(message);
                return await this.callPythonAPI('lcm', { a, b });
            }
            else if (message.includes('phương trình bậc 2')) {
                const [a, b, c] = this.extractThreeNumbers(message);
                const result = await this.callPythonAPI('solve_quadratic', { a, b, c });
                if (result.type === 'real') {
                    return `Nghiệm của phương trình: x₁ = ${result.x1}, x₂ = ${result.x2}`;
                } else {
                    return `Nghiệm phức của phương trình: x₁ = ${result.x1}, x₂ = ${result.x2}`;
                }
            }
            else if (message.includes('thống kê')) {
                const numbers = this.extractNumbers(message);
                const stats = await this.callPythonAPI('statistics', { numbers });
                return `Thống kê:\n- Trung bình: ${stats.mean}\n- Trung vị: ${stats.median}\n- Mốt: ${stats.mode}\n- Độ lệch chuẩn: ${stats.std}\n- Giá trị nhỏ nhất: ${stats.min}\n- Giá trị lớn nhất: ${stats.max}`;
            }

            return null;
        } catch (error) {
            console.error('Lỗi trong calculateAdvanced:', error);
            throw error;
        }
    },

    // Các hàm hỗ trợ
    extractNumbers: function(message) {
        const numbers = message.match(/\d+/g);
        return numbers ? numbers.map(Number) : [];
    },

    extractSingleNumber: function(message) {
        const numbers = this.extractNumbers(message);
        return numbers.length > 0 ? numbers[0] : null;
    },

    extractTwoNumbers: function(message) {
        const numbers = this.extractNumbers(message);
        return numbers.length >= 2 ? [numbers[0], numbers[1]] : [0, 0];
    },

    extractThreeNumbers: function(message) {
        const numbers = this.extractNumbers(message);
        return numbers.length >= 3 ? [numbers[0], numbers[1], numbers[2]] : [0, 0, 0];
    },

    // Hàm xử lý tính toán
    async processCalculation(message) {
        try {
            // Thử xử lý các phép tính nâng cao trước
            const advancedResult = await this.calculateAdvanced(message);
            if (advancedResult !== null) {
                return advancedResult;
            }

            // Nếu không phải phép tính nâng cao, xử lý các phép tính cơ bản
            const numbers = this.extractNumbers(message);
            if (numbers.length > 0) {
                if (message.includes('tổng từ') && message.includes('đến')) {
                    const [start, end] = this.extractTwoNumbers(message);
                    return this.sumRange(start, end);
                } else {
                    return this.sumNumbers(numbers);
                }
            }

            return null;
        } catch (error) {
            console.error('Lỗi trong processCalculation:', error);
            throw error;
        }
    }
};

// Thêm Calculator vào window để có thể truy cập từ các file khác
window.Calculator = Calculator; 