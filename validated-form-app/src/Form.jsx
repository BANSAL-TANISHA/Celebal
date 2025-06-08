// Form.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const countriesWithCities = {
  India: ['Delhi', 'Mumbai', 'Bangalore'],
  USA: ['New York', 'San Francisco', 'Chicago'],
  UK: ['London', 'Manchester', 'Bristol']
};

const Form = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '', lastName: '', username: '', email: '', password: '',
    showPassword: false, phoneCode: '+91', phoneNumber: '', country: '',
    city: '', pan: '', aadhar: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = 'First Name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last Name is required';
    if (!formData.username.trim()) newErrors.username = 'Username is required';
    if (!formData.email.match(/^[^@\s]+@[^@\s]+\.[^@\s]+$/)) newErrors.email = 'Invalid Email';
    if (!formData.password.trim()) newErrors.password = 'Password is required';
    if (!formData.phoneNumber.match(/^\d{10}$/)) newErrors.phoneNumber = 'Phone number must be 10 digits';
    if (!formData.country) newErrors.country = 'Select a country';
    if (!formData.city) newErrors.city = 'Select a city';
    if (!formData.pan.match(/^[A-Z]{5}\d{4}[A-Z]$/)) newErrors.pan = 'Invalid PAN number';
    if (!formData.aadhar.match(/^\d{12}$/)) newErrors.aadhar = 'Aadhar must be 12 digits';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      navigate('/success', { state: formData });
    }
  };

  const cities = countriesWithCities[formData.country] || [];

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: '500px', margin: 'auto' }}>
      <h2>Registration Form</h2>
      {['firstName', 'lastName', 'username', 'email', 'phoneNumber', 'pan', 'aadhar'].map((field) => (
        <div key={field}>
          <label>{field.replace(/([A-Z])/g, ' $1')}:</label>
          <input
            type="text"
            name={field}
            value={formData[field]}
            onChange={handleChange}
          />
          {errors[field] && <p style={{ color: 'red' }}>{errors[field]}</p>}
        </div>
      ))}

      <div>
        <label>Password:</label>
        <input
          type={formData.showPassword ? 'text' : 'password'}
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
        <label>
          <input
            type="checkbox"
            name="showPassword"
            checked={formData.showPassword}
            onChange={handleChange}
          /> Show Password
        </label>
        {errors.password && <p style={{ color: 'red' }}>{errors.password}</p>}
      </div>

      <div>
        <label>Phone Code:</label>
        <select name="phoneCode" value={formData.phoneCode} onChange={handleChange}>
          <option value="+91">+91 (India)</option>
          <option value="+1">+1 (USA)</option>
          <option value="+44">+44 (UK)</option>
        </select>
      </div>

      <div>
        <label>Country:</label>
        <select name="country" value={formData.country} onChange={handleChange}>
          <option value="">Select Country</option>
          {Object.keys(countriesWithCities).map((country) => (
            <option key={country} value={country}>{country}</option>
          ))}
        </select>
        {errors.country && <p style={{ color: 'red' }}>{errors.country}</p>}
      </div>

      <div>
        <label>City:</label>
        <select name="city" value={formData.city} onChange={handleChange}>
          <option value="">Select City</option>
          {cities.map((city) => (
            <option key={city} value={city}>{city}</option>
          ))}
        </select>
        {errors.city && <p style={{ color: 'red' }}>{errors.city}</p>}
      </div>

<button type="submit" disabled={Object.keys(errors).length !== 0}>Submit</button>
    </form>
  );
};

export default Form;
