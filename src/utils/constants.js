export default class Constants {

  static optionsStatusBooking = [
    { label: "Chưa xác nhận", value: 1 },
    { label: "Đã xác nhận", value: 2 },
    { label: "Đã khám", value: 3 },
    { label: "BS Đã đánh giá", value: 4 },
    // { label: "BN Đã đánh giá", value: 5 },
  ]
  static optionServices = [
    { label: "Khám trong giờ", value: 1 },
    { label: "Khám ngoài giờ", value: 2 },
    { label: "Khám online", value: 3 },
  ]
  static optionStatusCl = [
    { label: "Đang chờ duyệt", value: 1, color: '#41B06E' },
    { label: "Bị từ chối", value: 2, color: '#e74c3c' },
    { label: "Đã được duyệt", value: 3, color: '#00b5f1' },
    { label: "Đã đặt lich", value: 4, color: '#edf03c' },
  ]
  static nationVN = [
    { label: "Kinh", value: 1 },
    { label: "Tày", value: 2 },
    { label: "Thái", value: 3 },
    { label: "Mường", value: 4 },
    { label: "H'Mông", value: 5 },
    { label: "Nùng", value: 6 },
    { label: "Dao", value: 7 },
    { label: "Khơ Mú", value: 8 },
    { label: "Hrê", value: 9 },
    { label: "Gia Rai", value: 10 },
    { label: "Ê Đê", value: 11 },
    { label: "Ba Na", value: 12 },
    { label: "Xơ Đăng", value: 13 },
    { label: "Sán Chay", value: 14 },
    { label: "Chăm", value: 15 },
    { label: "Cơ Ho", value: 16 },
    { label: "Ra Glai", value: 17 },
    { label: "M'nông", value: 18 },
    { label: "Thổ", value: 19 },
    { label: "Brâu", value: 20 },
    { label: "Ơ Đu", value: 21 },
    { label: "Giáy", value: 22 },
    { label: "Cống", value: 23 },
    { label: "Si La", value: 24 },
    { label: "Pu Péo", value: 25 },
    { label: "Ro Măm", value: 26 },
    { label: "La Hủ", value: 27 },
    { label: "Lự", value: 28 },
    { label: "La Chi", value: 29 },
    { label: "Phù Lá", value: 30 },
    { label: "La Ha", value: 31 },
    { label: "Mảng", value: 32 },
    { label: "Pà Thẻn", value: 33 },
    { label: "Chứt", value: 34 },
    { label: "Lào", value: 35 },
    { label: "Lự", value: 36 },
    { label: "Kháng", value: 37 },
    { label: "Hà Nhì", value: 38 },
    { label: "Co", value: 39 },
    { label: "Cờ Lao", value: 40 },
    { label: "Bố Y", value: 41 },
    { label: "La Chi", value: 42 },
    { label: "La Ha", value: 43 },
    { label: "Pu Ko", value: 44 },
    { label: "Chơ Ro", value: 45 },
    { label: "Xinh Mun", value: 46 },
    { label: "Pá Thẻn", value: 47 },
    { label: "Chu Ru", value: 48 },
    { label: "Lự", value: 49 },
    { label: "Lào", value: 50 },
    { label: "La Chi", value: 51 },
    { label: "Mường", value: 52 },
    { label: "Lự", value: 53 },
    { label: "Hoa", value: 54 },
    { label: "Người nước ngoài", value: 55 }
  ];

  static levelDoctor = [
    { label: "Bác sĩ thực tập", value: 1 },
    { label: "Bác sĩ cơ sở", value: 2 },
    { label: "Bác sĩ chuyên khoa", value: 3 },
    { label: "Bác sĩ chính thức", value: 4 },
    { label: "Giáo sư", value: 5 },
    { label: "Bác sĩ phụ trách", value: 6 }
  ]

  static optionSex = [
    {
      label: "Nam",
      value: "Male"
    },
    {
      label: "Nữ",
      value: "Female"
    },
    {
      label: "Khác",
      value: 'Other'
    },
  ];

  static optionStatusAccount = [
    {
      label: "Đang hoạt động",
      value: 10
    },
    {
      label: "Khóa tài khoản",
      value: 20,
    }
  ];
  static labelStatus = [
    {
      label: "Chờ xác nhận",
      value: 1,
      status: 'warning'
    },
    {
      label: "Đã xác nhận",
      value: 2,
      status: 'processing'
    }
    ,
    {
      label: "Bị huỷ lịch",
      value: 3,
      status: 'error'
    },
    {
      label: "Đã hoàn thành",
      value: 4,
      status: 'success'
    }
  ];

  static labelStatusQuestion = [
    {
      label: "Chưa trả lời",
      value: 1,
      status: 'warning'
    },
    {
      label: "Đã trả lời",
      value: 2,
      status: 'processing'
    }
  ];
  static vietnamProvinces = [
    { label: "Hà Nội", value: 1 },
    { label: "Hà Giang", value: 2 },
    { label: "Cao Bằng", value: 3 },
    { label: "Lào Cai", value: 4 },
    { label: "Điện Biên", value: 5 },
    { label: "Lai Châu", value: 6 },
    { label: "Sơn La", value: 7 },
    { label: "Yên Bái", value: 8 },
    { label: "Tuyên Quang", value: 9 },
    { label: "Lạng Sơn", value: 10 },
    { label: "Quảng Ninh", value: 11 },
    { label: "Hòa Bình", value: 12 },
    { label: "Ninh Bình", value: 13 },
    { label: "Thái Bình", value: 14 },
    { label: "Thanh Hóa", value: 15 },
    { label: "Nghệ An", value: 16 },
    { label: "Hà Tĩnh", value: 17 },
    { label: "Quảng Bình", value: 18 },
    { label: "Quảng Trị", value: 19 },
    { label: "Thừa Thiên-Huế", value: 20 },
    { label: "Đà Nẵng", value: 21 },
    { label: "Quảng Nam", value: 22 },
    { label: "Quảng Ngãi", value: 23 },
    { label: "Bình Định", value: 24 },
    { label: "Phú Yên", value: 25 },
    { label: "Khánh Hòa", value: 26 },
    { label: "Ninh Thuận", value: 27 },
    { label: "Bình Thuận", value: 28 },
    { label: "Kon Tum", value: 29 },
    { label: "Gia Lai", value: 30 },
    { label: "Đắk Lắk", value: 31 },
    { label: "Đắk Nông", value: 32 },
    { label: "Lâm Đồng", value: 33 },
    { label: "Bình Phước", value: 34 },
    { label: "Tây Ninh", value: 35 },
    { label: "Bình Dương", value: 36 },
    { label: "Đồng Nai", value: 37 },
    { label: "Bà Rịa-Vũng Tàu", value: 38 },
    { label: "Hồ Chí Minh", value: 39 },
    { label: "Long An", value: 40 },
    { label: "Tiền Giang", value: 41 },
    { label: "Bến Tre", value: 42 },
    { label: "Trà Vinh", value: 43 },
    { label: "Vĩnh Long", value: 44 },
    { label: "Đồng Tháp", value: 45 },
    { label: "An Giang", value: 46 },
    { label: "Kiên Giang", value: 47 },
    { label: "Cần Thơ", value: 48 },
    { label: "Hậu Giang", value: 49 },
    { label: "Sóc Trăng", value: 50 },
    { label: "Bạc Liêu", value: 51 },
    { label: "Cà Mau", value: 52 },
    { label: "Tây Ninh", value: 53 },
    { label: "Cộng Hòa Xã Hội Chủ Nghĩa Việt Nam", value: 54 },
    { label: "Hà Giang", value: 55 },
    { label: "Cao Bằng", value: 56 },
    { label: "Lào Cai", value: 57 },
    { label: "Điện Biên", value: 58 },
    { label: "Lai Châu", value: 59 },
    { label: "Sơn La", value: 60 },
    { label: "Yên Bái", value: 61 },
    { label: "Tuyên Quang", value: 62 },
    { label: "Lạng Sơn", value: 63 }
  ];

  static dataUser = [
    {
      key: 1,
      username: "meomeo",
      lastname: "Linh",
      firstname: "Nguyễn Thị Mỹ",
      phone: "0921012922",
      timeOrder: 2002,
      age: 20,
      gender: "Female",
      follow: 2000,
      cityId: 2,
      email: "hckjfd@gamil.com",
      addressDetails: "8 hà văn tính",
      rateDone: 60.86,
      image:
        "https://playerduo.net/api/upload-service/images/a0b07166-1e65-4e77-a651-b2fef639aa86__68884ad0-61ed-11ee-bec4-f929e725acab__player_album.jpg",
      lastName: "Kami",
      id: "gamrach",
      textShort: "Game gì cũng chơi ❤️",
      star: 4,
      status: true,
      listgame: [
        {
          id: 1,
          name: "Liên minh huyền thoại",
          link:
            "https://files.playerduo.net/production/game_avatars/715867c6-698f-411a-b2-1e9093130b60__62295df0-34d5-11ed-838c-b120e70abb59__game_avatars.jpg"
        },
        {
          id: 2,
          name: "PUGB",
          link:
            "https://playerduo.net/api/upload-service/game_avatars/715867c6-698f-411a-b2-1e9093130b60__a844a8e0-34cf-11ed-838c-b120e70abb59__game_avatars.jpg"
        }
      ],
      commnent: 202,
      postPrice: "không chảnh, Nhận coaching đtcl từ rank kc trở xuống ",
      videoPrice: "https://youtu.be/WAg0jKqgmuI"
    },
    {
      key: 2,
      username: "kamiya",
      lastname: "Linh",
      firstname: "Nguyễn Kim ",
      phone: "092102922",
      age: 20,
      gender: "Female",
      follow: 2230,
      cityId: 2,
      status: true
    },
    {
      key: 3,
      username: "meoyeukenii98",
      lastname: "Linh",
      firstname: "Tiểu Lươn  ",
      phone: "092102922",
      age: 20,
      gender: "Female",
      follow: 2230,
      cityId: 2,
      status: true
    },
    {
      key: 4,
      username: "linhnhi",
      lastname: "Shiro ",
      firstname: "Shiro ",
      phone: "092102922",
      age: 20,
      gender: "Female",
      follow: 2230,
      cityId: 2,
      status: false
    },
    {
      key: 5,
      username: "surycutie",
      lastname: "Thảo",
      firstname: "Hương  ",
      phone: "092102922",
      age: 20,
      gender: "Female",
      follow: 2230,
      cityId: 2,
      status: true
    },
    {
      key: 6,
      username: "cici003",
      lastname: "Linh",
      firstname: "Nguyễn Kim ",
      phone: "092102922",
      age: 20,
      gender: "Female",
      follow: 2230,
      cityId: 2,
      status: true
    },
    {
      key: 7,
      username: "thucanh97",
      lastname: "Thục ",
      firstname: "Anh",
      phone: "092102922",
      age: 20,
      gender: "Female",
      follow: 2230,
      cityId: 2,
      status: true
    },
    {
      key: 8,
      username: "chucnghi",
      lastname: "Hồng",
      firstname: "Nguyễn ",
      phone: "092102922",
      age: 20,
      gender: "Female",
      follow: 2230,
      cityId: 2,
      status: true
    },
    {
      key: 9,
      username: "trangmythuat",
      lastname: "Trang ",
      firstname: "Mỹ Thuật ",
      phone: "092102922",
      age: 20,
      gender: "Female",
      follow: 2230,
      cityId: 2,
      status: true
    },
    {
      key: 7,
      username: "kamiya",
      lastname: "Linh",
      firstname: "Nguyễn Kim ",
      phone: "092102922",
      age: 20,
      gender: "Female",
      follow: 2230,
      cityId: 2,
      status: true
    },
    {
      key: 7,
      username: "kamiya",
      lastname: "Linh",
      firstname: "Nguyễn Kim ",
      phone: "092102922",
      age: 20,
      gender: "Female",
      follow: 2230,
      cityId: 2,
      status: true
    },
    {
      key: 7,
      username: "kamiya",
      lastname: "Linh",
      firstname: "Nguyễn Kim ",
      phone: "092102922",
      age: 20,
      gender: "Female",
      follow: 2230,
      cityId: 2,
      status: true
    }
  ];
}
