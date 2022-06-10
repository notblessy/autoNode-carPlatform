const db = require('../models/index');
const validateAll = require('../utils/form');

exports.createPrice = async (req, res) => {
  const rules = {
    priceType: 'required',
    price: 'required',
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
    const { priceType, price, downPayment, creditType, installmentPrices } =
      req.body;

    if (priceType && priceType == 'CREDIT') {
      const carPrice = await db.CarPrice.create(
        {
          carId: req.params.carId,
          priceType,
          price,
        },
        { transaction: trx }
      );

      const dpType = await db.DownPaymentType.create(
        {
          carPriceId: carPrice.carId,
          downPayment,
        },
        { transaction: trx }
      );

      const insertCreditType = await db.CreditType.create(
        {
          dpTypeId: dpType.id,
          creditType,
        },
        { transaction: trx }
      );

      if (installmentPrices && installmentPrices.length() > 0) {
        const installmentPriceEnrichment = installmentPrices.map((inst) => {
          return {
            creditTypeId: insertCreditType.id,
            installmentDurationInMonth: inst.installmentDurationInMonth,
            installmentPrice: inst.installmentPrice,
            durationStartYear: inst.durationStartYear
              ? inst.durationStartYear
              : null,
            durationEndYear: inst.durationEndYear ? inst.durationEndYear : null,
          };
        });
        await db.InstallmentPrice.bulkCreate(installmentPriceEnrichment, {
          transaction: trx,
        });
      }
      await trx.commit();

      return res.json({
        success: true,
        data: price,
      });
    } else {
      const price = await db.CarPrice.create(
        {
          carId: req.params.carId,
          priceType,
          price,
        },
        { transaction: trx }
      );
      await trx.commit();

      return res.json({
        success: true,
        data: price,
      });
    }
  } catch (error) {
    await trx.rollback();
    console.error(error);

    return res.json({
      success: false,
      message: 'Something went wrong.',
    });
  }
};
