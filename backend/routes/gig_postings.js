const express = require('express');
const router = express.Router();

module.exports = ({getGigPostings, getGigById, addGigPosting}) => {
  /* GET list of gigs */
  router.get('/', (req, res) => {
    getGigPostings()
      .then(job => res.json(job))
      .catch(err =>
        res.json({
          error: err.message,
        })
      );
  });

  // return data for single job post based on its jobPostingId
  router.get('/:id', (req, res) => {
    getGigById(req.params.id)
      .then(gig => res.json(gig))
      .catch(err =>
        res.json({
          error: err.message,
        })
      );
  });

  /* POST a new gig posting */
  router.post('/new', (req, res) => {
    const {employer_id, gig_name, description, pay, deadline, photo_url} =
      req.body;

    addGigPosting(employer_id, gig_name, description, pay, deadline, photo_url)
      .then(addedGig => {
        res.json(addedGig);
      })
      .catch(err =>
        res.json({
          error: err.message,
        })
      );
  });

  return router;
};