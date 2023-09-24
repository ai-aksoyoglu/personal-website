import mailchimp from '@mailchimp/mailchimp_marketing';
import { Router } from 'express';
const newsletter = Router();

mailchimp.setConfig({
  apiKey: process.env.mailchimp_apiKey,
  server: 'us20',
});
/*check if mailchimp works successfully (api call)
async function run() {
  const response = await mailchimp.ping.get();
  console.log(response);
}
run();*/

newsletter.get('/signup', (req, res) => res.render('newsletter-signup'));

newsletter.post('/signup', async function (req, res) {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;

  const subscribingUser = {
    firstName: firstName,
    lastName: lastName,
    email: email,
  };

  const listId = process.env.mailchimp_listID;

  try {
    const response = await mailchimp.lists.addListMember(listId, {
      email_address: subscribingUser.email,
      status: 'subscribed',
      merge_fields: {
        FNAME: subscribingUser.firstName,
        LNAME: subscribingUser.lastName,
      },
    });

    //If all goes well logging the contact's id
    res.render('newsletter-signup');
    console.log(
      "Successfully added contact as an audience member. The contact's id is" +
        response.id +
        '.'
    );
  } catch (err) {
    //Running the function and catching the errors (if any)
    // ************************THIS IS THE CODE THAT NEEDS TO BE ADDED FOR THE NEXT LECTURE*************************
    // So the catch statement is executed when there is an error so if anything goes wrong the code in the catch code is executed. In the catch block we're sending back the failure page. This means if anything goes wrong send the faliure page

    res.redirect('/newsletter-failure');
  }
});

newsletter.get('/failure', (req, res) => res.render('newsletter-failure'));

/*const url = "https://us20.api.mailchimp.com/3.0/lists/" + process.env.mailchimp_listID;

  const options = {
    method: "POST",
    auth: "ai.aksoyoglu:process.env.mailchimp_apiKey",
  };

  const request = https.request(url, options, function (response) {
    response.on("data", function (data) {
      console.log(JSON.parse(data));
    });
  });

  const jsonData = JSON.stringify(subscribingUser);

  request.write(jsonData);
  request.end;

  res.send(
    "<h1>Your name is " +
      firstName +
      " " +
      lastName +
      " and your email address is " +
      email +
      ". Thank you for signing up for the newsletter service.</h1>"
  );
});

// With mongodb
mongoose.connect('mongodb://localhost:27017/todolistDB');*/

export default newsletter;
