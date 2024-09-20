import React, { useState } from 'react';

import './Register.css';
import { postData } from '../../../utils/ApiHandlers';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();
const API_URL = 'http://localhost:8080/user/register'
  const [formData, setFormData] = useState({
    first_name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone : '',
    address : {
      line1 : '',
      line2 : '',
      city : '',
      state : '',
      country : '',
      postal_code : ''
    }
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
  
    if (['line1', 'line2', 'city', 'state', 'country', 'postal_code'].includes(name)) {
      // Update the nested address object
      setFormData({
        ...formData,
        address: {
          ...formData.address,
          [name]: value,
        },
      });
    } else {
      // Update the main form data
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };
  

  const validateForm = () => {
    const newErrors = {};
    if (!formData.first_name) newErrors.first_name = 'first_name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
  
    try {
      const response = await postData(API_URL, formData);
      
      if (response.status === 201) {
        setSuccessMessage('Registration successful!');
        setFormData({
          first_name: '',
          last_name: '', 
          email: '',
          password: '',
          confirmPassword: '',
          address : {
           line1 : '',
           line2 : '',
           city : '',
           state : '',
           country : '',
           country : '',
           postal_Code : ''
          }
        });
        navigate('/login')
      }
    } catch (error) {
      if (error.response && error.response.data) {
        setErrors({ form: error.response.data.message || 'Registration failed' });
      } else {
        setErrors({ form: 'An error occurred. Please try again later.' });
      }
    }
  };
  

  return (
    <div className="register-container">
      <h2>Register</h2>
      {successMessage && <p className="success-message">{successMessage}</p>}
      {errors.form && <p className="error-message">{errors.form}</p>}
      <form onSubmit={handleSubmit}>
    {successMessage && <p className="success-message">{successMessage}</p>}
    {errors.form && <p className="error-message">{errors.form}</p>}
    
    {/* First Name and Last Name */}
    <div className="form-row">
        <div className="form-group">
            <label htmlFor="first_name">First Name</label>
            <input
                type="text"
                name="first_name"
                id="first_name"
                value={formData.first_name}
                onChange={handleChange}
                className={errors.first_name ? 'input-error' : ''}
            />
            {errors.first_name && <p className="error-message">{errors.first_name}</p>}
        </div>
        
        <div className="form-group">
            <label htmlFor="last_name">Last Name</label>
            <input
                type="text"
                name="last_name"
                id="last_name"
                value={formData.last_name}
                onChange={handleChange}
                className={errors.last_name ? 'input-error' : ''}
            />
            {errors.last_name && <p className="error-message">{errors.last_name}</p>}
        </div>
    </div>

    {/* Email and Phone */}
    <div className="form-row">
        <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                className={errors.email ? 'input-error' : ''}
            />
            {errors.email && <p className="error-message">{errors.email}</p>}
        </div>
        
        <div className="form-group">
            <label htmlFor="phone">Phone</label>
            <input
                type="text"
                name="phone"
                id="phone"
                value={formData.phone}
                onChange={handleChange}
                className={errors.phone ? 'input-error' : ''}
            />
            {errors.phone && <p className="error-message">{errors.phone}</p>}
        </div>
    </div>

    {/* Password and Confirm Password */}
    <div className="form-row">
        <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
                type="password"
                name="password"
                id="password"
                value={formData.password}
                onChange={handleChange}
                className={errors.password ? 'input-error' : ''}
            />
            {errors.password && <p className="error-message">{errors.password}</p>}
        </div>
        
        <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={errors.confirmPassword ? 'input-error' : ''}
            />
            {errors.confirmPassword && <p className="error-message">{errors.confirmPassword}</p>}
        </div>
    </div>

    {/* Additional fields can be handled similarly */}
    <div className="form-row">
        <div className="form-group">
          <label htmlFor="line1">Address Line 1</label>
          <input
            type="line1"
            name="line1"
            id="line1"
            value={formData.address.line1}
            onChange={handleChange}
            className={errors.line1 ? 'input-error' : ''}
          />
          {errors.line1 && <p className="error-message">{errors.line1}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="line2">Address Line 2</label>
          <input
            type="line2"
            name="line2"
            id="line2"
            value={formData.address.line2}
            onChange={handleChange}
            className={errors.line2 ? 'input-error' : ''}
          />
          {errors.line2 && <p className="error-message">{errors.line2}</p>}
        </div>
    </div>
    <div className='form-row'>
    <div className="form-group">
          <label htmlFor="city">City</label>
          <input
            type="city"
            name="city"
            id="city"
            value={formData.address.city}
            onChange={handleChange}
            className={errors.city ? 'input-error' : ''}
          />
          {errors.city && <p className="error-message">{errors.city}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="state">State</label>
          <input
            type="state"
            name="state"
            id="state"
            value={formData.address.state}
            onChange={handleChange}
            className={errors.state ? 'input-error' : ''}
          />
          {errors.state && <p className="error-message">{errors.state}</p>}
        </div>
      
    </div>
    <div className='form-row'>
        <div className="form-group">
          <label htmlFor="country">Country</label>
          <input
            type="country"
            name="country"
            id="country"
            value={formData.address.country}
            onChange={handleChange}
            className={errors.country ? 'input-error' : ''}
          />
          {errors.country && <p className="error-message">{errors.country}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="postCode">Postal Code</label>
          <input
            type="postCode"
            name="postCode"
            id="postCode"
            value={formData.address.postal_Code}
            onChange={handleChange}
            className={errors.postCode ? 'input-error' : ''}
          />
          {errors.postCode && <p className="error-message">{errors.postCode}</p>}
        </div>
        </div>
    <button type="submit" className="register-button">Register</button>
</form>

    </div>
  );
};

export default Register;
