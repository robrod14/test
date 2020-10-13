const { query } = require('../../dynamodbClientService');

/**
 * getWebSocketConnectionsByUserId
 *
 * @param {object} providers the providers object
 * @param {object} providers.applicationContext the application context
 * @param {object} providers.userId the user id
 * @returns {Promise} the promise of the call to persistence
 */
exports.getWebSocketConnectionsByUserId = async ({
  applicationContext,
  userId,
}) => {
  return await query({
    ExpressionAttributeNames: {
      '#pk': 'pk',
      '#sk': 'sk',
    },
    ExpressionAttributeValues: {
      ':pk': `user|${userId}`,
      ':prefix': 'connection',
    },
    KeyConditionExpression: '#pk = :pk and begins_with(#sk, :prefix)',
    applicationContext,
  });
};
