import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Badge from "./badge";
import api from "../api";
import _ from "lodash";

const Book = ({ bookId }) => {
    const [book, setBook] = useState({});
    useEffect(() => {
        bookId && api.books.getBookById(bookId).then((data) => setBook(data));
    }, [bookId]);
    return (
        <>
            {!_.isEmpty(book) ? (
                <div className="text-light">
                    <h2>
                        <span className="font-monospace">Title: </span>
                        {`${book.title}`}
                    </h2>
                    <h3>
                        <span className="font-monospace">Genre: </span>
                        <Badge {...book.genre} />
                    </h3>
                    <h3>
                        <span className="font-monospace">Author: </span>
                        {`${book.author.name}`}
                    </h3>
                    <h3>
                        <span className="font-monospace">
                            Publication year:{" "}
                        </span>
                        {`${book.publicationYear}`}
                    </h3>
                    <h3>
                        <span className="font-monospace">Rating: </span>
                        {`${book.rating}`}
                    </h3>
                    <h3>
                        <span className="font-monospace">Price: </span>
                        {`${book.price}`}
                    </h3>
                </div>
            ) : (
                <h3 className="text-light">loading...</h3>
            )}
        </>
    );
};

Book.propTypes = {
    bookId: PropTypes.string
};

export default Book;
