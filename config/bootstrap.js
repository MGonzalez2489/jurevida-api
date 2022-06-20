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
  await generateAssociates();
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
      await User.createEach([
        {
          email: 'admin@test.com',
          password: '12345',
          firstName: 'Lola',
          lastName: 'Perez',
          phone: '6391233212',
          gender: 'femenino',
          firstLogin: false,
          publicId: await sails.helpers.generateGuid(),
          roles: [rootRole.id],
        },
        {
          email: 'test2@test.com',
          password: '12345',
          firstName: 'Lola',
          lastName: 'Perez',
          phone: '6391233212',
          gender: 'femenino',
          publicId: await sails.helpers.generateGuid(),
          roles: [administradorRole.id],
        },
        {
          email: 'test3@test.com',
          password: '12345',
          firstName: 'Lola',
          lastName: 'Perez',
          phone: '6391233212',
          gender: 'femenino',
          publicId: await sails.helpers.generateGuid(),
          roles: [consejoRole.id],
        },
        {
          email: 'test4@test.com',
          password: '12345',
          firstName: 'Lola',
          lastName: 'Perez',
          phone: '6391233212',
          gender: 'femenino',
          publicId: await sails.helpers.generateGuid(),
          roles: [patrocinadorRole.id],
        },
        {
          email: 'test5@test.com',
          password: '12345',
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
  async function generateAssociates() {
    let existingAssociates = await Associated.find();
    if (existingAssociates.length === 0) {
      await Associated.createEach([
        {
          name: 'Rosalva Avena Díaz',
          placeOfBirth: 'Nuevo Casas Grandes, Chih. / 4 de Mayo de 1971',
          rfc: 'AEDR710504MA0',
          maritalStatus: 'Soltera',
          profession: 'Lic. en Administración de Empresas',
          phone: '6144271943',
          email: 'rosalva.avena@uis.com.mx',
          address:
            'Privada de Fresno 1506, Col. Las Granjas, Chihuahua, Chih. C.P. 31100',
          avatar: 'https://i.pravatar.cc/300?img=1',
          publicId: await sails.helpers.generateGuid(),
        },
        {
          name: 'Selene Mendoza Espino',
          placeOfBirth: 'Chihuahua, Chih. / 7 de agosto de 1975',
          rfc: 'MEES750807137',
          maritalStatus: 'Casada',
          profession: 'Maestra en Administración',
          phone: '6141826885',
          email: 'pendiente',
          address: 'Calle 52 #5002, Col. Rosario, Chihuahua, Chih. C.P. 31030',
          avatar: 'https://i.pravatar.cc/300?img=2',
          publicId: await sails.helpers.generateGuid(),
        },
        {
          name: 'María de la Merced Velázquez Quintana',
          placeOfBirth: 'Santa Bárbara, Chih. / 23 de Septiembre de 1962',
          rfc: 'VEQM620923V77',
          maritalStatus: 'Soltera',
          profession: 'Neuróloga',
          phone: '6141423440',
          email: 'merced.velazquez@uis.com.mx',
          address:
            'Privada de Fresno 1506, Col. Las Granjas, Chihuahua, CHih. C.P. 31100',
          avatar: 'https://i.pravatar.cc/300?img=3',
          publicId: await sails.helpers.generateGuid(),
        },
        {
          name: 'Luis Villegas Montes',
          placeOfBirth: 'Chihuahua, Chih. / 5 de julio de 1966',
          rfc: 'VIML660705',
          maritalStatus: 'Soltero',
          profession: 'Doctor en Derecho',
          phone: '6141833934',
          email: 'luvimo6608@gmail.com',
          address:
            'Calle Adolfo de la Huerta #443, Unidad Presidentes, Chihuahua, Chih.',
          avatar: 'https://i.pravatar.cc/300?img=4',
          publicId: await sails.helpers.generateGuid(),
        },
      ]);
    }
  }
};
