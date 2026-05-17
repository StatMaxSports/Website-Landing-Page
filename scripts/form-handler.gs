/**
 * Stat Max Enquiry Form Handler
 * 
 * Instructions:
 * 1. Create a new Google Sheet.
 * 2. Go to Extensions > Apps Script.
 * 3. Delete any existing code and paste this in.
 * 4. Click 'Deploy' > 'New Deployment'.
 * 5. Select 'Web App'.
 * 6. Set 'Execute as' to 'Me'.
 * 7. Set 'Who has access' to 'Anyone'.
 * 8. Copy the Web App URL and paste it into index.js (the SCRIPT_URL variable).
 */

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.tryLock(10000);
  
  try {
    var doc = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = doc.getSheets()[0]; // Use the first sheet
    
    // Create headers if sheet is empty
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(['Timestamp', 'Full Name', 'Email', 'Phone', 'Message']);
    }
    
    var data = JSON.parse(e.postData.contents);
    var timestamp = new Date();
    
    // Append the data to the sheet
    sheet.appendRow([
      timestamp,
      data.fullName || 'N/A',
      data.email || 'N/A',
      data.phone || 'N/A',
      data.message || 'N/A'
    ]);
    
    // Send Email Notification
    var recipient = "contact@statmax.com.au";
    var subject = "New Stat Max Enquiry: " + (data.fullName || 'Anonymous');
    var body = "You have a new enquiry from the Stat Max landing page.\n\n" +
               "Name: " + data.fullName + "\n" +
               "Email: " + data.email + "\n" +
               "Phone: " + (data.phone || 'Not provided') + "\n" +
               "Message: \n" + data.message + "\n\n" +
               "View in Google Sheets: " + doc.getUrl();
    
    MailApp.sendEmail(recipient, subject, body);
    
    return ContentService
      .createTextOutput(JSON.stringify({ 'result': 'success' }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ 'result': 'error', 'error': error }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}
