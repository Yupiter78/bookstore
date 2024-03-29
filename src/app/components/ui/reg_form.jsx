import React, { useEffect, useState } from "react";
import TextField from "../common/form/textField";
import { validator } from "../../utils/validator";
import _ from "lodash";
import api from "../../api";
import SelectField from "../common/form/selectField";

const RegisterForm = () => {
    const [data, setData] = useState({ email: "", password: "", genre: "" });
    const [errors, setErrors] = useState({});
    const [genres, setGenres] = useState({});

    const validatorConfig = {
        email: {
            isRequired: {
                message: "Field email is required"
            },
            isEmail: {
                message: "Email entered incorrectly"
            }
        },
        password: {
            isRequired: {
                message: "Field password is required"
            },
            isCapitalLetter: {
                message: "The password must contain at least one capital letter"
            },
            isContainDigit: {
                message: "The password must contain at least one decimal number"
            },
            isMinLength: {
                getMessage: (value) =>
                    `The password must contain at least ${value} characters`,
                value: 8
            }
        },
        genre: {
            isRequired: {
                message: "Field genre is required"
            }
        }
    };
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

    useEffect(() => {
        api.genres.fetchAllGenres().then((data) => setGenres(data));
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
        const isValid = validate();
        if (isValid) return;
        console.log("data: ", data);
    };
    return (
        <form onSubmit={handleSubmit} className="form-control-dark">
            <TextField
                label="Email"
                name="email"
                value={data.email}
                onChange={handleChange}
                error={errors.email}
            />
            <TextField
                label="Password"
                type="password"
                name="password"
                value={data.password}
                onChange={handleChange}
                error={errors.password}
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
            <button
                className={`btn w-50 mt-4 mx-auto d-flex justify-content-center btn-${
                    !_.isEmpty(errors) ? "secondary disabled" : "primary"
                }`}
            >
                Submit
            </button>
        </form>
    );
};

export default RegisterForm;
