import * as React from "react";
import { Map, Marker, InfoWindow, GoogleApiWrapper } from "google-maps-react";
import FoursquareDetails from "./FoursquareDetails";
import "./MapView.css";

export class MapView extends React.Component {
    render() {
        // Create list of markers from `list` prop.
        const markers = this.props.list.map(venue => (
            <Marker
                key={venue.foursquareId}
                name={venue.name}
                title={venue.name}
                position={venue.position}
                onClick={() => this.props.select(venue)}
                icon={{
                    url:
                        this.props.selected &&
                        this.props.selected.foursquareId === venue.foursquareId
                            ? "marker-selected.svg"
                            : "marker.svg",
                    anchor: new this.props.google.maps.Point(14, 16),
                    scaledSize: new this.props.google.maps.Size(32, 32)
                }}
            />
        ));

        return (
            <div className="MapView" role="application">
                <Map
                    google={this.props.google}
                    item
                    xs={12}
                    zoom={14}
                    initialCenter={{ lat: 47.5, lng: 19.05 }}
                    styles={
                        [
          {
              "featureType": "landscape",
              "elementType": "all",
              "stylers": [
                  {
                      "hue": "#ff0000"
                  },
                  {
                      "saturation": "35"
                  },
                  {
                      "lightness": "-29"
                  },
                  {
                      "gamma": "0.90"
                  }
              ]
          },
          {
              "featureType": "poi.park",
              "elementType": "geometry",
              "stylers": [
                  {
                      "lightness": "-67"
                  },
                  {
                      "saturation": "-51"
                  },
                  {
                      "gamma": "2.12"
                  },
                  {
                      "color": "#5c6b4a"
                  }
              ]
          },
          {
              "featureType": "water",
              "elementType": "all",
              "stylers": [
                  {
                      "hue": "#00FFA6"
                  },
                  {
                      "saturation": -63.2
                  },
                  {
                      "lightness": 38
                  },
                  {
                      "gamma": 1
                  }
              ]
          },
          {
            "featureType": "water",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "lightness": "-13"
                },
                {
                    "saturation": "-12"
                },
                {
                    "gamma": "1.10"
                },
                {
                    "hue": "#0000ff"
                }
            ]
        },{
            featureType: 'administrative',
            elementType: 'labels.text.stroke',
            stylers: [
              { color: '#e9caae' },
              { weight: 6 }
            ]
          },{
            featureType: 'administrative',
            elementType: 'labels.text.fill',
            stylers: [
              { color: '#303133' }
            ]
          },{
            featureType: 'road.highway',
            elementType: 'geometry.stroke',
            stylers: [
              { color: '#ddc0a2' },
              { lightness: -40 }
            ]
          },{
            "featureType": "road.local",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "color": "#e1c3a1"
                }
            ]
        },{
            featureType: 'transit.station',
            stylers: [
              { weight: 9 },
              { hue: '#303133' }
            ]
          },{
            featureType: 'water',
            elementType: 'labels.text.stroke',
            stylers: [
              { lightness: 100 }
            ]
          },{
            featureType: 'water',
            elementType: 'labels.text.fill',
            stylers: [
              { lightness: -100 }
            ]
          },{
            featureType: 'poi',
            elementType: 'geometry',
            stylers: [
              { visibility: 'on' },
              { color: '#5c6b4a' }
            ]
          },
          {
            "featureType": "poi",
            "elementType": "labels.text",
            "stylers": [
              {
                "visibility": "off"
              }
            ]
          },
          {
            "featureType": "poi.business",
            "stylers": [
              {
                "visibility": "off"
              }
            ]
          },
          {
            "featureType": "road",
            "elementType": "labels.icon",
            "stylers": [
              {
                "visibility": "off"
              }
            ]
          },
          {
            "featureType": "transit",
            "stylers": [
              {
                "visibility": "off"
              }
            ]
          },{
            featureType: 'road.highway',
            elementType: 'geometry.fill',
            stylers: [
              { color: '#ddc0a2' },
              { lightness: -25 }
            ]
          },
          {
              "featureType": "road.arterial",
              "elementType": "geometry.fill",
              "stylers": [
                  {
                      "color": "#ddc0a2"
                  }
              ]
          }
        ]
                    }
                >
                    {markers}
                    {
                        <InfoWindow
                            position={
                                this.props.selected &&
                                this.props.selected.position
                            }
                            visible={!!this.props.selected}
                            onClose={() => this.props.select(null)}
                        >
                            {(this.props.foursquareDetails && (
                                <FoursquareDetails
                                    model={this.props.foursquareDetails}
                                />
                            )) || <article className="FoursquareDetails" />}
                        </InfoWindow>
                    }
                </Map>
            </div>
        );
    }
}

// This code initializes Google maps API.
export default GoogleApiWrapper({
    apiKey: "AIzaSyCMPC6eBkIO06YTip0gOdJxat0Q9xydGcU"
})(MapView);
