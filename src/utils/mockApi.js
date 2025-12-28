// Lightweight in-memory mock API for hackathon/demo use.
// Provides admin auth, staff registration, and fetch-all endpoints so UI dashboards can auto-update without a backend.

const adminSessions = [];
const adminProfiles = [];
const staffRecords = [];

const delay = (ms = 150) => new Promise((resolve) => setTimeout(resolve, ms));

export const mockApi = {
  async adminSignUp(payload) {
    await delay();
    // store profile if not exists
    const exists = adminProfiles.some(
      (a) => a.adminEmail.trim().toLowerCase() === payload.adminEmail.trim().toLowerCase()
    );
    if (!exists) {
      adminProfiles.push({ adminName: payload.adminName, adminEmail: payload.adminEmail });
    }
    // also record a session
    adminSessions.unshift({ ...payload });
    return { ok: true, data: payload, totalAdmins: adminProfiles.length };
  },

  async adminLogin(payload) {
    await delay();
    const exists = adminProfiles.some(
      (a) => a.adminEmail.trim().toLowerCase() === payload.adminEmail.trim().toLowerCase()
    );
    if (!exists) return { ok: false, error: 'NOT_FOUND' };
    adminSessions.unshift({ ...payload });
    return { ok: true, data: payload };
  },

  async adminAll() {
    await delay();
    return { ok: true, data: [...adminProfiles] };
  },
  async adminAuth(payload) {
    await delay();
    const record = { ...payload };
    adminSessions.push(record);
    return { ok: true, data: record, totalSessions: adminSessions.length };
  },

  async staffRegister(payload) {
    await delay();
    const record = { ...payload };
    staffRecords.unshift(record);
    return { ok: true, data: record, total: staffRecords.length };
  },

  async staffAll() {
    await delay();
    return { ok: true, data: [...staffRecords] };
  }
};

export default mockApi;
