import goMail from "./goMail";

export default function(snap: any, context: any) {
  //here we catch a new data, added to firebase database, it stored in a snap variable
  const createdData = snap.val();
  var email = createdData.mail;
  var name = createdData.name;
  var message = createdData.message;

  //here we send new data using function for sending emails
  goMail(message, name, email);
}
