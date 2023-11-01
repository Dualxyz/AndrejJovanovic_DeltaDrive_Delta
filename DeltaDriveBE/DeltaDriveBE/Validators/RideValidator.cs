using DeltaDriveBE.Models;
using FluentValidation;

namespace DeltaDriveBE.Validators
{
    public class RideValidator : AbstractValidator<Ride>
    {
        public RideValidator()
        {
            RuleFor(x => x.DriverId)
                .NotEmpty().WithMessage("Driver Id is required");

            RuleFor(x => x.StartLatitude)
                .NotNull().WithMessage("Latitude (start) is required");

            RuleFor(x => x.StartLongitude)
                .NotNull().WithMessage("Longitude (start) is required");

            RuleFor(x => x.DestinationLatitude)
                .NotNull().WithMessage("Latitude (destination) is required");

            RuleFor(x => x.DestinationLongitude)
                .NotNull().WithMessage("Longitude (destination) is required");

            RuleSet("RatingRuleSet", () =>
            {
                RuleFor(x => x.Rating)
                    .NotNull().WithMessage("Rating is required")
                    .InclusiveBetween(1, 5).WithMessage("Rating must be between 1 and 5");
            });
        }
    }
}
