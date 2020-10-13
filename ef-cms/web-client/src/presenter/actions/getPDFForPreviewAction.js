import { state } from 'cerebral';

/**
 * given a docketNumber and docketEntryId, fetch a PDF from S3 and put into props stream.
 *
 * @param {object} providers the providers object
 * @param {object} providers.applicationContext the application context
 * @param {Function} providers.props used for getting docketNumber and docketEntryId
 * @returns {Promise<object>} pdf file object for preview
 */
export const getPDFForPreviewAction = async ({
  applicationContext,
  props,
  store,
}) => {
  store.set(state.modal.pdfPreviewModal, {});
  if (props.file.name) {
    return props;
  }
  const { docketEntryId, docketNumber } = props.file;

  const pdfObj = await applicationContext
    .getUseCases()
    .loadPDFForPreviewInteractor({
      applicationContext,
      docketEntryId,
      docketNumber,
    });
  return { file: pdfObj };
};
