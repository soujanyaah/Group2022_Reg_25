import React from 'react';
import MenuItem from './MenuItem';
import './HomePage.styles.css';

const HomeMenu = ({ options }) => {
	return (
		<div className='container pb-5'>
			<div className='row  justify-content-between'>
				{options.map((element, idx) => {
					return (
						<MenuItem
							link={element.link}
							title={element.title}
							key={idx}
						/>
					);
				})}
			</div>
		</div>
	);
};

export default HomeMenu;
