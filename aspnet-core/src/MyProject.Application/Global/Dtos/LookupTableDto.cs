 // This file is not generated, but this comment is necessary to exclude it from StyleCop analysis 
 // <auto-generated/> 
using System;
using System.Collections.Generic;
using System.Text;

namespace MyProject.Global.Dtos
{
    public class LookupTableDto : LookupTableDto<int>
    {
    }

    public class LookupTableDto<TPrimaryKey>
    {
        public TPrimaryKey Id { get; set; }

        public string DisplayName { get; set; }
    }
}
