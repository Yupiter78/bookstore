import React from "react";
import { sortingCriteria } from "../../constants/sortingCriteria";
import PropTypes from "prop-types";

const Dropdown = ({
    selectedFilter,
    menuVisibility,
    filterValue,
    onSelect,
    onFilter,
    onClearFilter,
    ...rest
}) => {
    const toggleShow = (eventKey) => {
        return menuVisibility[eventKey] && selectedFilter === eventKey
            ? "show"
            : "";
    };
    return (
        <div className="d-flex mt-4 mb-2 justify-content-between">
            <div className="d-flex align-items-center">
                <span className="text-light fw-bold text-shadow">
                    Фильтры:{" "}
                </span>

                {sortingCriteria.map(
                    ({ _id, eventKey, criteria, category, filterKey }) => (
                        <div key={_id} className="dropdown">
                            <button
                                type="button"
                                id={_id}
                                className={`btn btn-primary dropdown-toggle mx-2 border border-light border-2 ${toggleShow(
                                    eventKey
                                )}`}
                                data-bs-toggle="dropdown"
                                aria-expanded={
                                    menuVisibility[eventKey] === eventKey
                                        ? "true"
                                        : "false"
                                }
                                onClick={() => onSelect(eventKey)}
                            >
                                {criteria}
                            </button>
                            <ul
                                className={`dropdown-menu dropdown-menu-dark ${toggleShow(
                                    eventKey
                                )}`}
                                aria-labelledby={_id}
                                style={{
                                    maxHeight: "200px",
                                    overflowY: "auto",
                                    overflowX: "hidden"
                                }}
                            >
                                {Object.values(rest[category])
                                    .sort((a, b) =>
                                        a[filterKey] > b[filterKey] ? 1 : -1
                                    )
                                    .map((item) => {
                                        return (
                                            <li
                                                key={item._id}
                                                onClick={() =>
                                                    onFilter(item, eventKey)
                                                }
                                            >
                                                <a
                                                    className={`dropdown-item ${
                                                        filterValue.listItem ===
                                                        item
                                                            ? "active"
                                                            : ""
                                                    }`}
                                                    href="#"
                                                >
                                                    {item[filterKey]}
                                                </a>
                                            </li>
                                        );
                                    })}
                            </ul>
                        </div>
                    )
                )}
            </div>
            <button
                className="btn btn-primary border border-light border-2"
                onClick={onClearFilter}
            >
                Сброс фильтров
            </button>
        </div>
    );
};

Dropdown.propTypes = {
    books: PropTypes.array,
    genres: PropTypes.array,
    authors: PropTypes.array,
    selectedFilter: PropTypes.string,
    menuVisibility: PropTypes.object,
    filterValue: PropTypes.object,
    onSelect: PropTypes.func,
    onFilter: PropTypes.func,
    onClearFilter: PropTypes.func
};

export default Dropdown;
