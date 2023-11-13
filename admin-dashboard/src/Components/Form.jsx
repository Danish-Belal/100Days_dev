import TextField from '@mui/material/TextField';

function Form() {
  return (
    <div style={{
     display : 'flex',
     justifyContent : 'center'
    }}>
     <div >
          Welcome to Coursera
     </div>
      <div>
      <TextField id="outlined-basic" label="Username" variant="outlined" />
      <TextField id="outlined-basic" label="Password" variant="outlined" />
      </div>
    </div>
  );
}
export default Form;
