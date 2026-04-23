const axios = require('axios');

const BASE_URL = 'https://wu.cdv.pl';

const commonHeaders = {
  'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15',
  'X-Requested-With': 'XMLHttpRequest',
  Referer: `${BASE_URL}/?page=Schedule&view=student`,
};

async function login(req, res) {
  const { login, password } = req.body;
  if (!login || !password) return res.status(400).json({ error: 'login and password required' });

  try {
    const params = new URLSearchParams({
      redirectURL: `${BASE_URL}/?page=Main`,
      login,
      password,
    });

    const response = await axios.post(`${BASE_URL}/?login=1`, params.toString(), {
      headers: {
        ...commonHeaders,
        'Content-Type': 'application/x-www-form-urlencoded',
        Origin: BASE_URL,
      },
      maxRedirects: 0,
      validateStatus: s => s === 302 || s === 200,
    });

    const setCookies = response.headers['set-cookie'] || [];
    let sessionCookie = null;
    let langCookie = null;

    for (const c of setCookies) {
      const match = c.match(/^([^=]+)=([^;]+)/);
      if (match && match[1] === 'WU_PHPSESSID') sessionCookie = match[2];
      if (match && match[1] === 'loginLanguage') langCookie = match[2];
    }

    if (!sessionCookie || response.status !== 302) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    return res.json({ session: sessionCookie, language: langCookie || '1' });
  } catch (err) {
    console.error('Login error:', err.message);
    return res.status(500).json({ error: 'Login failed' });
  }
}

async function schedule(req, res) {
  const { session, start, end } = req.body;
  if (!session) return res.status(401).json({ error: 'No session' });

  try {
    const params = new URLSearchParams({ poczatek: start, koniec: end });
    const response = await axios.post(
      `${BASE_URL}/ajax.php?action=get-student-plan`,
      params.toString(),
      {
        headers: {
          ...commonHeaders,
          'Content-Type': 'application/x-www-form-urlencoded',
          Cookie: `WU_PHPSESSID=${session}; loginLanguage=1`,
          Origin: BASE_URL,
        },
      }
    );

    if (response.data.error_code !== 0) {
      return res.status(401).json({ error: 'Session expired' });
    }

    return res.json(response.data);
  } catch (err) {
    console.error('Schedule error:', err.message);
    return res.status(500).json({ error: 'Failed to fetch schedule' });
  }
}

async function classDetails(req, res) {
  const { session, room_id, teacher_id, term_id, group_id } = req.body;
  if (!session) return res.status(401).json({ error: 'No session' });

  try {
    const params = new URLSearchParams({ room_id, teacher_id, term_id, group_id });
    const response = await axios.post(
      `${BASE_URL}/ajax.php?action=get-classes-term-details-for-student`,
      params.toString(),
      {
        headers: {
          ...commonHeaders,
          'Content-Type': 'application/x-www-form-urlencoded',
          Cookie: `WU_PHPSESSID=${session}; loginLanguage=1`,
          Origin: BASE_URL,
        },
      }
    );

    return res.json(response.data);
  } catch (err) {
    console.error('Details error:', err.message);
    return res.status(500).json({ error: 'Failed to fetch details' });
  }
}

module.exports = {
  login,
  schedule,
  classDetails,
};
