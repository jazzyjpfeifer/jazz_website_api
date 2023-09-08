const express = require('express');
const router = express.Router();
const moment = require('moment');
const {google} = require('googleapis');

const {OAuth2} = google.auth;

//clientID, clientSecret
const OAuth2Client = new OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET
)

const calendar = google.calendar({version: 'v3', auth: OAuth2Client})

//refresh token
OAuth2Client.setCredentials({refresh_token: process.env.REFRESH_TOKEN})

function getEvents() {
    return new Promise(function (resolve) {
        calendar.events.list({
          calendarId: 'primary'
        }, (err, res) => {
          if (err) return console.log('The API returned an error: ' + err);
          //console.log(res.data.items)
          resolve(res.data.items);
        })
    })
  }


router.get('/api/events', async function(req, res) {
    let calendar_data = [];
    let events =  await getEvents();
    let current_year = new Date().getFullYear();
    try {
      events.map((events => {
        const calendar_events = {
          "id": events.id,
          "event_name": events.summary,
          "event_start_date_time": events.start.dateTime,
          "event_end_date_time": events.end.dateTime,
          "start_time": moment.parseZone(events.start.dateTime).format('h:mm A'),
          "end_time":moment.parseZone(events.end.dateTime).format('h:mm A'),
          "event_date_formatted": moment.parseZone(events.start.dateTime).format('MMMM Do YYYY'),
          "event_date": moment.parseZone(events.start.dateTime).format('YYYY-MM-DD'),
          "month_name": moment.parseZone(events.start.dateTime).format('MMMM'),
          "month": moment.parseZone(events.start.dateTime).format('M'),
          "event_year": moment.parseZone(events.end.dateTime).format('YYYY'),
          "location": events.location,
          "venue": events.description,
          "status": events.status};
        calendar_data.push(calendar_events)
      }))
      // Only provide current year's events
      const current_year_events = calendar_data.filter(data => data.event_year === current_year.toString());
      //console.log(current_year_events)
      res.json(current_year_events);
    } catch (err) {
        res.status(500).json({error: 'failed to load data'})
    }
});


module.exports = router;