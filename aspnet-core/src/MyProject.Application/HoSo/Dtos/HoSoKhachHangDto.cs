namespace MyProject.HoSo.Dtos
{
    using System;
    using Abp.Application.Services.Dto;
    using Abp.AutoMapper;
    using DbEntities;

    [AutoMap(typeof(HoSoKhachHang))]
    public class HoSoKhachHangDto : EntityDto<int>
    {
        public string SoCmt { get; set; }

        public int? LoaiGiayTo { get; set; }

        public string HoTenCmt { get; set; }

        public DateTime? NgaySinhCmt { get; set; }

        public string NguyenQuanCmt { get; set; }

        public string NoiDKHKThuongTruCmt { get; set; }

        public string DanTocCmt { get; set; }

        public string TonGiaoCmt { get; set; }

        public string DacDiemNhanDangCmt { get; set; }

        public DateTime? NgayCapCmt { get; set; }

        public string NoiCapCmt { get; set; }

        public string NguoiKyCmt { get; set; }

        public string SoCanCuoc { get; set; }

        public string HoVaTenCanCuoc { get; set; }

        public DateTime? NgaySinhCanCuoc { get; set; }

        public int? GioiTinhCanCuoc { get; set; }

        public string QuocTichCanCuoc { get; set; }

        public string QueQuanCanCuoc { get; set; }

        public string NoiThuongTruCanCuoc { get; set; }

        public DateTime? GiaTriDenCanCuoc { get; set; }

        public string DacDiemNhanDangCanCuoc { get; set; }

        public DateTime? NgayCapCanCuoc { get; set; }

        public string NoiCapCanCuoc { get; set; }

        public string NguoiCapCanCuoc { get; set; }

        public string XaPhuongGKS { get; set; }

        public string QuanHuyenGKS { get; set; }

        public string TinhThanhGKS { get; set; }

        public string MauGKS { get; set; }

        public string SoGKS { get; set; }

        public string QuyenSoGKS { get; set; }

        public string HoTenGKS { get; set; }

        public int? GioiTinhGKS { get; set; }

        public DateTime? NgaySinhGKS { get; set; }

        public string NgaySinhBangChuGKS { get; set; }

        public string NoiSinhGKS { get; set; }

        public string DanTocGKS { get; set; }

        public string QuocTichGKS { get; set; }

        public string QueQuanGKS { get; set; }

        public string HoTenChaGKS { get; set; }

        public string DanTocChaGKS { get; set; }

        public string QuocTichChaGKS { get; set; }

        public string HoTenMeGKS { get; set; }

        public string DanTocMeGKS { get; set; }

        public string QuocTichMeGKS { get; set; }

        public string HoTenNguoiDiKhaiSinhGKS { get; set; }

        public string QuanHeVoiNguoiDuocKhaiSinhGKS { get; set; }

        public DateTime? NgayDangKyGKS { get; set; }

        public string CanBoTuPhapKyGKS { get; set; }

        public string ChuTichThayMatKyGKS { get; set; }

        public DateTime? NgayKyGKS { get; set; }

        public string ChuTichKyGKS { get; set; }

        public string HoTenChuHoSHK { get; set; }

        public int? SoThanhVienSHK { get; set; }

        public string DiaChiSHK { get; set; }

        public string BangCap { get; set; }

        public string SoHoChieu { get; set; }

        public string HoTenSYLL { get; set; }

        public int? GioiTinhSYLL { get; set; }

        public DateTime? NgaySinhSYLL { get; set; }

        public string NoiDangKyHKHienNaySYLL { get; set; }

        public string CmtSYLL { get; set; }

        public string NoiCapCMTSYLL { get; set; }

        public DateTime? NgayCapCMTSYLL { get; set; }

        public string BaoTinChoAiSYLL { get; set; }

        public string SoSYLL { get; set; }

        public string KyHieuSYLL { get; set; }

        public string AnhSYLL { get; set; }

        public string MaSoBaoHiem { get; set; }

    }
}
