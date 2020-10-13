const {
  applicationContext,
} = require('../../test/createTestApplicationContext');
const {
  CASE_TYPES_MAP,
  COUNTRY_TYPES,
  PARTY_TYPES,
} = require('../EntityConstants');
const { CaseExternalIncomplete } = require('./CaseExternalIncomplete');

describe('CaseExternalIncomplete entity', () => {
  describe('isValid', () => {
    it('assigns a new irsNoticeDate if one is not passed in', () => {
      const caseExternalIncomplete = new CaseExternalIncomplete(
        {
          caseType: CASE_TYPES_MAP.other,
          contactPrimary: {
            address1: '99 South Oak Lane',
            address2: 'Culpa numquam saepe ',
            address3: 'Eaque voluptates com',
            city: 'Dignissimos voluptat',
            countryType: COUNTRY_TYPES.DOMESTIC,
            email: 'petitioner1@example.com',
            name: 'Priscilla Kline',
            phone: '+1 (215) 128-6587',
            postalCode: '69580',
            state: 'AR',
          },
          contactSecondary: {},
          filingType: 'Myself',
          hasIrsNotice: false,
          irsNoticeDate: null,
          partyType: PARTY_TYPES.petitioner,
          petitionFileId: '102e29fa-bb8c-43ff-b18f-ddce9089dd80',
          preferredTrialCity: 'Memphis, Tennessee',
          procedureType: 'Small',
        },
        { applicationContext },
      );
      expect(caseExternalIncomplete.getFormattedValidationErrors()).toEqual(
        null,
      );
    });
  });
});
