using AutoMapper;
using DeltaDriveBE.DTO.AuthDTO;
using DeltaDriveBE.Models;

namespace DeltaDriveBE.Mapper
{
    public class MapperProfile : Profile
    {
        public MapperProfile()
        {
            CreateMap<RegisterPassangerRequestDTO, Passanger>().ReverseMap();
            CreateMap<Passanger, RegisterPassangerResponseDTO>().ReverseMap();
            CreateMap<Passanger, LoginPassangerRequestDTO>().ReverseMap();
            CreateMap<Passanger, LoginPassangerResponseDTO>().ReverseMap();
        }
    }
}
