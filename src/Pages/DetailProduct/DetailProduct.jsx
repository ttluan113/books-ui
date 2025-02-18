import classNames from 'classnames/bind';
import styles from './DetailProduct.module.scss';
import Header from '../../Components/Header/Header';
import Rating from '@mui/material/Rating';
import { Box } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import { useParams, useNavigate } from 'react-router-dom';
import { requestAddCart, requestGetHeartProduct, requestGetProduct, requestHeartProduct } from '../../config/config';
import DOMPurify from 'dompurify';
import { useTheme } from '../../store/Provider';
import Slider from 'react-slick';
import { ToastContainer, toast } from 'react-toastify';
import Comments from './Components/Comments/Comments';
import TimeAgo from '../../utils/TimeAgo';
import Messenger from './Components/Messenger/Messenger';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMessage } from '@fortawesome/free-regular-svg-icons';
import { useStore } from '../../hooks/useStore';
import SlideBarMobile from '../../Components/HomePage/Components/SlideBarMobile/SlideBarMobile';

const cx = classNames.bind(styles);

const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
};

function DetailProduct() {
    const [quantity, setQuantity] = useState(1);
    const [brandBooks, setBrandBooks] = useState([]);
    const [dataFeedback, setDataFeedback] = useState([]);
    const [ratingProduct, setRatingProduct] = useState(0);

    const [idProduct, setIdProduct] = useState('');

    const [product, setProduct] = useState({});

    const [showMessenger, setShowMessenger] = useState(false);

    const [dataHeartProducts, setDataHeartProducts] = useState([]);

    const { getCart } = useStore();

    const { id } = useParams();
    const { mode } = useTheme();

    const navigate = useNavigate();

    const fetchData = async () => {
        try {
            const res = await requestGetProduct(idProduct || id);
            setProduct(res.product);
            setBrandBooks(res.brandProducts);
            setDataFeedback(res.feedbackUser);

            const totalRating = res.feedbackUser.reduce((total, item) => total + item.rating, 0);
            const averageRating = totalRating / res.feedbackUser.length;

            setRatingProduct(averageRating.toFixed(1));

            setIdProduct(id);

            document.title = res.product.name;
        } catch (error) {
            navigate('/notfound');
        }
    };

    const getHeartProduct = async () => {
        const res = await requestGetHeartProduct();
        setDataHeartProducts(res);
    };

    useEffect(() => {
        fetchData();
        getHeartProduct();
    }, [idProduct, id]);

    const onIncreaseQuantity = () => {
        setQuantity(quantity + 1);
    };

    const onDecreaseQuantity = () => {
        if (quantity <= 1) {
            setQuantity(1);
        } else {
            setQuantity(quantity - 1);
        }
    };

    const totalPrice = useMemo(() => {
        const price = product?.price * quantity;
        return price;
    }, [product, quantity]);

    const sanitizedDescription = DOMPurify.sanitize(product?.description);

    const handleAddCart = async () => {
        const data = {
            productId: product?._id,
            quantity,
        };
        try {
            const res = await requestAddCart(data);
            await fetchData();
            await getCart();
            toast.success(res.message);
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };

    const handleHeartProduct = async () => {
        try {
            const res = await requestHeartProduct(product._id);
            if (res.success === true) {
                await getHeartProduct();
                toast.success(res.message);
            } else {
                await getHeartProduct();
                toast.warning(res.message);
            }
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };

    return (
        <div className={cx('wrapper')}>
            <ToastContainer />
            <header>
                <Header />
            </header>
            <main className={cx('main')}>
                <div className={cx('inner-main')}>
                    <div className={cx(mode === 'dark' ? 'left__dark' : 'left')}>
                        <div className={cx('slider-container')}>
                            {product?.images?.length > 1 ? (
                                <Slider {...settings}>
                                    {product.images.map((image, index) => (
                                        <div key={index}>
                                            <img
                                                src={`${import.meta.env.VITE_URL_IMAGE}/uploads/products/${image}`}
                                                alt="123"
                                            />
                                        </div>
                                    ))}
                                </Slider>
                            ) : (
                                <div>
                                    <img
                                        src={`${import.meta.env.VITE_URL_IMAGE}/uploads/products/${product?.images}`}
                                        alt=""
                                    />
                                </div>
                            )}
                        </div>

                        <div className={cx(mode === 'dark' ? 'product-related__dark' : 'product-related')}>
                            <h4>Sản phẩm liên quan</h4>
                            <div className={cx('list-product-related')}>
                                <ul>
                                    {brandBooks.slice(0, 5).map((brandBook, index) => (
                                        <li
                                            key={index}
                                            onClick={() => {
                                                setIdProduct(brandBook._id);
                                                navigate(`/product/${brandBook._id}`);
                                            }}
                                        >
                                            <img
                                                src={`${import.meta.env.VITE_URL_IMAGE}/uploads/products/${
                                                    brandBook.images[0]
                                                }`}
                                                alt=""
                                            />
                                            <div className={cx('product-name')}>
                                                <h5>{brandBook.name}</h5>
                                                <span id={cx('price')}>{brandBook.price.toLocaleString()} ₫</span>
                                                <Rating name="read-only" value={5} readOnly size="small" />
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className={cx(mode === 'dark' ? 'center__dark' : 'center')}>
                        <div className={cx('info')}>
                            <h1>{product?.name}</h1>
                            <Box className={cx('rating')}>
                                <span>{ratingProduct || 0}</span>
                                <Rating name="read-only" value={5} readOnly size="small" />
                                <p>({dataFeedback?.length})</p>
                                <span className={cx('sold')}>| Đã Bán {product?.countBuy}</span>
                            </Box>
                            <span className={cx('price')}>{product?.price?.toLocaleString()} ₫</span>
                        </div>
                        <div className={cx('description')}>
                            <h4>Thông tin chi tiết</h4>
                            <div className={cx('detail')}>
                                <div className={cx('detail-item')}>
                                    <span>Công ty phát hành</span>
                                    <p>{product?.options?.company}</p>
                                </div>

                                <div className={cx('detail-item')}>
                                    <span>Ngày xuất bản</span>
                                    <p>{product?.options?.publicationDate}</p>
                                </div>

                                <div className={cx('detail-item')}>
                                    <span>Loại bìa</span>
                                    <p>{product?.options?.type === '1' ? 'Bìa mềm' : 'Bìa cứng'}</p>
                                </div>

                                <div className={cx('detail-item')}>
                                    <span>Kích thước</span>
                                    <p>{product?.options?.size} cm</p>
                                </div>

                                <div className={cx('detail-item')}>
                                    <span>Số trang</span>
                                    <p>{product?.options?.page} trang</p>
                                </div>

                                <div className={cx('detail-item')}>
                                    <span>Nhà xuất bản</span>
                                    <p>{product?.options?.publishingHouse}</p>
                                </div>
                            </div>
                        </div>

                        <div className={cx('detail-description')}>
                            <h4>Mô tả sản phẩm</h4>
                            <div className={cx('div')} dangerouslySetInnerHTML={{ __html: sanitizedDescription }} />
                        </div>
                    </div>
                </div>

                <div className={cx(mode === 'dark' ? 'right__dark' : 'right')}>
                    <div>
                        <div className={cx('quantity-left')}>
                            <h4>Số Lượng</h4>
                            <p>Số lượng còn lại trong kho : {product?.quantity}</p>
                        </div>

                        <div className={cx('quantity')}>
                            <button disabled={quantity <= 1} onClick={onDecreaseQuantity}>
                                -
                            </button>
                            <input onChange={(e) => setQuantity(e.target.value)} value={quantity} type="number" />
                            <button onClick={onIncreaseQuantity}>+</button>
                        </div>

                        <div className={cx('total')}>
                            <p>Tạm Tính</p>
                            <p className={cx('total-price')}>{totalPrice?.toLocaleString()} ₫</p>
                        </div>

                        <div className={cx('button-group')}>
                            <button onClick={handleAddCart} className={cx('button-add-to-cart')}>
                                Thêm Vào Giỏ Hàng
                            </button>

                            <button onClick={handleHeartProduct} className={cx('button-add-to-heart')}>
                                {dataHeartProducts.includes(product?._id) ? 'Xoá  yêu thích' : 'Yêu thích sản phẩm'}
                            </button>
                        </div>
                    </div>

                    <div className={cx('feed-back')}>
                        <h4>Khách hàng đánh giá</h4>
                        <div className={cx('feed-back-item')}>
                            {dataFeedback.map((feedback) => (
                                <div key={feedback?._id} className={cx('feed-back-item-left')}>
                                    <Avatar
                                        alt={feedback?.name}
                                        src={`${import.meta.env.VITE_URL_IMAGE}/uploads/avatars/${feedback?.avatar}`}
                                    />
                                    <div className={cx('feed-back-item-right')}>
                                        <h5>{feedback?.name}</h5>
                                        <Rating name="read-only" value={feedback?.rating} readOnly size="small" />
                                        <p>{feedback?.content}</p>
                                        <span className={cx('time')}>
                                            <TimeAgo datetime={feedback?.createdAt} locale="vi" />
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </main>

            <div className={cx(mode === 'light' ? 'comment' : 'comment__dark')}>
                <Comments productId={id} />
            </div>

            <div className={cx('messager')}>
                {showMessenger && <Messenger setShow={setShowMessenger} />}
                <div onClick={() => setShowMessenger(!showMessenger)} className={cx('btn__messager')}>
                    <FontAwesomeIcon id={cx('icons')} icon={faMessage} />
                    <span>Chat</span>
                </div>
            </div>

            <div className={cx('slide-bar-mobile')}>
                <SlideBarMobile />
            </div>
        </div>
    );
}

export default DetailProduct;
