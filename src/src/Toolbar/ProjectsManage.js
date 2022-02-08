import I18n from '@iobroker/adapter-react/i18n';
import {
    Button,
    Dialog, DialogActions, DialogContent, DialogTitle, IconButton,
} from '@material-ui/core';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';

import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import { BiImport, BiExport } from 'react-icons/bi';

const ProjectsManage = props => {
    if (!props.projects) {
        return null;
    }

    const exportProject = projectName => {
        props.socket.readFile('vis.0', `${projectName}/vis-views.json`).then(project => {
            const zip = new JSZip();

            zip.file(`${projectName}.json`, project);

            zip.generateAsync({ type: 'blob' }).then(content => {
                saveAs(content, `${projectName}.zip`);
            });
        });
    };

    return <Dialog open={props.open} onClose={props.onClose}>
        <DialogTitle>{I18n.t('Manage projects')}</DialogTitle>
        <DialogContent>
            <div>
                <IconButton onClick={() => props.addProject('new')}>
                    <AddIcon />
                </IconButton>
            </div>
            {props.projects.map(projectName => <div>
                <Button onClick={() => props.loadProject(projectName)}>{projectName}</Button>
                <IconButton onClick={() => props.deleteProject(projectName)} size="small">
                    <DeleteIcon />
                </IconButton>
                <IconButton size="small">
                    <BiImport fontSize="20" />
                </IconButton>
                <IconButton onClick={() => exportProject(projectName)} size="small">
                    <BiExport fontSize="20" />
                </IconButton>
            </div>)}
        </DialogContent>
        <DialogActions></DialogActions>
    </Dialog>;
};

export default ProjectsManage;