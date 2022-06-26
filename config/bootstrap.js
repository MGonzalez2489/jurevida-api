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
  generateUserData();
  generateCouncilProfile();
  generateSponsorProfile();
  generateAssociatedProfile();

  async function generateUserData() {
    await User.createEach([
      {
        id: 1,
        publicId: 'ec0c91f2-06b1-4e1f-a357-fe13c5f559c8',
        firstName: 'Admin',
        lastName: 'testing',
        email: 'admin@test.com',
        password: '12345',
        gender: 'masculino',
        address: '435 Everett Plaza',
        firstLogin: false,
        avatar:
          'https://robohash.org/recusandaererumvoluptas.png?size=800x800&set=set1',
        phone: '2766097566',
      },
      {
        id: 2,
        publicId: await sails.helpers.generateGuid(),
        firstName: 'Rosalva',
        lastName: 'Avena Díaz',
        email: 'rosalva.avena@uis.com.mx',
        password: '12345',
        gender: 'femenino',
        address:
          'Privada de Fresno 1506, Col. Las Granjas, Chihuahua, Chih. C.P. 31100',
        firstLogin: true,
        avatar: 'https://i.pravatar.cc/300?img=1',
        phone: '6144271943',
      },
      {
        id: 3,
        publicId: await sails.helpers.generateGuid(),
        firstName: 'Selene',
        lastName: 'Mendoza Espino',
        email: 'smendoza.congresoch@gmail.com',
        password: '12345',
        gender: 'femenino',
        address: 'Calle 52 #5002, Col. Rosario, Chihuahua, Chih. C.P. 31030',
        firstLogin: true,
        avatar: 'https://i.pravatar.cc/300?img=2',
        phone: '6141826885',
      },
      {
        id: 4,
        publicId: await sails.helpers.generateGuid(),
        firstName: 'María de la Merced',
        lastName: 'Velázquez Quintana',
        email: 'merced.velazquez@uis.com.mx',
        password: '12345',
        gender: 'femenino',
        address:
          'Privada de Fresno 1506, Col. Las Granjas, Chihuahua, CHih. C.P. 31100',
        firstLogin: true,
        avatar: 'https://i.pravatar.cc/300?img=3',
        phone: '6141423440',
      },
      {
        id: 5,
        publicId: await sails.helpers.generateGuid(),
        firstName: 'Luis',
        lastName: 'Villegas Montes',
        email: 'luvimo6608@gmail.com',
        password: '12345',
        gender: 'masculino',
        address:
          'Calle Adolfo de la Huerta #443, Unidad Presidentes, Chihuahua, Chih.',
        firstLogin: true,
        avatar: 'https://i.pravatar.cc/300?img=4',
        phone: '6141833934',
      },
    ]);
  }

  async function generateCouncilProfile() {
    await CouncilProfile.createEach([{ user: 1, publicId: 'test' }]);
    await User.update({ id: 1 }).set({ council: 1 });
    await Contribution.create({
      contribution: 'Esta es mi contribucion',
      council: 1,
      publicId: '-',
    });
  }
  async function generateSponsorProfile() {
    await SponsorProfile.createEach([
      { nickName: 'testing', useNickName: true, user: 1, publicId: 'test' },
      { nickName: 'my nick', useNickName: true, user: 3, publicId: 'test' },
    ]);
    await User.update({ id: 1 }).set({ sponsor: 1 });
    await User.update({ id: 3 }).set({ sponsor: 2 });
  }

  async function generateAssociatedProfile() {
    await AssociatedProfile.createEach([
      {
        placeOfBirth: 'Nuevo Casas Grandes, Chih. / 4 de Mayo de 1971',
        rfc: 'AEDR710504MA0',
        maritalStatus: 'soltero',
        profession: 'Lic. en Administración de Empresas',
        user: 2,
        publicId: 'test',
      },
      {
        placeOfBirth: 'Chihuahua, Chih. / 7 de agosto de 1975',
        rfc: 'MEES750807137',
        maritalStatus: 'casado',
        profession: 'Maestra en Administración',
        user: 3,
        publicId: 'test',
      },

      {
        placeOfBirth: 'Santa Bárbara, Chih. / 23 de Septiembre de 1962',
        rfc: 'VEQM620923V77',
        maritalStatus: 'soltero',
        profession: 'Neuróloga',
        user: 4,
        publicId: 'test',
      },

      {
        placeOfBirth: 'Chihuahua, Chih. / 5 de julio de 1966',
        rfc: 'VIML660705',
        maritalStatus: 'soltero',
        profession: 'Doctor en Derecho',
        user: 5,
        publicId: 'test',
      },
    ]);

    await User.update({ id: 2 }).set({ associated: 1 });
    await User.update({ id: 3 }).set({ associated: 2 });
    await User.update({ id: 4 }).set({ associated: 3 });
    await User.update({ id: 5 }).set({ associated: 4 });
  }
};
