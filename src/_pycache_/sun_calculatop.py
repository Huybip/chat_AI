def sum_numbers(numbers):
    """
    Tính tổng của một danh sách các số
    """
    return sum(numbers)

def sum_range(start, end):
    """
    Tính tổng các số từ start đến end
    """
    return sum(range(start, end + 1))

def sum_even_numbers(numbers):
    """
    Tính tổng các số chẵn trong danh sách
    """
    return sum(num for num in numbers if num % 2 == 0)

# Ví dụ sử dụng
if __name__ == "__main__":
    # Ví dụ 1: Tính tổng một danh sách số
    numbers = [1, 2, 3, 4, 5]
    print(f"Tổng của {numbers} là: {sum_numbers(numbers)}")

    # Ví dụ 2: Tính tổng các số từ 1 đến 10
    print(f"Tổng các số từ 1 đến 10 là: {sum_range(1, 10)}")

    # Ví dụ 3: Tính tổng các số chẵn
    numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    print(f"Tổng các số chẵn trong {numbers} là: {sum_even_numbers(numbers)}") 