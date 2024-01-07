import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import api from "../api";
import _ from "lodash";
import ProgressBar from "./progress-bar";
import CardContents from "./cardContents";
import Badge from "./badge";

const Book = ({ bookId }) => {
    const [book, setBook] = useState({});
    const [isMounted, setIsMounted] = useState(true);
    const rowData = {
        title: {
            _id: "0a9t4l4q0c4m8j3o7j5k2v6k",
            name: "Title",
            path: "title"
        },
        genre: {
            _id: "2o0w8k7r2x8l9v7x0q3a5j1v",
            name: "Genre",
            path: "genre",
            component: (book) => <Badge {...book.genre} />
        },
        author: {
            _id: "7o8f6a2l9d5l8u5c1e8b0e3v",
            name: "Author",
            path: "author.name"
        },
        publicationYear: {
            _id: "6h4r2y3r8x7q7p4p1k9h8j1r",
            name: "Publication Year",
            path: "publicationYear"
        },
        rating: {
            _id: "5m8j4w4s3o5t6c8o4o6a5u2c",
            name: "Rating",
            path: "rating"
        },
        price: { _id: "4u7v6w5o5x8e7o1b4n6v2y8s", name: "Price", path: "price" }
    };
    useEffect(() => {
        bookId &&
            api.books
                .getBookById(bookId)
                .then((data) => isMounted && setBook(data));
        return () => setIsMounted(false);
    }, [bookId, isMounted]);

    const [imageLoaded, setImageLoaded] = useState(false);
    const handleImageLoad = () => {
        setImageLoaded(true);
    };

    console.log("book-list:", Object.keys(book));

    return (
        <>
            {!_.isEmpty(book) ? (
                <>
                    {!imageLoaded && <ProgressBar />}
                    <div className="custom-container d-flex justify-content-center">
                        <div
                            className={`text-light d-flex justify-content-center align-items-start m-4 ${
                                imageLoaded ? "border" : ""
                            }`}
                        >
                            <img
                                className="img-fluid m-3"
                                style={{
                                    maxHeight: "calc(100vh - 140px)",
                                    width: "auto",
                                    display: imageLoaded ? "block" : "none"
                                }}
                                src={book.img}
                                alt="Book Cover"
                                onLoad={handleImageLoad}
                            />
                            {imageLoaded && (
                                <CardContents {...{ book, rowData }} />
                            )}
                        </div>
                    </div>
                </>
            ) : (
                <ProgressBar />
            )}
        </>
    );
};

Book.propTypes = {
    bookId: PropTypes.string
};

export default Book;
