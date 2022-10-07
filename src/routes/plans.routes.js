const express = require('express');

const router = express.Router();

const Redis = require('redis');
const client = Redis.createClient();
client.connect();


// //GET ALL Plans
// router.get('/', (req, res) => {
//   console.log(`GET route with req ${req} and response as ${res}`);
//   const allPlans = client.keys();
//   res.status(201).send(allPlans);
//   console.log(allPlans);
// })

//Get Plan based on ID 
router.get('/:id', async (req, res) => {

  const id = String(req.params.id)
  const planVal = await client.get(id);
  const jsonPlan = JSON.parse(planVal)
  console.log(jsonPlan);

  if (planVal) {
    res.status(201).send(jsonPlan);
  } else {
    res.status(404).send('The Plan does not exist!');
  }
});

//post a new plan
router.post('/', async (req, res) => {
  console.log(`POST working`);
  console.log(req.body);

  const plan = JSON.stringify(req.body);
  const objId = String(req.body.objectId);


  const exists = await client.exists(objId)
  console.log(exists);

  if (exists == 1) {
    console.log('checid-', exists);
    res.status(409).send(`Plan with ID:${objId} already exists!`);
  } else {
    client.set(objId, plan);
    res.status(200).send(`Plan added successfully! ID: ${objId}
  ${plan}`);
  }
});


//delete a plan by id 
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const exists = await client.exists(id)
  console.log(exists);

  if (exists == 0) {
    console.log('checid-', exists);
    res.status(409).send(`Plan with ID:${objId} doesn't exists!`);
  } else {
    client.del(id);
    res.status(200).send(`Plan ID: ${id} deleted successfully!`);
  }
});

module.exports = router;