/* 
┌────────────────────────────────────────────────────────┐
│ Quản lý tài chính bằng tiếng Việt tự nhiên trên Fibery │
└────────────────────────────────────────────────────────┘
Đọc bài đầy đủ trên web để hiểu rõ về các tính năng, đặc điểm, động lực, cách cài đặt của script này.

Cấu trúc script:
I. Khai báo
II. Dán nhãn, tạo vật thể
    1. Tạo vậtThểTừKhaiBáo
    2. Lọc từ, dánNhãnTừ và tạo vậtThểTừCâuNhập
III. Làm sạch kết quả
    1. Loại bỏ từ đơn bị nhận diện sai
    2. Loại bỏ nhãn chi tiêu bị trùng lặp
    3. Chọn PTTT cuối cùng trong câu nhập
IV. Đếm tiền
V. Tạo kết quả
    1. xửLýDấuThanhVàViếtTắt
    2. xửLýViếtTắt
    3. tạoKếtQuả

Khuyến khích bạn đọc script trên VS Code. Đây là một số phím tắt thường dùng cho việc đọc hiểu code:
| Phím tắt         | Chức năng                                                 |
| ---------------- | --------------------------------------------------------- |
| Alt + Z          | Word wrap                                                 |
| Ctrl + Shift + [ | Thu gọn khối code                                         |
| Ctrl + Shift + ] | Mở rộng khối code                                         |
| Ctrl + Shift + . | Mở danh sách các hàm và biến                              |
| F12              | Đến nhanh những nơi hàm hoặc biến được sử dụng            |
| Ctrl + Space     | Mở danh sách gợi ý điền nhanh                             |
| Ctrl + K Z       | Mở zen mode                                               |
| Ctrl + \         | Chia màn hình thành các editor (hay còn gọi là tab group) |
| Ctrl + 1, 2, 3   | Di chuyển giữa các editor                                 |
| F6               | Đổi panel                                                 |
| Ctrl + B         | Mở sidebar trái (VS Code gọi là primary sidebar)          |
| Ctrl + Shift + B | Mở sidebar phải (VS Code gọi là secondary sidebar)        |

Và chạy thử code:
| Phím tắt         | Chức năng        |
| ---------------- | ---------------- |
| F5               | Chạy code        |
| F9               | Tạo breakpoint   |
| Ctrl + Shift + D | Mở debug sidebar |
| Ctrl + `         | Mở terminal      |
| Ctrl + Shift + Y | Mở debug console | 

Viết bởi Quả Cầu.
*/
/* 
┌─────────────┐
│ I. Khai báo │
└─────────────┘
Bạn sẽ thay đổi các giá trị mình muốn ở đây. Nếu trong câu nhập có một tham số nào đó bạn không ghi gì hết HOẶC BẠN GHI NHỮNG TỪ CHƯA KHAI BÁO thì giá trị hiện ra sẽ là giá trị ở phần mặc định. Nếu bạn không muốn có giá trị mặc định nào thì ghi null (không ghi '') .
*/

