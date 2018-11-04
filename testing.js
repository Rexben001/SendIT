const users = [
    {
        id: 1,
        name: 'Ben',
        email: 'rexben.rb@gmail.com',
        country: 'Abia',
        phone: '2345678',
        password: 'erft9876',
        parcel:
        {
            id: 21,
            weight: '23.4',
            username: 'REx',
            emailAddress: 'rexben.rb@gmail.com',
            pickup: '10, Igbe, Lagos',
            phone: '1234',
            picker: 'Ben',
            emailOfPicker: 'rexben.rb@gmail.com',
            phoneOfPicker: '1234',
            destination: 'Ikorodu',
            status: 'in transit'
        }
    }
];

const parcels = {
    id: 11,
    weight: '23.4',
    username: 'REx',
    emailAddress: 'rexben.rb@gmail.com',
    pickup: '10, Igbe, Lagos',
    phone: '1234',
    picker: 'Ben',
    emailOfPicker: 'rexben.rb@gmail.com',
    phoneOfPicker: '1234',
    destination: 'Ikorodu',
    status: 'in transit'
};
const n = [];
users.push(parcels);
// for(i of users){
//     i.parcel.push(parcels);
//     n.push(i);
// }

// users.push(n);
console.log(users);


