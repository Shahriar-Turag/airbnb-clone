import EmptyState from '../components/EmptyState';
import ClientOnly from '../components/ClientOnly';

import getCurrentUser from '../actions/getCurrentUser';
import getListings from '../actions/getListings';
import PropertiesClient from './PropertiesClient';

const PropertiesPage = async () => {
	const currentUser = await getCurrentUser();

	if (!currentUser) {
		return (
			<ClientOnly>
				<EmptyState title='Unauthorized' subtitle='Please Login' />
			</ClientOnly>
		);
	}

	const listings = await getListings({
		userId: currentUser.id,
	});

	if (listings.length === 0) {
		return (
			<ClientOnly>
				<EmptyState
					title='No Properties'
					subtitle='You have no properties yet'
				/>
			</ClientOnly>
		);
	}

	return (
		<ClientOnly>
			<PropertiesClient listings={listings} currentUser={currentUser} />
		</ClientOnly>
	);
};

export default PropertiesPage;
