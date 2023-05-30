export const boxStyle = {
  display: 'flex',
  justifyContent: 'center',
  marginTop: '1rem',
};

// export const paperStyle = { width: '80%', maxWidth: '950px', padding: '1.5rem', background: "whitesmoke" };
// export const paperStyle = { width: '80%', maxWidth: '950px', padding: '1.5rem', background: "linear-gradient(30deg, black, transparent);", color: "white" };
export const paperStyle = { width: '80%', maxWidth: '950px', padding: '1.5rem', background: "background: rgb(113,103,108);", background: "radial-gradient(circle, rgba(113,103,108,1) 0%, rgba(0,0,0,0.7008053221288515) 100%);", color: "white" };

export const adArea = {
  display: 'flex',
  justifyContent: '',
  marginTop: '1rem',
};

export const imageContainer = { flex: '50%', margin: '0rem .7rem 0rem 0rem' };

export const imageStyle = { height: '400px', width: '400px' };

export const descriptionArea = { flex: '50%', margin: '0rem 0rem 0rem .7rem' };

export const bidContainer = { display: 'flex', margin: '.5rem', marginLeft: '0rem' };

export const bidButtonStyle = {
  marginLeft: '0.2rem',
  height: '100%',
  color: 'white',
  '&.Mui-disabled': {
    color: 'gray',
    borderColor: 'gray'
  },
  borderColor: 'white'
};

export const bidTextStyle = {
  '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
    borderColor: 'gray', // Default border color
  },
  '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
    borderColor: 'white', // Change border color on hover
  },
  '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderColor: 'white', // Change border color when focused
  },
  color: 'white'
}

export const adFormArea = {
  padding: '3rem',
  width: '50%',
  maxWidth: '950px',
  paddingTop: '2rem',
  display: 'flex',
  flexDirection: 'column',
  background: "whitesmoke",
};

export const formComponent = {
  marginTop: '1rem',
};

export const formTextField = {
  width: '100%',
  background: "white"
};

export const formSubmitButtonContainer = {
  display: 'flex',
  justifyContent: 'center',
  marginTop: '1rem',
};
