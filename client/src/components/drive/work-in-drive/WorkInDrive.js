import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import {getCurrentDrive, saveDrive} from '../../../actions/driveActions';
import classnames from 'classnames';
import '../../../css/drive/index.css'
import ListFolders from "./ListFolders";
import CreateFolder from "./CreateFolder";
import ListItem from "./ListItem";


class WorkInDrive extends Component {
    constructor(props) {
        super(props);
        this.state = {
            change: false,
            drive: [],
            list: [],
            index_folder: 0,
            list_view: true,
            createFolder: false,
            createFile: false,
            name_folder: '',
            file_name: '',
            file_type: '',
            file_link: 0,
            errors: {}
        };
        this.onChangeModalWindow = this.onChangeModalWindow.bind(this);
        this.ononChangeModalWindowFile = this.ononChangeModalWindowFile.bind(this);
        this.onCreateFolder = this.onCreateFolder.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onSave = this.onSave.bind(this);
        this.onDeleteItem = this.onDeleteItem.bind(this);
        this.onDeleteFolder = this.onDeleteFolder.bind(this);
        this.renderList = this.renderList.bind(this);
        this.openFolder = this.openFolder.bind(this);
        this.onCreateFile = this.onCreateFile.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({errors: nextProps.errors});
        }
        if (nextProps.drive.drive) {
            if (nextProps.drive.drive.folders.length > 0) {
                this.setState({
                    drive: nextProps.drive.drive.folders,
                    list: nextProps.drive.drive.folders[0].folder,
                    change: nextProps.drive.change
                });
            } else {
                this.setState({
                    drive: nextProps.drive.drive.folders,
                    list: [],
                    change: nextProps.drive.change
                });
            }
        }
    }

    componentDidMount() {
        this.props.getCurrentDrive();
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    onChangeModalWindow() {
        this.setState({createFolder: !this.state.createFolder, name_folder: '', errors: {}});
    }

    ononChangeModalWindowFile() {
        this.setState({createFile: !this.state.createFile, file_name: '', file_link: '', file_type: ''});
    }

    onCreateFolder() {
        if (this.state.name_folder.length < 2 || this.state.name_folder.length > 25) {
            this.setState({errors: {name_folder: 'Name length needs to between 2 and 25 characters'}})
        } else {
            const newFolder = {name: this.state.name_folder, folder: []};
            this.setState({
                createFolder: false,
                drive: [...this.state.drive, newFolder],
                name_folder: '',
                errors: {},
                change: true
            })
        }
    }

    onDeleteFolder(index) {
        let newState = Object.assign({}, this.state);
        newState.drive.splice(index, 1);
        newState.change = true;
        newState.index_folder = 0;
        if (newState.drive.length === 0) {
            newState.drive = [];
            newState.list = [];
        } else {
            newState.list = newState.drive[newState.index_folder].folder;
        }
        this.setState(newState);
    }

    onSave(e) {
        e.preventDefault();
        const driveData = {
            drive: this.state.drive
        };
        this.props.saveDrive(driveData);
        this.setState({index_folder: 0});
    }

    onDeleteItem(index) {
        let newState = Object.assign({}, this.state);
        newState.list.splice(index, 1);
        newState.change = true;
        newState.drive[newState.index_folder].folder = newState.list;
        this.setState(newState);
    }

    renderList() {
        this.setState({list_view: !this.state.list_view});
    }

    openFolder(index) {
        if (this.state.drive.length === 0) {
            this.setState({list: [], index_folder: 0});
        } else {
            if (index >= this.state.drive.length) {
                this.setState({list: this.state.drive[index - 1].folder, index_folder: index - 1});
            } else {
                this.setState({list: this.state.drive[index].folder, index_folder: index});
            }
        }
    }


    onCreateFile() {
        if (this.state.file_name.length < 2 || this.state.file_name.length > 25 || this.state.file_link.length < 1) {
            this.setState({errors: {createFile: 'Check again'}})
        } else {
            let newState = Object.assign({}, this.state);
            newState.list.push({
                name: newState.file_name,
                link: newState.file_link,
                type: (newState.file_type ? newState.file_type : 1)
            });
            newState.drive[newState.index_folder].folder = newState.list;
            this.setState(newState);
            this.setState({file_name: '', file_link: '', file_type: 0, change: true, createFile: false});
        }
    }


    render() {
        const {errors} = this.state;
        const {drive, loading} = this.props.drive;
        let folderList, addOption;

        if (drive === null || loading) {
            folderList = null;
        } else {
            folderList = (
                <ListFolders
                    active_folder={this.state.index_folder}
                    deleteFolderFunc={this.onDeleteFolder}
                    openFolderFunc={this.openFolder}
                    folders={this.state.drive}/>
            )
        }


        if (this.state.drive.length > 0) {
            addOption = (


                <div>
                    <div className='add-file-btn-plus' onClick={this.ononChangeModalWindowFile}>+</div>
                    <div className={classnames('add-file-hide', {'add-file-show': this.state.createFile})}>
                        <input placeholder='File name' name='file_name' value={this.state.file_name} type='text'
                               onChange={this.onChange}/>
                        <input placeholder='Link on file' name='file_link' value={this.state.file_link} type='text'
                               onChange={this.onChange}/>
                        <select onChange={this.onChange} name="file_type" className="add-file-select">
                            <option value="1">Offise</option>
                            <option value="2">Audio</option>
                            <option value="3">Video</option>
                            <option value="4">Other</option>
                        </select>
                        <p className='create-folder-err'> {errors.createFile}</p>
                        <div className='add-file-btn' onClick={this.onCreateFile}>add</div>
                        <div className='add-file-btn' onClick={this.ononChangeModalWindowFile}>cansel</div>
                    </div>
                </div>
            )

        } else {
            addOption = null;
        }

        return (
            <div>
                <div className='drive-header'>Scope <span>Drive</span></div>
                <div className='work-drive-root'>
                    <div className='drive-folders-list'>
                        <div onClick={this.onChangeModalWindow}
                             className='drive-add-folder-button'>Add Folder
                        </div>
                        <CreateFolder
                            status={this.state.createFolder}
                            value_folder_name={this.state.name_folder}
                            createFolderFunc={this.onCreateFolder}
                            closeFolderFunc={this.onChangeModalWindow}
                            onChangeFunc={this.onChange}
                            error={errors.name_folder}
                        />
                        {folderList}
                    </div>
                    <div className={classnames('no-change', {'change': this.state.change})}>
                        {!this.state.change ? (<p>Success! all changes on server!</p>) : (<div>
                            <div onClick={this.onSave} className='work-drive-save-change'>Save</div>
                            You make changes, save them on server</div>)}
                    </div>


                    <div className='work-drive-list'>
                        <div className='change-list-btn' onClick={this.renderList}>view</div>
                        {addOption}
                        <ListItem deletitem={this.onDeleteItem} view={this.state.list_view} items={this.state.list}/>
                    </div>

                </div>
            </div>
        );
    }
}

WorkInDrive.propTypes = {
    getCurrentDrive: PropTypes.func.isRequired,
    saveDrive: PropTypes.func.isRequired,
    drive: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    drive: state.drive,
    errors: state.errors
});

export default connect(mapStateToProps, {getCurrentDrive, saveDrive})(withRouter(WorkInDrive));
