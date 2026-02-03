using System.Collections.Generic;
using System.IO;
using RiskWall.Core.Entities;

namespace RiskWall.Core.Interfaces
{
    public interface IFileParser
    {
        IEnumerable<Alert> Parse(Stream stream, string filename);
    }
}
