namespace MyProject.Global
{
     using System.Collections.Generic;
     using System.Linq;
     using System.Threading.Tasks;
     using Abp.Auditing;
     using Abp.Authorization;
     using Abp.Domain.Repositories;
     using DbEntities;
     using MyProject.Global.Dtos;

     [AbpAuthorize]
     [DisableAuditing]
     public class LookupTableAppService : MyProjectAppServiceBase, ILookupTableAppService
     {
          private readonly IRepository<Demo> demoRepository;

          public LookupTableAppService(
               IRepository<Demo> demoRepository)
          {
               this.demoRepository = demoRepository;
          }

          public async Task<List<LookupTableDto>> GetAllTrangThaiHieuLuc()
          {
               List<LookupTableDto> result = new List<LookupTableDto>();
               foreach (var item in GlobalModel.SortedTrangThaiHieuLuc)
               {
                    result.Add(new LookupTableDto { Id = item.Key, DisplayName = item.Value });
               }

               return await Task.FromResult(result);
          }

          public async Task<List<LookupTableDto>> GetAllTrangThaiDuyet()
          {
               List<LookupTableDto> result = new List<LookupTableDto>();
               foreach (var item in GlobalModel.SortedTrangThaiDuyet)
               {
                    result.Add(new LookupTableDto { Id = item.Key, DisplayName = item.Value });
               }

               return await Task.FromResult(result);
          }

          public async Task<List<LookupTableDto>> GetAllDemo()
          {
               var result = this.demoRepository.GetAll().Select(e => new LookupTableDto() { Id = e.Id, DisplayName = e.Ma }).ToList();
               return await Task.FromResult(result);
          }

     }
}
