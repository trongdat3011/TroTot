class Controller {
  constructor(Schema) {
    this.Schema = Schema;
  }
  find(req, res, next) {
    this.Schema.find().exec( (err, things) => {
      if (err) res.send(err);
      res.json(things);
    });
  }
  findById(req, res, next) {
    this.Schema.findById(req.params.id).exec( (err, thing) => {
      if (err) res.send(err);
      if (thing) res.json(thing);
      else res.json('not found');
    });
  }
  create(req, res, next) {
    const schema = new this.Schema(req.body);
    schema.save( (err) => {
      if (err) res.send(err);
      res.json({ message: 'Successful!' });
    });
  }
  update(req, res, next) {
    const conditions = { _id: req.params.id };
    this.Schema.update(conditions, req.body).exec( (err, doc) => {
      if (err) res.send(err);
      if (!doc) { return res.status(404).end(); }
      return res.status(204).end();
    });
  }
  remove(req, res, next) {
    this.Schema.findByIdAndRemove(req.params.id).exec( (err, doc) => {
      if (err) res.send(err);
      if (!doc) { return res.status(404).end(); }
      return res.status(204).end();
    });
  }

}

module.exports = Controller;
