const { genericHandler } = require('../genericHandler');

/**
 * creates a new document and attaches it to a case.  It also creates a work item on the docket section.
 *
 * @param {object} event the AWS event object
 * @returns {Promise<*|undefined>} the api gateway response object containing the statusCode, body, and headers
 */
exports.virusScanPdfLambda = event =>
  genericHandler(
    event,
    async () => {
      return {
        message: 'skipping clamav virus scan',
      };
    },
    {
      logEvent: true,
    },
  );