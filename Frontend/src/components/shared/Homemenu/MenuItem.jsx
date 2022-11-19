import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthContext';

const MenuItem = ({ link, title }) => {
	const auth = useContext(AuthContext);

	return (
		<Link
			to={{
				pathname: link,
				state: {
					customer: auth.user,
					role: auth.role
				}
			}}
			className=' col-md-3 p5 menu-item m-1'>
			<div className='menu-link'>{title}</div>
		</Link>
	);
};

export default MenuItem;
