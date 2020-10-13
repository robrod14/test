const {
  prepareDateFromString,
} = require('../../../business/utilities/DateHandler');
const { query } = require('../../dynamodbClientService');

exports.getDocumentQCServedForSection = async ({
  applicationContext,
  section,
}) => {
  const afterDate = prepareDateFromString()
    .startOf('day')
    .subtract(7, 'd')
    .utc()
    .format();

  const workItems = await query({
    ExpressionAttributeNames: {
      '#pk': 'pk',
      '#sk': 'sk',
    },
    ExpressionAttributeValues: {
      ':afterDate': afterDate,
      ':pk': `section-outbox|${section}`,
    },
    KeyConditionExpression: '#pk = :pk AND #sk >= :afterDate',
    applicationContext,
  });

  return workItems.filter(workItem => !!workItem.completedAt);
};