const chiTiêu = [ //
    { 'Lương thực': ['lương thực', 'ăn sáng', 'ăn trưa', 'ăn chiều', 'ăn tối', 'cơm sáng', 'cơm trưa', 'cơm tối', 'bánh mì', 'rau', 'đồ hộp', 'cơm bụi', 'nước', 'bình nước'] },
    { 'Lương thực/tinh bột': ['gạo', 'xôi', 'bún', 'mì', 'miến', 'cơm'] },
    { 'Lương thực/đạm': ['thịt', 'gà', 'bò', 'heo', 'ba chỉ', 'thăn', 'lườn', 'lòng', 'trứng', 'tôm', 'cá', 'cua', 'tép', 'mực', 'bạch tuộc'] },
    { 'Lương thực/đồ khô': ['pa tê', 'xúc xích', 'thịt xông khói'] },
    { 'Lương thực/gia vị': ['gia vị', 'tỏi', 'ớt', 'muối', 'tiêu', 'đường', 'mắm', 'nước mắm', 'dầu hào', 'hành', 'tôm khô', 'chanh', 'sả', 'nước tương', 'tương ớt', 'tương cà', 'tương đen'] },
    { 'Lương thực/trái cây': ['trái cây', 'chuối', 'dưa', 'dưa gang', 'dưa hấu', 'dưa leo', 'dưa lê', 'dưa chuột', 'đào', 'đu đủ', 'lê', 'bưởi', 'cam', 'chanh', 'chanh leo', 'dâu', 'hồng', 'kiwi', 'mãng cầu', 'mận', 'me', 'mít', 'na', 'nhãn', 'nho', 'quýt', 'sầu riêng', 'táo', 'thanh long', 'vải', 'việt quất', 'xoài'] },
    { 'Xe': ['xăng', 'nhớt xe', 'sửa xe', 'gửi xe', 'grab', 'thuê xe', 'xe đò', 'tài xế'] },
    { 'Sinh hoạt/dịch vụ': ['thẻ điện thoại','điện thoại', 'tiền điện', 'tiền nước', 'tiền internet', 'tiền rác', 'tiền nhà', 'phí quản lý chung cư'] },
    { 'Sinh hoạt/đồ điện tử': ['điện thoại mới', 'tv', 'tủ lạnh', 'máy tính', 'tai nghe'] },
    { 'Sinh hoạt/đồ bếp': ['dầu ăn', 'nồi', 'chảo'] },
    { 'Sinh hoạt/đồ vệ sinh': ['nhang', 'khăn giấy', 'khăn mặt', 'xà bông', 'giấy vệ sinh', 'bvs', 'quần áo', 'chỉ nha khoa', 'kim chỉ', 'kem đánh răng', 'bàn chải đánh răng'] },
    { 'Sinh hoạt/quần áo': ['quần áo', 'quần', 'áo', 'đầm', 'đồ lót'] },
    { 'Y tế': ['khám', 'thuốc', 'xét nghiệm'] },
    { 'Mối quan hệ': ['ăn với', 'cà phê với', 'quà', 'đám tang', 'đám cưới', 'đám giỗ', 'hẹn hò', 'gặp mặt', 'hỗ trợ'] },
    { 'Giáo dục': ['học phí tiếng Anh', 'giáo trình tiếng Anh', 'sách', 'tạp chí'] },
    { 'Con cái': ['tã', 'cho con'] },
    { 'Tài chính': ['đáo'] },
    { 'Công việc': ['tên miền', 'hội thảo'] },
    { 'Trải nghiệm cuộc sống': ['hoa', 'phim', 'vé'] },
    { 'Trải nghiệm cuộc sống/du lịch': ['du lịch', 'visa', 'khách sạn', 'nhà nghỉ', 'vé xe', 'vé xe đò', 'vé xe lửa', 'vé máy bay'] },
    { 'Trải nghiệm cuộc sống/ẩm thực': ['tô', 'đĩa', 'chén', 'bánh', 'kẹo', 'bánh kẹo', 'bánh trái', 'bánh kem', 'bánh canh', 'bánh tráng trộn', 'bún bò', 'bò kho', 'hủ tiếu', 'phở', 'mì quảng', 'sủi cảo', 'hoành thánh', 'snack', 'cháo lòng', 'chè'] },
    { 'Trải nghiệm cuộc sống/giải khát': ['ly', 'li', 'lon', 'cà phê', 'cafe', 'cà phê muối', 'cafe muối', 'nước ngọt', 'bia', 'rượu', 'vang'] },
    { 'Trải nghiệm cuộc sống/thể thao': ['sân', 'banh', 'vợt', 'lưới'] },
]

const phươngThứcThanhToán = [ 
    { 'Thẻ ngân hàng': ['chuyển khoản vietcombank','nhận chuyển khoản vietcombank','nhận chuyển khoản vietinbank','ck Vietinbank','ck Vietcombank','ck vcb','nhận ck vcb', 'Vietcombank', 'Vietcombank vợ', 'shinhan', 'shinhan vợ'] },
    { 'Ví điện tử': ['momo', 'momo vợ',] },
    { 'Tiền mặt': ['tiền mặt', 'vợ trả'] },
    { 'Điểm thưởng': [] },
]
const nơiMua = [
    { 'Cá nhân': ['Elon', 'Tèo'] },
    { 'Tiểu thương': ['chợ', 'tạp hoá'] },
    { 'Địa điểm': ['Quán ăn', 'Quán nước', 'Rạp chiếu phim', 'Sân bay'] },
    { 'Siêu thị': ['Bách Hoá Xanh', 'Co.opmart'] },
    { 'Cửa hàng tiện lợi': ['Family Mart', 'Circle K'] },
    { 'Trung tâm thương mại': [] },
    { 'Sàn thương mại điện tử': ['Shopee', 'Tiki'] }
] 

const GIÁ_TRỊ_MẶC_ĐỊNH = [
    null,       //món đồ được mua
    'tiền mặt', //phương thức thanh toán
    null,       //nơi mua
]

