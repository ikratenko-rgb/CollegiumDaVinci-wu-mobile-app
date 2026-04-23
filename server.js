const express = require('express');
const axios = require('axios');
const cookieParser = require('cookie-parser');
const path = require('path');
const { rateLimit } = require('express-rate-limit');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many requests, slow down.' },
});

app.use('/api/', apiLimiter);

const BASE_URL = 'https://wu.cdv.pl';

const commonHeaders = {
  'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15',
  'X-Requested-With': 'XMLHttpRequest',
  'Referer': `${BASE_URL}/?page=Schedule&view=student`,
};

app.post('/api/login', async (req, res) => {
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
        'Origin': BASE_URL,
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

    res.json({ session: sessionCookie, language: langCookie || '1' });
  } catch (err) {
    console.error('Login error:', err.message);
    res.status(500).json({ error: 'Login failed' });
  }
});

app.post('/api/schedule', async (req, res) => {
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
          'Cookie': `WU_PHPSESSID=${session}; loginLanguage=1`,
          'Origin': BASE_URL,
        },
      }
    );

    if (response.data.error_code !== 0) {
      return res.status(401).json({ error: 'Session expired' });
    }

    res.json(response.data);
  } catch (err) {
    console.error('Schedule error:', err.message);
    res.status(500).json({ error: 'Failed to fetch schedule' });
  }
});

app.post('/api/class-details', async (req, res) => {
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
          'Cookie': `WU_PHPSESSID=${session}; loginLanguage=1`,
          'Origin': BASE_URL,
        },
      }
    );

    res.json(response.data);
  } catch (err) {
    console.error('Details error:', err.message);
    res.status(500).json({ error: 'Failed to fetch details' });
  }
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));