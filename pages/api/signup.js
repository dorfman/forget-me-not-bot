export default (req, res) => {
  if (req.method === 'POST') {
    console.log(req.body && req.body.number);

    // insert into DB here
    
    // send verification text (twilio api call)

    res.status(200).end();
  } else {
    res.status(404).end();
  }
}
