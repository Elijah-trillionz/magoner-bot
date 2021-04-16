const ProjectIdeas = require('../model/ProjectIdeas');

async function getProjectIdeas(type) {
  try {
    const projectIdeas = await ProjectIdeas.find({ type });
    return projectIdeas;
  } catch (err) {
    console.log(err);
    return {
      error: err,
      errorMsg: 'Unable to fetch project ideas',
      status: 500,
    };
  }
}

async function addProjectIdea(project, type, src) {
  if (!project || !type || !src) {
    return {
      errorMsg: 'Please fill out all fields',
      status: 400,
    };
  }

  // check if project already exists
  const alreadyExists = await checkForExistence(project);
  if (alreadyExists) {
    return {
      errorMsg: 'This project already exists',
      status: 400,
    };
  }

  try {
    await ProjectIdeas.create({
      project,
      src,
      type,
    });

    return 'created';
  } catch (err) {
    return {
      error: err,
      errorMsg: 'Unable to fetch project ideas',
      status: 500,
    };
  }
}

const checkForExistence = async (project) => {
  try {
    const projects = await ProjectIdeas.find({ project });

    if (projects.length >= 1) {
      return true;
    }

    return false;
  } catch (err) {
    return {
      errorMsg: 'Unable to check for existence',
      error: err,
      status: 500,
    };
  }
};

module.exports = { getProjectIdeas, addProjectIdea };
