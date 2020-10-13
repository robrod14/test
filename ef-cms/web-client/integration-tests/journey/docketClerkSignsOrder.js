export const docketClerkSignsOrder = (test, draftOrderIndex) => {
  return it('Docket clerk signs order', async () => {
    const { docketEntryId } = test.draftOrders[draftOrderIndex];

    await test.runSequence('gotoSignOrderSequence', {
      docketEntryId,
      docketNumber: test.docketNumber,
    });

    await test.runSequence('setPDFSignatureDataSequence', {
      signatureData: {
        scale: 1,
        x: 100,
        y: 100,
      },
    });
    await test.runSequence('saveDocumentSigningSequence');
  });
};
