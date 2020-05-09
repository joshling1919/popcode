import {createLogic} from 'redux-logic';
import {getCurrentProject} from '../selectors';
import compileProject from '../util/compileProject';
import {openWindowWithContent} from '../util';

export default createLogic({
  type: 'POP_OUT_PROJECT',
  async process({getState}) {
    const state = getState();
    const project = getCurrentProject(state);

    const {source} = await compileProject(project);
    openWindowWithContent(source);
  },
});
