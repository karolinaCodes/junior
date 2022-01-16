const express = require('express');
const router = express.Router();

/* Get all job applications */
module.exports = ({getJobApplicationById}) => {
  router.get('/:id', (req, res) => {
    getJobApplicationById(req.params.id)
      .then(application => res.json(application))
      .catch(err =>
        res.json({
          error: err.message,
        })
      );
  });

  return router;
};
