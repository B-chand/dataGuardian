import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import mockApi from '../../utils/mockApi';

/* Landing page that toggles Admin Portal and Candidate Portal forms
// Both forms are responsive Tailwind cards and produce structured payloads
// Admin sign-ups are saved with feedDataGuardian=true (recorded into main project via mockApi)
// Candidate submissions use feedDataGuardian=false (saved to in-memory DB and update frontend dashboards)*/

const Landing = () => {
  const [mode, setMode] = useState('candidate'); // 'admin' | 'candidate'

  // Admin form state
  const [admin, setAdmin] = useState({ name: '', email: '' });
  const [adminErrors, setAdminErrors] = useState({});
  const navigate = useNavigate();

  // Candidate form state
  const [candidate, setCandidate] = useState({
    name: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    address: '',
    ssn: '',
    skills: ''
  });
  const [candErrors, setCandErrors] = useState({});
  const [candFeedback, setCandFeedback] = useState('');

  // Helpers
  const handleAdminChange = (e) => {
    const { name, value } = e.target;
    setAdmin((p) => ({ ...p, [name]: value }));
  };
  const handleCandidateChange = (e) => {
    const { name, value } = e.target;
    setCandidate((p) => ({ ...p, [name]: value }));
  };

  const validateAdmin = () => {
    const errs = {};
    if (!admin.name.trim()) errs.name = 'Name is required.';
    if (!admin.email.trim()) errs.email = 'Email is required.';
    return errs;
  };

  const validateCandidate = () => {
    const errs = {};
    Object.entries(candidate).forEach(([k, v]) => {
      if (!String(v).trim()) errs[k] = 'This field is required.';
    });
    return errs;
  };

  // ADMIN: sign-up => save admin session to DataGuardian (feedDataGuardian=true)
  const adminSignUp = async () => {
    const errs = validateAdmin();
    setAdminErrors(errs);
    if (Object.keys(errs).length) return;

    const recordId = `ADM-${Date.now()}`;
    const timestamp = new Date().toISOString();
    const payload = {
      recordId,
      adminName: admin.name.trim(),
      adminEmail: admin.email.trim(),
      recordType: 'ADMIN_SESSION',
      source: 'ADMIN_PORTAL',
      timestamp,
      feedDataGuardian: true
    };

    const res = await mockApi.adminSignUp?.(payload);
    if (res?.ok) {
      console.log('Admin Sign-Up Payload:', payload);
      // feedDataGuardian=true so session stored in main project; redirect to admin dashboard
      navigate('/data-intake-monitor');
    }
  };

  // ADMIN: login => validate against stored admins
  const adminLogin = async () => {
    const errs = validateAdmin();
    setAdminErrors(errs);
    if (Object.keys(errs).length) return;

    const recordId = `ADM-${Date.now()}`;
    const timestamp = new Date().toISOString();
    const payload = {
      recordId,
      adminName: admin.name.trim(),
      adminEmail: admin.email.trim(),
      recordType: 'ADMIN_SESSION',
      source: 'ADMIN_PORTAL',
      timestamp,
      feedDataGuardian: true
    };

    const res = await mockApi.adminLogin?.(payload);
    if (res?.ok) {
      console.log('Admin Login Payload:', payload);
      navigate('/data-intake-monitor');
    } else {
      // keep simple inline error by setting adminErrors on email
      setAdminErrors({ email: 'Admin not found. Please sign up first.' });
    }
  };

  // Candidate confidence / validation heuristics
  const skillsArray = useMemo(
    () => candidate.skills.split(',').map((s) => s.trim()).filter(Boolean),
    [candidate.skills]
  );

  const validationResults = useMemo(() => {
    const identityFilled = [candidate.name, candidate.dateOfBirth, candidate.ssn].every((v) => v.trim().length > 0);
    const contactFilled = [candidate.email, candidate.phone, candidate.address].every((v) => v.trim().length > 0);
    const identityConfidence = identityFilled ? 92 : 70;
    const contactConfidence = contactFilled ? 90 : 68;
    const skillsConfidence = skillsArray.length > 0 ? Math.min(95, 60 + skillsArray.length * 8) : 50;
    return {
      identity: { valid: identityFilled, confidence: identityConfidence },
      contact: { valid: contactFilled, confidence: contactConfidence },
      skills: { valid: skillsArray.length > 0, confidence: skillsConfidence }
    };
  }, [candidate, skillsArray]);

  const overallConfidence = useMemo(() => {
    const parts = Object.values(validationResults).map((v) => v.confidence);
    const avg = parts.reduce((a, b) => a + b, 0) / parts.length;
    return Number(avg.toFixed(2));
  }, [validationResults]);

  // Candidate submit - feedDataGuardian=false means save to DB and update frontend dashboards,
  // but not push externally. We still call mockApi.staffRegister for demo persistence.
  const candidateSubmit = async () => {
    setCandFeedback('');
    const errs = validateCandidate();
    setCandErrors(errs);
    if (Object.keys(errs).length) return;

    const recordId = `CAND-${Date.now()}`;
    const timestamp = new Date().toISOString();
    const payload = {
      recordId,
      recordType: 'EMPLOYEE',
      timestamp,
      status: 'RECEIVED',
      source: 'STAFF_REGISTRATION',
      overallConfidence,
      validationResults,
      employeeData: {
        name: candidate.name.trim(),
        email: candidate.email.trim(),
        phone: candidate.phone.trim(),
        dateOfBirth: candidate.dateOfBirth,
        address: candidate.address.trim(),
        ssn: candidate.ssn.trim(),
        skills: skillsArray
      },
      feedDataGuardian: false
    };

    await mockApi.staffRegister?.(payload);
    setCandFeedback('Submission successful. Dashboards updated.');
    console.log('Candidate Submit Payload:', payload);
    setCandidate({ name: '', email: '', phone: '', dateOfBirth: '', address: '', ssn: '', skills: '' });
  };

  // Input classes
  const inputClass = (err) =>
    `w-full rounded-md border px-3 py-2 text-sm shadow-sm transition focus:outline-none focus:ring-2 bg-background ${
      err ? 'border-red-500 focus:ring-red-400' : 'border-border focus:ring-primary/40'
    }`;

  return (
    <div className="min-h-screen bg-muted/20 p-6 md:p-12 flex items-start justify-center">
      <div className="w-full max-w-5xl space-y-6">
        <header className="text-center">
          <h1 className="text-3xl md:text-4xl font-heading font-semibold text-foreground">Welcome to DataGuardian</h1>
          <p className="text-sm text-muted-foreground mt-2">Choose a portal to get started</p>
        </header>

        <div className="flex flex-col md:flex-row items-stretch gap-4">
          <button
            onClick={() => setMode('admin')}
            className={`flex-1 p-6 rounded-lg shadow-sm border border-border text-left transition hover:shadow-md ${mode === 'admin' ? 'bg-primary text-primary-foreground' : 'bg-card text-foreground'}`}
          >
            <div className="text-lg font-semibold">Admin Portal</div>
            <div className="text-xs text-muted-foreground mt-1">Manage sessions and access dashboards</div>
          </button>

          <button
            onClick={() => setMode('candidate')}
            className={`flex-1 p-6 rounded-lg shadow-sm border border-border text-left transition hover:shadow-md ${mode === 'candidate' ? 'bg-primary text-primary-foreground' : 'bg-card text-foreground'}`}
          >
            <div className="text-lg font-semibold">Candidate Portal</div>
            <div className="text-xs text-muted-foreground mt-1">Submit candidate/employee records for validation</div>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-card border border-border rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-foreground">DataGuardian</h2>
            <div className="flex space-x-2">
              <button
                onClick={() => setMode('admin')}
                className={`px-3 py-1 rounded-md text-sm ${mode === 'admin' ? 'bg-primary text-primary-foreground' : 'bg-muted text-foreground'}`}
              >
                Admin Portal
              </button>
              <button
                onClick={() => setMode('candidate')}
                className={`px-3 py-1 rounded-md text-sm ${mode === 'candidate' ? 'bg-primary text-primary-foreground' : 'bg-muted text-foreground'}`}
              >
                Candidate Portal
              </button>
            </div>
          </div>

          {mode === 'admin' ? (
            <div>
              <p className="text-sm text-muted-foreground mb-4">Admin login / sign-up for dashboard access.</p>
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-foreground">Name</label>
                  <input name="name" value={admin.name} onChange={handleAdminChange} className={inputClass(adminErrors.name)} placeholder="Jane Doe" />
                  {adminErrors.name && <p className="text-xs text-red-500">{adminErrors.name}</p>}
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground">Email</label>
                  <input name="email" value={admin.email} onChange={handleAdminChange} className={inputClass(adminErrors.email)} placeholder="admin@dataguardian.ai" />
                  {adminErrors.email && <p className="text-xs text-red-500">{adminErrors.email}</p>}
                </div>
                <div className="flex gap-3 mt-2">
                  <button onClick={adminSignUp} className="flex-1 py-2 rounded-md bg-primary text-primary-foreground">Sign-Up</button>
                  <button onClick={adminLogin} className="flex-1 py-2 rounded-md bg-secondary text-secondary-foreground">Login</button>
                </div>
                {/* adminFeedback removed — successful sign-up/login now redirects to the admin dashboard */}
              </div>
            </div>
          ) : (
            <div>
              <p className="text-sm text-muted-foreground mb-4">Quick candidate entry for validation and duplicate detection.</p>
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-foreground">Full Name</label>
                  <input name="name" value={candidate.name} onChange={handleCandidateChange} className={inputClass(candErrors.name)} placeholder="Jane Doe" />
                  {candErrors.name && <p className="text-xs text-red-500">{candErrors.name}</p>}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="text-sm font-medium text-foreground">Email</label>
                    <input name="email" value={candidate.email} onChange={handleCandidateChange} className={inputClass(candErrors.email)} placeholder="jane@example.com" />
                    {candErrors.email && <p className="text-xs text-red-500">{candErrors.email}</p>}
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground">Phone</label>
                    <input name="phone" value={candidate.phone} onChange={handleCandidateChange} className={inputClass(candErrors.phone)} placeholder="(555) 123-4567" />
                    {candErrors.phone && <p className="text-xs text-red-500">{candErrors.phone}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="text-sm font-medium text-foreground">Date of Birth</label>
                    <input name="dateOfBirth" type="date" value={candidate.dateOfBirth} onChange={handleCandidateChange} className={inputClass(candErrors.dateOfBirth)} />
                    {candErrors.dateOfBirth && <p className="text-xs text-red-500">{candErrors.dateOfBirth}</p>}
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground">SSN</label>
                    <input name="ssn" value={candidate.ssn} onChange={handleCandidateChange} className={inputClass(candErrors.ssn)} placeholder="XXX-XX-XXXX" />
                    {candErrors.ssn && <p className="text-xs text-red-500">{candErrors.ssn}</p>}
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground">Address</label>
                  <input name="address" value={candidate.address} onChange={handleCandidateChange} className={inputClass(candErrors.address)} placeholder="123 Main St, City, ST 12345" />
                  {candErrors.address && <p className="text-xs text-red-500">{candErrors.address}</p>}
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground">Skills (comma-separated)</label>
                  <input name="skills" value={candidate.skills} onChange={handleCandidateChange} className={inputClass(candErrors.skills)} placeholder="React, Node.js, SQL" />
                  {candErrors.skills && <p className="text-xs text-red-500">{candErrors.skills}</p>}
                </div>

                <div>
                  <button onClick={candidateSubmit} className="w-full py-2 rounded-md bg-primary text-primary-foreground">Submit</button>
                </div>

                {candFeedback && <p className="text-sm mt-2 text-muted-foreground">{candFeedback}</p>}
              </div>
            </div>
          )}
        </div>

        {/*
        <aside className="bg-card border border-border rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-foreground mb-3">Portal Notes</h3>
          <ul className="text-sm text-muted-foreground space-y-2">
            <li>
              <strong>Admin Portal:</strong> sign-ups are stored with <code>feedDataGuardian=true</code> and recorded in the main DataGuardian project (used for audit sessions and dashboard access).
            </li>
            <li>
              <strong>Candidate Portal:</strong> submissions include <code>validationResults</code> and <code>overallConfidence</code> and are saved with <code>feedDataGuardian=false</code> for demo DB persistence and frontend dashboard updates.
            </li>
            <li>
              Payloads are structured to feed <code>ValidationDataGrid</code>, <code>duplicate-detection-hub</code> filters, and similarity/confidence charts.
            </li>
          </ul>
        </aside>
        */}
      </div>
      </div>
    </div>
  );
};

export default Landing;
