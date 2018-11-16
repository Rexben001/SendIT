import validate from 'node-input-validator';

class Validation{

    static parcelValidator(res, req, next){
        console.log(req.body);
        let validator = new validate( req.body, {
			id: 'required|integer',
			weight: 'required|integer',
			username: 'required|minLength:3',
			emailAddress:'required|email',
			pickup: 'required|string',
			phone: 'required|numeric',
			picker: 'required|string',
			emailOfPicker: 'required|email',
			phoneOfPicker: 'required|numeric',
			destination: 'required|string',
            });
            validator.check().then(function (matched) {
                if (!matched) {
                    return res.status(422).json(validator.errors);
                }

        next();
    });
}

static userValidator(req, res, next){
    let validator = new validate( req.body, {
        id: 'required|integer',
        name: 'required|minLength:3',
        email:'required|email',
        pasword: 'required',
        phone: 'required|numeric'
        });
 
    validator.check().then(function (matched) {
        if (!matched) {
            return res.status(422).json(validator.errors);
        }
});
}
}

export default Validation;
