// Atomic Coffee Roasters — Wholesale Training Request Handler
// Paste this into Google Apps Script (script.google.com), deploy as a Web App,
// then copy the deployment URL into index.html where it says YOUR_APPS_SCRIPT_URL_HERE.

const SHEET_NAME      = 'Training Requests';
const NOTIFY_EMAIL    = 'john.corredor@atomicroastery.com';
const SHEET_URL       = 'https://docs.google.com/spreadsheets/d/1LrKa_un2EmTS6znlAnLQrLXJj5REkjhFJp5dWBXyvwk/edit#gid=21216591';

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const ss    = SpreadsheetApp.getActiveSpreadsheet();
    let sheet   = ss.getSheetByName(SHEET_NAME);

    // Create sheet + header row on first run
    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
      sheet.appendRow([
        'Submitted At',
        'Business Name',
        'Contact Name',
        'Email',
        'Phone',
        'Seats',
        'Attendee Names',
        'Day Rank (1st → 5th)',
        'Time Rank (1st → 2nd)',
        'Notes',
        'Status'
      ]);
      sheet.getRange(1, 1, 1, 11).setFontWeight('bold').setBackground('#1c1008').setFontColor('#d4a96a');
      sheet.setFrozenRows(1);
    }

    const submittedAt = data.submitted_at || new Date().toLocaleString();

    sheet.appendRow([
      submittedAt,
      data.business      || '',
      data.contact_name  || '',
      data.email         || '',
      data.phone         || '',
      data.seats         || 1,
      data.attendees     || '',
      data.day_rank      || '',
      data.time_rank     || '',
      data.notes         || '',
      'Pending'
    ]);

    // Auto-resize columns for readability
    sheet.autoResizeColumns(1, 11);

    // Email notification
    const subject = '☕ New Training Request — ' + (data.business || 'Unknown Business');
    const body = [
      'New wholesale training request submitted.',
      '',
      'Business:   ' + (data.business     || '—'),
      'Contact:    ' + (data.contact_name  || '—'),
      'Email:      ' + (data.email         || '—'),
      'Phone:      ' + (data.phone         || '—'),
      'Seats:      ' + (data.seats         || '—'),
      'Attendees:  ' + (data.attendees     || '—'),
      'Day Pref:   ' + (data.day_rank      || '—'),
      'Time Pref:  ' + (data.time_rank     || '—'),
      'Notes:      ' + (data.notes         || '—'),
      '',
      'View sheet: ' + SHEET_URL
    ].join('\n');

    MailApp.sendEmail(NOTIFY_EMAIL, subject, body);

    return ContentService
      .createTextOutput(JSON.stringify({ status: 'ok' }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'error', message: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
