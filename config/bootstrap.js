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
        name: "root",
        displayName: "root",
        publicId: GuidService.generateGuid(),
      },
      {
        name: "administrador",
        displayName: "Administrador",
        publicId: GuidService.generateGuid(),
      },
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
    ]);
  }

  existingRoles = await Role.find();
  const existingUsers = await User.find();
  const rootRole = existingRoles.find(function (r) {
    return r.name == "root";
  });
  console.log("root role", rootRole);
  const administrativeRole = existingRoles.find(
    (r) => r.name == "administrador"
  );
  const consejoRole = existingRoles.find((r) => r.name == "consejo");
  const patrocinadorRole = existingRoles.find((r) => r.name == "patrocinador");

  if (existingUsers.length == 0) {
    const gralPassword = await EncriptService.encriptString("12345");
    await User.createEach([
      {
        email: "admin@test.com",
        password: gralPassword,
        firstName: "Lola",
        lastName: "Perez",
        birthday: "25092000",
        phone: "6391233212",
        gender: "femenino",
        publicId: GuidService.generateGuid(),
        roles: [rootRole.id],
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
        roles: [administrativeRole.id],
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
        roles: [consejoRole.id],
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
        roles: [patrocinadorRole.id],
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
        roles: [consejoRole.id, patrocinadorRole.id],
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
