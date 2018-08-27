import * as React from "react";
import "./ListItem.css";

export default ({ model, model: { name }, onClick, selected }) => (
    <div
        className={`ListItem${selected ? " ListItem--selected" : ""}`}
        onClick={() => onClick(model)}
    >
        {name}
    </div>
);
