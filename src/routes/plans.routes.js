const express = require('express');

const router = express.Router();

let payload = [

  {
    id: 1,
    value: {
      "planCostShares": {
        "deductible": 2000,
        "_org": "example.com",
        "copay": 23,
        "objectId": "1234vxc2324sdf-501",
        "objectType": "membercostshare"
      },
      "linkedPlanServices": [
        {
          "linkedService": {
            "_org": "example.com",
            "objectId": "1234520xvc30asdf-502",
            "objectType": "service",
            "name": "Yearly physical"
          },
          "planserviceCostShares": {
            "deductible": 10,
            "_org": "example.com",
            "copay": 0,
            "objectId": "1234512xvc1314asdfs-503",
            "objectType": "membercostshare"
          },
          "_org": "example.com",
          "objectId": "27283xvx9asdff-504",
          "objectType": "planservice"
        },
        {
          "linkedService": {
            "_org": "example.com",
            "objectId": "1234520xvc30sfs-505",
            "objectType": "service",
            "name": "well baby"
          },
          "planserviceCostShares": {
            "deductible": 10,
            "_org": "example.com",
            "copay": 175,
            "objectId": "1234512xvc1314sdfsd-506",
            "objectType": "membercostshare"
          },
          "_org": "example.com",
          "objectId": "27283xvx9sdf-507",
          "objectType": "planservice"
        }
      ],
      "_org": "example.com",
      "objectId": "12xvxc345ssdsds-508",
      "objectType": "plan",
      "planType": "inNetwork",
      "creationDate": "12-12-2017"
    }
  },
  {
    id: 2,
    value: {
      "planCostShares": {
        "deductible": 2000,
        "_org": "example.com",
        "copay": 23,
        "objectId": "1234vxc2324sdf-501",
        "objectType": "membercostshare"
      },
      "linkedPlanServices": [
        {
          "linkedService": {
            "_org": "example.com",
            "objectId": "1234520xvc30asdf-502",
            "objectType": "service",
            "name": "Yearly physical"
          },
          "planserviceCostShares": {
            "deductible": 10,
            "_org": "example.com",
            "copay": 0,
            "objectId": "1234512xvc1314asdfs-503",
            "objectType": "membercostshare"
          },
          "_org": "example.com",
          "objectId": "27283xvx9asdff-504",
          "objectType": "planservice"
        },
        {
          "linkedService": {
            "_org": "example.com",
            "objectId": "1234520xvc30sfs-505",
            "objectType": "service",
            "name": "well baby"
          },
          "planserviceCostShares": {
            "deductible": 10,
            "_org": "example.com",
            "copay": 175,
            "objectId": "1234512xvc1314sdfsd-506",
            "objectType": "membercostshare"
          },
          "_org": "example.com",
          "objectId": "27283xvx9sdf-507",
          "objectType": "planservice"
        }
      ],
      "_org": "example.com",
      "objectId": "12xvxc345ssdsds-508",
      "objectType": "plan",
      "planType": "inNetwork",
      "creationDate": "12-12-2017"
    }
  }
];

//GET ALL Plans
router.get('/', (req, res) => {
  console.log(`GET route with req ${req} and response as ${res}`);
  res.status(200).send(payload);
})

//Get Plan based on ID 
router.get('/:id', (req, res) => {
  let notFound = true;

  payload.forEach((val) => {
    if (val.id == req.params.id) {
      notFound = true;
      res.status(200).send(val);
    }
  });

  if (notFound) {
    res.status(404).send('The Plan does not exist!');
  }
});

//post a new plan
router.post('/' ,(req, res) => {

});

module.exports = router;