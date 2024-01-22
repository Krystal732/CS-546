// Import the express router as shown in the lecture code
// Note: please do not forget to export the router!
import {Router} from 'express';
const router = Router();
import {eventsData} from '../data/index.js';
import {create_validation, checkAndTrimString, checkId} from '../helpers.js'

router
  .route('/')
  .get(async (req, res) => {
    //code here for GET
    try {
      const eventsList = await eventsData.getAll();
      res.json(eventsList);
    } catch (e) {
      return res.status(500).json({error: e});
    }
  })
  .post(async (req, res) => {
    //code here for POST
    const event = req.body;
    // console.log("event post:", event)
    //make sure there is something present in the req.body
    if (!event || Object.keys(event).length !== 10) {
      return res
        .status(400)
        .json({error: 'Event is not correct in the request body'});
    }
    //check all inputs, that should respond with a 400
    try {
      // console.log(event.description)
      create_validation(event.eventName,
        event.description,
        event.eventLocation,
        event.contactEmail,
        event.maxCapacity,
        event.priceOfAdmission,
        event.eventDate,
        event.startTime,
        event.endTime,
        event.publicEvent)
    } catch (e) {
      return res.status(400).json({error: e});
    }

    //insert the event
    try {
      // const {eventName,
      //   eventDescription,
      //   eventLocation,
      //   contactEmail,
      //   maxCapacity,
      //   priceOfAdmission,
      //   eventDate,
      //   startTime,
      //   endTime,
      //   publicEvent} = event;
      const newEvent = await eventsData.create(event.eventName,
        event.description,
        event.eventLocation,
        event.contactEmail,
        event.maxCapacity,
        event.priceOfAdmission,
        event.eventDate,
        event.startTime,
        event.endTime,
        event.publicEvent);
      return res.status(200).json(newEvent);
    } catch (e) {
      return res.status(400).json({error: e});
    }
  });

router
  .route('/:eventId')
  .get(async (req, res) => {
    //code here for GET
    //valid objectid
    try {
      req.params.eventId = checkId(req.params.eventId, 'eventId');
    } catch (e) {
      return res.status(400).json({error: e});
    }
    //find event
    try {
      const event = await eventsData.get(req.params.eventId);
      return res.status(200).json(event);
    } catch (e) {
      return res.status(404).json({error: e});
    }
  })
  .delete(async (req, res) => {
    //code here for DELETE
    try {
      req.params.eventId = checkId(req.params.eventId, 'eventId');
    } catch (e) {
      return res.status(400).json({error: e});
    }
    //find event
    try {
      const event = await eventsData.get(req.params.eventId);
      // res.json(event);
    } catch (e) {
      return res.status(404).json({error: e});
    }
    //delete
    try {
      let deleted = await eventsData.remove(req.params.eventId);
      return res.status(200).json(deleted);
    } catch (e) {
      return res.status(404).send({error: e});
    }

  })
  .put(async (req, res) => {
    //code here for PUT
    //validation
    const updatedEvent = req.body;
    //make sure there is something in the req.body
    if (!updatedEvent || Object.keys(updatedEvent).length !== 10) {
      return res
        .status(400)
        .json({error: 'Event is not correct in the request body'});
    }

    try {
      req.params.eventId = checkId(req.params.eventId, 'eventId');
      create_validation(updatedEvent.eventName,
        updatedEvent.description,
        updatedEvent.eventLocation,
        updatedEvent.contactEmail,
        updatedEvent.maxCapacity,
        updatedEvent.priceOfAdmission,
        updatedEvent.eventDate,
        updatedEvent.startTime,
        updatedEvent.endTime,
        updatedEvent.publicEvent)
    } catch (e) {
      return res.status(400).json({error: e});
    }
    //find event
    try {
      await eventsData.get(req.params.eventId);
      // res.json(event);
    } catch (e) {
      return res.status(404).json({error: e});
    }
    //update event
    try {
      const updated = await eventsData.update(
        req.params.eventId,
        updatedEvent.eventName,
        updatedEvent.description,
        updatedEvent.eventLocation,
        updatedEvent.contactEmail,
        updatedEvent.maxCapacity,
        updatedEvent.priceOfAdmission,
        updatedEvent.eventDate,
        updatedEvent.startTime,
        updatedEvent.endTime,
        updatedEvent.publicEvent
      );
      return res.status(200).json(updated);
    } catch (e) {
      return res.status(404).json({error: e});
    }
  });

export default router;
