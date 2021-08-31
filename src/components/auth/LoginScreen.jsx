import React from 'react'
import { Footer } from '../ui/Footer'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { startGithubLogin, startGoogleLogin, startLoginEmailPassword } from '../../actions/auth';
import { useForm } from '../../hooks/useForm';

export const LoginScreen = () => {

  const dispatch = useDispatch();
  const { loading } = useSelector(state => state.ui);

  const [formValues, handleInputChange] = useForm({
    email: '',
    password: ''
  });

  const { email, password } = formValues;

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(startLoginEmailPassword(email, password));
  }

  const handleGoogleLogin = () => {
    dispatch(startGoogleLogin());
  }

  const handleGithubLogin = () => {
    dispatch(startGithubLogin());
  }

  return (
    <div className="vh-100 d-flex flex-column align-items-center justify-content-center">
      <div className="col-10 col-md-6 col-lg-4 d-flex flex-column mb-5">
        <h1 className="my-5 text-center">Login</h1>
        <div className="mb-5">
          <form onSubmit={handleLogin}>
            <div className="input-group">
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
                placeholder="password"
                value={password}
                onChange={handleInputChange}
                className="form-control"
                required
              />
            </div>
            <div className="d-grid gap-2">
              <button
                className="btn btn-primary mt-3"
                type="submit"
                disabled={loading}
              >
                Log in
              </button>
            </div>
            <div className="auth_social-networks">
              <p>Login with social networks</p>
              <div className="d-flex flex-column flex-sm-row">
                <div
                  className="google-btn d-flex me-2"
                  onClick={handleGoogleLogin}
                >
                  <div className="google-icon-wrapper">
                    <img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="google button" />
                  </div>
                  <div className="d-flex align-items-center ms-2">
                    <p className="google-text mb-0">
                      <b>Sign in with google</b>
                    </p>
                  </div>
                </div>
                <div
                  className="github-btn d-flex"
                  onClick={handleGithubLogin}
                >
                  <div className="google-icon-wrapper">
                    <img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg" alt="google button" />
                  </div>
                  <div className="d-flex align-items-center ms-2">
                    <p className="github-text mb-0">
                      <b>Sign in with github</b>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <Link
              to="/auth/register"
              className="link"
            >
              Create new account
            </Link>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  )
}
