import {popOutProject as popOutProjectAction} from '../../actions/ui';
import {makeTestLogic} from './helpers';
import popOutProject from '../popOutProject';
import compileProject from '../../util/compileProject';

const mockSource = 'i am mock source';
const mockProject = {mockSource};

jest.mock('../../selectors', () => ({
  getCurrentProject: () => mockProject,
}));
jest.mock('../../util/compileProject');

describe('popOutProject', () => {
  const testLogic = makeTestLogic(popOutProject);

  test('calls popOutProject', async () => {
    await testLogic(popOutProjectAction());

    expect(compileProject).toHaveBeenCalledWith(mockProject);
  });
});
