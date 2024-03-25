import config from '../../config.js';
import mailchimp from '@mailchimp/mailchimp_marketing';

mailchimp.setConfig({
  apiKey: config.MAILCHIMP_APIKEY,
  server: config.MAILCHIMP_SERVER,
});

const addMemberToList = async (listId, email, firstName, lastName) => {
  try {
    const response = await mailchimp.lists.addListMember(listId, {
      email_address: email,
      status: 'subscribed',
      merge_fields: {
        FNAME: firstName,
        LNAME: lastName,
      },
    });
    console.log(`Successfully added contact with id: ${response.id}`);
    return true;
  } catch (err) {
    console.error(`Error adding contact: ${err.message}`);
    return false;
  }
};

export const renderSignupPage = (req, res) => res.render('newsletter-signup');

export const postSignup = async (req, res) => {
  const { firstName, lastName, email } = req.body;

  if (!firstName || !lastName || !email) {
    res.status(400).send('Required fields are missing');
    return;
  }

  const wasAdded = await addMemberToList(
    config.MAILCHIMP_LISTID,
    email,
    firstName,
    lastName
  );

  if (wasAdded) {
    res.redirect('/newsletter/success');
  } else {
    res.redirect('/newsletter-failure');
  }
};

export const renderSuccessPage = (req, res) => res.render('newsletter-success');
export const renderFailurePage = (req, res) => res.render('newsletter-failure');
