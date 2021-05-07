Covid Vaccine India Notification Service helps you to find the available vaccination slots based on your pincode and age. If the slot is found, it will keep sending you the email every minute about the vaccine availability. <br>

Steps to run the application: <br>

Enable app access on gmail and get App Password for you gmail account:
https://support.google.com/accounts/answer/185833?p=InvalidSecondFactor&visit_id=637554658548216477-2576856839&rd=1  

Enter the details in the new file. Name it as .env (If multiple people to be tracked, then mention the details separated by comma(,) correspondingly) <br>
Example of .env file :<br>
PINCODE=302004,302002 <br>
EMAIL=abc@gmail.com,xyz@gmail.com <br>
APPLICATION_PASSWORD=dotjnndpfqzqnfp,pddddjfixagqeglwy <br>
AGE=27,28 <br>

For running the app: <br>
npm install && pm2 start covidVaccineIndiaNotificationService.js

For shutting down the app: <br>
pm2 stop covidVaccineIndiaNotificationService.js && pm2 delete covidVaccineIndiaNotificationService.js