const viếtTắt = [
    {'chuyển khoản': ['ck']},
    {'điện thoại': ['đt']},
    {'cà phê': ['cafe', 'cf']},
    {'ăn sáng': ['as']},
    {'ăn trưa': ['at']},
    {'ăn tối': ['att']},
    {'siêu thị': ['st']},
    {'Tiền nhà 5tr tháng ': ['t1']},
    {'Học phí cho con': ['t2']},
    {'Bách Hoá Xanh': ['bhx']},
    {'Co.opmart': ['coop']},
    {'VietinBank': ['icb']},
    {'Vietcombank': ['vcb']},
    {'BIDV': ['bidv']},
    {'Agribank': ['vba']},
    {'OCB': ['ocb']},
    {'MBBank': ['mb']},
    {'Techcombank': ['tcb']},
    {'ACB': ['acb']},
    {'VPBank': ['vpb']},
    {'TPBank': ['tpb']},
    {'Sacombank': ['stb']},
    {'HDBank': ['hdb']},
    {'VietCapitalBank': ['vccb']},
    {'SCB': ['scb']},
    {'VIB': ['vib']},
    {'SHB': ['shb']},
    {'Eximbank': ['eib']},
    {'MSB': ['msb']},
    {'CAKE': ['cake']},
    {'Ubank': ['ubank']},
    {'Timo': ['timo']},
    {'ViettelMoney': ['vtlmoney']},
    {'VNPTMoney': ['vnptmoney']},
    {'SaigonBank': ['sgicb']},
    {'BacABank': ['bab']},
    {'PVcomBank': ['pvcb']},
    {'Oceanbank': ['oceanbank']},
    {'NCB': ['ncb']},
    {'ABBANK': ['abb']},
    {'VietABank': ['vab']},
    {'NamABank': ['nab']},
    {'PGBank': ['pgb']},
    {'VietBank': ['vietbank']},
    {'BaoVietBank': ['bvb']},
    {'SeABank': ['seab']},
    {'COOPBANK': ['coopbank']},
    {'LienVietPostBank': ['lpb']},
    {'KienLongBank': ['klb']},
    {'KBank': ['kbank']},
    {'PublicBank': ['pbvn']},
    {'VRB': ['vrb']},
    {'HSBC': ['hsbc']},
    {'HongLeong': ['hlbvn']},
    {'GPBank': ['gpb']},
    {'DongABank': ['dob']},
    {'DBSBank': ['dbs']},
    {'CIMB': ['cimb']},
    {'CBBank': ['cbb']},
    {'Citibank': ['citibank']},
]
/* 
┌──────────────┐
│ II. Dán nhãn │
└──────────────┘
Phần này tạo ra hai vật thể quan trọng nhất: vậtThểTừKhaiBáo và vậtThểTừCâuNhập. Chúng đều có 3 chiều: chi tiêu, phương thức thanh toán, nơi mua. Trong mỗi chiều lại chứa 2 danh sách: danh sách từ và danh sách nhãn. Ví dụ, trong chiều chi tiêu của vậtThểTừKhaiBáo 2 danh sách này có dạng như sau:
• danhSáchTừ:   ['rau'       , ... , 'xăng', 'nhớt xe', ... ]
• danhSáchNhãn: ['Lương thực', ... , 'Xe'  , 'Xe', ... ]
Ta biết được nhãn của mỗi từ thông qua việc chúng có cùng chỉ số với nhau.

Ta có thể gọi những danh sách này qua các chỉ số trong vật thể. Ví dụ:
• danhSáchTừ của chiều chi tiêu của vậtThểTừKhaiBáo:   vậtThểTừKhaiBáo[0][0]
• danhSáchNhãn của chiều chi tiêu của vậtThểTừKhaiBáo: vậtThểTừKhaiBáo[0][1]

• danhSáchTừ của chiều PTTT của vậtThểTừCâuNhập:   vậtThểTừCâuNhập[1][0]
• danhSáchNhãn của chiều PTTT của vậtThểTừCâuNhập: vậtThểTừCâuNhập[1][1]

Nói chung, chỉ số của một danh sách có dạng tênVậtThể[i][j], với:
• i là chỉ số chiều:
    - i = 0: chi tiêu
    - i = 1: phương thức thanh toán
    - i= 2: nơi mua
• j là chỉ số danh sách:
    - j = 0: danh sách từ
    - j = 1: danh sách nhãn của từ
    - j = 2: danh sách vị trí của từ (chỉ có ở vậtThểTừCâuNhập) 

Ví dụ, với câu nhập 'gạo, xà bông 50k ở chợ vợ trả' thì vậtThểTừCâuNhập sẽ trông như sau:
┌─────────┬──────────────────────┬───────────────────────────────────────────────────┬──────────────────────┐
│ i ↓ j → │          0           │                         1                         │          2           │
├─────────┼──────────────────────┼───────────────────────────────────────────────────┼──────────────────────┤
│    0    │ [ 'gạo', 'xà bông' ] │ [ 'Lương thực/tinh bột', 'Sinh hoạt/đồ vệ sinh' ] │ [ [0, 3], [5, 12] ]  │
│    1    │     [ 'vợ trả' ]     │                  [ 'Tiền mặt' ]                   │     [ [23, 29] ]     │
│    2    │      [ 'chợ' ]       │                 [ 'Tiểu thương' ]                 │     [ [19, 22] ]     │
└─────────┴──────────────────────┴───────────────────────────────────────────────────┴──────────────────────┘
Xem thêm ưu và nhược điểm của cách biểu diễn dữ liệu này và của những cách khác tại đây: https://softwareengineering.stackexchange.com/q/446480/192731
*/

