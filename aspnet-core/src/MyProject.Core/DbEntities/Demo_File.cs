// This file is not generated, but this comment is necessary to exclude it from StyleCop analysis 
// <auto-generated/> 
namespace DbEntities
{
     using System.ComponentModel.DataAnnotations.Schema;
     using Abp.Domain.Entities;
     using Abp.Domain.Entities.Auditing;

     [Table("Demo_File")]
     public class Demo_File : FullAuditedEntity, IMayHaveTenant
     {
          public int? TenantId { get; set; }
          public virtual int? DemoId { get; set; }
          public virtual string TenFile { get; set; }
          public virtual string LinkFile { get; set; }
          public virtual string GhiChu { get; set; }
     }
}
