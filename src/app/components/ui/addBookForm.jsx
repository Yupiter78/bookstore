import React, { useEffect, useState } from "react";
import TextField from "../common/form/textField";
import { validator } from "../../utils/validator";
import api from "../../api";
import _ from "lodash";
import SelectField from "../common/form/selectField";

const AddBookForm = () => {
    const [books, setBooks] = useState([]);
    const [genres, setGenres] = useState([]);
    const [authors, setAuthors] = useState([]);

    const [data, setData] = useState({
        title: "",
        img: "",
        genre: "",
        author: "",
        publicationYear: "",
        rating: "",
        price: ""
    });
    const [errors, setErrors] = useState({});

    const validatorConfig = {
        title: {
            isRequired: {
                message: "Field email is required"
            }
        },
        img: {
            isRequired: {
                message: "Field email is required"
            },
            isURL: {
                message: "Field must contain a valid URL"
            }
        },
        genre: {
            isRequired: {
                message: "Field email is required"
            }
        },
        author: {
            isRequired: {
                message: "Field email is required"
            }
        },
        publicationYear: {
            isRequired: {
                message: "Field email is required"
            },
            isOnlyNumbers: {
                message: "Field must contain only numeric characters"
            },
            isMinLength: {
                getMessage: (value) =>
                    `The username must contain at least ${value} characters`,
                value: 4
            }
        },
        rating: {
            isRequired: {
                message: "Field email is required"
            }
        },
        price: {
            isRequired: {
                message: "Field email is required"
            }
        }
    };

    useEffect(() => {
        Promise.all([
            api.books.fetchAllBooks(),
            api.genres.fetchAllGenres(),
            api.authors.fetchAllAuthors()
        ]).then(([booksData, genresData, authorsData]) => {
            setBooks(booksData);
            setGenres(genresData);
            setAuthors(authorsData);
        });
    }, []);

    const handleChange = ({ target }) =>
        setData((prevState) => {
            return { ...prevState, [target.name]: target.value };
        });

    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length !== 0;
    };

    useEffect(() => {
        validate();
    }, [data]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const isValid = validate();
        if (isValid) return;
        try {
            const newBooks = await api.books.createNewBook(data);
            setBooks(newBooks);

            localStorage.setItem("books", JSON.stringify(newBooks));
        } catch (error) {
            console.error("Error creating new user: ", error);
        }
    };
    return (
        <div className="d-flex justify-content-center text-white">
            <div className="flex-grow-1 mw-100">
                <p>{books.length}</p>
                <p className="text-center mw-100">
                    Заполните данные для добавления новой книги
                </p>
                <p className="mw-100">
                    Два URL адреса для добавления обложки книги приведены ниже:
                </p>
                <h6 className="text-break mt-4 text-primary">
                    https://github.com/Yupiter78/bookstore/blob/main/src/app/assets/eric_freeman_head_first_javascript_programming.jpg?raw=true
                </h6>
                <h6 className="text-break mt-4 text-primary">
                    https://github.com/Yupiter78/bookstore/blob/main/src/app/assets/kyle_simpson_you_dont_know_js.jpg?raw=true
                </h6>
                <form
                    onSubmit={handleSubmit}
                    className="form-control-dark mt-4"
                >
                    <TextField
                        label="Title"
                        name="title"
                        value={data.title}
                        onChange={handleChange}
                        error={errors.title}
                    />
                    <TextField
                        label="Image URL"
                        type="url"
                        name="img"
                        value={data.img}
                        onChange={handleChange}
                        error={errors.img}
                    />
                    <SelectField
                        label="Genre"
                        name="genre"
                        value={data.genre}
                        options={genres}
                        defaultOption="Choose..."
                        onChange={handleChange}
                        error={errors.genre}
                    />
                    <SelectField
                        label="Author"
                        name="author"
                        value={data.author}
                        options={authors}
                        defaultOption="Choose..."
                        onChange={handleChange}
                        error={errors.author}
                    />
                    <TextField
                        label="Publication year"
                        name="publicationYear"
                        value={data.publicationYear}
                        onChange={handleChange}
                        error={errors.publicationYear}
                    />
                    <TextField
                        label="Rating"
                        name="rating"
                        value={data.rating}
                        onChange={handleChange}
                        error={errors.rating}
                    />
                    <TextField
                        label="Price"
                        name="price"
                        value={data.price}
                        onChange={handleChange}
                        error={errors.price}
                    />

                    <button
                        className={`btn w-50 mt-4 mx-auto d-flex justify-content-center btn-${
                            !_.isEmpty(errors)
                                ? "secondary disabled"
                                : "primary"
                        }`}
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddBookForm;
