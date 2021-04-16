### This bot is categorized into two...

#### #1 Project Bot

-- The project bot is for project ideas, it makes use of an already made mongodb queries from an API to get project ideas and add as well.

-- In Discord this bot should be able to deliver project ideas when a command is used and also be able to collect project ideas from users of the server on prompt of a command.

-- This BOT does not use the API mentioned above but rather directly uses what the API uses. The API is meant to run along with this bot and will be used for a coming website as well opened to anyone who wants to make use of it.

-- Everything needed to work on this bot is in the bot folder

**COMMANDS**

-- **$project-mini or $project-major** => This command delivers project ideas based on the type of project, it could be mini or major. There are mini projects and major projects. The mongodb query for this command is `getProjectIdeas(type)`. the type should be passed as an argument to the function. It is located at API/project-api/queries.js.

The `getProjectIdeas()` function returns a promise of all project ideas of the specified type in the database.
When the data type of this handled promise is an array so which means you can randomly select a project.

-- **$submit-project-mini or $submit-project-major** => This command is to submit project ideas to the database which will also be accessible by the api. The project can either be a mini project or major project. The query used is `addProjectIdea(project, type, src)`. The parameters:

1. project: the given project from the user
2. type: major or mini
3. src: the user's name or username.
   All parameters are compulsory.

The `addProjectIdea()` function returns a promise of a string ('created') if successful.

#### #2 Moderator Bot

-- This bot is not clear as to what its functions would be yet. but basically
-- welcome new users
-- kick users
-- mute and unmute users
etc for now.
