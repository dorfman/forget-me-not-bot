export default (req, res) => {
  if (req.method === 'POST') {
    console.log(req.body && req.body.code);

    // verify the code

    res.status(200).end();
  } else {
    res.status(404).end();
  }
}
