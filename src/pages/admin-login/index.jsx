import React, { useState } from 'react';
import mockApi from '../../utils/mockApi';

const AdminLogin = () => {
  const [values, setValues] = useState({ name: '', email: '' });
  const [errors, setErrors] = useState({});
  const [lastSession, setLastSession] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const nextErrors = {};
    if (!values.name.trim()) nextErrors.name = 'Name is required.';
    if (!values.email.trim()) nextErrors.email = 'Email is required.';
    return nextErrors;
  };

  const handleSubmit = async (action) => {
    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setSubmitting(true);
    const recordId = `ADM-${Date.now()}`;
    const timestamp = new Date().toISOString();
    const payload = {
      recordId,
      adminName: values.name.trim(),
      adminEmail: values.email.trim(),
      recordType: 'ADMIN_SESSION',
      source: 'ADMIN_PORTAL',
      timestamp,
      action
    };

    // Feeds dashboards/audit trails without a backend; stored in-memory via mockApi.
    await mockApi.adminAuth(payload);
    setLastSession(payload);
    console.log('Admin Session:', payload);
    setSubmitting(false);
  };

  const inputClass = (field) =>
    `w-full rounded-md border px-3 py-2 text-sm shadow-sm transition focus:outline-none focus:ring-2 bg-background ${
      errors[field]
        ? 'border-red-500 focus:ring-red-400'
        : 'border-border focus:ring-primary/40'
    }`;

  return (
    <div className="min-h-screen bg-muted/30 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-card border border-border rounded-lg shadow-sm p-6">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-semibold text-foreground">Admin Access</h1>
          <p className="text-sm text-muted-foreground mt-1">Sign up or login to start a session.</p>
        </div>
        <form className="space-y-4" onSubmit={(e) => e.preventDefault()} noValidate>
          <div className="space-y-1">
            <label className="block text-sm font-medium text-foreground" htmlFor="name">
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Enter your name"
              value={values.name}
              onChange={handleChange}
              className={inputClass('name')}
            />
            {errors.name && <p className="text-xs text-red-500">{errors.name}</p>}
          </div>

          <div className="space-y-1">
            <label className="block text-sm font-medium text-foreground" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="admin@example.com"
              value={values.email}
              onChange={handleChange}
              className={inputClass('email')}
            />
            {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
          </div>

          <div className="flex items-center space-x-3">
            <button
              type="button"
              disabled={submitting}
              onClick={() => handleSubmit('SIGN_UP')}
              className="flex-1 py-2.5 rounded-md bg-primary text-primary-foreground font-medium shadow hover:opacity-90 transition disabled:opacity-70"
            >
              Sign Up
            </button>
            <button
              type="button"
              disabled={submitting}
              onClick={() => handleSubmit('LOGIN')}
              className="flex-1 py-2.5 rounded-md bg-secondary text-secondary-foreground font-medium shadow hover:opacity-90 transition disabled:opacity-70"
            >
              Login
            </button>
          </div>
        </form>

        {lastSession && (
          <div className="mt-4 rounded-md bg-muted/40 p-3 text-xs text-muted-foreground">
            Session stored locally for dashboards: {lastSession.recordId} • {lastSession.timestamp}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminLogin;
