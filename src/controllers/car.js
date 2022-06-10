const db = require('../models/index');
const Sequelize = require('sequelize');
const op = Sequelize.Op;
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

exports.car = async (req, res) => {
  try {
    const car = await db.Car.findOne({
      attributes: [
        'id',
        'userId',
        'carBrandName',
        'carGroupModel',
        'carYear',
        'carPlateNumber',
        'createdAt',
        'updatedAt',
      ],
      where: {
        id: req.params.id,
      },
    });

    if (!car) {
      throw new Error('Car not found!');
    }

    const prices = await db.CarPrice.findAll({
      include: [
        {
          model: db.DownPaymentType,
          include: [
            {
              model: db.CreditType,
              include: [
                {
                  model: db.PriceInstallment,
                },
              ],
            },
          ],
        },
      ],
      where: {
        carId: car.id,
      },
    });

    const mappingPrices = prices.map((p) => {
      let dp = [];
      if (p.DownPaymentTypes && p.DownPaymentTypes.length > 0) {
        dp = p.DownPaymentTypes.map((d) => {
          let credit = [];
          if (d.CreditTypes && d.CreditTypes.length > 0) {
            credit = d.CreditTypes.map((ct) => {
              let priceInst = [];
              if (ct.PriceInstallments && ct.PriceInstallments.length > 0) {
                priceInst = ct.PriceInstallments.map((pi) => {
                  return {
                    id: pi.id,
                    installmentDuration: pi.installmentDuration,
                    installmentPrice: pi.installmentPrice,
                    durationStartYear: pi.durationStartYear
                      ? pi.durationStartYear
                      : null,
                    durationEndYear: pi.durationEndYear
                      ? pi.durationEndYear
                      : null,
                  };
                });
              }
              return {
                id: ct.id,
                creditType: ct.creditType,
                priceInstallments: priceInst,
              };
            });
          }
          return {
            id: d.id,
            downPayment: d.downPayment,
            creditType: credit,
          };
        });
      }
      return {
        id: p.id,
        carId: p.carId,
        priceType: p.priceType,
        price: p.price,
        createdAt: p.createdAt,
        updatedAt: p.updatedAt,
        downPaymentTypes: dp,
      };
    });
    const carResult = {
      ...car.dataValues,
      prices: mappingPrices,
    };
    return res.json({
      success: true,
      data: carResult,
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
