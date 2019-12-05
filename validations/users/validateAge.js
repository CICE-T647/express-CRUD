module.exports = age => {
  if (!age)
    throw {
      status: 422,
      message: "Debe proporcionar una edad",
      ok: false
    };
  if (typeof age !== "number")
    throw {
      status: 422,
      message: "El formato de la edad no es correcto",
      ok: false
    };
};