/* II.1 Tạo vậtThểTừKhaiBáo
───────────────────────────
Thực ra ta không cần tạo vậtThểTừKhaiBáo, vì bản thân các khai báo ở phần I cũng đủ để làm việc. Tuy nhiên việc xây dựng lại sẽ dễ cho việc tính toán hơn.

Vậy tại sao không làm như vậy ngay từ đầu luôn cho rồi? Vì cách khai báo ở phần I dễ cho việc hiểu của người dùng hơn.
*/

/**
 * @param {object} khaiBáo các vật thể được khai báo ở đầu script
 * @returns 
 */
function tạoDanhSáchTừVàNhãnTừKhaiBáo(khaiBáo) {
    var độDàiGiáTrịDanhMục = 0; var nhãnDanhMục = [];
    var danhSáchTừ = []; var danhSáchNhãn = [];
    for (const danhMục of khaiBáo) {
        độDàiGiáTrịDanhMục = Object.values(danhMục)[0].length
        nhãnDanhMục = Object.keys(danhMục)[0]

        const danhSáchTừCủaMỗiNhãnĐượcViếtThường = Object.values(danhMục)[0].map(element => {
            return element.toLowerCase();
        });
        danhSáchTừ = danhSáchTừ.concat(danhSáchTừCủaMỗiNhãnĐượcViếtThường)
        danhSáchNhãn = danhSáchNhãn.concat(Array(độDàiGiáTrịDanhMục).fill(nhãnDanhMục))
    }
    return [danhSáchTừ, danhSáchNhãn]
}

const vậtThểTừKhaiBáo = []
vậtThểTừKhaiBáo[0] = tạoDanhSáchTừVàNhãnTừKhaiBáo(chiTiêu)
vậtThểTừKhaiBáo[1] = tạoDanhSáchTừVàNhãnTừKhaiBáo(phươngThứcThanhToán)
vậtThểTừKhaiBáo[2] = tạoDanhSáchTừVàNhãnTừKhaiBáo(nơiMua)

var danhSáchTấtCảTừTừKhaiBáo = []
for (const i of vậtThểTừKhaiBáo) {
    danhSáchTấtCảTừTừKhaiBáo = danhSáchTấtCảTừTừKhaiBáo.concat(i[0])
}
/* II.2 Lọc từ, dánNhãnTừ và tạo vậtThểTừCâuNhập
────────────────────────────────────────────────
Biểu thức regex chỉ nhận những từ phía trước không có ký tự nào. Như vậy thì người dùng ghi 'cáp' thì script sẽ không tưởng lầm là có 'cá', ghi 'đáo' thì sẽ không tưởng lầm là có 'áo'.

Đoạn ghi chú ngay sau đây dành cho người đã có hiểu biết về regex:
• Ý tưởng ban đầu: dùng '\\b' + từ + '\\b'
• Khó khăn của việc bắt regex tiếng Việt: \b không hỗ trợ cho Unicode. Để bắt Unicode đúng thì có thể thay bằng \P{L}, vốn tương đương với \W. Điều này đòi hỏi ở câu nhập phải thêm 2 khoảng trắng ở 2 bên
• Khó khăn của Fibery: \P{L} chạy rất lâu, mà Fibery chỉ cho thời gian chạy tối đa là 1000ms
• Khó khăn của bài toán: không dùng ' ' + từ + ' ' được vì ngoài dấu cách ra còn có thể có nhiều dấu câu khác
• Sau một hồi loay hoay thì dùng phương pháp này
    - const khôngPhảiKýTựChữNào = '(\b|[^aAàÀảẢãÃáÁạẠăĂằẰẳẲẵẴắẮặẶâÂầẦẩẨẫẪấẤậẬbBcCdDđĐeEèÈẻẺẽẼéÉẹẸêÊềỀểỂễỄếẾệỆfFgGhHiIìÌỉỈĩĨíÍịỊjJkKlLmMnNoOòÒỏỎõÕóÓọỌôÔồỒổỔỗỖốỐộỘơƠờỜởỞỡỠớỚợỢpPqQrRsStTuUùÙủỦũŨúÚụỤưƯừỪửỬữỮứỨựỰvVwWxXyYỳỲỷỶỹỸýÝỵỴzZ0123456789-_])'
    - const regex = new RegExp(khôngPhảiKýTựChữNào + từ + khôngPhảiKýTựChữNào, 'giu');
• Sau đó khi cần dùng tới hàm replace() khi thay từ viết tắt thì chuyển lại sang dạng nhìn trước không có và nhìn sau không có (negative lookahead and negative lookbehind)
*/
const kýTựChữHoặcSốBấtKỳ = '[aAàÀảẢãÃáÁạẠăĂằẰẳẲẵẴắẮặẶâÂầẦẩẨẫẪấẤậẬbBcCdDđĐeEèÈẻẺẽẼéÉẹẸêÊềỀểỂễỄếẾệỆfFgGhHiIìÌỉỈĩĨíÍịỊjJkKlLmMnNoOòÒỏỎõÕóÓọỌôÔồỒổỔỗỖốỐộỘơƠờỜởỞỡỠớỚợỢpPqQrRsStTuUùÙủỦũŨúÚụỤưƯừỪửỬữỮứỨựỰvVwWxXyYỳỲỷỶỹỸýÝỵỴzZ0123456789-_]'

