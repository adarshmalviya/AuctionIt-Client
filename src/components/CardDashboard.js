import * as React from 'react';
import { connect } from 'react-redux';
import Card from '@mui/material/Card';
import { Link, useNavigate } from 'react-router-dom';
// Actions
import { loadAdDetails, loadAdImage, setImageLoadingStatus, updateRecommendationAd } from '../actions/ad';
// MUI Components
import { CardActionArea } from '@mui/material';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
// Files
import imagePlaceholder from '../images/no-image-icon.png';
import { secondsToHmsShort } from '../utils/secondsToHms';
import './css/card.css';

function MediaCard(props) {
    const navigate = useNavigate();

    const handleCardClick = (e) => {
        props.updateRecommendationAd(props.user._id, props.ad._id);
        navigate(`/ads/${props.ad._id}`);
    };

    // Auction status based on the ad-details
    const updateAuctionStatus = (ad) => {
        if (ad.sold) {
            return 'Sold';
        } else if (ad.auctionEnded) {
            return 'Ended, not-sold';
        } else if (!ad.auctionStarted) {
            return 'Upcoming';
        } else {
            return 'Ongoing';
        }
    };

    return (
        <a
            onClick={(e) => {
                handleCardClick(e);
            }}
            style={{ textDecoration: 'none' }}
        >
            <Card style={props.cardStyle} className='card'>
                <CardActionArea className='cardActionArea'>
                    {!props.dashCard && (
                        <CardMedia
                            className='img'
                            component='img'
                            // height='200px'
                            src={props.ad.image ? props.ad.image : imagePlaceholder}
                            alt={props.ad.productName}
                            sx={{
                                height: "200px",
                                width: "100%"
                            }}
                        />
                    )}
                    <CardContent>
                        <Typography className='description' gutterBottom variant='h6' component='div'>
                            {props.ad.productName}
                        </Typography>
                        <Typography className='description' variant='body2' color='text.secondary'>
                            Price: $ {props.ad.currentPrice.$numberDecimal}
                        </Typography>
                        <Typography className='description' variant='body2' color='text.secondary'>
                            Status: {updateAuctionStatus(props.ad)}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </a>
    );
}

const mapStateToProps = (state) => ({
    adDetails: state.ad.adDetails,
});

export default connect(mapStateToProps, {
    loadAdDetails,
    loadAdImage,
    setImageLoadingStatus,
    updateRecommendationAd
})(MediaCard);
