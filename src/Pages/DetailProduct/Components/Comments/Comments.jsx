import classNames from 'classnames/bind';
import styles from './Comments.module.scss';
import { Avatar } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { requestAddComment, requestGetComments, requestPostNotify } from '../../../../config/config';
import { toast, ToastContainer } from 'react-toastify';
import TimeAgo from '../../../../utils/TimeAgo';
import { useStore } from '../../../../hooks/useStore';

import { useTheme } from '../../../../store/Provider';

const cx = classNames.bind(styles);

function Comments({ productId }) {
    const { mode } = useTheme();

    const [showInput, setShowInput] = useState(false);
    const [dataComments, setDataComments] = useState([]);
    const [idCommentRoot, setIdCommentRoot] = useState('');
    const [idComment, setIdComment] = useState('');
    const [valueInputRoot, setValueInputRoot] = useState('');

    const { dataUser } = useStore();

    const [valueInput, setValueInput] = useState('');

    const fetchData = async () => {
        const res = await requestGetComments(productId);
        setDataComments(res);
    };

    useEffect(() => {
        fetchData();
    }, [productId]);

    const handleAddComment = async (userId) => {
        try {
            const data = {
                content: valueInput || valueInputRoot,
                productId,
                parentId: !idComment ? null : idComment,
            };
            const dataNotify = {
                type: 'COMMENT',
                userId,
                productId,
            };
            await requestAddComment(data);
            await requestPostNotify(dataNotify);
            setValueInput('');
            setIdComment('');
            setValueInputRoot('');
            fetchData();
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };

    return (
        <div className={cx('wrapper')}>
            <ToastContainer />
            <div className={cx(mode === 'light' ? 'form__comments__root' : 'form__comments__root__dark')}>
                <input
                    onKeyDown={(e) => e.key === 'Enter' && handleAddComment()}
                    onChange={(e) => setValueInputRoot(e.target.value)}
                    placeholder={`Nhập bình luận....`}
                    value={valueInputRoot}
                />
            </div>

            {dataComments.map((comment) => (
                <div key={comment._id} className={cx('form__comments')}>
                    <div className={cx('info__user')}>
                        <Avatar
                            sx={{ width: '50px', height: '50px' }}
                            src={`${import.meta.env.VITE_URL_IMAGE}/uploads/avatars/${comment.user.avatar}`}
                        />
                        <div className={cx('info__user__name')}>
                            <h4>{comment.user.fullName}</h4>
                            <p>
                                Đã tham gia <TimeAgo createdAt={comment.user.createdAt} />
                            </p>
                        </div>
                    </div>

                    <div className={cx(mode === 'light' ? 'content__comments' : 'content__comments__dark')}>
                        <p>{comment.content}</p>
                        <span>
                            Bình luận vào <TimeAgo createdAt={comment.createdAt} />
                        </span>
                        {(dataUser.isAdmin || dataUser._id === comment.userId) && (
                            <button
                                onClick={() => {
                                    setShowInput(true);
                                    setIdCommentRoot(comment._id);
                                    setIdComment(comment._id);
                                }}
                            >
                                Phản hồi
                            </button>
                        )}

                        {showInput && comment._id === idCommentRoot && (
                            <div className={cx('input__comments')}>
                                <input
                                    onKeyDown={(e) => e.key === 'Enter' && handleAddComment(comment.userId)}
                                    onChange={(e) => setValueInput(e.target.value)}
                                    placeholder={`Trả lời bình luận ${comment.user.fullName}`}
                                    value={valueInput}
                                />
                            </div>
                        )}

                        <div className={cx('sub__comments')}>
                            <div className={cx('form__sub__comments')}>
                                {comment?.subComments?.length > 0 &&
                                    comment?.subComments?.map((subComment) => (
                                        <div key={subComment._id} className={cx('inner__sub__comment')}>
                                            <div className={cx('info__user__sub')}>
                                                <Avatar
                                                    sx={{ width: '35px', height: '35px' }}
                                                    src={`${import.meta.env.VITE_URL_IMAGE}/uploads/avatars/${
                                                        subComment.user.avatar
                                                    }`}
                                                />
                                                <h4>{subComment.user.fullName}</h4>
                                                {subComment.user.isAdmin === true && (
                                                    <FontAwesomeIcon id={cx('icon__check')} icon={faCheckCircle} />
                                                )}
                                            </div>
                                            <p>{subComment.content}</p>
                                            {(dataUser.isAdmin === true || dataUser._id === comment.userId) && (
                                                <button
                                                    onClick={() => {
                                                        setShowInput(true);
                                                        setIdCommentRoot(subComment._id);
                                                        setIdComment(comment._id);
                                                        setValueInput('');
                                                    }}
                                                >
                                                    Phản hồi
                                                </button>
                                            )}

                                            {showInput && subComment._id === idCommentRoot && (
                                                <div
                                                    className={cx(
                                                        mode === 'light' ? 'input__comments' : 'input__comments__dark',
                                                    )}
                                                >
                                                    <input
                                                        placeholder={`Trả lời bình luận ${subComment.user.fullName}`}
                                                        onChange={(e) => setValueInput(e.target.value)}
                                                        onKeyDown={(e) =>
                                                            e.key === 'Enter' && handleAddComment(subComment.userId)
                                                        }
                                                        value={valueInput}
                                                    />
                                                </div>
                                            )}
                                        </div>
                                    ))}
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Comments;