function lọcTừTừCâuNhập(câuNhập, vậtThểTừCâuNhập) {
    //Đi lần lượt từng chiều một
    for (const i in vậtThểTừKhaiBáo) {
        //Đi lần lượt từng từ trong danhSáchTừ để xem có nó trong câu nhập hay không. Nếu có thì sẽ cho vào vậtThểTừCâuNhập
        for (const từ of vậtThểTừKhaiBáo[i][0]) {
            const regex = new RegExp('(?<!' + kýTựChữHoặcSốBấtKỳ + ')'+ từ + '(?!' + kýTựChữHoặcSốBấtKỳ + ')', 'giu');
            var cóTừTrongCâuNhập = true
            while (cóTừTrongCâuNhập) {
                cóTừTrongCâuNhập = regex.test(câuNhập)
                // console.log('Từ được kiểm tra:', từ)
                if (cóTừTrongCâuNhập) {
                    console.log(`Từ được nhận diện: %c${từ}`, 'color: green')
                    regex.lastIndex = regex.lastIndex - 1
                    dánNhãnTừ(i, từ, vậtThểTừCâuNhập, regex.lastIndex)
                }
            }
        }
        //Nếu kết quả không có từ nào thì dùng từ mặc định
        if (vậtThểTừCâuNhập[i][0].length === 0 && typeof GIÁ_TRỊ_MẶC_ĐỊNH[i] === 'string') {
            dánNhãnTừ(i, GIÁ_TRỊ_MẶC_ĐỊNH[i].toLowerCase(), vậtThểTừCâuNhập, null)
        }
    }
    
}

function dánNhãnTừ(i, từ, vậtThểTừCâuNhập, vịTríKếtThúcCủaTừTrongCâu) {
    vậtThểTừCâuNhập[i][0].push(từ)
    // console.log('vậtThểTừCâuNhập[i][0]:', vậtThểTừCâuNhập[i][0])
    //k là chỉ số của từ trong danhSáchTừ. Nhãn tương ứng cho từ đó cũng nằm ở vị trí k trong danhSáchNhãn
    const k = vậtThểTừKhaiBáo[i][0].indexOf(từ)
    const nhãn = vậtThểTừKhaiBáo[i][1][k]
    vậtThểTừCâuNhập[i][1].push(nhãn)
    if (vịTríKếtThúcCủaTừTrongCâu === 'mặc định') {
        vậtThểTừCâuNhập[i][2].push('Mặc định')
    } else {
        vậtThểTừCâuNhập[i][2].push([vịTríKếtThúcCủaTừTrongCâu - từ.length, vịTríKếtThúcCủaTừTrongCâu])
    }
}
/*
┌───────────────────────┐
│ III. Làm sạch kết quả │
└───────────────────────┘
*/
/* III.1 Loại bỏ từ đơn bị nhận diện sai
────────────────────────────────────────
Có những từ đơn không nằm trong câu nhập, nhưng lại nằm trong từ ghép mà từ đó có trong câu nhập. Ví dụ như nếu câu nhập có 'bún bò 50k', thì chỉ có một món là 'bún bò', không phải hai món là 'bún' và 'bò'.

Vật thể quan trọng nhất trong đây là vậtThểTừĐơnTừGhépTrongCâuNhập. Nó gồm 2 chiều: từ đơn và từ ghép. Trong mỗi chiều lại có 2 danh sách: danhSáchTừ và danhSáchVịTrí của nó trong câu nhập.

Ta có thể gọi những danh sách này qua các chỉ số trong vật thể. Ví dụ:
• danhSáchTừ của chiều từ đơn:     vậtThểTừĐơnTừGhépTrongCâuNhập[0][0]
• danhSáchVịTrí của chiều từ ghép: vậtThểTừĐơnTừGhépTrongCâuNhập[1][1]

Nói chung, chỉ số của một danh sách có dạng vậtThểTừĐơnTừGhépTrongCâuNhập[i][j], với:
• i là chỉ số chiều và có giá trị 0 hoặc 1
• j là chỉ số danh sách và có giá trị 0 hoặc 1
*/
function loạiBỏTừĐơnBịNhậnDiệnSai(vậtThểTừCâuNhập) {
    const danhSáchTừĐơnTrongCâuNhập = []; const danhSáchTừGhépTrongCâuNhập = [];
    //Tạo danh sách các từ đơn, từ ghép trong câu nhập
    for (const i of vậtThểTừCâuNhập) {
        for (const k in i[0]) {
            const vịTríTrongCâuNhập = i[2][k]
            if (i[0][k].split(' ').length === 1) {
                danhSáchTừĐơnTrongCâuNhập.push([i[0][k], vịTríTrongCâuNhập])
            } else {
                danhSáchTừGhépTrongCâuNhập.push([i[0][k], vịTríTrongCâuNhập])
            }
            console.log(i[0][k], vịTríTrongCâuNhập, k, danhSáchTừĐơnTrongCâuNhập)
        }
    }
    
    //Tìm những từ đơn cần bị loại
    const danhSáchTấtCảTừĐơnCầnBịLoại = []
    for (const từĐơn of danhSáchTừĐơnTrongCâuNhập) {
        for (const từGhép of danhSáchTừGhépTrongCâuNhập) {
            if (từGhép[0].includes(từĐơn[0]) &&
                từĐơn[1][0] >= từGhép[1][0] &&
                từĐơn[1][1] <= từGhép[1][1]) {
                    danhSáchTấtCảTừĐơnCầnBịLoại.push(từĐơn)
            }
        }
    }
    // console.log('danhSáchTấtCảTừĐơnCầnBịLoại:', danhSáchTấtCảTừĐơnCầnBịLoại)
    //Loại bỏ những từ đơn cần bị loại trong vậtThểTừCâuNhập
    for (const từĐơn of danhSáchTấtCảTừĐơnCầnBịLoại) {
        for (const i of vậtThểTừCâuNhập) {
            for (const vịTríTrongCâuNhập of i[2]) {
                if (từĐơn[1] === vịTríTrongCâuNhập) {
                    const k = i[2].indexOf(vịTríTrongCâuNhập)
                    if (k > -1) {
                        i[0].splice(k, 1)
                        i[1].splice(k, 1)
                        i[2].splice(k, 1)
                    }
                }
            }
        }
    }
}
            
