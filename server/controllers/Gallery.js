const models = require('../models');

const { Domo } = models;

/* Render the app.handlebars page */
const galleryPage = async (req, res) => res.render('gallery');

/* Retrieve all of the domos belonging to every user.
  Allows us to get JSON responses of Domos for a user, to then
  allow the client app to update dynamically using React.
  Able to dynamically grab updates from the server and immediately
  update the UI on screen. */
const getAllDomos = async (req, res) => {
  try {
    const query = { owner: req.session.account._id };
    const docs = await Domo.find(query).select('name age job').lean().exec();
    // const docs = await Domo.select('name age job').lean().exec();

    return res.json({ domos: docs });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: 'Error retrieving domos!' });
  }
};

module.exports = {
  galleryPage,
  getAllDomos,
};
