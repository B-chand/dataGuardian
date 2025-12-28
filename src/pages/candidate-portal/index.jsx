import React, { useMemo, useState } from 'react';
import mockApi from '../../utils/mockApi';

const CandidatePortal = () => {
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
    const next = {};
    Object.entries(values).forEach(([key, val]) => {
      if (!String(val).trim()) next[key] = 'This field is required.';
    });
    return next;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMsg('');
    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    setSubmitting(true);
    const recordId = `CAND-${Date.now()}`;
    const timestamp = new Date().toISOString();

    const payload = {
      recordId,
      timestamp,
      status: 'RECEIVED',
      source: 'STAFF_REGISTRATION',
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
      // Feeds ValidationDataGrid and plots; keeps structure hackathon-friendly.
    };

    try {
      await mockApi.staffRegister(payload);
      console.log('Candidate Portal Submit:', JSON.stringify(payload, null, 2));
      setSuccessMsg('Submission successful. Dashboards updated.');
      setValues({ name: '', email: '', phone: '', dateOfBirth: '', address: '', ssn: '', skills: '' });
    } catch (err) {
      console.error('Submit failed', err);
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
    <div className="min-h-screen bg-muted/20 p-4 md:p-8">
      <div className="max-w-5xl mx-auto bg-card border border-border rounded-lg shadow-sm p-6 md:p-8 space-y-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div>
            <h2 className="text-2xl font-semibold text-foreground">Candidate Portal</h2>
            <p className="text-sm text-muted-foreground">Responsive staff registration for dashboards and validation.</p>
          </div>
          <div className="text-sm text-muted-foreground">Overall Confidence: <span className="text-foreground font-semibold">{overallConfidence}%</span></div>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit} noValidate>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[{
              name: 'name', label: 'Full Name', placeholder: 'Jane Doe', type: 'text'
            }, {
              name: 'email', label: 'Email', placeholder: 'jane.doe@example.com', type: 'email'
            }, {
              name: 'phone', label: 'Phone', placeholder: '(555) 123-4567', type: 'tel'
            }, {
              name: 'dateOfBirth', label: 'Date of Birth', placeholder: '', type: 'date'
            }, {
              name: 'address', label: 'Address', placeholder: '123 Main St, City, ST 12345', type: 'text', span: 'md:col-span-2'
            }, {
              name: 'ssn', label: 'SSN', placeholder: 'XXX-XX-XXXX', type: 'text'
            }, {
              name: 'skills', label: 'Skills (comma-separated)', placeholder: 'React, Node.js, SQL', type: 'text', span: 'md:col-span-2'
            }].map(({ name, label, placeholder, type, span }) => (
              <div key={name} className={`space-y-1 ${span || ''}`}>
                <label className="text-sm font-medium text-foreground" htmlFor={name}>{label}</label>
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
            {submitting ? 'Submitting...' : 'Submit'}
          </button>

          {successMsg && (
            <div className="text-sm text-green-600 text-center">{successMsg}</div>
          )}
        </form>
      </div>
    </div>
  );
};

export default CandidatePortal;
