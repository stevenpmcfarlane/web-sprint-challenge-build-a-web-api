// Write your "actions" router here!
const express = require("express");
const Actions = require("../actions/actions-model");
const { 
    validateActionId, 
    completedProp, 
    completedMapProp, 
    validateAction } = require("../middleware/middleware");

const router = express.Router();

// GET] /api/actions returns an array of actions (or an empty array) as the body of the response.
router.get("/", (req, res, next) => {
  Actions.get()
    .then((actions) => {
      res.body = actions || []
      next()
    })
    .catch((err) => {
      res.status(500).json({ message: "there was an error", err });
    });
}, completedMapProp);

// [GET] /api/actions/:id returns an action with the given id as the body of the response.

router.get("/:id", validateActionId, (req, res, next) => {
    res.body = req.action;
    next()
}, completedProp);

// [POST] /api/actions returns the newly created action as the body of the response.

router.post("/", validateAction, (req, res, next) => {
  Actions.insert(req.body)
    .then((action) => {
      res.body = action
      next()
    })
    .catch((err) => {
      res.status(500).json({ message: "there was an error: ", err });
    });
}, completedProp);

// [PUT] /api/actions/:id returns the updated action as the body of the response.

router.put("/:id", validateActionId, validateAction, (req, res, next) => {
  Actions.update(req.body)
    .then((action) => {
      res.body = action
      next()
    })
    .catch((err) => {
      res.status(500).json({ message: "there was an error", err });
    });
}, completedProp);

// [DELETE] /api/actions/:id returns no response body.
router.delete("/:id", validateActionId, (req, res, next) => {
  Actions.remove(req.params.id)
    .then(() => {
      res.status(200).json({ message: "The action has been removed" });
    })
    .catch((err) => {
      res.status(500).json({ message: "there was an error", err });
    });
});

module.exports = router;
