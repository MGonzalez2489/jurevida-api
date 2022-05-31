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
  const existingRoles = await generateRoles();
  await generateUsers(existingRoles);

  async function generateRoles() {
    let existingRoles = await Role.find();
    let availableRoles = sails.config.constants.ROLES;

    if (existingRoles.length === 0) {
      for (const index in availableRoles) {
        const role = availableRoles[index];
        let newRole = {
          name: role,
          displayName: role.charAt(0).toUpperCase() + role.slice(1),
          publicId: await sails.helpers.generateGuid(),
        };
        await Role.create(newRole);
      }
    }

    existingRoles = await Role.find();
    return existingRoles;
  }

  async function generateUsers(roles) {
    let existingUsers = await User.find();
    const rootRole = roles.find((r) => r.name === 'root');
    const administradorRole = roles.find((r) => r.name === 'administrador');
    const consejoRole = roles.find((r) => r.name === 'consejo');
    const patrocinadorRole = roles.find((r) => r.name === 'patrocinador');

    if (existingUsers.length === 0) {
      const gralPassword = await EncriptService.encriptString('12345');
      await User.createEach([
        {
          email: 'admin@test.com',
          password: gralPassword,
          firstName: 'Lola',
          lastName: 'Perez',
          phone: '6391233212',
          gender: 'femenino',
          publicId: await sails.helpers.generateGuid(),
          roles: [rootRole.id],
        },
        {
          email: 'test2@test.com',
          password: gralPassword,
          firstName: 'Lola',
          lastName: 'Perez',
          phone: '6391233212',
          gender: 'femenino',
          publicId: await sails.helpers.generateGuid(),
          roles: [administradorRole.id],
        },
        {
          email: 'test3@test.com',
          password: gralPassword,
          firstName: 'Lola',
          lastName: 'Perez',
          phone: '6391233212',
          gender: 'femenino',
          publicId: await sails.helpers.generateGuid(),
          roles: [consejoRole.id],
        },
        {
          email: 'test4@test.com',
          password: gralPassword,
          firstName: 'Lola',
          lastName: 'Perez',
          phone: '6391233212',
          gender: 'femenino',
          publicId: await sails.helpers.generateGuid(),
          roles: [patrocinadorRole.id],
        },
        {
          email: 'test5@test.com',
          password: gralPassword,
          firstName: 'Lola',
          lastName: 'Perez',
          phone: '6391233212',
          gender: 'femenino',
          publicId: await sails.helpers.generateGuid(),
          roles: [consejoRole.id, patrocinadorRole.id],
        },
      ]);
    }

    existingUsers = User.find();
    return existingUsers;
  }
};
