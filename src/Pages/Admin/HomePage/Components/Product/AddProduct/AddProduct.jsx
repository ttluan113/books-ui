import classNames from 'classnames/bind';
import styles from './AddProduct.module.scss';

import TextField from '@mui/material/TextField';
import Slider from 'react-slick';
import Autocomplete from '@mui/material/Autocomplete';

import { Editor } from '@tinymce/tinymce-react';

import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { requestAddProduct, requestGetCategory, requestEditProduct } from '../../../../../../config/config';
import useDebounce from '../../../../../../hooks/useDebounce';

const cx = classNames.bind(styles);

const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
};

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

function AddProduct({ dataOneProduct, setTypeBack, setDataOneProduct }) {
    const [images, setImages] = useState([]);
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');
    const [description, setDescription] = useState('');
    const [company, setCompany] = useState('');
    const [publicationDate, setPublicationDate] = useState('');
    const [type, setType] = useState(1);
    const [size, setSize] = useState('');
    const [page, setPage] = useState('');
    const [publishingHouse, setPublishingHouse] = useState('');
    const [previewImages, setPreviewImages] = useState([]);

    const [valueCategory, setValueCategory] = useState('');
    const [selectCategory, setSelectCategory] = useState('');
    const [dataCategory, setDataCategory] = useState([]);

    const valueSearchCategory = useDebounce(valueCategory, 1000);

    const handleChange = (event) => {
        setType(event.target.value);
    };

    const fetchData = async () => {
        const res = await requestGetCategory(valueSearchCategory);
        setDataCategory(res);
    };

    useEffect(() => {
        fetchData();
    }, [valueSearchCategory]);

    const handleFileChange = (event) => {
        const files = Array.from(event.target.files);
        setImages(files);
        const previewUrls = files.map((file) => URL.createObjectURL(file));
        setPreviewImages(previewUrls);
    };

    useEffect(() => {
        if (dataOneProduct) {
            setName(dataOneProduct.name);
            setPrice(dataOneProduct.price);
            setQuantity(dataOneProduct.quantity);
            setDescription(dataOneProduct.description);
            setCompany(dataOneProduct.options?.company);
            setPublicationDate(dataOneProduct.options?.publicationDate);
            setType(dataOneProduct.options?.type);
            setSize(dataOneProduct.options?.size);
            setPage(dataOneProduct.options?.page);
            setPublishingHouse(dataOneProduct.options?.publishingHouse);
            setSelectCategory(dataOneProduct.category);
            dataOneProduct?.images?.forEach((image) => {
                setPreviewImages((prevImages) => [
                    ...prevImages,
                    `${import.meta.env.VITE_URL_IMAGE}/uploads/products/${image}`,
                ]);
            });
            setImages(dataOneProduct?.images);
        }
    }, [dataOneProduct]);

    const handleAddProduct = async () => {
        const options = {
            company,
            publicationDate,
            type,
            size,
            page,
            publishingHouse,
        };

        const formData = new FormData();
        formData.append('name', name);
        formData.append('price', price);
        formData.append('quantity', quantity);
        formData.append('description', description);
        formData.append('category', selectCategory);
        images.forEach((image) => {
            formData.append('images', image);
        });
        Object.keys(options).forEach((key) => {
            formData.append(key, options[key]);
        });
        try {
            const res = await requestAddProduct(formData);
            toast.success(res.message);
            setName('');
            setPrice('');
            setQuantity('');
            setDescription('');
            setCompany('');
            setPublicationDate('');
            setType(1);
            setSize('');
            setPage('');
            setPublishingHouse('');
            setImages([]);
            setPreviewImages([]);
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };

    const handleEditProduct = async () => {
        try {
            const options = {
                company,
                publicationDate,
                type,
                size,
                page,
                publishingHouse,
            };

            const formData = new FormData();
            formData.append('id', dataOneProduct.id);
            formData.append('name', name);
            formData.append('price', price);
            formData.append('quantity', quantity);
            formData.append('description', description);
            formData.append('category', selectCategory);
            images.forEach((image) => {
                formData.append('images', image);
            });
            Object.keys(options).forEach((key) => {
                formData.append(key, options[key]);
            });
            const res = await requestEditProduct(formData);
            toast.success(res.message);
            setDataOneProduct({});
            setTypeBack(0);
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };

    return (
        <div className={cx('wrapper')}>
            <ToastContainer />

            <div className={cx('form__add-product')}>
                <div>
                    <div className={cx('form__input')}>
                        <TextField
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    '& fieldset': {
                                        borderColor: '#fff', // Màu viền mặc định
                                    },
                                    '&:hover fieldset': {
                                        borderColor: '#fff', // Màu viền khi hover
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderColor: '#3f51b5', // Màu viền khi focus
                                    },
                                },
                            }}
                            id="outlined-basic"
                            label="Tên sản phẩm"
                            variant="outlined"
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                        />
                        <TextField
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    '& fieldset': {
                                        borderColor: '#fff', // Màu viền mặc định
                                    },
                                    '&:hover fieldset': {
                                        borderColor: '#fff', // Màu viền khi hover
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderColor: '#3f51b5', // Màu viền khi focus
                                    },
                                },
                            }}
                            id="outlined-basic"
                            label="Giá Sản Phẩm"
                            variant="outlined"
                            type="number"
                            onChange={(e) => setPrice(e.target.value)}
                            value={price}
                        />
                        <TextField
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    '& fieldset': {
                                        borderColor: '#fff', // Màu viền mặc định
                                    },
                                    '&:hover fieldset': {
                                        borderColor: '#fff', // Màu viền khi hover
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderColor: '#3f51b5', // Màu viền khi focus
                                    },
                                },
                            }}
                            id="outlined-basic"
                            label="Số lượng sản phẩm"
                            variant="outlined"
                            type="number"
                            onChange={(e) => setQuantity(e.target.value)}
                            value={quantity}
                        />
                        <TextField
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    '& fieldset': {
                                        borderColor: '#fff', // Màu viền mặc định
                                    },
                                    '&:hover fieldset': {
                                        borderColor: '#fff', // Màu viền khi hover
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderColor: '#3f51b5', // Màu viền khi focus
                                    },
                                },
                            }}
                            id="outlined-basic"
                            label="Công ty phát hành"
                            variant="outlined"
                            onChange={(e) => setCompany(e.target.value)}
                            value={company}
                        />

                        <TextField
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    '& fieldset': {
                                        borderColor: '#fff', // Màu viền mặc định
                                    },
                                    '&:hover fieldset': {
                                        borderColor: '#fff', // Màu viền khi hover
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderColor: '#3f51b5', // Màu viền khi focus
                                    },
                                },
                            }}
                            id="outlined-basic"
                            variant="outlined"
                            onChange={(e) => setPublicationDate(e.target.value)}
                            type="date"
                            value={publicationDate}
                        />

                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={type}
                            onChange={handleChange}
                            sx={{
                                width: '100%', // Độ dài 100%
                                color: '#fff', // Màu chữ

                                '& .MuiOutlinedInput-notchedOutline': {
                                    borderColor: '#fff', // Màu viền
                                },
                                '&:hover .MuiOutlinedInput-notchedOutline': {
                                    borderColor: '#ddd', // Màu viền khi hover
                                },
                                '& .MuiSvgIcon-root': {
                                    color: '#fff', // Màu icon dropdown
                                },
                            }}
                        >
                            <MenuItem value={1} sx={{ color: '#000', backgroundColor: '#fff' }}>
                                Bìa cứng
                            </MenuItem>
                            <MenuItem value={2} sx={{ color: '#000', backgroundColor: '#fff' }}>
                                Bìa mềm
                            </MenuItem>
                        </Select>

                        <TextField
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    '& fieldset': {
                                        borderColor: '#fff', // Màu viền mặc định
                                    },
                                    '&:hover fieldset': {
                                        borderColor: '#fff', // Màu viền khi hover
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderColor: '#3f51b5', // Màu viền khi focus
                                    },
                                },
                            }}
                            id="outlined-basic"
                            label="Kích thước"
                            variant="outlined"
                            onChange={(e) => setSize(e.target.value)}
                            value={size}
                        />

                        <TextField
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    '& fieldset': {
                                        borderColor: '#fff', // Màu viền mặc định
                                    },
                                    '&:hover fieldset': {
                                        borderColor: '#fff', // Màu viền khi hover
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderColor: '#3f51b5', // Màu viền khi focus
                                    },
                                },
                            }}
                            id="outlined-basic"
                            label="Số trang"
                            variant="outlined"
                            type="number"
                            onChange={(e) => setPage(e.target.value)}
                            value={page}
                        />

                        <TextField
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    '& fieldset': {
                                        borderColor: '#fff', // Màu viền mặc định
                                    },
                                    '&:hover fieldset': {
                                        borderColor: '#fff', // Màu viền khi hover
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderColor: '#3f51b5', // Màu viền khi focus
                                    },
                                },
                            }}
                            id="outlined-basic"
                            label="Nhà xuất bản"
                            variant="outlined"
                            onChange={(e) => setPublishingHouse(e.target.value)}
                            value={publishingHouse}
                        />

                        <Autocomplete
                            disablePortal
                            options={dataCategory?.map((category) => category.nameCategory) || []}
                            value={selectCategory}
                            onChange={(event, newValue) => {
                                setSelectCategory(newValue);
                            }}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    onChange={(event, newValue) => setValueCategory(newValue)}
                                    label="Danh mục"
                                />
                            )}
                        />
                    </div>

                    <div className={cx('form__editor')}>
                        <Editor
                            apiKey="hfm046cu8943idr5fja0r5l2vzk9l8vkj5cp3hx2ka26l84x"
                            init={{
                                plugins:
                                    'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount',
                                toolbar:
                                    'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat',
                            }}
                            onEditorChange={(content, editor) => {
                                setDescription(content);
                            }}
                            value={description}
                        />
                    </div>
                </div>

                <div className={cx('form__slider')}>
                    <Slider {...settings}>
                        {previewImages?.map((image, index) => (
                            <div key={index}>
                                <img src={image} alt={`Slide ${index + 1}`} />
                            </div>
                        ))}
                    </Slider>
                    <Button
                        component="label"
                        role={undefined}
                        variant="contained"
                        tabIndex={-1}
                        fullWidth
                        sx={{ mt: 2 }}
                        startIcon={<CloudUploadIcon />}
                    >
                        Chọn ảnh
                        <VisuallyHiddenInput type="file" onChange={handleFileChange} multiple />
                    </Button>
                </div>
            </div>
            <Button
                fullWidth
                variant="contained"
                sx={{ mt: 2 }}
                onClick={dataOneProduct.id ? handleEditProduct : handleAddProduct}
            >
                {dataOneProduct.id ? 'Cập nhật' : 'Thêm Sản Phẩm'}
            </Button>
        </div>
    );
}

export default AddProduct;