function làmSạchKếtQuả(vậtThểTừCâuNhập) {
    //III.1 Loại bỏ từ đơn nhận diện sai
    loạiBỏTừĐơnBịNhậnDiệnSai(vậtThểTừCâuNhập)
    
    //III.2 Nếu trong câu nhập có nhiều món đồ cùng nhãn thì chỉ lấy một nhãn
    vậtThểTừCâuNhập[0][0] = [...new Set(vậtThểTừCâuNhập[0][0])]
    vậtThểTừCâuNhập[0][1] = [...new Set(vậtThểTừCâuNhập[0][1])]
    
    //III.3 Nếu trong câu nhập có nhiều PTTT thì chỉ lấy cái cuối cùng, còn tất cả những cái phía trước chỉ là thông tin
    const k = vậtThểTừCâuNhập[1][0].length-1
    vậtThểTừCâuNhập[1][0] = [vậtThểTừCâuNhập[1][0][k]]
    vậtThểTừCâuNhập[1][1] = [vậtThểTừCâuNhập[1][1][k]]
    vậtThểTừCâuNhập[1][2] = [vậtThểTừCâuNhập[1][2][k]]
    // console.log('PTTTThựcSự:', vậtThểTừCâuNhập[1][0][k])
}
/* 
┌──────────────┐
│ IV. Đếm tiền │
└──────────────┘
Tất cả những số tiền mà bạn nhập vào sẽ được đưa vào trong danhSáchSốTiềnTừCâuNhập. Trong trường hợp danhSáchSốTiềnTừCâuNhập chỉ chưa 1 kết quả, thì đó chính là số tiền. Nếu có nhiều hơn 1, thì lấy kết quả mà ở trước nó có dấu '='. Kết quả cuối cùng sẽ được gán vào tổngTrướcKhiĐịnhDạng.
*/
/**
 * '=? *(\\d|,|\\.)+ ?(k|tr|d|đ)' + '(?!' + kýTựChữHoặcSốBấtKỳ + ')'
 * Ý nghĩa của biểu thức regex:
 * • /=? / nghĩa là có thể có một dấu bằng (=) trước số tiền tổng. Dấu bằng đó có thể cách hoặc không cách con số đó
 * • /(\d|,|\.)+/ khớp với một hoặc nhiều chữ số, dấu phẩy hoặc dấu chấm
 * • / ?(k|tr|d|đ) / dùng để đảm bảo rằng con số vừa tìm được là số tiền chứ không phải là một con số bất kỳ. Nó biết được điều này bằng việc tìm một trong các ký tự k, tr, d hoặc đ. Các ký tự này có thể có hoặc không có một dấu cách với con số đứng trước nó. Khoảng trắng cuối cùng đảm bảo rằng đứng ngay sau các ký tự này không có chữ cái nào hết, phòng trường hợp những chữ cái này nằm trong một từ nào đó không phải là đơn vị tiền tệ.
 * 
 * Ví dụ:
 * • 'đi chợ 3 tr + 30k'          → bắt được '3 tr', '40k'
 * • 'gạo 30k + rau 40k = 70k'    → bắt được '30k', '40k', '= 70k'
 * • 'sách 40 trang, 10 đèn cầy'  → không bắt được cái nào, dù có '40 tr' và '10 đ' ở trong đó
*/
const regexSốTiền = new RegExp('=? *(\\d|,|\\.)+ ?(k|tr|d|đ)' + '(?!' + kýTựChữHoặcSốBấtKỳ + ')', 'giu');

