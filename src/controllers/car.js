const db = require('../models/index');
const validateAll = require('../utils/form');

exports.allCars = async (req, res) => {
  try {
    const car = await db.Car.findAll();
    return res.json({
      success: true,
      data: car,
    });
  } catch (error) {
    console.error(error);
    return res.json({
      success: false,
      message: 'Something went wrong.',
    });
  }
};

exports.createCars = async (req, res) => {
  const rules = {
    carBrandName: 'required',
    carGroupModel: 'required',
  };

  const errors = await validateAll(req.body, rules);
  if (errors) {
    return res.json({
      success: false,
      message: errors,
    });
  }

  const trx = await db.sequelize.transaction();

  try {
    const { carBrandName, carGroupModel, carYear, carPlateNumber } = req.body;

    const car = await db.Car.create(
      {
        userId: req.user.identity,
        carBrandName,
        carGroupModel,
        carYear,
        carPlateNumber,
      },
      { transaction: trx }
    );

    await trx.commit();

    return res.json({
      success: true,
      data: car,
    });
  } catch (error) {
    await trx.rollback();
    console.error(error);

    return res.json({
      success: false,
      message: 'Something went wrong.',
    });
  }
};

exports.updateCar = async (req, res) => {
  const trx = await db.sequelize.transaction();
  try {
    const { carBrandName, carGroupModel, carYear, carPlateNumber } = req.body;
    const car = await db.Car.update(
      {
        carBrandName,
        carGroupModel,
        carYear,
        carPlateNumber,
      },
      {
        where: {
          id: req.params.id,
        },
      },
      { transaction: trx }
    );
    await trx.commit();
    return res.json({
      success: true,
      data: car,
    });
  } catch (error) {
    await trx.rollback();
    console.error(error);
    return res.json({
      success: false,
      message: 'Something went wrong.',
    });
  }
};

exports.deleteCar = async (req, res) => {
  try {
    const car = await db.Car.destroy({
      where: {
        id: req.params.id,
      },
    });
    return res.json({
      success: true,
      data: car,
    });
  } catch (error) {
    console.error(error);
    return res.json({
      success: false,
      message: 'Something went wrong.',
    });
  }
};
