import * as React from "react";
import SearchBox from "./SearchBox";
import ListItem from "./ListItem";
import venueTypes from "../data/venueTypes";
import "./ListView.css";

// This component dispaches the search query change events through callbacks to
// the parent component.
// It also displays the filtered list of results through the `list` prop.
export default class ListView extends React.Component {
    render() {
        return (
            <aside className="ListView">
                {/* Search controls */}
                <div className="ListView-searchControls" role="search">
                    <SearchBox
                        onChange={this.props.search}
                        value={this.props.searchValue}
                    />
                    <select onChange={this.props.filterTypeChange}>
                        <option value="none">
                            Good coffee (select all :))
                        </option>
                        {Object.keys(venueTypes).map(type => (
                            <option key={type} value={type}>
                                {type}
                            </option>
                        ))}
                    </select>
                </div>
                {/* Results */}
                <ul>
                    {this.props.list.map((model,index) => (
                        <li key={model.foursquareId} role="button" tabIndex={index}>
                            <ListItem
                                model={model}
                                onClick={this.props.select}
                                selected={
                                    (this.props.selected &&
                                        this.props.selected.foursquareId ===
                                            model.foursquareId) ||
                                    false
                                }
                            />
                        </li>
                    ))}
                </ul>
            </aside>
        );
    }
}
