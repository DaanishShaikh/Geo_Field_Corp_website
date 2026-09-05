// API Helper with automatic error formatting & credential handling

const API_BASE = '/api';

export async function request(endpoint, options = {}) {
  const url = endpoint.startsWith('http') ? endpoint : `${API_BASE}${endpoint}`;
  
  const defaultHeaders = {
    'Content-Type': 'application/json',
  };

  const config = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...(options.headers || {}),
    },
    credentials: 'include', // Ensures Flask-Login cookies are passed
  };

  try {
    const res = await fetch(url, config);
    const contentType = res.headers.get('content-type') || '';
    
    let data;
    if (contentType.includes('application/json')) {
      data = await res.json();
    } else {
      data = await res.text();
    }

    if (!res.ok) {
      const errMsg = (data && data.error) ? data.error : (typeof data === 'string' ? data : 'API request failed');
      const error = new Error(errMsg);
      error.status = res.status;
      error.data = data;
      throw error;
    }

    return data;
  } catch (err) {
    if (!navigator.onLine) {
      err.isOffline = true;
    }
    throw err;
  }
}

export const api = {
  // Auth
  login: (email, password) => request('/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) }),
  register: (payload) => request('/auth/register', { method: 'POST', body: JSON.stringify(payload) }),
  logout: () => request('/auth/logout', { method: 'POST' }),
  getMe: () => request('/auth/me'),

  // Seller
  getSellerDashboard: () => request('/seller/dashboard'),
  getSellerReceipts: () => request('/seller/receipts'),
  createReceipt: (requested_volume) => request('/seller/receipts', { method: 'POST', body: JSON.stringify({ requested_volume }) }),
  getReceiptQr: (receiptId) => request(`/seller/receipts/${receiptId}/qr`),
  updateSellerProfileLocation: (payload) => request('/seller/profile/location', { method: 'PATCH', body: JSON.stringify(payload) }),

  // Agent
  getAgentManifest: () => request('/agent/manifest'),
  scanSiteQr: (qr_code) => request('/agent/scan/site', { method: 'POST', body: JSON.stringify({ qr_code }) }),
  scanReceiptQr: (qr_code) => request('/agent/scan/receipt', { method: 'POST', body: JSON.stringify({ qr_code }) }),
  settleReceipt: (receiptId, payload) => request(`/agent/receipts/${receiptId}/settle`, { method: 'POST', body: JSON.stringify(payload) }),
  syncOfflineQueue: (queue) => request('/agent/sync/offline', { method: 'POST', body: JSON.stringify({ queue }) }),
  updateAgentGps: (latitude, longitude) => request('/agent/location', { method: 'PATCH', body: JSON.stringify({ latitude, longitude }) }),


  // Admin
  getAdminOverview: () => request('/admin/overview'),
  getAdminUsers: (params = {}) => {
    const qs = new URLSearchParams(params).toString();
    return request(`/admin/users${qs ? '?' + qs : ''}`);
  },
  updateUserStatus: (userId, status) => request(`/admin/users/${userId}/status`, { method: 'PATCH', body: JSON.stringify({ status }) }),
  getAdminReceipts: (params = {}) => {
    const qs = new URLSearchParams(params).toString();
    return request(`/admin/receipts${qs ? '?' + qs : ''}`);
  },
  toggleFlagReceipt: (receiptId, reason) => request(`/admin/receipts/${receiptId}/flag`, { method: 'POST', body: JSON.stringify({ reason }) }),
  getRateCard: () => request('/admin/rate-card'),
  updateRateCard: (payload) => request('/admin/rate-card', { method: 'POST', body: JSON.stringify(payload) }),
  getLiveFleet: () => request('/admin/fleet/live'),
  injectStop: (agent_id, seller_id) => request('/admin/routing/inject-stop', { method: 'POST', body: JSON.stringify({ agent_id, seller_id }) }),
  updateSellerLocation: (seller_id, payload) => request(`/admin/sellers/${seller_id}/location`, { method: 'PATCH', body: JSON.stringify(payload) }),
  getBiodieselBatches: () => request('/admin/compliance/batches'),
  createBiodieselBatch: (payload) => request('/admin/compliance/batches', { method: 'POST', body: JSON.stringify(payload) }),
  getAuditLogs: () => request('/admin/audit-logs'),
  seedDemoData: () => request('/admin/seed', { method: 'POST' }),

  // General & Certificate Download URL
  getCertificateDownloadUrl: (receiptId) => `/api/certificates/${receiptId}/download`,
};

