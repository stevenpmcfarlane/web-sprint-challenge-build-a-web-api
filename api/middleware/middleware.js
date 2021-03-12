const Actions = require("../actions/actions-model");
const Projects = require("../projects/projects-model");

const validateActionId = async (req, res, next) => {
  try {
    const action = await Actions.get(req.params.id);
    if (!action) {
      res.status(404).json({
        message: `action not found`,
      });
    } else {
      req.action = action;
      next();
    }
  } catch (err) {
    next(err);
  }
};

const validateProjectId = async (req, res, next) => {
  try {
    const project = await Projects.get(req.params.id);
    if (!project) {
      res.status(404).json({
        message: `project not found`,
      });
    } else {
      req.project = project;
      next();
    }
  } catch (err) {
    next(err);
  }
};

function validateAction(req, res, next) {
  if (!req.body) {
    res.status(400).json({
      message: "missing action data",
    });
  }
  if (!req.body["project_id"]) {
    res.status(400).json({
      message: "missing required project id field",
    });
  }
  if (!req.body.description || !req.body.description.trim()) {
    res.status(400).json({
      message: "missing required description field",
    });
  }
  next();
}

function validateProject(req, res, next) {
  if (!req.body) {
    res.status(400).json({
      message: "missing project data",
    });
  }
  if (!req.body.description || !req.body.description.trim()) {
    res.status(400).json({
      message: "missing required description field",
    });
  }
  if (!req.body.name || !req.body.name.trim()) {
    res.status(400).json({
      message: "missing required name field",
    });
  }
  next();
}

const completedMapProp = (req, res, next) => {
  const items = res.body.map((item) => {
    return {
      ...item,
      completed: item.completed === 1 ? true : false,
    };
  });
  res.status(200).json(items);
};

const completedProp = (req, res, next) => {
  const item = {
    ...res.body,
    completed: res.body.completed === 1 ? true : false,
  };
  res.status(200).json(item);
};

module.exports = {
  validateActionId,
  validateProjectId,
  validateAction,
  validateProject,
  completedMapProp,
  completedProp,
};
