import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {addBlog} from '../../actions/blogActions';
import {withRouter} from "react-router-dom";
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import uploadDataURL from './functions/uploadDataURL'
import TextFieldGroup from "../common/TextFieldGroup";
import '../../css/blogs-page/form.css'
import ModalWindow from "../common/Modal";
import TagsEditor from "../common/TagsEditor";

class UploadAdapter {
    constructor(loader) {
        // Save Loader instance to update upload progress.
        this.loader = loader;
        console.log(loader);
    }

    upload() {
        let {loader} = this;
        let dataURL = loader._reader._reader.result;
        let count = 1;
        let interval = setInterval(() => {
            if (count > 4)
                clearInterval(interval);
            loader.uploadTotal = 1024;
            loader.uploaded = (1024 / 5) * count;
            count++;

        }, 1000);
        return new Promise((resolve, reject) => {
            uploadDataURL(dataURL,
                event => {
                    loader.uploadTotal = event.total;
                    loader.uploaded = event.loaded
                }).then(result => {
                resolve({default: '/images/' + result})
            }).catch(err => {
                reject(err)
            })
        })
    }

    abort() {
        alert('Try later!');
    }
}


class BlogForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            displayCheckError: false,
            count_err: 1,
            img_href: '',
            header: '',
            data: "<p>Write your post here!!!</p>",
            tag: '',
            tags: ['Blog', 'Develop', 'Scope'],
            pictures: [],
            errors: {}
        };
        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.deleteTag = this.deleteTag.bind(this);
        this.addTag = this.addTag.bind(this);
        this.onChangeModalWindow = this.onChangeModalWindow.bind(this);
    }

    componentWillReceiveProps(newProps) {
        if (newProps.errors) {
            this.setState({errors: newProps.errors, count_err: 1});
        }
    }

    addTag() {
        if (this.state.tag.length > 1 && this.state.tag.length <= 10) {
            this.setState(state => ({tags: [...state.tags, this.state.tag]}));
            this.setState({tag: ''});
        }
    }

    deleteTag(i) {
        this.setState({tags: this.state.tags.filter((tag, index) => index !== i),});
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value});
        this.setState({
            errors: {
                ...this.state.errors,
                [e.target.name]: ''
            }
        });
    }

    onChangeModalWindow() {
        this.setState({displayCheckError: !this.state.displayCheckError});
    }

    onSubmit(e) {
        e.preventDefault();
        if (this.state.count_err === 1) {
            this.setState({count_err: 0});
            this.onChangeModalWindow();

        } else {
            const {user} = this.props.auth;
            const newBlog = {
                data: this.state.data,
                img_href: this.state.img_href,
                header: this.state.header,
                tags: this.state.tags,
                id: user.id,
            };
            this.props.addBlog(newBlog, this.props.history);
        }
    }


    render() {
        const {errors} = this.state;
        let check_err = (
            <div className="modal-window-center-content">
                <p className='modal-err-post-create'>Check the text for errors, you can use this site</p>
                <br/>
                <a className="btn-create bth-hover btn-3 submit-btn" href='https://languagetool.org/uk/'
                   rel="noopener noreferrer" target='_blank'>Link</a>
            </div>
        );

        return (
            <div className='content-center-root'>
                <h3 className='blog-form-content-header'>Create your post</h3>
                <form className='blog-form-content-width' onSubmit={this.onSubmit}>
                    <ModalWindow
                        name='displayCheckError'
                        value={!this.state.displayCheckError}
                        content={check_err}
                        onChange={this.onChangeModalWindow}
                    />
                    <div className='form-blog-tags'>
                        <h4 className='text-tag-form'>Click on tag, and delet her! <br/>Count tags needs to between 3
                            and 10 , tag length more 2</h4>
                        <TagsEditor array={this.state.tags} delete_index={this.deleteTag}/>
                        <input value={this.state.tag} onChange={this.onChange} name='tag' type="text"
                               className="input-tag-form" placeholder="Create tag"/>
                        <div onClick={this.addTag} className="btn-tag-form">Create</div>
                        <div className='err-blog-form-tag'>{errors.tag}</div>
                    </div>

                    <TextFieldGroup
                        placeholder="Посилання"
                        name="img_href"
                        value={this.state.img_href}
                        onChange={this.onChange}
                        error={errors.img_href}
                        info="Посилання на картинку заголовку"
                        label='img'
                    />
                    <TextFieldGroup
                        placeholder="Заголовок"
                        name="header"
                        value={this.state.header}
                        onChange={this.onChange}
                        error={errors.header}
                        info="Заголовок для статті"
                        label='header'
                    />
                    <CKEditor
                        config={

                            {

                                image: {
                                    toolbar: ['imageTextAlternative',
                                        '|', 'imageStyle:full',
                                        'imageStyle:alignLeft',
                                        'imageStyle:alignCenter',
                                        'imageStyle:alignRight',
                                        'imageStyle:side'],
                                    styles: ['full', 'alignLeft', 'alignCenter', 'alignRight', 'side']
                                },
                            }
                        }
                        editor={ClassicEditor}
                        data={this.state.data}
                        imageUpload={'http://localhost:3000/blog'}
                        onChange={(event, editor) => {
                            this.setState({data: editor.getData()})
                        }}
                        onInit={editor => {
                            editor.plugins.get('FileRepository')
                                .createUploadAdapter = loader => new UploadAdapter(loader);
                        }}
                    />
                    <button className="btn-create bth-hover btn-3 submit-btn" type="submit">Submit</button>
                </form>
            </div>
        )
    }
}

BlogForm.propTypes = {
    addBlog: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(mapStateToProps, {addBlog})(withRouter(BlogForm));
