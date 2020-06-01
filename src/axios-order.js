import axios from 'axios';

const axiosOrder=axios.create({

    baseURL: 'https://burgerbuilder-265a5.firebaseio.com/'

})

export default axiosOrder;