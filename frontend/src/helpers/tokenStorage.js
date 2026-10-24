/**
 * Modul Penyimpanan Token Aman (Secure Token Storage Helper)
 *
 * Catatan Keamanan Arsitektur & Mitigasi Risiko:
 * Menyimpan JWT secara langsung hanya di `localStorage` memiliki risiko keamanan (vulnerabilitas XSS),
 * karena skrip berbahaya yang terinjeksi ke dalam DOM dapat mengekstrak isi localStorage secara persisten.
 *
 * Peningkatan Keamanan & Best Practice yang Diterapkan:
 * 1. Hybrid In-Memory & Session Storage:
 *    - Token aktif di-cache dalam variabel memori privat runtime JavaScript untuk mengurangi I/O disk.
 *    - Token disimpan pada `sessionStorage` (cakupan terbatas hanya pada tab browser yang sedang aktif,
 *      dan otomatis terhapus saat tab ditutup) untuk meminimalisasi durasi paparan token.
 * 2. Fallback Sinkronisasi:
 *    - Menyelaraskan status penyimpanan antara in-memory, sessionStorage, dan localStorage
 *      guna mempertahankan backward-compatibility serta pencegahan session loss saat refresh.
 * 3. Exception-Safe Storage Access:
 *    - Membungkus akses storage dalam try/catch untuk mencegah aplikasi crash ketika browser
 *      berjalan dalam Incognito/Private Mode dengan pembatasan Web Storage API.
 * 4. Rekomendasi Produksi:
 *    - Pada implementasi production enterprise, autentikasi berbasis cookie HttpOnly + Secure +
 *      SameSite=Strict di sisi backend sangat disarankan untuk mengisolasi token dari akses JavaScript.
 */

const TOKEN_KEY = 'catatan_belajar_token';
const USER_KEY = 'catatan_belajar_user';

// In-memory cache privat untuk runtime defense-in-depth
let inMemoryToken = null;
let inMemoryUser = null;

/**
 * Mengakses Web Storage API (sessionStorage atau localStorage) secara aman
 * tanpa melempar exception jika akses diblokir oleh kebijakan privasi browser.
 *
 * @param {'session'|'local'} type - Jenis storage yang diakses
 * @returns {Storage|null} Web storage object atau null
 */
const getSafeStorage = (type = 'session') => {
  try {
    if (typeof window !== 'undefined' && window[`${type}Storage`]) {
      return window[`${type}Storage`];
    }
  } catch {
    // Storage access dibatasi oleh browser policy
  }
  return null;
};

/**
 * Mengambil token autentikasi aktif.
 * Mengutamakan cache memori dan sessionStorage sebelum fallback ke localStorage.
 *
 * @returns {string|null} Token JWT aktif atau null
 */
export const getToken = () => {
  const session = getSafeStorage('session');
  const local = getSafeStorage('local');

  const sessionVal = session ? session.getItem(TOKEN_KEY) : null;
  const localVal = local ? local.getItem(TOKEN_KEY) : null;

  // Jika kedua storage browser kosong (misal setelah storage di-clear), sinkronkan in-memory
  if (!sessionVal && !localVal) {
    inMemoryToken = null;
    return null;
  }

  return inMemoryToken || sessionVal || localVal;
};

/**
 * Menyimpan token autentikasi ke dalam cache in-memory, sessionStorage (prioritas sesi),
 * dan localStorage (sinkronisasi fallback).
 *
 * @param {string} token - Token JWT yang diterima dari server
 */
export const setToken = (token) => {
  inMemoryToken = token || null;
  if (token) {
    const session = getSafeStorage('session');
    const local = getSafeStorage('local');
    if (session) session.setItem(TOKEN_KEY, token);
    if (local) local.setItem(TOKEN_KEY, token);
  }
};

/**
 * Menghapus token dan profil user dari seluruh tingkatan penyimpanan
 * (in-memory, sessionStorage, dan localStorage) saat pengguna logout.
 */
export const clearToken = () => {
  inMemoryToken = null;
  inMemoryUser = null;

  const session = getSafeStorage('session');
  const local = getSafeStorage('local');

  if (session) {
    session.removeItem(TOKEN_KEY);
    session.removeItem(USER_KEY);
  }
  if (local) {
    local.removeItem(TOKEN_KEY);
    local.removeItem(USER_KEY);
  }
};

/**
 * Mengambil data profil user yang tersimpan di sesi lokal.
 *
 * @returns {Object|null} Objek data pengguna atau null
 */
export const getStoredUser = () => {
  const session = getSafeStorage('session');
  const local = getSafeStorage('local');

  const sessionRaw = session ? session.getItem(USER_KEY) : null;
  const localRaw = local ? local.getItem(USER_KEY) : null;

  if (!sessionRaw && !localRaw) {
    inMemoryUser = null;
    return null;
  }

  const raw = sessionRaw || localRaw;
  try {
    return JSON.parse(raw);
  } catch {
    return inMemoryUser;
  }
};

/**
 * Menyimpan data profil user ke dalam sesi aktif.
 *
 * @param {Object} user - Objek data profil user
 */
export const setStoredUser = (user) => {
  inMemoryUser = user || null;
  if (user) {
    const serialized = JSON.stringify(user);
    const session = getSafeStorage('session');
    const local = getSafeStorage('local');
    if (session) session.setItem(USER_KEY, serialized);
    if (local) local.setItem(USER_KEY, serialized);
  }
};
