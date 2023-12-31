import React from "react";
import PropTypes from "prop-types";

const TotalStatus = ({ length, favorites }) => {
    const editorWords = (num) => {
        const penultimateDigit = Number(num.toString().slice(-2, -1));
        const lastOneDigit = Number(num.toString().slice(-1));
        const exceptions = [2, 3, 4];
        if (exceptions.includes(lastOneDigit) && penultimateDigit !== 1) {
            return "и";
        }

        if (lastOneDigit === 1 && penultimateDigit !== 1) {
            return "а";
        }

        return "";
    };
    editorWords(length);
    return (
        <div>
            {length > 0 && (
                <div className="d-flex justify-content-between badge bg-primary border border-light border-2 text-start text-light my-4">
                    <h4 className="mx-5">{`В коллекции ${length} книг${editorWords(
                        length
                    )}`}</h4>
                    {favorites > 0 && (
                        <h4 className="mx-5">{`В избранном ${favorites} книг${editorWords(
                            favorites
                        )}`}</h4>
                    )}
                </div>
            )}
        </div>
    );
};

TotalStatus.propTypes = {
    length: PropTypes.number,
    favorites: PropTypes.number
};

export default TotalStatus;
