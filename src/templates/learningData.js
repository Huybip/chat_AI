const subjects = [
    {
        id: 'math',
        name: 'Toán học',
        icon: '📐',
        grades: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
    },
    {
        id: 'physics',
        name: 'Vật lý',
        icon: '⚛️',
        grades: [6, 7, 8, 9, 10, 11, 12]
    },
    {
        id: 'chemistry',
        name: 'Hóa học',
        icon: '🧪',
        grades: [8, 9, 10, 11, 12]
    },
    {
        id: 'english',
        name: 'Tiếng Anh',
        icon: '🇬🇧',
        grades: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
    },
    {
        id: 'literature',
        name: 'Văn học',
        icon: '📖',
        grades: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
    }
];

const tests = [
    {
        id: 'math',
        name: 'Toán học',
        icon: '📐',
        questions: 15,
        time: 30
    },
    {
        id: 'physics',
        name: 'Vật lý',
        icon: '⚛️',
        questions: 12,
        time: 25
    },
    {
        id: 'chemistry',
        name: 'Hóa học',
        icon: '🧪',
        questions: 18,
        time: 35
    },
    {
        id: 'english',
        name: 'Tiếng Anh',
        icon: '🇬🇧',
        questions: 20,
        time: 40
    },
    {
        id: 'literature',
        name: 'Văn học',
        icon: '📖',
        questions: 10,
        time: 45
    }
]; 

