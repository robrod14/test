import { clearModalStateAction } from '../actions/clearModalStateAction';
import { setCreateMessageModalDialogModalStateAction } from '../actions/WorkItem/setCreateMessageModalDialogModalStateAction';
import { setShowModalFactoryAction } from '../actions/setShowModalFactoryAction';
import { showProgressSequenceDecorator } from '../utilities/sequenceHelpers';

export const openCreateMessageModalSequence = showProgressSequenceDecorator([
  clearModalStateAction,
  setCreateMessageModalDialogModalStateAction,
  setShowModalFactoryAction('CreateMessageModal'),
]);
