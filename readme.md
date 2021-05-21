1. npm i
2. create and add credentials in .env file - with service account method
https://theoephraim.github.io/node-google-spreadsheet/#/getting-started/authentication
3. replace google acc private key in `services/google_sheet.js` line 31 inside `useServiceAccountAuth`.
4. create google sheet in agreed format
5. replace sheet id (from sheet url) in`services/google_sheet.js` line 5
6. run with `node index.js`
7. use commands to send message and accept group invite
