import classNames from 'classnames/bind';
import styles from './AddBlog.module.scss';

import { useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';

import TextField from '@mui/material/TextField';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';

import useAutoSave from '../../../../../../../hooks/useAutoSave';
import { requestCreateBlog } from '../../../../../../../config/config';

import { toast } from 'react-toastify';

const cx = classNames.bind(styles);

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

function AddBlog() {
    const [valueText, setValueText] = useState('');
    const [nameBlog, setNameBlog] = useState('');
    const [img, setImg] = useState(null);

    const [previewImg, setPreviewImg] = useState(null);

    const savedData = useAutoSave(valueText, 1000);

    const handleEditorChange = (newText) => {
        setValueText(newText);
    };

    const handleCreateBlog = async () => {
        try {
            const formData = new FormData();
            formData.append('content', savedData);
            formData.append('nameBlog', nameBlog);
            formData.append('image', img);

            const res = await requestCreateBlog(formData);

            setValueText('');
            setNameBlog('');
            setPreviewImg(null);
            toast.success(res.message);
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('left')}>
                    {previewImg && <img className={cx('img')} src={previewImg ? previewImg : ''} alt="Chọn Ảnh" />}

                    <Button
                        component="label"
                        role={undefined}
                        variant="contained"
                        tabIndex={-1}
                        startIcon={<CloudUploadIcon />}
                    >
                        Chọn ảnh bài viết
                        <VisuallyHiddenInput
                            type="file"
                            onChange={(event) => {
                                const file = event.target.files[0];
                                if (file) {
                                    setImg(file);
                                    setPreviewImg(URL.createObjectURL(file));
                                }
                            }}
                            multiple
                        />
                    </Button>
                    <div>
                        <TextField
                            onChange={(e) => setNameBlog(e.target.value)}
                            fullWidth
                            id="outlined-basic"
                            label="Tiêu đề bài viết"
                            variant="outlined"
                        />
                    </div>
                    <div>
                        <Editor
                            initialValue="Nhập nội dung bài viết..."
                            value={valueText}
                            onEditorChange={handleEditorChange}
                            apiKey="hfm046cu8943idr5fja0r5l2vzk9l8vkj5cp3hx2ka26l84x"
                            init={{
                                plugins:
                                    'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount',
                                toolbar:
                                    'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat',
                                tinycomments_mode: 'embedded',
                                tinycomments_author: 'Author name',
                                mergetags_list: [
                                    { value: 'First.Name', title: 'First Name' },
                                    { value: 'Email', title: 'Email' },
                                ],
                                ai_request: (request) => {
                                    respondWith.string(() => Promise.reject('See docs to implement AI Assistant'));
                                },
                            }}
                        />
                    </div>
                </div>
                <div dangerouslySetInnerHTML={{ __html: savedData }} className={cx('right')}></div>
            </div>
            <Button onClick={handleCreateBlog} fullWidth variant="contained">
                Lưu bài viết
            </Button>
        </div>
    );
}

export default AddBlog;
