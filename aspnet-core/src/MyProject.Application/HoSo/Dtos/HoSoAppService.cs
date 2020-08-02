namespace MyProject.HoSo.Dtos
{
    using Abp.Domain.Repositories;
    using DbEntities;

    public class HoSoAppService : MyProjectAppServiceBase, IHoSoAppService
    {
        private readonly IRepository<HoSoKhachHang> hoSoKhachHangRepository;

        public HoSoAppService(IRepository<HoSoKhachHang> hoSoKhachHangRepository)
        {
            this.hoSoKhachHangRepository = hoSoKhachHangRepository;
        }
    }
}
