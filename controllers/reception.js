const { getInventory } = require('../services/car');
const { getAll, create, remove, update, get } = require('../services/reception');
const asyncHandler = require('../middleware/async');

exports.getReceptions = asyncHandler(async (req, res, next) => {
  const response = await getAll(req.body.companyId, req.params.id);
  res.status(200).json({ success: true, data: response });
})

exports.getReception = asyncHandler(async (req, res, next) => {
  let response = await get(req.params.id);
  res.status(200).json({ success: true, data: response });
})

exports.putReception = asyncHandler(async (req, res, next) => {
  let response = await update(req.params.id, req.body);
  res.status(200).json({ success: true, data: response });
})

exports.deleteReception = asyncHandler(async (req, res, next) => {
  let response = await remove(req.params.id);
  res.status(200).json({ success: true, data: response });
})

exports.postReception = asyncHandler(async (req, res, next) => {
  let response = await create(req.body);
  res.status(201).json({ success: true, data: response });
})

exports.getNewReception = (req, res, next) => {
  const inventory = getInventory();
  const newReception = {
    deliveryDate: new Date(),
    deliveryTime: new Date(),
    status: 3,
    vehicle: {},
    assuranceCompany: {
      assuranceCompanyId: 0,
      contact: {
        name: '',
        email: '',
        phone: ''
      }
    },
    persons: {
      owner: {
        fiscalId: '',
        name: '',
        email: '',
        phone: ''
      },
      deliver: {
        fiscalId: '',
        name: '',
        email: '',
        phone: ''
      }
    },
    documents: [],
    inventory: [],
    comments: '',
    damages: [],
    workers: [],
    createdBy: {},
    createAt: new Date()
  };
  inventory.forEach(element => {
    element.checked = false;
  });
  newReception.inventory = inventory;
  res.status(200).json({ success: true, data: newReception });
}