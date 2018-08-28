import * as React from "react";
import "./App.css";
import ListView from "./components/ListView";
import venues from "./data/venues";
import MapView from "./components/MapView";
import { FOURSQUARE_CLIENT_ID, FOURSQUARE_CLIENT_SECRET } from "./data/apiKeys";
import venueTypes from "./data/venueTypes";

// Create class for state for easier initialization.
class State {
    selectedVenue = null;
    filterQuery = "";
    filterType = "none";
    foursquareDetails = null;
    sidebarClosed = false;
}

window.gm_authFailure = function () {
      alert("Sorry. Couldn't reach the Google Map API")
    }

class App extends React.Component {
    state = new State();

    selectVenue = venue => {
        this.setState({
            selectedVenue: venue,
            foursquareDetails: null
        });

        // If the user selected a new venue (location), we start fetching its
        // details through Foursquare API.
        if (venue) {
            fetch(
                `https://api.foursquare.com/v2/venues/${
                    venue.foursquareId
                }?client_id=${FOURSQUARE_CLIENT_ID}&client_secret=${FOURSQUARE_CLIENT_SECRET}&v=20180323`
            )
                .then(response => response.json())
                .then(response => {
                    // If response code is OK.
                    if (response.meta.code === 200) {
                        this.setState({ foursquareDetails: response.response });
                    } else {
                        this.setState({
                            foursquareDetails: {
                                error: response.meta.errorDetail
                            }
                        });
                    }
                })
                .catch(error =>
                    // We set the error as content. The FoursquareDetails
                    // component knows how to display errors.
                    this.setState({ foursquareDetails: { error: error } })
                );
        }
    };

    search = e => {
        this.setState({ filterQuery: e.target.value });
    };

    filterTypeChange = e => {
        this.setState({ filterType: e.target.value });
    };

    openSidebar = () =>
        this.setState({ sidebarClosed: !this.state.sidebarClosed });

    render() {
        const filteredList = venues
            // We filter by venue name based on the search query. We make it
            // case insensitive.
            .filter(venue =>
                venue.name
                    .toLowerCase()
                    .includes(this.state.filterQuery.toLowerCase())
            )
            // Then we filter by category. This code checks if current venue id
            // is in the list of venues of the current filter type, or the
            // filter type is "none".
            .filter(
                venue =>
                    this.state.filterType === "none" ||
                    venueTypes[this.state.filterType].includes(
                        venue.foursquareId
                    )
            );

        return (
            <div
                className={`App${
                    this.state.sidebarClosed ? " App-sidebarClosed" : ""
                }`}
            >
                <MapView
                    list={filteredList}
                    selected={this.state.selectedVenue}
                    select={this.selectVenue}
                    foursquareDetails={this.state.foursquareDetails}
                />
                <ListView
                    list={filteredList}
                    selected={this.state.selectedVenue}
                    select={this.selectVenue}
                    search={this.search}
                    searchValue={this.state.filterQuery}
                    filterTypeChange={this.filterTypeChange}
                />
                <button
                    tabIndex="-1"
                    className={`App-sidebarOpenButton ${
                        this.state.sidebarClosed
                            ? " App-sidebarOpenButton--reverse"
                            : ""
                    }`}
                    onClick={this.openSidebar}
                />
            </div>
        );
    }
}

export default App;
