const { get } = require('../requests');

/**
 * getOutboxMessagesForSectionInteractor
 *
 * @param {object} providers the providers object
 * @param {object} providers.applicationContext the application context
 * @param {string} providers.section the section
 * @returns {Promise<*>} the promise of the api call
 */
exports.getOutboxMessagesForSectionInteractor = ({
  applicationContext,
  section,
}) => {
  return get({
    applicationContext,
    endpoint: `/messages/outbox/section/${section}`,
  });
};
