/**
 * Policy Mappings
 * (sails.config.policies)
 *
 * Policies are simple functions which run **before** your actions.
 *
 * For more information on configuring policies, check out:
 * https://sailsjs.com/docs/concepts/policies
 */

module.exports.policies = {
  /***************************************************************************
   *                                                                          *
   * Default policy for all controllers and actions, unless overridden.       *
   * (`true` allows public access)                                            *
   *                                                                          *
   ***************************************************************************/

  // '*': true,

  '*': ['LogRequest'],
  UsersController: {
    '*': ['LogRequest', 'AccessRequest', 'UserFromRequest'],
  },
  CouncilController: {
    '*': ['LogRequest', 'AccessRequest', 'UserFromRequest'],
  },
  SponsorController: {
    '*': ['LogRequest', 'AccessRequest', 'UserFromRequest'],
  },
  ContributionController: {
    '*': ['LogRequest', 'AccessRequest', 'UserFromRequest'],
  },
  DocumentController: {
    '*': ['LogRequest', 'AccessRequest', 'UserFromRequest'],
  },
  AssistantController: {
    '*': ['LogRequest', 'AccessRequest', 'UserFromRequest'],
  },
  PeriodController: {
    '*': ['LogRequest', 'AccessRequest', 'UserFromRequest'],
  },
  MovementController: {
    '*': ['LogRequest', 'AccessRequest', 'UserFromRequest'],
  },

  FinancialController: {
    '*': ['LogRequest', 'AccessRequest', 'UserFromRequest'],
  },
  FinanceController: {
    '*': ['LogRequest', 'AccessRequest', 'UserFromRequest'],
  },
};
