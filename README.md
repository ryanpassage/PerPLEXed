# PerPLEXed
Chrome extension for a local Plex Manufacturing Cloud employee kiosk.

My employer uses the Plex Manufacturing Cloud (https://www.plex.com) for our ERP system.  We wanted to set up an employee kiosk that would let people log in to check things like vacation time, sick time, etc.  Most of our production members don't know their logins, so we created an internal database with usernames and passwords, and associated them with two pieces of information that each member should know: their employee number and badge number.

The extension talks to a small Flask API running on an internal server that can check the database to verify the member's identity.  It then populates the Plex login from with their credentials and logs them in.

The Flask API is available in another repository.
