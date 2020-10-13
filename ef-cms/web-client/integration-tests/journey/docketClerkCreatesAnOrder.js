import { formattedCaseDetail } from '../../src/presenter/computeds/formattedCaseDetail';
import { runCompute } from 'cerebral/test';
import { withAppContextDecorator } from '../../src/withAppContext';

export const docketClerkCreatesAnOrder = (test, data) => {
  return it('Docket Clerk creates an order', async () => {
    await test.runSequence('gotoCaseDetailSequence', {
      docketNumber: test.docketNumber,
    });

    await test.runSequence('openCreateOrderChooseTypeModalSequence', {});

    expect(test.getState('modal.documentTitle')).toBeFalsy();

    await test.runSequence('updateCreateOrderModalFormValueSequence', {
      key: 'eventCode',
      value: data.eventCode,
    });

    if (data.expectedDocumentType) {
      expect(test.getState('modal.documentType')).toEqual(
        data.expectedDocumentType,
      );
    } else {
      expect(test.getState('modal.documentType').length).toBeGreaterThan(0);
    }

    await test.runSequence('updateCreateOrderModalFormValueSequence', {
      key: 'documentTitle',
      value: data.documentTitle,
    });

    await test.runSequence('submitCreateOrderModalSequence');

    expect(test.getState('currentPage')).toBe('CreateOrder');

    await test.runSequence('updateFormValueSequence', {
      key: 'richText',
      value: 'Some order content',
    });
    await test.runSequence('updateFormValueSequence', {
      key: 'documentContents',
      value: data.documentContents || 'Some order content',
    });

    await test.runSequence('submitCourtIssuedOrderSequence');

    //skip signing and go back to caseDetail
    await test.runSequence('gotoCaseDetailSequence', {
      docketNumber: test.docketNumber,
    });

    const caseDetailFormatted = runCompute(
      withAppContextDecorator(formattedCaseDetail),
      {
        state: test.getState(),
      },
    );

    const caseDraftDocuments = caseDetailFormatted.draftDocuments;
    const newDraftOrder = caseDraftDocuments.reduce((prev, current) =>
      prev.createdAt > current.createdAt ? prev : current,
    );

    expect(test.getState('draftDocumentViewerDocketEntryId')).toBe(
      newDraftOrder.docketEntryId,
    );

    expect(newDraftOrder).toBeTruthy();
    test.draftOrders.push(newDraftOrder);
    test.docketEntryId = newDraftOrder.docketEntryId;
  });
};
