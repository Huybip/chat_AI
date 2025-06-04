// Kiểm tra trạng thái đăng nhập
function isLoggedIn() {
    return localStorage.getItem('user') !== null;
}

// Hiển thị modal đăng nhập
function showLoginModal() {
    document.getElementById('loginModal').style.display = 'block';
    // Reset form
    document.getElementById('loginEmail').value = '';
    document.getElementById('loginPassword').value = '';
}

// Hiển thị modal đăng ký
function showRegisterModal() {
    document.getElementById('registerModal').style.display = 'block';
    // Reset form
    document.getElementById('registerName').value = '';
    document.getElementById('registerEmail').value = '';
    document.getElementById('registerPassword').value = '';
    document.getElementById('confirmPassword').value = '';
}

// Đóng modal
function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

// Kiểm tra định dạng email
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Kiểm tra độ mạnh của mật khẩu
function isStrongPassword(password) {
    return password.length >= 6;
}

// Xử lý đăng nhập
function handleLogin(event) {
    event.preventDefault();
    
    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value.trim();

    // Kiểm tra dữ liệu đầu vào
    if (!email || !password) {
        alert('Vui lòng điền đầy đủ thông tin!');
        return;
    }

    if (!isValidEmail(email)) {
        alert('Email không hợp lệ!');
        return;
    }

    // Lấy danh sách người dùng từ localStorage
    const users = JSON.parse(localStorage.getItem('users')) || [];
    
    // Tìm người dùng
    const user = users.find(u => u.email === email && u.password === password);
    
    if (!user) {
        alert('Email hoặc mật khẩu không đúng!');
        return;
    }

    // Lưu thông tin đăng nhập
    const userData = {
        email: user.email,
        name: user.name
    };
    
    localStorage.setItem('user', JSON.stringify(userData));
    
    // Cập nhật giao diện
    updateUIAfterLogin(userData);
    
    // Đóng modal
    closeModal('loginModal');
    
    // Thông báo thành công
    alert('Đăng nhập thành công!');
}

// Xử lý đăng ký
function handleRegister(event) {
    event.preventDefault();
    
    const name = document.getElementById('registerName').value.trim();
    const email = document.getElementById('registerEmail').value.trim();
    const password = document.getElementById('registerPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    // Kiểm tra dữ liệu đầu vào
    if (!name || !email || !password || !confirmPassword) {
        alert('Vui lòng điền đầy đủ thông tin!');
        return;
    }

    if (!isValidEmail(email)) {
        alert('Email không hợp lệ!');
        return;
    }

    if (!isStrongPassword(password)) {
        alert('Mật khẩu phải có ít nhất 6 ký tự!');
        return;
    }

    if (password !== confirmPassword) {
        alert('Mật khẩu xác nhận không khớp!');
        return;
    }

    // Lấy danh sách người dùng từ localStorage
    const users = JSON.parse(localStorage.getItem('users')) || [];
    
    // Kiểm tra email đã tồn tại
    if (users.some(u => u.email === email)) {
        alert('Email này đã được đăng ký!');
        return;
    }

    // Thêm người dùng mới
    const newUser = {
        name,
        email,
        password,
        createdAt: new Date().toISOString()
    };
    
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    // Tự động đăng nhập sau khi đăng ký
    const userData = {
        email: newUser.email,
        name: newUser.name
    };
    
    localStorage.setItem('user', JSON.stringify(userData));
    
    // Cập nhật giao diện
    updateUIAfterLogin(userData);
    
    // Đóng modal
    closeModal('registerModal');
    
    // Thông báo thành công
    alert('Đăng ký thành công!');
}

// Cập nhật giao diện sau khi đăng nhập
function updateUIAfterLogin(userData) {
    const authButtons = document.querySelector('.auth-buttons');
    
    // Thay thế nút đăng nhập/đăng ký bằng thông tin người dùng
    authButtons.innerHTML = `
        <span style="color: white; margin-right: 1rem;">Xin chào, ${userData.name}</span>
        <button class="btn btn-login" onclick="handleLogout()">Đăng xuất</button>
    `;
    
    // Kích hoạt các chức năng cần đăng nhập
    document.getElementById('messageInput').disabled = false;
    document.getElementById('sendBtn').disabled = false;
}

// Xử lý đăng xuất
function handleLogout() {
    localStorage.removeItem('user');
    location.reload();
}

// Kiểm tra trạng thái đăng nhập khi tải trang
document.addEventListener('DOMContentLoaded', function() {
    if (isLoggedIn()) {
        const userData = JSON.parse(localStorage.getItem('user'));
        updateUIAfterLogin(userData);
    }
});