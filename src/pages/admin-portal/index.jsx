import React, { useEffect, useMemo, useState } from 'react';
import mockApi from '../../utils/mockApi';

const AdminPortal = () => {
  const [mode, setMode] = useState('LOGIN'); // 'LOGIN' | 'SIGN_UP'
  const [values, setValues] = useState({ name: '', email: '' });
  const [errors, setErrors] = useState({});
  const [feedback, setFeedback] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [admins, setAdmins] = useState([]);

  useEffect(() => {
    (async () => {
      const res = await mockApi.adminAll?.();
      if (res?.ok) setAdmins(res.data || []);
    })();
  }, []);

  const isKnownAdmin = useMemo(() => {
    return admins?.some((a) => a?.adminEmail?.trim().toLowerCase() === values.email.trim().toLowerCase());
  }, [admins, values.email]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const next = {};
    if (!values.name.trim()) next.name = 'Name is required.';
    if (!values.email.trim()) next.email = 'Email is required.';
    return next;
  };

  const buildSessionPayload = () => {
    const recordId = `ADM-${Date.now()}`;
    const timestamp = new Date().toISOString();
    return {
      recordId,
      adminName: values.name.trim(),
      adminEmail: values.email.trim(),
      recordType: 'ADMIN_SESSION',
      source: 'ADMIN_PORTAL',
      timestamp
    };
  };

  const onSignUp = async () => {
    const nextErrors = validate();
    setErrors(nextErrors);
    setFeedback('');
    if (Object.keys(nextErrors).length) return;

    setSubmitting(true);
    const payload = buildSessionPayload();
    const res = await mockApi.adminSignUp?.(payload);
    if (res?.ok) {
      setFeedback('Admin registered and session started.');
      const list = await mockApi.adminAll?.();
      if (list?.ok) setAdmins(list.data || []);
      console.log('Admin Sign-Up Session:', payload);
    } else {
      setFeedback('Unable to sign up admin.');
    }
    setSubmitting(false);
  };

  const onLogin = async () => {
    const nextErrors = validate();
    setErrors(nextErrors);
    setFeedback('');
    if (Object.keys(nextErrors).length) return;

    setSubmitting(true);
    const payload = buildSessionPayload();
    const res = await mockApi.adminLogin?.(payload);
    if (res?.ok) {
      setFeedback('Admin login successful. Session recorded.');
      console.log('Admin Login Session:', payload);
    } else {
      setFeedback('Admin not found. Please sign up first.');
    }
    setSubmitting(false);
  };

  const inputClass = (field) =>
    `w-full rounded-md border px-3 py-2 text-sm shadow-sm transition focus:outline-none focus:ring-2 bg-background ${
      errors[field] ? 'border-red-500 focus:ring-red-400' : 'border-border focus:ring-primary/40'
    }`;

  return (
    <div className="min-h-screen bg-muted/30 p-4 flex items-center justify-center">
      <div className="w-full max-w-lg bg-card border border-border rounded-lg shadow-sm p-6 md:p-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-semibold text-foreground">Admin Portal</h1>
            <p className="text-sm text-muted-foreground">Manage sessions for dashboard access.</p>
          </div>
          <div className="flex rounded-md overflow-hidden border border-border">
            <button
              className={`px-4 py-2 text-sm ${mode === 'LOGIN' ? 'bg-primary text-primary-foreground' : 'bg-muted text-foreground'}`}
              onClick={() => setMode('LOGIN')}
            >
              Login
            </button>
            <button
              className={`px-4 py-2 text-sm ${mode === 'SIGN_UP' ? 'bg-primary text-primary-foreground' : 'bg-muted text-foreground'}`}
              onClick={() => setMode('SIGN_UP')}
            >
              Sign-Up
            </button>
          </div>
        </div>

        <div className="space-y-4">
          <div className="space-y-1">
            <label htmlFor="name" className="text-sm font-medium text-foreground">Name</label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Jane Doe"
              value={values.name}
              onChange={handleChange}
              className={inputClass('name')}
            />
            {errors.name && <p className="text-xs text-red-500">{errors.name}</p>}
          </div>

          <div className="space-y-1">
            <label htmlFor="email" className="text-sm font-medium text-foreground">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="admin@dataguardian.ai"
              value={values.email}
              onChange={handleChange}
              className={inputClass('email')}
            />
            {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
          </div>

          <div className="flex items-center gap-3">
            {mode === 'SIGN_UP' ? (
              <button
                type="button"
                disabled={submitting}
                onClick={onSignUp}
                className="flex-1 py-2.5 rounded-md bg-primary text-primary-foreground font-medium shadow hover:opacity-90 transition disabled:opacity-70"
              >
                Sign-Up
              </button>
            ) : (
              <button
                type="button"
                disabled={submitting}
                onClick={onLogin}
                className="flex-1 py-2.5 rounded-md bg-secondary text-secondary-foreground font-medium shadow hover:opacity-90 transition disabled:opacity-70"
              >
                Login
              </button>
            )}
          </div>

          {mode === 'LOGIN' && (
            <p className="text-xs text-muted-foreground">Known admin: {isKnownAdmin ? 'Yes' : 'No'}</p>
          )}

          {feedback && (
            <div className="text-sm text-center mt-2 ${feedback.includes('successful') ? 'text-green-600' : 'text-muted-foreground'}">{feedback}</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPortal;