function lấySốTiền(câuNhập) {
    const danhSáchSốTiềnTừCâuNhập = câuNhập.match(regexSốTiền)
    console.assert(danhSáchSốTiềnTừCâuNhập !== null, 'Danh sách số tiền nhập vào:', danhSáchSốTiềnTừCâuNhập);
    if (danhSáchSốTiềnTừCâuNhập === null) { return null }
    
    if (danhSáchSốTiềnTừCâuNhập.length == 1) {
        var tổngTrướcKhiĐịnhDạng = danhSáchSốTiềnTừCâuNhập[0];
    } else if (danhSáchSốTiềnTừCâuNhập.join().includes('=')) {
        var tổngTrướcKhiĐịnhDạng = danhSáchSốTiềnTừCâuNhập.filter(kếtQuả => kếtQuả.includes('='))[0].replace('=', '');
}   
    // console.log('Tổng trước khi định dạng:', tổngTrướcKhiĐịnhDạng);
    
    const giáTrịCủaTổng = parseFloat(tổngTrướcKhiĐịnhDạng.replace(/=|k|tr|d|đ|,/gu, ''))
    
    if (tổngTrướcKhiĐịnhDạng.includes('tr')) {
        var tổngSauKhiĐịnhDạng = giáTrịCủaTổng * 1000000
    } else if (tổngTrướcKhiĐịnhDạng.includes('k')) {
        var tổngSauKhiĐịnhDạng = giáTrịCủaTổng * 1000
    } else {
        var tổngSauKhiĐịnhDạng = giáTrịCủaTổng
    }

    // console.log('Tổng sau khi định dạng:', tổngSauKhiĐịnhDạng);
    return tổngSauKhiĐịnhDạng
}

/* 
┌────────────────┐
│ V. Tạo kết quả │
└────────────────┘
*/
const kiểuCũ = ['òa', 'óa', 'ỏa', 'õa', 'ọa', 'òe', 'óe', 'ỏe', 'õe', 'ọe', 'ùy', 'úy', 'ủy', 'ũy', 'ụy']
const kiểuMới = ['oà', 'oá', 'oả', 'oã', 'oạ', 'oè', 'oé', 'oẻ', 'oẽ', 'oẹ', 'uỳ', 'uý', 'uỷ', 'uỹ', 'uỵ']
const danhSáchViếtTắt = tạoDanhSáchTừVàNhãnTừKhaiBáo(viếtTắt)
String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.split(search).join(replacement);
};

function xửLýDấuThanhVàViếtTắt(câuNhập) {
    for (const k in kiểuCũ) {
        if (câuNhập.includes(kiểuCũ[k])) câuNhập = câuNhập.replaceAll(kiểuCũ[k], kiểuMới[k])
    }
    for (const k in danhSáchViếtTắt[0]) {
        if (câuNhập.includes(danhSáchViếtTắt[0][k])) {
            const regex = new RegExp('(?<!' + kýTựChữHoặcSốBấtKỳ + ')'+ danhSáchViếtTắt[0][k] + '(?!' + kýTựChữHoặcSốBấtKỳ + ')', 'giu');
            câuNhập = câuNhập.replace(regex, danhSáchViếtTắt[1][k])
        }
    }
    console.info('Câu nhập sau khi xử lý viết tắt:', câuNhập)
    return câuNhập
}
function tạoKếtQuả(câuNhập) {
    // console.log('Số từ khai báo:', danhSáchTấtCảTừTừKhaiBáo.length)

    const vậtThểTừCâuNhập = []
    for (const i in [0, 1, 2]) {
        vậtThểTừCâuNhập[i] = []
        for (const j in [0, 1, 2]) {
            vậtThểTừCâuNhập[i][j] = []
        }
    }
    console.log(`Câu nhập: ${câuNhập}`);
    câuNhập = xửLýDấuThanhVàViếtTắt(câuNhập)
    câuNhập = ' ' + câuNhập + ' '
    lọcTừTừCâuNhập(câuNhập, vậtThểTừCâuNhập)
    làmSạchKếtQuả(vậtThểTừCâuNhập)
    const sốTiền = lấySốTiền(câuNhập)
    console.log(`Số tiền:  %c${sốTiền}`, 'color: green');
    console.log(`Món đồ: %c${vậtThểTừCâuNhập[0][0]}`, 'color: green')
    console.log(`Loại chi tiêu: ${vậtThểTừCâuNhập[0][1]}`)
    console.log(`Phương thức thanh toán: %c${vậtThểTừCâuNhập[1][0]}`, 'color: green')
    console.log(`Loại phương thức thanh toán: ${vậtThểTừCâuNhập[1][1]}`)
    console.log(`Nơi mua: %c${vậtThểTừCâuNhập[2][0]}`, 'color: green')
    console.log(`Loại nơi mua: ${vậtThểTừCâuNhập[2][1]}`)
    
    return [sốTiền, vậtThểTừCâuNhập]
}

