import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';

// MUI
import {
  Box,
  ButtonGroup,
  Table,
  TableRow,
  TableCell,
  TableHead,
  TableBody,
  Button,
} from '@mui/material';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
// Styling
import {
  paginationBtnStyle,
  paginationStyle,
  purchasedListContainerStyle,
  purchasedListTableStyle,
  tableCellStyle,
} from './css/dashStyle';
// Api Call
import { addReview } from '../actions/ad';

const DashPurchasedList = (props) => {
  const { ads } = props;
  const navigate = useNavigate();
  const [pageNumber, setPageNumber] = useState(1);
  const [adPerPage] = useState(5);
  const [open, setOpen] = useState(false);
  const [adId, setAdId] = useState();
  const [ownerId, setOwnerId] = useState();
  const [comment, setComment] = useState("");
  const [disableArr, setDisableArr] = useState([]);


  const getGMTTime = (time) => {
    const dateTime = new Date(time);
    return dateTime.toUTCString();
  };

  const handlePurchasedDetails = (adId) => {
    navigate('/ads/' + adId);
  };

  // Modal for Review
  const handleReviewOpen = (adId, ownerId) => {
    setOpen(true);
    setAdId(adId);
    setOwnerId(ownerId);
  };
  const handleReviewClose = () => {
    setOpen(false);
  };
  const handleReviewSubmit = () => {
    props.addReview(adId, comment, ownerId);
    setDisableArr([...disableArr, adId]);
    setOpen(false);
  };

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

  return (
    <>
      <Dialog open={open} onClose={handleReviewClose}>
        <DialogTitle>Add Review</DialogTitle>
        <DialogContent>

          <DialogContentText>
            Add the experience for product you purchased.
          </DialogContentText>

          <TextField
            autoFocus
            margin="dense"
            id="product_review"
            label="Review"
            type="text"
            fullWidth
            variant="standard"
            onChange={(newValue) => { setComment(newValue.target.value) }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleReviewClose}>Cancel</Button>
          <Button onClick={handleReviewSubmit}>Submit</Button>
        </DialogActions>
      </Dialog>
      {ads.length > 0 ? <Box sx={purchasedListContainerStyle}>
        <Box sx={purchasedListTableStyle}>
          <Table sx={{ width: '70%', minWidth: 650 }} aria-label='simple table'>
            <TableHead>
              <TableRow>
                <TableCell sx={tableCellStyle}>Product name</TableCell>
                <TableCell align='right' sx={tableCellStyle} >Price</TableCell>
                <TableCell align='right' sx={tableCellStyle} >Date</TableCell>
                <TableCell align='right' sx={tableCellStyle} >Details</TableCell>
                <TableCell align='right' sx={tableCellStyle} >Feedback</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {ads.slice(firstAdIndex, lastAdIndex).map((ad) => (
                <TableRow key={ad._id}>
                  <TableCell sx={tableCellStyle}>{ad.productName}</TableCell>
                  <TableCell align='right' sx={tableCellStyle}>${ad.currentPrice.$numberDecimal}</TableCell>
                  <TableCell align='right' sx={tableCellStyle}>{getGMTTime(ad.updatedAt)}</TableCell>
                  <TableCell align='right' sx={tableCellStyle}>
                    <Button
                      size='small'
                      variant='outlined'
                      onClick={(e) => {
                        handlePurchasedDetails(ad._id);
                      }}
                      sx={paginationBtnStyle}
                    >
                      Details
                    </Button>
                  </TableCell>
                  <TableCell align='right'>
                    {ad.review.length > 0 || disableArr.includes(ad._id) ? <Button
                      size='small'
                      variant='outlined'
                      onClick={(e) => {
                        handleReviewOpen(ad._id, ad.owner);
                      }}
                      disabled
                      sx={paginationBtnStyle}
                    >
                      Review
                    </Button>
                      :
                      <Button
                        size='small'
                        variant='outlined'
                        onClick={(e) => {
                          handleReviewOpen(ad._id, ad.owner);
                        }}
                        sx={paginationBtnStyle}
                      >
                        Review
                      </Button>
                    }
                  </TableCell>
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
      </Box> : <Box sx={purchasedListTableStyle}>No Purchased Product Found</Box>}

    </>
  );
};

const mapStateToProps = (state) => ({
  loading: state.auth.loading,
  isAuth: state.auth.isAuthenticated,
  user: state.auth.user,
  purchased: state.ad.purchased,
  purchasedLoading: state.ad.purchasedLoading,
});

export default connect(mapStateToProps, { addReview })(DashPurchasedList);
