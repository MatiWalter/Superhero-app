import React from 'react'
import { Footer } from '../ui/Footer'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import { startRegisterWithEmailPasswordName } from '../../actions/auth';
import { removeError } from '../../actions/ui';
import validator from 'validator';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';

export const RegisterScreen = () => {

  const dispatch = useDispatch();
  const { msgError } = useSelector(state => state.ui);

  const [formValues, handleInputChange] = useForm({
    name: '',
    email: '',
    password: '',
    password2: '',
  });

  const { name, email, password, password2 } = formValues;

  const handleRegister = (e) => {
    e.preventDefault();
    if (isFormValid()) {
      dispatch(startRegisterWithEmailPasswordName(email, password, name));
    }
  }

  const isFormValid = () => {
    let isValid = true;
    if (validator.isEmpty(name)) {
      Swal.fire('Error', 'Name is required', 'error');
      isValid = false;
    } else if (!validator.isEmail(email)) {
      Swal.fire('Error', 'Email is not valid', 'error');
      isValid = false;
    } else if (!validator.equals(password, password2) && (!validator.isStrongPassword(password, [{ minLength: 6 }]))) {
      Swal.fire('Error', 'Password should be at least 6 characters and match each other', 'error');
      isValid = false;
    }
    if (isValid) dispatch(removeError());
    return isValid;
  }

  return (
    <div className="vh-100 d-flex flex-column align-items-center justify-content-center">
      <div className="col-10 col-md-6 col-lg-4 d-flex flex-column mb-5">
        <h1 className="my-5 text-center">Register</h1>
        <div className="mb-5">
          <form onSubmit={handleRegister}>

            {
              msgError &&
              (
                <div className="auth__alert-error">
                  {msgError}
                </div>
              )
            }

            <div className="input-group">
              <label
                htmlFor="name"
                className="input-group-text"
              >
                Name
              </label>

              <input
                type="text"
                placeholder="Name"
                name="name"
                className="form-control"
                autoComplete="off"
                value={name}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="input-group mt-3">
              <label
                htmlFor="email"
                className="input-group-text"
              >
                Email
              </label>

              <input
                name="email"
                placeholder="email@mail.com"
                value={email}
                onChange={handleInputChange}
                type="email"
                className="form-control"
                autoComplete="off"
                required
              />
            </div>

            <div className="input-group mt-3">
              <label
                htmlFor="password"
                className="input-group-text"
              >
                Password
              </label>
              <input
                name="password"
                type="password"
                placeholder="Password"
                value={password}
                onChange={handleInputChange}
                className="form-control"
                required
              />
            </div>

            <div className="input-group mt-3">
              <label
                htmlFor="password2"
                className="input-group-text"
              >
                Password
              </label>

              <input
                type="password"
                placeholder="Confirm password"
                name="password2"
                className="form-control"
                value={password2}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="d-grid gap-2">
              <button
                className="btn btn-primary mt-3"
                type="submit"
              >
                Register
              </button>
            </div>

            <Link
              to="/auth/login"
              className="link"
            >
              Already registered?
            </Link>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  )
}
