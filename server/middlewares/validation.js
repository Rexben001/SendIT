import validate from 'node-input-validator';


class Validation {
  static userValidator(req, res, next) {
    const validator = new validate(req.body, {
      firstname: 'required|minLength:3',
      lastname: 'required|minLength:3',
      othernames: 'required|minLength:3',
      email: 'required|email',
      username: 'required|minLength:3',
      password: 'required',
      phone: 'required',
    });

    validator.check().then((matched) => {
      if (!matched) {
        return res.status(422).json(validator.errors);
      }
      next();
    });
  }

  static parcelValidator(req, res, next) {
    const validator = new validate(req.body, {
      weight: 'required|numeric',
      weightmetric: 'required|string',
      from_address: 'required',
      to_address: 'required|minLength:3',
      receiver: 'required',
      phoneOfReceiver: 'required',
    });

    validator.check().then((matched) => {
      if (!matched) {
        return res.status(422).json(validator.errors);
      }
      next();
    });
  }
}

export default Validation;
