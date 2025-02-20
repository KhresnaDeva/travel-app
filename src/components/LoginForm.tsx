import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from '../store/slices/authSlice';
import { login } from '../utils/api';
import type { AppDispatch } from '../store/store';

const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const formik = useFormik({
    initialValues: {
      identifier: '',
      password: '',
    },
    validationSchema: Yup.object({
      identifier: Yup.string().email('Invalid email address').required('Required'),
      password: Yup.string().required('Required'),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const response = await login(values);
        dispatch(setUser(response.user));
        localStorage.setItem('token', response.jwt);
        navigate('/home');
      } catch (error) {
        let errorMessage = 'Login failed. Please check your credentials.';

        if (error instanceof Error) {
          errorMessage = error.message;
        }

        alert(errorMessage);
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <form onSubmit={formik.handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="identifier" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            id="identifier"
            name="identifier"
            type="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.identifier}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
          {formik.touched.identifier && formik.errors.identifier ? (
            <div className="text-red-500 text-sm">{formik.errors.identifier}</div>
          ) : null}
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
          {formik.touched.password && formik.errors.password ? (
            <div className="text-red-500 text-sm">{formik.errors.password}</div>
          ) : null}
        </div>

        <button
          type="submit"
          disabled={formik.isSubmitting}
          className={`w-full text-white py-2 px-4 rounded-md ${
            formik.isSubmitting ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'
          }`}
        >
          {formik.isSubmitting ? 'Logging in...' : 'Login'}
        </button>
      </form>

      {/* Button Register */}
      <div className="text-center mt-4">
        <p className="text-sm">Don't have an account?</p>
        <button
          onClick={() => navigate('/register')}
          className="mt-2 bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600"
        >
          Register
        </button>
      </div>
    </div>
  );
};

export default LoginForm;
