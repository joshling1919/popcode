import {popOutProject as popOutProjectAction} from '../../actions/ui';
import {makeTestLogic} from './helpers';
import popOutProject from '../popOutProject';
import compileProject from '../../util/compileProject';
import {openWindowWithContent} from '../../util';
import {firebaseProjectFactory} from '@factories/data/firebase';

const mockProject = firebaseProjectFactory.build();
const mockObjWithSource = {source: 'mock-source'};

jest.mock('../../selectors', () => ({
  getCurrentProject: () => mockProject,
}));
jest.mock('../../util/compileProject', () =>
  jest.fn(() => new Promise(resolve => resolve(mockObjWithSource))),
);
jest.mock('../../util');

describe('popOutProject', () => {
  const testLogic = makeTestLogic(popOutProject);

  test('calls popOutProject', async () => {
    await testLogic(popOutProjectAction());

    expect(compileProject).toHaveBeenCalledWith(mockProject);
    expect(openWindowWithContent).toHaveBeenCalledWith(
      mockObjWithSource.source,
    );
  });
});
