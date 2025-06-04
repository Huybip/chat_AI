from flask import Flask, request, jsonify
from flask_cors import CORS
import math
import numpy as np

# Thêm import cho dịch thuật
try:
    from googletrans import Translator
except ImportError:
    Translator = None

app = Flask(__name__)
CORS(app)  # Cho phép truy cập từ domain khác

class Calculator:
    @staticmethod
    def sum_numbers(numbers):
        """Tính tổng của một danh sách các số"""
        return sum(numbers)

    @staticmethod
    def subtract_numbers(numbers):
        if not numbers:
            return 0
        result = numbers[0]
        for n in numbers[1:]:
            result -= n
        return result

    @staticmethod
    def multiply_numbers(numbers):
        result = 1
        for n in numbers:
            result *= n
        return result

    @staticmethod
    def divide_numbers(numbers):
        if not numbers:
            return 0
        result = numbers[0]
        for n in numbers[1:]:
            if n == 0:
                raise ValueError("Không thể chia cho 0")
            result /= n
        return result

    @staticmethod
    def add(a, b):
        return a + b

    @staticmethod
    def subtract(a, b):
        return a - b

    @staticmethod
    def multiply(a, b):
        return a * b

    @staticmethod
    def divide(a, b):
        if b == 0:
            raise ValueError("Không thể chia cho 0")
        return a / b

    @staticmethod
    def sum_range(start, end):
        """Tính tổng các số từ start đến end"""
        return sum(range(start, end + 1))

    @staticmethod
    def sum_even_numbers(numbers):
        """Tính tổng các số chẵn trong danh sách"""
        return sum(num for num in numbers if num % 2 == 0)

    @staticmethod
    def sum_odd_numbers(numbers):
        """Tính tổng các số lẻ trong danh sách"""
        return sum(num for num in numbers if num % 2 != 0)

    @staticmethod
    def average(numbers):
        """Tính trung bình cộng của một danh sách số"""
        return sum(numbers) / len(numbers) if numbers else 0

    @staticmethod
    def factorial(n):
        """Tính giai thừa của một số"""
        if n < 0:
            raise ValueError("Không thể tính giai thừa của số âm")
        return math.factorial(n)

    @staticmethod
    def fibonacci(n):
        """Tính số Fibonacci thứ n"""
        if n < 0:
            raise ValueError("Không thể tính số Fibonacci âm")
        if n <= 1:
            return n
        a, b = 0, 1
        for _ in range(2, n + 1):
            a, b = b, a + b
        return b

    @staticmethod
    def is_prime(n):
        """Kiểm tra số nguyên tố"""
        if n < 2:
            return False
        for i in range(2, int(math.sqrt(n)) + 1):
            if n % i == 0:
                return False
        return True

    @staticmethod
    def prime_factors(n):
        """Phân tích thừa số nguyên tố"""
        factors = []
        divisor = 2
        while n > 1:
            while n % divisor == 0:
                factors.append(divisor)
                n //= divisor
            divisor += 1
            if divisor * divisor > n:
                if n > 1:
                    factors.append(n)
                break
        return factors

    @staticmethod
    def gcd(a, b):
        """Tìm ước chung lớn nhất"""
        return math.gcd(a, b)

    @staticmethod
    def lcm(a, b):
        """Tìm bội chung nhỏ nhất"""
        return abs(a * b) // math.gcd(a, b)

    @staticmethod
    def solve_quadratic(a, b, c):
        """Giải phương trình bậc 2: ax² + bx + c = 0"""
        if a == 0:
            raise ValueError("Không phải phương trình bậc 2")
        delta = b**2 - 4*a*c
        if delta < 0:
            return {"type": "complex", "x1": f"{-b/(2*a)} + {math.sqrt(-delta)/(2*a)}i",
                    "x2": f"{-b/(2*a)} - {math.sqrt(-delta)/(2*a)}i"}
        elif delta == 0:
            x = -b/(2*a)
            return {"type": "real", "x1": x, "x2": x}
        else:
            x1 = (-b + math.sqrt(delta))/(2*a)
            x2 = (-b - math.sqrt(delta))/(2*a)
            return {"type": "real", "x1": x1, "x2": x2}

    @staticmethod
    def calculate_statistics(numbers):
        """Tính các thống kê cơ bản"""
        if not numbers:
            return {"error": "Danh sách trống"}
        return {
            "mean": np.mean(numbers),
            "median": np.median(numbers),
            "mode": float(max(set(numbers), key=numbers.count)),
            "std": np.std(numbers),
            "min": min(numbers),
            "max": max(numbers)
        }

    @staticmethod
    def translate(text, dest='en'):
        if Translator is None:
            return "Chức năng dịch chưa được cài đặt. Hãy cài đặt googletrans."
        translator = Translator()
        result = translator.translate(text, dest=dest)
        return result.text

# Khởi tạo calculator
calc = Calculator()

@app.route('/api/calculate', methods=['POST'])
def calculate():
    try:
        data = request.json
        operation = data.get('operation')
        params = data.get('params', {})

        if operation == 'sum_numbers':
            result = calc.sum_numbers(params.get('numbers', []))
        elif operation == 'subtract_numbers':
            result = calc.subtract_numbers(params.get('numbers', []))
        elif operation == 'multiply_numbers':
            result = calc.multiply_numbers(params.get('numbers', []))
        elif operation == 'divide_numbers':
            result = calc.divide_numbers(params.get('numbers', []))
        elif operation == 'add':
            result = calc.add(params.get('a', 0), params.get('b', 0))
        elif operation == 'subtract':
            result = calc.subtract(params.get('a', 0), params.get('b', 0))
        elif operation == 'multiply':
            result = calc.multiply(params.get('a', 0), params.get('b', 0))
        elif operation == 'divide':
            result = calc.divide(params.get('a', 0), params.get('b', 1))
        elif operation == 'translate':
            result = calc.translate(params.get('text', ''), params.get('dest', 'en'))
        elif operation == 'sum_range':
            result = calc.sum_range(params.get('start', 0), params.get('end', 0))
        elif operation == 'sum_even_numbers':
            result = calc.sum_even_numbers(params.get('numbers', []))
        elif operation == 'sum_odd_numbers':
            result = calc.sum_odd_numbers(params.get('numbers', []))
        elif operation == 'average':
            result = calc.average(params.get('numbers', []))
        elif operation == 'factorial':
            result = calc.factorial(params.get('n', 0))
        elif operation == 'fibonacci':
            result = calc.fibonacci(params.get('n', 0))
        elif operation == 'is_prime':
            result = calc.is_prime(params.get('n', 0))
        elif operation == 'prime_factors':
            result = calc.prime_factors(params.get('n', 0))
        elif operation == 'gcd':
            result = calc.gcd(params.get('a', 0), params.get('b', 0))
        elif operation == 'lcm':
            result = calc.lcm(params.get('a', 0), params.get('b', 0))
        elif operation == 'solve_quadratic':
            result = calc.solve_quadratic(params.get('a', 0), params.get('b', 0), params.get('c', 0))
        elif operation == 'statistics':
            result = calc.calculate_statistics(params.get('numbers', []))
        else:
            return jsonify({"error": "Operation not supported"}), 400

        return jsonify({"result": result})

    except Exception as e:
        return jsonify({"error": str(e)}), 400

if __name__ == '__main__':
    app.run(debug=True, port=5000) 