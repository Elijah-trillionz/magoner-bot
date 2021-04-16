const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const {
  getProjectIdeas,
  addProjectIdea,
} = require('./API/project-api/queries');
const startBot = require('./bot/bot');

dotenv.config({ path: './config/config.env' });

const app = express();
// body parser
connectDB();
app.use(express.json());

// routes:
// @route: /api/project-ideas/:type
app.get('/api/project-ideas/:type', async (req, res) => {
  const { type } = req.params;

  try {
    const projects = await getProjectIdeas(type);

    if (projects.errorMsg) {
      return res.status(projects.status).json({
        errorMsg: projects.errorMsg,
        error: projects.status !== 500 ? projects.errorMsg : projects.error,
      });
    }

    res.json({
      projects,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      errorMsg: 'API Server error',
    });
  }
});

app.post('/api/add-project', async (req, res) => {
  const { project, type, src } = req.body;

  if (!project || !type || !src) {
    return res.status(400).json({
      errorMsg: 'Please fill out all fields',
    });
  }

  try {
    const response = await addProjectIdea(project, type, src);

    if (response.errorMsg) {
      return res.status(response.status).json({
        errorMsg: response.errorMsg,
        error: response.status !== 500 ? response.errorMsg : response.error,
      });
    }

    res.json({
      msg: response,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      errorMsg: 'API Server error',
    });
  }
});

const PORT = process.env.PORT || 5000;

startBot();
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
