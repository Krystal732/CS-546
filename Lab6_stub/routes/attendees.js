// Import the express router as shown in the lecture code
// Note: please do not forget to export the router!
import {Router} from 'express';
const router = Router();
import {attendeesData} from '../data/index.js';
import {eventsData} from '../data/index.js';
import {checkId, attendee_validation} from '../helpers.js'

router
  .route('/:eventId')
  .get(async (req, res) => {
    //code here for GET
    try {
      req.params.eventId = checkId(req.params.eventId, 'eventId');
    } catch (e) {
      return res.status(400).json({error: e});
    }
    //find event
    try {
      await eventsData.get(req.params.eventId);
    } catch (e) {
      return res.status(404).json({error: e});
    }
    //get attendees
    try {
      let attendees = await attendeesData.getAllAttendees(req.params.eventId);
      return res.status(200).json(attendees)
    } catch (e) {
      return res.status(404).json({error: e});
    }

  })
  .post(async (req, res) => {
    //code here for POST
    const attendee = req.body;
    //make sure there is something present in the req.body
    if (!attendee || Object.keys(attendee).length !== 3) {
      return res
        .status(400)
        .json({error: 'Attendee is not correct in the request body'});
    }
    //find event
    try {
      await eventsData.get(req.params.eventId);
    } catch (e) {
      return res.status(404).json({error: e});
    }
    //check all inputs, that should respond with a 400
    try {
      await attendee_validation(req.params.eventId, attendee.firstName, attendee.lastName, attendee.emailAddress)
    } catch (e) {
      return res.status(400).json({error: e});
    }
    
    //insert the attendee
    try {
      const updatedEvent = await attendeesData.createAttendee(req.params.eventId, attendee.firstName, attendee.lastName, attendee.emailAddress)
      return res.status(200).json(updatedEvent);
    } catch (e) {
      return res.status(400).json({error: e});
    }

  });

router
  .route('/attendee/:attendeeId')
  .get(async (req, res) => {
    //code here for GET
    //valid objectid
    try {
      req.params.attendeeId = checkId(req.params.attendeeId, 'attendeeId');
    } catch (e) {
      return res.status(400).json({error: e});
    }
    //find attendee
    try {
      const attendee = await attendeesData.getAttendee(req.params.attendeeId);
      return res.status(200).json(attendee);
    } catch (e) {
      return res.status(404).json({error: e});
    }
  })
  .delete(async (req, res) => {
    //code here for DELETE
    //valid objectid
    try {
      req.params.attendeeId = checkId(req.params.attendeeId, 'attendeeId');
    } catch (e) {
      return res.status(400).json({error: e});
    }
    //find if there is attendee
    try {
      await attendeesData.getAttendee(req.params.attendeeId);
      // res.status(200).json(attendee);
    } catch (e) {
      return res.status(404).json({error: e});
    }
    //delete attendee
    try {
      const event = await attendeesData.removeAttendee(req.params.attendeeId);
      return res.status(200).json(event);
    } catch (e) {
      return res.status(400).json({error: e});
    }
  });


export default router;
