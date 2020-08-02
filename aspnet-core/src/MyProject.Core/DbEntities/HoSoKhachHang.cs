﻿// This file is not generated, but this comment is necessary to exclude it from StyleCop analysis
// <auto-generated/>
using Abp.Domain.Entities;
using Abp.Domain.Entities.Auditing;
using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace DbEntities
{
    [Table("HoSoKhachHang")]
    public class HoSoKhachHang : FullAuditedEntity, IMayHaveTenant
    {
        public int? TenantId { get; set; }
        public virtual string SoCmt { get; set; }
        public virtual string HoTenCmt { get; set; }
        public virtual DateTime? NgaySinhCmt { get; set; }
        public virtual string NguyenQuanCmt { get; set; }
        public virtual string NoiDKHKThuongTruCmt { get; set; }
        public virtual string DanTocCmt { get; set; }
        public virtual string TonGiaoCmt { get; set; }
        public virtual string DacDiemNhanDangCmt { get; set; }
        public virtual DateTime? NgayCapCmt { get; set; }
        public virtual string NoiCapCmt { get; set; }
        public virtual int? GioiTinhCmt { get; set; }
        public virtual string SoCanCuoc { get; set; }
        public virtual string HoVaTenCanCuoc { get; set; }
        public virtual DateTime? NgaySinhCanCuoc { get; set; }
        public virtual int? GioiTinhCanCuoc { get; set; }
        public virtual string QuocTichCanCuoc { get; set; }
        public virtual string QueQuanCanCuoc { get; set; }
        public virtual string NoiThuongTruCanCuoc { get; set; }
        public virtual DateTime? GiaTriDenCanCuoc { get; set; }
        public virtual string DacDiemNhanDangCanCuoc { get; set; }
        public virtual DateTime? NgayCapCanCuoc { get; set; }
        public virtual string NoiCapCanCuoc { get; set; }
        public virtual string NguoiCapCanCuoc { get; set; }
        public virtual string XaPhuongGKS { get; set; }
        public virtual string QuanHuyenGKS { get; set; }
        public virtual string TinhThanhGKS { get; set; }
        public virtual string MauGKS { get; set; }
        public virtual string SoGKS { get; set; }
        public virtual string QuyenSoGKS { get; set; }
        public virtual string HoTenGKS { get; set; }
        public virtual int? GioiTinhGKS { get; set; }
        public virtual DateTime? NgaySinhGKS { get; set; }
        public virtual string NgaySinhBangChuGKS { get; set; }
        public virtual string NoiSinhGKS { get; set; }
        public virtual string DanTocGKS { get; set; }
        public virtual string QuocTichGKS { get; set; }
        public virtual string QueQuanGKS { get; set; }
        public virtual string HoTenChaGKS { get; set; }
        public virtual string DanTocChaGKS { get; set; }
        public virtual string QuocTichChaGKS { get; set; }
        public virtual string HoTenMeGKS { get; set; }
        public virtual string DanTocMeGKS { get; set; }
        public virtual string QuocTichMeGKS { get; set; }
        public virtual string HoTenNguoiDiKhaiSinhGKS { get; set; }
        public virtual string QuanHeVoiNguoiDuocKhaiSinhGKS { get; set; }
        public virtual DateTime? NgayDangKyGKS { get; set; }
        public virtual string CanBoTuPhapKyGKS { get; set; }
        public virtual string ChuTichThayMatKyGKS { get; set; }
        public virtual DateTime? NgayKyGKS { get; set; }
        public virtual string ChuTichKyGKS { get; set; }
        public virtual string HoTenChuHoSHK { get; set; }
        public virtual string SoNhaSHK { get; set; }
        public virtual string DuongPhoSHK { get; set; }
        public virtual string BangCap { get; set; }
        public virtual string HoTenSYLL { get; set; }
        public virtual int? GioiTinhSYLL { get; set; }
        public virtual DateTime? NgaySinhSYLL { get; set; }
        public virtual string NoiDangKyHKHienNaySYLL { get; set; }
        public virtual string CmtSYLL { get; set; }
        public virtual string NoiCapCMTSYLL { get; set; }
        public virtual DateTime? NgayCapCMTSYLL { get; set; }
        public virtual string BaoTinChoAiSYLL { get; set; }
        public virtual string SoSYLL { get; set; }
        public virtual string KyHieuSYLL { get; set; }
        public virtual string AnhSYLL { get; set; }
        public virtual string MaSoBaoHiem { get; set; }
    }
}