const express = require('express');
const router = express.Router();
const schema = require("../schema")
const Redis = require('redis');
const client = Redis.createClient();
client.connect();

function validation(ajvValidate) {
  return (req, res, next) => {
    const valid = ajvValidate(req.body);
    if (!valid) {
      console.log(`Bad Req`);
      const errors = ajvValidate.errors;
      res.status(400).json(errors);
    } else {
      console.log(`validation passed`);
      next();
    }

  };
}

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
  console.log('Get by Id working');

  if (planVal) {
    res.status(200).send(jsonPlan);
  } else {
    res.status(404).send({ "message": `The Plan with ID: ${id} does not exist!` });
  }
});

//post a new plan
router.post('/', validation(schema), async (req, res) => {
  console.log(`POST working`);

  const plan = JSON.stringify(req.body);
  const objId = String(req.body.objectId);


  const exists = await client.exists(objId)
  console.log('POST', exists, validation(plan));

  if (exists == 1) {
    console.log('checkid-', exists);
    res.status(409).send({ "message": `Plan with id: ${objId} already exists!` });
  } else {
    validation(plan)
    client.set(objId, plan);
    res.status(201).send({ "message": "Plan added successfully!", "id": `${objId}` });
  }
});


//delete a plan by id 
router.delete('/:id', async (req, res) => {
  const id = String(req.params.id);
  const exists = await client.exists(id)
  console.log('deleeetee ', exists);

  if (exists == 0) {
    console.log('checid-', exists);
    res.status(404).send({ "message": `Plan id: ${id} doesn't exists!` });
  } else {
    client.del(id);
    res.status(200).send({ "message": `Plan id: ${id} deleted successfully!` });
  }
});

module.exports = router;