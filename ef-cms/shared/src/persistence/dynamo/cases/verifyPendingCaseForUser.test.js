const client = require('../../dynamodbClientService');
const {
  applicationContext,
} = require('../../../business/test/createTestApplicationContext');
const { verifyPendingCaseForUser } = require('./verifyPendingCaseForUser');

const userId = '123';
const docketNumber = '123-20';

describe('verifyPendingCaseForUser', () => {
  it('should return true if mapping record for user to case exists', async () => {
    client.query = jest.fn().mockReturnValue([
      {
        pk: 'user|123',
        sk: 'pending-case|123-20',
      },
    ]);
    const result = await verifyPendingCaseForUser({
      applicationContext,
      docketNumber,
      userId,
    });
    expect(result).toEqual(true);
  });
  it('should return false if mapping record for user to case does not exist', async () => {
    client.query = jest.fn().mockReturnValue([]);
    const result = await verifyPendingCaseForUser({
      applicationContext,
      docketNumber,
      userId,
    });
    expect(result).toEqual(false);
  });
});
