import * as React from "react";
import "./SearchBox.css";

export default ({ onChange, value }) => (
    <div className="SearchBox">
        <input onChange={onChange} value={value} placeholder="Search" />
    </div>
);
