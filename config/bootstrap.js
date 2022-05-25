/**
 * Seed Function
 * (sails.config.bootstrap)
 *
 * A function that runs just before your Sails app gets lifted.
 * > Need more flexibility?  You can also create a hook.
 *
 * For more information on seeding your app with fake data, check out:
 * https://sailsjs.com/config/bootstrap
 */

module.exports.bootstrap = async function () {
  let existingRoles = await Role.find();
  console.log("existing roles", existingRoles);
  if (existingRoles.length == 0) {
    await Role.createEach([
      {
        name: "consejo",
        displayName: "Consejo",
        publicId: GuidService.generateGuid(),
      },
      {
        name: "patrocinador",
        displayName: "Patrocinador",
        publicId: GuidService.generateGuid(),
      },
      {
        name: "administrador",
        displayName: "Administrador",
        publicId: GuidService.generateGuid(),
      },
      {
        name: "root",
        displayName: "root",
        publicId: GuidService.generateGuid(),
      },
    ]);
  }

  existingRoles = await Role.find();
  const existingUsers = await User.find();
  const rootRole = existingUsers.find((r) => r.name == "root");
  const administrativeRole = existingUsers.find(
    (r) => r.name == "administrador"
  );
  const consejoRole = existingUsers.find((r) => r.name == "consejo");
  const patrocinadorRole = existingUsers.find((r) => r.name == "patrocinador");

  if (existingUsers.length == 0) {
    const gralPassword = await EncriptService.encriptString("12345");
    await User.createEach([
      {
        email: "test1@test.com",
        password: gralPassword,
        firstName: "Lola",
        lastName: "Perez",
        birthday: "25092000",
        phone: "6391233212",
        gender: "femenino",
        publicId: GuidService.generateGuid(),
        roles: [existingRoles[0].id],
      },
      {
        email: "test2@test.com",
        password: gralPassword,
        firstName: "Lola",
        lastName: "Perez",
        birthday: "25092000",
        phone: "6391233212",
        gender: "femenino",
        publicId: GuidService.generateGuid(),
        roles: [existingRoles[1].id],
      },
      {
        email: "test3@test.com",
        password: gralPassword,
        firstName: "Lola",
        lastName: "Perez",
        birthday: "25092000",
        phone: "6391233212",
        gender: "femenino",
        publicId: GuidService.generateGuid(),
        roles: [existingRoles[2].id],
      },
      {
        email: "test4@test.com",
        password: gralPassword,
        firstName: "Lola",
        lastName: "Perez",
        birthday: "25092000",
        phone: "6391233212",
        gender: "femenino",
        publicId: GuidService.generateGuid(),
        roles: [existingRoles[3].id],
      },
      {
        email: "test5@test.com",
        password: gralPassword,
        firstName: "Lola",
        lastName: "Perez",
        birthday: "25092000",
        phone: "6391233212",
        gender: "femenino",
        publicId: GuidService.generateGuid(),
        roles: [existingRoles[0].id, existingRoles[1].id],
      },
    ]);
  }

  // By convention, this is a good place to set up fake data during development.
  //
  // For example:
  // ```
  // // Set up fake development data (or if we already have some, avast)
  // if (await User.count() > 0) {
  //   return;
  // }
  //
  // await User.createEach([
  //   { emailAddress: 'ry@example.com', fullName: 'Ryan Dahl', },
  //   { emailAddress: 'rachael@example.com', fullName: 'Rachael Shaw', },
  //   // etc.
  // ]);
  // ```
};
