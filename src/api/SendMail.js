import emailjs, { init } from "emailjs-com";
init(process.env.EMAILJS_API);

import { NotificationManager } from "react-notifications";

// Regex to check email address
// Credits to https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
const validateEmail = (email) => {
  // eslint-disable-next-line
  const re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  return re.test(String(email).toLowerCase());
};

const editMessage = (_message) => {
  return _message.length === 1 ? _message[0] : _message.join("    |    ");
};

const SendMail = (_recipient, _today, _message) => {
  if (_recipient.length === 0) {
    return;
  }
  if (!validateEmail(_recipient)) {
    NotificationManager.error("Invalid Email Address!", "Error", 4000);
    return;
  }

  if (_message.length === 0) {
    NotificationManager.error("No available tasks!", "Error", 4000);
    return;
  }
  const _editedMessage = editMessage(_message);

  const template_params = {
    recipient: _recipient,
    today: _today,
    message: _editedMessage,
  };

  emailjs.send("service_t04xzk6", "template_form", template_params).then(
    () => NotificationManager.success("Mail Sent..", "Success", 4000),
    (err) => NotificationManager.error(err.text)
  );
};

export default SendMail;
