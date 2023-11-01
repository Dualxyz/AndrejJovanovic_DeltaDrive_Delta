using AutoMapper;
using DeltaDriveBE.DTO.AuthDTO;
using DeltaDriveBE.DTO.RideDTO;
using DeltaDriveBE.Models;

namespace DeltaDriveBE.Mapper
{
    public class MapperProfile : Profile
    {
        public MapperProfile()
        {
            CreateMap<RegisterPassengerRequestDTO, Passenger>().ReverseMap();
            CreateMap<Passenger, RegisterPassengerResponseDTO>().ReverseMap();
            CreateMap<Passenger, LoginPassengerRequestDTO>().ReverseMap();
            CreateMap<Passenger, LoginPassengerResponseDTO>().ReverseMap();

            CreateMap<BookRideRequestDTO, Ride>();
            CreateMap<Ride, BookRideResponseDTO>();

            CreateMap<RateRideRequestDTO, Ride>();
            CreateMap<Ride, RateRideResponseDTO>();
        }
    }
}
