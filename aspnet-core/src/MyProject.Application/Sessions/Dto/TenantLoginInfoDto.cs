 // This file is not generated, but this comment is necessary to exclude it from StyleCop analysis 
 // <auto-generated/> 
using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using MyProject.MultiTenancy;

namespace MyProject.Sessions.Dto
{
    [AutoMapFrom(typeof(Tenant))]
    public class TenantLoginInfoDto : EntityDto
    {
        public string TenancyName { get; set; }

        public string Name { get; set; }
    }
}
