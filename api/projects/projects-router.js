// Write your "projects" router here!
const express = require("express");
const Projects = require("../projects/projects-model");
const {
  validateProjectId,
  completedMapProp,
  completedProp,
  validateProject,
} = require("../middleware/middleware");

const router = express.Router();

// [GET] /api/projects returns an array of projects (or an empty array) as the body of the response.
router.get(
  "/",
  (req, res, next) => {
    Projects.get()
      .then((projects) => {
        res.body = projects || [];
        next();
      })
      .catch((err) => {
        res.status(500).json({ message: "there was an error" });
      });
  },
  completedMapProp
);

// [GET] /api/projects/:id returns a project with the given id as the body of the response.
router.get(
  "/:id",
  validateProjectId,
  (req, res, next) => {
    res.body = req.project;
    next();
  },
  completedProp
);

// [POST] /api/projects returns the newly created project as the body of the response.

router.post(
  "/",
  validateProject,
  (req, res, next) => {
    Projects.insert(req.body)
      .then((project) => {
        res.body = project;
        next();
      })
      .catch((err) => {
        res.status(500).json({ message: "there was an error: ", err });
      });
  },
  completedProp
);

// [PUT] /api/projects/:id returns the updated project as the body of the response.

router.put(
  "/:id",
  validateProjectId,
  validateProject,
  (req, res, next) => {
    Projects.update(req.body)
      .then((project) => {
        res.body = project;
        next();
      })
      .catch((err) => {
        res.status(500).json({ message: "there was an error", err });
      });
  },
  completedProp
);

// [DELETE] /api/projects/:id returns no response body.

router.delete("/:id", validateProjectId, (req, res, next) => {
  Projects.remove(req.params.id)
    .then(() => {
      res.status(200).json({ message: "The project has been removed" });
    })
    .catch((err) => {
      res.status(500).json({ message: "there was an error", err });
    });
});

//[GET] /api/projects/:id/actions sends an array of actions (or an empty array) as the body of the response.
router.get(
  "/:id/actions",
  validateProjectId,
  (req, res, next) => {
    Projects.getProjectActions(req.params.id)
      .then((actions) => {
        res.body = actions || []; //actions?
        next();
      })
      .catch((err) => {
        res.status(500).json({ message: "there was an error", err });
      });
  },
  completedMapProp
);

module.exports = router;
