import validate from 'node-input-validator';
class Validation{

    static validator(res, req, next){
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
}

export default Validation;
