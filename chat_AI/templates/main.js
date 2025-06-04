// Xử lý sự kiện khi trang được tải
document.addEventListener('DOMContentLoaded', function() {
    // Khởi tạo các sự kiện
    initializeEventListeners();
    
    // Kiểm tra trạng thái đăng nhập
    checkLoginStatus();
});

// Khởi tạo các event listener
function initializeEventListeners() {
    // Đóng modal khi click bên ngoài
    window.onclick = function(event) {
        if (event.target.classList.contains('modal')) {
            event.target.style.display = 'none';
        }
    }

    // Xử lý phím Enter trong input
    document.getElementById('messageInput').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
}

// Kiểm tra trạng thái đăng nhập
function checkLoginStatus() {
    const user = localStorage.getItem('user');
    if (user) {
        const userData = JSON.parse(user);
        updateUIAfterLogin(userData);
    }
}

// Cập nhật giao diện sau khi đăng nhập
function updateUIAfterLogin(userData) {
    const authButtons = document.querySelector('.auth-buttons');
    authButtons.innerHTML = `
        <span style="color: white; margin-right: 1rem;">Xin chào, ${userData.name}</span>
        <button class="btn btn-login" onclick="handleLogout()">Đăng xuất</button>
    `;
    
    // Kích hoạt các chức năng cần đăng nhập
    document.getElementById('messageInput').disabled = false;
    document.getElementById('sendBtn').disabled = false;
}

// Xử lý đóng modal
function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

// Xử lý đăng xuất
function handleLogout() {
    localStorage.removeItem('user');
    location.reload();
} 