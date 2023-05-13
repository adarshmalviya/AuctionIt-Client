import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
// Components
import LoadingDisplay from './LoadingDisplay';
import Card from './Card';
import { Button, Box, ButtonGroup } from '@mui/material';
// Styling
import { paginationBtnStyle, paginationStyle, purchasedListContainerStyle, purchasedListTableStyle, tableCellStyle } from './css/dashStyle';

// MUI
import {
    Table,
    TableRow,
    TableCell,
    TableHead,
    TableBody,
} from '@mui/material';

const DashboardReviewList = () => {
    const [ads, setAds] = useState([]);
    const [loading, setLoading] = useState(true);
    const [pageNumber, setPageNumber] = useState(1);
    const [adPerPage] = useState(4);

    useEffect(() => {
        setLoading(true);
        let soldWithReviewList = [];

        const fetchData = async () => {
            const res = await axios.get(
                `${process.env.REACT_APP_API_BASE_URL}/user/products/posted`
            );
            for (let i = 0; i < res.data.length; i++) {
                if (res.data[i].sold && res.data[i].review != "") {
                    soldWithReviewList.push(res.data[i]);
                }
            }
            setAds(soldWithReviewList);
            setLoading(false);
        };
        fetchData();
    }, []);

    // Pagination
    let lastAdIndex = pageNumber * adPerPage;
    let firstAdIndex = lastAdIndex - adPerPage;
    let pageNumbers = [];
    const num = Math.ceil(ads.length / adPerPage);
    for (let i = 1; i <= num; i++) {
        pageNumbers.push(i);
    }
    const clickPageNumberButton = (num) => {
        setPageNumber(num);
    };

    return loading ? (
        <LoadingDisplay />
    ) : (
        <Fragment>
            {ads.length > 0 ?
                <Box sx={purchasedListContainerStyle}>
                    <Box sx={purchasedListTableStyle}>
                        <Table sx={{ width: '70%', minWidth: 650 }} aria-label='simple table'>
                            <TableHead>
                                <TableRow>
                                    <TableCell sx={tableCellStyle}>Product name</TableCell>
                                    <TableCell align='right' sx={tableCellStyle}>Review</TableCell>
                                    <TableCell align='right' sx={tableCellStyle}>Rating</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {ads.slice(firstAdIndex, lastAdIndex).map((ad) => (
                                    <TableRow key={ad._id}>
                                        <TableCell sx={tableCellStyle}>{ad.productName}</TableCell>
                                        <TableCell align='right' sx={tableCellStyle}>{ad.review}</TableCell>
                                        {ad.rating ? <TableCell align='right' sx={tableCellStyle}>{ad.rating}</TableCell> : <TableCell align='right'>{0}</TableCell>}
                                        {/* <TableCell align='right'>{ad.rating}</TableCell> */}
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Box>
                    {ads.length !== 0 && (
                        <Box sx={paginationStyle}>
                            <ButtonGroup variant='outlined' size='small'>
                                <Button
                                    disabled={pageNumber === 1}
                                    onClick={(e) => clickPageNumberButton(pageNumber - 1)}
                                    sx={paginationBtnStyle}
                                >
                                    Prev
                                </Button>
                                {pageNumbers.map((num) => {
                                    return (
                                        <Button
                                            key={num}
                                            disabled={pageNumber === num}
                                            onClick={(e) => clickPageNumberButton(num)}
                                            sx={paginationBtnStyle}
                                        >
                                            {num}
                                        </Button>
                                    );
                                })}
                                <Button
                                    disabled={pageNumber === pageNumbers[pageNumbers.length - 1]}
                                    onClick={(e) => clickPageNumberButton(pageNumber + 1)}
                                    sx={paginationBtnStyle}
                                >
                                    Next
                                </Button>
                            </ButtonGroup>
                        </Box>
                    )}
                </Box>
                :
                <Box sx={purchasedListTableStyle}>No Feedback Received</Box>}

        </Fragment>
    );
};

export default DashboardReviewList;
