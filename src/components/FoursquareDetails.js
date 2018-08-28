import * as React from "react";
import "./FoursquareDetails.css";

// If there was an error during an api call, we show it there.
// Otherwise we show the api call results.
export default ({ model, model: { venue } }) =>
    "error" in model ? (
        <div className="FoursquareDetails">
            <p>Error loading details.</p>
            <p>{`${model.error}`}</p>
        </div>
    ) : (
        <article className="FoursquareDetails">
            <p aria-level="heading" className="FoursquareDetails-title">{venue.name}</p>
            <p className="FoursquareDetails-rating">rating: {venue.rating}</p>
            <div className="FoursquareDetails-address">
                {venue.location.formattedAddress.map((line, i) => (
                    <p key={i}>{line}</p>
                ))}
            </div>
            {venue.hours &&
                <p>{venue.hours.status}</p>}
            {venue.hours &&
                <div className="FoursquareDetails-hours">
                    {venue.hours.timeframes.map((frame, i) => (
                        <p key={i}>
                            <span className="FoursquareDetails-hours-day">
                                {frame.days}:
                            </span>{" "}
                            <time className="FoursquareDetails-hours-hours">
                                {frame.open
                                    .map(open => open.renderedTime)
                                    .join(", ")}
                            </time>
                        </p>
                    ))}
                </div>}

            <p>
                <img
                    src={`${venue.bestPhoto.prefix}cap300${
                        venue.bestPhoto.suffix
                    }`}
                    alt={`${venue.name}`}
                />
            </p>

            <p>data is provided by Foursquare</p>
        </article>
    );
