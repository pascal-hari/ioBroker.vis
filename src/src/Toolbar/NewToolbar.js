import {
    IconButton, Tooltip, withStyles,
    Menu as DropMenu, MenuItem as DropMenuItem, CircularProgress,
} from '@material-ui/core';

import { useRef, useState } from 'react';

import CloseIcon from '@material-ui/icons/Close';
import SyncIcon from '@material-ui/icons/Sync';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

import I18n from '@iobroker/adapter-react/i18n';

import Views from './NewViews';
import Widgets from './NewWidgets';
import Projects from './NewProjects';

const styles = () => ({
    text: { paddingRight: 4 },
    button: { margin: 4 },
    textInput: { margin: '0px 4px', width: 120 },
    right: { float: 'right' },
});

const NewToolbar = props => {
    const [right, setRight] = useState(false);
    const rightRef = useRef(null);

    return <div>
        <span className={props.classes.right}>
            {props.needSave ? <CircularProgress size={20} /> : null}
            <Tooltip title={I18n.t('Close editor')}>
                <IconButton size="small">
                    <CloseIcon />
                </IconButton>
            </Tooltip>
            <IconButton ref={rightRef} onClick={() => setRight(!right)} size="small">
                <ArrowDropDownIcon />
            </IconButton>
            <DropMenu
                open={right}
                anchorEl={rightRef.current}
                onClose={() => setRight(false)}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                getContentAnchorEl={null}
            >
                <DropMenuItem>
                    <CloseIcon />
                    {I18n.t('Close editor')}
                </DropMenuItem>
                <DropMenuItem>
                    <PlayArrowIcon />
                    {I18n.t('Open runtime in new window')}
                </DropMenuItem>
                <DropMenuItem>
                    <SyncIcon />
                    {I18n.t('Reload all runtimes')}
                </DropMenuItem>
            </DropMenu>
        </span>
        <div className={props.classes.toolbar} style={{ alignItems: 'initial' }}>
            <Views {...props} />
            <Widgets {...props} />
            <Projects {...props} />
        </div>
    </div>;
};

export default withStyles(styles)(NewToolbar);