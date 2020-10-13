import { applicationContextForClient as applicationContext } from '../../../shared/src/business//test/createTestApplicationContext';

const { PETITIONS_SECTION } = applicationContext.getConstants();

export const petitionsClerkAssignsWorkItemToSelf = test => {
  return it('Petitions clerk assigns work item to self', async () => {
    // find the work item that is part of an Petition upload
    const sectionWorkItems = test.getState('workQueue');
    test.petitionWorkItemId = sectionWorkItems.find(
      item =>
        item.docketEntry.documentType === 'Petition' &&
        item.docketNumber === test.docketNumber,
    ).workItemId;

    // verify that there is an unassigned work item in the section queue; we will assign it
    const unassignedWorkItem = test
      .getState('workQueue')
      .find(
        workItem =>
          !workItem.assigneeId &&
          workItem.docketNumber === test.docketNumber &&
          workItem.workItemId === test.petitionWorkItemId,
      );
    expect(unassignedWorkItem).toBeDefined();
    expect(test.getState('selectedWorkItems').length).toEqual(0);

    // select that work item
    await test.runSequence('selectWorkItemSequence', {
      workItem: unassignedWorkItem,
    });
    const selectedWorkItems = test.getState('selectedWorkItems');
    expect(selectedWorkItems.length).toEqual(1);
    test.selectedWorkItem = selectedWorkItems[0];
    expect(unassignedWorkItem).toMatchObject({
      assigneeId: null,
    });

    // select an assignee
    expect(test.getState('assigneeId')).toBeNull();
    await test.runSequence('selectAssigneeSequence', {
      assigneeId: '3805d1ab-18d0-43ec-bafb-654e83405416',
      assigneeName: 'Test Petitionsclerk',
    });
    expect(test.getState('assigneeId')).toBeDefined();

    // assign that work item to the current user
    await test.runSequence('assignSelectedWorkItemsSequence');

    // should clear the selected work items
    expect(test.getState('selectedWorkItems').length).toEqual(0);

    // should have updated the work item in the section queue to have an assigneeId
    const sectionWorkQueue = test.getState('workQueue');
    const assignedWorkItem = sectionWorkQueue.find(
      workItem => workItem.workItemId === test.petitionWorkItemId,
    );
    expect(assignedWorkItem).toMatchObject({
      assigneeId: '3805d1ab-18d0-43ec-bafb-654e83405416',
      section: PETITIONS_SECTION,
    });

    // the work item should appear in the individual work queue
    const workQueue = test.getState('workQueue');
    const movedWorkItem = workQueue.find(
      workItem => workItem.workItemId === test.petitionWorkItemId,
    );
    expect(movedWorkItem).toMatchObject({
      assigneeId: '3805d1ab-18d0-43ec-bafb-654e83405416',
      section: PETITIONS_SECTION,
    });
  });
};