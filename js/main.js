const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const PLAYER_STORAGE_KEY = 'KyNguyen_Music'
const player = $('.player');
const playlist = $('.playlist')
const headingTitle = $('header h2');
const headingCreator = $('header h3');
const heading = $('header h2');
const cdThumb = $('.cd-thumb');
const audio = $('#audio');
const playBtn = $('.btn-toggle-play')
const progress = $('#progress')
const nextBtn = $('.btn-next')
const prevBtn = $('.btn-prev')
const randomBtn = $('.btn-random')
const repeatBtn = $('.btn-repeat')

const music = {
    currentIndex : 0,
    isPlaying : false,
    isRandom : false,
    isRepeat : false,
    config : JSON.parse(localStorage.getItem(PLAYER_STORAGE_KEY)) || {},
    songs : [
        {
          "title": "Muộn Rồi Mà Sao Còn",
          "creator": "Sơn Tùng M-TP",
          "music": "https://aredir.nixcdn.com/Believe_Audio19/MuonRoiMaSaoCon-SonTungMTP-7011803.mp3?st=jS-CBNEJ8K028b9PCzRdqA&e=1627419277",
          "url": "https://www.nhaccuatui.com/bai-hat/muon-roi-ma-sao-con-son-tung-m-tp.6nAqBAZ3nxuV.html",
          "lyric": "https://lrc-nct.nixcdn.com/2021/05/07/a/9/f/2/1620357842616.lrc",
          "bgImage": "https://avatar-ex-swe.nixcdn.com/singer/avatar/2021/05/12/7/d/c/b/1620802736418_600.jpg",
          "avatar": "https://avatar-ex-swe.nixcdn.com/song/2021/04/29/9/1/f/8/1619691182261.jpg",
          "coverImage": "https://avatar-ex-swe.nixcdn.com/playlist/2021/05/04/3/b/6/d/1620100988545_500.jpg"
        },
        {
          "title": "Sao Ta Ngược Lối",
          "creator": "Đình Dũng",
          "music": "https://f9-stream.nixcdn.com/NhacCuaTui1018/SaoTaNguocLoi-DinhDung-7052177.mp3?st=WMkN0j8zCN5ztiYo1RoCKg&e=1627419277",
          "url": "https://www.nhaccuatui.com/bai-hat/sao-ta-nguoc-loi-dinh-dung.avh59rrDca4n.html",
          "lyric": "https://lrc-nct.nixcdn.com/null",
          "bgImage": "https://avatar-ex-swe.nixcdn.com/singer/avatar/2020/09/22/5/3/5/d/1600744344048_600.jpg",
          "avatar": "https://avatar-ex-swe.nixcdn.com/song/2021/07/21/7/0/f/8/1626843874820.jpg",
          "coverImage": "https://avatar-ex-swe.nixcdn.com/playlist/2021/05/04/3/b/6/d/1620100988545_500.jpg"
        },
        {
          "title": "Nắm Đôi Bàn Tay",
          "creator": "Kay Trần",
          "music": "https://f9-stream.nixcdn.com/NhacCuaTui1017/NamDoiBanTay-KayTran-7042104.mp3?st=2KdqQtBbQEStKDeJ51uyJg&e=1627419277",
          "url": "https://www.nhaccuatui.com/bai-hat/nam-doi-ban-tay-kay-tran.xcNnXdzdGWuz.html",
          "lyric": "https://lrc-nct.nixcdn.com/2021/07/10/2/9/b/8/1625892644539.lrc",
          "bgImage": "https://avatar-ex-swe.nixcdn.com/singer/avatar/2021/07/05/7/5/8/a/1625467381647_600.jpg",
          "avatar": "https://avatar-ex-swe.nixcdn.com/song/2021/07/03/e/9/6/f/1625303286239.jpg",
          "coverImage": "https://avatar-ex-swe.nixcdn.com/playlist/2021/05/04/3/b/6/d/1620100988545_500.jpg"
        },
        {
          "title": "Sài Gòn Hôm Nay Mưa",
          "creator": "JSOL, Hoàng Duyên",
          "music": "https://aredir.nixcdn.com/NhacCuaTui1016/SaiGonHomNayMua-JSOLHoangDuyen-7026537.mp3?st=yApIDV-Zq4RObPTb-jmI9A&e=1627419277",
          "url": "https://www.nhaccuatui.com/bai-hat/sai-gon-hom-nay-mua-jsol-ft-hoang-duyen.EZwfyBx9IT1N.html",
          "lyric": "https://lrc-nct.nixcdn.com/2021/07/20/1/0/0/2/1626752585501.lrc",
          "bgImage": "https://avatar-ex-swe.nixcdn.com/singer/avatar/2021/06/29/3/c/a/6/1624943867794_600.jpg",
          "avatar": "https://avatar-ex-swe.nixcdn.com/song/2021/05/30/2/6/7/5/1622365032910.jpg",
          "coverImage": "https://avatar-ex-swe.nixcdn.com/playlist/2021/05/04/3/b/6/d/1620100988545_500.jpg"
        },
        {
            "title": "Thê Lương",
            "creator": "Phúc Chinh",
            "music": "https://aredir.nixcdn.com/NhacCuaTui1012/TheLuong-PhucChinh-6971140.mp3?st=NnhpUWWFrCznGbhtOD3BMA&e=1627419277",
            "url": "https://www.nhaccuatui.com/bai-hat/the-luong-phuc-chinh.nmxw6tXZyBQy.html",
            "lyric": "https://lrc-nct.nixcdn.com/2021/03/22/2/8/d/4/1616360845396.lrc",
            "bgImage": "https://avatar-ex-swe.nixcdn.com/singer/avatar/2021/07/13/0/6/d/2/1626145766324_600.jpg",
            "avatar": "https://avatar-ex-swe.nixcdn.com/song/2021/03/12/e/2/9/e/1615554946033.jpg",
            "coverImage": "https://avatar-ex-swe.nixcdn.com/playlist/2021/05/04/3/b/6/d/1620100988545_500.jpg"
          },
        {
          "title": "Trắc Trở",
          "creator": "X2X",
          "music": "https://f9-stream.nixcdn.com/NhacCuaTui1017/TracTro-X2X-7040184.mp3?st=GpjEF7eyH8epvoLAdDGFEg&e=1627419277",
          "url": "https://www.nhaccuatui.com/bai-hat/trac-tro-x2x.euuuwjUAqLcX.html",
          "lyric": "https://lrc-nct.nixcdn.com/2021/07/08/6/e/d/5/1625714895877.lrc",
          "bgImage": "https://avatar-ex-swe.nixcdn.com/singer/avatar/2021/03/15/4/7/7/8/1615802750962_600.jpg",
          "avatar": "https://avatar-ex-swe.nixcdn.com/song/2021/06/28/8/4/3/c/1624872522478.jpg",
          "coverImage": "https://avatar-ex-swe.nixcdn.com/playlist/2021/05/04/3/b/6/d/1620100988545_500.jpg"
        },
        {
          "title": "Sài Gòn Đau Lòng Quá",
          "creator": "Hứa Kim Tuyền, Hoàng Duyên",
          "music": "https://aredir.nixcdn.com/NhacCuaTui1013/SaiGonDauLongQua-HuaKimTuyenHoangDuyen-6992977.mp3?st=eHzzqUQ9YdNvD8tNHCbrow&e=1627419277",
          "url": "https://www.nhaccuatui.com/bai-hat/sai-gon-dau-long-qua-hua-kim-tuyen-ft-hoang-duyen.2hI4xFTa2lxJ.html",
          "lyric": "https://lrc-nct.nixcdn.com/2021/03/29/0/3/e/5/1616991024586.lrc",
          "bgImage": "https://avatar-ex-swe.nixcdn.com/singer/avatar/2021/03/30/c/2/0/6/1617079270471_600.jpg",
          "avatar": "https://avatar-ex-swe.nixcdn.com/song/2021/03/27/d/2/9/1/1616859493571.jpg",
          "coverImage": "https://avatar-ex-swe.nixcdn.com/playlist/2021/05/04/3/b/6/d/1620100988545_500.jpg"
        },
        {
          "title": "Thức Giấc",
          "creator": "Da LAB",
          "music": "https://f9-stream.nixcdn.com/NhacCuaTui1018/ThucGiac-DaLAB-7048212.mp3?st=kKDXbXrR5NQh8CkpZGpNPA&e=1627419277",
          "url": "https://www.nhaccuatui.com/bai-hat/thuc-giac-da-lab.uyQTq9aL9Nfr.html",
          "lyric": "https://lrc-nct.nixcdn.com/2021/07/22/0/e/4/1/1626922616969.lrc",
          "bgImage": "https://avatar-ex-swe.nixcdn.com/singer/avatar/2020/08/03/3/f/4/5/1596425146149_600.jpg",
          "avatar": "https://avatar-ex-swe.nixcdn.com/song/2021/07/14/8/c/f/9/1626231010810.jpg",
          "coverImage": "https://avatar-ex-swe.nixcdn.com/playlist/2021/05/04/3/b/6/d/1620100988545_500.jpg"
        },
        {
          "title": "Phận Duyên Lỡ Làng",
          "creator": "Phát Huy T4, Truzg",
          "music": "https://aredir.nixcdn.com/NhacCuaTui1014/PhanDuyenLoLang-PhatHuyT4Trugz-7004538.mp3?st=8JcvZKwRSeaSOFup9GbHLw&e=1627419277",
          "url": "https://www.nhaccuatui.com/bai-hat/phan-duyen-lo-lang-phat-huy-t4-ft-truzg.ipBDxxA22NUf.html",
          "lyric": "https://lrc-nct.nixcdn.com/2021/04/19/b/1/b/6/1618802396072.lrc",
          "bgImage": "https://avatar-ex-swe.nixcdn.com/singer/avatar/2021/04/14/b/9/8/b/1618374024681_600.jpg",
          "avatar": "https://avatar-ex-swe.nixcdn.com/song/2021/04/14/c/3/3/b/1618383513976.jpg",
          "coverImage": "https://avatar-ex-swe.nixcdn.com/playlist/2021/05/04/3/b/6/d/1620100988545_500.jpg"
        },
        {
          "title": "Nếu Có Kiếp Sau",
          "creator": "Hương Ly",
          "music": "https://f9-stream.nixcdn.com/NhacCuaTui1017/NeuCoKiepSau-HuongLy-7034940.mp3?st=0f0SW6IcFJ3UrVPn4bffWw&e=1627419277",
          "url": "https://www.nhaccuatui.com/bai-hat/neu-co-kiep-sau-huong-ly.ERV3kZbvf716.html",
          "lyric": "https://lrc-nct.nixcdn.com/null",
          "bgImage": "https://avatar-ex-swe.nixcdn.com/singer/avatar/2020/11/02/c/4/b/1/1604299335097_600.jpg",
          "avatar": "https://avatar-ex-swe.nixcdn.com/song/2021/06/18/d/c/e/c/1623989997901.jpg",
          "coverImage": "https://avatar-ex-swe.nixcdn.com/playlist/2021/05/04/3/b/6/d/1620100988545_500.jpg"
        },
        {
          "title": "Nàng Thơ",
          "creator": "Hoàng Dũng",
          "music": "https://aredir.nixcdn.com/NhacCuaTui1001/NangTho-HoangDung-6413381.mp3?st=UqKWLfGdEhmcCBxZqeXdNA&e=1627419277",
          "url": "https://www.nhaccuatui.com/bai-hat/nang-tho-hoang-dung.Kx3Kbih0rS5z.html",
          "lyric": "https://lrc-nct.nixcdn.com/2020/08/04/a/7/a/5/1596551789790.lrc",
          "bgImage": "https://avatar-ex-swe.nixcdn.com/singer/avatar/2019/09/19/1/e/f/8/1568871085871_600.jpg",
          "avatar": "https://avatar-ex-swe.nixcdn.com/song/2020/07/31/c/5/8/9/1596188259603.jpg",
          "coverImage": "https://avatar-ex-swe.nixcdn.com/playlist/2021/05/04/3/b/6/d/1620100988545_500.jpg"
        },
        {
          "title": "Câu Hẹn Câu Thề",
          "creator": "Đình Dũng, ACV",
          "music": "https://aredir.nixcdn.com/NhacCuaTui1013/CauHenCauThe-DinhDung-6994741.mp3?st=7sx76hHT9N-Bhi6GukZYDQ&e=1627419277",
          "url": "https://www.nhaccuatui.com/bai-hat/cau-hen-cau-the-dinh-dung-ft-acv.DT1Ev3vytaQo.html",
          "lyric": "https://lrc-nct.nixcdn.com/2021/04/05/9/f/3/8/1617596589191.lrc",
          "bgImage": "https://avatar-ex-swe.nixcdn.com/singer/avatar/2020/09/22/5/3/5/d/1600744344048_600.jpg",
          "avatar": "https://avatar-ex-swe.nixcdn.com/song/2021/03/29/2/2/1/e/1617029681297.jpg",
          "coverImage": "https://avatar-ex-swe.nixcdn.com/playlist/2021/05/04/3/b/6/d/1620100988545_500.jpg"
        },
        {
          "title": "Vách Ngọc Ngà",
          "creator": "Anh Rồng",
          "music": "https://aredir.nixcdn.com/NhacCuaTui1013/VachNgocNga-AnhRong-6984991.mp3?st=2FvfnGVM3bbOc3h-QByrEQ&e=1627419277",
          "url": "https://www.nhaccuatui.com/bai-hat/vach-ngoc-nga-anh-rong.Rk1SNs5dI0Nf.html",
          "lyric": "https://lrc-nct.nixcdn.com/2021/03/31/f/4/c/b/1617161486413.lrc",
          "bgImage": "https://avatar-ex-swe.nixcdn.com/singer/avatar/2020/12/14/2/5/3/b/1607910088022_600.jpg",
          "avatar": "https://avatar-ex-swe.nixcdn.com/song/2021/03/25/0/b/f/e/1616662504016.jpg",
          "coverImage": "https://avatar-ex-swe.nixcdn.com/playlist/2021/05/04/3/b/6/d/1620100988545_500.jpg"
        },
        {
          "title": "Trên Tình Bạn Dưới Tình Yêu",
          "creator": "MIN",
          "music": "https://aredir.nixcdn.com/NhacCuaTui1005/TrenTinhBanDuoiTinhYeu-MIN-6802163.mp3?st=oyHaRYjQOocqAkMMl2Pe6g&e=1627419277",
          "url": "https://www.nhaccuatui.com/bai-hat/tren-tinh-ban-duoi-tinh-yeu-min.adEZfVuRfAhW.html",
          "lyric": "https://lrc-nct.nixcdn.com/2020/11/05/9/5/c/9/1604562096053.lrc",
          "bgImage": "https://avatar-ex-swe.nixcdn.com/singer/avatar/2020/11/05/2/2/0/3/1604563630516_600.jpg",
          "avatar": "https://avatar-ex-swe.nixcdn.com/song/2020/11/05/4/4/6/c/1604574284072.jpg",
          "coverImage": "https://avatar-ex-swe.nixcdn.com/playlist/2021/05/04/3/b/6/d/1620100988545_500.jpg"
        },
        {
          "title": "Níu Duyên",
          "creator": "Lê Bảo Bình",
          "music": "https://aredir.nixcdn.com/NhacCuaTui1008/NiuDuyen-LeBaoBinh-6872127.mp3?st=sM8WlX-yNdELz5AYIYc6tg&e=1627419277",
          "url": "https://www.nhaccuatui.com/bai-hat/niu-duyen-le-bao-binh.WxXR1SGXHAR7.html",
          "lyric": "https://lrc-nct.nixcdn.com/2020/12/09/c/7/2/e/1607480641266.lrc",
          "bgImage": "https://avatar-ex-swe.nixcdn.com/singer/avatar/2018/01/24/a/3/d/e/1516765405718_600.jpg",
          "avatar": "https://avatar-ex-swe.nixcdn.com/song/2020/12/07/e/7/5/9/1607308157174.jpg",
          "coverImage": "https://avatar-ex-swe.nixcdn.com/playlist/2021/05/04/3/b/6/d/1620100988545_500.jpg"
        },
        {
          "title": "Phải Chăng Em Đã Yêu?",
          "creator": "Juky San, RedT",
          "music": "https://aredir.nixcdn.com/NhacCuaTui1011/PhaiChangEmDaYeu-JukySanRedT-6940932.mp3?st=AhuOJy4ANacpSLqeLPeXtw&e=1627419277",
          "url": "https://www.nhaccuatui.com/bai-hat/phai-chang-em-da-yeu-juky-san-ft-redt.MRUP1c69kN0R.html",
          "lyric": "https://lrc-nct.nixcdn.com/2021/03/08/5/c/4/b/1615219017101.lrc",
          "bgImage": "https://avatar-ex-swe.nixcdn.com/singer/avatar/2021/02/17/a/3/2/1/1613561860337_600.jpg",
          "avatar": "https://avatar-ex-swe.nixcdn.com/song/2021/02/10/6/5/a/6/1612954164434.jpg",
          "coverImage": "https://avatar-ex-swe.nixcdn.com/playlist/2021/05/04/3/b/6/d/1620100988545_500.jpg"
        },
        {
          "title": "Lỡ Say Bye Là Bye",
          "creator": "Lemese, Changg",
          "music": "https://aredir.nixcdn.com/NhacCuaTui1010/LoSayByeLaBye-LemeseChangg-6926941.mp3?st=uNs2MVSDI8oLlDE6KdOdDQ&e=1627419277",
          "url": "https://www.nhaccuatui.com/bai-hat/lo-say-bye-la-bye-lemese-ft-changg.QLdwL2NxwFA5.html",
          "lyric": "https://lrc-nct.nixcdn.com/2021/03/08/5/c/4/b/1615219651901.lrc",
          "bgImage": "https://avatar-ex-swe.nixcdn.com/singer/avatar/2019/11/08/2/2/a/0/1573196340329_600.jpg",
          "avatar": "https://avatar-ex-swe.nixcdn.com/song/2021/01/21/5/c/9/9/1611199600529.jpg",
          "coverImage": "https://avatar-ex-swe.nixcdn.com/playlist/2021/05/04/3/b/6/d/1620100988545_500.jpg"
        },
        {
          "title": "Thế Thái",
          "creator": "Hương Ly",
          "music": "https://aredir.nixcdn.com/NhacCuaTui1004/TheThai-HuongLy-6728509.mp3?st=e34SC1DerTXybSz5x4F_mw&e=1627419277",
          "url": "https://www.nhaccuatui.com/bai-hat/the-thai-huong-ly.73T5LuURl5Bo.html",
          "lyric": "https://lrc-nct.nixcdn.com/2020/10/13/7/4/f/8/1602557634151.lrc",
          "bgImage": "https://avatar-ex-swe.nixcdn.com/singer/avatar/2020/11/02/c/4/b/1/1604299335097_600.jpg",
          "avatar": "https://avatar-ex-swe.nixcdn.com/song/2020/10/12/0/7/e/3/1602477673421.jpg",
          "coverImage": "https://avatar-ex-swe.nixcdn.com/playlist/2021/05/04/3/b/6/d/1620100988545_500.jpg"
        },
        {
          "title": "Anh Không Tha Thứ",
          "creator": "Đình Dũng, ACV",
          "music": "https://aredir.nixcdn.com/NhacCuaTui1004/AnhKhongThaThu-DinhDung-6684271.mp3?st=XjKJIbEiptZeTSRb-eCyVA&e=1627419277",
          "url": "https://www.nhaccuatui.com/bai-hat/anh-khong-tha-thu-dinh-dung-ft-acv.CE7Fwqox7j2h.html",
          "lyric": "https://lrc-nct.nixcdn.com/2020/10/05/3/5/9/1/1601871124164.lrc",
          "bgImage": "https://avatar-ex-swe.nixcdn.com/singer/avatar/2020/09/22/5/3/5/d/1600744344048_600.jpg",
          "avatar": "https://avatar-ex-swe.nixcdn.com/song/2020/09/28/4/9/a/7/1601278894694.jpg",
          "coverImage": "https://avatar-ex-swe.nixcdn.com/playlist/2021/05/04/3/b/6/d/1620100988545_500.jpg"
        },
        {
          "title": "Chúng Ta Sau Này",
          "creator": "T.R.I",
          "music": "https://aredir.nixcdn.com/NhacCuaTui1010/ChungTaSauNay-TRI-6929586.mp3?st=krZOGgR00DTpfGfpvYmhNA&e=1627419277",
          "url": "https://www.nhaccuatui.com/bai-hat/chung-ta-sau-nay-tri.61Wkf72FX7be.html",
          "lyric": "https://lrc-nct.nixcdn.com/2021/03/08/5/c/4/b/1615219421510.lrc",
          "bgImage": "https://avatar-ex-swe.nixcdn.com/singer/avatar/2020/08/12/f/2/d/1/1597199590443_600.jpg",
          "avatar": "https://avatar-ex-swe.nixcdn.com/song/2021/01/27/5/2/2/b/1611738358661.jpg",
          "coverImage": "https://avatar-ex-swe.nixcdn.com/playlist/2021/05/04/3/b/6/d/1620100988545_500.jpg"
        },
        {
          "title": "Tình Yêu Màu Hồng",
          "creator": "Hồ Văn Quý, Xám",
          "music": "https://aredir.nixcdn.com/NhacCuaTui1009/TinhYeuMauHong-HoVanQuyXam-6914636.mp3?st=CVX3moZr5Cn4JtD_75p7Yw&e=1627419277",
          "url": "https://www.nhaccuatui.com/bai-hat/tinh-yeu-mau-hong-ho-van-quy-ft-xam.eJ4UnTgbMGlM.html",
          "lyric": "https://lrc-nct.nixcdn.com/2021/03/08/5/c/4/b/1615218817951.lrc",
          "bgImage": "",
          "avatar": "https://avatar-ex-swe.nixcdn.com/song/2021/01/07/6/a/b/e/1610006675703.jpg",
          "coverImage": "https://avatar-ex-swe.nixcdn.com/playlist/2021/05/04/3/b/6/d/1620100988545_500.jpg"
        },
        {
          "title": "Răng Khôn",
          "creator": "Phí Phương Anh, RIN9",
          "music": "https://aredir.nixcdn.com/NhacCuaTui1014/RangKhon-PhiPhuongAnhTheFaceRIN9-7006388.mp3?st=cMZfqAU5xCtBm6aqqBrmHw&e=1627419277",
          "url": "https://www.nhaccuatui.com/bai-hat/rang-khon-phi-phuong-anh-ft-rin9.DS5NwsGBlUhU.html",
          "lyric": "https://lrc-nct.nixcdn.com/2021/04/26/e/3/9/0/1619429354101.lrc",
          "bgImage": "https://avatar-ex-swe.nixcdn.com/singer/avatar/2021/05/24/8/d/6/e/1621842906046_600.jpg",
          "avatar": "https://avatar-ex-swe.nixcdn.com/song/2021/04/19/d/1/f/1/1618810475930.jpg",
          "coverImage": "https://avatar-ex-swe.nixcdn.com/playlist/2021/05/04/3/b/6/d/1620100988545_500.jpg"
        },
        {
          "title": "có hẹn với thanh xuân",
          "creator": "MONSTAR",
          "music": "https://f9-stream.nixcdn.com/NhacCuaTui1018/CoHenVoiThanhXuan-MONSTAR-7050201.mp3?st=iFQ-1hUDsED4cVBIbpF_WQ&e=1627419277",
          "url": "https://www.nhaccuatui.com/bai-hat/co-hen-voi-thanh-xuan-monstar.B1Q3wlGhldTr.html",
          "lyric": "https://lrc-nct.nixcdn.com/2021/07/21/3/f/6/7/1626836197994.lrc",
          "bgImage": "https://avatar-ex-swe.nixcdn.com/singer/avatar/2017/12/11/d/e/b/9/1512984325191_600.jpg",
          "avatar": "https://avatar-ex-swe.nixcdn.com/song/2021/07/16/f/4/9/8/1626425507034.jpg",
          "coverImage": "https://avatar-ex-swe.nixcdn.com/playlist/2021/05/04/3/b/6/d/1620100988545_500.jpg"
        },
        {
          "title": "Em Không Hiểu",
          "creator": "Changg, Minh Huy",
          "music": "https://f9-stream.nixcdn.com/NhacCuaTui1017/EmKhongHieu-ChanggMinhHuy-7043556.mp3?st=NyJoM6BH-XfD421Rlr4j8Q&e=1627419277",
          "url": "https://www.nhaccuatui.com/bai-hat/em-khong-hieu-changg-ft-minh-huy.gWRtS5SiJInk.html",
          "lyric": "https://lrc-nct.nixcdn.com/null",
          "bgImage": "https://avatar-ex-swe.nixcdn.com/singer/avatar/2021/07/26/9/b/a/a/1627272571398_600.jpg",
          "avatar": "https://avatar-ex-swe.nixcdn.com/song/2021/07/06/7/a/3/0/1625546620298.jpg",
          "coverImage": "https://avatar-ex-swe.nixcdn.com/playlist/2021/05/04/3/b/6/d/1620100988545_500.jpg"
        },
        {
          "title": "Đường Tôi Chở Em Về",
          "creator": "Bùi Trường Linh",
          "music": "https://aredir.nixcdn.com/Unv_Audio164/DuongTaChoEmVe-buitruonglinh-6318765.mp3?st=VDjIfLuRkE4F9wa76MuYeA&e=1627419277",
          "url": "https://www.nhaccuatui.com/bai-hat/duong-toi-cho-em-ve-bui-truong-linh.EEZTcFO2Ajfc.html",
          "lyric": "https://lrc-nct.nixcdn.com/2020/08/25/d/a/e/d/1598338850508.lrc",
          "bgImage": "https://avatar-ex-swe.nixcdn.com/singer/avatar/2020/11/16/6/5/0/2/1605520530526_600.jpg",
          "avatar": "https://avatar-ex-swe.nixcdn.com/song/2020/07/02/5/d/c/9/1593687560557.jpg",
          "coverImage": "https://avatar-ex-swe.nixcdn.com/playlist/2021/05/04/3/b/6/d/1620100988545_500.jpg"
        },
        {
          "title": "Thích Em Hơi Nhiều",
          "creator": "Wren Evans",
          "music": "https://aredir.nixcdn.com/Unv_Audio198/ThichEmHoiNhieu-WrenEvans-7034969.mp3?st=Y-fR3T-9SN0NlLA8Wb3avA&e=1627419277",
          "url": "https://www.nhaccuatui.com/bai-hat/thich-em-hoi-nhieu-wren-evans.kUOJILsq8CmU.html",
          "lyric": "https://lrc-nct.nixcdn.com/null",
          "bgImage": "https://avatar-ex-swe.nixcdn.com/singer/avatar/2021/06/28/b/2/0/9/1624860911842_600.jpg",
          "avatar": "https://avatar-ex-swe.nixcdn.com/song/2021/06/18/d/c/e/c/1623997610871.jpg",
          "coverImage": "https://avatar-ex-swe.nixcdn.com/playlist/2021/05/04/3/b/6/d/1620100988545_500.jpg"
        },
        {
          "title": "Đường Tôi Chở Em Về (Lofi Version)",
          "creator": "Bùi Trường Linh, Freak D",
          "music": "https://f9-stream.nixcdn.com/NhacCuaTui1017/DuongToiChoEmVeLofiVersion-buitruonglinhFreakD-7025960.mp3?st=8c9IE_s4n5YYR0Lz0EubnA&e=1627419277",
          "url": "https://www.nhaccuatui.com/bai-hat/duong-toi-cho-em-ve-lofi-version-bui-truong-linh-ft-freak-d.cNZNdDIbq1va.html",
          "lyric": "https://lrc-nct.nixcdn.com/null",
          "bgImage": "https://avatar-ex-swe.nixcdn.com/singer/avatar/2020/11/16/6/5/0/2/1605520530526_600.jpg",
          "avatar": "https://avatar-ex-swe.nixcdn.com/song/2021/06/25/e/6/6/d/1624587056202.jpg",
          "coverImage": "https://avatar-ex-swe.nixcdn.com/playlist/2021/05/04/3/b/6/d/1620100988545_500.jpg"
        },
        {
          "title": "Quên Một Người Thật Khó",
          "creator": "Cao Nam Thành",
          "music": "https://f9-stream.nixcdn.com/NhacCuaTui1018/QuenNguoiThatKho-CaoNamThanh-7050259.mp3?st=lNreE7MzbZofhzJEh7joQQ&e=1627419277",
          "url": "https://www.nhaccuatui.com/bai-hat/quen-mot-nguoi-that-kho-cao-nam-thanh.TEMZmuxmGtKT.html",
          "lyric": "https://lrc-nct.nixcdn.com/2021/07/21/3/f/6/7/1626835590933.lrc",
          "bgImage": "https://avatar-ex-swe.nixcdn.com/singer/avatar/2017/11/19/8/9/b/3/1511100269341_600.jpg",
          "avatar": "https://avatar-ex-swe.nixcdn.com/song/2021/07/16/f/4/9/8/1626430957411.jpg",
          "coverImage": "https://avatar-ex-swe.nixcdn.com/playlist/2021/05/04/3/b/6/d/1620100988545_500.jpg"
        },
        {
          "title": "Đắm",
          "creator": "Xesi, Ricky Star",
          "music": "https://f9-stream.nixcdn.com/NhacCuaTui1017/Dam-XesiRickyStar-7043873.mp3?st=MnTCk3hWADuJYYra3IrR8g&e=1627419277",
          "url": "https://www.nhaccuatui.com/bai-hat/dam-xesi-ft-ricky-star.5CpnEWPAF1G9.html",
          "lyric": "https://lrc-nct.nixcdn.com/null",
          "bgImage": "https://avatar-ex-swe.nixcdn.com/singer/avatar/2021/07/26/9/b/a/a/1627294510993_600.jpg",
          "avatar": "https://avatar-ex-swe.nixcdn.com/song/2021/07/06/7/a/3/0/1625565778156.jpg",
          "coverImage": "https://avatar-ex-swe.nixcdn.com/playlist/2021/05/04/3/b/6/d/1620100988545_500.jpg"
        },
        {
          "title": "Hẹn Kiếp Sau",
          "creator": "Khả Hiệp",
          "music": "https://aredir.nixcdn.com/NhacCuaTui1015/HenKiepSau-KhaHiep-7017276.mp3?st=SpNiSUjBYB3UHYN6ePvsMQ&e=1627419277",
          "url": "https://www.nhaccuatui.com/bai-hat/hen-kiep-sau-kha-hiep.AkLN9TJJ07Qy.html",
          "lyric": "https://lrc-nct.nixcdn.com/null",
          "bgImage": "",
          "avatar": "https://avatar-ex-swe.nixcdn.com/song/2021/05/10/d/4/2/9/1620640028319.jpg",
          "coverImage": "https://avatar-ex-swe.nixcdn.com/playlist/2021/05/04/3/b/6/d/1620100988545_500.jpg"
        },
        {
          "title": "Duyên Ta Chỉ Đây Thôi",
          "creator": "Phát Huy T4, Truzg",
          "music": "https://f9-stream.nixcdn.com/NhacCuaTui1018/DuyenTaChiDayThoi-PhatHuyT4Truzg-7047068.mp3?st=uI8W1kzRfQzpJtmE_higQg&e=1627419277",
          "url": "https://www.nhaccuatui.com/bai-hat/duyen-ta-chi-day-thoi-phat-huy-t4-ft-truzg.5wKjmGA4mVJ9.html",
          "lyric": "",
          "bgImage": "https://avatar-ex-swe.nixcdn.com/singer/avatar/2021/04/14/b/9/8/b/1618374024681_600.jpg",
          "avatar": "https://avatar-ex-swe.nixcdn.com/song/2021/07/12/9/2/b/6/1626064878497.jpg",
          "coverImage": "https://avatar-ex-swe.nixcdn.com/playlist/2021/05/04/3/b/6/d/1620100988545_500.jpg"
        },
        {
          "title": "Đoạn Tuyệt Nàng Đi",
          "creator": "Phát Huy T4",
          "music": "https://f9-stream.nixcdn.com/NhacCuaTui1017/DoanTuyetNangDi-PhatHuyT4-7034809.mp3?st=7xUFJrzMoz0C5C1-6oY9fA&e=1627419277",
          "url": "https://www.nhaccuatui.com/bai-hat/doan-tuyet-nang-di-phat-huy-t4.lHUnJ1XUAD3U.html",
          "lyric": "https://lrc-nct.nixcdn.com/null",
          "bgImage": "https://avatar-ex-swe.nixcdn.com/singer/avatar/2021/04/14/b/9/8/b/1618374024681_600.jpg",
          "avatar": "https://avatar-ex-swe.nixcdn.com/singer/avatar/2021/04/14/b/9/8/b/1618374024681.jpg",
          "coverImage": "https://avatar-ex-swe.nixcdn.com/playlist/2021/05/04/3/b/6/d/1620100988545_500.jpg"
        },
        {
          "title": "Sài Gòn Hôm Nay Mưa (Lofi Rain Version)",
          "creator": "JSOL, Hoàng Duyên",
          "music": "https://f9-stream.nixcdn.com/NhacCuaTui1017/SaiGonHomNayMuaLofiRainVersion-JSOLHoangDuyen-7034696.mp3?st=pCznURUbxIw7rwQYhJuL5Q&e=1627419277",
          "url": "https://www.nhaccuatui.com/bai-hat/sai-gon-hom-nay-mua-lofi-rain-version-jsol-ft-hoang-duyen.z04Ln7C2xsNK.html",
          "lyric": "https://lrc-nct.nixcdn.com/2021/06/25/b/9/1/5/1624589446608.lrc",
          "bgImage": "https://avatar-ex-swe.nixcdn.com/singer/avatar/2021/06/29/3/c/a/6/1624943867794_600.jpg",
          "avatar": "https://avatar-ex-swe.nixcdn.com/song/2021/06/17/f/b/d/5/1623919466016.jpg",
          "coverImage": "https://avatar-ex-swe.nixcdn.com/playlist/2021/05/04/3/b/6/d/1620100988545_500.jpg"
        },
        {
          "title": "Hoa Nở Vô Thường",
          "creator": "Hoài Lâm",
          "music": "https://f9-stream.nixcdn.com/NhacCuaTui1017/HoaNoVoThuong-HoaiLam-7035558.mp3?st=NW62nMi0B_dX5x50LCJ4lQ&e=1627419277",
          "url": "https://www.nhaccuatui.com/bai-hat/hoa-no-vo-thuong-hoai-lam.9Qf7HEN8EL49.html",
          "lyric": "https://lrc-nct.nixcdn.com/null",
          "bgImage": "https://avatar-ex-swe.nixcdn.com/singer/avatar/2020/05/27/6/9/5/0/1590568952971_600.jpg",
          "avatar": "https://avatar-ex-swe.nixcdn.com/song/2021/06/18/d/c/e/c/1624002360534.jpg",
          "coverImage": "https://avatar-ex-swe.nixcdn.com/playlist/2021/05/04/3/b/6/d/1620100988545_500.jpg"
        },
        {
          "title": "Tình Yêu Ngủ Quên (Chill Version)",
          "creator": "Hoàng Tôn, LyHan",
          "music": "https://aredir.nixcdn.com/NhacCuaTui1016/TinhYeuNguQuen-HoangTonLyhan-7030537.mp3?st=ayN4NzriSBCCyIzPJGQowQ&e=1627419277",
          "url": "https://www.nhaccuatui.com/bai-hat/tinh-yeu-ngu-quen-chill-version-hoang-ton-ft-lyhan.z5k1RIhZ3M4D.html",
          "lyric": "https://lrc-nct.nixcdn.com/2021/07/22/0/e/4/1/1626917247673.lrc",
          "bgImage": "https://avatar-ex-swe.nixcdn.com/singer/avatar/2019/07/22/f/e/a/2/1563760304939_600.jpg",
          "avatar": "https://avatar-ex-swe.nixcdn.com/song/2021/06/09/b/d/a/0/1623234668765.jpg",
          "coverImage": "https://avatar-ex-swe.nixcdn.com/playlist/2021/05/04/3/b/6/d/1620100988545_500.jpg"
        },
        {
          "title": "Chim Quý Trong Lồng",
          "creator": "K-ICM, Văn Mai Hương",
          "music": "https://f9-stream.nixcdn.com/NhacCuaTui1018/ChimQuyTrongLong-KICMVanMaiHuong-7047049.mp3?st=MI-OquhUziWESlg7IUCLOg&e=1627419277",
          "url": "https://www.nhaccuatui.com/bai-hat/chim-quy-trong-long-k-icm-ft-van-mai-huong.Rp6ENa9ygb2o.html",
          "lyric": "https://lrc-nct.nixcdn.com/2021/07/22/0/e/4/1/1626925523257.lrc",
          "bgImage": "https://avatar-ex-swe.nixcdn.com/singer/avatar/2020/07/22/f/1/f/9/1595389705018_600.jpg",
          "avatar": "https://avatar-ex-swe.nixcdn.com/song/2021/07/12/9/2/b/6/1626061290085.jpg",
          "coverImage": "https://avatar-ex-swe.nixcdn.com/playlist/2021/05/04/3/b/6/d/1620100988545_500.jpg"
        },
        {
          "title": "Cầu Vồng Khuyết",
          "creator": "Tuấn Hưng",
          "music": "https://aredir.nixcdn.com/Singer_Audio5/CauVongKhuyet-TuanHung-2557205.mp3?st=RjvbhQW-M0qAX7UBEbgKEg&e=1627419277",
          "url": "https://www.nhaccuatui.com/bai-hat/cau-vong-khuyet-tuan-hung.hh8YUwYLhJO2.html",
          "lyric": "https://lrc-nct.nixcdn.com/2019/04/14/6/b/d/7/1555243499235.lrc",
          "bgImage": "https://avatar-ex-swe.nixcdn.com/singer/avatar/2017/08/28/1/a/1/b/1503913422094_600.jpg",
          "avatar": "https://avatar-ex-swe.nixcdn.com/singer/avatar/2017/08/28/1/a/1/b/1503913422094.jpg",
          "coverImage": "https://avatar-ex-swe.nixcdn.com/playlist/2021/05/04/3/b/6/d/1620100988545_500.jpg"
        },
        {
          "title": "Sài Gòn Hôm Nay Mưa (Lofi Version)",
          "creator": "JSOL, Hoàng Duyên, 1 9 6 7",
          "music": "https://f9-stream.nixcdn.com/NhacCuaTui1017/SaiGonHomNayMuaLofiVersion-JSOLHoangDuyen1967-7034643.mp3?st=ydUl1A_VBI-5WC2FYHAO0w&e=1627419277",
          "url": "https://www.nhaccuatui.com/bai-hat/sai-gon-hom-nay-mua-lofi-version-jsol-ft-hoang-duyen-ft-1-9-6-7.NG5fVJ5qMlmE.html",
          "lyric": "https://lrc-nct.nixcdn.com/2021/06/25/b/9/1/5/1624591097589.lrc",
          "bgImage": "https://avatar-ex-swe.nixcdn.com/singer/avatar/2021/06/29/3/c/a/6/1624943867794_600.jpg",
          "avatar": "https://avatar-ex-swe.nixcdn.com/singer/avatar/2021/06/29/3/c/a/6/1624943867794.jpg",
          "coverImage": "https://avatar-ex-swe.nixcdn.com/playlist/2021/05/04/3/b/6/d/1620100988545_500.jpg"
        },
        {
          "title": "Biệt Phủ",
          "creator": "VP Bá Vương, TDK",
          "music": "https://f9-stream.nixcdn.com/NhacCuaTui1018/BietPhu-VPBaVuongTDK-7051311.mp3?st=QL-0ip6q7Tu3ZRPWYukpSQ&e=1627419277",
          "url": "https://www.nhaccuatui.com/bai-hat/biet-phu-vp-ba-vuong-ft-tdk.Kw7w0JLGfLWW.html",
          "lyric": "https://lrc-nct.nixcdn.com/null",
          "bgImage": "https://avatar-ex-swe.nixcdn.com/singer/avatar/2020/05/25/e/4/6/f/1590405023576_600.jpg",
          "avatar": "https://avatar-ex-swe.nixcdn.com/song/2021/07/19/5/f/7/4/1626684705691.jpg",
          "coverImage": "https://avatar-ex-swe.nixcdn.com/playlist/2021/05/04/3/b/6/d/1620100988545_500.jpg"
        },
        {
          "title": "Đừng Hẹn Kiếp Sau",
          "creator": "Đình Dũng, ACV",
          "music": "https://aredir.nixcdn.com/NhacCuaTui1015/DungHenKiepSau1-DinhDungACV-7010665.mp3?st=nu7eVE6IwMn4zVffQjiHeA&e=1627419277",
          "url": "https://www.nhaccuatui.com/bai-hat/dung-hen-kiep-sau-dinh-dung-ft-acv.EYUPzP2H8ChP.html",
          "lyric": "https://lrc-nct.nixcdn.com/2021/05/09/1/6/7/d/1620535411947.lrc",
          "bgImage": "https://avatar-ex-swe.nixcdn.com/singer/avatar/2020/09/22/5/3/5/d/1600744344048_600.jpg",
          "avatar": "https://avatar-ex-swe.nixcdn.com/song/2021/04/27/f/2/1/d/1619515696259.jpg",
          "coverImage": "https://avatar-ex-swe.nixcdn.com/playlist/2021/05/04/3/b/6/d/1620100988545_500.jpg"
        },
        {
          "title": "Độc Thân",
          "creator": "JSOL",
          "music": "https://f9-stream.nixcdn.com/Unv_Audio199/DocThan-JSOL-7045817.mp3?st=P-4xuwMFmgvSS25xthM_Rg&e=1627419277",
          "url": "https://www.nhaccuatui.com/bai-hat/doc-than-jsol.FIlHxVoxvPpb.html",
          "lyric": "https://lrc-nct.nixcdn.com/null",
          "bgImage": "https://avatar-ex-swe.nixcdn.com/singer/avatar/2021/06/29/3/c/a/6/1624943867794_600.jpg",
          "avatar": "https://avatar-ex-swe.nixcdn.com/song/2021/07/21/7/0/f/8/1626837420075.jpg",
          "coverImage": "https://avatar-ex-swe.nixcdn.com/playlist/2021/05/04/3/b/6/d/1620100988545_500.jpg"
        },
        {
          "title": "Hồng Trần Vương Sầu Cay",
          "creator": "Huy Vạc",
          "music": "https://f9-stream.nixcdn.com/NhacCuaTui1017/HongTranVuongSauCay-HuyVac-7036434.mp3?st=tlsJYAHhpRmXkZNmRBFPRg&e=1627419277",
          "url": "https://www.nhaccuatui.com/bai-hat/hong-tran-vuong-sau-cay-huy-vac.a1Sz2F9FKpkO.html",
          "lyric": "https://lrc-nct.nixcdn.com/null",
          "bgImage": "https://avatar-ex-swe.nixcdn.com/singer/avatar/2020/02/27/f/2/1/c/1582798501233_600.jpg",
          "avatar": "https://avatar-ex-swe.nixcdn.com/song/2021/06/22/0/3/e/7/1624342801342.jpg",
          "coverImage": "https://avatar-ex-swe.nixcdn.com/playlist/2021/05/04/3/b/6/d/1620100988545_500.jpg"
        },
        {
          "title": "Người Còn Thương Ta",
          "creator": "Phát Hồ",
          "music": "https://aredir.nixcdn.com/NhacCuaTui1016/NguoiConThuongTa-X2X-7030713.mp3?st=DckdFK2jXD4yjri1tSI7qg&e=1627419277",
          "url": "https://www.nhaccuatui.com/bai-hat/nguoi-con-thuong-ta-phat-ho.oa8Sc8ZzPbnD.html",
          "lyric": "https://lrc-nct.nixcdn.com/null",
          "bgImage": "https://avatar-ex-swe.nixcdn.com/singer/avatar/2021/04/06/c/6/7/6/1617694258591_600.jpg",
          "avatar": "https://avatar-ex-swe.nixcdn.com/song/2021/06/08/7/c/1/b/1623138395417.jpg",
          "coverImage": "https://avatar-ex-swe.nixcdn.com/playlist/2021/05/04/3/b/6/d/1620100988545_500.jpg"
        },
        {
          "title": "Gặp Nhau Bên Nhau Là Ý Trời",
          "creator": "Wind",
          "music": "https://f9-stream.nixcdn.com/NhacCuaTui1017/GapNhauBenNhauLaYTroi-Wind-7037709.mp3?st=Sm_VD35uwajnXn-S7OBQIg&e=1627419277",
          "url": "https://www.nhaccuatui.com/bai-hat/gap-nhau-ben-nhau-la-y-troi-wind.jUYyDGaks4QR.html",
          "lyric": "https://lrc-nct.nixcdn.com/null",
          "bgImage": "https://avatar-ex-swe.nixcdn.com/singer/avatar/2020/10/26/2/3/a/b/1603702784979_600.jpg",
          "avatar": "https://avatar-ex-swe.nixcdn.com/song/2021/06/26/c/6/8/0/1624703507463.jpg",
          "coverImage": "https://avatar-ex-swe.nixcdn.com/playlist/2021/05/04/3/b/6/d/1620100988545_500.jpg"
        },
        {
          "title": "Danh Phận",
          "creator": "Jang Mi",
          "music": "https://f9-stream.nixcdn.com/NhacCuaTui1017/DanhPhan-JangMi-7040679.mp3?st=zr8pMhP0G20BWmAvF1Jfyw&e=1627419277",
          "url": "https://www.nhaccuatui.com/bai-hat/danh-phan-jang-mi.eKLIGmTuae4Y.html",
          "lyric": "https://lrc-nct.nixcdn.com/2021/07/23/f/5/5/8/1627005931336.lrc",
          "bgImage": "https://avatar-ex-swe.nixcdn.com/singer/avatar/2021/02/25/0/a/4/a/1614246198439_600.jpg",
          "avatar": "https://avatar-ex-swe.nixcdn.com/song/2021/06/30/7/5/6/a/1625044639680.jpg",
          "coverImage": "https://avatar-ex-swe.nixcdn.com/playlist/2021/05/04/3/b/6/d/1620100988545_500.jpg"
        },
        {
          "title": "Tình Bạn Diệu Kỳ",
          "creator": "Ricky Star, Lăng LD, AMee",
          "music": "https://aredir.nixcdn.com/NhacCuaTui1010/TinhBanDieuKy-AMeeRickyStarLangLD-6927558.mp3?st=jP4AJZGXFqH2C2FNgWKY5w&e=1627419277",
          "url": "https://www.nhaccuatui.com/bai-hat/tinh-ban-dieu-ky-ricky-star-ft-lang-ld-ft-amee.SgXWolUyq8Dp.html",
          "lyric": "https://lrc-nct.nixcdn.com/2021/03/08/5/c/4/b/1615219713146.lrc",
          "bgImage": "https://avatar-ex-swe.nixcdn.com/singer/avatar/2021/03/02/2/8/6/4/1614651512512_600.jpg",
          "avatar": "https://avatar-ex-swe.nixcdn.com/song/2021/03/01/7/7/d/0/1614586501997.jpg",
          "coverImage": "https://avatar-ex-swe.nixcdn.com/playlist/2021/05/04/3/b/6/d/1620100988545_500.jpg"
        },
        {
          "title": "Cưới Đi",
          "creator": "2T, ChangC",
          "music": "https://aredir.nixcdn.com/NhacCuaTui1002/CuoiDi-2TChangC-6560962.mp3?st=-oSH3ezQ21MyW7cVb6uueg&e=1627419277",
          "url": "https://www.nhaccuatui.com/bai-hat/cuoi-di-2t-ft-changc.wgpNJZxMdoMX.html",
          "lyric": "https://lrc-nct.nixcdn.com/2020/08/29/8/4/4/2/1598682547095.lrc",
          "bgImage": "https://avatar-ex-swe.nixcdn.com/singer/avatar/2019/12/16/b/e/6/c/1576477671839_600.jpg",
          "avatar": "https://avatar-ex-swe.nixcdn.com/song/2020/08/27/8/e/c/f/1598516178659.jpg",
          "coverImage": "https://avatar-ex-swe.nixcdn.com/playlist/2021/05/04/3/b/6/d/1620100988545_500.jpg"
        },
        {
          "title": "Tâm Tình",
          "creator": "Rum, Chees",
          "music": "https://f9-stream.nixcdn.com/NhacCuaTui1018/TamTinh-RumChees-7051708.mp3?st=UKHZXb5DBwZs20QBV0FjjA&e=1627419277",
          "url": "https://www.nhaccuatui.com/bai-hat/tam-tinh-rum-ft-chees.dnEVj5NBlLZ9.html",
          "lyric": "https://lrc-nct.nixcdn.com/null",
          "bgImage": "https://avatar-ex-swe.nixcdn.com/singer/avatar/2017/11/07/a/0/9/6/1510027835728_600.jpg",
          "avatar": "https://avatar-ex-swe.nixcdn.com/song/2021/07/20/1/4/a/0/1626763537745.jpg",
          "coverImage": "https://avatar-ex-swe.nixcdn.com/playlist/2021/05/04/3/b/6/d/1620100988545_500.jpg"
        },
        {
          "title": "Hoa Nở Không Màu",
          "creator": "Hoài Lâm",
          "music": "https://aredir.nixcdn.com/NhacCuaTui999/HoaNoKhongMau1-HoaiLam-6281704.mp3?st=7uXak9pEpaQCPw4YvmUs5w&e=1627419277",
          "url": "https://www.nhaccuatui.com/bai-hat/hoa-no-khong-mau-hoai-lam.qbK16hjg5TdZ.html",
          "lyric": "https://lrc-nct.nixcdn.com/2021/03/08/5/c/4/b/1615219889085.lrc",
          "bgImage": "https://avatar-ex-swe.nixcdn.com/singer/avatar/2020/05/27/6/9/5/0/1590568952971_600.jpg",
          "avatar": "https://avatar-ex-swe.nixcdn.com/song/2020/05/15/c/f/3/0/1589532035884.jpg",
          "coverImage": "https://avatar-ex-swe.nixcdn.com/playlist/2021/05/04/3/b/6/d/1620100988545_500.jpg"
        },
        {
          "title": "Chẳng Cần Đúng Sai",
          "creator": "Hồ Phong An",
          "music": "https://aredir.nixcdn.com/NhacCuaTui1016/ChangCanDungSai-HoPhongAn-7031684.mp3?st=J3PmEtom3OOd-v1drZRoDQ&e=1627419277",
          "url": "https://www.nhaccuatui.com/bai-hat/chang-can-dung-sai-ho-phong-an.x0McN7rgjNPs.html",
          "lyric": "https://lrc-nct.nixcdn.com/null",
          "bgImage": "https://avatar-ex-swe.nixcdn.com/singer/avatar/2020/10/20/a/0/d/f/1603170387400_600.jpg",
          "avatar": "https://avatar-ex-swe.nixcdn.com/song/2021/06/11/2/b/b/7/1623398022603.jpg",
          "coverImage": "https://avatar-ex-swe.nixcdn.com/playlist/2021/05/04/3/b/6/d/1620100988545_500.jpg"
        },
        {
          "title": "Như Một Cơn Mê",
          "creator": "Gemini Band, Bằng Cường",
          "music": "https://f9-stream.nixcdn.com/NhacCuaTui1017/NhuMotConMe-GeminiBandBangCuong-7032507.mp3?st=O7vEuusiTUtkdr4wPEOhXQ&e=1627419277",
          "url": "https://www.nhaccuatui.com/bai-hat/nhu-mot-con-me-gemini-band-ft-bang-cuong.CzhNhi3Qo7LJ.html",
          "lyric": "https://lrc-nct.nixcdn.com/null",
          "bgImage": "https://avatar-ex-swe.nixcdn.com/singer/avatar/2020/07/13/6/6/2/4/1594610566834_600.jpg",
          "avatar": "https://avatar-ex-swe.nixcdn.com/song/2021/06/15/0/f/0/b/1623735825259.jpg",
          "coverImage": "https://avatar-ex-swe.nixcdn.com/playlist/2021/05/04/3/b/6/d/1620100988545_500.jpg"
        },
        {
          "title": "Yêu Sai Người",
          "creator": "Lý Tuấn Kiệt",
          "music": "https://f9-stream.nixcdn.com/NhacCuaTui1017/YeuSaiNguoi-LyTuanKiet-7037403.mp3?st=rh9S6sebfYlm03eoWfC6lA&e=1627419277",
          "url": "https://www.nhaccuatui.com/bai-hat/yeu-sai-nguoi-ly-tuan-kiet.wWQL1QEnXvBA.html",
          "lyric": "https://lrc-nct.nixcdn.com/2021/07/20/1/0/0/2/1626747248355.lrc",
          "bgImage": "https://avatar-ex-swe.nixcdn.com/singer/avatar/2016/10/19/1/5/d/e/1476865750236_600.jpg",
          "avatar": "https://avatar-ex-swe.nixcdn.com/song/2021/06/25/e/6/6/d/1624609387941.jpg",
          "coverImage": "https://avatar-ex-swe.nixcdn.com/playlist/2021/05/04/3/b/6/d/1620100988545_500.jpg"
        },
        {
          "title": "Đi Qua Thanh Xuân",
          "creator": "NIT, Sing, Huyền Trang Lux",
          "music": "https://f9-stream.nixcdn.com/NhacCuaTui1017/DiQuaThanhXuan-NITSingHuyenTrangLux-7034469.mp3?st=ipV0athQ3BRIEWM_N_skpQ&e=1627419277",
          "url": "https://www.nhaccuatui.com/bai-hat/di-qua-thanh-xuan-nit-ft-sing-ft-huyen-trang-lux.XHd8KZ5kOgK0.html",
          "lyric": "",
          "bgImage": "https://avatar-ex-swe.nixcdn.com/singer/avatar/2018/04/19/0/c/1/d/1524133449013_600.jpg",
          "avatar": "https://avatar-ex-swe.nixcdn.com/song/2021/06/16/1/a/6/3/1623837559949.jpg",
          "coverImage": "https://avatar-ex-swe.nixcdn.com/playlist/2021/05/04/3/b/6/d/1620100988545_500.jpg"
        },
        {
          "title": "Chắc Họ Có Thương Em",
          "creator": "Kiun Gia Tuấn",
          "music": "https://f9-stream.nixcdn.com/NhacCuaTui1017/ChacHoCoThuongEm-KiunGiaTuan-7038201.mp3?st=bKqiScIr9vZI1d2Uw-CflA&e=1627419277",
          "url": "https://www.nhaccuatui.com/bai-hat/chac-ho-co-thuong-em-kiun-gia-tuan.t0MMhX3bZPuJ.html",
          "lyric": "https://lrc-nct.nixcdn.com/2021/07/20/1/0/0/2/1626747309650.lrc",
          "bgImage": "https://avatar-ex-swe.nixcdn.com/singer/avatar/2020/10/20/a/0/d/f/1603169187914_600.jpg",
          "avatar": "https://avatar-ex-swe.nixcdn.com/song/2021/06/28/8/4/3/c/1624854982856.jpg",
          "coverImage": "https://avatar-ex-swe.nixcdn.com/playlist/2021/05/04/3/b/6/d/1620100988545_500.jpg"
        },
        {
          "title": "Em Là Hoa Có Gai",
          "creator": "Phương Anh, Thằng Bờm",
          "music": "https://f9-stream.nixcdn.com/NhacCuaTui1017/EmLaHoaCoGai-PhuongAnhIdol-7034384.mp3?st=3UNyJmCmX5c4T1hPNxEqaQ&e=1627419277",
          "url": "https://www.nhaccuatui.com/bai-hat/em-la-hoa-co-gai-phuong-anh-ft-thang-bom.7EnAhjUvqIVf.html",
          "lyric": "https://lrc-nct.nixcdn.com/null",
          "bgImage": "https://avatar-ex-swe.nixcdn.com/singer/avatar/2019/07/05/5/8/b/f/1562300922090_600.jpg",
          "avatar": "https://avatar-ex-swe.nixcdn.com/song/2021/06/16/1/a/6/3/1623822616413.jpg",
          "coverImage": "https://avatar-ex-swe.nixcdn.com/playlist/2021/05/04/3/b/6/d/1620100988545_500.jpg"
        },
        {
          "title": "Yêu Lại Từ Đầu",
          "creator": "Khắc Việt",
          "music": "https://aredir.nixcdn.com/NhacCuaTui154/YeuLaiTuDau-KhacViet_354qr.mp3?st=4VPhqTNSMSoaFChsLFtuAA&e=1627419277",
          "url": "https://www.nhaccuatui.com/bai-hat/yeu-lai-tu-dau-khac-viet.oU0qaWPWljVh.html",
          "lyric": "https://lrc-nct.nixcdn.com/2017/01/17/5/3/4/3/1484643016250.lrc",
          "bgImage": "https://avatar-ex-swe.nixcdn.com/singer/avatar/2020/05/27/6/9/5/0/1590565041302_600.jpg",
          "avatar": "https://avatar-ex-swe.nixcdn.com/song/2019/09/12/c/9/7/4/1568255951832.jpg",
          "coverImage": "https://avatar-ex-swe.nixcdn.com/playlist/2021/05/04/3/b/6/d/1620100988545_500.jpg"
        },
        {
          "title": "Hãy Cho Anh Biết",
          "creator": "Phúc Bồ, Tsix Rapper",
          "music": "https://f9-stream.nixcdn.com/NhacCuaTui1017/HayChoAnhBiet-PhucBoTsixRapper-7036119.mp3?st=bxbfsiIEHJqB9rjn6EZpJA&e=1627419277",
          "url": "https://www.nhaccuatui.com/bai-hat/hay-cho-anh-biet-phuc-bo-ft-tsix-rapper.KUBcvAtil4QD.html",
          "lyric": "",
          "bgImage": "https://avatar-ex-swe.nixcdn.com/singer/avatar/2016/10/17/4/2/a/d/1476698339496_600.jpg",
          "avatar": "https://avatar-ex-swe.nixcdn.com/song/2021/06/21/f/8/4/8/1624257222968.jpg",
          "coverImage": "https://avatar-ex-swe.nixcdn.com/playlist/2021/05/04/3/b/6/d/1620100988545_500.jpg"
        },
        {
          "title": "Đố Anh Đoán Được",
          "creator": "Bích Phương, 1989s Entertainment",
          "music": "https://aredir.nixcdn.com/NhacCuaTui1016/DoAnhDoanDuoc-BichPhuong1989sEntertainment-7024661.mp3?st=1OkQPYTjHqcDZhs5rg52gA&e=1627419277",
          "url": "https://www.nhaccuatui.com/bai-hat/do-anh-doan-duoc-bich-phuong-ft-1989s-entertainment.vFSEX3eiczQU.html",
          "lyric": "https://lrc-nct.nixcdn.com/2021/07/21/3/f/6/7/1626830355218.lrc",
          "bgImage": "https://avatar-ex-swe.nixcdn.com/singer/avatar/2021/06/28/b/2/0/9/1624861449651_600.jpg",
          "avatar": "https://avatar-ex-swe.nixcdn.com/song/2021/05/26/a/4/3/5/1622010601718.jpg",
          "coverImage": "https://avatar-ex-swe.nixcdn.com/playlist/2021/05/04/3/b/6/d/1620100988545_500.jpg"
        },
        {
          "title": "Vì Đâu Anh Rời Xa",
          "creator": "Linh Rin",
          "music": "https://f9-stream.nixcdn.com/NhacCuaTui1017/ViDauAnhRoiXa-LinhRin-7034565.mp3?st=JlVr1XmHI-GoOeJqna8IiQ&e=1627419277",
          "url": "https://www.nhaccuatui.com/bai-hat/vi-dau-anh-roi-xa-linh-rin.R10rNPiQbyKJ.html",
          "lyric": "https://lrc-nct.nixcdn.com/null",
          "bgImage": "https://avatar-ex-swe.nixcdn.com/singer/avatar/2020/09/21/e/f/4/b/1600677345904_600.jpg",
          "avatar": "https://avatar-ex-swe.nixcdn.com/song/2021/06/17/f/b/d/5/1623899461943.jpg",
          "coverImage": "https://avatar-ex-swe.nixcdn.com/playlist/2021/05/04/3/b/6/d/1620100988545_500.jpg"
        },
        {
          "title": "Muốn Chill Cùng Em",
          "creator": "T00n, Luke Martins",
          "music": "https://f9-stream.nixcdn.com/NhacCuaTui1017/MuonChillCungEm-T00nLukeMartins-7043869.mp3?st=QOYBdXKR72ppieyXqfsoFg&e=1627419277",
          "url": "https://www.nhaccuatui.com/bai-hat/muon-chill-cung-em-t00n-ft-luke-martins.wfiqi5CWXVTj.html",
          "lyric": "https://lrc-nct.nixcdn.com/null",
          "bgImage": "https://avatar-ex-swe.nixcdn.com/singer/avatar/2020/03/12/6/c/1/d/1583996623331_600.jpg",
          "avatar": "https://avatar-ex-swe.nixcdn.com/song/2021/07/06/7/a/3/0/1625565258049.jpg",
          "coverImage": "https://avatar-ex-swe.nixcdn.com/playlist/2021/05/04/3/b/6/d/1620100988545_500.jpg"
        },
        {
          "title": "Cùng Một Bầu Trời",
          "creator": "Khánh Đơn, Khánh Trung",
          "music": "https://f9-stream.nixcdn.com/NhacCuaTui1017/CungMotBauTroi-KhanhDonKhanhTrung-7043210.mp3?st=6pm5XfZfLevBOmXgkHNmrg&e=1627419277",
          "url": "https://www.nhaccuatui.com/bai-hat/cung-mot-bau-troi-khanh-don-ft-khanh-trung.dHheBZjbHd2k.html",
          "lyric": "https://lrc-nct.nixcdn.com/2021/07/23/f/5/5/8/1627008187261.lrc",
          "bgImage": "https://avatar-ex-swe.nixcdn.com/singer/avatar/2016/01/25/4/1/1/7/1453715818225_600.jpg",
          "avatar": "https://avatar-ex-swe.nixcdn.com/song/2021/07/05/0/4/f/4/1625469284189.jpg",
          "coverImage": "https://avatar-ex-swe.nixcdn.com/playlist/2021/05/04/3/b/6/d/1620100988545_500.jpg"
        },
        {
          "title": "Tội",
          "creator": "Bằng Cường",
          "music": "https://f9-stream.nixcdn.com/NhacCuaTui1018/Toi-BangCuong-7047968.mp3?st=pq0JXgg7u6iRgFgGSm7fDQ&e=1627419277",
          "url": "https://www.nhaccuatui.com/bai-hat/toi-bang-cuong.JPqk1I6WlkrJ.html",
          "lyric": "https://lrc-nct.nixcdn.com/2021/07/22/0/e/4/1/1626922978034.lrc",
          "bgImage": "https://avatar-ex-swe.nixcdn.com/singer/avatar/2020/08/03/3/f/4/5/1596425768647_600.jpg",
          "avatar": "https://avatar-ex-swe.nixcdn.com/song/2021/07/13/d/1/2/3/1626178436077.jpg",
          "coverImage": "https://avatar-ex-swe.nixcdn.com/playlist/2021/05/04/3/b/6/d/1620100988545_500.jpg"
        },
        {
          "title": "Xa Tầm Với",
          "creator": "Hoàng Anh Duy",
          "music": "https://f9-stream.nixcdn.com/NhacCuaTui1017/XaTamVoi-HoangAnhDuy-7038194.mp3?st=eepxDu10_ffRG4Bc1KsnkA&e=1627419277",
          "url": "https://www.nhaccuatui.com/bai-hat/xa-tam-voi-hoang-anh-duy.IiMT8iZeXVDo.html",
          "lyric": "https://lrc-nct.nixcdn.com/2021/07/08/6/e/d/5/1625717261799.lrc",
          "bgImage": "https://avatar-ex-swe.nixcdn.com/singer/avatar/2020/06/03/d/4/e/5/1591169993485_600.jpg",
          "avatar": "https://avatar-ex-swe.nixcdn.com/song/2021/06/28/8/4/3/c/1624853479978.jpg",
          "coverImage": "https://avatar-ex-swe.nixcdn.com/playlist/2021/05/04/3/b/6/d/1620100988545_500.jpg"
        },
        {
          "title": "Cục Đá",
          "creator": "VP Bá Vương, Tài Smile, TDK",
          "music": "https://f9-stream.nixcdn.com/NhacCuaTui1017/CucDa-VPBaVuongTaiSmileTDK-7043876.mp3?st=e4vnxqT74Lc6RACbvP6Vpw&e=1627419277",
          "url": "https://www.nhaccuatui.com/bai-hat/cuc-da-vp-ba-vuong-ft-tai-smile-ft-tdk.b3zoc7PadbtQ.html",
          "lyric": "https://lrc-nct.nixcdn.com/null",
          "bgImage": "https://avatar-ex-swe.nixcdn.com/singer/avatar/2020/05/25/e/4/6/f/1590405023576_600.jpg",
          "avatar": "https://avatar-ex-swe.nixcdn.com/song/2021/07/06/7/a/3/0/1625566041719.jpg",
          "coverImage": "https://avatar-ex-swe.nixcdn.com/playlist/2021/05/04/3/b/6/d/1620100988545_500.jpg"
        },
        {
          "title": "Ở Nhà",
          "creator": "Vicky Nhung",
          "music": "https://f9-stream.nixcdn.com/NhacCuaTui1018/ONha-VickyNhung-7047436.mp3?st=UOxyrm90jx8CkKzWpMBdjw&e=1627419277",
          "url": "https://www.nhaccuatui.com/bai-hat/o-nha-vicky-nhung.FycfoXf6Rkty.html",
          "lyric": "https://lrc-nct.nixcdn.com/2021/07/22/0/e/4/1/1626927323330.lrc",
          "bgImage": "https://avatar-ex-swe.nixcdn.com/singer/avatar/2020/09/09/2/2/4/8/1599620037001_600.jpg",
          "avatar": "https://avatar-ex-swe.nixcdn.com/song/2021/07/12/9/2/b/6/1626081290353.jpg",
          "coverImage": "https://avatar-ex-swe.nixcdn.com/playlist/2021/05/04/3/b/6/d/1620100988545_500.jpg"
        },
        {
          "title": "Gửi Người Anh Yêu 4",
          "creator": "Vương Thiên Tuấn",
          "music": "https://f9-stream.nixcdn.com/NhacCuaTui1018/GuiNguoiAnhYeu4-VuongThienTuan-7050257.mp3?st=o9hNTxXFdvIV-lNc-n8bHg&e=1627419277",
          "url": "https://www.nhaccuatui.com/bai-hat/gui-nguoi-anh-yeu-4-vuong-thien-tuan.IWBazLvcV2hK.html",
          "lyric": "",
          "bgImage": "https://avatar-ex-swe.nixcdn.com/singer/avatar/2020/09/23/a/b/d/4/1600843668444_600.jpg",
          "avatar": "https://avatar-ex-swe.nixcdn.com/song/2021/07/16/f/4/9/8/1626430808037.jpg",
          "coverImage": "https://avatar-ex-swe.nixcdn.com/playlist/2021/05/04/3/b/6/d/1620100988545_500.jpg"
        },
        {
          "title": "Tháng Năm (Special Performance)",
          "creator": "Soobin Hoàng Sơn, SlimV",
          "music": "https://aredir.nixcdn.com/NhacCuaTui1016/ThangNamSpecialPerformance-SoobinHoangSonSlimV-7020121.mp3?st=cI192QGohwmJLcuz2PGKjA&e=1627419277",
          "url": "https://www.nhaccuatui.com/bai-hat/thang-nam-special-performance-soobin-hoang-son-ft-slimv.IwPyhctfVIP7.html",
          "lyric": "https://lrc-nct.nixcdn.com/null",
          "bgImage": "https://avatar-ex-swe.nixcdn.com/singer/avatar/2019/09/05/d/9/5/e/1567670108816_600.jpg",
          "avatar": "https://avatar-ex-swe.nixcdn.com/singer/avatar/2019/09/05/d/9/5/e/1567670108816.jpg",
          "coverImage": "https://avatar-ex-swe.nixcdn.com/playlist/2021/05/04/3/b/6/d/1620100988545_500.jpg"
        },
        {
          "title": "Tự Buông",
          "creator": "Lý Tuấn Kiệt",
          "music": "https://f9-stream.nixcdn.com/NhacCuaTui1018/TuBuong-LyTuanKiet-7047729.mp3?st=YghSAJZjYC1KYwpfx9DblQ&e=1627419277",
          "url": "https://www.nhaccuatui.com/bai-hat/tu-buong-ly-tuan-kiet.LlQKmAHE9FyV.html",
          "lyric": "https://lrc-nct.nixcdn.com/2021/07/22/0/e/4/1/1626923287153.lrc",
          "bgImage": "https://avatar-ex-swe.nixcdn.com/singer/avatar/2016/10/19/1/5/d/e/1476865750236_600.jpg",
          "avatar": "https://avatar-ex-swe.nixcdn.com/song/2021/07/13/d/1/2/3/1626149960543.jpg",
          "coverImage": "https://avatar-ex-swe.nixcdn.com/playlist/2021/05/04/3/b/6/d/1620100988545_500.jpg"
        },
        {
          "title": "Cứ Chill Thôi",
          "creator": "Chillies, Suni Hạ Linh, Rhymastic",
          "music": "https://aredir.nixcdn.com/Warner_Audio33/CuChillThoi-ChilliesSuniHaLinhRhymastic-6330366.mp3?st=kH9z1IYfO4-a-rHwm-CG7g&e=1627419277",
          "url": "https://www.nhaccuatui.com/bai-hat/cu-chill-thoi-chillies-ft-suni-ha-linh-ft-rhymastic.I0ZXAn60MifT.html",
          "lyric": "https://lrc-nct.nixcdn.com/2020/08/11/f/c/e/1/1597115627201.lrc",
          "bgImage": "https://avatar-ex-swe.nixcdn.com/singer/avatar/2020/07/22/f/1/f/9/1595414808364_600.jpg",
          "avatar": "https://avatar-ex-swe.nixcdn.com/song/2020/07/13/a/f/7/f/1594611971401.jpg",
          "coverImage": "https://avatar-ex-swe.nixcdn.com/playlist/2021/05/04/3/b/6/d/1620100988545_500.jpg"
        },
        {
          "title": "Hãy Trao Cho Anh",
          "creator": "Sơn Tùng M-TP, Snoop Dogg",
          "music": "https://aredir.nixcdn.com/NhacCuaTui985/HayTraoChoAnh-SonTungMTPSnoopDogg-6010660.mp3?st=uiCYSjlYDCUYA5JQp-2ruQ&e=1627419277",
          "url": "https://www.nhaccuatui.com/bai-hat/hay-trao-cho-anh-son-tung-m-tp-ft-snoop-dogg.vtEybe9NxLw7.html",
          "lyric": "https://lrc-nct.nixcdn.com/2019/07/01/4/3/b/e/1561988730815.lrc",
          "bgImage": "https://avatar-ex-swe.nixcdn.com/singer/avatar/2021/05/12/7/d/c/b/1620802736418_600.jpg",
          "avatar": "https://avatar-ex-swe.nixcdn.com/song/2019/07/03/7/5/b/e/1562137543919.jpg",
          "coverImage": "https://avatar-ex-swe.nixcdn.com/playlist/2021/05/04/3/b/6/d/1620100988545_500.jpg"
        },
        {
          "title": "Dĩ Vãng Cuộc Tình",
          "creator": "Tuấn Hưng",
          "music": "https://aredir.nixcdn.com/NhacCuaTui109/DiVangCuocTinh-TuanHung_r5z4.mp3?st=Flfhp2McA7RN_3ys88L3Cw&e=1627419277",
          "url": "https://www.nhaccuatui.com/bai-hat/di-vang-cuoc-tinh-tuan-hung.10MoSCJhUSdh.html",
          "lyric": "https://lrc-nct.nixcdn.com/2013/12/17/3/e/8/0/1387222307806.lrc",
          "bgImage": "https://avatar-ex-swe.nixcdn.com/singer/avatar/2017/08/28/1/a/1/b/1503913422094_600.jpg",
          "avatar": "https://avatar-ex-swe.nixcdn.com/singer/avatar/2017/08/28/1/a/1/b/1503913422094.jpg",
          "coverImage": "https://avatar-ex-swe.nixcdn.com/playlist/2021/05/04/3/b/6/d/1620100988545_500.jpg"
        },
        {
          "title": "Ta Là Của Nhau",
          "creator": "Đông Nhi, Ông Cao Thắng",
          "music": "https://aredir.nixcdn.com/NhacCuaTui924/TaLaCuaNhau-DongNhiOngCaoThang-4113753.mp3?st=Chi24U25NOpALLq86BmSuw&e=1627419277",
          "url": "https://www.nhaccuatui.com/bai-hat/ta-la-cua-nhau-dong-nhi-ft-ong-cao-thang.L0G5DzIXoFf3.html",
          "lyric": "https://lrc-nct.nixcdn.com/2015/10/08/d/0/7/0/1444269911742.lrc",
          "bgImage": "https://avatar-ex-swe.nixcdn.com/singer/avatar/2018/12/14/f/f/f/e/1544795511047_600.jpg",
          "avatar": "https://avatar-ex-swe.nixcdn.com/song/2019/09/11/6/d/c/4/1568183645028.jpg",
          "coverImage": "https://avatar-ex-swe.nixcdn.com/playlist/2021/05/04/3/b/6/d/1620100988545_500.jpg"
        },
        {
          "title": "Tình Yêu Lung Linh",
          "creator": "Tuấn Hưng",
          "music": "https://aredir.nixcdn.com/NhacCuaTui239/TinhYeuLungLinh-TuanHung_bk.mp3?st=MzfR8OQsXCExiDDSNFnMZw&e=1627419277",
          "url": "https://www.nhaccuatui.com/bai-hat/tinh-yeu-lung-linh-tuan-hung.dskfxTAMZacm.html",
          "lyric": "https://lrc-nct.nixcdn.com/2017/11/03/8/e/e/8/1509683591754.lrc",
          "bgImage": "https://avatar-ex-swe.nixcdn.com/singer/avatar/2017/08/28/1/a/1/b/1503913422094_600.jpg",
          "avatar": "https://avatar-ex-swe.nixcdn.com/singer/avatar/2017/08/28/1/a/1/b/1503913422094.jpg",
          "coverImage": "https://avatar-ex-swe.nixcdn.com/playlist/2021/05/04/3/b/6/d/1620100988545_500.jpg"
        },
        {
          "title": "Cố Giang Tình",
          "creator": "X2X",
          "music": "https://aredir.nixcdn.com/Sony_Audio72/CoGiangTinh-X2X-6257264.mp3?st=bCzN40PcgjVMbCNA49TjjA&e=1627419277",
          "url": "https://www.nhaccuatui.com/bai-hat/co-giang-tinh-x2x.xyWHnC5qxlbd.html",
          "lyric": "https://lrc-nct.nixcdn.com/2020/04/01/a/e/1/1/1585708442390.lrc",
          "bgImage": "https://avatar-ex-swe.nixcdn.com/singer/avatar/2021/03/15/4/7/7/8/1615802750962_600.jpg",
          "avatar": "https://avatar-ex-swe.nixcdn.com/song/2020/03/31/4/6/f/c/1585621945561.jpg",
          "coverImage": "https://avatar-ex-swe.nixcdn.com/playlist/2021/05/04/3/b/6/d/1620100988545_500.jpg"
        },
        {
          "title": "Dễ Đến Dễ Đi",
          "creator": "Quang Hùng MasterD",
          "music": "https://aredir.nixcdn.com/NhacCuaTui1005/DeDenDeDi3-QuangHungMasterD-6791841.mp3?st=QD_7YQESHZA_l8WXOCVxzQ&e=1627419277",
          "url": "https://www.nhaccuatui.com/bai-hat/de-den-de-di-quang-hung-masterd.EOtJ5ddcidNb.html",
          "lyric": "https://lrc-nct.nixcdn.com/2021/03/25/3/b/0/1/1616633924359.lrc",
          "bgImage": "https://avatar-ex-swe.nixcdn.com/singer/avatar/2019/07/30/6/0/5/f/1564481664878_600.jpg",
          "avatar": "https://avatar-ex-swe.nixcdn.com/song/2020/11/01/2/e/b/0/1604211220367.jpg",
          "coverImage": "https://avatar-ex-swe.nixcdn.com/playlist/2021/05/04/3/b/6/d/1620100988545_500.jpg"
        },
        {
          "title": "Điều Ngọt Ngào Nhất",
          "creator": "Cao Thái Sơn",
          "music": "https://aredir.nixcdn.com/Singer_Audio5/DieuNgotNgaoNhat-CaoThaiSon-2449094.mp3?st=oMi4EzqYCGqxVhgtE7qe1g&e=1627419277",
          "url": "https://www.nhaccuatui.com/bai-hat/dieu-ngot-ngao-nhat-cao-thai-son.5mSujbEjmniv.html",
          "lyric": "https://lrc-nct.nixcdn.com/2015/01/15/8/3/f/3/1421288738934.lrc",
          "bgImage": "https://avatar-ex-swe.nixcdn.com/singer/avatar/2017/07/05/a/c/0/f/1499225305436_600.jpg",
          "avatar": "https://avatar-ex-swe.nixcdn.com/singer/avatar/2017/07/05/a/c/0/f/1499225305436.jpg",
          "coverImage": "https://avatar-ex-swe.nixcdn.com/playlist/2021/05/04/3/b/6/d/1620100988545_500.jpg"
        },
        {
          "title": "Mãi Mãi Bên Nhau",
          "creator": "Noo Phước Thịnh",
          "music": "https://aredir.nixcdn.com/Sony_Audio76/MaiMaiBenNhau-NooPhuocThinh-6456927.mp3?st=vvTinNLLpmGC_rPJxmqg-g&e=1627419277",
          "url": "https://www.nhaccuatui.com/bai-hat/mai-mai-ben-nhau-noo-phuoc-thinh.vu4LPajdrOQR.html",
          "lyric": "https://lrc-nct.nixcdn.com/2015/07/21/b/f/c/e/1437461628517.lrc",
          "bgImage": "https://avatar-ex-swe.nixcdn.com/singer/avatar/2020/09/14/0/2/8/0/1600055795446_600.jpg",
          "avatar": "https://avatar-ex-swe.nixcdn.com/song/2019/09/11/6/d/c/4/1568184053333.jpg",
          "coverImage": "https://avatar-ex-swe.nixcdn.com/playlist/2021/05/04/3/b/6/d/1620100988545_500.jpg"
        },
        {
          "title": "Dối Lòng",
          "creator": "Tuấn Hưng",
          "music": "https://aredir.nixcdn.com/NhacCuaTui960/DoiLong-TuanHung-5385147.mp3?st=DOOJQDmWtX09kZ8ORuReOw&e=1627419277",
          "url": "https://www.nhaccuatui.com/bai-hat/doi-long-tuan-hung.R6aEUeQBgIfV.html",
          "lyric": "https://lrc-nct.nixcdn.com/2019/04/22/a/6/2/3/1555913063523.lrc",
          "bgImage": "https://avatar-ex-swe.nixcdn.com/singer/avatar/2017/08/28/1/a/1/b/1503913422094_600.jpg",
          "avatar": "https://avatar-ex-swe.nixcdn.com/singer/avatar/2017/08/28/1/a/1/b/1503913422094.jpg",
          "coverImage": "https://avatar-ex-swe.nixcdn.com/playlist/2021/05/04/3/b/6/d/1620100988545_500.jpg"
        },
        {
          "title": "Tình Anh",
          "creator": "Đình Dũng",
          "music": "https://aredir.nixcdn.com/NhacCuaTui1000/TinhAnh-DinhDung-6286282.mp3?st=ZEf9jxW0AfNLktlmamHSmg&e=1627419277",
          "url": "https://www.nhaccuatui.com/bai-hat/tinh-anh-dinh-dung.25AQhlbrrX8F.html",
          "lyric": "https://lrc-nct.nixcdn.com/2020/10/21/d/2/7/6/1603249244672.lrc",
          "bgImage": "https://avatar-ex-swe.nixcdn.com/singer/avatar/2020/09/22/5/3/5/d/1600744344048_600.jpg",
          "avatar": "https://avatar-ex-swe.nixcdn.com/singer/avatar/2020/09/22/5/3/5/d/1600744344048.jpg",
          "coverImage": "https://avatar-ex-swe.nixcdn.com/playlist/2021/05/04/3/b/6/d/1620100988545_500.jpg"
        },
        {
          "title": "Kẻ Cắp Gặp Bà Già",
          "creator": "Hoàng Thùy Linh, Binz",
          "music": "https://aredir.nixcdn.com/Sony_Audio67/DiamondCutDiamond-HoangThuyLinhBINZ-6153594.mp3?st=egypQn8ICDzO7vGUbW5xVw&e=1627419277",
          "url": "https://www.nhaccuatui.com/bai-hat/ke-cap-gap-ba-gia-hoang-thuy-linh-ft-binz.TiYIAkGdU8ad.html",
          "lyric": "https://lrc-nct.nixcdn.com/2019/10/21/5/4/4/2/1571630367160.lrc",
          "bgImage": "https://avatar-ex-swe.nixcdn.com/singer/avatar/2019/10/23/5/b/0/b/1571802458800_600.jpg",
          "avatar": "https://avatar-ex-swe.nixcdn.com/song/2019/10/18/2/0/b/1/1571381118105.jpg",
          "coverImage": "https://avatar-ex-swe.nixcdn.com/playlist/2021/05/04/3/b/6/d/1620100988545_500.jpg"
        },
        {
          "title": "Laylalay",
          "creator": "Jack - J97",
          "music": "https://aredir.nixcdn.com/NhacCuaTui1014/Laylalay-JackG5R-7003742.mp3?st=mv7hDKux2xx_eguGhV7ScA&e=1627419277",
          "url": "https://www.nhaccuatui.com/bai-hat/laylalay-jack-j97.n8VupC0HXKgY.html",
          "lyric": "https://lrc-nct.nixcdn.com/2021/04/13/6/7/1/3/1618283210428.lrc",
          "bgImage": "https://avatar-ex-swe.nixcdn.com/singer/avatar/2021/04/12/1/1/7/2/1618223507852_600.jpg",
          "avatar": "https://avatar-ex-swe.nixcdn.com/song/2021/04/13/9/7/d/5/1618248252948.jpg",
          "coverImage": "https://avatar-ex-swe.nixcdn.com/playlist/2021/05/04/3/b/6/d/1620100988545_500.jpg"
        },
        {
          "title": "Tình Khúc Vàng",
          "creator": "Đan Trường",
          "music": "https://aredir.nixcdn.com/NhacCuaTui161/TinhKhucVang-DanTruong_36yvf.mp3?st=sumOKi5kqm6DwaVsOJeqwA&e=1627419277",
          "url": "https://www.nhaccuatui.com/bai-hat/tinh-khuc-vang-dan-truong.h2QKRAYBgPwp.html",
          "lyric": "https://lrc-nct.nixcdn.com/2015/03/03/d/8/9/f/1425349859254.lrc",
          "bgImage": "https://avatar-ex-swe.nixcdn.com/singer/avatar/2021/06/28/b/2/0/9/1624874365121_600.jpg",
          "avatar": "https://avatar-ex-swe.nixcdn.com/singer/avatar/2021/06/28/b/2/0/9/1624874365121.jpg",
          "coverImage": "https://avatar-ex-swe.nixcdn.com/playlist/2021/05/04/3/b/6/d/1620100988545_500.jpg"
        },
        {
          "title": "Đoạn Tuyệt Nàng Đi (Lofi Version)",
          "creator": "Phát Huy T4, KProx",
          "music": "https://aredir.nixcdn.com/NhacCuaTui1015/DoanTuyetNangDiLofiVersion-PhatHuyT4KProx-7011827.mp3?st=v__DioeVFf6SURmZZCIsPw&e=1627419277",
          "url": "https://www.nhaccuatui.com/bai-hat/doan-tuyet-nang-di-lofi-version-phat-huy-t4-ft-kprox.BZqxPLSOerxC.html",
          "lyric": "https://lrc-nct.nixcdn.com/null",
          "bgImage": "https://avatar-ex-swe.nixcdn.com/singer/avatar/2021/04/14/b/9/8/b/1618374024681_600.jpg",
          "avatar": "https://avatar-ex-swe.nixcdn.com/singer/avatar/2021/04/14/b/9/8/b/1618374024681.jpg",
          "coverImage": "https://avatar-ex-swe.nixcdn.com/playlist/2021/05/04/3/b/6/d/1620100988545_500.jpg"
        },
        {
          "title": "Gác Lại Âu Lo",
          "creator": "Da LAB, Miu Lê",
          "music": "https://aredir.nixcdn.com/NhacCuaTui1001/GacLaiAuLo-DaLABMiuLe-6360815.mp3?st=uYbaZomyjxoK220-31Xd6Q&e=1627419277",
          "url": "https://www.nhaccuatui.com/bai-hat/gac-lai-au-lo-da-lab-ft-miu-le.1uWWUf6ZAHC4.html",
          "lyric": "https://lrc-nct.nixcdn.com/2020/08/03/1/b/b/4/1596444020821.lrc",
          "bgImage": "https://avatar-ex-swe.nixcdn.com/singer/avatar/2020/08/03/3/f/4/5/1596425146149_600.jpg",
          "avatar": "https://avatar-ex-swe.nixcdn.com/song/2020/07/24/f/6/5/1/1595564868985.jpg",
          "coverImage": "https://avatar-ex-swe.nixcdn.com/playlist/2021/05/04/3/b/6/d/1620100988545_500.jpg"
        },
        {
          "title": "Buồn Làm Chi Em Ơi",
          "creator": "Hoài Lâm",
          "music": "https://aredir.nixcdn.com/NhacCuaTui1000/BuonLamChiEmOi1-HoaiLam-6297318.mp3?st=0c7xsPFLP7Yby1rQ4Ke9iQ&e=1627419277",
          "url": "https://www.nhaccuatui.com/bai-hat/buon-lam-chi-em-oi-hoai-lam.utdMYQZ1ntVp.html",
          "lyric": "https://lrc-nct.nixcdn.com/2020/07/06/0/6/c/e/1594026785668.lrc",
          "bgImage": "https://avatar-ex-swe.nixcdn.com/singer/avatar/2020/05/27/6/9/5/0/1590568952971_600.jpg",
          "avatar": "https://avatar-ex-swe.nixcdn.com/song/2020/06/12/5/b/c/b/1591950830200.jpg",
          "coverImage": "https://avatar-ex-swe.nixcdn.com/playlist/2021/05/04/3/b/6/d/1620100988545_500.jpg"
        },
        {
          "title": "Tháng Mấy Em Nhớ Anh?",
          "creator": "Hà Anh Tuấn",
          "music": "https://aredir.nixcdn.com/NhacCuaTui1014/ThangMayEmNhoAnh-HaAnhTuan-6995531.mp3?st=APox7CtWa2QKz0Cbfyktcg&e=1627419277",
          "url": "https://www.nhaccuatui.com/bai-hat/thang-may-em-nho-anh-ha-anh-tuan.tV4swZ9ekyZS.html",
          "lyric": "https://lrc-nct.nixcdn.com/2021/04/01/8/f/f/4/1617275972934.lrc",
          "bgImage": "https://avatar-ex-swe.nixcdn.com/singer/avatar/2018/06/27/e/8/8/5/1530074198530_600.jpg",
          "avatar": "https://avatar-ex-swe.nixcdn.com/song/2021/04/01/e/2/b/5/1617248289520.jpg",
          "coverImage": "https://avatar-ex-swe.nixcdn.com/playlist/2021/05/04/3/b/6/d/1620100988545_500.jpg"
        },
        {
          "title": "Ngày Tận Thế",
          "creator": "Tóc Tiên, Da LAB, Touliver",
          "music": "https://aredir.nixcdn.com/NhacCuaTui995/NgayTanThe-TocTienDaLABTouliver-6226260.mp3?st=Sh1qDP_WVY3S8aLu8ooGlw&e=1627419277",
          "url": "https://www.nhaccuatui.com/bai-hat/ngay-tan-the-toc-tien-ft-da-lab-ft-touliver.v4le5ZF0dej8.html",
          "lyric": "https://lrc-nct.nixcdn.com/2020/02/24/2/2/4/f/1582507447060.lrc",
          "bgImage": "https://avatar-ex-swe.nixcdn.com/singer/avatar/2020/02/20/a/d/6/4/1582180833496_600.jpg",
          "avatar": "https://avatar-ex-swe.nixcdn.com/song/2020/02/20/2/0/7/e/1582174982811.jpg",
          "coverImage": "https://avatar-ex-swe.nixcdn.com/playlist/2021/05/04/3/b/6/d/1620100988545_500.jpg"
        },
        {
          "title": "Từng Yêu",
          "creator": "Phan Duy Anh",
          "music": "https://aredir.nixcdn.com/NhacCuaTui983/TungYeu-PhanDuyAnh-5989256.mp3?st=TpG7eJvhiCqhk4OHqPrqkQ&e=1627419277",
          "url": "https://www.nhaccuatui.com/bai-hat/tung-yeu-phan-duy-anh.tnvcYCYt7lmv.html",
          "lyric": "https://lrc-nct.nixcdn.com/2019/06/13/a/1/0/5/1560383958108.lrc",
          "bgImage": "https://avatar-ex-swe.nixcdn.com/singer/avatar/2019/08/13/7/d/5/0/1565688488776_600.jpg",
          "avatar": "https://avatar-ex-swe.nixcdn.com/song/2019/07/03/7/5/b/e/1562146897414.jpg",
          "coverImage": "https://avatar-ex-swe.nixcdn.com/playlist/2021/05/04/3/b/6/d/1620100988545_500.jpg"
        },
        {
          "title": "Hiện Đại",
          "creator": "Khắc Việt",
          "music": "https://aredir.nixcdn.com/NhacCuaTui1016/HienDai-KhacViet-7022864.mp3?st=d3hOkEC4kcXjWd2dmZiW5Q&e=1627419277",
          "url": "https://www.nhaccuatui.com/bai-hat/hien-dai-khac-viet.PtjLT1SNRrmn.html",
          "lyric": "https://lrc-nct.nixcdn.com/2021/07/21/3/f/6/7/1626833094099.lrc",
          "bgImage": "https://avatar-ex-swe.nixcdn.com/singer/avatar/2020/05/27/6/9/5/0/1590565041302_600.jpg",
          "avatar": "https://avatar-ex-swe.nixcdn.com/song/2021/05/22/f/1/c/b/1621648577854.jpg",
          "coverImage": "https://avatar-ex-swe.nixcdn.com/playlist/2021/05/04/3/b/6/d/1620100988545_500.jpg"
        },
        {
          "title": "Để Mị Nói Cho Mà Nghe",
          "creator": "Hoàng Thùy Linh",
          "music": "https://aredir.nixcdn.com/Sony_Audio67/DeMiNoiChoMaNghe-HoangThuyLinh-6153588.mp3?st=hTFtDE_pSQpgvhdWy-JbcQ&e=1627419277",
          "url": "https://www.nhaccuatui.com/bai-hat/de-mi-noi-cho-ma-nghe-hoang-thuy-linh.cxycw7eSvV7t.html",
          "lyric": "https://lrc-nct.nixcdn.com/2019/06/24/b/f/7/2/1561363557566.lrc",
          "bgImage": "https://avatar-ex-swe.nixcdn.com/singer/avatar/2019/10/23/5/b/0/b/1571802458800_600.jpg",
          "avatar": "https://avatar-ex-swe.nixcdn.com/song/2019/06/20/5/9/0/b/1560999333698.jpg",
          "coverImage": "https://avatar-ex-swe.nixcdn.com/playlist/2021/05/04/3/b/6/d/1620100988545_500.jpg"
        },
        {
          "title": "3 1 0 7 -2",
          "creator": "Nâu, W/n",
          "music": "https://aredir.nixcdn.com/NhacCuaTui1011/31072-DuonggNauWn-6937818.mp3?st=h91odj68CBHKSaAyt9LacQ&e=1627419277",
          "url": "https://www.nhaccuatui.com/bai-hat/3-1-0-7-2-nau-ft-wn.owBN9o6aAZOe.html",
          "lyric": "https://lrc-nct.nixcdn.com/2021/05/19/f/d/5/c/1621391240674.lrc",
          "bgImage": "https://avatar-ex-swe.nixcdn.com/singer/avatar/2021/04/07/b/5/9/d/1617785585616_600.jpg",
          "avatar": "https://avatar-ex-swe.nixcdn.com/song/2021/02/04/5/a/2/5/1612405167313.jpg",
          "coverImage": "https://avatar-ex-swe.nixcdn.com/playlist/2021/05/04/3/b/6/d/1620100988545_500.jpg"
        },
        {
          "title": "Bỏ Em Vào Balo",
          "creator": "Tân Trần",
          "music": "https://f9-stream.nixcdn.com/NhacCuaTui1017/BoEmVaoBalo-TanTran-7032056.mp3?st=uE_rtVK2ztsFDQFwNBC4KA&e=1627419277",
          "url": "https://www.nhaccuatui.com/bai-hat/bo-em-vao-balo-tan-tran.HJeEJ2jENGBk.html",
          "lyric": "https://lrc-nct.nixcdn.com/null",
          "bgImage": "https://avatar-ex-swe.nixcdn.com/singer/avatar/2018/10/09/2/0/8/a/1539059336207_600.jpg",
          "avatar": "https://avatar-ex-swe.nixcdn.com/singer/avatar/2018/10/09/2/0/8/a/1539059336207.jpg",
          "coverImage": "https://avatar-ex-swe.nixcdn.com/playlist/2021/05/04/3/b/6/d/1620100988545_500.jpg"
        },
        {
          "title": "Chỉ Là Không Cùng Nhau (Live)",
          "creator": "Tăng Phúc, Trương Thảo Nhi",
          "music": "https://aredir.nixcdn.com/NhacCuaTui1014/ChiLaKhongCungNhauLive-TangPhucTruongThaoNhi-6994969.mp3?st=0cSXGs5mXYthkN20NpRWmg&e=1627419277",
          "url": "https://www.nhaccuatui.com/bai-hat/chi-la-khong-cung-nhau-live-tang-phuc-ft-truong-thao-nhi.Ea8hu2FHnRf9.html",
          "lyric": "https://lrc-nct.nixcdn.com/null",
          "bgImage": "https://avatar-ex-swe.nixcdn.com/singer/avatar/2019/11/20/d/f/9/a/1574242685613_600.jpg",
          "avatar": "https://avatar-ex-swe.nixcdn.com/singer/avatar/2019/11/20/d/f/9/a/1574242685613.jpg",
          "coverImage": "https://avatar-ex-swe.nixcdn.com/playlist/2021/05/04/3/b/6/d/1620100988545_500.jpg"
        },
        {
          "title": "Những Kẻ Mộng Mơ",
          "creator": "Noo Phước Thịnh",
          "music": "https://aredir.nixcdn.com/Sony_Audio50/NhungKeMongMo-NooPhuocThinh-5723943.mp3?st=rJctuAHMDcnwUSNAuquZnA&e=1627419277",
          "url": "https://www.nhaccuatui.com/bai-hat/nhung-ke-mong-mo-noo-phuoc-thinh.zJV2gFUIIzzQ.html",
          "lyric": "https://lrc-nct.nixcdn.com/2018/10/20/e/0/9/d/1540032779920.lrc",
          "bgImage": "https://avatar-ex-swe.nixcdn.com/singer/avatar/2020/09/14/0/2/8/0/1600055795446_600.jpg",
          "avatar": "https://avatar-ex-swe.nixcdn.com/song/2018/10/18/2/1/b/b/1539827958150.jpg",
          "coverImage": "https://avatar-ex-swe.nixcdn.com/playlist/2021/05/04/3/b/6/d/1620100988545_500.jpg"
        },
        {
          "title": "Ước Mơ Của Mẹ (The Heroes Version)",
          "creator": "CARA",
          "music": "https://aredir.nixcdn.com/Unv_Audio198/UocMoCuaMeTheHeroesVersion-CARA-7042616.mp3?st=8gvk54ebDlWH0w17YdV1lA&e=1627419277",
          "url": "https://www.nhaccuatui.com/bai-hat/uoc-mo-cua-me-the-heroes-version-cara.C8Xh47uPBbnB.html",
          "lyric": "https://lrc-nct.nixcdn.com/null",
          "bgImage": "https://avatar-ex-swe.nixcdn.com/singer/avatar/2020/09/08/4/9/c/3/1599539664977_600.jpg",
          "avatar": "https://avatar-ex-swe.nixcdn.com/song/2021/07/04/5/5/5/b/1625391469108.jpg",
          "coverImage": "https://avatar-ex-swe.nixcdn.com/playlist/2021/05/04/3/b/6/d/1620100988545_500.jpg"
        },
        {
          "title": "Cần Gì Hơn?",
          "creator": "Tiên Tiên, JustaTee",
          "music": "https://aredir.nixcdn.com/NhacCuaTui996/CanGiHon-TienTienJustaTee-6236038.mp3?st=4XKOch7JBSHZcUxaaTGCiQ&e=1627419277",
          "url": "https://www.nhaccuatui.com/bai-hat/can-gi-hon-tien-tien-ft-justatee.zLxzzuaqmtyS.html",
          "lyric": "https://lrc-nct.nixcdn.com/2020/04/24/9/6/4/2/1587715825528.lrc",
          "bgImage": "https://avatar-ex-swe.nixcdn.com/singer/avatar/2017/05/19/e/7/4/2/1495168123269_600.jpg",
          "avatar": "https://avatar-ex-swe.nixcdn.com/song/2020/03/10/8/e/3/9/1583831167157.jpg",
          "coverImage": "https://avatar-ex-swe.nixcdn.com/playlist/2021/05/04/3/b/6/d/1620100988545_500.jpg"
        },
        {
          "title": "Gửi Vợ Tương Lai",
          "creator": "Long Nón Lá, KayDee",
          "music": "https://aredir.nixcdn.com/NhacCuaTui1012/GuiVoTuongLai-LongNonLaKaydee-6955120.mp3?st=WIenA-cDoSgokQViDsNQyQ&e=1627419277",
          "url": "https://www.nhaccuatui.com/bai-hat/gui-vo-tuong-lai-long-non-la-ft-kaydee.0E7j91gxPzFa.html",
          "lyric": "https://lrc-nct.nixcdn.com/2021/03/11/9/a/0/1/1615410081698.lrc",
          "bgImage": "",
          "avatar": "https://avatar-ex-swe.nixcdn.com/song/2021/03/08/1/3/2/2/1615169150946.jpg",
          "coverImage": "https://avatar-ex-swe.nixcdn.com/playlist/2021/05/04/3/b/6/d/1620100988545_500.jpg"
        },
        {
          "title": "3 1 0 7",
          "creator": "W/n, Nâu",
          "music": "https://aredir.nixcdn.com/NhacCuaTui996/3107-WnDuonggNau-6099150.mp3?st=86fOkEFHNKHYb8Fs6nAd9g&e=1627419277",
          "url": "https://www.nhaccuatui.com/bai-hat/3-1-0-7-wn-ft-nau.HkDuAPT28WB5.html",
          "lyric": "https://lrc-nct.nixcdn.com/2020/02/25/e/7/5/f/1582610331102.lrc",
          "bgImage": "https://avatar-ex-swe.nixcdn.com/singer/avatar/2019/12/10/e/8/9/7/1575970629322_600.jpg",
          "avatar": "https://avatar-ex-swe.nixcdn.com/song/2020/02/25/6/c/7/7/1582603846517.jpg",
          "coverImage": "https://avatar-ex-swe.nixcdn.com/playlist/2021/05/04/3/b/6/d/1620100988545_500.jpg"
        },
        {
          "title": "Ngày Chưa Giông Bão (Người Bất Tử OST)",
          "creator": "Bùi Lan Hương",
          "music": "https://aredir.nixcdn.com/NhacCuaTui970/NgayChuaGiongBaoNguoiBatTuOst-BuiLanHuong-5708274.mp3?st=WFvZ1v9EARqE8DGbA__TtA&e=1627419277",
          "url": "https://www.nhaccuatui.com/bai-hat/ngay-chua-giong-bao-nguoi-bat-tu-ost-bui-lan-huong.EoqsR1AFD4SG.html",
          "lyric": "https://lrc-nct.nixcdn.com/2018/10/18/b/4/d/5/1539849509465.lrc",
          "bgImage": "https://avatar-ex-swe.nixcdn.com/singer/avatar/2019/09/23/5/0/5/1/1569206056132_600.jpg",
          "avatar": "https://avatar-ex-swe.nixcdn.com/song/2018/10/17/d/0/b/7/1539761564806.jpg",
          "coverImage": "https://avatar-ex-swe.nixcdn.com/playlist/2021/05/04/3/b/6/d/1620100988545_500.jpg"
        },
        {
          "title": "Giữa Đại Lộ Đông Tây (Live At XHTDRLX)",
          "creator": "Uyên Linh",
          "music": "https://aredir.nixcdn.com/NhacCuaTui1013/GiuaDaiLoDongTay1-UyenLinh-6976855.mp3?st=vRWyojbeVepDqX41JP-YFQ&e=1627419277",
          "url": "https://www.nhaccuatui.com/bai-hat/giua-dai-lo-dong-tay-live-at-xhtdrlx-uyen-linh.2nUcx7xMw5iI.html",
          "lyric": "https://lrc-nct.nixcdn.com/2021/04/09/8/a/8/2/1617939844077.lrc",
          "bgImage": "https://avatar-ex-swe.nixcdn.com/singer/avatar/2017/11/21/c/4/8/a/1511239115657_600.jpg",
          "avatar": "https://avatar-ex-swe.nixcdn.com/song/2021/03/27/d/2/9/1/1616857964884.jpg",
          "coverImage": "https://avatar-ex-swe.nixcdn.com/playlist/2021/05/04/3/b/6/d/1620100988545_500.jpg"
        }
    ],
    setConfig: function(key,value){
      this.config[key] = value;
      localStorage.setItem(PLAYER_STORAGE_KEY,JSON.stringify(this.config))
    },
    defineProperties : function(){
        Object.defineProperty(this,'currentSong',{
            get:function(){
                return  this.songs[this.currentIndex]
            }
        })
    },
    render :function(){
        const htmls = this.songs.map((song,index)=>{
            return `
            <div class="song ${this.currentIndex===index ? 'active' : ''}" data-index='${index}'">
            <div class="thumb" style="background-image: url('${song.bgImage}')">
            </div>
            <div class="body">
              <h3 class="title">${song.title}</h3>
              <p class="author">${song.creator}</p>
            </div>
            <div class="option">
              <i class="fas fa-ellipsis-h"></i>
            </div>
          </div>
        `
        })
        playlist.innerHTML = htmls.join('');
    },
    loadCurrentSong : function(){
      headingTitle.textContent = this.currentSong.title;
      headingCreator.textContent = this.currentSong.creator;
      cdThumb.style.backgroundImage = `url(${this.currentSong.bgImage})`
      audio.src = this.currentSong.music;
      const inActiveSong = playlist.querySelector('div.song.active')
      if (inActiveSong) {            
          inActiveSong.classList.remove('active')
      }
      const activeSong = playlist.querySelectorAll('div.song')
      activeSong[this.currentIndex].classList.add('active') 
  },
    handleEvents : function(){
      const _this = this;
      //xử lý CD quay / dừng
      const cdThumbAnimate = cdThumb.animate([
        {transform: 'rotate(360deg)'}
      ],{
          duration: 10000,//10s
          iterations : Infinity
      })
      cdThumbAnimate.pause();
      //xử lý phong to / thu nhỏ cd khi chuộn
      playBtn.onclick = function(){
        if (_this.isPlaying){

            audio.pause();

        } else {
            audio.play();
        }
      }
      //Khai song được play
      audio.onplay = function(){
        _this.isPlaying = true;
        player.classList.add('playing')
        cdThumbAnimate.play();
      }
      //khi song được bị pause
      audio.onpause = function(){
        _this.isPlaying = false;
        player.classList.remove('playing')
        cdThumbAnimate.pause();
      }
      //khi tiến độ bài hát thay đổi
      audio.ontimeupdate = function(){
        if (audio.duration){
            const progressPercent = Math.floor(audio.currentTime / audio.duration * 100)
            progress.value = progressPercent;
        }
      }
      audio.onended = function(){
        if (_this.isRepeat){
            audio.play();
        } else{
           nextBtn.click();
        }
      }
      //xử lý khi tua song
      progress.oninput = function(e){
        const seekTime = audio.duration / 100 * e.target.value 
        audio.currentTime = seekTime;
        audio.play();
      }
      //khi next song
      nextBtn.onclick = function(){
          if (_this.isRandom){
              _this.playRandomSong();
          } else {
              _this.nextSong();
          }
          audio.play();
          _this.scrollToActiveSong();
      }
      //khi prev song
      prevBtn.onclick = function(){
          if (_this.isRandom){
              _this.playRandomSong();
          } else {
              _this.prevSong();
          }
          audio.play();
          _this.scrollToActiveSong();
      }
      //xử lý bật / tắc random song
        randomBtn.onclick = function(e){
            _this.isRandom = !_this.isRandom;
            _this.setConfig('isRandom',_this.isRandom)
            randomBtn.classList.toggle('active',_this.isRandom)
        }
        //xử lý lặp lại song
        repeatBtn.onclick = function(){
            _this.isRepeat = !_this.isRepeat,
            _this.setConfig('isRepeat',_this.isRepeat)
            repeatBtn.classList.toggle('active',_this.isRepeat)
        }
        //lắng nghe hành vi click vào playlist
        playlist.onclick = function(e){
            const songNode = e.target.closest('.song:not(.active)')
            if(songNode || e.target.closest('.option')){
                //xử lý khi click vào song
                if(songNode){
                    _this.currentIndex = Number(songNode.dataset.index) 
                    _this.loadCurrentSong()
                    audio.play();
                }
                //xử lý khi click vào option
            }
        }
    },
    scrollToActiveSong : function(){
      let blockType;
      if (this.currentIndex < 3){
          blockType = 'center'
      } else {
          blockType = 'center'
      }
      setTimeout(()=>{
          $('.song.active').scrollIntoView({
              behavior : 'smooth',
              block: blockType
          })
      },500)
  },
    nextSong : function(){
      this.currentIndex++;
      if (this.currentIndex>=this.songs.length){
          this.currentIndex = 0
      }
      this.loadCurrentSong();
    },
    prevSong : function(){
      this.currentIndex--;
      if (this.currentIndex < 0){
          this.currentIndex = this.songs.length - 1;
      }
      this.loadCurrentSong();
    },
    playRandomSong:function(){
      let newIndex = this.currentIndex;
      do{
          newIndex = Math.floor(Math.random() * this.songs.length)
      } while(this.currentIndex === newIndex)
      this.currentIndex = newIndex
      this.loadCurrentSong();
    },
    loadConfig : function(){
      this.isRandom = this.config.isRandom
      this.isRepeat = this.config.isRepeat
    },
    start : function(){
        //gán cấu hình từ config vào ứng dụng
        this.loadConfig();
        //định nghĩa các thuộc tính cho object
        this.defineProperties();
        //lắng nghe xử lý các sự kiện
        this.handleEvents();
        //render bài hát vào playlist
        this.render();
        //load thông tin bài hát đầu tiên vào UI khi chạy ứng dụng
        this.loadCurrentSong();
        randomBtn.classList.toggle('active',this.isRandom)
        repeatBtn.classList.toggle('active',this.isRepeat)
    }
}
music.start()
