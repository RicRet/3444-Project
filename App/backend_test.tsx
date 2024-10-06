import axios from 'axios';

const fetchUsers = async () => {
  try {
    const response = await axios.get('http://localhost:5000/users');
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
};

/*
const addUser = async (name, email) => {
  try {
    const response = await axios.post('http://localhost:5000/users', { name, email });
    console.log('New user added:', response.data);
  } catch (error) {
    console.error(error);
  }
};
*/