/* Nếu debug trên VS Code thì chạy phần code ngay dưới này
──────────────────────────────────────────────────────────
Cách chạy: 
B1. Chọn toàn bộ phần code từ dòng 'const arrayTest...' đến hết vòng lặp for ở ngay dưới nó, rồi bấm Ctrl + / để làm mất dấu // ở đầu từng dòng
B2. Chọn toàn bộ phần code từ dòng 'const fibery...' đến hết vòng lặp for ở ngay dưới nó, rồi bấm Ctrl + / để tạo dấu // ở đầu từng dòng
👇*/
const arrayTest = [
    'cáo đu đủng đáo,40đ,,',
    'mua chè 150đ vợ trả',
    'sd ic xcá zxzxc = 80đ',
    'thử tiếp mua đồ ăn sáng 50k vợ trả',
    'gạo, )bún cơm bún bò bò',
    'gà gà',
    'mua rau 20k',
    'as 40đ',
    'shb bò vợ trả vcb',
    'bách hóa xanh',
    'đi mua kẹo ở bhx 30k ck vcb',
    'đáo thẻ shinhan 30k ck vcb',
    'đi cf 90k kèm mua as 120k = 220k ck stb',
    'đi mua tiếp cái gì đó 50k timo',
    'đi st mua bánh kẹo cho ai đó 20k bidv',
    'đi mua cái gì dods 300k vcb vợ',
    'đi mua cái gì đó 350k vcb vợ',
    'đi mua cái gì đó tiếp 30k',
    'vietcombank vcb Vietcombank ck vcb',
    'đáo tp thanh toán bằng ck vcb',
    'đáo thẻ vcb 200k nhận ck vcb',
    'nhận tiền từ ai đó 350k nhận ck vcb',
    'mua cái gì đó 500k ck vietinbank',
    'mua cái gì 400k ck icb',
    'nhận tiền từ ai đó 700k nhận ck icb',
    'ck Vietcombank',
    'đi bhx mua gạo 20k + bánh 30k = 50.5k ck vcb',
    'nhận tiền từ ai đó 500k nhận ck vcb',
    'cf 90k + đt 200k = 2.5tr nhận ck vietinbank',
]
for (const câuNhập of arrayTest) {
    console.debug(`${arrayTest.indexOf(câuNhập) + 1} %c ${câuNhập} `, 'background-color: yellow');
    console.debug(`   2 4 6 8 0 2 4 6 8 0 2 4 6 8 0`);
    console.debug(`           1         2         3`);
    tạoKếtQuả(câuNhập)
}

/* Nếu chạy trên Fibery thì chạy phần code dưới này
───────────────────────────────────────────────────
Cách chạy: 
B1. Chọn toàn bộ phần code từ dòng 'const arrayTest...' đến hết vòng lặp for ở ngay dưới nó, rồi bấm Ctrl + / để làm mất dấu // ở đầu từng dòng
B2. Chọn toàn bộ phần code từ dòng 'const fibery...' đến hết vòng lặp for ở ngay dưới nó, rồi bấm Ctrl + / để tạo dấu // ở đầu từng dòng
*/
// const fibery = context.getService('fibery');
// for (const entity of args.currentEntities) {
//     const câuNhập = entity['Name'].toLowerCase();
//     const [sốTiền, vậtThểTừCâuNhập] = tạoKếtQuả(câuNhập)

//     await fibery.updateEntity(entity.type, entity.id, {
//         'Số tiền': sốTiền,
//         'Món đồ': vậtThểTừCâuNhập[0][0].join(', '),
//         'Loại chi tiêu': vậtThểTừCâuNhập[0][1].join(', '),
//         'Phương thức thanh toán': vậtThểTừCâuNhập[1][0][0],
//         'Loại phương thức thanh toán': vậtThểTừCâuNhập[1][1][0],
//         'Nơi mua': vậtThểTừCâuNhập[2][0].join(', '),
//         'Loại nơi mua': vậtThểTừCâuNhập[2][1].join(', '),
//     });
// }

console.log('Chương trình hoàn tất.')