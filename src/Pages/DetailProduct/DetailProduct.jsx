import classNames from 'classnames/bind';
import styles from './DetailProduct.module.scss';
import Header from '../../Components/Header/Header';
import Rating from '@mui/material/Rating';
import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
import Avatar from '@mui/material/Avatar';

const cx = classNames.bind(styles);

function DetailProduct() {
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        document.title = 'Chi tiết sản phẩm - Nói Chuyện Là Bản Năng, Giữ Miệng Là Tu Dưỡng, Im Lặng Là Trí Tuệ';
    }, []);

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

    return (
        <div className={cx('wrapper')}>
            <header>
                <Header />
            </header>
            <main className={cx('main')}>
                <div className={cx('left')}>
                    <div>
                        <img
                            src="https://salt.tikicdn.com/cache/750x750/ts/product/00/9a/66/34d3abd4b5f39c62d1bf49f1f4c030bd.jpg.webp"
                            alt=""
                        />
                    </div>

                    <div className={cx('product-related')}>
                        <h4>Sản phẩm liên quan</h4>
                        <div className={cx('list-product-related')}>
                            <ul>
                                <li>
                                    <img
                                        src="https://salt.tikicdn.com/cache/750x750/ts/product/00/9a/66/34d3abd4b5f39c62d1bf49f1f4c030bd.jpg.webp"
                                        alt=""
                                    />
                                    <div className={cx('product-name')}>
                                        <h5>Nói Chuyện Là Bản Năng, Giữ Miệng Là Tu Dưỡng, Im Lặng Là Trí Tuệ</h5>
                                        <span>150.000 ₫</span>
                                    </div>
                                </li>
                                <li>
                                    <img
                                        src="https://salt.tikicdn.com/cache/750x750/ts/product/00/9a/66/34d3abd4b5f39c62d1bf49f1f4c030bd.jpg.webp"
                                        alt=""
                                    />
                                    <div className={cx('product-name')}>
                                        <h5>Nói Chuyện Là Bản Năng, Giữ Miệng Là Tu Dưỡng, Im Lặng Là Trí Tuệ</h5>
                                        <span>150.000 ₫</span>
                                    </div>
                                </li>
                                <li>
                                    <img
                                        src="https://salt.tikicdn.com/cache/750x750/ts/product/00/9a/66/34d3abd4b5f39c62d1bf49f1f4c030bd.jpg.webp"
                                        alt=""
                                    />
                                    <div className={cx('product-name')}>
                                        <h5>Nói Chuyện Là Bản Năng, Giữ Miệng Là Tu Dưỡng, Im Lặng Là Trí Tuệ</h5>
                                        <span>150.000 ₫</span>
                                    </div>
                                </li>
                                <li>
                                    <img
                                        src="https://salt.tikicdn.com/cache/750x750/ts/product/00/9a/66/34d3abd4b5f39c62d1bf49f1f4c030bd.jpg.webp"
                                        alt=""
                                    />
                                    <div className={cx('product-name')}>
                                        <h5>Nói Chuyện Là Bản Năng, Giữ Miệng Là Tu Dưỡng, Im Lặng Là Trí Tuệ</h5>
                                        <span>150.000 ₫</span>
                                    </div>
                                </li>
                                <li>
                                    <img
                                        src="https://salt.tikicdn.com/cache/750x750/ts/product/00/9a/66/34d3abd4b5f39c62d1bf49f1f4c030bd.jpg.webp"
                                        alt=""
                                    />
                                    <div className={cx('product-name')}>
                                        <h5>Nói Chuyện Là Bản Năng, Giữ Miệng Là Tu Dưỡng, Im Lặng Là Trí Tuệ</h5>
                                        <span>150.000 ₫</span>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className={cx('center')}>
                    <div className={cx('info')}>
                        <h1>Nói Chuyện Là Bản Năng, Giữ Miệng Là Tu Dưỡng, Im Lặng Là Trí Tuệ</h1>
                        <Box className={cx('rating')}>
                            <span>4.5</span>
                            <Rating name="read-only" value={5} readOnly size="small" />
                            <p>(4)</p>
                            <span className={cx('sold')}>| Đã Bán 175</span>
                        </Box>
                        <span className={cx('price')}>150.000 ₫</span>
                    </div>
                    <div className={cx('description')}>
                        <h4>Thông tin chi tiết</h4>
                        <div className={cx('detail')}>
                            <div className={cx('detail-item')}>
                                <span>Phiên bản sách</span>
                                <p>Phiên bản thường</p>
                            </div>

                            <div className={cx('detail-item')}>
                                <span>Công ty phát hành</span>
                                <p>1980 Books</p>
                            </div>

                            <div className={cx('detail-item')}>
                                <span>Ngày xuất bản</span>
                                <p>2022-12-12 00:00:00</p>
                            </div>

                            <div className={cx('detail-item')}>
                                <span>Công ty phát hành</span>
                                <p>1980 Books</p>
                            </div>

                            <div className={cx('detail-item')}>
                                <span>Phiên bản sách</span>
                                <p>Phiên bản thường</p>
                            </div>
                        </div>
                    </div>

                    <div className={cx('detail-description')}>
                        <h4>Mô tả sản phẩm</h4>
                        <p>
                            Tuân Tử nói: “Nói năng hợp lý, đó gọi là hiểu biết; im lặng đúng lúc, đó cũng là hiểu biết”.
                            Ngôn ngữ là thứ có thể thể hiện rõ nhất mức độ tu dưỡng của một người, nói năng hợp lý là
                            một loại trí tuệ, mà im lặng đúng lúc cũng là <br /> một loại trí tuệ. Nếu một người không
                            biết giữ miệng, nói mà không suy nghĩ, nghĩ gì nói nấy, tất nhiên rất dễ khiến người khác
                            chán ghét. Nội dung quyển sách này xoay quanh hai vấn đề đó là “biết cách nói chuyện” và
                            “biết giữ miệng”, thông qua 12 chương sách nói rõ cách nói chuyện với những người khác nhau,
                            cách nói
                            <br />
                            chuyện trong những trường hợp khác nhau, làm thế nào để nắm vững những kỹ năng và chừng mực
                            để nói chuyện cho khôn khéo, những người không giỏi ăn nói làm cách nào mới có thể nói được
                            những lời thích hợp với đúng người và đúng thời điểm, để có thể ứng phó với những trường hợp
                            khác nhau trong giao tiếp. Người biết nói chuyện, ẩn sau con người họ là lòng tốt đã khắc
                            sâu vào xương tủy, là sự tôn trọng đến từ việc đặt mình vào vị trí của người khác, là trí
                            tuệ sâu sắc, độc đáo và lòng kiên nhẫn <br />
                            không ngại phiền hà. Họ chưa hẳn là những người giỏi ăn nói, nhưng mỗi khi nói đều làm người
                            khác như được tắm trong gió xuân, vừa mở miệng là đã toát lên khí chất hơn người. Người biết
                            giữ miệng, bất kể trong trường hợp nào, họ đều có thể lập tức nhì <br />n thấu cảm xúc của
                            người khác, quan tâm đến cảm giác của đối phương, nói năng có chừng mực, làm gì cũng chừa
                            lại đường lui cho mì <br />
                            nh và người khác. Vừa mở miệng là có thể làm yên lòng người khác, tự nhiên đi tới đâu cũng
                            sẽ được chào đón. Biết giữ im lặng thì cuộc sống sẽ dễ chịu hơn, học cách giữ miệng thì cuộc
                            đời này sẽ không còn điều gì phải hối hận. Điều không nên nói thì không nói, điều không nên
                            hỏi thì không hỏi, hiểu ý mà không vạch trần, nhìn thấu mà không nói ra <br />, đó là bậc
                            đại trí. Đôi nét về tác giả: Trương Tiếu Hằng là một tác giả đồng thời là một nhà sản xuất.
                            Ông từng là một nhân viên bình thường, từng làm bán hàng rồi tự mở công ty, ông đã đi nhiều
                            nơi, đọc sách, sáng tác, tìm hiểu về cuộc sống. Vốn <br />
                            sống phong phú, bút pháp tinh tế cùng lối viết đi thẳng vào trọng tâm luôn mang lại cho độc
                            giả cảm giác sảng khoái khi đọc tác phẩm của ông. Một số tác phẩm của ông đã được xuất bản
                            như “Khoa triết học Đại học Bắc Kinh”, “EQ cao chính là biết cách nói chuyện”. Giá sản phẩm
                            trên Tiki đã bao gồm thuế theo luật hiện hành. Bên cạnh đó, tuỳ vào loại sản phẩm, hình thức
                            và địa chỉ giao hàng m <br />à có thể phát sinh thêm chi phí khác như phí vận chuyển, phụ
                            phí hàng cồng kềnh, thuế nhập khẩu (đối với đơn hàng giao từ nước ngoài có giá trị trên 1
                            triệu đồng).....
                        </p>
                    </div>
                </div>
                <div className={cx('right')}>
                    <div>
                        <div className={cx('quantity-left')}>
                            <h4>Số Lượng</h4>
                            <p>Số lượng còn lại trong kho : 5</p>
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
                            <p className={cx('total-price')}>150.000 ₫</p>
                        </div>

                        <div className={cx('button-group')}>
                            <button className={cx('button-buy')}>Mua Ngay</button>
                            <button className={cx('button-add-to-cart')}>Thêm Vào Giỏ Hàng</button>
                        </div>
                    </div>

                    <div className={cx('feed-back')}>
                        <h4>Khách hàng đánh giá</h4>
                        <div className={cx('feed-back-item')}>
                            <div className={cx('feed-back-item-left')}>
                                <Avatar
                                    alt="Remy Sharp"
                                    src="https://scontent.fhan3-4.fna.fbcdn.net/v/t39.30808-1/468635100_2030335600772187_8549397888606208782_n.jpg?stp=cp6_dst-jpg_s200x200_tt6&_nc_cat=111&ccb=1-7&_nc_sid=e99d92&_nc_ohc=4i0l7tJGlYkQ7kNvgG8SF1x&_nc_oc=AdjxM7_BD6oHPGnki5DHSjtVSaNXZ-Kit8Lx6mzvtCfqE08kG-msHgVri4I_rZ6wE2lMksScatVlNdA_BwUUi8Vg&_nc_zt=24&_nc_ht=scontent.fhan3-4.fna&_nc_gid=AZs6NpFZ6wjmK_D9vXSO805&oh=00_AYA4MzhE62btNFzyCuDTfCNJ9f8CuqEaPNSA15Zh9EYX2w&oe=676D5C0B"
                                />
                                <div className={cx('feed-back-item-right')}>
                                    <h5>Nguyễn Văn A</h5>
                                    <Rating name="read-only" value={5} readOnly size="small" />
                                    <p>Shop đóng gói cẩn thận, giao hàng đúng theo thời gian dự kiến. cảm ơn shop!</p>
                                    <span className={cx('time')}>12/12/2024</span>
                                </div>
                            </div>

                            <div className={cx('feed-back-item-left')}>
                                <Avatar
                                    alt="Remy Sharp"
                                    src="https://scontent.fhan3-4.fna.fbcdn.net/v/t39.30808-1/468635100_2030335600772187_8549397888606208782_n.jpg?stp=cp6_dst-jpg_s200x200_tt6&_nc_cat=111&ccb=1-7&_nc_sid=e99d92&_nc_ohc=4i0l7tJGlYkQ7kNvgG8SF1x&_nc_oc=AdjxM7_BD6oHPGnki5DHSjtVSaNXZ-Kit8Lx6mzvtCfqE08kG-msHgVri4I_rZ6wE2lMksScatVlNdA_BwUUi8Vg&_nc_zt=24&_nc_ht=scontent.fhan3-4.fna&_nc_gid=AZs6NpFZ6wjmK_D9vXSO805&oh=00_AYA4MzhE62btNFzyCuDTfCNJ9f8CuqEaPNSA15Zh9EYX2w&oe=676D5C0B"
                                />
                                <div className={cx('feed-back-item-right')}>
                                    <h5>Nguyễn Văn A</h5>
                                    <Rating name="read-only" value={5} readOnly size="small" />
                                    <p>Shop đóng gói cẩn thận, giao hàng đúng theo thời gian dự kiến. cảm ơn shop!</p>
                                    <span className={cx('time')}>12/12/2024</span>
                                </div>
                            </div>

                            <div className={cx('feed-back-item-left')}>
                                <Avatar
                                    alt="Remy Sharp"
                                    src="https://scontent.fhan3-4.fna.fbcdn.net/v/t39.30808-1/468635100_2030335600772187_8549397888606208782_n.jpg?stp=cp6_dst-jpg_s200x200_tt6&_nc_cat=111&ccb=1-7&_nc_sid=e99d92&_nc_ohc=4i0l7tJGlYkQ7kNvgG8SF1x&_nc_oc=AdjxM7_BD6oHPGnki5DHSjtVSaNXZ-Kit8Lx6mzvtCfqE08kG-msHgVri4I_rZ6wE2lMksScatVlNdA_BwUUi8Vg&_nc_zt=24&_nc_ht=scontent.fhan3-4.fna&_nc_gid=AZs6NpFZ6wjmK_D9vXSO805&oh=00_AYA4MzhE62btNFzyCuDTfCNJ9f8CuqEaPNSA15Zh9EYX2w&oe=676D5C0B"
                                />
                                <div className={cx('feed-back-item-right')}>
                                    <h5>Nguyễn Văn A</h5>
                                    <Rating name="read-only" value={5} readOnly size="small" />
                                    <p>Shop đóng gói cẩn thận, giao hàng đúng theo thời gian dự kiến. cảm ơn shop!</p>
                                    <span className={cx('time')}>12/12/2024</span>
                                </div>
                            </div>

                            <div className={cx('feed-back-item-left')}>
                                <Avatar
                                    alt="Remy Sharp"
                                    src="https://scontent.fhan3-4.fna.fbcdn.net/v/t39.30808-1/468635100_2030335600772187_8549397888606208782_n.jpg?stp=cp6_dst-jpg_s200x200_tt6&_nc_cat=111&ccb=1-7&_nc_sid=e99d92&_nc_ohc=4i0l7tJGlYkQ7kNvgG8SF1x&_nc_oc=AdjxM7_BD6oHPGnki5DHSjtVSaNXZ-Kit8Lx6mzvtCfqE08kG-msHgVri4I_rZ6wE2lMksScatVlNdA_BwUUi8Vg&_nc_zt=24&_nc_ht=scontent.fhan3-4.fna&_nc_gid=AZs6NpFZ6wjmK_D9vXSO805&oh=00_AYA4MzhE62btNFzyCuDTfCNJ9f8CuqEaPNSA15Zh9EYX2w&oe=676D5C0B"
                                />
                                <div className={cx('feed-back-item-right')}>
                                    <h5>Nguyễn Văn A</h5>
                                    <Rating name="read-only" value={5} readOnly size="small" />
                                    <p>Shop đóng gói cẩn thận, giao hàng đúng theo thời gian dự kiến. cảm ơn shop!</p>
                                    <span className={cx('time')}>12/12/2024</span>
                                </div>
                            </div>

                            <div className={cx('feed-back-item-left')}>
                                <Avatar
                                    alt="Remy Sharp"
                                    src="https://scontent.fhan3-4.fna.fbcdn.net/v/t39.30808-1/468635100_2030335600772187_8549397888606208782_n.jpg?stp=cp6_dst-jpg_s200x200_tt6&_nc_cat=111&ccb=1-7&_nc_sid=e99d92&_nc_ohc=4i0l7tJGlYkQ7kNvgG8SF1x&_nc_oc=AdjxM7_BD6oHPGnki5DHSjtVSaNXZ-Kit8Lx6mzvtCfqE08kG-msHgVri4I_rZ6wE2lMksScatVlNdA_BwUUi8Vg&_nc_zt=24&_nc_ht=scontent.fhan3-4.fna&_nc_gid=AZs6NpFZ6wjmK_D9vXSO805&oh=00_AYA4MzhE62btNFzyCuDTfCNJ9f8CuqEaPNSA15Zh9EYX2w&oe=676D5C0B"
                                />
                                <div className={cx('feed-back-item-right')}>
                                    <h5>Nguyễn Văn A</h5>
                                    <Rating name="read-only" value={5} readOnly size="small" />
                                    <p>Shop đóng gói cẩn thận, giao hàng đúng theo thời gian dự kiến. cảm ơn shop!</p>
                                    <span className={cx('time')}>12/12/2024</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default DetailProduct;
