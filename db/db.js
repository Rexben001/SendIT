const users = [
    {
        id: 1,
        name: 'Ben',
        email: 'rexben.rb@gmail.com',
        country: 'Abia',
        phone: '2345678',
        password: 'erft9876',
        parcel: []
    }
];

const parcels = {
    id: 1,
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

console.log(users[0].parcel.push(parcels));