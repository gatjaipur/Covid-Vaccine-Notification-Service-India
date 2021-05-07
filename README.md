Covid Vaccine India Notification Service helps you to find the available vaccination slots based on your pincode and age. If the slot is found, it will keep sending you the email every minute about the vaccine availability.

Enable app access on gmail and get App Password for you gmail account:
https://support.google.com/accounts/answer/185833?p=InvalidSecondFactor&visit_id=637554658548216477-2576856839&rd=1  

Enter the details in the new file. Name it as .env (If multiple people to be tracked, then mention the details separated by comma(,) correspondingly)
Example :
PINCODE=302004,302002
EMAIL=abc@gmail.com,xyz@gmail.com
APPLICATION_PASSWORD=dotjnndpfqzqnfp,pddddjfixagqeglwy
AGE=27,28

For running the app:
npm install
pm2 start covidVaccineIndiaNotificationService.js

For shutting down the app:
pm2 stop covidVaccineIndiaNotificationService.js
pm2 delete covidVaccineIndiaNotificationService.js
