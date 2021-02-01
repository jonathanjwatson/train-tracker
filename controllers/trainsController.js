const express = require("express");
const db = require("../models");
const moment = require("moment");

const router = express.Router();

/**
 * Route to render all trains to a page.
 */
router.get("/trains", (req, res) => {
  db.Train.findAll()
    .then((allTrains) => {
      // console.log(allTrains);
      const formattedTrains = allTrains.map((train) => {
        const formattedTrain = { ...train.dataValues };
        formattedTrain.eta = moment(train.eta)
          ? moment(train.eta).format("MMMM Do YYYY, h:mm:ss a")
          : "N/A";
        return formattedTrain;
      });
      console.log(formattedTrains);
      res.render("all-trains", { trains: formattedTrains });
    })
    .catch((err) => {
      console.log(err);
      //TODO: render 404 page if we're unable to return trains
      res.status(500).end();
    });
});

/**
 * Route to render the new train form.
 */
router.get("/trains/new", (req, res) => {
  res.render("new-train");
});

/**
 * Route to pull train data from the database
 * Render the train data to a pre-populate form.
 */
router.get("/trains/:id/edit", (req, res) => {
  db.Train.findOne({ where: { id: req.params.id } })
    .then((singleTrain) => {
      res.render("edit-train", singleTrain.dataValues);
    })
    .catch((err) => {
      console.log(err);
      res.status(404).end();
    });
});

/**
 * Display information about a single train.
 */
router.get("/trains/:id", (req, res) => {
  db.Train.findOne({
    where: { id: req.params.id },
  })
    .then((singleTrain) => {
      // console.log(singleTrain.dataValues);
      res.render("single-train", singleTrain.dataValues);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).end();
    });
});

/**
 * API Route to create a new train.
 */
router.post("/api/trains", (req, res) => {
  db.Train.create(req.body)
    .then((createdTrain) => {
      res.json(createdTrain);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).end();
    });
});

/**
 * API Route to update an existing train by ID
 */
router.put("/api/trains/:id", (req, res) => {
  db.Train.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(404).end();
    });
});

/**
 * API Route to delete a train by ID
 */
router.delete("/api/trains/:id", (req, res) => {
  db.Train.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(404).end();
    });
});

module.exports = router;
