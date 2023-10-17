import EmptyState from '../components/EmptyState';
import ClientOnly from '../components/ClientOnly';

import getCurrentUser from '../actions/getCurrentUser';
import getReservations from '../actions/getReservations';
import ReservationsClient from './ReservationsClient';

const ReservationPage = async () => {
	const currentUser = await getCurrentUser();

	if (!currentUser) {
		return (
			<ClientOnly>
				<EmptyState title='Unauthorized' subtitle='Please Login' />
			</ClientOnly>
		);
	}

	const reservations = await getReservations({
		userId: currentUser.id,
	});

	if (reservations.length === 0) {
		return (
			<ClientOnly>
				<EmptyState
					title='No reservations'
					subtitle='You have no reservations'
				/>
			</ClientOnly>
		);
	}

	return (
		<ClientOnly>
			<ReservationsClient
				reservations={reservations}
				currentUser={currentUser}
			/>
		</ClientOnly>
	);
};

export default ReservationPage;
