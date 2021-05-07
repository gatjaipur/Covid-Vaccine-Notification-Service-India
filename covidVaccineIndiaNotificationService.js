require('dotenv').config()
const moment = require('moment');
const cron = require('node-cron');
const axios = require('axios');
const notifier = require('./emailSender');

function Person(pincode, email, age) {
    this.pincode = pincode;
    this.email = email;
    this.age = age;
}

async function main(){


    var personList = [];

    var countOfPersonsPincode = process.env.PINCODE.split(',');
    var countOfPersonsEmail = process.env.EMAIL.split(',');
    var countOfPersonsAge = process.env.AGE.split(',');

    for(var i=0; i<countOfPersonsPincode.length; i++) {
        personList.push(new Person(countOfPersonsPincode[i], countOfPersonsEmail[i], countOfPersonsAge[i]));
    }


    try {
        cron.schedule('* * * * *', async () => {
             await checkVaccineSlotsAvailability(personList);
        });
    } catch (e) {
        console.log('Error: ' + JSON.stringify(e, null, 2));
        throw e;
    }
}

async function checkVaccineSlotsAvailability(personList) {

    let datesArray = await getNext16Days();
    personList.forEach(person => {
    datesArray.forEach(date => {
        getSlots(date, person);
    })
})
}

function getSlots(DATE, Person) {
    console.log("Date: " + DATE + " Person : Pincode - " + Person.pincode + " Age - " + Person.age + " Email - " + Person.email)
    let config = {
        method: 'get',
        url: 'https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?pincode=' + Person.pincode + '&date=' + DATE,
        headers: {
            'accept': 'application/json',
            'Accept-Language': 'hi_IN'
        }
    };

    axios(config)
        .then(function (slots) {
            let sessions = slots.data.sessions;
            let personAge = parseInt(Person.age);
            let validSlots = sessions.filter(slot => slot.min_age_limit <= personAge &&  slot.available_capacity > 0)
            console.log({date:DATE, validSlots: validSlots.length})
            if(validSlots.length > 0) {
                notifyMe(validSlots, Person.email);
            }
        })
        .catch(function (error) {
            console.log(error);
        });
}

async function notifyMe(validSlots, email){
    let slotDetails = JSON.stringify(validSlots, null, '\t');
    notifier.sendEmail(email, 'VACCINE AVAILABLE', slotDetails, (err, result) => {
        if(err) {
            console.error({err});
        }
    })
};

async function getNext16Days(){
    let dates = [];
    let today = moment();
    for(let i = 0 ; i < 16 ; i ++ ){
        let dateString = today.format('DD-MM-YYYY')
        dates.push(dateString);
        today.add(1, 'day');
    }
    return dates;
}


main()
    .then(() => {console.log('Vaccine availability checker started.');});
