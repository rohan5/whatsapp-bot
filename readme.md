# BEAT-COVID WHATSAPP BOT
## INSTALLATION
1. install node.js -> Download file from https://nodejs.org/en/download/ for your OS and execute it.
2. Clone Repo
3. npm i
4. Add .env file at the root
5. Create required google sheets
6. start with node `node index.js`. -> Scan code from console
### Get Google creds AND PREPARE .env FILE
(GET SAMPLE .env FIRST)
1. create Google creds following - https://theoephraim.github.io/node-google-spreadsheet/#/getting-started/authentication with with `service account method`.
2. Add client_email and private_key received in above STEP to .env
3. Create 3 google sheets with agreed format. Take Sheet ids from URL
e.g https://docs.google.com/spreadsheets/d/xxxxxxxxxxxxxxxxxxxxx/
4. Add sheet ids - xxxxxxxxxxx from above STEP to .env file for each corresponding sheet.
5. At the end .env must have (2 + number_of_g_sheets) entries.
6. Share these sheets withh client_email obtained in first step.

### TEChnical MANAGEMENT
1. Delays in ms can be configured in constants.json in config in DELAYS section.

### GOOGLE SHEET MANAGAMENT AND COMMANDS
e.g. BULK MESSAGE
1. Add active - yes/no and message - xyz in google sheet.
2. only rows with active - yes will be consumed for operation
3. Once sheet is prepared someone with authority can trigger operation by sending `INITIATE_XXX` command to registered number.

NOTES -
1. google document name desn't matter
2. Sheets name inside document needs to be accurate


## FEATURES
1. Messages will be automatically logged to Google sheet if project is running.
2. Other operations supported and need to be triggered by commands are -
    1. Bulk message 
    2. Accept group invite
