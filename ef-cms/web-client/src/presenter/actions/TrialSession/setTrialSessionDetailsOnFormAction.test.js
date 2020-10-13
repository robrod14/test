import { applicationContextForClient as applicationContext } from '../../../../../shared/src/business/test/createTestApplicationContext';
import { presenter } from '../../presenter-mock';
import { runAction } from 'cerebral/test';
import { setTrialSessionDetailsOnFormAction } from './setTrialSessionDetailsOnFormAction';

describe('setTrialSessionDetailsOnFormAction', () => {
  beforeAll(() => {
    presenter.providers.applicationContext = applicationContext;
  });

  it('sets the props.trialSession on state.form, splitting the startDate into month, day, and year', async () => {
    const result = await runAction(setTrialSessionDetailsOnFormAction, {
      modules: {
        presenter,
      },
      props: {
        trialSession: {
          judge: { userId: '456' },
          sessionType: 'Regular',
          startDate: '2019-03-01T21:40:46.415Z',
          trialClerk: { userId: '098' },
          trialSessionId: '123',
        },
      },
      state: { form: {} },
    });
    expect(result.state.form).toEqual({
      day: '1',
      judge: { userId: '456' },
      judgeId: '456',
      month: '3',
      sessionType: 'Regular',
      startDate: '2019-03-01T21:40:46.415Z',
      trialClerk: { userId: '098' },
      trialClerkId: '098',
      trialSessionId: '123',
      year: '2019',
    });
  });
});
