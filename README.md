## Zoom web sdk implementation

An example react project with zoom sdk implementation

### Add API keys to `src/config/config.js`

> copy `src/config/config.example.js` and make a new file as `src/config/config.js`

Add the following keys to `src/config/config.js` file

```
apiKey=YOUR_ZOOM_API_KEY
apiSecret=YOUR_ZOOM_SECRET_KEY
```

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### To join the meeting, Go to

http://localhost:3000/?id=<meeting_id>&password=<meeting_password>&userName=your_name&userEmail=your_email

> it will join you as an attendee, only when host will admit the attendee to join

#### If you are the host
In `App.js` change `role` in `meetConfig` to `1`


