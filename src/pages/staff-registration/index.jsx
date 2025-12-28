import React, { useMemo, useState } from 'react';
import mockApi from '../../utils/mockApi';

const StaffRegistration = () => {
  const [values, setValues] = useState({
    name: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    address: '',
    ssn: '',
    skills: ''
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  const skillsArray = useMemo(
    () => values.skills.split(',').map((s) => s.trim()).filter(Boolean),
    [values.skills]
  );

  // Lightweight heuristic for confidence used by dashboards/duplicate detection visuals.
  const validationResults = useMemo(() => {
    const identityFilled = [values.name, values.dateOfBirth, values.ssn].every((v) => v.trim().length > 0);
    const contactFilled = [values.email, values.phone, values.address].every((v) => v.trim().length > 0);
    const identityConfidence = identityFilled ? 92 : 70;
    const contactConfidence = contactFilled ? 90 : 68;
    const skillsConfidence = skillsArray.length > 0 ? Math.min(95, 60 + skillsArray.length * 8) : 50;

    return {
      identity: { valid: identityFilled, confidence: identityConfidence },
      contact: { valid: contactFilled, confidence: contactConfidence },
      skills: { valid: skillsArray.length > 0, confidence: skillsConfidence }
    };
  }, [values.name, values.dateOfBirth, values.ssn, values.email, values.phone, values.address, skillsArray]);

  const overallConfidence = useMemo(() => {
    const parts = Object.values(validationResults).map((v) => v.confidence);
    const avg = parts.reduce((a, b) => a + b, 0) / parts.length;
    return Number(avg.toFixed(2));
  }, [validationResults]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const nextErrors = {};
    Object.entries(values).forEach(([key, val]) => {
      if (!String(val).trim()) nextErrors[key] = 'This field is required.';
    });
    return nextErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMsg('');
    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setSubmitting(true);
    const recordId = `EMP-${Date.now()}`;
    const timestamp = new Date().toISOString();

    const payload = {
      source: 'CLIENT_PORTAL',
      recordType: 'EMPLOYEE',
      status: 'RECEIVED',
      recordId,
      timestamp,
      overallConfidence,
      validationResults,
      employeeData: {
        name: values.name.trim(),
        email: values.email.trim(),
        phone: values.phone.trim(),
        dateOfBirth: values.dateOfBirth,
        address: values.address.trim(),
        ssn: values.ssn.trim(),
        skills: skillsArray
      }
      // Feeds dashboards: validationResults/confidence for ValidationDataGrid; recordType/source for filters; employeeData for matching.
    };

    try {
      await mockApi.staffRegister(payload);
      console.log('Staff Register POST -> /api/staff/register', JSON.stringify(payload, null, 2));
      setSuccessMsg('Record submitted successfully.');
      setValues({ name: '', email: '', phone: '', dateOfBirth: '', address: '', ssn: '', skills: '' });
    } catch (err) {
      console.error('Mock submit failed', err);
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass = (field) =>
    `w-full rounded-md border px-3 py-2 text-sm shadow-sm transition focus:outline-none focus:ring-2 bg-background ${
      errors[field]
        ? 'border-red-500 focus:ring-red-400'
        : 'border-border focus:ring-primary/40'
    }`;

  return (
    <div className="min-h-screen bg-muted/30 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl bg-card border border-border rounded-lg shadow-sm p-6">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-semibold text-foreground">Candidate / Employee Entry</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Structured records for dashboards, validation, and duplicate detection.
          </p>
          <p className="text-xs text-muted-foreground mt-1">Overall Confidence: {overallConfidence}%</p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit} noValidate>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[{
              name: 'name', label: 'Full Name', placeholder: 'Full name', type: 'text'
            }, {
              name: 'email', label: 'Email', placeholder: 'user@example.com', type: 'email'
            }, {
              name: 'phone', label: 'Phone Number', placeholder: '(555) 123-4567', type: 'tel'
            }, {
              name: 'dateOfBirth', label: 'Date of Birth', placeholder: '', type: 'date'
            }, {
              name: 'address', label: 'Address', placeholder: 'Street, City, State, ZIP', type: 'text', span: 'md:col-span-2'
            }, {
              name: 'ssn', label: 'Social Security Number', placeholder: 'XXX-XX-XXXX', type: 'text'
            }, {
              name: 'skills', label: 'Skills (comma-separated)', placeholder: 'React, Node.js, SQL', type: 'text', span: 'md:col-span-2'
            }].map(({ name, label, placeholder, type, span }) => (
              <div key={name} className={`space-y-1 ${span || ''}`}>
                <label className="block text-sm font-medium text-foreground" htmlFor={name}>
                  {label}
                </label>
                <input
                  id={name}
                  name={name}
                  type={type}
                  placeholder={placeholder}
                  value={values[name]}
                  onChange={handleChange}
                  className={inputClass(name)}
                />
                {errors[name] && <p className="text-xs text-red-500">{errors[name]}</p>}
              </div>
            ))}
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full py-3 rounded-md bg-primary text-primary-foreground font-medium shadow hover:opacity-90 transition disabled:opacity-70"
          >
            {submitting ? 'Submitting...' : 'Submit Record'}
          </button>

          {successMsg && (
            <div className="text-sm text-green-600 text-center">{successMsg}</div>
          )}
        </form>
      </div>
    </div>
  );
};

export default StaffRegistration;
