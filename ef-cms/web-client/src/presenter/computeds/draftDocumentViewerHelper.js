import { state } from 'cerebral';

export const draftDocumentViewerHelper = (get, applicationContext) => {
  const {
    EVENT_CODES_REQUIRING_SIGNATURE,
    NOTICE_EVENT_CODES,
    STIPULATED_DECISION_EVENT_CODE,
  } = applicationContext.getConstants();
  const user = applicationContext.getCurrentUser();
  const permissions = get(state.permissions);
  const caseDetail = get(state.caseDetail);

  const formattedCaseDetail = applicationContext
    .getUtilities()
    .getFormattedCaseDetail({
      applicationContext,
      caseDetail,
    });

  const viewerDraftDocumentToDisplay = get(state.viewerDraftDocumentToDisplay);

  const documentRequiresSignature =
    viewerDraftDocumentToDisplay &&
    EVENT_CODES_REQUIRING_SIGNATURE.includes(
      viewerDraftDocumentToDisplay.eventCode,
    );

  const isNotice =
    viewerDraftDocumentToDisplay &&
    NOTICE_EVENT_CODES.includes(viewerDraftDocumentToDisplay.eventCode);

  const isStipulatedDecision =
    viewerDraftDocumentToDisplay &&
    viewerDraftDocumentToDisplay.eventCode === STIPULATED_DECISION_EVENT_CODE;

  const formattedDocumentToDisplay =
    viewerDraftDocumentToDisplay &&
    formattedCaseDetail.draftDocuments &&
    formattedCaseDetail.draftDocuments.find(
      draftDocument =>
        draftDocument.docketEntryId ===
        viewerDraftDocumentToDisplay.docketEntryId,
    );
  if (!formattedDocumentToDisplay) {
    return {
      createdByLabel: '',
      documentTitle: '',
    };
  }
  const createdByLabel = formattedDocumentToDisplay.filedBy
    ? `Created by ${formattedDocumentToDisplay.filedBy}`
    : '';

  const documentIsSigned =
    viewerDraftDocumentToDisplay && !!formattedDocumentToDisplay.signedAt;

  const isInternalUser = applicationContext
    .getUtilities()
    .isInternalUser(user.role);

  const hasDocketEntryPermission = permissions.CREATE_ORDER_DOCKET_ENTRY;

  const showAddDocketEntryButtonForRole = hasDocketEntryPermission;
  const showEditButtonForRole = isInternalUser;
  const showApplyRemoveSignatureButtonForRole = isInternalUser;

  const showEditButtonSigned =
    showEditButtonForRole &&
    documentIsSigned &&
    !isNotice &&
    !isStipulatedDecision;

  const showAddDocketEntryButtonForDocument =
    documentIsSigned ||
    !EVENT_CODES_REQUIRING_SIGNATURE.includes(
      formattedDocumentToDisplay.eventCode,
    );

  const showApplySignatureButtonForDocument = !documentIsSigned;
  const showRemoveSignatureButtonForDocument =
    documentIsSigned && !isNotice && !isStipulatedDecision;

  const showDocumentNotSignedAlert =
    documentRequiresSignature && !documentIsSigned;

  return {
    createdByLabel,
    documentTitle: formattedDocumentToDisplay.documentTitle,
    showAddDocketEntryButton:
      showAddDocketEntryButtonForRole && showAddDocketEntryButtonForDocument,
    showApplySignatureButton:
      showApplyRemoveSignatureButtonForRole &&
      showApplySignatureButtonForDocument,
    showDocumentNotSignedAlert,
    showEditButtonNotSigned:
      showEditButtonForRole && (!documentIsSigned || isNotice),
    showEditButtonSigned,
    showRemoveSignatureButton:
      showApplyRemoveSignatureButtonForRole &&
      showRemoveSignatureButtonForDocument,
  };
};
