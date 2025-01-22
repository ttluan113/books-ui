import classNames from 'classnames/bind';
import styles from './Comments.module.scss';
import { Avatar } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { requestAddComment, requestGetComments } from '../../../../config/config';
import { toast, ToastContainer } from 'react-toastify';
import TimeAgo from '../../../../utils/TimeAgo';
import { useStore } from '../../../../hooks/useStore';

const cx = classNames.bind(styles);

function Comments({ productId }) {
    const [showInput, setShowInput] = useState(false);
    const [dataComments, setDataComments] = useState([]);
    const [idRelyComment, setIdRelyComment] = useState('');
    const [idComment, setIdComment] = useState('');

    const dataUser = useStore();

    const [valueInput, setValueInput] = useState('');

    const fetchData = async () => {
        const res = await requestGetComments(productId);
        setDataComments(res);
    };

    useEffect(() => {
        fetchData();
    }, [productId]);

    const handleAddComment = async () => {
        try {
            const data = {
                content: valueInput,
                productId,
                idRelyComment: idRelyComment || null,
            };
            await requestAddComment(data);
            fetchData();
            setValueInput('');
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };

    return (
        <div className={cx('wrapper')}>
            <ToastContainer />
            <div>
                <input
                    onKeyDown={(e) => e.key === 'Enter' && handleAddComment()}
                    onChange={(e) => setValueInput(e.target.value)}
                    placeholder={`Nhập bình luận....`}
                />
            </div>

            {dataComments.map((comment) => (
                <div key={comment._id} className={cx('form__comments')}>
                    <div className={cx('info__user')}>
                        <Avatar
                            sx={{ width: '50px', height: '50px' }}
                            src="https://media.baoquangninh.vn/upload/image/202403/medium/2188763_5cd5a5702b4e0c50783c3dcd83b40f74.jpg"
                        />
                        <div className={cx('info__user__name')}>
                            <h4>Sơn Tùng MTP</h4>
                            <p>Đã tham gia 6 năm</p>
                        </div>
                    </div>

                    <div className={cx('content__comments')}>
                        <p>{comment.content}</p>
                        <span>
                            Bình luận vào <TimeAgo createdAt={comment.createdAt} />
                        </span>
                        {dataUser.isAdmin === true && (
                            <button
                                onClick={() => {
                                    setShowInput(true);
                                    setIdComment(comment._id);
                                    setIdRelyComment(comment._id);
                                }}
                            >
                                Phản hồi
                            </button>
                        )}
                        {showInput && comment._id === idComment && (
                            <div className={cx('input__comments')}>
                                <input
                                    onKeyDown={(e) => e.key === 'Enter' && handleAddComment()}
                                    onChange={(e) => setValueInput(e.target.value)}
                                    placeholder={`Trả lời bình luận ${comment._id}`}
                                />
                            </div>
                        )}

                        <div className={cx('sub__comments')}>
                            <div className={cx('form__sub__comments')}>
                                {comment?.subComment?.length > 0 &&
                                    comment?.subComment?.map((subComment) => (
                                        <div className={cx('inner__sub__comment')}>
                                            <div className={cx('info__user__sub')}>
                                                <Avatar
                                                    sx={{ width: '35px', height: '35px' }}
                                                    src="https://doanwebsite.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo.f7df9eb5.webp&w=64&q=100"
                                                />
                                                <h4>L2 Team Trading</h4>
                                                <FontAwesomeIcon id={cx('icon__check')} icon={faCheckCircle} />
                                            </div>
                                            <p>{subComment.content}</p>
                                            {dataUser.isAdmin === true && dataUser._id === subComment.userId && (
                                                <button
                                                    onClick={() => {
                                                        setShowInput(true);
                                                        setIdComment(subComment._id);
                                                        setIdRelyComment(comment._id);
                                                    }}
                                                >
                                                    Phản hồi
                                                </button>
                                            )}

                                            {showInput && subComment._id === idComment && (
                                                <div className={cx('input__comments')}>
                                                    <input
                                                        placeholder={`Trả lời bình luận ${subComment._id}`}
                                                        onChange={(e) => setValueInput(e.target.value)}
                                                        onKeyDown={(e) => e.key === 'Enter' && handleAddComment()}
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
