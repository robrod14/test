const {
  applicationContext,
} = require('../../test/createTestApplicationContext');
const {
  COUNTRY_TYPES,
  DOCKET_NUMBER_SUFFIXES,
  OPINION_EVENT_CODES,
  SERVICE_INDICATOR_TYPES,
} = require('../../entities/EntityConstants');
const {
  opinionPublicSearchInteractor,
} = require('./opinionPublicSearchInteractor');

describe('opinionPublicSearchInteractor', () => {
  const mockOpinionSearchResult = [
    {
      caseCaption: 'Reuben Blair, Petitioner',
      contactPrimary: {
        address1: '66 East Clarendon Parkway',
        address2: 'Ut culpa cum sint ',
        address3: 'In laboris hic volup',
        city: 'Omnis dignissimos at',
        countryType: COUNTRY_TYPES.DOMESTIC,
        email: 'petitioner',
        name: 'Reuben Blair',
        phone: '+1 (338) 996-7072',
        postalCode: '92017',
        serviceIndicator: SERVICE_INDICATOR_TYPES.SI_ELECTRONIC,
        state: 'DC',
      },
      contactSecondary: {},
      docketEntryId: '6945cdff-fd12-422b-bf2c-63b792b7f618',
      docketNumber: '103-20',
      docketNumberSuffix: DOCKET_NUMBER_SUFFIXES.LIEN_LEVY,
      documentTitle: 'Memorandum Opinion Judge Armen',
      filingDate: '2020-05-12T18:42:10.471Z',
      irsPractitioners: [],
      isSealed: false,
      numberOfPages: 1,
      privatePractitioners: [],
      signedJudgeName: 'Maurice B. Foley',
    },
  ];

  beforeEach(() => {
    applicationContext
      .getPersistenceGateway()
      .advancedDocumentSearch.mockResolvedValue(mockOpinionSearchResult);
  });

  it('should only search for opinion document types', async () => {
    await opinionPublicSearchInteractor({
      applicationContext,
      keyword: 'fish',
      startDate: '2001-01-01',
    });

    expect(
      applicationContext.getPersistenceGateway().advancedDocumentSearch.mock
        .calls[0][0],
    ).toMatchObject({
      documentEventCodes: OPINION_EVENT_CODES,
    });
  });

  it('should return search results based on the supplied opinion keyword', async () => {
    const result = await opinionPublicSearchInteractor({
      applicationContext,
      keyword: 'memorandum',
      startDate: '2001-01-01',
    });

    expect(result).toEqual(mockOpinionSearchResult);
  });
});
