import { state } from 'cerebral';

const computeDate = ({ day, month, year }) => {
  let computedDate = null;
  if (month || day || year) {
    computedDate = `${year}-${month}-${day}`;

    computedDate = computedDate
      .split('-')
      .map(segment => segment.padStart(2, '0'))
      .join('-');
  }
  return computedDate;
};

/**
 * computes the certificate of service dates from the form
 * month, day and year values
 *
 * @param {object} providers the providers object
 * @param {object} providers.store the cerebral store object
 * @param {object} providers.get the cerebral get function
 */
export const computeCertificateOfServiceFormDateAction = ({ get, store }) => {
  let month = get(state.form.certificateOfServiceMonth);
  let day = get(state.form.certificateOfServiceDay);
  let year = get(state.form.certificateOfServiceYear);
  store.set(
    state.form.certificateOfServiceDate,
    computeDate({ day, month, year }),
  );

  const secondaryDocument = get(state.form.secondaryDocument);

  if (secondaryDocument) {
    month = get(state.form.secondaryDocument.certificateOfServiceMonth);
    day = get(state.form.secondaryDocument.certificateOfServiceDay);
    year = get(state.form.secondaryDocument.certificateOfServiceYear);
    store.set(
      state.form.secondaryDocument.certificateOfServiceDate,
      computeDate({ day, month, year }),
    );
  }

  const supportingDocuments = get(state.form.supportingDocuments);

  if (supportingDocuments) {
    supportingDocuments.forEach((item, idx) => {
      month = get(
        state.form.supportingDocuments[idx].certificateOfServiceMonth,
      );
      day = get(state.form.supportingDocuments[idx].certificateOfServiceDay);
      year = get(state.form.supportingDocuments[idx].certificateOfServiceYear);
      store.set(
        state.form.supportingDocuments[idx].certificateOfServiceDate,
        computeDate({ day, month, year }),
      );
    });
  }

  const secondarySupportingDocuments = get(
    state.form.secondarySupportingDocuments,
  );

  if (secondarySupportingDocuments) {
    secondarySupportingDocuments.forEach((item, idx) => {
      month = get(
        state.form.secondarySupportingDocuments[idx].certificateOfServiceMonth,
      );
      day = get(
        state.form.secondarySupportingDocuments[idx].certificateOfServiceDay,
      );
      year = get(
        state.form.secondarySupportingDocuments[idx].certificateOfServiceYear,
      );
      store.set(
        state.form.secondarySupportingDocuments[idx].certificateOfServiceDate,
        computeDate({ day, month, year }),
      );
    });
  }
};
