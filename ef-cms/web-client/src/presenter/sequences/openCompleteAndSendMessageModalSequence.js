import { clearModalStateAction } from '../actions/clearModalStateAction';
import { computeCertificateOfServiceFormDateAction } from '../actions/FileDocument/computeCertificateOfServiceFormDateAction';
import { computeDateReceivedAction } from '../actions/DocketEntry/computeDateReceivedAction';
import { computeSecondaryFormDateAction } from '../actions/FileDocument/computeSecondaryFormDateAction';
import { generateTitleAction } from '../actions/FileDocument/generateTitleAction';
import { setAlertErrorAction } from '../actions/setAlertErrorAction';
import { setCreateMessageModalDialogModalStateAction } from '../actions/WorkItem/setCreateMessageModalDialogModalStateAction';
import { setShowModalFactoryAction } from '../actions/setShowModalFactoryAction';
import { setValidationAlertErrorsAction } from '../actions/setValidationAlertErrorsAction';
import { setValidationErrorsAction } from '../actions/setValidationErrorsAction';
import { updateMessageModalAttachmentsAction } from '../actions/updateMessageModalAttachmentsAction';
import { validateDocketEntryAction } from '../actions/DocketEntry/validateDocketEntryAction';

export const openCompleteAndSendMessageModalSequence = [
  computeSecondaryFormDateAction,
  computeCertificateOfServiceFormDateAction,
  computeDateReceivedAction,
  validateDocketEntryAction,
  {
    error: [
      setAlertErrorAction,
      setValidationErrorsAction,
      setValidationAlertErrorsAction,
    ],
    success: [
      clearModalStateAction,
      generateTitleAction,
      setCreateMessageModalDialogModalStateAction,
      updateMessageModalAttachmentsAction,
      setShowModalFactoryAction('CreateMessageModalDialog'),
    ],
  },
];
