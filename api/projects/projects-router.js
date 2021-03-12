// Write your "projects" router here!
const express = require("express");
const Projects = require("../projects/projects-model");

const router = express.Router();

// [GET] /api/projects returns an array of projects (or an empty array) as the body of the response.
router.get("/", (req, res, next) => {
    Projects.get()
      .then((projects) => {
        res.status(200).json(projects);
      })
      .catch((err) => {
        res.status(500).json({ message: "there was an error" });
      });
  });
// [GET] /api/projects/:id returns a project with the given id as the body of the response.

// [POST] /api/projects returns the newly created project as the body of the response.

// [PUT] /api/projects/:id returns the updated project as the body of the response.

// [DELETE] /api/projects/:id returns no response body.

//[GET] /api/projects/:id/actions sends an array of actions (or an empty array) as the body of the response.

module.exports = router;