// Add knowledge data structure
const knowledgeData = {
    math: {
        '1': [
            { type: 'text', content: '**Chủ đề 1: Làm quen với số tự nhiên đến 10.**\n- Các số từ 0 đến 10: cách đọc, viết.\n- So sánh các số trong phạm vi 10.\n- Sắp xếp các số theo thứ tự tăng dần, giảm dần.'  },
            { type: 'text', content: '**Chủ đề 2: Phép cộng, phép trừ trong phạm vi 10.**\n- Khái niệm phép cộng, phép trừ.\n- Thực hiện các phép cộng, phép trừ đơn giản.\n- Giải bài toán có lời văn liên quan đến phép cộng, phép trừ.' }
        ],
        '2': [
            { type: 'text', content: '**Chủ đề 1: Phép cộng, phép trừ trong phạm vi 100.**\n- Cộng, trừ không nhớ, có nhớ.\n- Ước lượng tổng, hiệu.\n- Giải bài toán có lời văn.' },
            { type: 'text', content: '**Chủ đề 2: Hình học.**\n- Điểm, đoạn thẳng, đường thẳng cong, đường thẳng gấp khúc.\n- Tính độ dài đường gấp khúc.\n- Chu vi hình tam giác, tứ giác (làm quen).' }
        ],
        '3': [
            { type: 'text', content: '**Chủ đề 1: Phép cộng, phép trừ, nhân, chia trong phạm vi 1000.**\n- Thực hiện các phép tính với số có ba chữ số.\n- Tính giá trị biểu thức.\n- Giải bài toán có lời văn.' },
            { type: 'text', content: '**Chủ đề 2: Hình học.**\n- Tính chu vi, diện tích hình vuông, hình chữ nhật.' }
        ],
        '4': [
            { type: 'text', content: '**Chủ đề 1: Số tự nhiên và các phép tính.**\n- Đọc, viết, so sánh các số có nhiều chữ số.\n- Bốn phép tính với số tự nhiên.\n- Dấu hiệu chia hết.' },
            { type: 'text', content: '**Chủ đề 2: Hình học.**\n- Góc nhọn, góc tù, góc bẹt.\n- Hai đường thẳng song song, vuông góc.\n- Hình bình hành, hình thoi (tính chu vi, diện tích).' }
        ],
        '5': [
            { type: 'text', content: '**Chủ đề 1: Phân số và số thập phân.**\n- Khái niệm phân số, số thập phân.\n- Các phép tính với phân số, số thập phân.\n- Tỉ số phần trăm.' },
            { type: 'text', content: '**Chủ đề 2: Hình học.**\n- Diện tích hình tam giác, hình thang.\n- Hình tròn, chu vi và diện tích hình tròn.\n- Hình hộp chữ nhật, hình lập phương (diện tích, thể tích).' }
        ],
        '6': [
            { type: 'text', content: '**Chủ đề 1: Số nguyên.**\n- Tập hợp số nguyên.\n- Thứ tự trong tập hợp số nguyên.\n- Phép cộng, trừ, nhân, chia số nguyên.' },
            { type: 'text', content: '**Chủ đề 2: Hình học phẳng.**\n- Điểm, đường thẳng, tia, đoạn thẳng.\n- Trung điểm của đoạn thẳng.\n- Góc và số đo góc.' }
        ],
        '7': [
            { type: 'text', content: '**Chủ đề 1: Số hữu tỉ.**\n- Khái niệm số hữu tỉ.\n- Các phép tính với số hữu tỉ.\n- Giá trị tuyệt đối của một số hữu tỉ.' },
            { type: 'text', content: '**Chủ đề 2: Đại lượng tỉ lệ thuận, đại lượng tỉ lệ nghịch.**\n- Khái niệm.\n- Tính chất.\n- Bài toán về đại lượng tỉ lệ.' },
            { type: 'text', content: '**Chủ đề 3: Tam giác.**\n- Các trường hợp bằng nhau của tam giác.\n- Quan hệ giữa các yếu tố trong tam giác.\n- Các đường đồng quy trong tam giác.' }
        ],
        '8': [
            { type: 'text', content: '**Chủ đề 1: Đa thức.**\n- Khái niệm đơn thức, đa thức.\n- Cộng, trừ, nhân, chia đa thức.\n- Hằng đẳng thức đáng nhớ.\n- Phân tích đa thức thành nhân tử.' },
            { type: 'text', content: '**Chủ đề 2: Tứ giác.**\n- Các loại tứ giác đặc biệt (hình thang, hình bình hành, hình chữ nhật, hình thoi, hình vuông).\n- Tính chất và dấu hiệu nhận biết.' },
            { type: 'text', content: '**Chủ đề 3: Diện tích đa giác.**\n- Công thức tính diện tích các hình.\n- Chia đa giác thành các hình đơn giản.' }
        ],
        '9': [
            { type: 'text', content: '**Chủ đề 1: Căn bậc hai, căn bậc ba.**\n- Khái niệm.\n- Các phép biến đổi căn thức.\n- Giải phương trình chứa căn.' },
            { type: 'text', content: '**Chủ đề 2: Hàm số bậc nhất.**\n- Khái niệm, tập xác định.\n- Đồ thị hàm số.\n- Vị trí tương đối của hai đường thẳng.' },
            { type: 'text', content: '**Chủ đề 3: Đường tròn.**\n- Sự xác định đường tròn.\n- Tính chất đối xứng.\n- Vị trí tương đối của đường thẳng và đường tròn, hai đường tròn.\n- Góc với đường tròn.' }
        ],
        '10': [
            { type: 'text', content: '**Chủ đề 1: Mệnh đề và Tập hợp.**\n- Khái niệm mệnh đề.\n- Các phép toán tập hợp.' },
            { type: 'text', content: '**Chủ đề 2: Hàm số và Đồ thị.**\n- Khái niệm hàm số.\n- Hàm số bậc nhất, bậc hai.\n- Đồ thị hàm số.' },
            { type: 'text', content: '**Chủ đề 3: Vectơ.**\n- Khái niệm vectơ.\n- Tổng, hiệu hai vectơ.\n- Tích của vectơ với một số.\n- Tọa độ vectơ.' }
        ],
        '11': [
            { type: 'text', content: '**Chủ đề 1: Hàm số lượng giác và Phương trình lượng giác.**\n- Các hàm số lượng giác.\n- Công thức lượng giác.\n- Phương trình lượng giác cơ bản.' },
            { type: 'text', content: '**Chủ đề 2: Tổ hợp và Xác suất.**\n- Quy tắc đếm.\n- Hoán vị, chỉnh hợp, tổ hợp.\n- Nhị thức Newton.\n- Xác suất của biến cố.' },
            { type: 'text', content: '**Chủ đề 3: Giới hạn.**\n- Giới hạn của dãy số.\n- Giới hạn của hàm số.\n- Hàm số liên tục.' }
        ],
        '12': [
            { type: 'text', content: '**Chủ đề 1: Ứng dụng đạo hàm để khảo sát và vẽ đồ thị hàm số.**\n- Tính đơn điệu của hàm số.\n- Cực trị của hàm số.\n- Tiệm cận.\n- Khảo sát sự biến thiên và vẽ đồ thị hàm số.' },
            { type: 'text', content: '**Chủ đề 2: Tích phân và Ứng dụng.**\n- Khái niệm nguyên hàm, tích phân.\n- Các phương pháp tính tích phân.\n- Ứng dụng tích phân tính diện tích, thể tích.' },
            { type: 'text', content: '**Chủ đề 3: Số phức.**\n- Khái niệm số phức.\n- Các phép toán với số phức.\n- Biểu diễn hình học của số phức.' }
        ]
        // Add other grades as needed
    },
    physics: {
        // Add physics knowledge by grade
        '6': [
            { type: 'text', content: '**Chủ đề 1: Chuyển động thẳng đều.**\n- Khái niệm về chuyển động thẳng đều.\n- Vận tốc trung bình.\n- Phương trình chuyển động.' },
            { type: 'text', content: '**Chủ đề 2: Lực và định luật Newton.**\n- Lực, khối lượng.\n- Định luật I Newton.\n- Định luật II Newton.\n- Định luật III Newton.' }
        ],
        '7': [
            { type: 'text', content: '**Chủ đề 1: Chuyển động thẳng biến đổi đều.**\n- Khái niệm về chuyển động thẳng biến đổi đều.\n- Gia tốc.\n- Vận tốc, quãng đường đi được trong chuyển động thẳng biến đổi đều.' },
            { type: 'text', content: '**Chủ đề 2: Lực hướng tâm.**\n- Lực hướng tâm.\n- Các loại lực hướng tâm.\n- Công thức tính lực hướng tâm.' }
        ],
        '8': [
            { type: 'text', content: '**Chủ đề 1: Các định luật bảo toàn.**\n- Định luật bảo toàn động lượng.\n- Định luật bảo toàn năng lượng.\n- Định luật bảo toàn cơ năng.' },
            { type: 'text', content: '**Chủ đề 2: Các định luật về chất khí.**\n- Định luật Boyle-Mariotte.\n- Định luật Gay-Lussac.\n- Định luật Avogadro.\n- Phương trình trạng thái khí lý tưởng.' }
        ],
        '9': [
            { type: 'text', content: '**Chủ đề 1: Điện học.**\n- Điện trở, định luật Ohm.\n- Công suất, điện năng.\n- Đoạn mạch nối tiếp, song song.' },
            { type: 'text', content: '**Chủ đề 2: Từ học.**\n- Nam châm.\n- Lực từ.\n- Từ trường của dòng điện.' },
            { type: 'text', content: '**Chủ đề 3: Quang học.**\n- Hiện tượng khúc xạ ánh sáng.\n- Thấu kính hội tụ, phân kì.\n- Mắt và các tật của mắt.\n- Kính lúp, kính hiển vi, kính thiên văn.' }
        ],
        '10': [
            { type: 'text', content: '**Chủ đề 1: Động học chất điểm.**\n- Chuyển động thẳng đều.\n- Chuyển động thẳng biến đổi đều.\n- Sự rơi tự do.\n- Chuyển động tròn đều.' },
            { type: 'text', content: '**Chủ đề 2: Động lực học chất điểm.**\n- Các định luật Newton.\n- Các lực cơ học (lực hấp dẫn, đàn hồi, ma sát).\n- Bài toán về động lực học.' },
            { type: 'text', content: '**Chủ đề 3: Công, Công suất, Năng lượng.**\n- Công và công suất.\n- Động năng, thế năng.\n- Định luật bảo toàn cơ năng.' }
        ],
        '11': [
            { type: 'text', content: '**Chủ đề 1: Điện tích - Điện trường.**\n- Điện tích, định luật Coulomb.\n- Điện trường.\n- Công của lực điện.\n- Điện thế, hiệu điện thế.' },
            { type: 'text', content: '**Chủ đề 2: Dòng điện không đổi.**\n- Dòng điện, nguồn điện.\n- Định luật Ohm toàn mạch.\n- Công và công suất điện.\n- Định luật Joule-Lenz.' },
            { type: 'text', content: '**Chủ đề 3: Từ trường.**\n- Từ trường của dòng điện.\n- Lực từ, cảm ứng từ.\n- Lực Lorentz.\n- Từ thông, hiện tượng cảm ứng điện từ.' }
        ],
        '12': [
            { type: 'text', content: '**Chủ đề 1: Dao động cơ.**\n- Dao động điều hòa.\n- Con lắc lò xo, con lắc đơn.\n- Năng lượng trong dao động điều hòa.\n- Dao động tắt dần, cưỡng bức, cộng hưởng.' },
            { type: 'text', content: '**Chủ đề 2: Sóng cơ và Sóng âm.**\n- Sóng cơ.\n- Giao thoa, nhiễu xạ sóng cơ.\n- Sóng âm.' },
            { type: 'text', content: '**Chủ đề 3: Dòng điện xoay chiều.**\n- Đại cương về dòng điện xoay chiều.\n- Các mạch điện xoay chiều R, L, C.\n- Mạch RLC nối tiếp.\n- Công suất dòng điện xoay chiều.\n- Truyền tải điện năng, máy biến áp.' },
            { type: 'text', content: '**Chủ đề 4: Sóng điện từ.**\n- Khái niệm sóng điện từ.\n- Quang phổ.\n- Tia X.\n- Hiện tượng quang điện.\n- Thuyết lượng tử ánh sáng.\n- Mẫu nguyên tử Bo.\n- Tính chất hạt-sóng của ánh sáng.' },
            { type: 'text', content: '**Chủ đề 5: Vật lý hạt nhân.**\n- Hạt nhân nguyên tử.\n- Năng lượng liên kết hạt nhân.\n- Phóng xạ.\n- Phản ứng hạt nhân (phân hạch, nhiệt hạch).\n- Ứng dụng vật lý hạt nhân.' }
        ],
    },
    chemistry: {
        // Add chemistry knowledge by grade
        '8': [
            { type: 'text', content: '**Chủ đề 1: Chất, Nguyên tử, Phân tử.**\n- Khái niệm về chất.\n- Cấu tạo nguyên tử, các loại hạt cấu tạo nên nguyên tử.\n- Khái niệm phân tử, đơn chất, hợp chất.\n- Công thức hóa học.' },
            { type: 'text', content: '**Chủ đề 2: Phản ứng hóa học.**\n- Định nghĩa, dấu hiệu nhận biết phản ứng hóa học.\n- Định luật bảo toàn khối lượng.\n- Phương trình hóa học (cân bằng đơn giản).' },
            { type: 'text', content: '**Chủ đề 3: Mol và tính toán hóa học.**\n- Khái niệm mol.\n- Chuyển đổi giữa khối lượng, số mol, thể tích chất khí (ở đktc).' }
        ],
        '9': [
            { type: 'text', content: '**Chủ đề 1: Các loại hợp chất vô cơ.**\n- Oxit (khái niệm, phân loại, tính chất).\n- Axit, Bazơ, Muối (khái niệm, phân loại, tính chất).' },
            { type: 'text', content: '**Chủ đề 2: Kim loại.**\n- Tính chất hóa học chung của kim loại.\n- Dãy hoạt động hóa học của kim loại.\n- Một số kim loại thông dụng (Fe, Al, Cu...).' },
            { type: 'text', content: '**Chủ đề 3: Phi kim - Sơ lược về bảng tuần hoàn các nguyên tố hóa học.**\n- Một số phi kim thông dụng (Cl, S, N, P, C, Si...).\n- Cấu tạo bảng tuần hoàn.\n- Ý nghĩa bảng tuần hoàn.' }
        ],
        '10': [
            { type: 'text', content: '**Chủ đề 1: Cấu tạo nguyên tử.**\n- Các loại hạt trong nguyên tử.\n- Cấu hình electron nguyên tử.\n- Đồng vị.' },
            { type: 'text', content: '**Chủ đề 2: Bảng tuần hoàn các nguyên tố hóa học.**\n- Nguyên tắc sắp xếp.\n- Cấu tạo chu kì, nhóm.\n- Quy luật biến đổi tính chất.' },
            { type: 'text', content: '**Chủ đề 3: Liên kết hóa học.**\n- Liên kết ion.\n- Liên kết cộng hóa trị.\n- Năng lượng liên kết.' }
        ],
        '11': [
            { type: 'text', content: '**Chủ đề 1: Sự điện li.**\n- Chất điện li.\n- Axit, bazơ, muối theo thuyết A-rê-ni-uýt.\n- Phản ứng trao đổi ion trong dung dịch.' },
            { type: 'text', content: '**Chủ đề 2: Cacbon và các hợp chất của cacbon.**\n- Đơn chất cacbon.\n- Các oxit của cacbon (CO, CO2).\n- Axit cacbonic và muối cacbonat.' },
            { type: 'text', content: '**Chủ đề 3: Các hợp chất hữu cơ.**\n- Khái niệm về hợp chất hữu cơ.\n- Cấu tạo phân tử hợp chất hữu cơ.\n- Tính chất hóa học của hợp chất hữu cơ.' }
        ],
        '12': [
            { type: 'text', content: 'Kiến thức Hóa học lớp 12: Làm quen với các nguyên tố hóa học.' },
            { type: 'text', content: 'Kiến thức Hóa học lớp 12: Phản ứng hóa học.' }
        ]
    },
    english: {
        // Add English knowledge by grade
        '1': [
            { type: 'text', content: '**Chủ đề 1: Bảng chữ cái và Số.**\n- Học thuộc bảng chữ cái tiếng Anh.\n- Đếm số từ 1 đến 10.\n- Các mẫu câu chào hỏi đơn giản.' }
        ],
        '2': [
            { type: 'text', content: '**Chủ đề 1: Màu sắc và Đồ vật quen thuộc.**\n- Học tên các màu sắc.\n- Gọi tên các đồ vật xung quanh (bút, sách, ghế...).\n- Mẫu câu hỏi đáp về màu sắc, đồ vật.' }
        ],
        '3': [
            { type: 'text', content: '**Chủ đề 1: Gia đình và Bạn bè.**\n- Từ vựng về các thành viên gia đình.\n- Từ vựng về bạn bè, đồ chơi.\n- Mẫu câu giới thiệu bản thân, gia đình.' }
        ],
        '4': [
            { type: 'text', content: '**Chủ đề 1: Trường học.**\n- Từ vựng về các môn học, hoạt động ở trường.\n- Các đồ dùng học tập.\n- Mẫu câu về thời khóa biểu, sở thích học tập.' }
        ],
        '5': [
            { type: 'text', content: '**Chủ đề 1: Thế giới quanh ta.**\n- Từ vựng về địa điểm (công viên, sở thú, siêu thị...).\n- Từ vựng về nghề nghiệp.\n- Mẫu câu miêu tả địa điểm, nghề nghiệp.' }
        ],
        '6': [
            { type: 'text', content: '**Chủ đề 1: Thì hiện tại đơn và Hiện tại tiếp diễn.**\n- Cấu trúc và cách dùng.\n- Dấu hiệu nhận biết.\n- Luyện tập đặt câu.' },
            { type: 'text', content: '**Chủ đề 2: Từ loại cơ bản.**\n- Danh từ, động từ, tính từ, trạng từ.\n- Vị trí trong câu.\n- Luyện tập nhận biết và sử dụng.' }
        ],
        '7': [
            { type: 'text', content: '**Chủ đề 1: Thì quá khứ đơn.**\n- Cấu trúc và cách dùng.\n- Động từ có quy tắc và bất quy tắc.\n- Luyện tập đặt câu.' },
            { type: 'text', content: '**Chủ đề 2: So sánh hơn, so sánh nhất.**\n- Công thức so sánh với tính từ ngắn, dài.\n- Trường hợp đặc biệt.\n- Luyện tập đặt câu.' }
        ],
        '8': [
            { type: 'text', content: '**Chủ đề 1: Thì tương lai đơn và Tương lai gần.**\n- Cấu trúc và cách dùng (will/be going to).\n- Dấu hiệu nhận biết.\n- Luyện tập đặt câu.' },
            { type: 'text', content: '**Chủ đề 2: Câu bị động (thì hiện tại đơn, quá khứ đơn).**\n- Cấu trúc.\n- Cách chuyển từ câu chủ động sang bị động.\n- Luyện tập.' }
        ],
        '9': [
            { type: 'text', content: '**Chủ đề 1: Thì hiện tại hoàn thành.**\n- Cấu trúc và cách dùng.\n- Dấu hiệu nhận biết (since, for, yet, already...).\n- Luyện tập.' },
            { type: 'text', content: '**Chủ đề 2: Mệnh đề quan hệ.**\n- Đại từ quan hệ (who, whom, which, that).\n- Trạng từ quan hệ (where, when, why).\n- Rút gọn mệnh đề quan hệ.' }
        ],
        '10': [
            { type: 'text', content: '**Chủ đề 1: Các thì trong tiếng Anh (ôn tập và nâng cao).**\n- Tổng hợp các thì đã học.\n- Sự phối hợp thì.' },
            { type: 'text', content: '**Chủ đề 2: Danh động từ và Động từ nguyên mẫu.**\n- V-ing (Gerund).\n- To V (Infinitive).\n- Các trường hợp đặc biệt.' }
        ],
        '11': [
            { type: 'text', content: '**Chủ đề 1: Câu điều kiện.**\n- Câu điều kiện loại 1, 2, 3.\n- Các dạng đặc biệt của câu điều kiện.' },
            { type: 'text', content: '**Chủ đề 2: Câu tường thuật.**\n- Tường thuật câu phát biểu.\n- Tường thuật câu hỏi.\n- Tường thuật câu mệnh lệnh.' },
            { type: 'text', content: '**Chủ đề 3: Đảo ngữ.**\n- Đảo ngữ với trạng từ phủ định.\n- Đảo ngữ với Only, Hardly/Scarcely/Barely...when, No sooner...than.' }
        ],
        '12': [
            { type: 'text', content: '**Chủ đề 1: Mạo từ, Quán từ.**\n- Cách dùng a/an, the.\n- Các trường hợp không dùng mạo từ.' },
            { type: 'text', content: '**Chủ đề 2: Giới từ.**\n- Giới từ chỉ thời gian, nơi chốn.\n- Các giới từ đi kèm với động từ, tính từ.' },
            { type: 'text', content: '**Chủ đề 3: Sự hòa hợp giữa chủ ngữ và động từ.**\n- Các quy tắc hòa hợp cơ bản và nâng cao.' }
        ]
    },
    literature: {
        // Add literature knowledge by grade
        '1': [
            { type: 'text', content: '**Chủ đề 1: Làm quen với văn học.**\n- Nghe kể chuyện.\n- Đọc các bài thơ, câu chuyện đơn giản.' }
        ],
        '2': [
            { type: 'text', content: '**Chủ đề 1: Tập đọc và Kể chuyện.**\n- Đọc lưu loát các đoạn văn ngắn.\n- Kể lại câu chuyện đã nghe, đã đọc.' }
        ],
        '3': [
            { type: 'text', content: '**Chủ đề 1: Văn miêu tả.**\n- Miêu tả đồ vật quen thuộc.\n- Miêu tả con vật yêu thích.\n- Miêu tả cây cối đơn giản.' }
        ],
        '4': [
            { type: 'text', content: '**Chủ đề 1: Văn kể chuyện.**\n- Kể lại một sự việc.\n- Kể về người thân.\n- Tưởng tượng và kể chuyện.' }
        ],
        '5': [
            { type: 'text', content: '**Chủ đề 1: Văn tả cảnh.**\n- Miêu tả cảnh thiên nhiên (buổi sáng, buổi chiều...).\n- Miêu tả cảnh sinh hoạt (buổi chợ, giờ ra chơi...).' },
            { type: 'text', content: '**Chủ đề 2: Văn tả người.**\n- Miêu tả ngoại hình người thân.\n- Miêu tả hoạt động của người.' }
        ],
        '6': [
            { type: 'text', content: '**Chủ đề 1: Văn tự sự.**\n- Khái niệm, yếu tố tự sự.\n- Viết bài văn tự sự.\n- Truyện truyền thuyết, cổ tích.' },
            { type: 'text', content: '**Chủ đề 2: Văn miêu tả.**\n- Miêu tả ngoại hình người thân.\n- Miêu tả hoạt động của người.\n- Miêu tả cảnh vật, đồ vật.' }
        ]
    }
}; 