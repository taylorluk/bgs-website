/**
 * Netlify Function — BGS Technologies Lead Submission
 * Receives form data and creates a contact in GoHighLevel CRM.
 * API key is stored as the NETLIFY env variable: GHL_API_KEY
 */

exports.handler = async function (event) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const data = JSON.parse(event.body || '{}');

    // Parse name into first/last
    const fullName = (data['full-name'] || data.name || '').trim();
    const nameParts = fullName.split(' ');
    const firstName = nameParts[0] || '';
    const lastName = nameParts.slice(1).join(' ') || '';

    // Build tags from form data
    const tags = ['website-lead'];
    if (data.service) tags.push(data.service);
    if (data.budget) tags.push(`budget-${data.budget}`);
    if (data.referral) tags.push(`source-${data.referral}`);

    const ghlPayload = {
      firstName,
      lastName,
      name: fullName,
      email: data.email || '',
      phone: data.phone || '',
      companyName: data.company || '',
      source: 'Website Contact Form',
      tags,
      customField: [
        data.country  && { id: 'country',  field_value: data.country },
        data.service  && { id: 'service_interest', field_value: data.service },
        data.budget   && { id: 'budget',   field_value: data.budget },
        data.message  && { id: 'message',  field_value: data.message },
        data.referral && { id: 'referral_source', field_value: data.referral },
      ].filter(Boolean),
    };

    const response = await fetch('https://services.leadconnectorhq.com/contacts/', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.GHL_API_KEY}`,
        'Content-Type': 'application/json',
        Version: '2021-07-28',
      },
      body: JSON.stringify(ghlPayload),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error('GHL API error:', response.status, errText);
      // Return 200 to user — we don't want form errors to show because of CRM issues
      return {
        statusCode: 200,
        body: JSON.stringify({ success: true, crm: 'failed' }),
      };
    }

    const result = await response.json();
    console.log('GHL contact created:', result?.contact?.id);

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ success: true, contactId: result?.contact?.id }),
    };
  } catch (err) {
    console.error('submit-lead error:', err);
    return {
      statusCode: 200, // Still 200 — don't break the user experience
      body: JSON.stringify({ success: true, error: err.message }),
    };
  }
};
