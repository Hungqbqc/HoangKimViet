namespace MyProject.HoSo.Dtos
{
    using Abp.Application.Services;
    using Abp.Domain.Repositories;
    using DbEntities;

    public class HoSoKhachHangAppService : AsyncCrudAppService<HoSoKhachHang, HoSoKhachHangDto, int>, IHoSoKhachHangAppService
    {
        private readonly IRepository<HoSoKhachHang> hoSoKhachHangRepository;

        public HoSoKhachHangAppService(IRepository<HoSoKhachHang> hoSoKhachHangRepository)
            : base(hoSoKhachHangRepository)
        {
            this.hoSoKhachHangRepository = hoSoKhachHangRepository;
        }

    }
}
