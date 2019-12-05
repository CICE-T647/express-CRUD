module.exports = email => {
  if (!email) throw { status: 422, message: "Debe enviar email", ok: false };
  console.log(typeof email);
  if (typeof email !== "string") {
    throw { status: 422, message: "email debe ser un string", ok: false };
  }
  const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  const emailTest = emailRegexp.test(email);

  if (!emailTest)
    throw { status: 422, message: "El email no es correcto", ok: false };
};
