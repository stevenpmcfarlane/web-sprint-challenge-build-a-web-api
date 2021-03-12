// Write your "actions" router here!
const express = require("express");
const Actions = require("../actions/actions-model");

const router = express.Router()


// GET] /api/actions returns an array of actions (or an empty array) as the body of the response.
router.get("/", (req, res, next) => {
    Actions.get()
      .then((actions) => {
        res.status(200).json(actions);
      })
      .catch((err) => {
        res.status(500).json({ message: "there was an error" });
      });
  });


// [GET] /api/actions/:id returns an action with the given id as the body of the response.


// [POST] /api/actions returns the newly created action as the body of the response.


// [PUT] /api/actions/:id returns the updated action as the body of the response.


// [DELETE] /api/actions/:id returns no response body.


module.exports = router;
