namespace MyProject.HoSo
{
    using Abp.Application.Services;
    using MyProject.HoSo.Dtos;

    public interface IHoSoKhachHangAppService : IAsyncCrudAppService<HoSoKhachHangDto, int>
    {
    }
}
