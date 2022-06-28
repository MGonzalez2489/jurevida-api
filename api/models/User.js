/**
 * Usuario.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    email: {
      type: 'string',
      description: 'Email e identificador unico del usuario.',
      required: true,
      unique: true,
      isEmail: true,
      maxLength: 200,
      example: 'carol.test@example.com',
    },
    password: {
      type: 'string',
      protect: true,
      example: '2$28a8eabna301089103-13948134nad',
    },
    firstName: {
      type: 'string',
      required: true,
      maxLength: 120,
      example: 'Alejandra',
    },
    lastName: {
      type: 'string',
      required: true,
      maxLength: 120,
      example: 'Gonzalez',
    },
    fullName: {
      type: 'string',
    },
    phone: {
      type: 'string',
      required: true,
      example: '6147894512',
    },
    gender: {
      type: 'string',
      required: true,
      example: 'masculino',
      isIn: ['masculino', 'femenino'],
    },
    address: {
      type: 'string',
      required: false,
    },
    firstLogin: {
      type: 'boolean',
      required: false,
      defaultsTo: true,
      description:
        'When one user is created, they must to change the password on the first login',
    },
    resetPasswordToken: {
      type: 'string',
      required: false,
      allowNull: true,
      description:
        'This value is used when the user request a reset password workflow',
    },
    avatar: { type: 'string', allowNull: true },
    council: {
      model: 'CouncilProfile',
    },
    sponsor: {
      model: 'SponsorProfile',
    },
    associated: {
      model: 'AssociatedProfile',
    },
    administrator: {
      model: 'AdministratorProfile',
    },
  },
  beforeCreate: async function (valuesToSet, proceed) {
    valuesToSet.publicId = await sails.helpers.generateGuid();
    valuesToSet.fullName = `${valuesToSet.firstName} ${valuesToSet.lastName}`;
    valuesToSet.password = await EncriptService.encriptString(
      valuesToSet.password
    );
    return proceed();
  },
  beforeUpdate: async function (valuesToSet, proceed) {
    if (valuesToSet.firstName || valuesToSet.lastName)
      valuesToSet.fullName = `${valuesToSet.firstName} ${valuesToSet.lastName}`;
    return proceed();
  },
  customToJSON: function () {
    let result = _.omit(this, [
      'id',
      'createdBy',
      'updatedAt',
      'updatedBy',
      'deletedAt',
      'deletedBy',
      'password',
      'resetPasswordToken',
    ]);

    if (result.council && _.isObject(result.council)) {
      delete result.council.user;
    }
    if (result.sponsor && _.isObject(result.sponsor)) {
      delete result.sponsor.user;
    }
    if (result.associated && _.isObject(result.associated)) {
      delete result.associated.user;
    }

    return result;
  },
  generateModelNewUser: async function (req) {
    const newUser = req.body;
    newUser.firstLogin = true;
    newUser.publicId = 'guid';

    if (newUser.address === '' || newUser.address === null) {
      delete newUser.address;
    }
    newUser.createdBy = req.session.user.email;

    return newUser;
  },
  generateModelExistingUser: async function (req) {
    const newUser = req.body;

    if (newUser.address === '' || newUser.address === null) {
      delete newUser.address;
    }
    newUser.updatedBy = req.session.user.email;

    return newUser;
  },

  validateNewUser: async function (newUser) {
    if (!newUser.firstName) {
      return 'Nombre de usuario es requerido.';
    }
    if (!newUser.lastName) {
      return 'Apellido de usuario es requerido.';
    }

    return null;
  },
};
