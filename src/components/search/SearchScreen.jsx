import React, { useMemo, useState } from 'react'
import { HeroGrid } from '../hero/HeroGrid';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { Navbar } from '../ui/Navbar';
import { getHeroesByName } from '../../helpers/getHeroes';
import { useLocation } from 'react-router-dom';

export const SearchScreen = ({ history }) => {

  const query = new URLSearchParams(useLocation().search);
  const q = query.get('q') || '';
  const [heroes, setHeroes] = useState([]);

  useMemo(() => getHeroesByName( q ), [q]).then((heroes) => setHeroes(heroes));

  return (
    <>
      <Navbar />
      <div className="search mt-3">
        <h1 className="text-center">Look for a hero</h1>
        <div className="row mt-5 flex-column align-items-center">
          <div className="col-6 mb-3">
            <h4>Search</h4>
            <hr />
            <Formik
              initialValues={{ name: q }}
              validate={values => {
                const errors = {};
                if (!values.name) {
                  errors.name = 'Required';
                }
                return errors;
              }}
              onSubmit={(values) => {
                history.push(`?q=${values.name}`);
              }}
            >
              <Form
                className="d-grid gap-2"
              >
                <Field
                  type="text"
                  name="name"
                  className="form-control"
                  autoComplete="off"
                  placeholder="Find your hero"
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="alert alert-danger"
                />
                <button
                  type="submit"
                  className="btn m-1 btn-outline-primary"
                >
                  Submit
                </button>
              </Form>
            </Formik>
          </div>
          <div className="col-11 mt-5">
            <h4>Results</h4>
            <hr />
            <HeroGrid heroes={heroes} />
          </div>
        </div>
      </div >
    </>
  )

}