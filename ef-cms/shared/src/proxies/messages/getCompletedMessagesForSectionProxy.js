const { get } = require('../requests');

/**
 * getCompletedMessagesForSectionInteractor
 *
 * @param {object} providers the providers object
 * @param {object} providers.applicationContext the application context
 * @param {string} providers.section the section
 * @returns {Promise<*>} the promise of the api call
 */
exports.getCompletedMessagesForSectionInteractor = ({
  applicationContext,
  section,
}) => {
  return get({
    applicationContext,
    endpoint: `/messages/completed/section/${section}`,
  });
};
