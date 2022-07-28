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
  if (sails.config.custom.shouldCreateSeedData === true) {
    generateBankAssistant();
    jurevidaConfig();
    generateUserData();
    generateCouncilProfile();
    generateSponsorProfile();
    generateAssociatedProfile();
    generateDocuments();
    generateAdminProfile();
  }
  async function jurevidaConfig() {
    await JurevidaConfig.createEach([
      {
        id: 1,
        key: sails.config.custom.CONFIG_KEY.DOCS_PATH,
        value: '.tmp/uploads/',
      },
    ]);
  }
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
  async function generateAdminProfile() {
    await AdministratorProfile.createEach([
      {
        user: 1,
        publicId: '-',
      },
    ]);
    await User.update({ id: 1 }).set({ administrator: 1 });
  }
  async function generateDocuments() {
    await Document.createEach([
      {
        name: 'El Principito',
        url: 'https://www.descubrelima.pe/wp-content/uploads/2020/03/EL-PRINCIPITO.pdf',
        publicId: 'test',
      },
      {
        name: 'Don Quijote de la Mancha',
        url: 'http://www.daemcopiapo.cl/Biblioteca/Archivos/7_6253.pdf',
        publicId: 'test',
      },
    ]);
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

  //financial bank assistant
  async function generateBankAssistant() {
    const newAssistant = await FinancialAssistant.create({
      id: 1,
      bank: 'Santander',
      accountNumber: '1234123412341234',
      isPettyCash: false,
      publicId: '-',
    }).fetch();
    const lastDayOfTheYear = await sails.helpers.getLastDayOfTheYear();

    const newPeriod = await FinancialPeriod.create({
      id: 1,
      startDate: new Date().toISOString(),
      endDate: lastDayOfTheYear.toISOString(),
      startAmount: 1500000,
      currentAmount: 1500000,
      endAmount: 0,
      active: true,
      assistant: newAssistant.id,
      publicId: '-',
    }).fetch();

    await FinancialMovement.createEach([
      {
        id: 1,
        type: 'expense',
        amount: 40,
        concept: 'Knife Plastic - White',
        period: 1,
        publicId: '-',
        sponsor: null,
        name: 'Sonsing',
      },
      {
        id: 2,
        type: 'expense',
        amount: 136,
        concept: 'Honey - Liquid',
        period: 1,
        publicId: '-',
        sponsor: null,
        name: 'Zoolab',
      },
      {
        id: 3,
        type: 'income',
        amount: 107,
        concept: 'Wine - Sogrape Mateus Rose',
        period: 1,
        publicId: '-',
        sponsor: 1,
        name: null,
      },
      {
        id: 4,
        type: 'expense',
        amount: 388,
        concept: 'Wine - Ej Gallo Sierra Valley',
        period: 1,
        publicId: '-',
        sponsor: 1,
        name: null,
      },
      {
        id: 5,
        type: 'expense',
        amount: 109,
        concept: 'Tomatillo',
        period: 1,
        publicId: '-',
        sponsor: null,
        name: 'Fixflex',
      },
      {
        id: 6,
        type: 'income',
        amount: 696,
        concept: 'Coffee - Irish Cream',
        period: 1,
        publicId: '-',
        sponsor: null,
        name: 'Greenlam',
      },
      {
        id: 7,
        type: 'income',
        amount: 259,
        concept: 'Pork - Bones',
        period: 1,
        publicId: '-',
        sponsor: null,
        name: 'Tempsoft',
      },
      {
        id: 8,
        type: 'expense',
        amount: 55,
        concept: 'Lid - 0090 Clear',
        period: 1,
        publicId: '-',
        sponsor: 1,
        name: null,
      },
      {
        id: 9,
        type: 'income',
        amount: 485,
        concept: 'Danishes - Mini Cheese',
        period: 1,
        publicId: '-',
        sponsor: null,
        name: 'Cardify',
      },
      {
        id: 10,
        type: 'expense',
        amount: 639,
        concept: 'Flour - Cake',
        period: 1,
        publicId: '-',
        sponsor: null,
        name: 'Flexidy',
      },
      {
        id: 11,
        type: 'income',
        amount: 728,
        concept: 'Wine - Cotes Du Rhone Parallele',
        period: 1,
        publicId: '-',
        sponsor: null,
        name: 'It',
      },
      {
        id: 12,
        type: 'expense',
        amount: 403,
        concept: 'Fish - Halibut, Cold Smoked',
        period: 1,
        publicId: '-',
        sponsor: null,
        name: 'Hatity',
      },
      {
        id: 13,
        type: 'expense',
        amount: 589,
        concept: 'Squid - Breaded',
        period: 1,
        publicId: '-',
        sponsor: null,
        name: 'Matsoft',
      },
      {
        id: 14,
        type: 'expense',
        amount: 88,
        concept: 'Yokaline',
        period: 1,
        publicId: '-',
        sponsor: null,
        name: 'Span',
      },
      {
        id: 15,
        type: 'income',
        amount: 565,
        concept: 'Cheese - Montery Jack',
        period: 1,
        publicId: '-',
        sponsor: null,
        name: 'Zontrax',
      },
      {
        id: 16,
        type: 'income',
        amount: 618,
        concept: 'Swiss Chard - Red',
        period: 1,
        publicId: '-',
        sponsor: 1,
        name: null,
      },
      {
        id: 17,
        type: 'income',
        amount: 695,
        concept: 'Corn - Mini',
        period: 1,
        publicId: '-',
        sponsor: 1,
        name: null,
      },
      {
        id: 18,
        type: 'income',
        amount: 170,
        concept: 'Beer - Sleeman Fine Porter',
        period: 1,
        publicId: '-',
        sponsor: 1,
        name: null,
      },
      {
        id: 19,
        type: 'income',
        amount: 192,
        concept: 'Horseradish Root',
        period: 1,
        publicId: '-',
        sponsor: null,
        name: 'Subin',
      },
      {
        id: 20,
        type: 'income',
        amount: 689,
        concept: 'Piping - Bags Quizna',
        period: 1,
        publicId: '-',
        sponsor: 2,
        name: null,
      },
      {
        id: 21,
        type: 'expense',
        amount: 770,
        concept: 'Soupfoamcont12oz 112con',
        period: 1,
        publicId: '-',
        sponsor: null,
        name: 'Bitchip',
      },
      {
        id: 22,
        type: 'expense',
        amount: 707,
        concept: 'Beef - Rouladin, Sliced',
        period: 1,
        publicId: '-',
        sponsor: null,
        name: 'Opela',
      },
      {
        id: 23,
        type: 'expense',
        amount: 798,
        concept: 'Cucumber - Pickling Ontario',
        period: 1,
        publicId: '-',
        sponsor: 2,
        name: null,
      },
      {
        id: 24,
        type: 'expense',
        amount: 425,
        concept: 'Lettuce - Lolla Rosa',
        period: 1,
        publicId: '-',
        sponsor: null,
        name: 'Namfix',
      },
      {
        id: 25,
        type: 'income',
        amount: 98,
        concept: 'Melon - Watermelon Yellow',
        period: 1,
        publicId: '-',
        sponsor: 1,
        name: null,
      },
      {
        id: 26,
        type: 'expense',
        amount: 874,
        concept: 'Peppercorns - Green',
        period: 1,
        publicId: '-',
        sponsor: null,
        name: 'Prodder',
      },
      {
        id: 27,
        type: 'income',
        amount: 967,
        concept: 'Wine - Shiraz South Eastern',
        period: 1,
        publicId: '-',
        sponsor: null,
        name: 'Fixflex',
      },
      {
        id: 28,
        type: 'income',
        amount: 242,
        concept: 'Pepper - Chipotle, Canned',
        period: 1,
        publicId: '-',
        sponsor: 1,
        name: null,
      },
      {
        id: 29,
        type: 'income',
        amount: 933,
        concept: 'Extract - Vanilla,artificial',
        period: 1,
        publicId: '-',
        sponsor: 1,
        name: null,
      },
      {
        id: 30,
        type: 'income',
        amount: 487,
        concept: 'Berry Brulee',
        period: 1,
        publicId: '-',
        sponsor: 1,
        name: null,
      },
      {
        id: 31,
        type: 'income',
        amount: 121,
        concept: 'Sugar - Crumb',
        period: 1,
        publicId: '-',
        sponsor: null,
        name: 'Konklab',
      },
      {
        id: 32,
        type: 'expense',
        amount: 907,
        concept: 'Vaccum Bag 10x13',
        period: 1,
        publicId: '-',
        sponsor: 2,
        name: null,
      },
      {
        id: 33,
        type: 'income',
        amount: 669,
        concept: 'Fiddlehead - Frozen',
        period: 1,
        publicId: '-',
        sponsor: 2,
        name: null,
      },
      {
        id: 34,
        type: 'income',
        amount: 926,
        concept: 'Wine - Maipo Valle Cabernet',
        period: 1,
        publicId: '-',
        sponsor: 2,
        name: null,
      },
      {
        id: 35,
        type: 'expense',
        amount: 897,
        concept: 'Graham Cracker Mix',
        period: 1,
        publicId: '-',
        sponsor: null,
        name: 'Sub-Ex',
      },
      {
        id: 36,
        type: 'expense',
        amount: 420,
        concept: 'Cauliflower',
        period: 1,
        publicId: '-',
        sponsor: 2,
        name: null,
      },
      {
        id: 37,
        type: 'expense',
        amount: 374,
        concept: 'Shrimp - Black Tiger 16/20',
        period: 1,
        publicId: '-',
        sponsor: null,
        name: 'Asoka',
      },
      {
        id: 38,
        type: 'expense',
        amount: 857,
        concept: 'Pear - Asian',
        period: 1,
        publicId: '-',
        sponsor: 2,
        name: null,
      },
      {
        id: 39,
        type: 'income',
        amount: 272,
        concept: 'Jam - Strawberry, 20 Ml Jar',
        period: 1,
        publicId: '-',
        sponsor: null,
        name: 'Zaam-Dox',
      },
      {
        id: 40,
        type: 'expense',
        amount: 582,
        concept: 'Plaintain',
        period: 1,
        publicId: '-',
        sponsor: 2,
        name: null,
      },
      {
        id: 41,
        type: 'income',
        amount: 244,
        concept: 'Onions - White',
        period: 1,
        publicId: '-',
        sponsor: 1,
        name: null,
      },
      {
        id: 42,
        type: 'income',
        amount: 244,
        concept: 'Beans - Navy, Dry',
        period: 1,
        publicId: '-',
        sponsor: null,
        name: 'Voyatouch',
      },
      {
        id: 43,
        type: 'expense',
        amount: 266,
        concept: 'Gelatine Powder',
        period: 1,
        publicId: '-',
        sponsor: 2,
        name: null,
      },
      {
        id: 44,
        type: 'income',
        amount: 198,
        concept: 'Leeks - Baby, White',
        period: 1,
        publicId: '-',
        sponsor: null,
        name: 'Quo Lux',
      },
      {
        id: 45,
        type: 'income',
        amount: 588,
        concept: 'Chinese Foods - Pepper Beef',
        period: 1,
        publicId: '-',
        sponsor: 1,
        name: null,
      },
      {
        id: 46,
        type: 'expense',
        amount: 337,
        concept: 'Chevere Logs',
        period: 1,
        publicId: '-',
        sponsor: null,
        name: 'Sub-Ex',
      },
      {
        id: 47,
        type: 'expense',
        amount: 625,
        concept: 'Muffin Orange Individual',
        period: 1,
        publicId: '-',
        sponsor: null,
        name: 'Stronghold',
      },
      {
        id: 48,
        type: 'expense',
        amount: 942,
        concept: 'Veal - Inside',
        period: 1,
        publicId: '-',
        sponsor: null,
        name: 'Toughjoyfax',
      },
      {
        id: 49,
        type: 'income',
        amount: 790,
        concept: 'Mace Ground',
        period: 1,
        publicId: '-',
        sponsor: 1,
        name: null,
      },
      {
        id: 50,
        type: 'expense',
        amount: 631,
        concept: 'Appetiser - Bought',
        period: 1,
        publicId: '-',
        sponsor: null,
        name: 'Overhold',
      },
      {
        id: 51,
        type: 'income',
        amount: 84,
        concept: 'Venison - Ground',
        period: 1,
        publicId: '-',
        sponsor: 2,
        name: null,
      },
      {
        id: 52,
        type: 'income',
        amount: 687,
        concept: 'Pail With Metal Handle 16l White',
        period: 1,
        publicId: '-',
        sponsor: 1,
        name: null,
      },
      {
        id: 53,
        type: 'expense',
        amount: 939,
        concept: 'Cookies Almond Hazelnut',
        period: 1,
        publicId: '-',
        sponsor: null,
        name: 'Flowdesk',
      },
      {
        id: 54,
        type: 'income',
        amount: 1000,
        concept: 'Muffin Mix - Carrot',
        period: 1,
        publicId: '-',
        sponsor: null,
        name: 'Home Ing',
      },
      {
        id: 55,
        type: 'expense',
        amount: 680,
        concept: 'Wine - Masi Valpolocell',
        period: 1,
        publicId: '-',
        sponsor: null,
        name: 'Holdlamis',
      },
      {
        id: 56,
        type: 'income',
        amount: 322,
        concept: 'Maple Syrup',
        period: 1,
        publicId: '-',
        sponsor: null,
        name: 'Otcom',
      },
      {
        id: 57,
        type: 'income',
        amount: 208,
        concept: 'Pasta - Penne, Lisce, Dry',
        period: 1,
        publicId: '-',
        sponsor: 2,
        name: null,
      },
      {
        id: 58,
        type: 'income',
        amount: 872,
        concept: 'Paper Cocktail Umberlla 80 - 180',
        period: 1,
        publicId: '-',
        sponsor: null,
        name: 'Sonsing',
      },
      {
        id: 59,
        type: 'income',
        amount: 944,
        concept: 'Wine - Bouchard La Vignee Pinot',
        period: 1,
        publicId: '-',
        sponsor: null,
        name: 'Cookley',
      },
      {
        id: 60,
        type: 'income',
        amount: 758,
        concept: 'Vinegar - Rice',
        period: 1,
        publicId: '-',
        sponsor: 1,
        name: null,
      },
      {
        id: 61,
        type: 'income',
        amount: 55,
        concept: 'Soup - Knorr, Country Bean',
        period: 1,
        publicId: '-',
        sponsor: 2,
        name: null,
      },
      {
        id: 62,
        type: 'income',
        amount: 846,
        concept: 'Split Peas - Yellow, Dry',
        period: 1,
        publicId: '-',
        sponsor: 2,
        name: null,
      },
      {
        id: 63,
        type: 'income',
        amount: 222,
        concept: 'Sauce - Demi Glace',
        period: 1,
        publicId: '-',
        sponsor: null,
        name: 'Prodder',
      },
      {
        id: 64,
        type: 'expense',
        amount: 208,
        concept: 'Tart Shells - Sweet, 4',
        period: 1,
        publicId: '-',
        sponsor: 1,
        name: null,
      },
      {
        id: 65,
        type: 'income',
        amount: 845,
        concept: 'Flour - Whole Wheat',
        period: 1,
        publicId: '-',
        sponsor: 1,
        name: null,
      },
      {
        id: 66,
        type: 'income',
        amount: 374,
        concept: 'Cheese - Bocconcini',
        period: 1,
        publicId: '-',
        sponsor: null,
        name: 'Stringtough',
      },
      {
        id: 67,
        type: 'income',
        amount: 177,
        concept: 'Rice - 7 Grain Blend',
        period: 1,
        publicId: '-',
        sponsor: null,
        name: 'Fixflex',
      },
      {
        id: 68,
        type: 'income',
        amount: 131,
        concept: 'Wine - Alicanca Vinho Verde',
        period: 1,
        publicId: '-',
        sponsor: null,
        name: 'Daltfresh',
      },
      {
        id: 69,
        type: 'income',
        amount: 84,
        concept: 'Cheese - Goat',
        period: 1,
        publicId: '-',
        sponsor: null,
        name: 'Hatity',
      },
      {
        id: 70,
        type: 'income',
        amount: 231,
        concept: 'Tandoori Curry Paste',
        period: 1,
        publicId: '-',
        sponsor: 1,
        name: null,
      },
      {
        id: 71,
        type: 'income',
        amount: 605,
        concept: 'Oil - Avocado',
        period: 1,
        publicId: '-',
        sponsor: null,
        name: 'Keylex',
      },
      {
        id: 72,
        type: 'expense',
        amount: 328,
        concept: 'Wine - Sogrape Mateus Rose',
        period: 1,
        publicId: '-',
        sponsor: null,
        name: 'Holdlamis',
      },
      {
        id: 73,
        type: 'income',
        amount: 490,
        concept: 'Buffalo - Tenderloin',
        period: 1,
        publicId: '-',
        sponsor: 2,
        name: null,
      },
      {
        id: 74,
        type: 'income',
        amount: 385,
        concept: 'Broccoli - Fresh',
        period: 1,
        publicId: '-',
        sponsor: null,
        name: 'Wrapsafe',
      },
      {
        id: 75,
        type: 'expense',
        amount: 887,
        concept: 'Bowl 12 Oz - Showcase 92012',
        period: 1,
        publicId: '-',
        sponsor: null,
        name: 'Toughjoyfax',
      },
      {
        id: 76,
        type: 'income',
        amount: 30,
        concept: 'Mountain Dew',
        period: 1,
        publicId: '-',
        sponsor: null,
        name: 'Toughjoyfax',
      },
      {
        id: 77,
        type: 'expense',
        amount: 243,
        concept: 'Chinese Foods - Thick Noodles',
        period: 1,
        publicId: '-',
        sponsor: null,
        name: 'Gembucket',
      },
      {
        id: 78,
        type: 'income',
        amount: 42,
        concept: 'Coke - Classic, 355 Ml',
        period: 1,
        publicId: '-',
        sponsor: 1,
        name: null,
      },
      {
        id: 79,
        type: 'income',
        amount: 412,
        concept: 'Beef - Bresaola',
        period: 1,
        publicId: '-',
        sponsor: 2,
        name: null,
      },
      {
        id: 80,
        type: 'income',
        amount: 897,
        concept: 'Basil - Seedlings Cookstown',
        period: 1,
        publicId: '-',
        sponsor: 1,
        name: null,
      },
      {
        id: 81,
        type: 'income',
        amount: 112,
        concept: 'Vinegar - White Wine',
        period: 1,
        publicId: '-',
        sponsor: null,
        name: 'Latlux',
      },
      {
        id: 82,
        type: 'income',
        amount: 40,
        concept: 'Bread - Pita',
        period: 1,
        publicId: '-',
        sponsor: null,
        name: 'Fix San',
      },
      {
        id: 83,
        type: 'income',
        amount: 930,
        concept: 'Lettuce - Radicchio',
        period: 1,
        publicId: '-',
        sponsor: null,
        name: 'Toughjoyfax',
      },
      {
        id: 84,
        type: 'income',
        amount: 346,
        concept: 'Garlic - Elephant',
        period: 1,
        publicId: '-',
        sponsor: null,
        name: 'Stronghold',
      },
      {
        id: 85,
        type: 'income',
        amount: 941,
        concept: 'Beef - Ox Tail, Frozen',
        period: 1,
        publicId: '-',
        sponsor: null,
        name: 'Konklab',
      },
      {
        id: 86,
        type: 'income',
        amount: 560,
        concept: 'Venison - Racks Frenched',
        period: 1,
        publicId: '-',
        sponsor: null,
        name: 'Voltsillam',
      },
      {
        id: 87,
        type: 'expense',
        amount: 708,
        concept: 'Pants Custom Dry Clean',
        period: 1,
        publicId: '-',
        sponsor: null,
        name: 'Stronghold',
      },
      {
        id: 88,
        type: 'income',
        amount: 80,
        concept: 'Wine - Chateau Timberlay',
        period: 1,
        publicId: '-',
        sponsor: 1,
        name: null,
      },
      {
        id: 89,
        type: 'expense',
        amount: 274,
        concept: 'Lemonade - Black Cherry, 591 Ml',
        period: 1,
        publicId: '-',
        sponsor: null,
        name: 'Pannier',
      },
      {
        id: 90,
        type: 'expense',
        amount: 664,
        concept: 'Contreau',
        period: 1,
        publicId: '-',
        sponsor: 2,
        name: null,
      },
      {
        id: 91,
        type: 'income',
        amount: 920,
        concept: 'Pork - Suckling Pig',
        period: 1,
        publicId: '-',
        sponsor: 1,
        name: null,
      },
      {
        id: 92,
        type: 'expense',
        amount: 91,
        concept: 'Eggwhite Frozen',
        period: 1,
        publicId: '-',
        sponsor: null,
        name: 'Zathin',
      },
      {
        id: 93,
        type: 'expense',
        amount: 421,
        concept: 'Goldschalger',
        period: 1,
        publicId: '-',
        sponsor: 1,
        name: null,
      },
      {
        id: 94,
        type: 'expense',
        amount: 329,
        concept: 'Tamarillo',
        period: 1,
        publicId: '-',
        sponsor: null,
        name: 'Sonsing',
      },
      {
        id: 95,
        type: 'expense',
        amount: 927,
        concept: 'Pop - Club Soda Can',
        period: 1,
        publicId: '-',
        sponsor: 1,
        name: null,
      },
      {
        id: 96,
        type: 'expense',
        amount: 821,
        concept: 'Sour Puss - Tangerine',
        period: 1,
        publicId: '-',
        sponsor: null,
        name: 'Bitwolf',
      },
      {
        id: 97,
        type: 'income',
        amount: 670,
        concept: 'Eel Fresh',
        period: 1,
        publicId: '-',
        sponsor: null,
        name: 'Voyatouch',
      },
      {
        id: 98,
        type: 'income',
        amount: 307,
        concept: 'Bread - Ciabatta Buns',
        period: 1,
        publicId: '-',
        sponsor: 2,
        name: null,
      },
      {
        id: 99,
        type: 'expense',
        amount: 326,
        concept: 'Red Cod Fillets - 225g',
        period: 1,
        publicId: '-',
        sponsor: 1,
        name: null,
      },
      {
        id: 100,
        type: 'expense',
        amount: 625,
        concept: 'Flour - Cake',
        period: 1,
        publicId: '-',
        sponsor: 1,
        name: null,
      },
    ]).fetch();
  }
};
