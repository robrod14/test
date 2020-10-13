const {
  ADC_SECTION,
  DOCKET_SECTION,
  PETITIONS_SECTION,
  ROLES,
} = require('../business/entities/EntityConstants');

exports.MOCK_USERS = {
  '330d4b65-620a-489d-8414-6623653ebc4f': {
    barNumber: 'BN1234',
    name: 'Private Practitioner',
    role: ROLES.privatePractitioner,
    section: 'privatePractitioner',
    userId: '330d4b65-620a-489d-8414-6623653ebc4f',
  },
  'a7d90c05-f6cd-442c-a168-202db587f16f': {
    name: 'Docketclerk',
    role: ROLES.docketClerk,
    section: DOCKET_SECTION,
    userId: 'a7d90c05-f6cd-442c-a168-202db587f16f',
  },
  'b7d90c05-f6cd-442c-a168-202db587f16f': {
    name: 'Docketclerk1',
    role: ROLES.docketClerk,
    section: DOCKET_SECTION,
    userId: 'b7d90c05-f6cd-442c-a168-202db587f16f',
  },
  'c7d90c05-f6cd-442c-a168-202db587f16f': {
    name: 'Petitionsclerk',
    role: ROLES.petitionsClerk,
    section: PETITIONS_SECTION,
    userId: 'c7d90c05-f6cd-442c-a168-202db587f16f',
  },
  'd7d90c05-f6cd-442c-a168-202db587f16f': {
    name: 'Tax Payer',
    role: ROLES.petitioner,
    section: 'petitioner',
    userId: 'd7d90c05-f6cd-442c-a168-202db587f16f',
  },
  'e7d90c05-f6cd-442c-a168-202db587f16f': {
    name: 'Petitionsclerk1',
    role: ROLES.petitionsClerk,
    section: PETITIONS_SECTION,
    userId: 'e7d90c05-f6cd-442c-a168-202db587f16f',
  },
  'f7d90c05-f6cd-442c-a168-202db587f16f': {
    barNumber: 'BN2345',
    contact: {},
    name: 'IRS Practitioner',
    role: ROLES.irsPractitioner,
    section: 'irsPractitioner',
    userId: 'f7d90c05-f6cd-442c-a168-202db587f16f',
  },
  'g7d90c05-f6cd-442c-a168-202db587f16f': {
    name: 'ADC',
    role: ROLES.adc,
    section: ADC_SECTION,
    userId: 'g7d90c05-f6cd-442c-a168-202db587f16f',
  },
};
